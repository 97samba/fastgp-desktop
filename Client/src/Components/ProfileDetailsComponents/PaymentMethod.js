import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import {
  Avatar,
  Button,
  ButtonBase,
  Grid,
  Paper,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import { FaCcPaypal, FaEdit, FaPaypal, FaUserAlt } from "react-icons/fa";
import { IoMdSave } from "react-icons/io";
import { MdAdd, MdModeEdit } from "react-icons/md";
import { GrAmex } from "react-icons/gr";

import COLORS from "../../colors";
import { ProfileDetailsContext } from "../Pages/ProfileDetails";
import moment from "moment";

const AddCart = ({ setediting }) => {
  const { user } = useContext(ProfileDetailsContext);
  const [state, setstate] = useState({ card: "", holder: "", date: "", cvc: "" });
  function handleSave() {
    setediting(false);
  }
  function handleReturn() {
    setediting(false);
  }
  useEffect(() => {
    if (user?.userId) {
      setstate({
        firstName: user?.firstName,
        lastName: user?.lastName,
        phone: user?.phone,
        address: user?.address,
        email: user?.email,
        birthday: user?.birthday,
      });
    }
  }, [user]);
  return (
    <Box>
      <Stack direction="row" spacing={2} alignItems="center" mb={2}>
        <FaUserAlt color={COLORS.warning} />
        <Typography fontWeight="bold" variant="h5" color="primary" flexGrow={1}>
          Ajouter un moyen
        </Typography>
        <Button varaint="contained" color="warning" onClick={handleReturn}>
          Retour
        </Button>
      </Stack>
      <Paper elevation={0} sx={{ boxShadow: "0px 1px 3px rgba(3, 0, 71, 0.2)" }}>
        <Box p={2}>
          <Grid container py={2} spacing={2}>
            <Grid item xs={12} sm={12} md={6} xl={6} lg={6}>
              <TextField
                value={state.card}
                fullWidth
                label="Numéro de carte"
                size="small"
                type="number"
                onClick={(e) => setstate({ ...state, card: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} xl={6} lg={6}>
              <TextField
                value={state.holder}
                fullWidth
                label="Nom"
                size="small"
                onClick={(e) => setstate({ ...state, holder: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} xl={6} lg={6}>
              <DesktopDatePicker
                value={state.date}
                type="date"
                label="Date d'expiration"
                renderInput={(params) => <TextField {...params} fullWidth size="small" />}
                value={state.birthday}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} xl={6} lg={6}>
              <TextField
                value={state.cvc}
                fullWidth
                label="CVC"
                size="small"
                type="number"
                onClick={(e) => setstate({ ...state, cvc: e.target.value })}
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

const Payment = ({ data }) => {
  return (
    <Paper sx={{ flex: 1, boxShadow: "0px 1px 3px rgba(3, 0, 71, 0.2)" }}>
      <Grid container p={2} spacing={1} display="flex" alignItems="center" color={COLORS.black}>
        <Grid item xs={1} sm={1} md={1} lg={1} xl={1} textAlign="center">
          <Paper sx={{ boxShadow: "0px 1px 3px rgba(3, 0, 71, 0.2)" }}>{data.icon}</Paper>
        </Grid>
        <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
          <Typography variant="body2" fontWeight={500}>
            {data.holder}
          </Typography>
        </Grid>
        <Grid item xs={5} sm={5} md={5} lg={5} xl={5}>
          {data.cardNumber}
        </Grid>
        <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
          {data.date ? moment(data.date).format("M/YY") : "N/A"}
        </Grid>
        <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
          <MdModeEdit color="GrayText" size={20} />
        </Grid>
      </Grid>
    </Paper>
  );
};

const PaymentMethod = () => {
  const { profilState, user } = useContext(ProfileDetailsContext);
  const [editing, setediting] = useState(false);

  const methods = [
    {
      icon: <GrAmex size={30} color={COLORS.primary} />,
      label: "Amex",
      holder: "John Doe",
      cardNumber: "1234 5678 **** ****",
      date: new Date(),
      type: "card",
    },
    {
      icon: <FaPaypal color={COLORS.primary} />,
      label: "Paypal",
      holder: "John Doe",
      cardNumber: "john.Doe@gmail.com",
      date: null,
      type: "paypal",
    },
  ];
  return (
    <Box>
      {!editing ? (
        <Box py={1}>
          <Stack direction="row" spacing={2} alignItems="center" mb={2}>
            {profilState.icon}
            <Typography fontWeight="bold" variant="h5" color="primary" flexGrow={1}>
              {profilState.label}
            </Typography>

            <Button
              varaint="contained"
              color="warning"
              endIcon={<MdAdd />}
              onClick={() => setediting(true)}
            >
              Ajouter
            </Button>
          </Stack>
          <Stack spacing={2}>
            {methods.map((method, index) => (
              <Payment data={method} key={index} />
            ))}
          </Stack>
        </Box>
      ) : (
        <AddCart setediting={setediting} />
      )}
    </Box>
  );
};

export default PaymentMethod;
