export interface Beer {
    id: number
    name: string
    tagline: string
    image_url: string
    description: string
    abv: number
    ingredients: Ingredients
    food_pairing: string[]

}

export interface Ingredients {
    hops: {
        name: string
        amount: {
            value: number
            unit: string
        },
        add: string
        attribute: string
    }[]
    malt: {
        name: string
        amount: {
            value: number
            unit: string
        }
    }[]
    yeast: string
}

// to improve: add more filters
export interface Filter {
    abv: {
        abv_gt: string,
        abv_lt: string,
    }
}