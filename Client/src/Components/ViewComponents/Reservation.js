import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useState } from "react";
import {
  FaBoxTissue,
  FaLaptop,
  FaPassport,
  FaPhoneAlt,
  FaSprayCan,
  FaUserCircle,
  FaWeightHanging,
} from "react-icons/fa";
import { MdExpandMore } from "react-icons/md";
import { IoFastFoodOutline, IoPhonePortraitOutline } from "react-icons/io5";
import BoardingPass from "../ViewComponents/BoardingPass";
import { ViewContext } from "../Pages/View";

import { GiHeartNecklace } from "react-icons/gi";

const Reservation = () => {
  const { sender, setsender, receiver, setreceiver } = useContext(ViewContext);
  const [isReceiver, setisReceiver] = useState("yes");
  const bagageType = [
    { label: "Colis pesé", value: "thing", icon: <FaWeightHanging /> },
    { label: "Téléphone", value: "phone", icon: <IoPhonePortraitOutline /> },
    { label: "Ordinateur", value: "computer", icon: <FaLaptop /> },
    { label: "Parfum", value: "fragrance", icon: <FaSprayCan /> },
    { label: "Documents", value: "paper", icon: <FaPassport /> },
    { label: "Bijoux", value: "jewel", icon: <GiHeartNecklace /> },
    { label: "Alimentaire", value: "food", icon: <IoFastFoodOutline /> },
  ];
  return (
    <Paper sx={{ p: 3 }} variant="outlined">
      <BoardingPass />
      <Box>
        <Typography variant="body2" color="GrayText" flexGrow={1}></Typography>
        <Accordion variant="outlined">
          <AccordionSummary
            expandIcon={<MdExpandMore />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}>Remplissez votre ticket</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container my={1} rowSpacing={2} columnSpacing={4}>
              <Grid item xs={12} md={12} xl={12} lg={12}>
                <Typography fontWeight="bold" color="GrayText" variant="body2">
                  Envoyeur
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
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Type colis</InputLabel>
                  <Select fullWidth size="small" defaultValue="thing" label="Type de Colis">
                    {bagageType.map((type, index) => (
                      <MenuItem key={index} value={type.value}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <Box color="GrayText">{type.icon}</Box>
                          <Typography> {type.label}</Typography>
                        </Stack>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item md={12} lg={12} xl={12}>
                <Stack direction="row" alignItems="center" spacing={3}>
                  <FormLabel>Etes-vous le receveur ?</FormLabel>

                  <RadioGroup
                    row
                    value={isReceiver}
                    onChange={(e, value) => setisReceiver(e.target.value)}
                  >
                    <FormControlLabel value={"yes"} label="Oui" control={<Radio size="small" />} />
                    <FormControlLabel value="no" label="Non" control={<Radio size="small" />} />
                  </RadioGroup>
                </Stack>
              </Grid>
            </Grid>
            {isReceiver === "no" ? (
              <Grid container mb={2} rowSpacing={2} columnSpacing={4}>
                <Grid item xs={12} md={12} xl={12} lg={12}>
                  <Typography fontWeight="bold" color="GrayText" variant="body2">
                    Receveur
                  </Typography>
                </Grid>
                <Grid item md={6} lg={6} xl={6}>
                  <TextField
                    label="Prenom"
                    size="small"
                    value={receiver.firstName}
                    fullWidth
                    InputProps={{ endAdornment: <FaUserCircle color="gray" /> }}
                    onChange={(e) => setreceiver({ ...sender, firstName: e.target.value })}
                  />
                </Grid>
                <Grid item md={6} lg={6} xl={6}>
                  <TextField
                    label="Nom"
                    size="small"
                    value={receiver.lastName}
                    fullWidth
                    InputProps={{ endAdornment: <FaUserCircle color="gray" /> }}
                    onChange={(e) => setreceiver({ ...receiver, lastName: e.target.value })}
                  />
                </Grid>
                <Grid item md={6} lg={6} xl={6}>
                  <TextField
                    label="Télephone"
                    size="small"
                    type="tel"
                    value={receiver.phoneNumber}
                    fullWidth
                    InputProps={{ endAdornment: <FaPhoneAlt color="gray" /> }}
                    onChange={(e) => setreceiver({ ...receiver, phoneNumber: e.target.value })}
                  />
                </Grid>
              </Grid>
            ) : null}

            <Button variant="contained" size="small" fullWidth endIcon={<FaBoxTissue />}>
              Réserver
            </Button>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Paper>
  );
};

export default Reservation;
