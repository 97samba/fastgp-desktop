import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Button,
  Divider,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  Input,
  ListItemIcon,
  MenuItem,
  Radio,
  RadioGroup,
  Slide,
  Stack,
  TextField,
  Typography,
  Zoom,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useState } from "react";
import {
  FaAngleRight,
  FaCloudUploadAlt,
  FaIdCard,
  FaLock,
  FaPassport,
  FaRegIdBadge,
  FaRegIdCard,
  FaRegPaperPlane,
  FaUpload,
} from "react-icons/fa";
import { IoMailSharp, IoPerson, IoPersonOutline } from "react-icons/io5";
import { MdPhoneAndroid } from "react-icons/md";
// import loginImage from "../Images/undraw_login_re_4vu2.svg";
import data from "../../data/test.json";
import { registerGP, verifyIfUserExists } from "../../firebase/auth";
import { storeImage } from "../../firebase/Storage";
import { ValidateBirthday } from "../../Middleware/RegisterMiddleware";

import { RegisterContext } from "../Pages/Register";

const FirstForm = ({ handleNext }) => {
  const {
    state,
    setstate,
    dateOpen,
    displayError,
    setdateOpen,
    setdisplayError,
    errors,
    seterrors,
    verifyUserInput,
  } = useContext(RegisterContext);
  const handleFirstStep = async () => {
    if (state.email === "") {
      seterrors({ ...errors, emailError: "Champs obligatoire" });
      setdisplayError(true);
      return;
    }
    seterrors({ ...errors, emailError: "" });

    const userExists = await verifyIfUserExists(state.email);

    if (userExists) {
      seterrors({ ...errors, emailError: "Cet utlisateur existe déja" });
      setdisplayError(true);
    } else {
      seterrors({ ...errors, emailError: "" });
      setdisplayError(false);

      verifyUserInput() && handleNext();
    }
  };

  return (
    <Zoom in={true} timeout={150}>
      <Box px={{ xs: 2, sm: 2, md: 5 }}>
        <Grid container spacing={2}>
          <Grid item xs={6} sm={6} md={6} lg={6}>
            <TextField
              label="Prénom"
              fullWidth
              size="small"
              error={displayError && state.firstName === ""}
              helperText={displayError && state.firstName === "" ? "Prénom manquant" : ""}
              value={state.firstName}
              InputProps={{ endAdornment: <IoPerson size={18} color="gray" /> }}
              onChange={(e) => setstate({ ...state, firstName: e.target.value })}
            />
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6}>
            <TextField
              label="Nom"
              fullWidth
              size="small"
              error={displayError && state.lastName === ""}
              helperText={displayError && state.lastName === "" ? "Nom manquant" : ""}
              value={state.lastName}
              InputProps={{ endAdornment: <IoPersonOutline size={18} color="gray" /> }}
              onChange={(e) => setstate({ ...state, lastName: e.target.value })}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12}>
            <TextField
              label="Email"
              fullWidth
              size="small"
              type="email"
              error={displayError && (errors.emailError !== "" || state.email === "")}
              helperText={displayError && errors.emailError}
              value={state.email}
              onBlur={() => seterrors({ ...errors, emailError: "" })}
              InputProps={{ endAdornment: <IoMailSharp size={18} color="gray" /> }}
              onChange={(e) => setstate({ ...state, email: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <TextField
              label="Mot de passe"
              fullWidth
              size="small"
              type="password"
              error={displayError && errors.mdpError !== ""}
              helperText={displayError && errors.mdpError}
              value={state.password1}
              InputProps={{ endAdornment: <FaLock size={16} color="gray" /> }}
              onChange={(e) => setstate({ ...state, password1: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <TextField
              label="Confirmer le mot de passe"
              fullWidth
              size="small"
              type="password"
              error={displayError && errors.mdpError !== ""}
              helperText={displayError && errors.mdpError}
              value={state.password2}
              InputProps={{ endAdornment: <FaLock size={16} color="gray" /> }}
              onChange={(e) => setstate({ ...state, password2: e.target.value })}
            />
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6}>
            <DesktopDatePicker
              type="date"
              value={state.birthday}
              label="Date de naissance"
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  size="small"
                  onClick={() => setdateOpen(true)}
                  error={displayError && errors.birthdayError !== ""}
                  helperText={displayError && errors.birthdayError}
                />
              )}
              onChange={(value) => {
                setstate({ ...state, birthday: value });
                seterrors({ ...errors, birthdayError: ValidateBirthday(value) });

                setdateOpen(false);
              }}
              onClose={() => {
                setdateOpen(false);
              }}
              onOpen={() => setdateOpen(true)}
              open={dateOpen}
            />
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6}>
            <TextField
              value={state.sex}
              placeholder="sexe"
              label="sexe"
              fullWidth
              select
              size="small"
              onChange={(e) => setstate({ ...state, sex: e.target.value })}
            >
              {["Masculin", "Féminin"].map((sexe, index) => (
                <MenuItem key={index} value={sexe}>
                  {sexe}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={6} sm={6} md={6} lg={6}>
            <TextField
              value={state.country}
              placeholder="Pays"
              label="Pays"
              fullWidth
              select
              size="small"
              onChange={(e) => setstate({ ...state, country: e.target.value })}
            >
              {data.map((country, index) => (
                <MenuItem key={index} value={country.name}>
                  {country.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6}>
            <TextField
              label="Télephone"
              fullWidth
              size="small"
              type="tel"
              value={state.phone}
              error={displayError && state.phone === ""}
              helperText={displayError && "Téléphone manquant"}
              InputProps={{ endAdornment: <MdPhoneAndroid size={18} color="gray" /> }}
              onChange={(e) => setstate({ ...state, phone: e.target.value })}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} mt={2}>
          <Button
            fullWidth
            size="medium"
            color="warning"
            variant="contained"
            onClick={handleFirstStep}
          >
            Continuer
          </Button>
        </Grid>
      </Box>
    </Zoom>
  );
};
const SecondForm = () => {
  const { state, setstate, displayError, setdisplayError, history } = useContext(RegisterContext);

  const handleRegister = async () => {
    if (state.phone === "" || state.identityNumber === "" || !image.name) {
      setdisplayError(true);
      return;
    } else {
      var imgUrl = await storeImage(image, "identities/");
      const result = await registerGP(state, imgUrl);

      console.log("registerdone");

      result ? history.push("/") : setdisplayError(true);
    }
  };
  const handleRegisterWithoutDocument = () => {};

  const documents = [
    {
      label: "Carte d'identité",
      value: "cni",
      icon: <FaIdCard />,
      idNumberLabel: "Numéro carte d'identité",
    },
    {
      label: "Passeport",
      value: "passport",
      icon: <FaPassport />,
      idNumberLabel: "Numéro passeport",
    },
    {
      label: "Carte de séjour",
      value: "sejour",
      icon: <FaRegIdCard />,
      idNumberLabel: "Numéro étranger",
    },
    { label: "Kbis (entreprise)", value: "kbis", icon: <FaRegIdBadge />, idNumberLabel: "SIREN" },
  ];
  const [image, setimage] = useState("");

  function handleImage(e) {
    if (e.target.files.length > 0) {
      setimage(e.target.files[0]);
      console.log(`image`, e.target.files[0].name);
    }
  }
  function getImageSize() {
    return image.size ? state.documentIdentity + " " + Math.ceil(image?.size / 1000) + " ko" : null;
  }

  return (
    <Slide direction="left" in={true} timeout={150}>
      <Box p={{ xs: 2, sm: 2, md: 5 }}>
        <Grid container spacing={2} mb={2}>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <TextField
              label="Téléphone pays 1*"
              fullWidth
              size="small"
              type="tel"
              value={state.phone}
              error={displayError && state.phone === ""}
              helperText={displayError && "Téléphone manquant"}
              InputProps={{ endAdornment: <MdPhoneAndroid size={18} color="gray" /> }}
              onChange={(e) => setstate({ ...state, phone: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
              <FormLabel>
                <Typography variant="body2">Whatsapp ?</Typography>
              </FormLabel>
              <RadioGroup
                row
                value={state.whatsapp1}
                onChange={(e, value) => setstate({ ...state, whatsapp1: value })}
              >
                <FormControlLabel
                  componentsProps={{ typography: { variant: "body2" } }}
                  value="oui"
                  label="Oui"
                  control={
                    <Radio
                      sx={{
                        "& .MuiSvgIcon-root": {
                          fontSize: 16,
                        },
                      }}
                    />
                  }
                />
                <FormControlLabel
                  componentsProps={{ typography: { variant: "body2" } }}
                  value="non"
                  label="Non"
                  control={
                    <Radio
                      sx={{
                        "& .MuiSvgIcon-root": {
                          fontSize: 16,
                        },
                      }}
                    />
                  }
                />
              </RadioGroup>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <TextField
              label="Téléphone pays 2"
              fullWidth
              size="small"
              type="tel"
              value={state.phone2}
              InputProps={{ endAdornment: <MdPhoneAndroid size={18} color="gray" /> }}
              onChange={(e) => setstate({ ...state, phone2: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
              <FormLabel>
                <Typography variant="body2">Whatsapp ?</Typography>
              </FormLabel>
              <RadioGroup
                row
                value={state.whatsapp2}
                onChange={(e, value) => setstate({ ...state, whatsapp2: value })}
              >
                <FormControlLabel
                  componentsProps={{ typography: { variant: "body2" } }}
                  value="oui"
                  label="Oui"
                  control={
                    <Radio
                      sx={{
                        "& .MuiSvgIcon-root": {
                          fontSize: 16,
                        },
                      }}
                    />
                  }
                />
                <FormControlLabel
                  componentsProps={{ typography: { variant: "body2" } }}
                  value="non"
                  label="Non"
                  control={
                    <Radio
                      sx={{
                        "& .MuiSvgIcon-root": {
                          fontSize: 16,
                        },
                      }}
                    />
                  }
                />
              </RadioGroup>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Divider sx={{ my: 2 }} />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <TextField
              select
              label="Document*"
              fullWidth
              size="small"
              value={state.documentIdentity}
              helperText={
                displayError && !image.name
                  ? "Veuillez joindre le document SVP"
                  : "Choisir un document"
              }
              error={displayError && !image.name}
              onChange={(e) => setstate({ ...state, documentIdentity: e.target.value })}
            >
              {documents.map((doc, index) => (
                <MenuItem value={doc.value} key={index}>
                  <ListItemIcon>{doc.icon}</ListItemIcon>
                  {doc.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <TextField
              label={
                documents.filter((doc) => doc.value === state.documentIdentity)[0].idNumberLabel +
                "*"
              }
              fullWidth
              size="small"
              error={displayError && state.identityNumber === ""}
              value={state.identityNumber}
              helperText={
                displayError && state.identityNumber === ""
                  ? "Champs manquant"
                  : "Toute information sera vérifiée"
              }
              onChange={(e) => setstate({ ...state, identityNumber: e.target.value })}
            >
              {documents.map((doc, index) => (
                <MenuItem value={doc.value} key={index}>
                  <ListItemIcon>{doc.icon}</ListItemIcon>
                  {doc.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <label htmlFor="contained-button-file">
              <Input
                sx={{ display: "none" }}
                accept="image/*"
                id="contained-button-file"
                multiple
                type="file"
                onChange={handleImage}
              />
              <LoadingButton fullWidth component="span" endIcon={<FaCloudUploadAlt />}>
                Joindre le fichier*
              </LoadingButton>
              <FormHelperText sx={{ textAlign: "center" }}>{getImageSize()}</FormHelperText>
            </label>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Button
              fullWidth
              endIcon={<FaAngleRight />}
              color="warning"
              onClick={handleRegisterWithoutDocument}
            >
              Sauter l'étape
            </Button>
            <FormHelperText sx={{ textAlign: "center" }}>Remplir aprés</FormHelperText>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12} mt={4}>
          <Button
            fullWidth
            size="medium"
            color="warning"
            variant="contained"
            onClick={handleRegister}
            endIcon={<FaRegPaperPlane />}
          >
            Finir l'inscription
          </Button>
        </Grid>
      </Box>
    </Slide>
  );
};
const GPForm = () => {
  const [formState, setformState] = useState({ step: 1 });
  function handleNext() {
    setformState({ ...formState, step: formState.step + 1 });
  }
  return (
    <Box>
      {formState.step === 1 ? (
        <FirstForm handleNext={handleNext} />
      ) : (
        <SecondForm handleNext={handleNext} />
      )}
    </Box>
  );
};
export default GPForm;
