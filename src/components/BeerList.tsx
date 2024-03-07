import { Autocomplete, IconButton, Stack, TextField, ThemeProvider, Typography, createTheme, styled } from "@mui/material"
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid"
import { useQuery } from "@tanstack/react-query"
import { Beer } from "../types"
import { fetchBeers } from "../api"
import { filterSignal, selectedBeer } from "../App"
import { useEffect } from "react"
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

export const BeerList = () => {
    const { isPending, error, data, refetch } = useQuery({
        queryKey: ['repoData'],
        queryFn: () => fetchBeers(filterSignal.value),
        refetchOnWindowFocus: false,
    })

    useEffect(() => {
        refetch()
    }, [filterSignal.value])

    if (isPending) return (<Typography sx={{ fontSize: 14 }}>Loading...</Typography>)
    if (error) return (<Typography sx={{ fontSize: 14 }}>An error has occurred: {error.message} </Typography>)
    if (data.length === 0) return (<Typography sx={{ fontSize: 14 }}>No beers found.</Typography>)

    const onRowClick = (params: GridRowParams<any>) => {
        selectedBeer.value = params.row as Beer
    }

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
            <DataGridStyled
                rows={data}
                columns={columns}
                hideFooter
                disableRowSelectionOnClick
                onRowClick={(params) => onRowClick(params)}
                rowHeight={40}
                columnHeaderHeight={40} />
            <Pagination>
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
                    <IconButton onClick={onClickPreviusPage} size='small'>
                        <KeyboardArrowLeftIcon fontSize="small" />
                    </IconButton>
                    <Typography sx={{ fontSize: 12 }}>Page: {getPage(filterSignal.value)}</Typography>
                    <IconButton onClick={onClickNextPage} size='small' >
                        <KeyboardArrowRightIcon fontSize="small" />
                    </IconButton>
                </Stack>
            </Pagination>
        </ThemeProvider>
    </Container>)
}

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

const Pagination = styled("div")({
    display: "flex",
    alignItems: "center",
})

const PAGE_SIZE_OPTIONS = [10, 20, 30]

const columns: GridColDef[] = [
    {
        field: 'name',
        headerName: 'Name',
        minWidth: 160,
    },
    {
        field: 'tagline',
        headerName: 'Tagline',
        minWidth: 280,

    },
    {
        field: 'abv',
        headerName: 'ABV',
        minWidth: 120,

    },
    {
        field: 'image',
        headerName: 'Image',
        minWidth: 120,
        filterable: false,
        renderCell: (params) => {
            return (<ImgStyled src={params.row.image_url} />)
        }
    },
];

const Container = styled("div")({
    display: "flex",
    flexDirection: "column",
    gap: 8,
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
        MuiPaper: {
            styleOverrides: {
                root: {
                    '& .MuiMenuItem-root': {
                        fontSize: 12,
                    },
                },
            },
        },
    },
});

const DataGridStyled = styled(DataGrid)({
    '.MuiDataGrid-row': {
        cursor: "pointer",
    },
    '.MuiDataGrid-columnHeader': {
        fontSize: 16,
    },
    '.MuiDataGrid-cell': {
        fontSize: 12,
    },
    '.MuiDataGrid-footerContainer': {
        minHeight: 32,

    },
    '.MuiTablePagination-root': {
        '& .MuiToolbar-root': {
            minHeight: 32,
        },
        '& *': {
            fontSize: 12,
            marginTop: 0,
            marginBottom: 0,
        }
    }
})

const ImgStyled = styled("img")({
    width: '8%',
    aspectRatio: 'auto 168/661',
})
