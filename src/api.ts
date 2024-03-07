export const fetchBeers = async (params: URLSearchParams | null) => {
    const url = new URL('https://api.punkapi.com/v2/beers')

    if (params) {
        url.search = params.toString()
    }

    const res = await fetch(url, { method: 'GET' })

    return res.json()
}