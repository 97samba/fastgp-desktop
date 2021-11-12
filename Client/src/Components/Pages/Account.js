import {
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import moment from "moment";
import React from "react";
import { FaSyncAlt } from "react-icons/fa";

const DashboardCard = ({ label, number, rate }) => {
  return (
    <Grid item md={3} xl={3} lg={3}>
      <Card>
        <CardContent>
          <Stack direction="row" justifyContent="space-between">
            <Typography>{label}</Typography>
            <Chip label="Mensuel" size="small" />
          </Stack>
          <Typography variant="h5" my={1}>
            {number}
          </Typography>
          <Stack direction="row" justifyContent="space-between">
            <Typography
              variant="caption"
              sx={{ background: "lightGreen", borderRadius: 0.5, p: 0.2 }}
            >
              {rate}
            </Typography>
            <Typography variant="caption">Depuis le mois dernier</Typography>
          </Stack>
        </CardContent>
      </Card>
    </Grid>
  );
};
const Account = () => {
  return (
    <Stack direction="row">
      <Box sx={{ background: "lightGray" }} p={2} flex={1}></Box>
      <Box p={2} flex={5}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h5" fontWeight={500}>
            Tableau de bord
          </Typography>
          <Stack direction="row" spacing={1}>
            <IconButton>
              <FaSyncAlt color="gray" size={15} />
            </IconButton>
            <Button size="small">Today {moment().format("d MMMM ")}</Button>
          </Stack>
        </Stack>
        <Typography variant="caption">Bonjour Samba, ravis de vous revoir!</Typography>
        <Box p={2}>
          <Divider orientation="horizontal" />
          <Grid container p={2} spacing={4}>
            <DashboardCard label="Revenues" number="1245 $" rate="+14%" />
            <DashboardCard label="Followers" number="45" rate="+5%" />
            <DashboardCard label="Vols publiés" number="12" rate="+14%" />
            <DashboardCard label="Colis" number="256" rate="+14%" />
          </Grid>
        </Box>
      </Box>
    </Stack>
  );
};

export default Account;
