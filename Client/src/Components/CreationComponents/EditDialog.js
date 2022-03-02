import {
    CircularProgress,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Stack,
    Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext } from "react";
import { CreationContext } from "../Pages/Creation";

const EditDialog = () => {
    const { editDialogLoading } = useContext(CreationContext);
    return (
        <Box>
            <Dialog open={editDialogLoading}>
                <DialogTitle>Modification du vol</DialogTitle>
                <DialogContent>
                    <DialogContentText variant="body2">
                        Vous ne pouvez pas modifier les villes, merci pour votre
                        comprehension.
                    </DialogContentText>
                    <Stack flex={1} my={4} alignItems="center" spacing={2}>
                        <CircularProgress size={50} />
                        <Typography variant="body1" color="GrayText">
                            Chargement des informations du vol
                        </Typography>
                    </Stack>
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default EditDialog;
