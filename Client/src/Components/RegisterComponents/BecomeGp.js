import LoadingButton from "@mui/lab/LoadingButton";
import {
  Box,
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
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { getAuth } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import {
  FaCloudUploadAlt,
  FaIdCard,
  FaPassport,
  FaRegIdBadge,
  FaRegIdCard,
  FaRegPaperPlane,
} from "react-icons/fa";
import { MdCancel, MdCheck, MdLogin, MdOutlinePhoneAndroid, MdPhoneAndroid } from "react-icons/md";
import { useHistory } from "react-router-dom";
import { becomeGp, useAuth } from "../../firebase/auth";
import { storeImage } from "../../firebase/Storage";
import { AuthContext } from "../../Providers/AuthProvider";

const FirstForm = ({ state, setstate }) => {
  const { currentUser } = getAuth();
  const { handelOpenSignInDialog } = useContext(AuthContext);

  const history = useHistory();

  function handleNext() {
    setstate({ ...state, step: "second" });
  }

  function getName(type = "firstName" || "lastName") {
    var tab = currentUser?.displayName.split(" ");
    if (type === "firstName") {
      tab.pop();
      return tab.join(" ");
    }
    if (type === "lastName") {
      return tab.pop();
    }
  }

  return (
    <Box flex={1} px={2}>
      {currentUser?.uid ? (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <TextField
              size="small"
              fullWidth
              label="Prénom"
              disabled
              value={getName("firstName")}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <TextField size="small" fullWidth label="Nom" value={getName("lastName")} disabled />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <TextField
              size="small"
              fullWidth
              label="Email"
              type="email"
              disabled
              value={currentUser?.email}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} mt={2}>
            <Button
              color="error"
              fullWidth
              endIcon={<MdCancel />}
              onClick={() => history.push("/")}
            >
              Ce n'est pas moi
            </Button>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} mt={2}>
            <Button color="success" fullWidth endIcon={<MdCheck />} onClick={handleNext}>
              Continer
            </Button>
          </Grid>
        </Grid>
      ) : (
        <Box textAlign="center">
          <Typography>Connectez vous SVP</Typography>
          <Stack direction="row" my={4}>
            <Box flex={1}>
              <Button color="error" fullWidth endIcon={<MdCancel />}>
                Retour
              </Button>
            </Box>
            <Box flex={1}>
              <Button
                color="success"
                fullWidth
                endIcon={<MdLogin />}
                onClick={handelOpenSignInDialog}
              >
                Se connecter
              </Button>
            </Box>
          </Stack>
        </Box>
      )}
    </Box>
  );
};
const SecondForm = ({ state, setstate }) => {
  const currentUser = useAuth();
  const [displayError, setdisplayError] = useState(false);
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
  const [informations, setinformations] = useState({
    phone: "",
    phone2: "",
    whatsapp1: "oui",
    whatsapp2: "oui",
    documentIdentity: "passport",
  });
  const history = useHistory();

  function handleImage(e) {
    if (e.target.files.length > 0) {
      setimage(e.target.files[0]);
      console.log(`image`, e.target?.files[0]?.name);
    }
  }
  function getImageSize() {
    return image.size
      ? informations.documentIdentity + " " + Math.ceil(image?.size / 1000) + " ko"
      : null;
  }

  async function handleBecomeGP() {
    setstate({ ...state, loading: true });
    if (informations.phone === "" || informations.identityNumber === "" || !image.name) {
      setdisplayError(true);
      return;
    } else {
      var imgUrl = await storeImage(
        image,
        "identities/",
        currentUser?.displayName,
        currentUser?.uid
      );
      const result = await becomeGp(informations, currentUser?.email, imgUrl);

      console.log("registerdone", result);

      result
        ? history.push("/profilDetails/" + currentUser?.uid + "/myProfile")
        : setdisplayError(true);
    }
    setstate({ ...state, loading: false });
  }

  useEffect(() => {
    if (currentUser?.uid) {
    }
  }, [currentUser]);

  return (
    <Box>
      <Box p={2}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <TextField
              label="Téléphone pays 1*"
              fullWidth
              size="small"
              type="tel"
              value={informations.phone}
              error={displayError && informations.phone === ""}
              helperText={displayError && "Téléphone manquant"}
              InputProps={{ endAdornment: <MdPhoneAndroid size={18} color="gray" /> }}
              onChange={(e) => setinformations({ ...informations, phone: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
              <FormLabel>
                <Typography variant="body2">Whatsapp ?</Typography>
              </FormLabel>
              <RadioGroup
                row
                value={informations.whatsapp1}
                onChange={(e, value) => setinformations({ ...informations, whatsapp1: value })}
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
              value={informations.phone2}
              InputProps={{ endAdornment: <MdOutlinePhoneAndroid size={18} color="gray" /> }}
              onChange={(e) => setinformations({ ...informations, phone2: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
              <FormLabel>
                <Typography variant="body2">Whatsapp ?</Typography>
              </FormLabel>
              <RadioGroup
                row
                value={informations.whatsapp2}
                onChange={(e, value) => setinformations({ ...informations, whatsapp2: value })}
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
              value={informations.documentIdentity}
              helperText={
                displayError && !image.name
                  ? "Veuillez joindre le document SVP"
                  : "Choisir un document"
              }
              error={displayError && !image.name}
              onChange={(e) =>
                setinformations({ ...informations, documentIdentity: e.target.value })
              }
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
                documents.filter((doc) => doc.value === informations.documentIdentity)[0]
                  ?.idNumberLabel + "*"
              }
              fullWidth
              size="small"
              error={displayError && informations.identityNumber === ""}
              value={informations.identityNumber}
              helperText={
                displayError && informations.identityNumber === ""
                  ? "Champs manquant"
                  : "Toute information sera vérifiée"
              }
              onChange={(e) => setinformations({ ...informations, identityNumber: e.target.value })}
            >
              {documents.map((doc, index) => (
                <MenuItem value={doc.value} key={index}>
                  <ListItemIcon>{doc.icon}</ListItemIcon>
                  {doc.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
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
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12} mt={4}>
          <LoadingButton
            loading={state.loading}
            fullWidth
            size="medium"
            color="warning"
            variant="contained"
            loadingIndicator="Création..."
            onClick={handleBecomeGP}
            endIcon={<FaRegPaperPlane />}
          >
            Finir l'inscription
          </LoadingButton>
        </Grid>
      </Box>
    </Box>
  );
};

const BecomeGp = () => {
  const [state, setstate] = useState({ step: "first", loading: false });

  return (
    <Box px={3}>
      {state.step === "first" ? (
        <FirstForm state={state} setstate={setstate} />
      ) : (
        <SecondForm state={state} setstate={setstate} />
      )}
    </Box>
  );
};

export default BecomeGp;
