import { Box, Modal, Stack, Typography, styled } from "@mui/material";
import { Signal } from "@preact/signals-react";
import { Beer } from "../types";

interface Props {
    selectedBeer: Signal<Beer | null>
}

// to improve: add more details
export const DetailsModal = (props: Props) => {
    const { selectedBeer } = props

    const onClose = () => {
        selectedBeer.value = null
    }

    return (
        <Modal
            open={selectedBeer.value !== null}
            onClose={onClose}
        >
            <Box sx={style}>
                <Typography variant="h6">
                    {selectedBeer.value?.name}
                </Typography>
                <Stack sx={{ flexDirection: 'row', gap: 4, mt: 2 }}>
                    <Stack gap={1.5}>
                        <Typography sx={{ fontSize: 15 }}>
                            {selectedBeer.value?.tagline}
                        </Typography>
                        <Typography sx={{ fontSize: 12, maxHeight: 200, overflowY: 'auto' }}>
                            {selectedBeer.value?.description}
                        </Typography>

                    </Stack>
                    <ImgStyled src={selectedBeer.value?.image_url} />
                </Stack>
                <Stack >
                    <Typography sx={{ fontSize: 15, mb: 0.5 }}>
                        Ingredients
                    </Typography>
                    <Stack sx={{ maxHeight: 200, overflowY: 'auto' }}>
                        <Typography sx={{ fontSize: 12 }}>
                            Malt: {selectedBeer.value?.ingredients.malt.map((malt) => malt.name).join(', ')}
                        </Typography>
                        <Typography sx={{ fontSize: 12 }}>
                            Hops: {selectedBeer.value?.ingredients.hops.map((hops) => hops.name).join(', ')}
                        </Typography>
                        <Typography sx={{ fontSize: 12 }}>
                            Yeast: {selectedBeer.value?.ingredients.yeast}
                        </Typography>
                    </Stack>
                    <Typography sx={{ fontSize: 15, mb: 0.5, mt: 1 }}>
                        Food Pairing
                    </Typography>
                    <Typography sx={{ fontSize: 12 }}>
                        {selectedBeer.value?.food_pairing.join(', ')}
                    </Typography>
                    <Typography sx={{ fontSize: 12, mt: 1 }}>
                        ABV: {selectedBeer.value?.abv}
                    </Typography>
                </Stack>

            </Box >
        </Modal >
    )
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,

    '@media only screen and (max-width: 500px)': {
        width: 200,
    }
};

const ImgStyled = styled("img")({
    width: '15%',
    height: '15%',
    aspectRatio: 'auto 168/661',
})