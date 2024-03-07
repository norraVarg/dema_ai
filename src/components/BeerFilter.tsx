import { Button, FormLabel, Stack, TextField, ThemeProvider, createTheme, styled } from "@mui/material"
import { useState } from "react";
import { filterSignal } from "../App";
import { Signal } from "@preact/signals-react";
import { Filter } from "../types";

const DEFAULT_FILTER: Filter = {
    abv: {
        abv_gt: '',
        abv_lt: '',
    }
}

export const BeerFilter = () => {
    const [filter, setFilter] = useState<Filter>(getInitialFilter(filterSignal))

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

        if (minAbv !== '') {
            url.searchParams.set('abv_gt', minAbv);
        } else {
            url.searchParams.delete('abv_gt');
        }

        if (maxAbv !== '') {
            url.searchParams.set('abv_lt', maxAbv);
        } else {
            url.searchParams.delete('abv_lt');
        }

        window.history.pushState({}, '', url);

        filterSignal.value = url.searchParams;
    }

    return (
        <Container>
            <ThemeProvider theme={textFieldTheme}>
                <Stack flexDirection='row' alignItems='center' gap={2}>
                    <FormLabel>ABV</FormLabel>
                    <TextField
                        value={filter.abv.abv_gt}
                        onChange={onChangeMinAbv}
                        label="Min" variant="outlined" size="small" type='number' sx={{ width: 100 }} />
                    <span>-</span>
                    <TextField
                        value={filter.abv.abv_lt}
                        onChange={onChangeMaxAbv}
                        label="Max" variant="outlined" size="small" type='number' sx={{ width: 100 }} />
                    <Button onClick={onClickApplyFilter} variant="contained" sx={{ padding: '0.34rem', width: 160 }}>
                        Apply filters
                    </Button>
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

const textFieldTheme = createTheme({
    typography: {
        fontSize: 10,
    },
});

const getInitialFilter = (filterSignal: Signal<URLSearchParams | null>): Filter => {
    if (filterSignal.value) {
        const abv_gt = filterSignal.value.get('abv_gt');
        const abv_lt = filterSignal.value.get('abv_lt');

        return {
            abv: {
                abv_gt: abv_gt || '',
                abv_lt: abv_lt || '',
            }
        }
    }

    return DEFAULT_FILTER;
}