export interface Beer {
    id: number
    name: string
    tagline: string
    image_url: string
    description: string
    abv: number
    ingredients: Ingredients

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
