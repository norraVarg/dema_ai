import { Autocomplete, IconButton, Stack, TextField, ThemeProvider, Typography, createTheme, styled } from "@mui/material"
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { filterSignal } from "../App";

const PAGE_SIZE_OPTIONS = [10, 20, 30]

export const Pagination = () => {

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
            <Stack direction='row' alignItems='center'>
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


const getPageSize = (params: URLSearchParams | null) => {
    if (!params) {
        return PAGE_SIZE_OPTIONS[0]
    }

    const pageSize = params.get('per_page')
    return pageSize ? parseInt(pageSize) : PAGE_SIZE_OPTIONS[0]
}

const getPage = (params: URLSearchParams | null) => {
    if (!params) {
        return 1
    }

    const page = params.get('page')
    return page ? parseInt(page) : 1
}

const isFirstPage = (params: URLSearchParams | null) => {
    if (!params) {
        return true
    }

    const page = params.get('page')
    return page ? parseInt(page) === 1 : true
}

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