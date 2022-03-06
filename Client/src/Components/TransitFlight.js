import {
    Avatar,
    Button,
    Chip,
    Divider,
    Grid,
    Paper,
    Stack,
    Typography,
    Link,
    MenuItem,
    AvatarGroup,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import {
    FaCircle,
    FaCoins,
    FaCreditCard,
    FaDotCircle,
    FaGlobeAfrica,
    FaPlaneArrival,
    FaPlaneDeparture,
    FaSuitcase,
    FaSuitcaseRolling,
} from "react-icons/fa";
import { GiPathDistance } from "react-icons/gi";
import { RiArrowRightCircleLine } from "react-icons/ri";
import moment from "moment";
import colors from "../colors";
import { useHistory } from "react-router";
import COLORS from "../colors";
import { IoSyncSharp } from "react-icons/io5";
import { AiOutlinePlus } from "react-icons/ai";

const TransitFlight = ({ departure, destination, size = "100%" }) => {
    const history = useHistory();
    const viewTransit = () => {
        history.push(`/viewTransit/${departure.id}/${destination.id}`, {
            departure,
            destination,
        });
    };
    const calculateWeight = () => {
        let weight = 0;
        departure.suitcases.map((suitecase) => (weight += suitecase.weight));
        return weight;
    };
    const Middle = () => {
        return (
            <Stack
                direction="column"
                spacing={0.5}
                alignItems="center"
                flex={1}
            >
                <Typography fontSize={20} color="secondary">
                    {departure.destination.name}
                </Typography>

                <Stack
                    direction="row"
                    justifyContent="space-between"
                    flex={1}
                    alignItems="center"
                    spacing={1}
                    color="#535591"
                >
                    <Divider orientation="horizontal">
                        <IoSyncSharp color={COLORS.warning} />
                    </Divider>
                </Stack>

                <Stack
                    direction="row"
                    alignItems="center"
                    spacing={0.5}
                    mt={1}
                    // sx={{ display: { xs: "none", sm: "none", md: "flex" } }}
                >
                    <Typography fontSize={13} color="Graytext">
                        {moment(destination.departureDate).diff(
                            moment(departure.departureDate),
                            "days"
                        )}{" "}
                        jours
                    </Typography>
                </Stack>

                {/* <Stack
                    direction="row"
                    alignItems="center"
                    spacing={0.5}
                    sx={{ display: { xs: "flex", md: "none", sm: "flex" } }}
                >
                    <Typography
                        variant="body1"
                        fontWeight={555}
                        color={COLORS.warning}
                    >
                        {departure.prices.pricePerKG}{" "}
                        {departure?.currency ? departure.currency : "€"}
                    </Typography>
                </Stack> */}
            </Stack>
        );
    };
    const Left = () => {
        return (
            <Stack direction="column" spacing={1}>
                <Typography fontSize={20} color="secondary">
                    {departure.departure.name}
                </Typography>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    flex={1}
                    alignItems="center"
                    spacing={1}
                    color="#535591"
                >
                    <FaCircle size={13} />
                    <Box flex={1}>
                        <Divider orientation="horizontal" />
                    </Box>

                    <RiArrowRightCircleLine size={18} color="gray" />
                </Stack>
                <Stack direction="row" alignItems="center" spacing={0.5}>
                    <FaPlaneDeparture color={colors.warning} size={12} />
                    <Typography
                        fontSize={13}
                        color="GrayText"
                        display={{ xs: "none", md: "block" }}
                    >
                        {moment(departure.departureDate).format("dddd D MMM")}
                    </Typography>
                    <Typography
                        fontSize={13}
                        color="GrayText"
                        display={{ xs: "block", md: "none" }}
                    >
                        {moment(departure.departureDate).format("D MMMM")}
                    </Typography>
                </Stack>
            </Stack>
        );
    };

    const Right = () => {
        return (
            <Stack direction="column" spacing={1} textAlign="end">
                <Typography fontSize={20} color="secondary">
                    {destination.destination.name}
                </Typography>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    flex={1}
                    alignItems="center"
                    spacing={1}
                    color="#535591"
                >
                    <RiArrowRightCircleLine size={18} color="gray" />
                    <Box flex={1}>
                        <Divider orientation="horizontal" />
                    </Box>

                    <FaCircle size={13} />
                </Stack>
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="flex-end"
                    spacing={0.5}
                    mt={1}
                    // sx={{ display: { xs: "none", sm: "none", md: "flex" } }}
                >
                    <Typography
                        fontSize={13}
                        color="GrayText"
                        display={{ xs: "none", md: "block" }}
                    >
                        {moment(destination.distributionDate).format(
                            "dddd D MMM"
                        )}
                    </Typography>
                    <Typography
                        fontSize={13}
                        color="GrayText"
                        display={{ xs: "block", md: "none" }}
                    >
                        {moment(destination.distributionDate).format("D MMMM")}
                    </Typography>
                    <FaPlaneArrival color={colors.warning} size={12} />
                </Stack>
                {/* <Stack
                    direction="row"
                    alignItems="center"
                    spacing={0.5}
                    sx={{ display: { xs: "flex", md: "none", sm: "flex" } }}
                >
                    <Typography
                        variant="body1"
                        fontWeight={555}
                        color={COLORS.warning}
                    >
                        {destination.prices.pricePerKG}{" "}
                        {destination?.currency ? destination.currency : "€"}
                    </Typography>
                </Stack> */}
            </Stack>
        );
    };
    const Price = ({ price, currency, color }) => {
        return (
            <Stack direction="row" alignItems="center" spacing={1}>
                <Typography
                    fontSize={{ xs: 15, md: 22 }}
                    fontWeight="555"
                    color={color}
                >
                    {price}
                </Typography>
                <Typography
                    fontSize={{ xs: 12, md: 16 }}
                    fontWeight="555"
                    color={color}
                >
                    {currency ? currency : "€"}
                </Typography>
            </Stack>
        );
    };
    function getTransitPrice(color) {
        if (departure.currency === destination.currency) {
            return (
                <Price
                    price={
                        parseInt(departure.prices.pricePerKG) +
                        parseInt(destination.prices.pricePerKG)
                    }
                    color={color}
                />
            );
        } else {
            return (
                <Stack direction="row" alignItems="center" spacing={1}>
                    <Price
                        price={departure.prices.pricePerKG}
                        currency={departure.currency}
                        color={color}
                    />
                    <AiOutlinePlus size={color === "primary" ? 15 : 12} />
                    <Price
                        price={destination.prices.pricePerKG}
                        currency={destination.currency}
                        color={color}
                    />
                </Stack>
            );
        }
    }
    const Coupon = () => {
        return (
            <Box height="100%">
                <Box
                    bgcolor="#f6f6f9"
                    px={1}
                    py={0.6}
                    mt={-0.1}
                    position="absolute"
                    ml={-1}
                    sx={{
                        borderBottomLeftRadius: 10,
                        borderBottomRightRadius: 10,
                        borderLeft: 1,
                        borderRight: 1,
                        borderColor: "#E2E2E2",
                    }}
                ></Box>

                <Stack borderLeft={0.1} borderColor="#E2E2E2" p={2}>
                    <Stack direction="row" spacing={1}>
                        <Paper
                            sx={{
                                padding: 0.4,
                                border: 1,
                                borderColor: "#C5C5C5",
                            }}
                            elevation={0}
                        >
                            <FaSuitcaseRolling size={13} color="gray" />
                        </Paper>
                        <Paper
                            sx={{
                                padding: 0.4,
                                border: 1,
                                borderColor: "#C5C5C5",
                            }}
                            elevation={0}
                        >
                            <FaSuitcase size={13} color="gray" />
                        </Paper>
                        <Paper
                            sx={{
                                padding: 0.4,
                                border: 1,
                                borderColor: "#C5C5C5",
                            }}
                            elevation={0}
                        >
                            <FaCreditCard size={13} color="gray" />
                        </Paper>
                        <Paper
                            sx={{
                                padding: 0.4,
                                border: 1,
                                borderColor: "#C5C5C5",
                            }}
                            elevation={0}
                        >
                            <FaCoins size={13} color="gray" />
                        </Paper>
                    </Stack>
                    <Stack
                        direction="row"
                        my={1}
                        alignItems="center"
                        spacing={1}
                    >
                        {getTransitPrice("primary")}
                        <Typography variant="caption"> /kg</Typography>
                    </Stack>
                    <Button
                        variant="contained"
                        size="small"
                        fullWidth
                        color="warning"
                        onClick={() => viewTransit(departure)}
                    >
                        Voir
                    </Button>
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="center"
                        mt={1}
                        spacing={1}
                    >
                        <Typography fontSize={12} color="gray">
                            {calculateWeight()} kg
                        </Typography>
                        <FaSuitcase color="#e76f51" size={12} />
                    </Stack>
                </Stack>
                <Box
                    bgcolor="#f6f6f9"
                    px={1}
                    py={0.6}
                    position="absolute"
                    ml={-1}
                    mt={-1}
                    sx={{
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                        borderLeft: 1,
                        borderRight: 1,
                        borderColor: "#E2E2E2",
                    }}
                ></Box>
            </Box>
        );
    };
    const Ticket = () => {
        return (
            <Box>
                <Stack
                    py={0.5}
                    px={1}
                    direction="row"
                    alignItems="center"
                    height="10%"
                    borderBottom={0.1}
                    borderColor="#e2e2e2"
                >
                    <Stack
                        direction="row"
                        alignItems="center"
                        flex={1}
                        spacing={1}
                        flexGrow={1}
                    >
                        {/* <Link underline="none" href={`/GPprofile/${data.ownerId}`}> */}
                        <AvatarGroup>
                            <Avatar
                                alt={departure.publisher?.photoURL}
                                src={departure.publisher?.photoURL}
                                sx={{ width: 24, height: 24 }}
                            >
                                <Link
                                    underline="none"
                                    href={`/profilDetails/${departure.ownerId}/myProfile`}
                                >
                                    <Typography fontSize={11}>
                                        {departure.publisher.firstName[0].toUpperCase()}
                                    </Typography>
                                </Link>
                            </Avatar>
                            <Avatar
                                alt={destination.publisher?.photoURL}
                                src={destination.publisher?.photoURL}
                                sx={{ width: 24, height: 24 }}
                            >
                                <Link
                                    underline="none"
                                    href={`/profilDetails/${destination.ownerId}/myProfile`}
                                >
                                    <Typography fontSize={11}>
                                        {destination.publisher.firstName[0].toUpperCase()}
                                    </Typography>
                                </Link>
                            </Avatar>
                        </AvatarGroup>

                        <Box>
                            {/* <Link underline="hover" href={`/GPprofile/${data.ownerId}`}> */}
                            <Stack
                                direction="row"
                                alignItems="center"
                                spacing={0.3}
                            >
                                <Link
                                    underline="none"
                                    href={`/profilDetails/${departure.ownerId}/myProfile`}
                                >
                                    <Typography fontSize={12}>
                                        {departure.publisher.firstName}
                                    </Typography>
                                </Link>
                                <Typography fontSize={12}>et</Typography>
                                <Link
                                    underline="none"
                                    href={`/profilDetails/${destination.ownerId}/myProfile`}
                                >
                                    <Typography fontSize={12}>
                                        {destination.publisher.firstName}
                                    </Typography>
                                </Link>
                            </Stack>
                            <Stack
                                direction="row"
                                alignItems="center"
                                spacing={0.3}
                            >
                                <Typography fontSize={9}>
                                    Transit par{" "}
                                    {departure.ownerId !== destination.ownerId
                                        ? "2 GP differents"
                                        : " la même personne"}
                                </Typography>
                                <Typography fontSize={9}>. </Typography>

                                <GiPathDistance color="grayText" size={15} />
                            </Stack>
                        </Box>
                    </Stack>
                    <Stack
                        direction="row-reverse"
                        spacing={0.5}
                        display={{ xs: "none", sm: "none", md: "block" }}
                    >
                        {departure.paymentMethod
                            .filter((payment) => payment.supported)
                            .map((method, index) => (
                                <Chip
                                    label={method.label}
                                    key={index}
                                    variant="filled"
                                    icon={<FaCoins size={12} color="gray" />}
                                    sx={{ borderColor: "#C5C5C5" }}
                                    size="small"
                                />
                            ))}
                    </Stack>
                    <Stack
                        direction="row"
                        display={{ xs: "block", md: "none" }}
                    >
                        {getTransitPrice(COLORS.warning)}
                    </Stack>
                </Stack>
                <Box
                    display={{
                        xs: "block",
                        sm: "block",
                        md: "none",
                        lg: "none",
                        xl: "none",
                    }}
                >
                    <MenuItem
                        disableGutters
                        onClick={() => viewTransit(departure)}
                        sx={{ py: 2 }}
                    >
                        <Grid px={2} container flex={1} alignItems="center">
                            <Grid item xs={4} sm={4} md={4} lg={3} xl={3}>
                                <Left />
                            </Grid>
                            <Grid item xs={4} sm={4} md={4} lg={6} xl={6}>
                                <Middle />
                            </Grid>
                            <Grid item xs={4} sm={4} md={4} lg={3} xl={3}>
                                <Right />
                            </Grid>
                        </Grid>
                    </MenuItem>
                </Box>
                <Box
                    display={{
                        xs: "none",
                        sm: "none",
                        md: "block",
                        lg: "block",
                        xl: "block",
                    }}
                >
                    <Grid p={2} container flex={1} alignItems="center">
                        <Grid item xs={4} md={4} sm={4} lg={4} xl={3}>
                            <Left />
                        </Grid>
                        <Grid item xs={4} md={4} sm={4} lg={4} xl={6}>
                            <Middle />
                        </Grid>
                        <Grid item xs={4} md={4} sm={4} lg={4} xl={3}>
                            <Right />
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        );
    };

    return (
        <Paper
            sx={{
                border: { sx: "0px", sm: "0px", md: "0.1px solid #E5E5E5" },
                marginBottom: 3,
                width: size,
                boxShadow: {
                    xs: "0px 2px 3px rgba(4, 0, 71, 0.1)",
                    sm: "1px 1px 4px 1px #E5E5E5",
                    md: "none",
                },
                "&:hover": {
                    boxShadow: "1px 1px 4px 1px #E5E5E5",
                    border: 0,
                },
            }}
            elevation={0}
        >
            <Grid container>
                <Grid
                    item
                    xs={12}
                    sm={12}
                    md={9}
                    xl={9}
                    lg={9}
                    alignItems="center"
                    flex={1}
                >
                    <Ticket />
                </Grid>
                <Grid
                    item
                    md={3}
                    xl={3}
                    lg={3}
                    flex={1}
                    sx={{ display: { xs: "none", sm: "none", md: "block" } }}
                >
                    <Coupon />
                </Grid>
            </Grid>
        </Paper>
    );
};

export default TransitFlight;
