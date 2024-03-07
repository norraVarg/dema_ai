import { Box, Modal, Stack, Typography, styled } from "@mui/material";
import { selectedBeer } from "../App";

// to improve: add more details
export const DetailsModal = () => {
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
                        <Stack>
                            <Typography sx={{ fontSize: 15, mb: 1 }}>
                                Ingredients
                            </Typography>
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
                        <Typography sx={{ fontSize: 12, }}>
                            Food Pairing: {selectedBeer.value?.food_pairing.join(', ')}
                        </Typography>
                        <Typography sx={{ fontSize: 12, }}>
                            ABV: {selectedBeer.value?.abv}
                        </Typography>
                    </Stack>
                    <ImgStyled src={selectedBeer.value?.image_url} />
                </Stack>
            </Box>
        </Modal>
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
};

const ImgStyled = styled("img")({
    width: '20%',
    height: '20%',
    aspectRatio: 'auto 168/661',
})