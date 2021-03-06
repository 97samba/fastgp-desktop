import {
    Button,
    CircularProgress,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Paper,
    Stack,
    Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import moment from "moment";
import React, { useContext } from "react";
import { FaAngleLeft, FaEdit, FaPlane, FaSuitcase } from "react-icons/fa";
import { IoCreateOutline, IoFolderOpenOutline } from "react-icons/io5";
import { MdCancel, MdCheck } from "react-icons/md";
import { useHistory } from "react-router-dom";
import COLORS from "../../colors";
import { useAuth } from "../../firebase/auth";
import { CreationContext } from "../Pages/Creation";

const StartingDialog = () => {
    const {
        state,
        setstate,
        uploadNewConfiguration,
        pageMode,
        editDialogLoading,
        seteditDialogLoading,
    } = useContext(CreationContext);
    const history = useHistory();
    const currentUser = useAuth();

    function handleNewPublication() {
        setstate({ ...state, openDialog: false });
        seteditDialogLoading(false);
    }

    function handleCreateFrom() {
        setstate({ ...state, dialogPage: "import" });
    }

    const MainDialog = () => {
        return (
            <Box>
                <DialogTitle>
                    Créer une nouvelle annonce ou s'inspirer d'une ancienne
                </DialogTitle>

                <DialogContent>
                    <DialogContentText>
                        Voici vos 5 dernières publications
                    </DialogContentText>
                    <Box mt={2}>
                        <Divider />
                        {state.dialogPage === "start" ? (
                            <Stack direction="row" spacing={2} p={2} my={2}>
                                <Paper sx={{ flex: 1 }}>
                                    <Button
                                        color="warning"
                                        onClick={handleNewPublication}
                                    >
                                        <Box p={2} textAlign="center">
                                            <IoCreateOutline
                                                size="40%"
                                                color={COLORS.warning}
                                            />
                                            <Typography>
                                                Une nouvelle annonce
                                            </Typography>
                                        </Box>
                                    </Button>
                                </Paper>
                                <Paper sx={{ flex: 1 }}>
                                    <Button
                                        color="primary"
                                        disabled={
                                            state.dialogLoading === false &&
                                            state?.flights?.length < 1
                                        }
                                        onClick={handleCreateFrom}
                                    >
                                        <Box p={2} textAlign="center">
                                            <IoFolderOpenOutline
                                                size="40%"
                                                color={COLORS.primary}
                                            />
                                            <Typography>
                                                S'inspirer d'une ancienne
                                            </Typography>
                                        </Box>
                                    </Button>
                                </Paper>
                            </Stack>
                        ) : (
                            <Box>
                                <List>
                                    {state.flights &&
                                        state.flights.map((flight, index) => (
                                            <ListItem
                                                key={index}
                                                onClick={() =>
                                                    uploadNewConfiguration(
                                                        index
                                                    )
                                                }
                                                disableGutters
                                            >
                                                <ListItemButton disableGutters>
                                                    <ListItemIcon>
                                                        <FaEdit />
                                                    </ListItemIcon>
                                                    <Box
                                                        flexGrow={1}
                                                        mr={{
                                                            xs: 1,
                                                            sm: 1,
                                                            md: 4,
                                                            lg: 4,
                                                        }}
                                                    >
                                                        <Stack
                                                            direction="row"
                                                            alignItems="center"
                                                            color="GrayText"
                                                            justifyContent="space-between"
                                                            spacing={{
                                                                xs: 1,
                                                                sm: 1,
                                                                md: 2,
                                                            }}
                                                            width={{
                                                                md: "80%",
                                                            }}
                                                        >
                                                            <Typography variant="body2">
                                                                {
                                                                    flight
                                                                        .departure
                                                                        .name
                                                                }
                                                            </Typography>
                                                            <FaPlane
                                                                color={
                                                                    COLORS.warning
                                                                }
                                                            />
                                                            <Typography variant="body2">
                                                                {
                                                                    flight
                                                                        .destination
                                                                        .name
                                                                }
                                                            </Typography>
                                                        </Stack>
                                                    </Box>
                                                    <Typography
                                                        color="GrayText"
                                                        variant="body2"
                                                    >
                                                        {moment(
                                                            flight.departureDate
                                                        ).format("D/MMM/Y")}
                                                    </Typography>
                                                </ListItemButton>
                                            </ListItem>
                                        ))}
                                </List>
                                <Button
                                    startIcon={<FaAngleLeft />}
                                    onClick={() =>
                                        setstate({
                                            ...state,
                                            dialogPage: "start",
                                        })
                                    }
                                >
                                    Retour
                                </Button>
                            </Box>
                        )}
                    </Box>
                </DialogContent>
            </Box>
        );
    };

    const VerificationGPDialog = () => {
        function getVerificationLabel(key) {
            if (key === "cni") return "Carte d'identité";
            if (key === "passport") return "Passeport";
            if (key === "kbis") return "Kbis entreprise";
            if (key === "sejour") return "Carte de séjour";
        }
        return (
            <>
                <DialogTitle>Verifier vos informations</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Certaines de vos informations ne sont validées, veuillez
                        les verifier avant de créer une annonce
                    </DialogContentText>
                    <Box py={2} px={2}>
                        <List>
                            <ListItemButton
                                disableGutters
                                sx={{ px: 1 }}
                                onClick={() =>
                                    history.push(
                                        "/profilDetails/" +
                                            currentUser?.uid +
                                            "/documents"
                                    )
                                }
                            >
                                <ListItem disableGutters>
                                    <ListItemText>
                                        {getVerificationLabel(
                                            state?.user?.documentIdentity
                                        )}
                                    </ListItemText>
                                    <ListItemIcon>
                                        {state?.user?.documentVerified ? (
                                            <MdCheck color="green" size={20} />
                                        ) : (
                                            <MdCancel color="red" size={20} />
                                        )}
                                    </ListItemIcon>
                                </ListItem>
                            </ListItemButton>
                            <Divider />
                            <ListItemButton
                                disableGutters
                                sx={{ px: 1 }}
                                onClick={() =>
                                    history.push(
                                        "/profilDetails/" +
                                            currentUser?.uid +
                                            "/documents"
                                    )
                                }
                            >
                                <ListItem disableGutters>
                                    <ListItemText>Email</ListItemText>
                                    <ListItemIcon>
                                        {state?.user?.emailVerified ? (
                                            <MdCheck color="green" size={20} />
                                        ) : (
                                            <MdCancel color="red" size={20} />
                                        )}
                                    </ListItemIcon>
                                </ListItem>
                            </ListItemButton>
                            <Divider />

                            <ListItemButton
                                disableGutters
                                sx={{ px: 1 }}
                                onClick={() =>
                                    history.push(
                                        "/profilDetails/" +
                                            currentUser?.uid +
                                            "/documents"
                                    )
                                }
                            >
                                <ListItem disableGutters>
                                    <ListItemText>Téléphone</ListItemText>

                                    <ListItemIcon>
                                        {state?.user?.phoneNumberVerified ? (
                                            <MdCheck color="green" size={20} />
                                        ) : (
                                            <MdCancel color="red" size={20} />
                                        )}
                                    </ListItemIcon>
                                </ListItem>
                            </ListItemButton>
                            <Divider />
                        </List>
                    </Box>
                    <Typography variant="caption">
                        La vérification du numéro est facultative pour créer une
                        annonce, mais obligatoire pour la suite.
                    </Typography>
                </DialogContent>
            </>
        );
    };

    const BecomeGpDialog = () => {
        return (
            <>
                <DialogTitle>Devenir un Covaliseur (GP)</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Vous avez un compte client, veuillez devenir un
                        covaliseur en quelques clics.
                    </DialogContentText>
                    <Stack
                        direction="row"
                        p={{ xs: 0, sm: 2, md: 4 }}
                        flex={1}
                        spacing={2}
                        justifyContent="center"
                    >
                        <Button
                            variant="contained"
                            endIcon={<MdCancel />}
                            onClick={() => history.push("/")}
                        >
                            Quitter
                        </Button>
                        <Button
                            variant="contained"
                            color="warning"
                            endIcon={<FaSuitcase />}
                            onClick={() => history.push("/register/becomeGp")}
                        >
                            Devenir Covaliseur
                        </Button>
                    </Stack>
                </DialogContent>
            </>
        );
    };

    const EditDialog = () => {
        return (
            <Box>
                <DialogTitle>Modification de l'annonce</DialogTitle>

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
            </Box>
        );
    };

    return (
        <Box>
            <Dialog open={state.openDialog || editDialogLoading}>
                {pageMode === "edit" ? (
                    <EditDialog />
                ) : (
                    <>
                        {!state.dialogLoading ? (
                            <MainDialog />
                        ) : (
                            // <>
                            //   {state?.user?.role === "GP" ? (
                            //     <>
                            //       {state?.user?.documentVerified && state?.user?.emailVerified ? (
                            //         <MainDialog />
                            //       ) : (
                            //         <VerificationGPDialog />
                            //       )}
                            //     </>
                            //   ) : (
                            //     <BecomeGpDialog />
                            //   )}
                            // </>
                            <Box p={3} flex={1} textAlign="center">
                                <Typography gutterBottom>
                                    Chargement de vos informations
                                </Typography>
                                <Box m={3}>
                                    <CircularProgress />
                                </Box>
                            </Box>
                        )}
                    </>
                )}
            </Dialog>
        </Box>
    );
};

export default StartingDialog;
