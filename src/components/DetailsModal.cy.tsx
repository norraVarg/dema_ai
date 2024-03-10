import { signal } from '@preact/signals-react'
import { DetailsModal } from './DetailsModal'
import { Beer } from '../types'
import beer from '../../cypress/fixtures/beer.json'

const selectedBeer = signal<Beer | null>(null)
selectedBeer.value = beer

describe('<DetailsModal />', () => {
  it('should contain beer details', () => {
    cy.mount(<DetailsModal selectedBeer={selectedBeer} />)

    cy.contains('Avery Brown Dredge').should('be.visible')
    cy.contains("Bloggers' Imperial Pilsner.").should('be.visible')
    cy.contains("Vietnamese squid salad, Chargrilled corn on the cob with paprika butter, Strawberry and rhubarb pie").should('be.visible')
    cy.contains("ABV: 7.2").should('be.visible')
    cy.get('img').should('have.attr', 'src', 'https://images.punkapi.com/v2/5.png')
  })
})