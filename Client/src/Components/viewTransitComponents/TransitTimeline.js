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

const TimeLineSkeleton = () => {
    return (
        <Box>
            <Timeline>
                <TimelineItem>
                    <TimelineSeparator>
                        <TimelineDot />
                        <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>depart</TimelineContent>
                </TimelineItem>
            </Timeline>
        </Box>
    );
};

const TransitTimeline = ({ context }) => {
    const { loading, departure, destination } = useContext(context);

    return (
        <Paper
            elevation={0}
            sx={{
                py: 2,
                px: { xs: 2, sm: 2, md: 3 },
                mb: 1,
                boxShadow: "0px 1px 3px rgba(3, 0, 71, 0.2)",
            }}
        >
            <Box>
                {loading ? (
                    <TimeLineSkeleton />
                ) : (
                    <Box>
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography variant="h5" color={COLORS.black}>
                                {departure.departure.name}
                            </Typography>
                            <BiDirections color={COLORS.black} size={20} />
                            <Typography variant="h5" color={COLORS.black}>
                                {destination.destination.name}
                            </Typography>
                        </Stack>
                        <Stack my={2}>
                            <Typography variant="body2" color={COLORS.black}>
                                Type de bagage : <b>1 colis pesé</b> | Veuillez
                                avertir les deux GP de votre transit.
                            </Typography>
                        </Stack>

                        <Divider />

                        <Stack></Stack>

                        <Timeline position="right">
                            <TimelineItem>
                                <TimelineOppositeContent
                                    sx={{
                                        maxWidth: 80,
                                        paddingLeft: 0,
                                        paddingRight: 2,
                                    }}
                                    color="text.secondary"
                                >
                                    <Stack
                                        direction="row"
                                        alignItems="center"
                                        spacing={0.5}
                                    >
                                        <FaPlaneDeparture
                                            color={COLORS.warning}
                                            size={15}
                                        />

                                        <Typography color="GrayText">
                                            {moment(
                                                departure.departureDate
                                            ).format("DD MMMM")}
                                        </Typography>
                                    </Stack>
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
                                        maxWidth: 80,
                                        paddingLeft: 0,
                                        paddingRight: 2,
                                    }}
                                    color="text.secondary"
                                >
                                    <Stack
                                        direction="row"
                                        alignItems="center"
                                        spacing={0.5}
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
                                                <b>
                                                    Changement de transporteur
                                                </b>
                                            </Typography>

                                            <Typography
                                                variant="body2"
                                                color={COLORS.black}
                                            >
                                                Des charges supplémentaires
                                                peuvent être facturées si vous
                                                voulez que Fast GP effectue le
                                                transit.
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
                                        maxWidth: 80,
                                        paddingLeft: 0,
                                        paddingRight: 2,
                                    }}
                                    color="text.secondary"
                                >
                                    <Stack
                                        direction="row"
                                        alignItems="center"
                                        spacing={0.5}
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
                                        maxWidth: 80,
                                        paddingLeft: 0,
                                        paddingRight: 2,
                                    }}
                                    color="text.secondary"
                                >
                                    <Stack
                                        direction="row"
                                        alignItems="center"
                                        spacing={0.5}
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
                )}
            </Box>
        </Paper>
    );
};

export default TransitTimeline;
