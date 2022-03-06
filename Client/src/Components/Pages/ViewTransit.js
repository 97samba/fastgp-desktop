import {
    Container,
    Divider,
    Grid,
    Paper,
    Stack,
    Typography,
    Skeleton,
    Box,
    Button,
    AvatarGroup,
    Avatar,
    Link,
} from "@mui/material";
import React, { createContext, useEffect, useState, useContext } from "react";

import { useHistory, useParams } from "react-router";
import Reservation from "../ViewComponents/Reservation";
import ContactInfo from "../ViewComponents/ContactInfo";
import FlightInformations from "../ViewComponents/FlightInformations";
import { getAFlight } from "../../firebase/db";
import { useAuth } from "../../firebase/auth";
import ProfilPic from "../../Images/profile.svg";

import COLORS from "../../colors";
import {
    FaStar,
    FaStarHalfAlt,
    FaUser,
    FaCommentDots,
    FaCheckCircle,
} from "react-icons/fa";
import TransitTimeline from "../viewTransitComponents/TransitTimeline";

const ViewTransitContext = createContext();

const Summary = () => {
    return (
        <Paper sx={{ minHeight: "50%", p: 3 }}>
            <Typography>Publicités : </Typography>
            <Divider sx={{ my: 2 }} />
        </Paper>
    );
};

const ProfilDescriptorSkeleton = () => {
    return (
        <Box>
            <Stack spacing={2} alignItems="center" flex={1}>
                <Skeleton variant="circular" width={100} height={100} />

                <Skeleton width="90%" height={40} />
                <Skeleton width="90%" height={40} />
            </Stack>
        </Box>
    );
};

const TransitProfileDescriptor = ({ state }) => {
    const { loading, departure, destination } = useContext(ViewTransitContext);
    return (
        <Paper
            sx={{ p: 3, boxShadow: "0px 1px 3px rgba(3, 0, 71, 0.2)" }}
            elevation={0}
        >
            {loading ? (
                <ProfilDescriptorSkeleton />
            ) : (
                <Box>
                    <Typography>Covaliseur:</Typography>
                    <Divider sx={{ my: 1 }} />
                    <Stack direction={{ xs: "row", sm: "row", md: "column" }}>
                        <Box flex={{ xs: 2, sm: 1 }}>
                            <Stack
                                direction="column"
                                justifyContent="center"
                                alignItems="center"
                                spacing={1}
                                m={2}
                            >
                                <AvatarGroup>
                                    <Link
                                        underline="none"
                                        href={`/profilDetails/${departure.ownerId}/myProfile`}
                                    >
                                        <Avatar
                                            alt={
                                                departure.publisher?.photoURL ||
                                                ProfilPic
                                            }
                                            src={
                                                departure.publisher?.photoURL ||
                                                ProfilPic
                                            }
                                            sx={{ width: 80, height: 80 }}
                                        >
                                            <Typography fontSize={11}>
                                                {departure.publisher.firstName[0].toUpperCase()}
                                            </Typography>
                                        </Avatar>
                                    </Link>
                                    <Link
                                        underline="none"
                                        href={`/profilDetails/${destination.ownerId}/myProfile`}
                                    >
                                        <Avatar
                                            sx={{ border: 5 }}
                                            alt={
                                                destination.publisher
                                                    ?.photoURL || ProfilPic
                                            }
                                            src={
                                                destination.publisher
                                                    ?.photoURL || ProfilPic
                                            }
                                            sx={{ width: 80, height: 80 }}
                                        >
                                            <Typography fontSize={11}>
                                                {destination.publisher.firstName[0].toUpperCase()}
                                            </Typography>
                                        </Avatar>
                                    </Link>
                                </AvatarGroup>

                                <Stack direction="row" spacing={1}>
                                    <Link
                                        underline="none"
                                        href={`/profilDetails/${departure.ownerId}/myProfile`}
                                    >
                                        <Typography variant="body2">
                                            {departure.publisher.firstName +
                                                " " +
                                                departure.publisher
                                                    ?.lastName[0]}
                                            .
                                        </Typography>
                                    </Link>
                                    <Typography variant="caption">
                                        Et
                                    </Typography>
                                    <Link
                                        underline="none"
                                        href={`/profilDetails/${destination.ownerId}/myProfile`}
                                    >
                                        <Typography variant="body2">
                                            {destination.publisher.firstName +
                                                " " +
                                                destination.publisher
                                                    ?.lastName[0]}
                                            .
                                        </Typography>
                                    </Link>
                                </Stack>
                            </Stack>
                            <Stack
                                direction="row"
                                spacing={0.5}
                                justifyContent="center"
                            >
                                <FaStar color="goldenrod" />
                                <FaStar color="goldenrod" />
                                <FaStar color="goldenrod" />
                                <FaStar color="goldenrod" />
                                <FaStarHalfAlt color="goldenrod" />
                                <Typography variant="body2">(12)</Typography>
                            </Stack>
                        </Box>
                        <Stack spacing={1} flex={{ xs: 3, sm: 1 }} mt={2}>
                            <Box>
                                <Typography
                                    variant="body1"
                                    color={COLORS.black}
                                >
                                    Informations confirmées de{" "}
                                    {departure.publisher.firstName}
                                </Typography>
                                <Box my={1}>
                                    {[
                                        "Email",
                                        "Passeport",
                                        "billet d'avion",
                                    ].map((info, index) => (
                                        <Stack
                                            direction="row"
                                            spacing={2}
                                            alignItems="center"
                                        >
                                            <FaCheckCircle
                                                size={12}
                                                color="green"
                                            />
                                            <Typography>{info}</Typography>
                                        </Stack>
                                    ))}
                                </Box>
                            </Box>
                            <Divider />
                            <Box>
                                <Typography
                                    variant="body1"
                                    color={COLORS.black}
                                >
                                    Informations confirmées de{" "}
                                    {destination.publisher.firstName}
                                </Typography>
                                <Box my={1}>
                                    {[
                                        "Email",
                                        "Passeport",
                                        "billet d'avion",
                                    ].map((info, index) => (
                                        <Stack
                                            direction="row"
                                            spacing={2}
                                            alignItems="center"
                                        >
                                            <FaCheckCircle
                                                size={12}
                                                color="green"
                                            />
                                            <Typography>{info}</Typography>
                                        </Stack>
                                    ))}
                                </Box>
                            </Box>
                        </Stack>
                    </Stack>
                </Box>
            )}
        </Paper>
    );
};

const ViewTransit = () => {
    const history = useHistory();
    const [loading, setloading] = useState(true);
    const [adViewed, setadViewed] = useState(false);
    const [departure, setdeparture] = useState(
        history.location.state?.departure
    );
    const [destination, setdestination] = useState(
        history.location.state?.destination
    );
    useEffect(() => {
        if (
            history.location.state?.departure &&
            history.location.state?.destination
        ) {
            setloading(false);
            setdeparture(history.location.state.departure);
            setdestination(history.location.state.destination);

            console.log("history.location.state :>> ", history.location.state);
        }
    }, []);
    return (
        <ViewTransitContext.Provider
            value={{
                history,
                loading,
                departure,
                destination,
                adViewed,
                setadViewed,
            }}
        >
            <Container
                sx={{
                    minWidth: "90%",
                    mt: 5,
                    backgroundColor: COLORS.background,
                }}
            >
                <Grid container minHeight={300} spacing={2}>
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={3}
                        lg={3}
                        xl={3}
                        order={{ xs: 1, sm: 1, md: 0 }}
                    >
                        <TransitProfileDescriptor state={departure} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        <Stack direction="column" spacing={2}>
                            <TransitTimeline context={ViewTransitContext} />
                            <FlightInformations
                                state={departure}
                                label={`Premier vol - transporté par ${departure?.publisher.firstName} ${departure.publisher.lastName}`}
                                context={ViewTransitContext}
                            />
                            <ContactInfo
                                state={departure}
                                loading={loading}
                                ViewContext={ViewTransitContext}
                                label={`: GP ${departure?.departure.name} - ${departure.destination.name}`}
                            />
                            <FlightInformations
                                state={destination}
                                label={`Second vol - transporté par ${destination.publisher.firstName} ${destination.publisher.lastName}`}
                                context={ViewTransitContext}
                            />
                            {/* <Reservation /> */}

                            <ContactInfo
                                state={destination}
                                loading={loading}
                                ViewContext={ViewTransitContext}
                                label={`: GP ${destination.departure.name} - ${destination.destination.name}`}
                            />
                        </Stack>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={3}
                        lg={3}
                        xl={3}
                        display={{ xs: "none", sm: "none", md: "block" }}
                    >
                        <Summary />
                    </Grid>
                </Grid>
            </Container>
        </ViewTransitContext.Provider>
    );
};

export default ViewTransit;
