import { Box, Modal, Typography } from "@mui/material";
import { selectedBeer } from "./BeerList";

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
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {selectedBeer.value?.name}
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    {selectedBeer.value?.description}
                </Typography>
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