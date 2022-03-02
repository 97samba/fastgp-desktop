import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Stack,
    Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import moment from "moment";
import React, { useContext, useState } from "react";
import { FaCalendarAlt, FaPlane, FaShippingFast } from "react-icons/fa";
import { IoMdPricetag } from "react-icons/io";
import { MdPhone, MdQrCode2 } from "react-icons/md";
import QRCode from "react-qr-code";
import COLORS from "../../colors";
import AnnounceImage from "../../Images/Announce-4.svg";
import { CreationContext } from "../Pages/Creation";

const QrCodeAndSummary = ({ id }) => {
    const [open, setopen] = useState(false);

    const {
        departure,
        destination,
        distributionDate,
        prices,
        state,
        showFinishDialog,
        finishDialogOpen,
        hideDialog,
        history,
        errors,
    } = useContext(CreationContext);

    const QrCodePass = ({ label }) => {
        const url = "https://fir-c69a6.firebaseapp.com/view/";
        function getQRCodeValue() {
            return url + id;
        }
        return (
            <Stack direction="column" alignItems="center" spacing={2}>
                <QRCode
                    value={getQRCodeValue()}
                    bgColor="#F2F2F2F2"
                    fgColor={COLORS.primary}
                    size={80}
                />
                <Typography variant="caption">{label}</Typography>
            </Stack>
        );
    };
    const Summarydialog = () => {
        return (
            <Dialog
                open={finishDialogOpen}
                onClose={() => hideDialog(false)}
                fullWidth
            >
                <DialogTitle>Vous y êtes presque!</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {state.created
                            ? "Publication réussie, partagez cette annonce dans tous vos réseaux sociaux"
                            : "Publier l'annonce avant de partagez cette photo"}
                    </DialogContentText>
                    <Stack
                        mx={2}
                        px={2}
                        direction="row"
                        justifyContent="center"
                        flex={1}
                    >
                        <Box
                            // bgcolor="lightgray"
                            sx={{
                                backgroundImage: `url(${AnnounceImage})`,
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "100%",
                            }}
                        >
                            <Stack
                                direction="column"
                                minHeight={450}
                                minWidth={300}
                                alignItems="center"
                                justifyContent="center"
                                mt={2}
                                spacing={1.2}
                            >
                                <Stack
                                    direction="row"
                                    alignItems="center"
                                    spacing={1}
                                >
                                    <Typography
                                        color="primary"
                                        fontWeight="bold"
                                        variant="body1"
                                    >
                                        {departure?.name || "Ville"}
                                    </Typography>
                                    <FaPlane color={COLORS.warning} size={13} />
                                    <Typography
                                        color="primary"
                                        fontWeight="bold"
                                        variant="body1"
                                    >
                                        {destination?.name || "Ville"}
                                    </Typography>
                                </Stack>
                                <Stack
                                    direction="row"
                                    spacing={1}
                                    alignItems="center"
                                >
                                    <FaCalendarAlt
                                        color={COLORS.black}
                                        size={12}
                                    />
                                    <Typography
                                        color={COLORS.black}
                                        fontWeight="bold"
                                        variant="caption"
                                    >
                                        {moment(distributionDate).format(
                                            "D MMMM Y"
                                        )}
                                    </Typography>
                                </Stack>
                                <Stack
                                    direction="row"
                                    spacing={1}
                                    alignItems="center"
                                    textAlign="center"
                                    bgcolor={COLORS.primary}
                                    p={1}
                                    borderRadius={1}
                                >
                                    <IoMdPricetag color="white" size={15} />
                                    <Typography
                                        color="white"
                                        fontWeight="bold"
                                        variant="body1"
                                    >
                                        {
                                            prices.filter(
                                                (price) =>
                                                    price.type === "pricePerKG"
                                            )[0].price
                                        }
                                    </Typography>
                                    <Typography
                                        color="white"
                                        fontWeight="bold"
                                        variant="caption"
                                    >
                                        {state.currency} / KG
                                    </Typography>
                                </Stack>
                                <Stack
                                    direction="column"
                                    spacing={0.1}
                                    alignItems="center"
                                >
                                    <Stack
                                        direction="row"
                                        spacing={1}
                                        alignItems="center"
                                    >
                                        <MdPhone
                                            color={COLORS.black}
                                            size={12}
                                        />
                                        <Typography
                                            color={COLORS.black}
                                            variant="caption"
                                        >
                                            33 6 22 78 56 23
                                        </Typography>
                                    </Stack>
                                    <Stack
                                        direction="row"
                                        spacing={1}
                                        alignItems="center"
                                    >
                                        <MdPhone
                                            color={COLORS.black}
                                            size={12}
                                        />
                                        <Typography
                                            color={COLORS.black}
                                            variant="caption"
                                        >
                                            33 6 22 78 56 23
                                        </Typography>
                                    </Stack>
                                </Stack>
                                <Stack
                                    direction="row"
                                    spacing={1}
                                    alignItems="center"
                                >
                                    <MdQrCode2
                                        size={40}
                                        color={COLORS.primary}
                                    />
                                </Stack>

                                <Stack
                                    direction="row"
                                    spacing={1}
                                    alignItems="center"
                                >
                                    <Typography
                                        color="primary"
                                        fontWeight="bold"
                                        variant="caption"
                                    >
                                        FAST GP
                                    </Typography>
                                    <FaShippingFast
                                        color={COLORS.primary}
                                        size={15}
                                    />
                                </Stack>
                            </Stack>
                        </Box>
                    </Stack>
                    <Box mt={-7}>
                        {/* <QrCodePass label="Ce QRcode redirige vers votre annonce." /> */}
                    </Box>
                    <DialogActions>
                        {state.created ? (
                            <>
                                <Button
                                    onClick={() =>
                                        history.push(
                                            "/view/" + state.createdItemId
                                        )
                                    }
                                >
                                    Voir annonce
                                </Button>
                                <Button
                                    color="warning"
                                    onClick={() => history.push("/")}
                                >
                                    Quitter
                                </Button>
                            </>
                        ) : (
                            <Button
                                color="error"
                                onClick={() => hideDialog(false)}
                            >
                                Fermer
                            </Button>
                        )}
                    </DialogActions>
                </DialogContent>
            </Dialog>
        );
    };

    return (
        <Stack pt={2}>
            {errors.addError && (
                <Typography variant="body2" color="error">
                    Erreur, revérifiez les entrées SVP
                </Typography>
            )}
            <Button onClick={() => showFinishDialog(false)}>
                <Box pt={2}>
                    <QrCodePass label="Cliquer pour voir l'annonce" />
                </Box>
            </Button>
            <Summarydialog />
        </Stack>
    );
};

export default QrCodeAndSummary;
