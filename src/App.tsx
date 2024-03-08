import { Divider, styled } from '@mui/material'
import { BeerList } from './components/BeerList'
import { DetailsModal } from './components/DetailsModal'
import { Filters } from './components/Filters'
import { Beer } from './types'
import { signal } from '@preact/signals-react'

export const selectedBeer = signal<Beer | null>(null)
export const filterSignal = signal<URLSearchParams | null>(null)

const App = () => {
  const url = new URL(window.location.href)
  const params = new URLSearchParams(url.search)
  filterSignal.value = params

  return (
    <Container>
      <Filters sx={{ minWidth: 380 }} />
      <Divider />
      <BeerList />
      <DetailsModal />
    </Container>
  )
}

export default App


const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: 16,
  padding: 16,
})
