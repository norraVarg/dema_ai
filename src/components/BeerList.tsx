import { Stack, ThemeProvider, Typography, createTheme, styled } from "@mui/material"
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid"
import { useQuery } from "@tanstack/react-query"
import { Beer } from "../types"
import { fetchBeers } from "../api"
import { filterSignal, selectedBeer } from "../App"
import { useEffect } from "react"
import { Search } from "./Search"
import { Pagination } from "./Pagination"

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

    const onRowClick = (params: GridRowParams<any>) => {
        selectedBeer.value = params.row as Beer
    }

    return (<Container>
        <Stack direction='row' justifyContent='space-between' flexWrap='wrap' minWidth={380}  >
            <Search data={data} />
            <Pagination />
        </Stack>
        <ThemeProvider theme={theme}>
            {data.length === 0
                ? (<Typography sx={{ fontSize: 14 }}>No beers found.</Typography>)
                : (<DataGridStyled
                    rows={data}
                    columns={columns}
                    hideFooter
                    disableRowSelectionOnClick
                    onRowClick={(params) => onRowClick(params)}
                    rowHeight={40}
                    columnHeaderHeight={40}
                />)}
        </ThemeProvider>
    </Container>)
}

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
    height: '80vh',
})

const theme = createTheme({
    typography: {
        fontSize: 10,
    },
    components: {
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
        fontSize: 14,
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
