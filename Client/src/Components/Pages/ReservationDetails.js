import { Container, Paper, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { MdBlock } from "react-icons/md";
import { useParams, useHistory } from "react-router-dom";
import COLORS from "../../colors";
import { useAuth } from "../../firebase/auth";
import { GetAReservation } from "../../firebase/db";
import ReservationViewer from "../ProfileDetailsComponents/ReservationViewer";

const UnauthorizedComponent = () => {
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
                justifyContent="center"
                alignItems="center"
                spacing={2}
                py={5}
                px={2}
                textAlign="center"
                minHeight={{ xs: 200, md: 300 }}
            >
                <MdBlock size={90} color={COLORS.warning} />
                <Typography
                    variant="h5"
                    fontWeight={555}
                    color={COLORS.warning}
                >
                    Unauthorized informations
                </Typography>
                <Typography variant="caption" color="GrayText">
                    Vous n'etes ni transporteur ni client de ce colis, votre
                    compte peut être banni pour ces actions.
                </Typography>
            </Stack>
        </Paper>
    );
};

const ReservationDetails = () => {
    const { id } = useParams();
    const history = useHistory();
    const currentUser = useAuth();
    const [reservation, setreservation] = useState(history.location.state);
    const [loading, setloading] = useState(true);
    const queryParams = new URLSearchParams(window.location.search);
    const [unauthorized, setunauthorized] = useState(false);

    async function fetchDatas() {
        let result = await GetAReservation(id);
        setreservation(result);
        result = undefined;
        setloading(false);
    }
    function showUnauthorized() {
        setunauthorized(true);
        setloading(false);
    }
    useEffect(() => {
        if (currentUser === null) {
            history.push("/login");
        }
        if (currentUser?.uid) {
            if (id) {
                if (
                    queryParams.get("c") === currentUser?.uid ||
                    queryParams.get("g") === currentUser?.uid
                )
                    fetchDatas();
                else showUnauthorized();
            } else {
                history.push(
                    "/profilDetails/" + currentUser.uid + "/reservations"
                );
            }
        }
    }, [currentUser]);
    return (
        <Container sx={{ mt: -1, py: 2 }}>
            {unauthorized ? (
                <UnauthorizedComponent />
            ) : (
                <ReservationViewer data={reservation} loading={loading} />
            )}
        </Container>
    );
};

export default ReservationDetails;