import { ThemeProvider, createTheme, styled } from "@mui/material"
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid"
import { signal } from "@preact/signals-react"
import { useQuery } from "@tanstack/react-query"
import { Beer } from "../types"

export const selectedBeer = signal<Beer | null>(null)

export const BeerList = () => {
    const { isPending, error, data } = useQuery({
        queryKey: ['repoData'],
        queryFn: () =>
            fetch('https://api.punkapi.com/v2/beers').then((res) =>
                res.json(),
            ),
    })

    if (isPending) return (<Container>Loading...</Container>)

    if (error) return (<Container>An error has occurred: {error.message}</Container>)

    console.log('data', data)

    const onRowClick = (params: GridRowParams<any>) => {
        selectedBeer.value = params.row as Beer
    }

    return (<Container>
        <ThemeProvider theme={dataGridTheme}>
            <DataGridStyled
                rows={data}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: PAGE_SIZE_OPTIONS[0],
                        },
                    },
                }}
                pageSizeOptions={PAGE_SIZE_OPTIONS}
                disableRowSelectionOnClick
                onRowClick={(params) => onRowClick(params)}
                rowHeight={40}
                columnHeaderHeight={40}
            />
        </ThemeProvider>
    </Container>)
}

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
            console.log('params', params.row.image_url)
            return (<ImgStyled src={params.row.image_url} />)
        }
    },
];

const Container = styled("div")({
    display: "flex",
    flexDirection: "column",
})

const dataGridTheme = createTheme({
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
