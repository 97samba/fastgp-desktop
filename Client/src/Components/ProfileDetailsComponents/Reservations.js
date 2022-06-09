import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Button,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
  Link,
  Skeleton,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import { FaPhone, FaUserAlt, FaWhatsapp } from "react-icons/fa";
import { IoMdPricetag, IoMdSave } from "react-icons/io";
import {
  MdArrowRight,
  MdCancel,
  MdCheck,
  MdExpandMore,
  MdPhone,
} from "react-icons/md";

import { RiMedal2Line } from "react-icons/ri";
import COLORS from "../../colors";
import { ProfileDetailsContext } from "../Pages/ProfileDetails";
import { changeReservationStatus, getGPReservations } from "../../firebase/db";
import { useParams } from "react-router-dom";
import moment from "moment";
import BoardingPass from "../ViewComponents/BoardingPass";

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

const ReservationSkeleton = () => {
  return (
    <Paper
      sx={{ flex: 1, boxShadow: "0px 1px 3px rgba(3, 0, 71, 0.2)" }}
      elevation={0}
    >
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
        <Grid item xs={6} sm={6} md={4} lg={4} xl={4}>
          <Typography variant="body1" fontWeight="bold" color="GrayText" noWrap>
            Villes
          </Typography>
        </Grid>
        <Grid item xs={3} sm={3} md={2} lg={2} xl={2}>
          <Typography variant="body1" fontWeight="bold" color="GrayText" noWrap>
            Etat
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
    const [state, setstate] = useState(text);
    function getColor() {
      if (state === "ok")
        return { color: "#e7f9ed", text: "Validée", textColor: "green" };
      if (state === "ko")
        return { color: "#ffeae9", text: "Refusée", textColor: "red" };
      if (state === "pending")
        return { color: "#f9f6e7", text: "En attente", textColor: "orange" };
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
  function getitemType() {
    return bagageType.filter((element) => element.value === data.itemType)[0];
  }
  function getPrice() {
    if (data?.prices) {
      if (data.itemType === "thing")
        return `${data.prices.pricePerKG} ${data.currency}/Kg`;
      else return "à déterminer";
    } else {
      return "à déterminer";
    }
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
          <Grid container spacing={1} display="flex" color={COLORS.black}>
            <Grid item xs={6} sm={6} md={4} lg={4} xl={4}>
              <Typography
                variant="body1"
                fontWeight={600}
                color="primary"
                noWrap
              >
                {data?.departure.name + " - " + data?.destination.name}
              </Typography>
            </Grid>
            <Grid item xs={3} sm={3} md={2} lg={2} xl={2}>
              <Status text={data.status} />
            </Grid>
            <Grid
              item
              xs={0}
              sm={0}
              md={3}
              lg={3}
              xl={3}
              display={{ xs: "none", sm: "none", md: "block" }}
            >
              <Typography variant="body2" fontWeight={500} noWrap>
                {data.sender.firstName + " " + data.sender.lastName}
              </Typography>
            </Grid>
            <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
              <Typography
                variant="body2"
                fontWeight={500}
                noWrap
                color={COLORS.warning}
              >
                {getPrice()}
              </Typography>
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <Stack direction="row" spacing={2}>
            <Stack spacing={1}>
              <Typography
                fontWeight="bold"
                variant="body1"
                color={COLORS.black}
              >
                Client :{" "}
              </Typography>

              <Typography
                fontWeight="bold"
                variant="body1"
                color={COLORS.black}
              >
                Vol :{" "}
              </Typography>

              <Typography
                fontWeight="bold"
                variant="body1"
                color={COLORS.black}
              >
                Description :
              </Typography>

              <Typography
                fontWeight="bold"
                variant="body1"
                color={COLORS.black}
              >
                Receveur :{" "}
              </Typography>
              <Typography
                fontWeight="bold"
                variant="body1"
                color={COLORS.black}
              >
                Payeur :{" "}
              </Typography>
              <Typography
                fontWeight="bold"
                variant="body1"
                color={COLORS.black}
              >
                Type de produit :{" "}
              </Typography>
              <Typography
                fontWeight="bold"
                variant="body1"
                color={COLORS.black}
              >
                Prix par Kilo :{" "}
              </Typography>
            </Stack>
            <Stack spacing={1}>
              <Link
                href={"/profilDetails/" + data.owner + "/myProfile"}
                underline="hover"
              >
                <Typography>
                  {data.sender.firstName + " " + data.sender.lastName}
                </Typography>
              </Link>
              <Link href={"/view/" + data.flightId} underline="hover">
                <Typography>Cliquer ici</Typography>
              </Link>

              <Typography>{data.itemDescription}</Typography>

              <Link href={"tel:" + data.reciever.phoneNumber} underline="hover">
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography>
                    {data.reciever.firstName + " " + data.reciever.lastName}
                  </Typography>
                  <FaPhone size={13} />
                </Stack>
              </Link>
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
              <Typography color={COLORS.black}>
                {getitemType().label}
              </Typography>
              <Typography color={COLORS.warning}>{getPrice()}</Typography>
            </Stack>
          </Stack>
          {data.status === "pending" && (
            <Stack direction="row" spacing={1} mt={4} justifyContent="center">
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
            <Stack direction={{ xs: "column", md: "row" }} spacing={2} mt={3}>
              <Button
                variant="outlined"
                href={`tel:${data.sender.phoneNumber}`}
                fullWidth
                endIcon={<MdPhone />}
              >
                Appeler
              </Button>
              <Button
                variant="outlined"
                color="success"
                href={`whatsapp://send?text=Bonjour ${data.sender.firstName}, je vous contacte suite à votre réservation sur fast-gp.&phone=${data.sender.phoneNumber}`}
                fullWidth
                endIcon={<FaWhatsapp />}
              >
                whatsapp
              </Button>
              <Button
                variant="outlined"
                color="warning"
                href={`/reservationDetails/${data.id}?c=${data.owner}&g=${data.gpId}`}
                fullWidth
                endIcon={<MdArrowRight />}
              >
                détails
              </Button>
            </Stack>
          )}
        </AccordionDetails>
      </Accordion>
    </Paper>
  );
};

const Reservations = () => {
  const { profilState, user, loading, setloading, currentUser } = useContext(
    ProfileDetailsContext
  );
  const { id } = useParams();

  const [Reservations, setReservations] = useState([]);

  const [editing, setediting] = useState(false);

  async function getReservations() {
    setloading(true);
    const results = await getGPReservations(id);
    setReservations(results);
    setloading(false);
  }
  async function rejectPackage(id) {
    await changeReservationStatus(id, "ko", currentUser?.email);
    let newState = Reservations.map((reservation) => {
      if (reservation.id === id) {
        return { ...reservation, status: "ko" };
      } else {
        return reservation;
      }
    });
    setReservations(newState);
  }
  async function validatePackage(id) {
    await changeReservationStatus(id, "ok", currentUser?.email);
    let newState = Reservations.map((reservation) => {
      if (reservation.id === id) {
        return { ...reservation, status: "ok" };
      } else {
        return reservation;
      }
    });
    setReservations(newState);
  }

  useEffect(() => {
    const subscribe = getReservations();
    return subscribe;
  }, []);

  return (
    <Box>
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        mb={2}
        display={{ xs: "none", sm: "none", md: "flex" }}
      >
        {profilState.icon}
        <Typography fontWeight="bold" variant="h5" color="primary" flexGrow={1}>
          {profilState.label}
        </Typography>
      </Stack>
      <Typography color={COLORS.black} variant="body2">
        Les colis que vous devez transporter pour vos clients.
      </Typography>
      {loading ? (
        <Stack spacing={2}>
          <Header />
          {["1", "2", "3", "4"].map((item) => (
            <ReservationSkeleton key={item} />
          ))}
        </Stack>
      ) : (
        <>
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
              <Typography color="GrayText">
                Vous n'avez pas de réservations.
              </Typography>
            </Paper>
          )}
        </>
      )}
    </Box>
  );
};

export default Reservations;
