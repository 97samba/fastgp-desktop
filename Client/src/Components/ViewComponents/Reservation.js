import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    Divider,
    FormControlLabel,
    FormLabel,
    Grid,
    ListItemIcon,
    MenuItem,
    Paper,
    Radio,
    RadioGroup,
    Skeleton,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useState } from "react";
import {
    FaBoxTissue,
    FaLaptop,
    FaPassport,
    FaPhoneAlt,
    FaSprayCan,
    FaUserCircle,
    FaWeightHanging,
} from "react-icons/fa";
import { MdExpandMore } from "react-icons/md";
import { IoFastFoodOutline, IoPhonePortraitOutline } from "react-icons/io5";
import BoardingPass from "../ViewComponents/BoardingPass";
import { ViewContext } from "../Pages/View";

import { GiHeartNecklace } from "react-icons/gi";
import { AuthContext } from "../../Providers/AuthProvider";
import { postUserReservation } from "../../firebase/db";
import ReservationDialog from "./ReservationDialog";

const Reservation = () => {
    const {
        sender,
        setsender,
        receiver,
        setreceiver,
        currentUser,
        flightState,
        history,
        loading,
    } = useContext(ViewContext);
    const { handleOpen } = useContext(AuthContext);

    const [reservationDialogOpen, setreservationDialogOpen] = useState(false);
    const [reservationLoading, setreservationLoading] = useState(false);
    const [title, settitle] = useState("Confirmation de la réservation");
    const [reservationId, setreservationId] = useState("");
    const [reservating, setreservating] = useState(false);

    const [isReceiver, setisReceiver] = useState("yes");
    const [state, setstate] = useState({
        itemDescription: "",
        error: false,
        accordionOpen: false,
    });
    const [payer, setpayer] = useState("Envoyeur");
    const [itemType, setitemType] = useState("thing");

    function handleBagageTypeChange(e) {
        console.log(`e`, e.target);
        setstate({ ...state, itemType: e.target.value });
    }

    function handleItemDescriptionChange(e) {
        setstate({ ...state, itemDescription: e.target.value });
    }

    /**
     *
     * @returns boolean retourne false si erreur et true si les champs sont ok
     */
    function verifyReservationEntries() {
        if (
            state.itemDescription === "" ||
            sender.firstName === "" ||
            sender.lastName === "" ||
            sender.phoneNumber === ""
        ) {
            setstate({ ...state, error: true });
            return false;
        } else {
            if (
                isReceiver !== "yes" &&
                (state.payer === "" ||
                    receiver.firstName === "" ||
                    receiver.lastName === "" ||
                    receiver.phoneNumber === "")
            ) {
                setstate({ ...state, error: true });

                return false;
            } else {
                return true;
            }
        }
    }

    async function handleReservation() {
        if (currentUser?.uid) {
            if (verifyReservationEntries()) {
                setstate({ ...state, error: false });
                setreservationLoading(true);
                settitle("Réservation en cours");
                setreservating(true);
                var next = await postUserReservation(
                    sender,
                    receiver,
                    flightState,
                    { ...state, itemType, payer },
                    currentUser?.uid
                );
                console.log("reservation ", next);
                setreservationId(next);
                setreservationLoading(false);
                if (next !== "") {
                    settitle("Réservation envoyée !");
                } else {
                    settitle("Erreur lors de la réservation");
                    setstate({ ...state, error: true });
                }
            }
        } else {
            handleOpen();
        }
    }
    function showConfirmationDialog() {
        let success = verifyReservationEntries();
        console.log("success", success);
        if (success) {
            console.log("showing dialog");
            setstate({ ...state, error: false });
            setreservationDialogOpen(true);
        }
    }

    const bagageType = [
        { label: "Colis pesé", value: "thing", icon: <FaWeightHanging /> },
        {
            label: "Téléphone",
            value: "phone",
            icon: <IoPhonePortraitOutline />,
        },
        { label: "Ordinateur", value: "computer", icon: <FaLaptop /> },
        { label: "Parfum", value: "fragrance", icon: <FaSprayCan /> },
        { label: "Documents", value: "paper", icon: <FaPassport /> },
        { label: "Bijoux", value: "jewel", icon: <GiHeartNecklace /> },
        { label: "Alimentaire", value: "food", icon: <IoFastFoodOutline /> },
    ];
    return (
        <Paper
            sx={{ p: 3, boxShadow: "0px 1px 3px rgba(3, 0, 71, 0.2)" }}
            elevation={0}
        >
            {loading ? (
                <Stack alignItems="center" spacing={2}>
                    <Skeleton
                        variant="rectangular"
                        height={200}
                        width="95%"
                        sx={{ borderRadius: 2 }}
                    />
                    <Skeleton variant="rectangular" height={50} width="95%" />
                </Stack>
            ) : (
                <>
                    <Typography gutterBottom>Votre réservation</Typography>

                    <Box>
                        <Typography
                            variant="body2"
                            color="GrayText"
                            flexGrow={1}
                        ></Typography>
                        <Accordion
                            variant="outlined"
                            onClick={() =>
                                setstate({ ...state, accordionOpen: true })
                            }
                            disabled={!currentUser?.uid}
                        >
                            <AccordionSummary
                                expandIcon={<MdExpandMore />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                            >
                                {currentUser?.uid ? (
                                    <Typography>
                                        Remplissez votre ticket
                                    </Typography>
                                ) : (
                                    <Typography>
                                        Connectez-vous pour faire une
                                        réservation
                                    </Typography>
                                )}
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography
                                    gutterBottom
                                    mb={2}
                                    fontWeight="bold"
                                    color="GrayText"
                                    variant="body2"
                                >
                                    Envoyeur
                                </Typography>
                                <Grid
                                    container
                                    mb={1}
                                    rowSpacing={2}
                                    columnSpacing={4}
                                >
                                    <Grid
                                        item
                                        xs={12}
                                        sm={12}
                                        md={6}
                                        lg={6}
                                        xl={6}
                                    >
                                        <TextField
                                            label="Prenom"
                                            size="small"
                                            error={
                                                state.error &&
                                                sender.firstName === ""
                                            }
                                            helperText={
                                                state.error &&
                                                sender.firstName === "" &&
                                                "Champs obligatoire"
                                            }
                                            disabled={currentUser?.uid}
                                            value={sender.firstName}
                                            fullWidth
                                            InputProps={{
                                                endAdornment: (
                                                    <FaUserCircle color="gray" />
                                                ),
                                            }}
                                            onChange={(e) =>
                                                setsender({
                                                    ...sender,
                                                    firstName: e.target.value,
                                                })
                                            }
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        xs={12}
                                        sm={12}
                                        md={6}
                                        lg={6}
                                        xl={6}
                                    >
                                        <TextField
                                            label="Nom"
                                            size="small"
                                            helperText={
                                                state.error &&
                                                sender.lastName === "" &&
                                                "Champs obligatoire"
                                            }
                                            value={sender.lastName}
                                            error={
                                                state.error &&
                                                sender.lastName === ""
                                            }
                                            disabled={currentUser?.uid}
                                            fullWidth
                                            InputProps={{
                                                endAdornment: (
                                                    <FaUserCircle color="gray" />
                                                ),
                                            }}
                                            onChange={(e) =>
                                                setsender({
                                                    ...sender,
                                                    lastName: e.target.value,
                                                })
                                            }
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        xs={12}
                                        sm={12}
                                        md={6}
                                        lg={6}
                                        xl={6}
                                    >
                                        <TextField
                                            label="Télephone"
                                            size="small"
                                            helperText={
                                                state.error &&
                                                sender.phoneNumber === "" &&
                                                "Champs obligatoire"
                                            }
                                            type="tel"
                                            value={sender.phoneNumber}
                                            error={
                                                state.error &&
                                                sender.phoneNumber === ""
                                            }
                                            fullWidth
                                            InputProps={{
                                                endAdornment: (
                                                    <FaPhoneAlt color="gray" />
                                                ),
                                            }}
                                            onChange={(e) =>
                                                setsender({
                                                    ...sender,
                                                    phoneNumber: e.target.value,
                                                })
                                            }
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        xs={12}
                                        sm={12}
                                        md={6}
                                        lg={6}
                                        xl={6}
                                    >
                                        <TextField
                                            select
                                            label="Type de bagage"
                                            fullWidth
                                            size="small"
                                            value={itemType}
                                            error={
                                                state.error && itemType === ""
                                            }
                                            onChange={(e) =>
                                                setitemType(e.target.value)
                                            }
                                        >
                                            {bagageType.map((type, index) => (
                                                <MenuItem
                                                    value={type.value}
                                                    key={index}
                                                >
                                                    <ListItemIcon>
                                                        {type.icon}
                                                    </ListItemIcon>
                                                    {type.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Grid
                                        item
                                        xs={12}
                                        sm={12}
                                        md={12}
                                        lg={12}
                                        xl={12}
                                    >
                                        <TextField
                                            label="Description du contenu"
                                            minRows={3}
                                            error={
                                                state.error &&
                                                state.itemDescription === ""
                                            }
                                            helperText={
                                                state.error &&
                                                state.itemDescription === "" &&
                                                "Description obligatoire"
                                            }
                                            placeholder="Ex : description du colis, modéle téléphone, modéle ordinateur, document, nombre d'articles ...etc "
                                            multiline
                                            fullWidth
                                            size="small"
                                            value={state.itemDescription}
                                            onChange={
                                                handleItemDescriptionChange
                                            }
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        xs={12}
                                        sm={12}
                                        md={12}
                                        lg={12}
                                        xl={12}
                                    >
                                        <Stack
                                            direction={{
                                                xs: "column",
                                                md: "row",
                                            }}
                                            alignItems="center"
                                            spacing={3}
                                        >
                                            <FormLabel>
                                                Etes-vous le receveur ?
                                            </FormLabel>

                                            <RadioGroup
                                                row
                                                value={isReceiver}
                                                onChange={(e, value) =>
                                                    setisReceiver(
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <FormControlLabel
                                                    value={"yes"}
                                                    label="Oui"
                                                    control={
                                                        <Radio size="small" />
                                                    }
                                                />
                                                <FormControlLabel
                                                    value="no"
                                                    label="Non"
                                                    control={
                                                        <Radio size="small" />
                                                    }
                                                />
                                            </RadioGroup>
                                        </Stack>
                                    </Grid>
                                </Grid>
                                {isReceiver === "no" ? (
                                    <Grid
                                        container
                                        mb={2}
                                        rowSpacing={2}
                                        columnSpacing={4}
                                    >
                                        <Grid
                                            item
                                            xs={12}
                                            sm={12}
                                            md={12}
                                            xl={12}
                                            lg={12}
                                        >
                                            <Typography
                                                fontWeight="bold"
                                                color="GrayText"
                                                variant="body2"
                                            >
                                                Receveur
                                            </Typography>
                                        </Grid>
                                        <Grid
                                            item
                                            xs={12}
                                            sm={12}
                                            md={6}
                                            lg={6}
                                            xl={6}
                                        >
                                            <TextField
                                                label="Prenom"
                                                size="small"
                                                error={
                                                    state.error &&
                                                    isReceiver === "no" &&
                                                    receiver.firstName === ""
                                                }
                                                helperText={
                                                    state.error &&
                                                    isReceiver === "no" &&
                                                    receiver.firstName === "" &&
                                                    "Champs obligatoire"
                                                }
                                                value={receiver.firstName}
                                                fullWidth
                                                InputProps={{
                                                    endAdornment: (
                                                        <FaUserCircle color="gray" />
                                                    ),
                                                }}
                                                onChange={(e) =>
                                                    setreceiver({
                                                        ...sender,
                                                        firstName:
                                                            e.target.value,
                                                    })
                                                }
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            xs={12}
                                            sm={12}
                                            md={6}
                                            lg={6}
                                            xl={6}
                                        >
                                            <TextField
                                                label="Nom"
                                                size="small"
                                                error={
                                                    state.error &&
                                                    isReceiver === "no" &&
                                                    receiver.lastName === ""
                                                }
                                                helperText={
                                                    state.error &&
                                                    isReceiver === "no" &&
                                                    receiver.lastName === "" &&
                                                    "Champs obligatoire"
                                                }
                                                value={receiver.lastName}
                                                fullWidth
                                                InputProps={{
                                                    endAdornment: (
                                                        <FaUserCircle color="gray" />
                                                    ),
                                                }}
                                                onChange={(e) =>
                                                    setreceiver({
                                                        ...receiver,
                                                        lastName:
                                                            e.target.value,
                                                    })
                                                }
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            xs={12}
                                            sm={12}
                                            md={6}
                                            lg={6}
                                            xl={6}
                                        >
                                            <TextField
                                                label="Télephone"
                                                size="small"
                                                error={
                                                    state.error &&
                                                    isReceiver === "no" &&
                                                    receiver.phoneNumber === ""
                                                }
                                                helperText={
                                                    state.error &&
                                                    isReceiver === "no" &&
                                                    receiver.phoneNumber ===
                                                        "" &&
                                                    "Champs obligatoire"
                                                }
                                                type="tel"
                                                value={receiver.phoneNumber}
                                                fullWidth
                                                InputProps={{
                                                    endAdornment: (
                                                        <FaPhoneAlt color="gray" />
                                                    ),
                                                }}
                                                onChange={(e) =>
                                                    setreceiver({
                                                        ...receiver,
                                                        phoneNumber:
                                                            e.target.value,
                                                    })
                                                }
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            xs={12}
                                            sm={12}
                                            md={6}
                                            lg={6}
                                            xl={6}
                                        >
                                            <TextField
                                                select
                                                label="Qui paye ?"
                                                fullWidth
                                                size="small"
                                                value={payer}
                                                onChange={(e) =>
                                                    setpayer(e.target.value)
                                                }
                                            >
                                                {["Envoyeur", "Receveur"].map(
                                                    (type, index) => (
                                                        <MenuItem
                                                            value={type}
                                                            key={index}
                                                        >
                                                            {type}
                                                        </MenuItem>
                                                    )
                                                )}
                                            </TextField>
                                        </Grid>
                                    </Grid>
                                ) : null}

                                <Button
                                    variant="contained"
                                    size="small"
                                    onClick={showConfirmationDialog}
                                    fullWidth
                                    endIcon={<FaBoxTissue />}
                                >
                                    Réserver
                                </Button>
                                {state.error && (
                                    <Typography
                                        variant="body2"
                                        color="error"
                                        textAlign="center"
                                        mt={2}
                                    >
                                        Veuillez vérifier tous les champs svp
                                    </Typography>
                                )}
                            </AccordionDetails>
                        </Accordion>
                    </Box>
                    <ReservationDialog
                        reservationId={reservationId}
                        open={reservationDialogOpen}
                        setOpen={setreservationDialogOpen}
                        loading={reservationLoading}
                        handleReservation={handleReservation}
                        sender={sender}
                        reciever={receiver}
                        isReciever={isReceiver}
                        flight={flightState}
                        payer={payer}
                        title={title}
                        itemType={
                            bagageType.filter(
                                (element) => element.value === itemType
                            )[0].label
                        }
                    />
                </>
            )}
        </Paper>
    );
};

export default Reservation;
