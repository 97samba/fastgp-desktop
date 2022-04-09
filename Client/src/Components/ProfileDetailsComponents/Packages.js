//Mes Colis

import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    Divider,
    Grid,
    IconButton,
    Link,
    Paper,
    Skeleton,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import {
    FaEuroSign,
    FaHandHolding,
    FaPlaneDeparture,
    FaUserAlt,
} from "react-icons/fa";
import { IoMdSave } from "react-icons/io";
import {
    MdArrowRight,
    MdExpandMore,
    MdOutlineTextsms,
    MdPhone,
    MdTextsms,
} from "react-icons/md";
import COLORS from "../../colors";
import { ProfileDetailsContext } from "../Pages/ProfileDetails";
import moment from "moment";
import BoardingPass from "../ViewComponents/BoardingPass";
import { useHistory, useParams } from "react-router-dom";
import ReservationViewer from "./ReservationViewer";
import { GiPayMoney } from "react-icons/gi";

const bagageType = [
    { label: "Colis pesé", value: "thing" },
    {
        label: "Téléphone",
        value: "phone",
    },
    { label: "Ordinateur", value: "computer" },
    { label: "Parfum", value: "fragrance" },
    { label: "Documents", value: "paper" },
    { label: "Bijoux", value: "jewel" },
    { label: "Alimentaire", value: "food" },
];

const AddReservation = ({ setediting }) => {
    const { user } = useContext(ProfileDetailsContext);
    const [state, setstate] = useState({
        firstName: "",
        address: "",
        lastName: "",
        phone: "",
    });

    function handleSave() {
        setediting(false);
        console.log(`state`, state);
    }

    function handleReturn() {
        setediting(false);
    }

    return (
        <Box>
            <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                <FaUserAlt color={COLORS.warning} />
                <Typography
                    fontWeight="bold"
                    variant="h5"
                    color="primary"
                    flexGrow={1}
                >
                    Ajouter une réservation
                </Typography>
                <Button
                    varaint="contained"
                    color="warning"
                    onClick={handleReturn}
                >
                    Retour
                </Button>
            </Stack>
            <Paper
                elevation={0}
                sx={{ boxShadow: "0px 1px 3px rgba(3, 0, 71, 0.2)" }}
            >
                <Box p={2} my={1}>
                    <Grid container spacing={3} pb={1}>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                            <TextField
                                fullWidth
                                label="Prénom"
                                size="small"
                                onChange={(e) =>
                                    setstate({
                                        ...state,
                                        firstName: e.target.value,
                                    })
                                }
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                            <TextField
                                fullWidth
                                label="Nom"
                                size="small"
                                onChange={(e) =>
                                    setstate({
                                        ...state,
                                        lastName: e.target.value,
                                    })
                                }
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                            <TextField
                                fullWidth
                                label="Adresse"
                                size="small"
                                onChange={(e) =>
                                    setstate({
                                        ...state,
                                        address: e.target.value,
                                    })
                                }
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                            <TextField
                                fullWidth
                                label="Téléphone"
                                type="tel"
                                size="small"
                                onChange={(e) =>
                                    setstate({
                                        ...state,
                                        phone: e.target.value,
                                    })
                                }
                            />
                        </Grid>
                    </Grid>
                    <Button
                        endIcon={<IoMdSave />}
                        variant="contained"
                        onClick={handleSave}
                    >
                        Enregister
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
};
const PackageSkeleton = () => {
    return (
        <Paper
            sx={{ flex: 1, boxShadow: "0px 1px 3px rgba(3, 0, 71, 0.2)" }}
            elevation={0}
        >
            <Grid
                container
                spacing={1}
                display="flex"
                color={COLORS.black}
                p={1}
            >
                <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                    <Typography></Typography>
                    <Skeleton height={18} width="50%" />
                </Grid>
                <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                    <Skeleton height={15} width="50%" />
                </Grid>
                <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                    <Skeleton height={15} width="50%" />
                </Grid>
                <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                    <Skeleton height={15} width="50%" />
                </Grid>
            </Grid>
        </Paper>
    );
};

const Header = () => {
    return (
        <Box>
            <Grid
                container
                p={1}
                spacing={1}
                display="flex"
                color={COLORS.black}
            >
                <Grid item xs={6} sm={6} md={4} lg={4} xl={4}>
                    <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="GrayText"
                        noWrap
                    >
                        Villes
                    </Typography>
                </Grid>
                <Grid item xs={3} sm={3} md={2} lg={2} xl={2}>
                    <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="GrayText"
                        noWrap
                    >
                        Etat
                    </Typography>
                </Grid>
                <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                    <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="GrayText"
                        noWrap
                    >
                        Date
                    </Typography>
                </Grid>
                <Grid
                    item
                    xs={3}
                    sm={3}
                    md={3}
                    lg={3}
                    xl={3}
                    display={{ xs: "none", sm: "none", md: "block" }}
                >
                    <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="GrayText"
                        noWrap
                    >
                        Prix
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
};

const InformationViewer = ({ icon, label, information }) => {
    return (
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Stack direction="row" spacing={1}>
                <IconButton>{icon}</IconButton>

                <Typography
                    gutterBottom
                    color={COLORS.black}
                    fontWeight={555}
                    variant="body1"
                    flexGrow={1}
                >
                    {label}
                </Typography>
                <Typography variant="body1" color="GrayText">
                    {information}
                </Typography>
            </Stack>
            <Divider sx={{ my: 0.5 }} />
        </Grid>
    );
};

const Package = ({ data, goToReservation }) => {
    const Status = ({ text }) => {
        function getColor() {
            if (text === "ok")
                return {
                    color: "#e7f9ed",
                    text: "Validée",
                    textColor: "green",
                };
            if (text === "ko")
                return { color: "#ffeae9", text: "Annulée", textColor: "red" };
            if (text === "pending")
                return {
                    color: "#f9f6e7",
                    text: "En attente",
                    textColor: "orange",
                };
        }
        return (
            <Typography
                sx={{
                    px: 1,
                    py: 0.5,
                    backgroundColor: getColor().color,
                    borderRadius: 5,
                }}
                color={getColor().textColor}
                textAlign="center"
                variant="caption"
                noWrap
            >
                {getColor().text}
            </Typography>
        );
    };

    function getPrice() {
        if (data?.prices) {
            if (data.itemType === "thing")
                return `${data.prices.pricePerKG} ${data.currency} /Kg`;
            else return "à déterminer";
        } else {
            return "à déterminer";
        }
    }
    function getitemType() {
        return bagageType.filter(
            (element) => element.value === data.itemType
        )[0];
    }

    return (
        <Paper
            sx={{ flex: 1, boxShadow: "0px 1px 3px rgba(3, 0, 71, 0.2)" }}
            elevation={0}
        >
            <Accordion elevation={0}>
                <AccordionSummary
                    expandIcon={<MdExpandMore />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Grid
                        container
                        spacing={1}
                        display="flex"
                        color={COLORS.black}
                    >
                        <Grid item xs={6} sm={6} md={4} lg={4} xl={4}>
                            <Typography
                                variant="body1"
                                fontWeight={600}
                                color="primary"
                                noWrap
                            >
                                {data?.departure.name +
                                    " - " +
                                    data?.destination.name}
                            </Typography>
                        </Grid>
                        <Grid item xs={3} sm={3} md={2} lg={2} xl={2}>
                            <Status text={data.status} />
                        </Grid>
                        <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                            <Typography
                                variant="body2"
                                fontWeight={500}
                                noWrap
                                display={{
                                    xs: "none",
                                    sm: "none",
                                    md: "block",
                                }}
                            >
                                {moment(data.reservationDate).format(
                                    "DD MMM Y "
                                )}
                            </Typography>
                            <Typography
                                variant="body2"
                                fontWeight={500}
                                noWrap
                                display={{
                                    xs: "block",
                                    sm: "block",
                                    md: "none",
                                }}
                            >
                                {moment(data.reservationDate).format(
                                    "DD/MM/YY"
                                )}
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            xs={3}
                            sm={3}
                            md={3}
                            lg={3}
                            xl={3}
                            display={{ xs: "none", sm: "none", md: "block" }}
                        >
                            <Typography
                                variant="body2"
                                fontWeight={500}
                                noWrap
                                color={
                                    data.prices ? COLORS.warning : COLORS.black
                                }
                            >
                                {getPrice()}
                            </Typography>
                        </Grid>
                    </Grid>
                </AccordionSummary>
                <AccordionDetails sx={{ mx: { xs: 1, md: 2 } }}>
                    <Grid container rowSpacing={2} columnSpacing={6}>
                        <InformationViewer
                            icon={
                                <FaUserAlt size={13} color={COLORS.primary} />
                            }
                            label="Transporteur"
                            information={
                                <Link
                                    href={
                                        "/profilDetails/" +
                                        data.gpId +
                                        "/myProfile"
                                    }
                                    underline="hover"
                                >
                                    <Typography>
                                        {data.publisher.firstName +
                                            " " +
                                            data.publisher.lastName}
                                    </Typography>
                                </Link>
                            }
                        />
                        <InformationViewer
                            icon={
                                <FaPlaneDeparture
                                    size={15}
                                    color={COLORS.primary}
                                />
                            }
                            label="Annonce"
                            information={
                                <Link
                                    href={"/view/" + data.flightId}
                                    underline="hover"
                                >
                                    <Typography>Cliquer ici</Typography>
                                </Link>
                            }
                        />
                        <InformationViewer
                            icon={<MdPhone size={15} color={COLORS.primary} />}
                            label="Appeler"
                            information={
                                <Link
                                    href={"tel:" + data.publisher.phone}
                                    underline="hover"
                                >
                                    <Typography>
                                        {data.publisher.phone}
                                    </Typography>
                                </Link>
                            }
                        />
                        <InformationViewer
                            icon={
                                <MdTextsms size={15} color={COLORS.primary} />
                            }
                            label="Description"
                            information={
                                <Typography>{data.itemDescription}</Typography>
                            }
                        />
                        <InformationViewer
                            icon={
                                <FaHandHolding
                                    size={16}
                                    color={COLORS.primary}
                                />
                            }
                            label="Receveur"
                            information={
                                <Typography>
                                    {data.reciever.firstName +
                                        " " +
                                        data.reciever.lastName}
                                </Typography>
                            }
                        />
                        <InformationViewer
                            icon={
                                <GiPayMoney size={18} color={COLORS.primary} />
                            }
                            label="Payeur"
                            information={
                                <Typography>
                                    {data.payer === "Envoyeur"
                                        ? data.sender.firstName +
                                          " " +
                                          data.sender.lastName +
                                          " (" +
                                          data.payer +
                                          ")"
                                        : data.reciever.firstName +
                                          " " +
                                          data.reciever.lastName +
                                          " (" +
                                          data.payer +
                                          ")"}
                                </Typography>
                            }
                        />
                        <InformationViewer
                            icon={
                                <MdTextsms size={15} color={COLORS.primary} />
                            }
                            label="Type de produit"
                            information={
                                <Typography color={COLORS.primary}>
                                    {getitemType().label}
                                </Typography>
                            }
                        />
                        <InformationViewer
                            icon={
                                <FaEuroSign size={15} color={COLORS.primary} />
                            }
                            label="Prix par kilo"
                            information={
                                <Typography color={COLORS.warning}>
                                    {getPrice()}
                                </Typography>
                            }
                        />
                    </Grid>

                    {/* <BoardingPass
                        receiver={data.reciever}
                        sender={data.sender}
                        currency={data.currency}
                        state={{
                            publisher: data.publisher,
                            departure: data.departure,
                            destination: data.destination,
                            id: data.fligthId,
                            prices: data.prices,
                        }}
                    /> */}
                    <Stack
                        direction="row"
                        justifyContent="center"
                        spacing={1}
                        mt={1}
                    >
                        <Button
                            onClick={() => goToReservation(data)}
                            endIcon={<MdArrowRight />}
                        >
                            Voir en détails
                        </Button>
                    </Stack>
                </AccordionDetails>
            </Accordion>
        </Paper>
    );
};

const Packages = () => {
    const { profilState, user, reservations, loading } = useContext(
        ProfileDetailsContext
    );

    const { id, subpage, subID } = useParams();

    const [editing, setediting] = useState(false);

    const history = useHistory();

    function goToReservation(data) {
        history.push(`/profilDetails/${user.userId}/packages/${data.id}`, data);
    }

    return (
        <Box>
            {subID ? (
                <ReservationViewer
                    data={history.location.state}
                    loading={false}
                />
            ) : (
                <Box>
                    {!editing ? (
                        <Box py={1}>
                            <Stack
                                direction="row"
                                spacing={2}
                                alignItems="center"
                                mb={2}
                                display={{ xs: "none", sm: "none", md: "flex" }}
                            >
                                {profilState.icon}
                                <Typography
                                    fontWeight="bold"
                                    variant="h5"
                                    color="primary"
                                    flexGrow={1}
                                >
                                    {profilState.label}
                                </Typography>
                            </Stack>
                            <Typography color={COLORS.black} variant="body2">
                                Les colis que vous avez envoyés.
                            </Typography>
                            {loading ? (
                                <Stack spacing={2}>
                                    <Header />

                                    {["1", "2", "3", "4"].map((item) => (
                                        <PackageSkeleton key={item} />
                                    ))}
                                </Stack>
                            ) : (
                                <>
                                    {reservations?.length > 0 ? (
                                        <Stack spacing={2} my={3}>
                                            <Header />
                                            {reservations.map(
                                                (reservation, index) => (
                                                    <Package
                                                        data={reservation}
                                                        key={index}
                                                        goToReservation={
                                                            goToReservation
                                                        }
                                                    />
                                                )
                                            )}
                                        </Stack>
                                    ) : (
                                        <Paper
                                            sx={{
                                                flex: 1,
                                                boxShadow:
                                                    "0px 1px 3px rgba(3, 0, 71, 0.2)",
                                                p: 2,
                                                my: 4,
                                                textAlign: "center",
                                            }}
                                            elevation={0}
                                        >
                                            <Typography color="GrayText">
                                                Vous n'avez pas de réservations.
                                            </Typography>
                                        </Paper>
                                    )}
                                </>
                            )}
                        </Box>
                    ) : (
                        <AddReservation setediting={setediting} />
                    )}
                </Box>
            )}
        </Box>
    );
};

export default Packages;
