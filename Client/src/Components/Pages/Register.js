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

  const ChoiceScreen = () => {
    return (
      <Stack direction="row" spacing={2} p={2}>
        <Box flex={1}>
          <Button
            variant="contained"
            fullWidth
            size="large"
            endIcon={<GoPackage />}
            onClick={() => setPageState({ ...PageState, userType: "client" })}
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
            onClick={() => setPageState({ ...PageState, userType: "gp" })}
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
      <Box p={{ xs: 3, sm: 3, md: 5, lg: 5, xl: 5 }} pt={1}>
        <Stack direction="row" justifyContent="center" m={1} alignItems="center">
          <img src={loginImage} alt="login" width="60%" />
        </Stack>
        <Typography gutterBottom variant="h4" fontWeight="bold" color="primary">
          Inscription
        </Typography>
        <Typography gutterBottom variant="caption" color="GrayText">
          Vous avez 2 livraisons gratuites* aprés votre inscription.
        </Typography>
      </Box>
      {PageState.userType === "client" ? (
        <ClientForm />
      ) : PageState.userType === "gp" ? (
        <GPForm />
      ) : PageState.userType === "becomeGP" ? (
        <BecomeGp />
      ) : (
        <ChoiceScreen />
      )}
      <Box p={5} mt={1}>
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
  const [PageState, setPageState] = useState({ loading: false, userType: null });
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
  const RegisterClient = () => {
    verifyUserInput() && registerUser();
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
  useEffect(() => {
    if (currentUser) {
      if (choice === "client" || choice === "gp" || choice === "becomGp") {
        setPageState({ ...PageState, userType: choice });
      } else {
        history.replace("/register/start");
      }
    }
  }, [currentUser]);
  return (
    <RegisterContext.Provider value={exported}>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3}></Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Middle />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
            <Paper variant="outlined">
              <Box p={2}>
                <Typography>
                  Vous avez déja un compte ?{" "}
                  <Button onClick={() => history.push("/login")}>Connectez vous </Button>
                </Typography>
              </Box>
              <Box p={2} display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="body2">Devenir covaliseur (GP) ?</Typography>
                <Button>Devenir GP</Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </RegisterContext.Provider>
  );
};

export default Register;
