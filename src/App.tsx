import { Divider, Stack, styled } from '@mui/material'
import { BeerList } from './components/BeerList'
import { DetailsModal } from './components/DetailsModal'
import { BeerFilter } from './components/BeerFilter'
import { Beer } from './types'
import { signal } from '@preact/signals-react'
import { Pagination } from './components/Pagination'
import { Search } from './components/Search'

export const selectedBeer = signal<Beer | null>(null)
export const filterSignal = signal<URLSearchParams | null>(null)

const App = () => {
  const url = new URL(window.location.href)
  const params = new URLSearchParams(url.search)
  filterSignal.value = params

  return (
    <Container>
      <BeerFilter />
      <Divider />
      <Stack direction='row' justifyContent='space-between' >
        <Search />
        <Pagination />
      </Stack>
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
