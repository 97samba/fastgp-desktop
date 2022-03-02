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

const Destination = () => {
    const {
        retraitAddress,
        setRetraitAddress,
        destination,
        setdestination,
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
        value
            ? setdestination(value)
            : setdestination({ name: "", country: "" });
        setRetraitAddress({ ...retraitAddress, city: value?.name });
    };
    const getLabel = (option) => {
        if (option.name != "") {
            return `${option.name}, ${option.country}`;
        }
        return "";
    };
    return (
        <Stack
            direction={{ xs: "column", sm: "row", md: "row" }}
            mt={4}
            flex={1}
            sx={{ borderBottom: 1, pb: 2, borderColor: "lightgray" }}
        >
            <Box flex={2}>
                <Typography gutterBottom>2. Destination </Typography>
                {errors.destinationError && errors.addError && (
                    <Typography gutterBottom variant="body2" color="error">
                        Destination incorrecte
                    </Typography>
                )}
            </Box>
            <Grid container flex={3} spacing={2}>
                <Grid item md={12} lg={12} xs={12}>
                    <Autocomplete
                        noOptionsText="Destination introuvable"
                        value={destination}
                        disabled={pageMode === "edit"}
                        options={destinations}
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
                                label="Destination"
                            />
                        )}
                        onChange={(e, value) => handleSave(value)}
                    />
                </Grid>
                <Grid item md={12} lg={12} xs={12}>
                    <TextField
                        value={retraitAddress?.address}
                        label="Adresse"
                        fullWidth
                        size="small"
                        InputProps={{
                            endAdornment: (
                                <IoLocationSharp size={20} color="#B1B1B1" />
                            ),
                        }}
                        onChange={(e) =>
                            setRetraitAddress({
                                ...retraitAddress,
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
                        value={retraitAddress?.city}
                        onChange={(e) =>
                            setRetraitAddress({
                                ...retraitAddress,
                                city: e.target.value,
                            })
                        }
                    />
                </Grid>
                <Grid item md={6} lg={6} xs={12}>
                    <TextField
                        value={retraitAddress?.postalCode}
                        label="Code Postal"
                        fullWidth
                        size="small"
                        onChange={(e) =>
                            setRetraitAddress({
                                ...retraitAddress,
                                postalCode: e.target.value,
                            })
                        }
                    />
                </Grid>
                <Grid item md={12} lg={12} xs={12}>
                    <TextField
                        label="Complément d'adresse"
                        value={retraitAddress?.moreInfo}
                        fullWidth
                        size="small"
                        helperText="Indispensable pour les adresses en Afrique ;)"
                        onChange={(e) =>
                            setRetraitAddress({
                                ...retraitAddress,
                                moreInfo: e.target.value,
                            })
                        }
                    />
                </Grid>
            </Grid>
        </Stack>
    );
};

export default Destination;
