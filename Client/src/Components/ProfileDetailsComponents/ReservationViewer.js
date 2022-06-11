import {
  Paper,
  Stack,
  Typography,
  IconButton,
  Divider,
  Grid,
  Button,
  CircularProgress,
  Link,
  Chip,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { Box } from "@mui/system";
import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  FaHandHoldingUsd,
  FaShippingFast,
  FaShoppingBag,
  FaUserAlt,
} from "react-icons/fa";
import { GiHandTruck, GiPayMoney } from "react-icons/gi";
import { GoPackage } from "react-icons/go";
import { MdOutlineDeleteForever, MdPhone, MdPhoto } from "react-icons/md";
import { useHistory } from "react-router-dom";
import COLORS from "../../colors";
import BoardingPass from "../ViewComponents/BoardingPass";
import { FaEuroSign, FaHandHolding, FaPlaneDeparture } from "react-icons/fa";
import { MdTextsms } from "react-icons/md";
import { deleteUserReservation, EditReservationPrice } from "../../firebase/db";
import { LoadingButton } from "@mui/lab";
import { RiHandCoinLine } from "react-icons/ri";
import { useAuth } from "../../firebase/auth";

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

const DeliveryStatusInformations = ({ data, step }) => {
  function getStatus(text) {
    if (text === "ok")
      if (moment().isSameOrAfter(data.departureDate)) {
        return {
          color: "primary",
          text: "Transport en cours",
          textColor: "black",
        };
      } else {
        return {
          color: "success",
          text: "Réservation validée",
          textColor: "green",
        };
      }
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
              borderColor: step >= 1 ? COLORS.warning : "lightgray",
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
              borderColor: step >= 3 ? COLORS.warning : "lightgray",
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
              {moment(data.distributionDate).format("D MMMM")}
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </Paper>
  );
};

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
    return bagageType.filter((element) => element.value === data.itemType)[0];
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
            id: data.id,
            prices: data.prices,
            clientID: data.owner,
            GPId: data.gpId,
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
                {data.publisher.firstName + " " + data.publisher.lastName}
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
            <Link href={"tel:" + data.publisher.phone} underline="hover">
              <Typography>{data.publisher.phone}</Typography>
            </Link>
          }
        />
        <InformationViewer
          icon={<MdTextsms size={15} color={COLORS.primary} />}
          label="Description"
          information={<Typography>{data.itemDescription}</Typography>}
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
            <Typography color={COLORS.warning}>{getPrice()}</Typography>
          }
        />
        <InformationViewer
          icon={<MdPhoto size={15} color={COLORS.primary} />}
          label="Photo du colis"
          information={
            <Typography color={COLORS.primary}>Voir photo</Typography>
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
        minHeight: 200,
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
          <Grid container rowSpacing={2} columnSpacing={6} pb={2} pt={1}>
            <InformationViewer
              full={true}
              icon={<GiPayMoney size={18} color={COLORS.primary} />}
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
              full={true}
              icon={<FaHandHolding size={16} color={COLORS.primary} />}
              label="Receveur"
              information={
                <Typography>
                  {data.reciever.firstName + " " + data.reciever.lastName}
                </Typography>
              }
            />
          </Grid>
        </Stack>
      </Stack>
    </Paper>
  );
};

const PriceInformationsSummary = ({
  data,
  isClient,
  changePrice,
  confirmPayment,
  paying,
  changingPrice,
  price,
  setprice,
  setOpenDialog,
}) => {
  const [editing, setediting] = useState(false);
  function handlePriceChanging() {
    changePrice();
    setediting(false);
  }

  function handlePaying() {
    confirmPayment();
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
      <Stack spacing={2} color={COLORS.black} py={2} px={3}>
        <Typography fontSize={18} fontWeight={555}>
          Résumé
        </Typography>
        {editing ? (
          <TextField
            size="small"
            label={"Prix final en " + data.currency}
            value={price}
            onChange={(e) => setprice(e.target.value)}
            type="number"
            helperText="Assurez vous que le client est au courant"
          />
        ) : (
          <Stack spacing={1}>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body1" color="GrayText">
                Prix d'envoi:
              </Typography>
              <Typography variant="body1" fontWeight={555}>
                {data?.finalPrice
                  ? data?.finalPrice + " " + data.currency
                  : data.prices.pricePerKG + " " + data.currency}
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
                {"- 0 " + data.currency}
              </Typography>
            </Stack>
            <Divider />
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body1" fontWeight={500}>
                Total:
              </Typography>
              <Typography variant="body1" fontWeight={500}>
                {data?.finalPrice
                  ? data?.finalPrice + " " + data.currency
                  : data.prices.pricePerKG + " " + data.currency}
              </Typography>
            </Stack>
          </Stack>
        )}
        {!data?.paid && isClient === false && (
          <>
            {editing ? (
              <LoadingButton
                loading={changingPrice}
                variant="outlined"
                color="warning"
                onClick={() => handlePriceChanging(false)}
              >
                Confirmer le prix
              </LoadingButton>
            ) : (
              <Button
                variant="outlined"
                color="warning"
                onClick={() => setediting(true)}
              >
                Changer le prix
              </Button>
            )}
            <Button
              fullWidth
              size="medium"
              variant="contained"
              color="success"
              endIcon={<FaHandHoldingUsd />}
              onClick={() => setOpenDialog(true)}
            >
              Confirmer le paiement
            </Button>
          </>
        )}
        {data?.paid && (
          <Typography variant="caption" fontWeight={500}>
            Payé en liquide
          </Typography>
        )}
      </Stack>
    </Paper>
  );
};

const Title = ({ data }) => {
  const [deleteDialog, setdeleteDialog] = useState(false);
  const history = useHistory();
  const currentUser = useAuth();

  async function handleDeleteReservation() {
    await deleteUserReservation(data.id)
      .then(() => setdeleteDialog(false))
      .then(() => history.push("/profilDetails/" + currentUser?.uid));
  }

  const SuppressionDialog = () => {
    return (
      <Dialog open={deleteDialog} onClose={() => setdeleteDialog(false)}>
        <DialogTitle>Confirmer la suppression</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Voulez-vous réellement supprimer la réservation ?
          </DialogContentText>
          <Stack flex={1} alignItems="center" my={2}>
            <MdOutlineDeleteForever size={60} color={COLORS.black} />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            fullWidth
            variant="outlined"
            size="medium"
            onClick={() => setdeleteDialog(false)}
          >
            Fermer
          </Button>
          <LoadingButton
            fullWidth
            variant="contained"
            color="error"
            size="medium"
            onClick={handleDeleteReservation}
          >
            Supprimer
          </LoadingButton>
        </DialogActions>
      </Dialog>
    );
  };
  return (
    <Stack
      direction="row"
      spacing={2}
      alignItems="center"
      // display={{ xs: "none", sm: "none", md: "flex" }}
      mb={2}
    >
      <FaShoppingBag color={COLORS.warning} />

      <Typography
        display={{ xs: "none", sm: "none", md: "flex" }}
        fontWeight="bold"
        variant="h5"
        color="primary"
        flexGrow={1}
      >
        Détails de la réservation
      </Typography>
      <Typography
        display={{ xs: "flex", sm: "flex", md: "none" }}
        fontWeight="bold"
        variant="h6"
        color="primary"
        flexGrow={1}
      >
        Réservation
      </Typography>
      <Button
        color="error"
        onClick={() => setdeleteDialog(true)}
        endIcon={<MdOutlineDeleteForever />}
      >
        {" "}
        Supprimer
      </Button>
      <SuppressionDialog />
    </Stack>
  );
};

const PaymentValidationDialog = ({
  open,
  handleClose,
  confirmPayment,
  paying,
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle color="primary">Confirmer le paiement</DialogTitle>
      <DialogContent>
        <DialogContentText>
          En cliquant sur oui, vous confirmez avoir reçu le paiment du client
        </DialogContentText>
        <Stack flex={1} alignItems="center" my={2}>
          <RiHandCoinLine size={70} color={COLORS.primary} />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ my: 1 }}>
        <Button
          fullWidth
          size="medium"
          variant="outlined"
          color="error"
          onClick={handleClose}
        >
          Fermer
        </Button>

        <LoadingButton
          fullWidth
          loading={paying}
          variant="contained"
          color="success"
          onClick={() => confirmPayment}
        >
          Confirmer
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

const InformationViewer = ({ icon, label, information, full = false }) => {
  return (
    <Grid
      item
      xs={12}
      sm={12}
      md={full ? 12 : 6}
      lg={full ? 12 : 6}
      xl={full ? 12 : 6}
    >
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

const ReservationViewer = ({ data, setdata, loading, isClient }) => {
  //3 etapes, validation, voyage,liraison
  const [step, setstep] = useState(getStep());
  const [price, setprice] = useState(
    data?.finalPrice || data?.prices?.pricePerKG || 55
  );
  const [changingPrice, setchangingPrice] = useState(false);
  const [paying, setpaying] = useState(true);
  const [paymentDialog, setpaymentDialog] = useState(false);

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

  async function changePrice() {
    setchangingPrice(true);
    await EditReservationPrice(price, data.id, false).then(() =>
      setdata({ ...data, finalPrice: price })
    );
    setchangingPrice(false);
  }
  async function confirmPayment() {
    setpaying(true);
    await EditReservationPrice(price, data.id, true).then(() =>
      setdata({ ...data, finalPrice: price, paid: true })
    );
    setpaying(false);
  }

  function handleClose() {
    setpaymentDialog(false);
  }

  return (
    <>
      <Title data={data} />
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
              <PriceInformationsSummary
                data={data}
                isClient={isClient}
                price={price}
                changePrice={changePrice}
                confirmPayment={confirmPayment}
                paying={paying}
                setprice={setprice}
                setOpenDialog={setpaymentDialog}
              />
              <PaymentValidationDialog
                open={paymentDialog}
                handleClose={handleClose}
                paying={paying}
              />
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
};

export default ReservationViewer;
