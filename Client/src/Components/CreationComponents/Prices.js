import {
  Box,
  Typography,
  Grid,
  TextField,
  Paper,
  Stack,
  FormControlLabel,
  Button,
  FormGroup,
  Checkbox,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { BsCurrencyExchange } from "react-icons/bs";
import React, { useContext } from "react";
import { FaCoins } from "react-icons/fa";
import { CreationContext } from "../Pages/Creation";

const Prices = () => {
  const { paymentMethod, setpaymentMethod, prices, setprices, state, setstate, errors } =
    useContext(CreationContext);

  const changePrice = (type, newPrice_) => {
    var newPrice = prices.map((price) => {
      if (price.type === type) {
        return { ...price, price: newPrice_ };
      }
      return price;
    });
    setprices(newPrice);
  };

  const checkPaymentMethod = (type, check) => {
    var newPaymentMethods = paymentMethod.map((payment) => {
      if (payment.type === type) {
        return { ...payment, supported: check };
      }
      return payment;
    });
    setpaymentMethod(newPaymentMethods);
  };
  const currencies = [
    { key: "CFA", label: "Franc CFA" },
    { key: "€", label: "Euro" },
    { key: "$", label: "Dollar" },
    { key: "£", label: "Livre sterling" },
    { key: "DRH", label: "Dirham" },
  ];

  return (
    <Stack
      direction={{ xs: "column", sm: "row", md: "row" }}
      sx={{ borderBottom: 1, pb: 2, borderColor: "lightgray" }}
      flex={1}
      mt={4}
    >
      <Box flex={2}>
        <Typography gutterBottom>6. Prix et moyens de paiement</Typography>
        {errors.priceError && errors.addError && (
          <Typography gutterBottom variant="body2" color="error">
            Erreur prix
          </Typography>
        )}
      </Box>
      <Grid container flex={3} spacing={2}>
        <Grid item md={12} lg={12} xs={12}>
          <Stack spacing={1}>
            <Paper>
              <Stack direction="row" alignItems="center">
                <BsCurrencyExchange style={{ flex: 1 }} color="A5A5A5" />
                <Typography color="GrayText" flex={4}>
                  Devise
                </Typography>
                <Box flex={2} mx={1} mt={1}>
                  <TextField
                    placeholder="Prix"
                    size="small"
                    type="number"
                    fullWidth
                    value={state.currency}
                    select
                    onChange={(e) => setstate({ ...state, currency: e.target.value })}
                  >
                    {currencies.map((currency, index) => (
                      <MenuItem
                        value={currency.key}
                        key={index}
                        onClick={(e) => setstate({ ...state, currency: e.target.value })}
                      >
                        {currency.key}
                      </MenuItem>
                    ))}
                  </TextField>
                  <FormHelperText>
                    {currencies.filter((currency) => state.currency === currency.key)[0].label}
                  </FormHelperText>
                </Box>
              </Stack>
            </Paper>
            {prices.map((price, index) => (
              <Paper key={index}>
                <Stack direction="row" alignItems="center">
                  {price.icon}
                  <Typography color="GrayText" flex={4}>
                    {price.label}
                  </Typography>
                  <TextField
                    sx={{ flex: 2 }}
                    placeholder="Prix"
                    size="small"
                    type="number"
                    value={price.price}
                    InputProps={{
                      endAdornment: (
                        <Typography fontSize={12} ml={1}>
                          {state.currency}
                        </Typography>
                      ),
                    }}
                    onChange={(e) => changePrice(price.type, e.target.value)}
                  />
                </Stack>
              </Paper>
            ))}
          </Stack>
        </Grid>

        <Grid item md={12} lg={12} xs={12}>
          <Button fullWidth variant="contained" endIcon={<FaCoins size={15} />}>
            Ajouter un prix
          </Button>

          <Stack my={2}>
            <Typography gutterBottom>Methode de paiments acceptées</Typography>
            <FormGroup row>
              {paymentMethod.map((method, index) => (
                <Paper sx={{ flex: 1, px: 1, mr: 1, mt: 1 }} key={index}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        defaultChecked
                        size="small"
                        checked={method.supported}
                        onChange={(e) => checkPaymentMethod(method.type, e.target.checked)}
                      />
                    }
                    label={method.label}
                  />
                </Paper>
              ))}
            </FormGroup>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
};
export default Prices;
