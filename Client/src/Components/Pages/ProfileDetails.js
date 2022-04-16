import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    Container,
    Grid,
    ListItem,
    ListItemIcon,
    ListItemText,
    MenuItem,
    MenuList,
    Paper,
    Stack,
    Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { createContext, useContext, useEffect, useState } from "react";
import { FaHome, FaPlaneDeparture, FaUserAlt } from "react-icons/fa";
import { GoPackage } from "react-icons/go";
import { IoMdHeartEmpty, IoMdPricetags } from "react-icons/io";
import { IoDocument, IoLocationSharp } from "react-icons/io5";
import {
    MdExpandMore,
    MdOutlineBlock,
    MdPayment,
    MdPerson,
} from "react-icons/md";
import COLORS from "../../colors";
import Profile from "../ProfileDetailsComponents/Profile";
import { useHistory, useParams } from "react-router-dom";
import {
    getGPReservations,
    getUserReservations,
    userDetails,
} from "../../firebase/db";
import PaymentMethod from "../ProfileDetailsComponents/PaymentMethod";
import Location from "../ProfileDetailsComponents/Location";
import Packages from "../ProfileDetailsComponents/Packages";
import { useAuth } from "../../firebase/auth";
import MyAnnouces from "../ProfileDetailsComponents/MyAnnouces";
import Reservations from "../ProfileDetailsComponents/Reservations";
import Documents from "../ProfileDetailsComponents/Documents";
import Followers from "../ProfileDetailsComponents/Followers";

export const boardTab = [
    {
        label: "Profil",
        icon: <FaUserAlt color="GrayText" />,
        key: "myProfile",
        secured: false,
    },
    {
        label: "Adresses",
        icon: <IoLocationSharp size={17} color="GrayText" />,
        key: "location",
        secured: true,
    },
    {
        label: "Mode de paiement",
        icon: <MdPayment size={17} color="GrayText" />,
        key: "payments",
        secured: true,
    },
];
export const dashTab = [
    {
        label: "Mes colis",
        icon: <GoPackage />,
        key: "packages",
        secured: true,
    },
    {
        label: "Mes annonces",
        icon: <FaPlaneDeparture size={15} />,
        key: "flights",
        secured: true,
    },
    {
        label: "Favoris",
        icon: <IoMdHeartEmpty size={17} />,
        key: "favorites",
        secured: true,
    },
    {
        label: "Colis clients",
        icon: <IoMdPricetags size={17} />,
        key: "reservations",
        secured: true,
    },

    {
        label: "Documents",
        icon: <IoDocument size={17} />,
        key: "documents",
        secured: true,
    },
];
const Left = () => {
    const { profilState, goToPage, currentUser, id } = useContext(
        ProfileDetailsContext
    );

    return (
        <Paper
            elevation={0}
            sx={{ boxShadow: "0px 1px 3px rgba(3, 0, 71, 0.2)" }}
        >
            <Box>
                <Typography variant="body2" color="GrayText" px={2} pt={2}>
                    Compte
                </Typography>
                <Box>
                    <MenuList>
                        {boardTab.map(
                            (tab) =>
                                (!tab.secured || currentUser?.uid === id) && (
                                    <MenuItem
                                        key={tab.key}
                                        sx={{
                                            "&:hover": {
                                                borderLeft:
                                                    "4px solid " +
                                                    COLORS.warning,
                                            },
                                            borderLeft:
                                                profilState.label === tab.label
                                                    ? "4px solid " +
                                                      COLORS.warning
                                                    : "none",
                                        }}
                                        onClick={() =>
                                            goToPage(
                                                tab.label,
                                                tab.key,
                                                tab.icon
                                            )
                                        }
                                    >
                                        <ListItemIcon>{tab.icon}</ListItemIcon>
                                        <ListItemText>{tab.label}</ListItemText>
                                    </MenuItem>
                                )
                        )}
                    </MenuList>
                </Box>
                <Typography variant="body2" color="GrayText" px={2} pt={2}>
                    Tableau de bord
                </Typography>
                <Box pb={1}>
                    <MenuList>
                        {dashTab.map(
                            (dash) =>
                                (!dash.secured || currentUser?.uid === id) && (
                                    <MenuItem
                                        key={dash.key}
                                        sx={{
                                            "&:hover": {
                                                borderLeft:
                                                    "4px solid " +
                                                    COLORS.warning,
                                            },
                                            borderLeft:
                                                profilState.label === dash.label
                                                    ? "4px solid " +
                                                      COLORS.warning
                                                    : "none",
                                        }}
                                        onClick={() =>
                                            goToPage(
                                                dash.label,
                                                dash.key,
                                                dash.icon
                                            )
                                        }
                                    >
                                        <ListItemIcon>{dash.icon}</ListItemIcon>
                                        <ListItemText>
                                            {dash.label}
                                        </ListItemText>
                                    </MenuItem>
                                )
                        )}
                    </MenuList>
                </Box>
            </Box>
        </Paper>
    );
};
const Right = () => {
    const { profilState } = useContext(ProfileDetailsContext);

    const renders = [
        {
            key: "payments",
            item: <PaymentMethod />,
        },
        {
            key: "myProfile",
            item: <Profile />,
        },
        {
            key: "location",
            item: <Location />,
        },
        {
            key: "packages",
            item: <Packages />,
        },
        {
            key: "gps",
            item: <Location />,
        },
        {
            key: "flights",
            item: <MyAnnouces />,
        },
        {
            key: "favorites",
            item: <Followers />,
        },
        {
            key: "reservations",
            item: <Reservations />,
        },
        {
            key: "documents",
            item: <Documents />,
        },
    ];
    function getItem() {
        return renders.map((render) => {
            if (render.key === profilState.key) {
                return render.item;
            }
        });
    }
    return <Box>{getItem()}</Box>;
};

const Unauthorized = () => {
    const history = useHistory();
    return (
        <Box flex={1} m={2} p={2}>
            <Paper
                elevation={0}
                sx={{ boxShadow: "0px 1px 3px rgba(3, 0, 71, 0.2)" }}
            >
                <Stack alignItems="center" spacing={2} textAlign="center" p={4}>
                    <MdOutlineBlock size={30} color="red" />
                    <Typography variant="h5">
                        {" "}
                        Unauthorized ressources
                    </Typography>
                    <Stack direction="row" spacing={2}>
                        <Button
                            onClick={() => history.push("/")}
                            endIcon={<FaHome />}
                        >
                            Acceuil
                        </Button>
                        <Button
                            color="warning"
                            onClick={() => history.push("/login")}
                            endIcon={<MdPerson />}
                        >
                            Connexion
                        </Button>
                    </Stack>
                </Stack>
            </Paper>
        </Box>
    );
};

export const ProfileDetailsContext = createContext();

const ProfileDetails = () => {
    const { id, subpage, subID } = useParams();
    const currentUser = useAuth();
    const history = useHistory();
    const [profilState, setprofilState] = useState({
        loading: true,
    });
    const [HeaderInformations, setHeaderInformations] = useState([]);
    const [reservations, setreservations] = useState([]);

    const [loading, setloading] = useState(true);
    const [user, setuser] = useState();
    const [unauthorized, setunauthorized] = useState(false);

    async function getPage() {
        var pageInfo = dashTab.filter((tab) => tab.key === subpage);
        if (pageInfo.length === 0) {
            pageInfo = boardTab.filter((tab) => tab.key === subpage);
        }
        if (pageInfo.length === 0) {
            setprofilState({ ...profilState, ...boardTab[0] });
            history.replace("/profilDetails/" + id + "/" + boardTab[0].key);
        } else {
            setprofilState({ ...profilState, ...pageInfo[0] });
        }
    }

    function goToPage(label, key, icon) {
        setprofilState({ ...profilState, label, key, icon });
        history.push("/profilDetails/" + id + "/" + key);
    }

    async function getHeaderInformations(user_) {
        var results = [];
        // if (userType === "client") {
        results = await getUserReservations(id);
        let headers = [];
        if (id === currentUser?.uid) {
            headers = [
                {
                    label: "Colis validés",
                    number: results?.length,
                    key: "packages",
                },
                {
                    label: "En attente",
                    number: results?.filter((a) => a.status === "pending")
                        ?.length,
                    key: "pending",
                },
                {
                    label: "Colis refusés",
                    number: results?.filter((a) => a.status === "ok")?.length,
                    key: "shipping",
                },
            ];
        } else {
            headers = [
                {
                    label: "Annonces",
                    number: user_?.flights?.length,
                    key: "announces",
                },
                {
                    label: "Abonnés",
                    number: user_?.followers?.length,
                    key: "followers",
                },
                {
                    label: "Colis",
                    number: results.length,
                    key: "packages",
                },
                // {
                //   label: "Colis boutique",
                //   number: 0,
                //   key: "shop",
                // },
            ];
        }
        setHeaderInformations(headers);

        setreservations(results);
    }

    async function getUser() {
        if (id) {
            await getPage();
            var result = await userDetails(id);
            setuser(result);
            await getHeaderInformations(result);
            setloading(false);
        } else {
            history.push("/login");
        }
    }
    function getAvatar() {
        if (currentUser) {
            return currentUser?.displayName?.charAt(0);
        }
    }

    const MobileLeft = () => {
        return (
            <Box>
                <Accordion
                    disableGutters={true}
                    elevation={0}
                    sx={{ boxShadow: "0px 1px 3px rgba(3, 0, 71, 0.2)" }}
                >
                    <AccordionSummary expandIcon={<MdExpandMore size={22} />}>
                        <MenuItem
                            key={profilState.key}
                            sx={{
                                borderLeft:
                                    profilState.label === profilState.label
                                        ? "4px solid " + COLORS.warning
                                        : "none",
                            }}
                            onClick={() =>
                                goToPage(
                                    profilState.label,
                                    profilState.key,
                                    profilState.icon
                                )
                            }
                        >
                            <ListItemIcon>{profilState.icon}</ListItemIcon>
                            <ListItemText>{profilState.label}</ListItemText>
                        </MenuItem>
                    </AccordionSummary>
                    <AccordionDetails>
                        <MenuList sx={{ borderTop: "0.7px solid lightGray" }}>
                            {boardTab.concat(dashTab).map(
                                (tab) =>
                                    (!tab.secured || currentUser?.uid === id) &&
                                    tab.key != profilState.key && (
                                        <MenuItem
                                            key={tab.key}
                                            sx={{
                                                borderLeft:
                                                    profilState.label ===
                                                    tab.label
                                                        ? "4px solid " +
                                                          COLORS.warning
                                                        : "none",
                                            }}
                                            onClick={() =>
                                                goToPage(
                                                    tab.label,
                                                    tab.key,
                                                    tab.icon
                                                )
                                            }
                                        >
                                            <ListItemIcon>
                                                {tab.icon}
                                            </ListItemIcon>
                                            <ListItemText>
                                                {tab.label}
                                            </ListItemText>
                                        </MenuItem>
                                    )
                            )}
                        </MenuList>
                    </AccordionDetails>
                </Accordion>
            </Box>
        );
    };

    useEffect(() => {
        if (currentUser !== undefined && subpage) {
            if (currentUser?.uid === id || subpage === "myProfile") getUser();
            else setunauthorized(true);
        }
    }, [currentUser]);

    return (
        <ProfileDetailsContext.Provider
            value={{
                profilState,
                setprofilState,
                user,
                setuser,
                goToPage,
                loading,
                setloading,
                currentUser,
                id,
                getAvatar,
                HeaderInformations,
                setHeaderInformations,
                reservations,
            }}
        >
            <Container>
                {unauthorized ? (
                    <Unauthorized />
                ) : (
                    <Grid
                        container
                        spacing={{ xs: 2, md: 4 }}
                        py={{ xs: 2, md: 4 }}
                    >
                        <Grid
                            item
                            xs={12}
                            sm={12}
                            md={3}
                            lg={3}
                            xl={3}
                            display={{
                                xs: "none",
                                sm: "none",
                                md: "block",
                            }}
                        >
                            <Left />
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            sm={12}
                            md={3}
                            lg={3}
                            xl={3}
                            display={{
                                xs: currentUser?.uid === id ? "block" : "none",
                                sm: "block",
                                md: "none",
                            }}
                        >
                            <MobileLeft />
                        </Grid>
                        <Grid item xs={12} sm={12} md={9} lg={9} xl={9}>
                            <Right />
                        </Grid>
                    </Grid>
                )}
            </Container>
        </ProfileDetailsContext.Provider>
    );
};

export default ProfileDetails;
