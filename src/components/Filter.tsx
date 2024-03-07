import { Button, FormLabel, Stack, TextField, ThemeProvider, Typography, createTheme, styled } from "@mui/material"
import { useState } from "react";
import { filterSignal } from "../App";

// to improve: add more filters
interface Filter {
    abv: {
        abv_gt: string,
        abv_lt: string,
    }
}

const INITIAL_FILTER: Filter = {
    abv: {
        abv_gt: '',
        abv_lt: '',
    }
}

export const Filter = () => {
    const [filter, setFilter] = useState<Filter>(INITIAL_FILTER)

    const onChangeMinAbv = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilter({
            ...filter,
            abv: {
                ...filter.abv,
                abv_gt: e.target.value
            }
        })
    }

    const onChangeMaxAbv = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilter({
            ...filter,
            abv: {
                ...filter.abv,
                abv_lt: e.target.value
            }
        })
    }

    const onClickApplyFilter = () => {
        // to improve: display error message when abv_gt is greater than abv_lt
        const url = new URL(window.location.href);

        const minAbv = filter.abv.abv_gt;
        const maxAbv = filter.abv.abv_lt;

        if (minAbv) {
            url.searchParams.set('abv_gt', minAbv.toString());
        } else {
            url.searchParams.delete('abv_gt');
        }

        if (maxAbv) {
            url.searchParams.set('abv_lt', maxAbv.toString());
        } else {
            url.searchParams.delete('abv_lt');
        }

        window.history.pushState({}, '', url);

        filterSignal.value = url.searchParams;
    }

    return (
        <Container>
            <ThemeProvider theme={TextFieldTheme}>
                <Typography variant="h6" fontSize={20}>
                    Filters
                </Typography>
                <Stack flexDirection='row' alignItems='center' gap={2}>
                    <FormLabel>ABV</FormLabel>
                    <TextField
                        value={filter.abv.abv_gt}
                        onChange={onChangeMinAbv}
                        label="Min" variant="outlined" size="small" type='number' sx={{ width: 100 }} />
                    <span> - </span>
                    <TextField
                        value={filter.abv.abv_lt}
                        onChange={onChangeMaxAbv}
                        label="Max" variant="outlined" size="small" type='number' sx={{ width: 100 }} />
                    <Button
                        onClick={onClickApplyFilter}
                        variant="contained" >Apply</Button>
                </Stack>
            </ThemeProvider>
        </Container>
    )
}

const Container = styled("div")({
    display: "flex",
    flexDirection: "column",
    gap: 16,
})



const TextFieldTheme = createTheme({
    typography: {
        fontSize: 10,
    },

});
