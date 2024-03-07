import { Autocomplete, TextField, ThemeProvider, createTheme, styled } from "@mui/material"
import { Beer } from "../types"

interface Props {
    data: Beer[]
}

export const Search = (props: Props) => {
    const { data } = props

    return (
        <Container>
            <ThemeProvider theme={autocompleteTheme}>
                <Autocomplete
                    disablePortal
                    options={data}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Search by names" />}
                    getOptionLabel={(option) => option.name}
                    multiple
                    size='small'
                />
            </ThemeProvider>
        </Container>
    )
}

const Container = styled("div")({
    display: "flex",
    flexDirection: "column",
    gap: 16,
})

const autocompleteTheme = createTheme({
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
