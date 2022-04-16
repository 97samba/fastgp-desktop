import {
    Typography,
    Stack,
    Avatar,
    Skeleton,
    Paper,
    Button,
    Link,
    Divider,
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
import { getFollowedPeople, getFollowers } from "../../firebase/db";
import { BsPatchCheckFill } from "react-icons/bs";
import { IoAdd } from "react-icons/io5";

const FollowersTab = ({ followed, followers, loading, userId }) => {
    const [value, setvalue] = useState(1);
    function handleChange(e, newValue) {
        setvalue(newValue);
    }
    const AFollower = ({ person }) => {
        return (
            <>
                <Stack direction="row" spacing={2} alignItems="center" py={2}>
                    <Link
                        href={"/profilDetails/" + person.userId + "/myProfile"}
                    >
                        <Avatar
                            src={person.photoUrl}
                            alt={"fast-gp-" + person.firstname}
                        />
                    </Link>
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
                    {person.followers.includes(userId) ? (
                        <Button size="small" variant="outlined">
                            Se désabonner
                        </Button>
                    ) : (
                        <Button
                            size="small"
                            variant="contained"
                            endIcon={<IoAdd />}
                        >
                            S'abonner
                        </Button>
                    )}
                </Stack>
                <Divider />
            </>
        );
    };
    const AFollowerSkeleton = () => {
        return (
            <>
                <Stack direction="row" spacing={2} alignItems="center" py={2}>
                    <Skeleton
                        variant="circular"
                        width={50}
                        height={50}
                    ></Skeleton>
                    <Stack flexGrow={1}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <Skeleton variant="text" width={100} />
                        </Stack>
                        <Stack
                            direction={{ xs: "column", md: "row" }}
                            // alignItems="center"
                            spacing={{ xs: 0, md: 1 }}
                        >
                            <Skeleton variant="text" width={50} />
                        </Stack>
                    </Stack>
                    <Skeleton variant="text" width={80} height={40} />
                </Stack>
                <Divider />
            </>
        );
    };
    const TabFollow = ({ value }) => {
        return (
            <Box display={value === 2 ? true : "none"}>
                {loading ? (
                    [1, 2, 3].map((index) => <AFollowerSkeleton key={index} />)
                ) : (
                    <Box>
                        {followers.length > 0 ? (
                            <Box role="tabpanel" p={2}>
                                {followers.map((value, index) => (
                                    <AFollower person={value} key={index} />
                                ))}
                            </Box>
                        ) : (
                            <Box>
                                <Typography>
                                    Vous n'avez pas d'abonné
                                </Typography>
                            </Box>
                        )}
                    </Box>
                )}
            </Box>
        );
    };
    const TabFollowed = ({ value }) => {
        return (
            <Box display={value === 1 ? true : "none"}>
                {loading ? (
                    [1, 2, 3].map((index) => <AFollowerSkeleton key={index} />)
                ) : (
                    <Box>
                        {followed.length > 0 ? (
                            <Box role="tabpanel" p={2}>
                                {followed.map((value, index) => (
                                    <AFollower person={value} key={index} />
                                ))}
                            </Box>
                        ) : (
                            <Box py={4} px={2} textAlign="center">
                                <Typography>
                                    Vous ne suivez aucun GP.
                                </Typography>
                            </Box>
                        )}
                    </Box>
                )}
            </Box>
        );
    };
    return (
        <Box sx={{ width: "100%", typography: "body1" }} my={2}>
            <TabContext value={value}>
                <Stack
                    sx={{
                        borderBottom: 1,
                        borderColor: "divider",
                    }}
                    alignItems="center"
                >
                    <TabList
                        onChange={handleChange}
                        aria-label="lab API tabs example"
                    >
                        <Tab label="Mes transporteurs" value={1} />
                        <Tab label="Mes abonnés" value={2} />
                    </TabList>
                </Stack>
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
                        <Avatar alt={user?.photoUrl} src={user?.photoUrl} />
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
        const followedResult = await getFollowedPeople(user?.userId);
        setfollowers(results);
        setfollowed(followedResult);
    }
    useEffect(() => {
        if (user?.userId) fetchDatas();
    }, [user]);

    return (
        <Box>
            <Title />
            <Header />
            <FollowersTab
                followers={followers}
                followed={followed}
                loading={loading}
                userId={user?.userId}
            />
        </Box>
    );
};

export default Followers;
