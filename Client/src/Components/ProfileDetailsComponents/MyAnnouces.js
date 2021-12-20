import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
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
import { getUserFlights } from "../../firebase/db";
import { useHistory, useParams } from "react-router-dom";
import moment from "moment";
import Flight from "../Flight";

const EditPublication = ({ handleSave, handleReturn }) => {
  const [state, setstate] = useState({ firstName: "", address: "", lastName: "", phone: "" });

  return (
    <Box>
      <Stack direction="row" spacing={2} alignItems="center" mb={2}>
        <FaUserAlt color={COLORS.warning} />
        <Typography fontWeight="bold" variant="h5" color="primary" flexGrow={1}>
          Ajouter une réservation
        </Typography>
        <Button varaint="contained" color="warning" onClick={handleReturn}>
          Retour
        </Button>
      </Stack>
      <Paper elevation={0} sx={{ boxShadow: "0px 1px 3px rgba(3, 0, 71, 0.2)" }}>
        <Box p={2} my={1}>
          <Grid container spacing={3} pb={1}>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <TextField
                fullWidth
                label="Prénom"
                size="small"
                onChange={(e) => setstate({ ...state, firstName: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <TextField
                fullWidth
                label="Nom"
                size="small"
                onChange={(e) => setstate({ ...state, lastName: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <TextField
                fullWidth
                label="Adresse"
                size="small"
                onChange={(e) => setstate({ ...state, address: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <TextField
                fullWidth
                label="Téléphone"
                type="tel"
                size="small"
                onChange={(e) => setstate({ ...state, phone: e.target.value })}
              />
            </Grid>
          </Grid>
          <Button endIcon={<IoMdSave />} variant="contained" onClick={handleSave}>
            Enregister
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

const Header = () => {
  return (
    <Box>
      <Grid container p={1} spacing={1} display="flex" color={COLORS.black}>
        <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
          <Typography variant="body1" fontWeight="bold" color="GrayText" noWrap>
            Villes
          </Typography>
        </Grid>
        <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
          <Typography variant="body1" fontWeight="bold" color="GrayText" noWrap>
            Arrivée
          </Typography>
        </Grid>
        <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
          <Typography variant="body1" fontWeight="bold" color="GrayText" noWrap>
            Poids
          </Typography>
        </Grid>
        <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
          <Typography variant="body1" fontWeight="bold" color="GrayText" noWrap>
            Prix
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

const Publication = ({ data, editPublication }) => {
  const calculateWeight = () => {
    let weight = 0;
    data.suitcases.map((suitecase) => (weight += suitecase.weight));
    return weight;
  };
  return (
    <Paper sx={{ flex: 1, boxShadow: "0px 1px 3px rgba(3, 0, 71, 0.2)" }} elevation={0}>
      <Accordion elevation={0}>
        <AccordionSummary
          expandIcon={<MdExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Grid container spacing={1} display="flex" color={COLORS.black}>
            <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
              <Typography variant="body2" fontWeight="bold" color="GrayText">
                {data?.departure?.name + " - " + data?.destination.name}
              </Typography>
            </Grid>
            <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
              <Typography variant="body2">
                {moment(data.distributionDate).format("D/MMM/YY")}
              </Typography>
            </Grid>
            <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
              <Typography variant="body2">{calculateWeight() + " kg"}</Typography>
            </Grid>
            <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
              <Typography variant="body2">
                {data.prices.pricePerKG} {data?.currency ? data.currency : "€"}
              </Typography>
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <Typography color="grayText" fontWeight="bold" gutterBottom variant="body1">
            Visuel :
          </Typography>
          <Flight data={data} />
          <Stack direction="row" justifyContent="center" spacing={2}>
            <Button
              variant="outlined"
              size="medium"
              color="error"
              disabled={moment(data.distributionDate).subtract(2, "days").isSameOrBefore(moment())}
              endIcon={<MdCancel />}
            >
              Annuler vol
            </Button>
            <Button
              variant="outlined"
              size="medium"
              color="primary"
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
    <Paper sx={{ flex: 1, boxShadow: "0px 1px 3px rgba(3, 0, 71, 0.2)" }} elevation={0}>
      <Grid container spacing={1} display="flex" color={COLORS.black} p={1}>
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

const MyAnnouces = () => {
  const history = useHistory();
  const { profilState } = useContext(ProfileDetailsContext);
  const { id, subpage, subID } = useParams();

  const [publications, setpublications] = useState([]);

  const [editing, setediting] = useState(false);

  const [loading, setloading] = useState(true);

  async function getPublications() {
    const results = await getUserFlights(id);
    setpublications(results);
    setloading(false);
  }

  function editPublication(data) {
    setediting(true);
    history.push("/profilDetails/" + id + "/" + subpage + "/" + data.id);
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
      {!editing ? (
        <Box py={1}>
          <Stack direction="row" spacing={2} alignItems="center" mb={2}>
            {profilState.icon}
            <Typography fontWeight="bold" variant="h5" color="primary" flexGrow={1}>
              {profilState.label}
            </Typography>
            <Button varaint="contained" color="warning" onClick={() => history.push("/create")}>
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
                    <Publication data={publication} key={index} editPublication={editPublication} />
                  ))}
                </Stack>
              ) : (
                <Paper
                  sx={{
                    flex: 1,
                    boxShadow: "0px 1px 3px rgba(3, 0, 71, 0.2)",
                    p: 2,
                    my: 4,
                    textAlign: "center",
                  }}
                  elevation={0}
                >
                  <Typography color="GrayText">Vous n'avez pas de réservations.</Typography>
                </Paper>
              )}
            </>
          )}
        </Box>
      ) : (
        <EditPublication handleReturn={handleReturn} handleSave={handleSave} />
      )}
    </Box>
  );
};

export default MyAnnouces;
