import {
  Button,
  Container,
  FormHelperText,
  Grid,
  Link,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { createContext, useContext, useEffect, useState } from "react";
import { FaSuitcase } from "react-icons/fa";

// import loginImage from "../Images/undraw_login_re_4vu2.svg";
import loginImage from "../../Images/register.svg";
import { ValidateBirthday, ValidatePassword } from "../../Middleware/RegisterMiddleware";
import { register, useAuth } from "../../firebase/auth";
import { GoPackage } from "react-icons/go";
import GPForm from "../RegisterComponents/GPForm";
import { ClientForm } from "../RegisterComponents/ClientForm";
import { useHistory, useParams } from "react-router";
import BecomeGp from "../RegisterComponents/BecomeGp";

const Middle = () => {
  const { PageState, setPageState } = useContext(RegisterContext);
  const history = useHistory();

  function gotoPage(page, title, subTitle) {
    setPageState({ ...PageState, title, subTitle });
    history.push("/register/" + page);
  }

  const ChoiceScreen = () => {
    return (
      <Stack direction="row" spacing={2} p={2}>
        <Box flex={1}>
          <Button
            variant="contained"
            fullWidth
            size="large"
            endIcon={<GoPackage />}
            onClick={() =>
              gotoPage(
                "client",
                "Compte client",
                "Vous avez 2 livraisons gratuites* aprés votre inscription."
              )
            }
          >
            Client
          </Button>
        </Box>
        <Box flex={1} textAlign="center">
          <Button
            variant="contained"
            fullWidth
            color="warning"
            size="large"
            endIcon={<FaSuitcase />}
            onClick={() =>
              gotoPage(
                "gp",
                "Compte covaliseur (GP)",
                "Publier votre annonce sans commission ou confier nous la distribution de tous vos bagages."
              )
            }
          >
            Covaliseur
          </Button>
          <FormHelperText sx={{ textAlign: "center" }}>GP (transporteur)</FormHelperText>
        </Box>
      </Stack>
    );
  };
  return (
    <Paper>
      <Box px={5} py={2}>
        <Stack direction="row" justifyContent="center" m={1} alignItems="center">
          <img src={loginImage} alt="login" width="60%" />
        </Stack>
        <Typography gutterBottom variant="h5" fontWeight="bold" color="primary">
          {PageState.title}
        </Typography>
        <Typography gutterBottom variant="caption" color="GrayText">
          {PageState.subTitle}
        </Typography>
      </Box>
      {PageState.userType === "client" ? (
        <ClientForm />
      ) : PageState.userType === "gp" ? (
        <GPForm />
      ) : PageState.userType === "becomeGp" ? (
        <BecomeGp />
      ) : (
        <ChoiceScreen />
      )}
      <Box px={5} pb={2} my={2}>
        <Typography variant="caption">
          En vous inscrivant, vous acceptez nos conditions d'utilisation et notre Politique de
          confidentialité.
        </Typography>
      </Box>
    </Paper>
  );
};
export const RegisterContext = createContext();

const Register = () => {
  const history = useHistory();
  const { choice } = useParams();
  const currentUser = useAuth();
  const [PageState, setPageState] = useState({
    loading: false,
    userType: null,
    title: "Inscription",
  });
  const [state, setstate] = useState({
    email: "",
    password1: "",
    password2: "",
    firstName: "",
    lastName: "",
    phone: "",
    whatsapp1: "oui",
    documentIdentity: "passport",
    identityNumber: "",
    identityUrl: "",
    phone2: "",
    whatsapp2: "oui",
    birthday: new Date(),
    sex: "Masculin",
    country: "Sénégal",
    loading: false,
  });

  const [dateOpen, setdateOpen] = useState(false);
  const [displayError, setdisplayError] = useState(false);
  const [errors, seterrors] = useState({
    mdpError: "",
    emailError: "",
    birthdayError: "",
  });

  async function registerUser() {
    var result = await register(state);
    result ? history.push("/") : setdisplayError(true);
  }
  const verifyUserInput = () => {
    seterrors({
      ...errors,
      mdpError: ValidatePassword(state.password1, state.password2),
      birthdayError: ValidateBirthday(state.birthday),
    });
    if (
      ValidatePassword(state.password1, state.password2) === "" &&
      ValidateBirthday(state.birthday) === "" &&
      errors.emailError === ""
    ) {
      setdisplayError(false);
      return true;
    } else {
      setdisplayError(true);
      return false;
    }
  };
  const RegisterClient = async () => {
    verifyUserInput() && (await registerUser());
  };
  const RegisterGP = () => {
    verifyUserInput();
  };
  const exported = {
    PageState,
    setPageState,
    state,
    setstate,
    dateOpen,
    displayError,
    setdateOpen,
    setdisplayError,
    errors,
    seterrors,
    RegisterClient,
    RegisterGP,
    history,
    currentUser,
    verifyUserInput,
  };
  // useEffect(() => {
  //   if (currentUser?.uid) {
  //     if (choice === "becomeGp") {
  //       setPageState({ ...PageState, userType: choice });
  //     }
  //   }
  // }, [currentUser]);

  useEffect(() => {
    console.log(`choice`, choice);
    if (choice === "client" || choice === "gp" || choice === "becomeGp") {
      setPageState({ ...PageState, userType: choice });
    } else {
      console.log("replacing choice");
      history.replace("/register/start");
    }
  }, []);

  useEffect(() => {
    console.log(`choice`, choice);
    var label = "";
    if (choice === "client") {
      label = "Création compte client";
    }
    if (choice === "gp") {
      label = "Compte covaliseur (GP)";
    }
    if (choice === "becomeGp") {
      label = "Devenir Gp";
    }
    if (choice === "start") {
      label = "Inscription";
    }
    setPageState({ ...PageState, userType: choice, title: label });
  }, [choice]);

  return (
    <RegisterContext.Provider value={exported}>
      <Container>
        <Grid container spacing={2} py={{ xs: 2, sm: 3, md: 6 }}>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3}></Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Middle />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
            <Paper variant="outlined">
              <Box p={2}>
                <Typography>Vous avez déja un compte ? </Typography>
                <Link href="/login">
                  <Typography variant="body2">Connectez-vous</Typography>
                </Link>{" "}
              </Box>
              {PageState.userType === "becomeGp" ? (
                <Box p={2}>
                  <Typography>Envie de nous rejoindre ?</Typography>
                  <Link href="/register/start">
                    <Typography variant="body2">Créer un compte</Typography>
                  </Link>
                </Box>
              ) : (
                <Box p={2}>
                  <Typography>Transporter des colis ?</Typography>

                  <Link href="/register/becomeGp">
                    <Typography variant="body2">Devenir covaliseur (GP) </Typography>
                  </Link>
                </Box>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </RegisterContext.Provider>
  );
};

export default Register;
