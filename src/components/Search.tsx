import { Autocomplete, TextField, ThemeProvider, createTheme, styled } from "@mui/material"

export const Search = () => {

    return (
        <Container>
            <ThemeProvider theme={autocompleteTheme}>
                <Autocomplete
                    disablePortal
                    options={[]}
                    sx={{ width: 283 }}
                    renderInput={(params) => <TextField {...params} label="Search by name" />}
                    // getOptionLabel={(option) => option.name}
                    multiple
                    size='small'
                />
            </ThemeProvider>
        </Container>
    )
}

const Container = styled("div")({
    display: "flex",
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
