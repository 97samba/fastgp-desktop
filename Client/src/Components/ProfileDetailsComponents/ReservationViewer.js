import {
    Paper,
    Stack,
    Typography,
    IconButton,
    Divider,
    Grid,
    Button,
    CircularProgress,
    List,
    ListSubheader,
    ListItem,
    ListItemIcon,
    ListItemText,
    Link,
    Chip,
} from "@mui/material";
import { Box } from "@mui/system";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { FaShippingFast, FaShoppingBag, FaUserAlt } from "react-icons/fa";
import { GiHandTruck, GiPayMoney } from "react-icons/gi";
import { GoPackage } from "react-icons/go";
import { IconContext } from "react-icons/lib";
import { MdPhone } from "react-icons/md";
import QRCode from "react-qr-code";
import { useHistory } from "react-router-dom";
import COLORS from "../../colors";
import BoardingPass from "../ViewComponents/BoardingPass";
import { FaEuroSign, FaHandHolding, FaPlaneDeparture } from "react-icons/fa";
import { IoMdSave } from "react-icons/io";
import { MdTextsms } from "react-icons/md";

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

const PackageInformations = ({ data }) => {
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
            sx={{
                flex: 1,
                boxShadow: "0px 1px 3px rgba(3, 0, 71, 0.2)",
                borderRadius: 3,
            }}
            elevation={0}
        >
            <Stack
                direction={{ xs: "column", md: "row" }}
                justifyContent="space-between"
                bgcolor="#F2f2f2"
                flex={1}
                p={2}
                sx={{ borderTopLeftRadius: 3, borderTopRightRadius: 3 }}
            >
                <Stack direction="row" spacing={1}>
                    <Typography color="GrayText" variant="body1">
                        ID Colis :{" "}
                    </Typography>
                    <Typography color={COLORS.black} variant="body1">
                        {data.id}
                    </Typography>
                </Stack>
                <Stack direction="row" spacing={1}>
                    <Typography color="GrayText" variant="body1">
                        Date de réservation :{" "}
                    </Typography>
                    <Typography color={COLORS.black} variant="body1">
                        {moment(data.reservationDate).format("D MMM YYYY")}
                    </Typography>
                </Stack>
            </Stack>
            <Stack flex={1} p={3}>
                <BoardingPass
                    sender={data.sender}
                    receiver={data.reciever}
                    currency={data.currency}
                    state={{
                        publisher: data.publisher,
                        departure: data.departure,
                        destination: data.destination,
                        id: data.fligthId,
                        prices: data.prices,
                    }}
                />
            </Stack>
            <Grid container rowSpacing={2} columnSpacing={6} px={3} pb={2}>
                <InformationViewer
                    icon={<FaUserAlt size={15} color={COLORS.primary} />}
                    label="Transporteur"
                    information={
                        <Link
                            href={"/profilDetails/" + data.gpId + "/myProfile"}
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
                    icon={<FaPlaneDeparture size={15} color={COLORS.primary} />}
                    label="Annonce"
                    information={
                        <Link href={"/view/" + data.flightId} underline="hover">
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
                            <Typography>{data.publisher.phone}</Typography>
                        </Link>
                    }
                />
                <InformationViewer
                    icon={<MdTextsms size={15} color={COLORS.primary} />}
                    label="Description"
                    information={
                        <Typography>{data.itemDescription}</Typography>
                    }
                />

                <InformationViewer
                    icon={<MdTextsms size={15} color={COLORS.primary} />}
                    label="Type de produit"
                    information={
                        <Typography color={COLORS.primary}>
                            {getitemType().label}
                        </Typography>
                    }
                />
                <InformationViewer
                    icon={<FaEuroSign size={15} color={COLORS.primary} />}
                    label="Prix par kilo"
                    information={
                        <Typography color={COLORS.warning}>
                            {getPrice()}
                        </Typography>
                    }
                />
            </Grid>
        </Paper>
    );
};

const ClientInformationsSummary = ({ data }) => {
    return (
        <Paper
            sx={{
                flex: 1,
                boxShadow: "0px 1px 3px rgba(3, 0, 71, 0.2)",
                borderRadius: 3,
            }}
            elevation={0}
        >
            <Stack spacing={2} color={COLORS.black} py={2}>
                {/* <Typography variant="body1" fontWeight={500}>
                    Informations générales
                </Typography> */}
                <Stack px={3}>
                    <Typography fontSize={18} fontWeight={555} gutterBottom>
                        Client
                    </Typography>
                    <Grid
                        container
                        rowSpacing={2}
                        columnSpacing={6}
                        pb={2}
                        pt={1}
                    >
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
                    </Grid>
                </Stack>
            </Stack>
        </Paper>
    );
};

const PriceInformationsSummary = ({ data }) => {
    return (
        <Paper
            sx={{
                flex: 1,
                boxShadow: "0px 1px 3px rgba(3, 0, 71, 0.2)",
                borderRadius: 3,
            }}
            elevation={0}
        >
            <Stack spacing={2} color={COLORS.black} py={2} px={3}>
                <Typography fontSize={18} fontWeight={555}>
                    Résumé
                </Typography>
                <Stack spacing={1}>
                    <Stack direction="row" justifyContent="space-between">
                        <Typography variant="body1" color="GrayText">
                            Prix d'envoi:
                        </Typography>
                        <Typography variant="body1" fontWeight={555}>
                            12 {data.currency}
                        </Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between">
                        <Typography variant="body1" color="GrayText">
                            Livraison:
                        </Typography>
                        <Typography variant="body1" fontWeight={555}>
                            0 {data.currency}
                        </Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between">
                        <Typography variant="body1" color="GrayText">
                            Réduction:
                        </Typography>
                        <Typography variant="body1" fontWeight={555}>
                            0 {data.currency}
                        </Typography>
                    </Stack>
                    <Divider />
                    <Stack direction="row" justifyContent="space-between">
                        <Typography variant="body1" fontWeight={500}>
                            Total:
                        </Typography>
                        <Typography variant="body1" fontWeight={500}>
                            12 {data.currency}
                        </Typography>
                    </Stack>
                </Stack>
                <Typography variant="body1" fontWeight={500}>
                    Payé en liquide
                </Typography>
            </Stack>
        </Paper>
    );
};

const DeliveryStatusInformations = ({ data, step }) => {
    function getStatus(text) {
        if (text === "ok")
            return {
                color: "success",
                text: "Réservation validée",
                textColor: "green",
            };
        if (text === "ko")
            return {
                color: "error",
                text: "Réservation annulée",
                textColor: "red",
            };
        if (text === "pending")
            return {
                color: "warning",
                text: "Validation en cours",
                textColor: "orange",
            };
    }
    return (
        <Paper
            sx={{
                flex: 1,
                boxShadow: "0px 1px 3px rgba(3, 0, 71, 0.2)",
                borderRadius: 3,
            }}
            elevation={0}
        >
            <Box px={3} py={3}>
                <Stack direction="row" spacing={2} mb={2} alignItems="center">
                    <Typography>Etat :</Typography>
                    <Chip
                        label={getStatus(data.status).text}
                        // color={getStatus(data.status).color}
                        sx={{
                            color: getStatus(data.status).textColor,
                            backgroundColor: getStatus(data.status).color,
                        }}
                    />
                </Stack>
                <Stack direction="row" flex={1} alignItems="center">
                    <Box
                        borderRadius={10}
                        bgcolor={COLORS.warning}
                        p={{ xs: 1.5, md: 2 }}
                    >
                        <GoPackage size={30} color="white" />
                    </Box>
                    <Divider
                        sx={{
                            flex: 1,
                            borderBottomWidth: 5,
                            borderColor:
                                step >= 1 ? COLORS.warning : "lightgray",
                        }}
                    />
                    <Box
                        borderRadius={10}
                        bgcolor={step >= 2 ? COLORS.warning : "lightGray"}
                        p={{ xs: 1.5, md: 2 }}
                    >
                        <FaShippingFast size={30} color="white" />
                    </Box>
                    <Divider
                        sx={{
                            flex: 1,
                            borderBottomWidth: 5,
                            borderColor:
                                step >= 3 ? COLORS.warning : "lightgray",
                        }}
                    />
                    <Box
                        borderRadius={10}
                        bgcolor={step >= 3 ? COLORS.warning : "lightGray"}
                        p={{ xs: 1.5, md: 2 }}
                    >
                        <GiHandTruck size={30} color="white" />
                    </Box>
                </Stack>
                <Stack direction="row" mt={3} display="flex">
                    <Stack
                        direction="row"
                        p={1}
                        bgcolor="#e76f513d"
                        alignItems="center"
                        borderRadius={4}
                        color={COLORS.black}
                        spacing={1}
                        px={2}
                    >
                        <Typography variant="body1">
                            Date de livraison estimée :{" "}
                        </Typography>
                        <Typography fontWeight={555} variant="body1">
                            {moment(data.distributionDate).format("d MMMM")}
                        </Typography>
                    </Stack>
                </Stack>
            </Box>
        </Paper>
    );
};

const Title = () => {
    return (
        <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            display={{ xs: "none", sm: "none", md: "flex" }}
            mb={2}
        >
            <FaShoppingBag color={COLORS.warning} />
            <Typography
                fontWeight="bold"
                variant="h5"
                color="primary"
                flexGrow={1}
            >
                Détails de la réservation
            </Typography>
            <Button color="error"> Supprimer</Button>
        </Stack>
    );
};

const LoadingSkeleton = () => {
    return (
        <Paper
            sx={{
                flex: 1,
                boxShadow: "0px 1px 3px rgba(3, 0, 71, 0.2)",
                borderRadius: 3,
                textAlign: "center",
            }}
            elevation={0}
        >
            <Stack
                p={5}
                flex={1}
                justifyContent="center"
                alignItems="center"
                spacing={2}
            >
                <CircularProgress size={30} />
                <Typography variant="body2" color={COLORS.black}>
                    Chargement des informations
                </Typography>
            </Stack>
        </Paper>
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

const ReservationViewer = ({ data, loading }) => {
    const history = useHistory();
    //3 etapes, validation, voyage,liraison
    const [step, setstep] = useState(getStep());

    function getStep() {
        if (data?.id) {
            if (data.status === "pending") {
                return 0;
            }
            if (data.status === "ok") {
                if (moment().isSameOrAfter(data.departureDate)) {
                    return 2;
                } else {
                    return 1;
                }
            }
            if (data.status === "delivered") {
                return 3;
            }
        }
        return 0;
    }
    useEffect(() => {
        setstep(getStep());
    }, [data]);

    return (
        <>
            <Title />
            {loading ? (
                <LoadingSkeleton />
            ) : (
                <Box>
                    <Stack spacing={3}>
                        <DeliveryStatusInformations step={step} data={data} />
                        <PackageInformations data={data} />
                    </Stack>
                    <Grid container spacing={2} mt={2}>
                        <Grid item xs={12} sm={12} md={6} xl={6} lg={6}>
                            <ClientInformationsSummary data={data} />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} xl={6} lg={6}>
                            <PriceInformationsSummary data={data} />
                        </Grid>
                    </Grid>
                </Box>
            )}
        </>
    );
};

export default ReservationViewer;
