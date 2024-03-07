import { Beer } from "./types"

export const fetchBeers = async (params: URLSearchParams | null): Promise<Beer[]> => {
    const url = new URL('https://api.punkapi.com/v2/beers')

    if (params) {
        url.search = params.toString()
    }

    if (!url.searchParams.has('per_page')) {
        url.searchParams.append('per_page', '10')
    }

    if (!url.searchParams.has('page')) {
        url.searchParams.append('page', '1')
    }

    const res = await fetch(url, { method: 'GET' })

    return res.json()
}