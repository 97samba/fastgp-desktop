import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Button,
  Grid,
  ListItem,
  ListItemText,
  Paper,
  Skeleton,
  Stack,
  TextField,
  Typography,
  Link,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { IoMdPricetag, IoMdSave } from "react-icons/io";
import { MdCancel, MdCheck, MdExpandMore, MdPhone } from "react-icons/md";

import { RiMedal2Line } from "react-icons/ri";
import COLORS from "../../colors";
import { ProfileDetailsContext } from "../Pages/ProfileDetails";
import { changeReservationStatus, getGPReservations, getUserReservations } from "../../firebase/db";
import { useParams } from "react-router-dom";
import moment from "moment";
import BoardingPass from "../ViewComponents/BoardingPass";

const Header = () => {
  return (
    <Box>
      <Grid container p={1} spacing={1} display="flex" color={COLORS.black}>
        <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
          <Typography variant="body1" fontWeight="bold" color="GrayText" noWrap>
            Villes
          </Typography>
        </Grid>
        <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
          <Typography variant="body1" fontWeight="bold" color="GrayText" noWrap>
            Etat
          </Typography>
        </Grid>
        <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
          <Typography variant="body1" fontWeight="bold" color="GrayText" noWrap>
            Client
          </Typography>
        </Grid>
        <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
          <Typography variant="body1" fontWeight="bold" color="GrayText" noWrap>
            Prix
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

const Package = ({ data, validatePackage, rejectPackage }) => {
  const Status = ({ text }) => {
    return (
      <Typography
        sx={{ px: 1, py: 0.5, backgroundColor: "lightgray", borderRadius: 5 }}
        textAlign="center"
        variant="caption"
        noWrap
      >
        {text}
      </Typography>
    );
  };
  return (
    <Paper sx={{ flex: 1, boxShadow: "0px 1px 3px rgba(3, 0, 71, 0.2)" }} elevation={0}>
      <Accordion elevation={0}>
        <AccordionSummary
          expandIcon={<MdExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Grid container spacing={1} display="flex" color={COLORS.black}>
            <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
              <Typography variant="body1" fontWeight={600} color="primary" noWrap>
                {data?.departure.name + " - " + data?.destination.name}
              </Typography>
            </Grid>
            <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
              <Status text={data.status} />
            </Grid>
            <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
              <Typography variant="body2" fontWeight={500} noWrap>
                {data.sender.firstName + " " + data.sender.lastName}
              </Typography>
            </Grid>
            <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
              <Typography variant="body2" fontWeight={500} noWrap>
                {data?.price ? data.price : "à déterminer"}
              </Typography>
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <Stack spacing={1}>
            <Stack direction="row" spacing={1} color="GrayText">
              <Typography fontWeight="bold">Client : </Typography>
              <Link href={"/profilDetails/" + data.owner + "/myProfile"}>
                <Typography>{data.sender.firstName + " " + data.sender.lastName}</Typography>
              </Link>
            </Stack>
            <Stack direction="row" spacing={1} color="GrayText">
              <Typography fontWeight="bold">Type de colis : </Typography>
              <Typography>{data.itemType}</Typography>
            </Stack>
            <Stack direction="row" spacing={1} color="GrayText">
              <Typography fontWeight="bold">Desciption :</Typography>
              <Typography>{data.itemDescription}</Typography>
            </Stack>
            <Stack direction="row" spacing={1} color="GrayText">
              <Typography fontWeight="bold">Etat : </Typography>
              <Typography>{data.status}</Typography>
            </Stack>
            <Stack direction="row" spacing={1} color="GrayText">
              <Typography fontWeight="bold">Receveur : </Typography>
              <Typography>{data.reciever.firstName + " " + data.reciever.lastName}</Typography>
            </Stack>
          </Stack>
          {data.status === "pending" && (
            <Stack direction="row" spacing={1} mt={4} justifyContent="center">
              <Button size="small" color="warning">
                Proposer un prix
              </Button>
              <Button
                size="small"
                color="success"
                variant="contained"
                endIcon={<MdCheck />}
                onClick={() => validatePackage(data.id)}
              >
                Valider
              </Button>
              <Button
                size="small"
                color="error"
                variant="contained"
                endIcon={<MdCancel />}
                onClick={() => rejectPackage(data.id)}
              >
                Refuser
              </Button>
            </Stack>
          )}
          {data.status === "ok" && (
            <Button fullWidth endIcon={<MdPhone />}>
              Appeler
            </Button>
          )}
        </AccordionDetails>
      </Accordion>
    </Paper>
  );
};

const Reservations = () => {
  const { profilState, user, loading, currentUser } = useContext(ProfileDetailsContext);
  const { id, subpage, subID } = useParams();

  const [Reservations, setReservations] = useState([]);

  const [editing, setediting] = useState(false);

  async function getReservations() {
    const results = await getGPReservations(id);
    setReservations(results);
  }
  async function rejectPackage(id) {
    await changeReservationStatus(id, "ko", currentUser?.email);
  }
  async function validatePackage(id) {
    await changeReservationStatus(id, "ok", currentUser?.email);
  }

  useEffect(() => {
    const subscribe = getReservations();
    return subscribe;
  }, []);

  return (
    <Box>
      <Stack direction="row" spacing={2} alignItems="center" mb={2}>
        {profilState.icon}
        <Typography fontWeight="bold" variant="h5" color="primary" flexGrow={1}>
          {profilState.label}
        </Typography>
        {currentUser?.uid === id && (
          <Button varaint="contained" color="warning" onClick={() => setediting(true)}>
            Modifier
          </Button>
        )}
      </Stack>
      {Reservations.length > 0 ? (
        <Stack spacing={2} my={3}>
          <Header />
          {Reservations.map((reservation, index) => (
            <Package
              data={reservation}
              validatePackage={validatePackage}
              rejectPackage={rejectPackage}
              key={index}
            />
          ))}
        </Stack>
      ) : (
        <Paper
          sx={{
            flex: 1,
            boxShadow: "0px 1px 3px rgba(3, 0, 71, 0.2)",
            p: 2,
            my: 4,
            textAlign: "center",
          }}
          elevation={0}
        >
          <Typography color="GrayText">Vous n'avez pas de réservations.</Typography>
        </Paper>
      )}
    </Box>
  );
};

export default Reservations;
