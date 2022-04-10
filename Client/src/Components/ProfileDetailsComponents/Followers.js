import {
    Typography,
    Stack,
    Avatar,
    Skeleton,
    Paper,
    Button,
    Link,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import { RiMedal2Line } from "react-icons/ri";
import { ProfileDetailsContext } from "../Pages/ProfileDetails";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import COLORS from "../../colors";
import { getFollowers } from "../../firebase/db";
import { BsPatchCheckFill } from "react-icons/bs";

const FollowersTab = ({ followed, followers }) => {
    const [value, setvalue] = useState(1);
    const [loading, setloading] = useState(true);
    function handleChange(e, newValue) {
        setvalue(newValue);
    }
    const AFollower = ({ person }) => {
        return (
            <Stack direction="row" spacing={2} alignItems="center" py={2}>
                <Avatar src={person.photoUrl} />
                <Stack flexGrow={1}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <Link
                            underline="hover"
                            href={`/profilDetails/${person.userId}/myProfile`}
                        >
                            <Typography
                                variant="body1"
                                color={COLORS.black}
                                fontWeight={555}
                            >
                                {person.firstName + " " + person.lastName}
                            </Typography>
                        </Link>
                        {person.documentVerified && (
                            <BsPatchCheckFill color={COLORS.primary} />
                        )}
                    </Stack>
                    <Stack
                        direction={{ xs: "column", md: "row" }}
                        // alignItems="center"
                        spacing={{ xs: 0, md: 1 }}
                    >
                        <Typography variant="body2" color={COLORS.black}>
                            {person.country + ", "}
                        </Typography>
                        <Typography variant="body2" color={COLORS.black}>
                            {person.flights.length + " annonce(s)"}
                        </Typography>
                    </Stack>
                </Stack>
                <Button size="small">Se désabonner</Button>
            </Stack>
        );
    };
    const TabFollow = ({ value }) => {
        return (
            <>
                {value === 1 && (
                    <Box role="tabpanel" p={2}>
                        {followers.map((value, index) => (
                            <AFollower person={value} key={index} />
                        ))}
                    </Box>
                )}
            </>
        );
    };
    const TabFollowed = ({ value }) => {
        return (
            <>
                {value === 2 && (
                    <Box role="tabpanel">
                        <Typography>qui me suivent</Typography>
                    </Box>
                )}
            </>
        );
    };
    return (
        <Box sx={{ width: "100%", typography: "body1" }} my={2}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <TabList
                        onChange={handleChange}
                        aria-label="lab API tabs example"
                    >
                        <Tab label="Mes GP (transporteurs)" value={1} />
                        <Tab label="Mes abonnés" value={2} />
                    </TabList>
                </Box>
                <TabFollow value={value} />
                <TabFollowed value={value} />
            </TabContext>
        </Box>
    );
};

const Followers = () => {
    const { profilState, user, loading } = useContext(ProfileDetailsContext);
    //les personnes qui me suivent
    const [followers, setfollowers] = useState([]);

    //les personnes que je suis
    const [followed, setfollowed] = useState([]);

    const Title = () => {
        return (
            <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                {profilState.icon}
                <Typography
                    fontWeight="bold"
                    variant="h5"
                    color="primary"
                    flexGrow={1}
                >
                    {profilState.label}
                </Typography>
            </Stack>
        );
    };

    const Header = () => {
        return (
            <Box flex={1}>
                <Paper
                    elevation={0}
                    sx={{
                        boxShadow: "0px 1px 3px rgba(3, 0, 71, 0.2)",
                        height: "100%",
                    }}
                >
                    <Stack p={3} direction="row" spacing={2} flex={1}>
                        <Avatar sx={{ width: 50, height: 50 }}>S</Avatar>
                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            flex={1}
                        >
                            <Box>
                                <Typography
                                    variant="h6"
                                    color="#2B3445"
                                    fontWeight={500}
                                >
                                    {loading ? (
                                        <Skeleton />
                                    ) : (
                                        user.firstName + " " + user.lastName
                                    )}
                                </Typography>
                                <Typography variant="body2" color="primary">
                                    {loading ? <Skeleton /> : user.country}
                                </Typography>
                            </Box>
                            <Box display="flex" alignItems="center">
                                <Typography
                                    color="GrayText"
                                    letterSpacing={1}
                                    fontWeight={300}
                                >
                                    GP DEBUTANT
                                </Typography>
                                <RiMedal2Line size={18} color="goldenrod" />
                            </Box>
                        </Stack>
                    </Stack>
                </Paper>
            </Box>
        );
    };

    async function fetchDatas() {
        const results = await getFollowers(user?.followers);
        console.log("results :>> ", results);
        setfollowers(results);
    }
    useEffect(() => {
        fetchDatas();
    }, []);

    return (
        <Box>
            <Title />
            <Header />
            <FollowersTab followers={followers} followed={followed} />
        </Box>
    );
};

export default Followers;
