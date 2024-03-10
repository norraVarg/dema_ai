import { Autocomplete, IconButton, Stack, TextField, ThemeProvider, Typography, createTheme, styled } from "@mui/material"
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { filterSignal } from "../signals";
import { PAGE_SIZE_OPTIONS, getPage, getPageSize, isFirstPage } from "./Pagination.utils";

export const Pagination = (): JSX.Element => {
    const onChangePageSize = (size: number) => {
        const url = new URL(window.location.href);
        url.searchParams.set('per_page', size.toString());
        window.history.pushState({}, '', url);
        filterSignal.value = url.searchParams;
    }

    const onClickPreviusPage = () => {
        const url = new URL(window.location.href);
        const page = url.searchParams.get('page');
        url.searchParams.set('page', (parseInt(page || '1') - 1).toString());
        window.history.pushState({}, '', url);
        filterSignal.value = url.searchParams;
    }

    const onClickNextPage = () => {
        const url = new URL(window.location.href);
        const page = url.searchParams.get('page');
        url.searchParams.set('page', (parseInt(page || '1') + 1).toString());
        window.history.pushState({}, '', url);
        filterSignal.value = url.searchParams;
    }

    return (<Container>
        <ThemeProvider theme={theme}>
            <Stack direction='row' alignItems='center' data-testid='pagination'>
                <Typography sx={{ fontSize: 12 }}>Items per page:</Typography>
                <Autocomplete
                    disablePortal
                    value={getPageSize(filterSignal.value)}
                    onChange={(_, size) => onChangePageSize(size)}
                    options={PAGE_SIZE_OPTIONS}
                    getOptionLabel={(option) => option.toString()}
                    sx={{ width: 56 }}
                    renderInput={(params) => <TextField {...params} />}
                    size='small'
                    disableClearable
                />
            </Stack>
            <Stack direction='row' alignItems='center'>
                <IconButton onClick={onClickPreviusPage} size='small' disabled={isFirstPage(filterSignal.value)}>
                    <KeyboardArrowLeftIcon fontSize="small" />
                </IconButton>
                <Typography sx={{ fontSize: 12 }}>Page: {getPage(filterSignal.value)}</Typography>
                {/* to improve: disable next page button when reaching the last page */}
                <IconButton onClick={onClickNextPage} size='small' >
                    <KeyboardArrowRightIcon fontSize="small" />
                </IconButton>
            </Stack>
        </ThemeProvider>
    </Container>)
}

const Container = styled("div")({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
})

const theme = createTheme({
    typography: {
        fontSize: 8,
    },
    components: {
        MuiAutocomplete: {
            styleOverrides: {
                root: {
                    '.MuiOutlinedInput-notchedOutline': {
                        border: 'none',
                    }
                },
            }
        },
    },
});