import React, { useContext } from "react";

import {
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Slider,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/material";
import { Box } from "@mui/system";

import { SearchPageContext } from "../Pages/Search";

const FilterBar = () => {
  const { orderBy, setorderBy, filters, setfilters, filteredFlight } =
    useContext(SearchPageContext);

  const handleOderChange = (e) => {
    setorderBy(e.target.value);
  };

  const handlePaymentChange = (e) => {
    if (e.target.value === "money") {
      setfilters({ ...filters, money: e.target.checked });
      return;
    }
    if (e.target.value === "card") {
      setfilters({ ...filters, card: e.target.checked });
      return;
    }
    if (e.target.value === "paypal") {
      setfilters({ ...filters, paypal: e.target.checked });
      return;
    }
    if (e.target.value === "wave") {
      setfilters({ ...filters, wave: e.target.checked });
      return;
    }
  };

  const handleShipping = (e) => {
    if (e.target.value) {
      setfilters({ ...filters, FreeshippingOnly: e.target.checked });
    }
  };

  const changePriceRange = (e, newValue) => {
    setfilters({ ...filters, price: newValue });
  };
  return (
    <Paper
      elevation={0}
      sx={{
        px: 2,
        py: 2,
        minHeight: "30%",
        border: 1,
        borderColor: "#E2E2E2",
      }}
    >
      <Stack divider={<Divider orientaion="horizontal" />} spacing={1}>
        <Typography>Résultats ({filteredFlight.length})</Typography>
        <Box>
          <FormControl sx={{ width: "100%", my: 1 }}>
            <InputLabel>Trier par</InputLabel>
            <Select
              value={orderBy}
              placeholder="Trier par"
              fullWidth
              label="Trier par"
              size="small"
              onChange={handleOderChange}
            >
              {["Date", "Prix"].map((filter, index) => (
                <MenuItem value={filter} key={index}>
                  {filter}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box py={1}>
          <Typography fontWeight="bold" fontSize={13}>
            Moyens de transport
          </Typography>
          <FormGroup sx={{ pt: 1 }}>
            <FormControlLabel
              sx={{ height: 25 }}
              control={<Checkbox defaultChecked size="small" disabled />}
              label={<Typography fontSize={13}>Avion</Typography>}
            />
            <FormControlLabel
              sx={{ height: 25 }}
              control={<Checkbox size="small" disabled />}
              label={
                <Typography fontSize={13} color="GrayText">
                  Bateau (Bientot)
                </Typography>
              }
            />
          </FormGroup>
        </Box>
        <Box py={1}>
          <Typography fontWeight="bold" fontSize={13}>
            Prix
          </Typography>
          <Box pt={1}>
            <Stack direction="row" justifyContent="space-between">
              <Typography fontSize={11}>{filters.minPrice} € </Typography>
              <Typography fontSize={11}>{filters.maxPrice} € </Typography>
            </Stack>
            <Box px={1}>
              <Slider
                color="secondary"
                min={filters.minPrice}
                value={filters.price}
                max={filters.maxPrice}
                marks
                step={1}
                valueLabelDisplay="auto"
                onChange={changePriceRange}
              />
            </Box>
          </Box>
        </Box>
        <Box py={1}>
          <Typography fontWeight="bold" fontSize={13}>
            Paiements acceptés
          </Typography>
          <FormGroup sx={{ pt: 1 }}>
            <FormControlLabel
              onClick={handlePaymentChange}
              sx={{ height: 25 }}
              checked={filters.money}
              value="money"
              control={<Checkbox disableRipple size="small" />}
              label={<Typography fontSize={13}>Espéces</Typography>}
            />
            <FormControlLabel
              onClick={handlePaymentChange}
              sx={{ height: 25 }}
              checked={filters.paypal}
              value="paypal"
              control={<Checkbox disableRipple size="small" />}
              label={<Typography fontSize={13}>Paypal</Typography>}
            />
            <FormControlLabel
              onClick={handlePaymentChange}
              sx={{ height: 25 }}
              checked={filters.card}
              value="card"
              control={<Checkbox disableRipple size="small" />}
              label={<Typography fontSize={13}>Carte</Typography>}
            />
            <FormControlLabel
              onClick={handlePaymentChange}
              sx={{ height: 25 }}
              checked={filters.wave}
              value="wave"
              control={<Checkbox disableRipple size="small" />}
              label={<Typography fontSize={13}>Wave</Typography>}
            />
          </FormGroup>
        </Box>
        <Box py={1}>
          <Typography fontWeight="bold" fontSize={13}>
            Livraison
          </Typography>
          <FormControl>
            <FormControlLabel
              sx={{ height: 25 }}
              checked={filters.FreeshippingOnly}
              onChange={handleShipping}
              control={<Checkbox disableRipple size="small" />}
              label={<Typography fontSize={13}>Gratuite</Typography>}
            />
          </FormControl>
        </Box>
      </Stack>
    </Paper>
  );
};

export default FilterBar;
