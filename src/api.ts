export const fetchBeers = async (params: URLSearchParams | null) => {
    const url = new URL('https://api.punkapi.com/v2/beers')

    if (params) {
        url.search = params.toString()
    }

    // to improve: enable pagination
    url.searchParams.append('per_page', '80')
    url.searchParams.append('page', '1')

    const res = await fetch(url, { method: 'GET' })

    return res.json()
}