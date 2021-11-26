import { Box, Typography, Grid, Stack, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { CreationContext } from "../Pages/Creation";

const Contribution = () => {
  const { state, setstate } = useContext(CreationContext);
  function handleContributionChange(e, value) {
    setstate({ ...state, contribution: Number(value) });
  }
  function handleContributionPaymentMethodChange(e, value) {
    setstate({ ...state, contributionPaymentMethod: value });
  }
  return (
    <Stack direction={{ xs: "column", sm: "row", md: "row" }} mt={4} flex={1}>
      <Box flex={2} pr={2}>
        <Typography gutterBottom>7. Contribution </Typography>
        <Typography variant="caption" color="GrayText">
          Fast Gp <b> ne prend aucune commission</b> sur vos voyages mais ne refuse pas un
          investissement symbolique, <b>facultatif</b> de votre part.
        </Typography>
      </Box>
      <Grid container flex={3} spacing={2}>
        <Grid item md={12} lg={12} xs={12} my={1}>
          <Typography gutterBottom variant="body2" color="GrayText">
            Participation facultative:
          </Typography>
          <RadioGroup row value={state.contribution} onChange={handleContributionChange}>
            <FormControlLabel label="0 €" value={0} control={<Radio size="small" />} />
            <FormControlLabel label="5 €" value={5} control={<Radio size="small" />} />
            <FormControlLabel label="10 €" value={10} control={<Radio size="small" />} />
            <FormControlLabel label="15 €" value={15} control={<Radio size="small" />} />
            <FormControlLabel label="20 €" value={20} control={<Radio size="small" />} />
          </RadioGroup>
        </Grid>
        <Grid item md={12} lg={12} xs={12}>
          {state?.contribution !== 0 ? (
            <Box>
              <Typography gutterBottom variant="body2" color="GrayText">
                Méthode de paiement de la contribution
              </Typography>
              <RadioGroup
                row
                value={state.contributionPaymentMethod}
                onChange={handleContributionPaymentMethodChange}
              >
                <FormControlLabel label="Espéces" value="money" control={<Radio size="small" />} />
                <FormControlLabel label="Wave" value="wave" control={<Radio size="small" />} />
                <FormControlLabel label="Paypal" value="paypal" control={<Radio size="small" />} />
              </RadioGroup>
              {state.contributionPaymentMethod === "money" ? (
                <Typography variant="body2" color="GrayText">
                  Le livreur encaissera la somme en même temps que les colis.
                </Typography>
              ) : (
                <Typography variant="body2" color="GrayText">
                  Le numéro ou le compte paypal vous sera fourni.
                </Typography>
              )}
            </Box>
          ) : null}
        </Grid>
      </Grid>
    </Stack>
  );
};

export default Contribution;
