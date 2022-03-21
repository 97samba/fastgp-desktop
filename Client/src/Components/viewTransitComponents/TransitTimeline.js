import { Box } from "@mui/system";
import React, { useContext } from "react";
import {
    Timeline,
    TimelineConnector,
    TimelineContent,
    TimelineDot,
    TimelineItem,
    TimelineOppositeContent,
    TimelineSeparator,
} from "@mui/lab";
import { Divider, Paper, Stack, Typography, Avatar, Link } from "@mui/material";
import { BiDirections } from "react-icons/bi";
import COLORS from "../../colors";
import moment from "moment";
import { IoSyncSharp } from "react-icons/io5";
import { FaAngleRight, FaPlaneDeparture, FaPlaneArrival } from "react-icons/fa";

const MiniFlight = ({ flight, label }) => {
    return (
        <Link href={"/view/" + flight.id} underline="hover">
            <Paper variant="outlined" sx={{ my: 1 }}>
                <Stack
                    py={0.5}
                    px={2}
                    direction="row"
                    spacing={1}
                    alignItems="center"
                >
                    <Avatar
                        alt={flight.publisher?.photoURL}
                        src={flight.publisher?.photoURL}
                        sx={{ width: 40, height: 40 }}
                    />
                    <Box flexGrow={1}>
                        <Typography variant="body1">{label}</Typography>
                        <Typography variant="body2" color={COLORS.black}>
                            {`${flight.departure.name} - ${
                                flight.destination.name
                            } | ${moment(flight.departureDate).format(
                                "ddd D MMMM"
                            )}`}
                        </Typography>
                    </Box>
                    <FaAngleRight />
                </Stack>
            </Paper>
        </Link>
    );
};

const TransitTimeline = ({ context }) => {
    const { departure, destination } = useContext(context);

    return (
        <Paper
            elevation={0}
            sx={{
                py: 2,
                px: { xs: 1, sm: 2, md: 3 },
                mb: 1,
                boxShadow: "0px 1px 3px rgba(3, 0, 71, 0.2)",
            }}
        >
            <Box>
                <Box>
                    <Stack
                        direction="row"
                        alignItems="center"
                        spacing={2}
                        mx={2}
                    >
                        <Typography variant="h5" color={COLORS.primary}>
                            {departure.departure.name}
                        </Typography>
                        <BiDirections color={COLORS.black} size={20} />
                        <Typography variant="h5" color={COLORS.primary}>
                            {destination.destination.name}
                        </Typography>
                    </Stack>
                    <Stack m={2}>
                        <Typography variant="body2" color={COLORS.black}>
                            Type de bagage : <b>1 colis pesé</b> | Veuillez
                            avertir les deux GP de votre transit .
                        </Typography>
                    </Stack>

                    <Divider />

                    <Timeline position="right">
                        <TimelineItem>
                            <TimelineOppositeContent
                                sx={{
                                    maxWidth: { xs: 50, md: 80 },
                                    paddingLeft: 0,
                                    paddingRight: { xs: 1, md: 2 },
                                }}
                                color="text.secondary"
                            >
                                <Stack
                                    direction="row"
                                    alignItems="center"
                                    spacing={0.5}
                                    display={{ xs: "none", md: "block" }}
                                >
                                    <FaPlaneDeparture
                                        color={COLORS.warning}
                                        size={15}
                                    />

                                    <Typography color="GrayText">
                                        {moment(departure.departureDate).format(
                                            "DD MMMM"
                                        )}
                                    </Typography>
                                </Stack>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        display: {
                                            xs: "block",
                                            md: "none",
                                        },
                                    }}
                                >
                                    {moment(departure.departureDate).format(
                                        "DD MMMM"
                                    )}
                                </Typography>
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineDot />
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>
                                {departure.departure.name +
                                    ", " +
                                    departure.departure.country}
                                <MiniFlight
                                    flight={departure}
                                    label="Voir le premier vol"
                                />
                            </TimelineContent>
                        </TimelineItem>

                        <TimelineItem>
                            <TimelineOppositeContent
                                sx={{
                                    maxWidth: { xs: 50, md: 80 },
                                    paddingLeft: 0,
                                    paddingRight: { xs: 1, md: 2 },
                                }}
                                color="text.secondary"
                            >
                                <Stack
                                    direction="row"
                                    alignItems="center"
                                    spacing={0.5}
                                    display={{ xs: "none", md: "block" }}
                                >
                                    <FaPlaneArrival
                                        color={COLORS.warning}
                                        size={15}
                                    />

                                    <Typography color="GrayText">
                                        {moment(
                                            departure.distributionDate
                                        ).format("DD, MMMM")}
                                    </Typography>
                                </Stack>
                                <Typography
                                    color="GrayText"
                                    variant="body2"
                                    sx={{
                                        display: {
                                            xs: "block",
                                            md: "none",
                                        },
                                    }}
                                >
                                    {moment(departure.distributionDate).format(
                                        "DD MMMM"
                                    )}
                                </Typography>
                            </TimelineOppositeContent>

                            <TimelineSeparator>
                                <TimelineDot variant="outlined" />

                                <TimelineConnector
                                    sx={{ bgcolor: COLORS.warning }}
                                />
                            </TimelineSeparator>
                            <TimelineContent>
                                {departure.destination.name +
                                    ", " +
                                    departure.destination.country}
                                <Stack
                                    direction="row"
                                    alignItems="center"
                                    spacing={1}
                                    mt={1}
                                >
                                    <Box
                                        p={2}
                                        bgcolor="#f2f2f2"
                                        borderRadius={1}
                                    >
                                        <Typography
                                            variant="body2"
                                            color={COLORS.warning}
                                        >
                                            <b>Changement de transporteur</b>
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            color={COLORS.black}
                                        >
                                            Des charges supplémentaires peuvent
                                            être facturées si vous voulez que
                                            Fast GP effectue le transit.
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <IoSyncSharp
                                            color={COLORS.warning}
                                            size={20}
                                        />
                                    </Box>
                                </Stack>
                            </TimelineContent>
                        </TimelineItem>

                        <TimelineItem>
                            <TimelineOppositeContent
                                sx={{
                                    maxWidth: { xs: 50, md: 80 },
                                    paddingLeft: 0,
                                    paddingRight: { xs: 1, md: 2 },
                                }}
                                color="text.secondary"
                            >
                                <Stack
                                    direction="row"
                                    alignItems="center"
                                    spacing={0.5}
                                    display={{ xs: "none", md: "block" }}
                                >
                                    <FaPlaneDeparture
                                        color={COLORS.warning}
                                        size={15}
                                    />

                                    <Typography color="GrayText">
                                        {moment(
                                            destination.departureDate
                                        ).format("DD, MMMM")}
                                    </Typography>
                                </Stack>
                                <Typography
                                    color="GrayText"
                                    variant="body2"
                                    sx={{
                                        display: {
                                            xs: "block",
                                            md: "none",
                                        },
                                    }}
                                >
                                    {moment(destination.departureDate).format(
                                        "DD MMMM"
                                    )}
                                </Typography>
                            </TimelineOppositeContent>

                            <TimelineSeparator>
                                <TimelineDot variant="outlined" />
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>
                                {departure.destination.name +
                                    ", " +
                                    departure.destination.country}
                                <MiniFlight
                                    flight={destination}
                                    label="Voir le second vol"
                                />
                            </TimelineContent>
                        </TimelineItem>

                        <TimelineItem>
                            <TimelineOppositeContent
                                sx={{
                                    maxWidth: { xs: 50, md: 80 },
                                    paddingLeft: 0,
                                    paddingRight: { xs: 1, md: 2 },
                                }}
                                color="text.secondary"
                            >
                                <Stack
                                    direction="row"
                                    alignItems="center"
                                    spacing={0.5}
                                    display={{ xs: "none", md: "block" }}
                                >
                                    <FaPlaneArrival
                                        color={COLORS.warning}
                                        size={15}
                                    />

                                    <Typography color="GrayText">
                                        {moment(
                                            destination.distributionDate
                                        ).format("DD, MMMM")}
                                    </Typography>
                                </Stack>
                                <Typography
                                    color="GrayText"
                                    variant="body2"
                                    sx={{
                                        display: {
                                            xs: "block",
                                            md: "none",
                                        },
                                    }}
                                >
                                    {moment(
                                        destination.distributionDate
                                    ).format("DD MMMM")}
                                </Typography>
                            </TimelineOppositeContent>

                            <TimelineSeparator>
                                <TimelineDot />
                            </TimelineSeparator>
                            <TimelineContent>
                                {destination.destination.name +
                                    ", " +
                                    destination.destination.country}
                            </TimelineContent>
                        </TimelineItem>
                    </Timeline>
                </Box>
            </Box>
        </Paper>
    );
};

export default TransitTimeline;
