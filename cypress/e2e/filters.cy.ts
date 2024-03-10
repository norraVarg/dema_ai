/// <reference types="cypress" />

describe('filters', () => {
  it('should fetch items by abv filter and update search params', () => {
    cy.visit('http://localhost:5173')

    cy.contains('Min').parent('div').find('input').type('2')
    cy.contains('Max').parent('div').find('input').type('3')
    cy.contains('APPLY FILTERS').click()

    cy.get('div.MuiDataGrid-row')
      .should('have.length', 3)
      .should('contain', 'Edge')
      .should('contain', 'Doodlebug')
      .should('contain', 'All Day Long - Prototype Challenge')

    cy.url()
      .should('include', 'abv_gt=2')
      .should('include', 'abv_lt=3')

    cy.contains('CLEAR FILTERS').click()
    cy.get('div.MuiDataGrid-row').should('have.length', 10)
    cy.url()
      .should('not.include', 'abv_gt')
      .should('not.include', 'abv_lt')
  })

  it('should set filter by search params in url', () => {
    cy.visit('http://localhost:5173?abv_gt=5&abv_lt=5.2')

    cy.contains('Min').parent('div').find('input').should('have.value', '5')
    cy.contains('Max').parent('div').find('input').should('have.value', '5.2')

    cy.get('div.MuiDataGrid-row')
      .should('have.length', 1)
      .should('contain', 'Casino Rye Ale')
  })
})