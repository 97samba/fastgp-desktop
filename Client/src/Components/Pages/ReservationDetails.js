import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useAuth } from "../../firebase/auth";
import { GetAReservation } from "../../firebase/db";
import ReservationViewer from "../ProfileDetailsComponents/ReservationViewer";

const ReservationDetails = () => {
    const { id } = useParams();
    const history = useHistory();
    const currentUser = useAuth();
    const [reservation, setreservation] = useState(history.location.state);
    const [loading, setloading] = useState(true);

    async function fetchDatas() {
        let result = await GetAReservation(id);
        console.log("result :>> ", result);
        setreservation(result);
        result = undefined;
        setloading(false);
    }
    useEffect(() => {
        if (currentUser === null) {
            history.push("/login");
        }
        if (currentUser?.uid) {
            if (id) {
                fetchDatas();
            } else {
                history.push(
                    "/profilDetails/" + currentUser.uid + "/reservations"
                );
            }
        }
    }, [currentUser]);
    return (
        <Container sx={{ mt: -1, py: 2 }}>
            <ReservationViewer data={reservation} loading={loading} />
        </Container>
    );
};

export default ReservationDetails;
