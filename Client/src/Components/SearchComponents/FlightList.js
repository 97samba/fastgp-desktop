import React, { useContext, useState } from "react";

import {
  Button,
  ButtonBase,
  Grid,
  Grow,
  Pagination,
  Paper,
  Skeleton,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/material";
import { Box } from "@mui/system";
import Flight from "../Flight";
import FlightSkeleton from "../FlightSkeleton";
import { FaArrowDown, FaRegCalendarTimes } from "react-icons/fa";
import { MdAirplanemodeInactive } from "react-icons/md";
import moment from "moment";

import FilterBar from "../SearchComponents/FilterBar";
import PubBar from "./PubBar";
import { SearchPageContext } from "../Pages/Search";

const Paginator = ({ datas }) => {
  const getCount = () => {
    return Math.ceil(datas.length / 5);
  };
  return (
    <Box display="flex" justifyContent="center" textAlign="center" flex={1} my={2}>
      <Pagination count={getCount()} shape="rounded" hideNextButton={getCount() < 2} />
    </Box>
  );
};
const FlightList = () => {
  const { flights, loading, filteredFlight, nearFlights, superlatives, initializing } =
    useContext(SearchPageContext);
  const [bestItemViewerOpened, setbestItemViewerOpened] = useState(false);
  const [bestItemViewed, setbestItemViewed] = useState(null);
  const [bestItemLabel, setbestItemLabel] = useState("");

  const bests = [
    {
      label: "Le moins cher",
      flight: superlatives.cheapest,
    },
    {
      label: "Le meilleur",
      flight: superlatives.best,
    },
    {
      label: "Le plus rapide",
      flight: superlatives.fastest,
    },
    {
      label: "Le mieux noté",
      flight: superlatives.nearest,
    },
  ];

  const Middle = () => {
    const BestPrice = ({ data, label }) => {
      const handleClick = (item) => {
        if (bestItemViewerOpened) {
          if (bestItemLabel === label) {
            setbestItemViewerOpened(false);
            setbestItemLabel("");

            return;
          }
          setbestItemViewed(item);
          setbestItemLabel(label);
        } else {
          setbestItemViewerOpened(true);
          setbestItemLabel(label);
          setbestItemViewed(item);
        }
      };
      const getDate = () => {
        if (data && data.departureDate) {
          if (moment().isSame(data.departureDate, "day")) {
            return "Aujourd'hui";
          }
          if (moment().add(1, "day").isSame(data.departureDate, "day")) {
            return "Demain";
          }
          return moment(data.departureDate).format("D MMM");
        }
        return "";
      };
      const getPrice = () => {
        if (data && data.prices) {
          return data.prices.pricePerKG;
        }
        return <MdAirplanemodeInactive color="gray" size={15} />;
      };
      return (
        <Grid item xs={6} sm={6} md={3} xl={3} lg={3}>
          <Paper
            elevation={0}
            sx={{
              border: 1,
              borderColor: bestItemLabel === label ? "#494aa2" : "#E3E3E3",
              background: bestItemLabel === label ? "#E1E1EF" : "white",
            }}
          >
            <ButtonBase sx={{ width: "100%" }} onClick={() => handleClick(data)}>
              <Stack direction="row" spacing={1} p={1}>
                <Stack direction="row" spacing={0.5}>
                  <Typography fontSize={10}> $</Typography>

                  <Typography color="#494aa2" variant="h6" fontWeight="bold">
                    {loading ? null : getPrice()}
                  </Typography>
                </Stack>
                <Box>
                  <Typography color="#494aa2" fontSize={11} fontWeight="bold">
                    {label}
                  </Typography>
                  <Typography fontSize={12}> {loading ? <Skeleton /> : getDate()}</Typography>
                </Box>
              </Stack>
            </ButtonBase>
          </Paper>
        </Grid>
      );
    };

    const BestItemViewer = () => {
      return (
        <Paper
          sx={{ mt: 2, border: 2, borderColor: "#E2E2E2", background: "#DADAEC" }}
          variant="outlined"
        >
          <Grow in={bestItemViewerOpened}>
            <Box px={2} pt={2} pb={1}>
              {bestItemViewed ? <Flight data={bestItemViewed} /> : null}
              <Stack direction="row" justifyContent="space-between">
                <Typography color="#494aa2" variant="body2" fontWeight="bold">
                  {bestItemLabel}
                </Typography>
                <Button
                  size="small"
                  onClick={() => {
                    setbestItemViewerOpened(false);
                    setbestItemLabel("");
                    setbestItemViewed(null);
                  }}
                >
                  Masquer
                </Button>
              </Stack>
            </Box>
          </Grow>
        </Paper>
      );
    };

    return (
      <Box>
        <Grid container spacing={2}>
          {bests.map((best, index) => (
            <BestPrice data={best.flight} label={best.label} key={index} />
          ))}
        </Grid>
        {bestItemViewerOpened && !loading ? <BestItemViewer /> : null}
        {loading || initializing ? (
          <Box pt={2}>
            {[1, 2, 3, 4, 5].map((data, index) => (
              <FlightSkeleton index={index} />
            ))}
          </Box>
        ) : (
          <Box>
            {filteredFlight.length > 0 ? (
              <Box pt={2}>
                {filteredFlight.map((data, index) => (
                  <Box>
                    <Flight data={data} key={index} />
                  </Box>
                ))}
                <Paginator datas={filteredFlight} />
              </Box>
            ) : (
              <Paper variant="outlined" sx={{ my: 2 }}>
                <Stack
                  direction="row"
                  p={5}
                  justifyContent="center"
                  spacing={2}
                  sx={{ background: "white" }}
                >
                  <Typography variant="body1" color="GrayText">
                    Pas de résultats...
                  </Typography>
                  <FaRegCalendarTimes color="gray" size={20} />
                </Stack>
              </Paper>
            )}
          </Box>
        )}
        <Stack
          my={3}
          border={0.5}
          borderColor="lightgray"
          py={0.5}
          justifyContent="center"
          alignItems="center"
          spacing={1}
          borderRadius={1}
          direction="row"
        >
          <Typography fontSize={14} color="GrayText">
            Plus de résultats proches
          </Typography>
          <FaArrowDown size={12} color="gray" />
        </Stack>
        {nearFlights.map((data, index) => (
          <Flight data={data} key={index} />
        ))}
      </Box>
    );
  };

  return (
    <Grid container spacing={2} p={1}>
      <Grid
        item
        md={2}
        lg={2}
        sx={{ display: { sm: "none", xs: "none", lg: "block", xl: "block" } }}
      >
        <FilterBar />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={7}>
        <Middle />
      </Grid>
      <Grid
        item
        md={3}
        lg={3}
        sx={{ display: { sm: "none", xs: "none", lg: "block", xl: "block" } }}
      >
        <PubBar />
      </Grid>
    </Grid>
  );
};

export default FlightList;
