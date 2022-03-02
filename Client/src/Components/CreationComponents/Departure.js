import {
    Box,
    Typography,
    Grid,
    TextField,
    Stack,
    Autocomplete,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";

import { IoLocationSharp } from "react-icons/io5";

import data from "../../data/test.json";
import { CreationContext } from "../Pages/Creation";

const Departure = () => {
    const {
        depotAddress,
        setdepotAddress,
        departure,
        setdeparture,
        errors,
        pageMode,
    } = useContext(CreationContext);
    const [destinations, setdestinations] = useState([]);

    useEffect(() => {
        let newState = [];
        data.map((doc) => {
            doc.states.map((state) =>
                newState.push({ ...state, country: doc.translations.fr })
            );
        });
        setdestinations(newState);
    }, []);

    const handleSave = (value) => {
        value ? setdeparture(value) : setdeparture({ name: "", country: "" });
        setdepotAddress({ ...depotAddress, city: value?.name });
    };
    const getLabel = (option) => {
        if (option.name !== "") {
            return `${option.name}, ${option.country}`;
        }
        return "";
    };
    return (
        <Stack
            direction={{ xs: "column", sm: "row", md: "row" }}
            flex={1}
            sx={{ borderBottom: 1, pb: 2, borderColor: "lightgray" }}
        >
            <Box flex={2}>
                <Typography gutterBottom>1. Départ</Typography>
                {errors.departureError && errors.addError && (
                    <Typography gutterBottom variant="body2" color="error">
                        Départ incorrect
                    </Typography>
                )}
            </Box>
            <Grid container flex={3} spacing={2}>
                <Grid item md={12} lg={12} xs={12}>
                    <Autocomplete
                        value={departure}
                        options={destinations}
                        noOptionsText="Destination introuvable"
                        disabled={pageMode === "edit"}
                        getOptionLabel={getLabel}
                        groupBy={(option) => option?.country}
                        renderOption={(props, option) => (
                            <Typography {...props}>{option.name}</Typography>
                        )}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                size="small"
                                variant="outlined"
                                label="Départ"
                                fullWidth
                            />
                        )}
                        onChange={(e, value) => handleSave(value)}
                    />
                </Grid>
                <Grid item md={12} lg={12} xs={12}>
                    <TextField
                        value={depotAddress?.address}
                        label="Adresse"
                        fullWidth
                        size="small"
                        InputProps={{
                            endAdornment: (
                                <IoLocationSharp size={20} color="#B1B1B1" />
                            ),
                        }}
                        onChange={(e) =>
                            setdepotAddress({
                                ...depotAddress,
                                address: e.target.value,
                            })
                        }
                    />
                </Grid>
                <Grid item md={6} lg={6} xs={12}>
                    <TextField
                        label="Ville"
                        fullWidth
                        size="small"
                        disabled={pageMode === "edit"}
                        value={depotAddress?.city}
                        onChange={(e) =>
                            setdepotAddress({
                                ...depotAddress,
                                city: e.target.value,
                            })
                        }
                    />
                </Grid>
                <Grid item md={6} lg={6} xs={12}>
                    <TextField
                        label="Code Postal"
                        value={depotAddress?.postalCode}
                        fullWidth
                        size="small"
                        onChange={(e) =>
                            setdepotAddress({
                                ...depotAddress,
                                postalCode: e.target.value,
                            })
                        }
                    />
                </Grid>
                <Grid item md={12} lg={12} xs={12}>
                    <TextField
                        label="Complément d'adresse"
                        value={depotAddress?.moreInfo}
                        fullWidth
                        size="small"
                        helperText="Indispensable pour les adresses en Afrique ;)"
                        onChange={(e) =>
                            setdepotAddress({
                                ...depotAddress,
                                moreInfo: e.target.value,
                            })
                        }
                    />
                </Grid>
            </Grid>
        </Stack>
    );
};
export default Departure;
