import {
  Box,
  Typography,
  Grid,
  TextField,
  Paper,
  Stack,
  Button,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Select,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { FaSuitcase, FaSuitcaseRolling, FaTrashAlt } from "react-icons/fa";
import { CreationContext } from "../Pages/Creation";

const Valises = () => {
  const [open, setopen] = useState(false);
  const [state, setstate] = useState({ type: "soute", weight: 23, added: true });

  const { suitcases, setsuitcases } = useContext(CreationContext);

  const changeWeight = (id, newWeight) => {
    var newSuitcase = suitcases.map((suitcase) => {
      if (suitcase.id === id) {
        return { ...suitcase, weight: parseInt(newWeight) };
      }
      return suitcase;
    });
    setsuitcases(newSuitcase);
  };
  const handleAdd = () => {
    let newState = suitcases;
    newState.push({ ...state, id: newState.length, added: true });
    setopen(false);
  };
  const handleDelete = (id) => {
    let newState = suitcases.filter((suitcase) => suitcase.id !== id);
    setsuitcases(newState);
  };
  const Suitcase = ({ suitcase }) => {
    return (
      <Paper key={suitcase.id}>
        <Stack direction="row" alignItems="center">
          {suitcase.type === "soute" ? (
            <FaSuitcase style={{ flex: 1 }} color="A5A5A5" />
          ) : (
            <FaSuitcaseRolling style={{ flex: 1 }} color="A5A5A5" />
          )}

          <Typography color="GrayText" flex={4}>
            {suitcase.type}
          </Typography>
          {suitcase.added ? (
            <FaTrashAlt onClick={() => handleDelete(suitcase.id)} style={{ flex: 1 }} color="red" />
          ) : (
            <FaTrashAlt style={{ flex: 1 }} color="#C5C5C5" />
          )}
          <TextField
            sx={{ flex: 2 }}
            value={suitcase.weight}
            placeholder="Kilo"
            size="small"
            type="number"
            InputProps={{
              endAdornment: (
                <Typography fontSize={12} ml={1}>
                  kg
                </Typography>
              ),
            }}
            onChange={(e) => changeWeight(suitcase.id, e.target.value)}
          />
        </Stack>
      </Paper>
    );
  };
  return (
    <Stack
      direction={{ xs: "column", sm: "row", md: "row" }}
      mt={4}
      flex={1}
      sx={{ borderBottom: 1, pb: 2, borderColor: "lightgray" }}
    >
      <Box flex={2}>
        <Typography gutterBottom>5. Valises</Typography>
      </Box>
      <Grid container flex={3} spacing={2}>
        <Grid item md={12} lg={12} xs={12}>
          <Stack spacing={1}>
            {suitcases
              .sort((a, b) => a.type.localeCompare(b.type))
              .map((suitcase) => (
                <Suitcase suitcase={suitcase} />
              ))}
          </Stack>
        </Grid>
        <Dialog open={open} onClose={() => setopen(false)}>
          <DialogTitle>Ajouter une valise</DialogTitle>
          <DialogContent>
            <DialogContentText>Selectionner un type et un poids</DialogContentText>
            <Grid container spacing={1} pt={2}>
              <Grid item md={6} lg={6} xs={12}>
                <Select
                  value={state.type}
                  fullWidth
                  label="Type"
                  size="small"
                  placeholder="Type"
                  onChange={(e) => setstate({ ...state, type: e.target.value })}
                >
                  <MenuItem value="cabine">Cabine</MenuItem>
                  <MenuItem value="soute">Soute</MenuItem>
                </Select>
              </Grid>
              <Grid item md={6} lg={6} xs={12}>
                <TextField
                  value={state.weight}
                  fullWidth
                  sx={{ flex: 2 }}
                  placeholder="Kilo"
                  size="small"
                  type="number"
                  InputProps={{
                    endAdornment: (
                      <Typography fontSize={12} ml={1}>
                        kg
                      </Typography>
                    ),
                  }}
                  onChange={(e) => setstate({ ...state, weight: e.target.value })}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleAdd}>Valider</Button>
          </DialogActions>
        </Dialog>

        <Grid item md={12} lg={12} xs={12}>
          <Button
            fullWidth
            variant="contained"
            endIcon={<FaSuitcase size={15} />}
            onClick={() => setopen(true)}
          >
            Ajouter une valise
          </Button>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default Valises;
