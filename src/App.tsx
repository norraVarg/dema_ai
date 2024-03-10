import { Divider, styled } from '@mui/material'
import { BeerList } from './components/BeerList'
import { DetailsModal } from './components/DetailsModal'
import { Filters } from './components/Filters'
import { filterSignal, selectedBeer } from './signals'

const App = () => {
  const url = new URL(window.location.href)
  const params = new URLSearchParams(url.search)
  filterSignal.value = params

  return (
    <Container>
      <Filters sx={{ minWidth: 380 }} />
      <Divider />
      <BeerList />
      <DetailsModal selectedBeer={selectedBeer} />
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
