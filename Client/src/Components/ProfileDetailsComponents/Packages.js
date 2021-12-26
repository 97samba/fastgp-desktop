import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Grid,
  Paper,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { IoMdSave } from "react-icons/io";
import { MdExpandMore } from "react-icons/md";
import COLORS from "../../colors";
import { ProfileDetailsContext } from "../Pages/ProfileDetails";
import moment from "moment";
import BoardingPass from "../ViewComponents/BoardingPass";

const AddReservation = ({ setediting }) => {
  const { user } = useContext(ProfileDetailsContext);
  const [state, setstate] = useState({ firstName: "", address: "", lastName: "", phone: "" });

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
        <Typography fontWeight="bold" variant="h5" color="primary" flexGrow={1}>
          Ajouter une réservation
        </Typography>
        <Button varaint="contained" color="warning" onClick={handleReturn}>
          Retour
        </Button>
      </Stack>
      <Paper elevation={0} sx={{ boxShadow: "0px 1px 3px rgba(3, 0, 71, 0.2)" }}>
        <Box p={2} my={1}>
          <Grid container spacing={3} pb={1}>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <TextField
                fullWidth
                label="Prénom"
                size="small"
                onChange={(e) => setstate({ ...state, firstName: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <TextField
                fullWidth
                label="Nom"
                size="small"
                onChange={(e) => setstate({ ...state, lastName: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <TextField
                fullWidth
                label="Adresse"
                size="small"
                onChange={(e) => setstate({ ...state, address: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <TextField
                fullWidth
                label="Téléphone"
                type="tel"
                size="small"
                onChange={(e) => setstate({ ...state, phone: e.target.value })}
              />
            </Grid>
          </Grid>
          <Button endIcon={<IoMdSave />} variant="contained" onClick={handleSave}>
            Enregister
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};
const PackageSkeleton = () => {
  return (
    <Paper sx={{ flex: 1, boxShadow: "0px 1px 3px rgba(3, 0, 71, 0.2)" }} elevation={0}>
      <Grid container spacing={1} display="flex" color={COLORS.black} p={1}>
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
            Date
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

const Package = ({ data }) => {
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
                {moment(data.reservationDate).format("DD MMM Y ")}
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
              <Typography fontWeight="bold">Réception : </Typography>
              <Typography>{moment(data?.distributionDate).format("dddd D MMM Y")}</Typography>
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
            <BoardingPass
              receiver={data.reciever}
              sender={data.sender}
              state={{
                publisher: data.publisher,
                departure: data.departure,
                destination: data.destination,
                id: data.fligthId,
              }}
            />
          </Stack>
        </AccordionDetails>
      </Accordion>
    </Paper>
  );
};

const Packages = () => {
  const { profilState, user, reservations, loading } = useContext(ProfileDetailsContext);

  const [editing, setediting] = useState(false);

  return (
    <Box>
      {!editing ? (
        <Box py={1}>
          <Stack direction="row" spacing={2} alignItems="center" mb={2}>
            {profilState.icon}
            <Typography fontWeight="bold" variant="h5" color="primary" flexGrow={1}>
              {profilState.label}
            </Typography>
            <Button varaint="contained" color="warning" onClick={() => setediting(true)}>
              Modifier
            </Button>
          </Stack>
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
                  {reservations.map((reservation, index) => (
                    <Package data={reservation} key={index} />
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
            </>
          )}
        </Box>
      ) : (
        <AddReservation setediting={setediting} />
      )}
    </Box>
  );
};

export default Packages;
