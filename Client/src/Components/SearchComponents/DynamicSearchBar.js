import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import {
    Autocomplete,
    Button,
    Container,
    Divider,
    Grid,
    IconButton,
    Menu,
    MenuItem,
    Paper,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import React, { useState, useEffect, createContext, useContext } from "react";
import { AiOutlineSwap } from "react-icons/ai";
import data from "../../data/test.json";
import { useHistory, useParams } from "react-router-dom";
import { SearchPageContext } from "../Pages/Search";
import { Box } from "@mui/system";
import COLORS from "../../colors";
import { MdSearch } from "react-icons/md";
import { GoDash } from "react-icons/go";
import moment from "moment";
import { IoSwapVerticalOutline } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa";

export const SearchContext = createContext();

const Departure = ({ size }) => {
    const { departure, setdeparture, departureError, handleError } =
        useContext(SearchContext);
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
        setdeparture(value);
        handleError();
    };
    const getLabel = (option) => {
        if (option.name !== "") {
            return `${option.name}, ${option.country}`;
        }
        return "";
    };
    return (
        <Autocomplete
            value={departure}
            options={destinations}
            noOptionsText="Destination introuvable"
            getOptionLabel={getLabel}
            groupBy={(option) => option.country}
            renderOption={(props, option) => (
                <Typography {...props}>{option.name}</Typography>
            )}
            renderInput={(params) => (
                <TextField
                    {...params}
                    margin="none"
                    size={size}
                    variant="standard"
                    label="Départ"
                    fullWidth
                    error={departureError}
                    inputProps={{
                        ...params.inputProps,
                        style: {
                            ...params.inputProps.style,
                            fontWeight: 600,
                            color: COLORS.black,
                        },
                    }}
                    InputProps={{
                        disableUnderline: true,
                        ...params.InputProps,
                    }}
                />
            )}
            onBlur={handleError}
            onChange={(e, value) => handleSave(value)}
        />
    );
};
const Destination = ({ size }) => {
    const { destination, setdestination, destinationError, handleError } =
        useContext(SearchContext);
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
        setdestination(value);
        handleError();
    };
    const getLabel = (option) => {
        if (option.name !== "") {
            return `${option.name}, ${option.country}`;
        }
        return "";
    };
    return (
        <Autocomplete
            noOptionsText="Destination introuvable"
            value={destination}
            options={destinations}
            getOptionLabel={getLabel}
            groupBy={(option) => option.country}
            renderOption={(props, option) => (
                <Typography {...props}>{option.name}</Typography>
            )}
            renderInput={(params) => (
                <TextField
                    {...params}
                    size={size}
                    variant="standard"
                    label="Destination"
                    error={destinationError}
                    InputProps={{
                        disableUnderline: true,
                        ...params.InputProps,
                    }}
                    inputProps={{
                        ...params.inputProps,
                        style: {
                            ...params.inputProps.style,
                            fontWeight: 600,
                            color: COLORS.black,
                        },
                    }}
                />
            )}
            onBlur={handleError}
            onChange={(e, value) => handleSave(value)}
        />
    );
};
const MobileFilter = () => {
    const { orderBy, setorderBy } = useContext(SearchPageContext);
    const [triAnchor, settriAnchor] = useState(null);
    const openTri = Boolean(triAnchor);

    function changeTri(newTri) {
        setorderBy(newTri);
        settriAnchor(null);
    }

    return (
        <Box>
            <Stack
                flex={1}
                direction="row"
                justifyContent="space-between"
                p={0.5}
                bgcolor={COLORS.background}
            >
                <MenuItem
                    sx={{
                        borderRadius: 2,
                        p: 0,
                        border: "1px solid lightGray",
                        px: 1,
                    }}
                    disableGutters
                    disableTouchRipple
                >
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <Typography variant="body2">Filtres</Typography>
                    </Stack>
                </MenuItem>
                <Button
                    sx={{
                        borderRadius: 2,
                        p: 0,
                        border: "1px solid lightGray",
                        px: 1,
                    }}
                    size="small"
                    disableTouchRipple
                    onClick={(e) => settriAnchor(e.currentTarget)}
                >
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <Typography variant="caption">
                            Tri : {orderBy}
                        </Typography>
                        <FaAngleDown />
                    </Stack>
                </Button>
            </Stack>

            <Menu
                id="basic-menu"
                open={openTri}
                anchorEl={triAnchor}
                onClose={() => settriAnchor(null)}
            >
                <MenuItem
                    value="Date"
                    onClick={() => changeTri("Date")}
                    key="Date"
                >
                    Date
                </MenuItem>
                <MenuItem
                    value="Prix"
                    onClick={() => changeTri("Prix")}
                    key="Price"
                >
                    Prix croissant
                </MenuItem>
            </Menu>
        </Box>
    );
};
const SearchSummaryMobile = ({
    searching,
    displaySearchingBar,
    departure,
    destination,
    departureDate,
    switchDestinations,
}) => {
    return (
        <Box
            mt={-2}
            display={{
                xs: searching ? "none" : "block",
                sm: searching ? "none" : "block",
                md: "none",
                lg: "none",
                xl: "none",
            }}
        >
            <Paper elevation={0}>
                <Stack
                    px={3}
                    bgcolor={COLORS.primary}
                    sx={{
                        borderBottomLeftRadius: 10,
                        borderBottomRightRadius: 10,
                    }}
                >
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <IconButton onClick={displaySearchingBar}>
                            <MdSearch color="white" />
                        </IconButton>

                        <Stack flex={1} alignItems="center" color="white">
                            <Stack
                                direction="row"
                                alignItems="center"
                                spacing={2}
                                fontWeight={555}
                            >
                                <Typography variant="body1">
                                    {departure?.name}
                                </Typography>
                                <GoDash color={COLORS.warning} />
                                <Typography variant="body1">
                                    {destination?.name}
                                </Typography>
                            </Stack>
                            <Box textAlign="center" color="whitesmoke" pb={1}>
                                <Typography variant="body2">
                                    {moment(departureDate).format(
                                        "dddd, D MMMM"
                                    )}
                                </Typography>
                            </Box>
                        </Stack>
                        <IconButton>
                            <AiOutlineSwap
                                color="white"
                                onClick={switchDestinations}
                            />
                        </IconButton>
                    </Stack>
                </Stack>
                <MobileFilter />
            </Paper>
        </Box>
    );
};

const DynamicSearchBar = ({ size = "small" }) => {
    const history = useHistory();
    const {
        departureCity,
        departureCountry,
        destinationCity,
        destinationCountry,
        date,
    } = useParams();
    const { getSomeFlights } = useContext(SearchPageContext);
    const [departure, setdeparture] = useState({
        name: "Paris",
        country: "France",
    });
    const [destination, setdestination] = useState({
        name: "Dakar",
        country: "Sénégal",
    });
    const [departureDate, setDepartureDate] = useState(new Date());
    const [departureError, setdepartureError] = useState(false);
    const [destinationError, setdestinationError] = useState(false);
    const [dateOpen, setdateOpen] = useState(false);
    const [searching, setSearching] = useState(false);

    const switchDestinations = async () => {
        var newDep = departure;
        history.replace(
            `/search/${destination.name}/${destination.country}/${
                departure.name
            }/${departure.country}/${departureDate.toJSON()}`,
            {
                departure: destination,
                destination: departure,
                date: departureDate,
            }
        );
        setdestination(newDep);
        setdeparture(destination);
        await getSomeFlights(destination, departure, departureDate.toJSON());
    };

    const handleError = () => {
        setdepartureError(departure == null);
        setdestinationError(destination == null);
    };

    const handleSearch = () => {
        if (departure === null || departure.name === "") {
            setdepartureError(true);
            return;
        }
        if (destination === null || destination.name === "") {
            setdestinationError(true);
            return;
        }
        if (departure !== null && destination !== null) {
            if (departure.name !== "" && destination.name !== "") {
                departureError && setdepartureError(false);
                destinationError && setdestinationError(false);
                getSomeFlights(departure, destination, departureDate.toJSON());
                displaySearchingBar();
                history.replace({
                    pathname: `/search/${departure.name}/${departure.country}/${
                        destination.name
                    }/${destination.country}/${departureDate.toJSON()}`,
                });
            }
        }
    };
    function displaySearchingBar() {
        setSearching(!searching);
    }
    function getCity(cityName, country) {
        var result = data
            .filter((value) => value.translations.fr === country)[0]
            .states.filter((city) => city.name === cityName)[0];
        return { ...result, country };
    }
    useEffect(() => {
        async function fetchDatas() {
            if (departureCity) {
                setdeparture(getCity(departureCity, departureCountry));
                setdestination(getCity(destinationCity, destinationCountry));
                setDepartureDate(new Date(date));
                await getSomeFlights(
                    getCity(departureCity, departureCountry),
                    getCity(destinationCity, destinationCountry),
                    date
                );
            } else {
                setSearching(true);
            }
        }
        fetchDatas();
    }, []);
    const MobileMenu = () => {
        return (
            <Paper
                elevation={0}
                sx={{
                    borderRadius: 2,
                    border: { xs: "1px solid #E5E5E5", sm: 0, md: 0 },
                    boxShadow: {
                        xs: "1px 1px 3px 1px #494aa225",
                        sm: "1px 1px 3px 1px #494aa225",
                        md: "none",
                    },
                }}
            >
                <Grid
                    container
                    rowGap={2}
                    columnSpacing={2}
                    p={{ xs: 2, sm: 3, md: 0 }}
                >
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={5}
                        lg={5}
                        xl={5}
                        mb={{ xs: 0.5 }}
                    >
                        <Departure size={size} />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={1}
                        md={2}
                        lg={2}
                        xl={2}
                        sx={{
                            display: { sm: "none", xs: "none", md: "block" },
                        }}
                    >
                        <Button
                            fullWidth
                            // variant="outlined"
                            sx={{ height: "100%", color: "gray" }}
                            onClick={switchDestinations}
                        >
                            <AiOutlineSwap size={20} />
                        </Button>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={1}
                        lg={1}
                        xl={1}
                        sx={{
                            display: { sm: "block", xs: "block", md: "none" },
                        }}
                    >
                        <Stack
                            direction="row"
                            alignItems="center"
                            position="relative"
                        >
                            <Divider
                                variant="fullWidth"
                                sx={{
                                    borderStyle: "dashed",
                                    flex: 1,
                                    flexFlow: 1,
                                }}
                            />
                            <Box position="absolute" right={0} bgcolor="white">
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    sx={{
                                        height: "100%",
                                        color: "gray",
                                        backgroundColor: "white",
                                    }}
                                    onClick={switchDestinations}
                                >
                                    <IoSwapVerticalOutline size={20} />
                                </Button>
                            </Box>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
                        <Destination size={size} />
                    </Grid>
                </Grid>
            </Paper>
        );
    };
    return (
        <SearchContext.Provider
            value={{
                departure,
                setdeparture,
                destination,
                setdestination,
                departureDate,
                setDepartureDate,
                departureError,
                destinationError,
                handleError,
            }}
        >
            <Box
                mt={-1}
                sx={{ background: { xs: "white", md: "#F6F6F9" } }}
                px={2}
                py={{ xs: 1, sm: 1, md: 2 }}
                display={{
                    xs: searching ? "block" : "none",
                    sm: searching ? "block" : "none",
                    md: "block",
                    lg: "block",
                    xl: "block",
                }}
            >
                <Container>
                    <Paper
                        sx={{
                            borderColor: "#E5E5E5",
                            boxShadow: {
                                sm: "none",
                                md: "1px 1px 5px 2px #494aa225",
                            },
                            width: { xs: "100%", sm: "100%", md: "100%" },
                            marginX: "auto",
                            backgroundColor: {
                                xs: "inherit",
                                sm: "inherit",
                                md: "white",
                            },
                            px: { xs: 0, sm: 0, md: 2 },
                            py: { xs: 0, sm: 0, md: 1 },
                        }}
                        elevation={0}
                    >
                        <Grid container columnSpacing={2} rowGap={2}>
                            <Grid item xs={12} sm={12} md={7} lg={7} xl={7}>
                                <Box>
                                    <MobileMenu />
                                </Box>
                            </Grid>
                            <Grid item xs={6} sm={6} md={3} lg={3} xl={3}>
                                <Box
                                    flex={1}
                                    border={{
                                        xs: "1px solid lightGray",
                                        md: "none",
                                    }}
                                    py={{ xs: 0.5 }}
                                    px={{ xs: 1 }}
                                    bgcolor="white"
                                    borderRadius={{ xs: 1 }}
                                >
                                    <DesktopDatePicker
                                        type="date"
                                        value={departureDate}
                                        label="Date de départ"
                                        minDate={moment()}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                fullWidth
                                                size="small"
                                                variant="standard"
                                                onClick={() =>
                                                    setdateOpen(true)
                                                }
                                                InputProps={{
                                                    disableUnderline: true,
                                                    ...params.InputProps,
                                                }}
                                                inputProps={{
                                                    ...params.inputProps,
                                                    style: {
                                                        ...params.inputProps
                                                            .style,
                                                        fontWeight: 500,
                                                        color: COLORS.black,
                                                    },
                                                }}
                                            />
                                        )}
                                        onChange={(value) =>
                                            setDepartureDate(value)
                                        }
                                        open={dateOpen}
                                        onOpen={() => setdateOpen(true)}
                                        onClose={() => setdateOpen(false)}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={6} sm={6} md={2} lg={2} xl={2}>
                                <Button
                                    fullWidth
                                    size="small"
                                    color="primary"
                                    variant="contained"
                                    sx={{ height: "100%" }}
                                    onClick={handleSearch}
                                >
                                    Rechercher
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Container>
            </Box>

            <SearchSummaryMobile
                searching={searching}
                departure={departure}
                destination={destination}
                displaySearchingBar={displaySearchingBar}
                departureDate={departureDate}
                switchDestinations={switchDestinations}
            />
        </SearchContext.Provider>
    );
};

export default DynamicSearchBar;
