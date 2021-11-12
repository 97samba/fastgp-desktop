import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControlLabel,
  FormLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import moment from "moment";
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  FaBox,
  FaBoxOpen,
  FaBoxTissue,
  FaCalendarAlt,
  FaCalendarCheck,
  FaCheckCircle,
  FaCoins,
  FaCommentDots,
  FaFacebook,
  FaPhone,
  FaPhoneAlt,
  FaStar,
  FaStarHalfAlt,
  FaSuitcase,
  FaUser,
  FaUserCircle,
  FaWhatsapp,
} from "react-icons/fa";
import { IoAirplaneSharp } from "react-icons/io5";
import { useHistory } from "react-router";
import ProfilPic from "../../Images/profile.svg";
import AdImage from "../../Images/online_ad.svg";

const FLightInformations = ({ state }) => {
  return (
    <Paper sx={{ p: 3 }} variant="outlined">
      <Grid container my={1} rowSpacing={3} columnSpacing={6}>
        <Grid item xs={5} sm={4} md={4} xl={4} mb={4} textAlign="start">
          <Typography variant="h5" color="primary">
            {state.departure.name}
          </Typography>
        </Grid>
        <Grid item xs={2} sm={4} md={4} xl={4} textAlign="center">
          <IoAirplaneSharp size={22} color="goldenrod" />
        </Grid>
        <Grid item xs={5} sm={4} md={4} xl={4} textAlign="end">
          <Typography variant="h5" color="primary">
            {state.destination.name}
          </Typography>
        </Grid>
        <Grid item xs={6} md={6} lg={6} xl={6}>
          <Stack direction="row" spacing={2} alignItems="center">
            <FaCalendarAlt color="#494aa2" />
            <Typography color="primary">Date de départ</Typography>
          </Stack>
          <Divider sx={{ my: 1 }} />
          <Typography variant="body2" color="GrayText">
            {moment(state.departureDate).format("D MMMM YYYY")}
          </Typography>
        </Grid>
        <Grid item md={6} lg={6} xl={6}>
          <Stack direction="row" spacing={2} alignItems="center">
            <FaCalendarCheck color="#494aa2" />
            <Typography color="primary">Date d'arrivée</Typography>
          </Stack>
          <Divider sx={{ my: 1 }} />
          <Typography variant="body2" color="GrayText">
            {moment(state.distributionDate).format("D MMMM YYYY")}
          </Typography>
        </Grid>
        <Grid item md={6} lg={6} xl={6}>
          <Stack direction="row" spacing={2} alignItems="center">
            <FaBox color="#494aa2" />
            <Typography color="primary">Adresse de départ</Typography>
          </Stack>
          <Divider sx={{ my: 1 }} />
          <Typography variant="body2" color="GrayText">
            {state.depotAddress.address +
              ", " +
              state.depotAddress.city +
              ", " +
              state.depotAddress.postalCode}{" "}
          </Typography>
        </Grid>
        <Grid item md={6} lg={6} xl={6}>
          <Stack direction="row" spacing={2} alignItems="center">
            <FaBoxOpen size={20} color="#494aa2" />
            <Typography color="primary">Adresse de destination</Typography>
          </Stack>
          <Divider sx={{ my: 1 }} />
          <Typography variant="body2" color="GrayText">
            {state.retraitAddress.address +
              ", " +
              state.retraitAddress.city +
              ", " +
              state.retraitAddress.postalCode}
          </Typography>
        </Grid>
        <Grid item md={6} lg={6} xl={6}>
          <Stack direction="row" spacing={2} alignItems="center">
            <FaSuitcase color="#494aa2" />
            <Typography color="primary">Poids disponible</Typography>
          </Stack>
          <Divider sx={{ my: 1 }} />
          <Stack direction="row" spacing={1} alignItems="flex-end" color="GrayText">
            <Typography variant="h5" color="goldenrod">
              58
            </Typography>
            <Typography variant="body2">Kg</Typography>
          </Stack>
        </Grid>
        <Grid item md={6} lg={6} xl={6}>
          <Stack direction="row" spacing={2} alignItems="center">
            <FaCoins size={20} color="#494aa2" />
            <Typography color="primary">Prix</Typography>
          </Stack>
          <Divider sx={{ my: 1 }} />
          <Stack direction="row" justifyContent="space-between">
            <Stack direction="row" spacing={1} alignItems="flex-end" color="GrayText">
              <Typography variant="h5" color="goldenrod">
                {state.prices[0].price} $
              </Typography>
              <Typography variant="body2">/Kg</Typography>
            </Stack>
            <Divider />
            <Stack direction="row" spacing={1} alignItems="flex-end" color="GrayText">
              <Typography variant="h5" color="goldenrod">
                {state.prices[1].price} $
              </Typography>
              <Typography variant="body2"> / valise*</Typography>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
};
const ProfilDescriptor = ({ state }) => {
  return (
    <Paper sx={{ p: 3 }}>
      <Box>
        <Typography>Covaliseur:</Typography>
        <Divider sx={{ my: 1 }} />
        <Stack direction="column" justifyContent="center" alignItems="center" spacing={1} my={4}>
          <img width="50%" src={ProfilPic} />
          <Typography variant="body2">
            {state.publisher.firstName + " " + state.publisher.lastName}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1} justifyContent="center">
          <FaStar color="goldenrod" />
          <FaStar color="goldenrod" />
          <FaStar color="goldenrod" />
          <FaStar color="goldenrod" />
          <FaStarHalfAlt color="goldenrod" />
          <Typography variant="body2">( 12 )</Typography>
        </Stack>
        <Divider sx={{ my: 1 }} />
        <Stack spacing={2} my={2}>
          <Button variant="contained" fullWidth color="warning" endIcon={<FaUser />}>
            Voir profil
          </Button>
          <Button variant="contained" fullWidth color="info" endIcon={<FaCommentDots />}>
            Contacter
          </Button>
        </Stack>
        <Divider sx={{ my: 2 }} />
        <Typography>Informations confirmées</Typography>
        <Box my={1}>
          {["Email", "Passeport", "billet d'avion"].map((info, index) => (
            <Stack direction="row" spacing={2} alignItems="center">
              <FaCheckCircle size={12} color="green" />
              <Typography>{info}</Typography>
            </Stack>
          ))}
        </Box>
      </Box>
    </Paper>
  );
};
const ContactInfo = ({ state, adViewed, setadViewed }) => {
  const [open, setopen] = useState(false);
  const hideInformations = () => {
    return {
      phoneNumber: state.publisher.phone.substring(0, 2) + "*******",
      facebookLink: "https://www.facebook.fr/*******",
      whatsapp: state.publisher.whatsapp.substring(0, 2) + "*******",
    };
  };

  const [datas, setdatas] = useState(hideInformations(state));

  const handleClose = async () => {
    setopen(false);
    // await new Promise((res) => setTimeout(res, 2000));
    setadViewed(!adViewed);
  };

  const openAdvertiser = () => {
    setopen(true);
  };

  useEffect(() => {
    adViewed
      ? setdatas({
          phoneNumber: state.publisher.phone,
          facebookLink: state.facebookLink,
          whatsapp: state.publisher.whatsapp,
        })
      : setdatas(hideInformations());
  }, [adViewed]);

  return (
    <Paper sx={{ mt: 2, p: 3 }}>
      <Typography variant="h5" color="GrayText">
        Contact
      </Typography>

      <Divider sx={{ my: 2 }} />
      <Grid container my={1} rowSpacing={3} columnSpacing={6} width="100%">
        <Grid item md={6} lg={6} xl={6} width="100%">
          <Stack direction="row" spacing={2} alignItems="center">
            <FaPhone color="gray" />
            <Typography color="primary">Téléphone</Typography>
          </Stack>
          <Divider sx={{ my: 1 }} />
          <Typography variant="body1" color="GrayText">
            {datas.phoneNumber}
          </Typography>
        </Grid>
        <Grid item md={6} lg={6} xl={6}>
          <Stack direction="row" spacing={2} alignItems="center">
            <FaWhatsapp color="gray" />
            <Typography color="primary">Numéro Whatsapp</Typography>
          </Stack>
          <Divider sx={{ my: 1 }} />
          <Typography variant="body2" color="GrayText">
            {datas.whatsapp}
          </Typography>
        </Grid>
        <Grid item md={12} lg={12} xl={12}>
          <Stack direction="row" spacing={2} alignItems="center">
            <FaFacebook color="gray" />
            <Typography color="primary">Lien Facebook</Typography>
          </Stack>
          <Divider sx={{ my: 1 }} />
          <Typography variant="body2" color="GrayText">
            {datas.facebookLink}
          </Typography>
        </Grid>
        <Grid item md={5} lg={5} xl={5}>
          <Button
            variant="contained"
            size="small"
            color="warning"
            fullWidth
            onClick={openAdvertiser}
          >
            Voir les numéros
          </Button>
        </Grid>
        <Grid item md={2} lg={2} xl={2}>
          <Divider>ou</Divider>
        </Grid>
        <Grid item md={5} lg={5} xl={5}>
          <Button variant="contained" size="small" fullWidth endIcon={<FaUserCircle />}>
            Se connecter
          </Button>
        </Grid>
      </Grid>
      <Advertiser open={open} handleClose={handleClose} />
    </Paper>
  );
};
const Reservation = () => {
  const { sender, setsender, receiver, setreceiver } = useContext(ViewContext);
  const [isReceiver, setisReceiver] = useState("yes");
  return (
    <Paper sx={{ mt: 2, p: 3 }}>
      <Typography variant="h5" color="GrayText">
        Réservation en ligne
      </Typography>

      <Divider sx={{ my: 2 }} />
      <Grid container my={1} rowSpacing={3} columnSpacing={6}>
        <Grid item xs={12} md={12} xl={12} lg={12}>
          <Typography color="GrayText" variant="body2">
            Veuillez remplir les informations de l'envoyeur
          </Typography>
        </Grid>
        <Grid item md={6} lg={6} xl={6}>
          <TextField
            label="Prenom"
            size="small"
            value={sender.firstName}
            fullWidth
            InputProps={{ endAdornment: <FaUserCircle color="gray" /> }}
            onChange={(e) => setsender({ ...sender, firstName: e.target.value })}
          />
        </Grid>
        <Grid item md={6} lg={6} xl={6}>
          <TextField
            label="Nom"
            size="small"
            value={sender.lastName}
            fullWidth
            InputProps={{ endAdornment: <FaUserCircle color="gray" /> }}
            onChange={(e) => setsender({ ...sender, lastName: e.target.value })}
          />
        </Grid>
        <Grid item md={6} lg={6} xl={6}>
          <TextField
            label="Télephone"
            size="small"
            type="tel"
            value={sender.phoneNumber}
            fullWidth
            InputProps={{ endAdornment: <FaPhoneAlt color="gray" /> }}
            onChange={(e) => setsender({ ...sender, phoneNumber: e.target.value })}
          />
        </Grid>
        <Grid item md={6} lg={6} xl={6}>
          <FormLabel>Etes-vous le receveur ?</FormLabel>

          <RadioGroup row value={isReceiver} onChange={(e, value) => setisReceiver(e.target.value)}>
            <FormControlLabel value={"yes"} label="Oui" control={<Radio size="small" />} />
            <FormControlLabel value="no" label="Non" control={<Radio size="small" />} />
          </RadioGroup>
        </Grid>
      </Grid>
      {isReceiver === "no" ? (
        <Grid container mb={2} rowSpacing={3} columnSpacing={6}>
          <Grid item xs={12} md={12} xl={12} lg={12}>
            <Typography color="GrayText" variant="body2">
              Veuillez remplir les informations du receveur
            </Typography>
          </Grid>
          <Grid item md={6} lg={6} xl={6}>
            <TextField
              label="Prenom"
              size="small"
              value={sender.firstName}
              fullWidth
              InputProps={{ endAdornment: <FaUserCircle color="gray" /> }}
              onChange={(e) => setsender({ ...sender, firstName: e.target.value })}
            />
          </Grid>
          <Grid item md={6} lg={6} xl={6}>
            <TextField
              label="Nom"
              size="small"
              value={sender.lastName}
              fullWidth
              InputProps={{ endAdornment: <FaUserCircle color="gray" /> }}
              onChange={(e) => setsender({ ...sender, lastName: e.target.value })}
            />
          </Grid>
          <Grid item md={6} lg={6} xl={6}>
            <TextField
              label="Télephone"
              size="small"
              type="tel"
              value={sender.phoneNumber}
              fullWidth
              InputProps={{ endAdornment: <FaPhoneAlt color="gray" /> }}
              onChange={(e) => setsender({ ...sender, phoneNumber: e.target.value })}
            />
          </Grid>
        </Grid>
      ) : null}

      <Button variant="contained" size="small" fullWidth endIcon={<FaBoxTissue />}>
        Réserver
      </Button>
    </Paper>
  );
};
const Summary = () => {
  return (
    <Paper sx={{ minHeight: "50%", p: 3 }}>
      <Typography>Récapitulatif : </Typography>
      <Divider sx={{ my: 2 }} />
    </Paper>
  );
};

const Advertiser = ({ open, handleClose }) => {
  const { adViewed, setadViewed } = useContext(ViewContext);

  return (
    <Dialog open={open} fullWidth maxWidth="md" onClose={handleClose}>
      <DialogTitle>Voir les informations gratuitement</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Regarder une courte pub pour dévérouiller les informations
        </DialogContentText>
        <Stack justifyContent="center" alignItems="center" p={5}>
          <img width="90%" src={AdImage} />
        </Stack>
        <DialogContentText>Appuyer sur "Déverouiller" à la fin de la vidéo</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button>Abandonner</Button>
        <Button disabled={!adViewed}>Déverouiller</Button>
      </DialogActions>
    </Dialog>
  );
};

const ViewContext = createContext();

const View = () => {
  const history = useHistory();
  const [state, setstate] = useState(history.location.state);
  const [sender, setsender] = useState({ firstName: "", lastName: "", phoneNumber: "" });
  const [receiver, setreceiver] = useState({ firstName: "", lastName: "", phoneNumber: "" });
  const [adViewed, setadViewed] = useState(false);

  useEffect(() => {
    console.log(`state`, state);
  }, []);
  return (
    <ViewContext.Provider
      value={{ sender, setsender, receiver, setreceiver, adViewed, setadViewed }}
    >
      <Container>
        <Grid container minHeight={300} spacing={2}>
          <Grid item md={3} lg={3} xl={3}>
            <ProfilDescriptor state={state} />
          </Grid>
          <Grid item md={6} lg={6} xl={6}>
            <FLightInformations state={state} />
            <ContactInfo state={state} adViewed={adViewed} setadViewed={setadViewed} />
            <Reservation />
          </Grid>
          <Grid item md={3} lg={3} xl={3}>
            <Summary />
          </Grid>
        </Grid>
      </Container>
    </ViewContext.Provider>
  );
};

export default View;
