import { Autocomplete, TextField, ThemeProvider, createTheme, styled } from "@mui/material"
import { filterSignal } from "../App"
import { Beer } from "../types"
import { computed } from "@preact/signals-react"

interface Props {
    data: Beer[]
}

export const Search = (props: Props) => {
    const { data } = props

    const options = computed(() => {
        if (filterSignal.value === null) {
            return []
        }

        const beerName = filterSignal.value.get('beer_name');

        if (beerName === null) {
            return []
        }

        return data
    })

    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchInput = e.target.value;
        const url = new URL(window.location.href);

        if (searchInput !== '') {
            url.searchParams.set('beer_name', searchInput);
        } else {
            url.searchParams.delete('beer_name');
        }

        window.history.pushState({}, '', url);
        filterSignal.value = url.searchParams;
    }

    const onChangeSelect = (_: React.ChangeEvent<{}>, beer: Beer | null) => {
        const url = new URL(window.location.href);

        if (beer) {
            url.searchParams.set('beer_name', beer.name);
        } else {
            url.searchParams.delete('beer_name');
        }

        window.history.pushState({}, '', url);
        filterSignal.value = url.searchParams;
    }

    return (
        <Container>
            <ThemeProvider theme={theme}>
                <Autocomplete
                    options={options.value}
                    renderInput={(params) => {
                        return <TextField {...params} onChange={onChangeInput} label="Search by name" />
                    }}
                    onChange={onChangeSelect}
                    isOptionEqualToValue={(option, value) => option.name === value.name}
                    getOptionLabel={(option) => option.name}
                    size='small'
                    sx={{ width: 283 }}
                />
            </ThemeProvider>
        </Container>
    )
}

const Container = styled("div")({
    display: "flex",
})

const theme = createTheme({
    typography: {
        fontSize: 10,
    },
    components: {
        MuiChip: {
            styleOverrides: {
                root: {
                    height: 20,
                }
            }
        }
    }
});
