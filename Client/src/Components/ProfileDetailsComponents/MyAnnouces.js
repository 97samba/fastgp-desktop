import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    Grid,
    Paper,
    Skeleton,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import { FaEdit, FaUserAlt } from "react-icons/fa";
import { IoMdSave } from "react-icons/io";
import { MdCancel, MdExpandMore } from "react-icons/md";

import COLORS from "../../colors";
import { ProfileDetailsContext } from "../Pages/ProfileDetails";
import { deleteOneFlight, getUserFlights } from "../../firebase/db";
import { useHistory, useParams } from "react-router-dom";
import moment from "moment";
import Flight from "../Flight";
import { useAuth } from "../../firebase/auth";

const Header = () => {
    return (
        <Box>
            <Grid
                container
                p={1}
                spacing={1}
                display="flex"
                color={COLORS.black}
            >
                <Grid item xs={5} sm={5} md={5} lg={5} xl={5}>
                    <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="GrayText"
                        noWrap
                    >
                        Villes
                    </Typography>
                </Grid>
                <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                    <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="GrayText"
                        noWrap
                    >
                        Arrivée
                    </Typography>
                </Grid>
                <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                    <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="GrayText"
                        noWrap
                    >
                        Poids
                    </Typography>
                </Grid>
                <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                    <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="GrayText"
                        noWrap
                    >
                        Prix
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
};

const Publication = ({ data, editPublication, ShowDeleteDialog }) => {
    const calculateWeight = () => {
        let weight = 0;
        data.suitcases.map((suitecase) => (weight += suitecase.weight));
        return weight;
    };
    return (
        <Paper
            sx={{ flex: 1, boxShadow: "0px 1px 3px rgba(3, 0, 71, 0.2)" }}
            elevation={0}
        >
            <Accordion elevation={0}>
                <AccordionSummary
                    expandIcon={<MdExpandMore />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Grid
                        container
                        spacing={1}
                        display="flex"
                        color={COLORS.black}
                    >
                        <Grid item xs={5} sm={5} md={5} lg={5} xl={5}>
                            <Typography
                                variant="body2"
                                fontWeight="bold"
                                color="GrayText"
                            >
                                {data?.departure?.name +
                                    " - " +
                                    data?.destination.name}
                            </Typography>
                        </Grid>
                        <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                            <Typography variant="body2">
                                {moment(data.distributionDate).format(
                                    "D/MMM/YY"
                                )}
                            </Typography>
                        </Grid>
                        <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                            <Typography variant="body2" textAlign="right">
                                {calculateWeight() + " kg"}
                            </Typography>
                        </Grid>
                        <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                            <Typography
                                variant="body2"
                                fontWeight={555}
                                color={COLORS.warning}
                                textAlign="right"
                                mr={0.3}
                            >
                                {data.prices.pricePerKG}{" "}
                                {data?.currency ? data.currency : "€"}
                            </Typography>
                        </Grid>
                    </Grid>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography
                        color="grayText"
                        fontWeight="bold"
                        gutterBottom
                        variant="body1"
                    >
                        Visuel :
                    </Typography>
                    <Flight data={data} />
                    <Stack direction="row" justifyContent="center" spacing={2}>
                        <Button
                            variant="outlined"
                            size="medium"
                            color="error"
                            disabled={moment(data.distributionDate)
                                .subtract(2, "days")
                                .isSameOrBefore(moment())}
                            endIcon={<MdCancel />}
                            onClick={() => ShowDeleteDialog(data.id)}
                        >
                            Annuler vol
                        </Button>
                        <Button
                            variant="outlined"
                            size="medium"
                            color="primary"
                            disabled={moment(
                                data.distributionDate
                            ).isSameOrBefore(moment())}
                            endIcon={<FaEdit />}
                            onClick={() => editPublication(data)}
                        >
                            Modifier
                        </Button>
                    </Stack>
                </AccordionDetails>
            </Accordion>
        </Paper>
    );
};
const PublicationSkeleton = () => {
    return (
        <Paper
            sx={{ flex: 1, boxShadow: "0px 1px 3px rgba(3, 0, 71, 0.2)" }}
            elevation={0}
        >
            <Grid
                container
                spacing={1}
                display="flex"
                color={COLORS.black}
                p={1}
            >
                <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                    <Typography></Typography>
                    <Skeleton height={18} width="50%" />
                </Grid>
                <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                    <Skeleton height={15} width="50%" />
                </Grid>
                <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                    <Skeleton height={15} width="50%" />
                </Grid>
                <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                    <Skeleton height={15} width="50%" />
                </Grid>
            </Grid>
        </Paper>
    );
};
const DeleteFlightDialog = ({
    deleteDialog,
    setdeleteDialog,
    deleteFlight,
}) => {
    return (
        <Dialog open={deleteDialog} onClose={() => setdeleteDialog(false)}>
            <DialogTitle>Confirmer la suppression de l'annonce</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    La suppression de l'annonce entraine la clôture de toutes
                    les reservations liées.
                </DialogContentText>
                <Stack
                    direction="row"
                    spacing={3}
                    justifyContent="center"
                    py={2}
                >
                    <Button
                        variant="outlined"
                        color="warning"
                        onClick={() => setdeleteDialog(false)}
                    >
                        Non
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={deleteFlight}
                    >
                        Oui
                    </Button>
                </Stack>
            </DialogContent>
        </Dialog>
    );
};

const MyAnnouces = () => {
    const history = useHistory();
    const currentUser = useAuth();
    const { profilState } = useContext(ProfileDetailsContext);
    const { id, subpage, subID } = useParams();

    const [publications, setpublications] = useState([]);
    const [deleteDialog, setdeleteDialog] = useState(false);
    const [itemToBeDeleted, setItemToBeDeleted] = useState("");

    const [editing, setediting] = useState(false);

    const [loading, setloading] = useState(true);

    async function getPublications() {
        const results = await getUserFlights(id);
        setpublications(results);
        setloading(false);
    }

    function editPublication(publication) {
        console.log("VIsiting announce ", id);
        history.push("/create?mode=edit&id=" + publication?.id, {
            edit: true,
            publication,
        });
    }
    function ShowDeleteDialog(id) {
        setItemToBeDeleted(id);
        setdeleteDialog(true);
    }
    async function deleteAFlight() {
        console.log("deleting a flight", itemToBeDeleted);
        const res = await deleteOneFlight(itemToBeDeleted, currentUser?.email);
        setdeleteDialog(false);
        setItemToBeDeleted("");
    }

    function handleSave(data) {}

    function handleReturn(data) {
        setediting(false);
        history.goBack();
    }

    useEffect(() => {
        getPublications();
        return null;
    }, []);

    return (
        <Box>
            <Box py={1}>
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
                    <Button
                        varaint="contained"
                        color="warning"
                        onClick={() => history.push("/create")}
                    >
                        Ajouter
                    </Button>
                </Stack>
                {loading ? (
                    <Stack spacing={2}>
                        <Header />

                        {["1", "2", "3", "4"].map((item) => (
                            <PublicationSkeleton key={item} />
                        ))}
                    </Stack>
                ) : (
                    <>
                        {publications.length > 0 ? (
                            <Stack spacing={2} my={3}>
                                <Header />
                                {publications.map((publication, index) => (
                                    <Publication
                                        data={publication}
                                        key={index}
                                        editPublication={editPublication}
                                        ShowDeleteDialog={ShowDeleteDialog}
                                    />
                                ))}
                            </Stack>
                        ) : (
                            <Paper
                                sx={{
                                    flex: 1,
                                    boxShadow:
                                        "0px 1px 3px rgba(3, 0, 71, 0.2)",
                                    p: 2,
                                    my: 4,
                                    textAlign: "center",
                                }}
                                elevation={0}
                            >
                                <Typography color="GrayText">
                                    Vous n'avez pas d'annonces.
                                </Typography>
                            </Paper>
                        )}
                    </>
                )}
            </Box>
            <DeleteFlightDialog
                deleteDialog={deleteDialog}
                setdeleteDialog={setdeleteDialog}
                deleteFlight={deleteAFlight}
            />
        </Box>
    );
};

export default MyAnnouces;
