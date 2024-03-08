import { signal } from "@preact/signals-react"
import { Beer } from "./types"

export const selectedBeer = signal<Beer | null>(null)
export const filterSignal = signal<URLSearchParams | null>(null)