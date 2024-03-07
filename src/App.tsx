import { styled } from '@mui/material'
import { BeerList } from './components/BeerList'
import { DetailsModal } from './components/DetailsModal'

function App() {
  return (
    <Container>
      <BeerList />
      <DetailsModal />
    </Container>
  )
}

export default App


const Container = styled("div")({
  display: "flex",
  justifyContent: "center",
})
