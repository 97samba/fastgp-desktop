import {
  Box,
  Typography,
  Grid,
  TextField,
  Paper,
  Stack,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  MenuItem,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { FaFacebook, FaInfo, FaPhone, FaTrashAlt, FaUserCircle, FaWhatsapp } from "react-icons/fa";
import { IoPersonAddSharp } from "react-icons/io5";
import { CreationContext } from "../Pages/Create";

const Contacts = () => {
  const {
    facebookLink,
    setfacebookLink,
    contacts,
    setcontacts,
    publisher,
    setpublisher,
    announceOrigin,
    setannounceOrigin,
    errors,
    moreInfo,
    setmoreInfo,
  } = useContext(CreationContext);
  const [state, setstate] = useState({});
  const [open, setopen] = useState(false);

  const handleAdd = () => {
    setcontacts([...contacts, { ...state, id: contacts.length }]);
    setopen(false);
  };

  const handleDelete = (id) => {
    let newState = contacts.filter((contact) => contact.id !== id);
    setcontacts(newState);
  };
  const origins = ["Facebook", "Whatsapp", "Internet"];

  return (
    <Stack
      direction={{ xs: "column", sm: "row", md: "row" }}
      mt={4}
      flex={1}
      sx={{ borderBottom: 1, pb: 2, borderColor: "lightgray" }}
    >
      <Box flex={2}>
        <Typography gutterBottom>4. Contacts</Typography>
        {errors.contactError && errors.addError && (
          <Typography gutterBottom variant="body2" color="error">
            Erreur contact
          </Typography>
        )}
      </Box>
      <Grid container flex={3} spacing={2}>
        <Grid item md={6} lg={6} xs={12}>
          <TextField
            label="Prénom"
            value={publisher.firstName}
            fullWidth
            size="small"
            InputProps={{ endAdornment: <FaUserCircle color="gray" /> }}
            onChange={(e) => setpublisher({ ...publisher, firstName: e.target.value })}
          />
        </Grid>
        <Grid item md={6} lg={6} xs={12}>
          <TextField
            value={publisher.lastName}
            label="Nom"
            fullWidth
            size="small"
            onChange={(e) => setpublisher({ ...publisher, lastName: e.target.value })}
          />
        </Grid>
        <Grid item md={6} lg={6} xs={12}>
          <TextField
            value={publisher.phone}
            label="Numéro de téléphone"
            fullWidth
            size="small"
            type="tel"
            InputProps={{ endAdornment: <FaPhone color="gray" /> }}
            onChange={(e) => setpublisher({ ...publisher, phone: e.target.value })}
          />
        </Grid>
        <Grid item md={6} lg={6} xs={12}>
          <TextField
            value={publisher.whatsapp}
            label="Numéro whatsapp"
            fullWidth
            size="small"
            type="tel"
            InputProps={{ endAdornment: <FaWhatsapp color="gray" /> }}
            onChange={(e) => setpublisher({ ...publisher, whatsapp: e.target.value })}
          />
        </Grid>
        <Grid item md={12} lg={12} xs={12}>
          <TextField
            value={facebookLink}
            label="lien groupe ou annonce Facebook"
            fullWidth
            size="small"
            type="url"
            InputProps={{ endAdornment: <FaFacebook color="gray" /> }}
            onChange={(e) => setfacebookLink(e.target.value)}
          />
        </Grid>
        <Grid item md={12} lg={12} xs={12}>
          <TextField
            value={announceOrigin}
            label="Origine de l'annonce"
            fullWidth
            size="small"
            select
            onChange={(e) => setannounceOrigin(e.target.value)}
          >
            {origins.map((origin, index) => (
              <MenuItem key={index} value={origin}>
                {origin}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item md={12} lg={12} xs={12}>
          <TextField
            value={moreInfo}
            label="Informations supplémentaires"
            fullWidth
            multiline
            size="small"
            rows={3}
            InputProps={{ endAdornment: <FaInfo color="gray" /> }}
            onChange={(e) => setmoreInfo(e.target.value)}
          />
        </Grid>
        {contacts.map((contact) => (
          <Grid item md={12} lg={12} xs={12}>
            <Paper sx={{ p: 1 }}>
              <Grid container alignItems="center" spacing={1}>
                <Grid item xs={6} md={6} lg={6} sm={6}>
                  <Stack direction="row" spacing={1}>
                    <FaUserCircle color="gray" />
                    <Typography noWrap variant="body2">
                      {contact.firstName} {contact.lastName}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={5} md={5} lg={5} sm={5}>
                  <Stack direction="row" spacing={1}>
                    <FaPhone color="gray" />
                    <Typography variant="body2" noWrap>
                      {contact.phone}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={1} md={1} lg={1} sm={1}>
                  <FaTrashAlt color="red" onClick={() => handleDelete(contact.id)} />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        ))}

        <Grid item md={12} lg={12} xs={12}>
          <Dialog open={open} onClose={() => setopen(false)}>
            <DialogTitle>Ajouter un contact</DialogTitle>
            <DialogContent>
              <DialogContentText>Saississer les informations</DialogContentText>
              <Grid container spacing={1} pt={2}>
                <Grid item md={6} lg={6} xs={12}>
                  <TextField
                    value={state.firstName}
                    fullWidth
                    placeholder="Prénom"
                    size="small"
                    InputProps={{ endAdornment: <FaUserCircle color="gray" /> }}
                    onChange={(e) => setstate({ ...state, firstName: e.target.value })}
                  />
                </Grid>
                <Grid item md={6} lg={6} xs={12}>
                  <TextField
                    value={state.lastName}
                    fullWidth
                    placeholder="Nom"
                    size="small"
                    InputProps={{ endAdornment: <FaUserCircle color="gray" /> }}
                    onChange={(e) => setstate({ ...state, lastName: e.target.value })}
                  />
                </Grid>
                <Grid item md={6} lg={6} xs={12}>
                  <TextField
                    value={state.phone}
                    fullWidth
                    sx={{ flex: 2 }}
                    placeholder="Numéro téléphone"
                    size="small"
                    type="tel"
                    InputProps={{ endAdornment: <FaPhone color="gray" /> }}
                    onChange={(e) => setstate({ ...state, phone: e.target.value })}
                  />
                </Grid>
                <Grid item md={6} lg={6} xs={12}>
                  <TextField
                    value={state.whatsapp}
                    fullWidth
                    sx={{ flex: 2 }}
                    placeholder="Numéro whatsapp"
                    size="small"
                    type="tel"
                    InputProps={{ endAdornment: <FaWhatsapp color="gray" /> }}
                    onChange={(e) => setstate({ ...state, whatsapp: e.target.value })}
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleAdd}>Valider</Button>
            </DialogActions>
          </Dialog>
          <Button
            fullWidth
            variant="contained"
            endIcon={<IoPersonAddSharp size={15} />}
            onClick={() => setopen(true)}
          >
            Ajouter un contact
          </Button>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default Contacts;
