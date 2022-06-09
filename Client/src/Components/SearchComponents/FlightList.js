import React, { useContext, useState } from "react";

import {
  Button,
  ButtonBase,
  CircularProgress,
  Divider,
  Grid,
  Grow,
  MenuItem,
  Pagination,
  Paper,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/material";
import { Box } from "@mui/system";
import Flight from "../Flight";
import FlightSkeleton from "../FlightSkeleton";
import {
  FaAngleLeft,
  FaAngleRight,
  FaPlus,
  FaRegCalendarTimes,
} from "react-icons/fa";
import { MdAirplanemodeInactive } from "react-icons/md";
import moment from "moment";

import FilterBar from "../SearchComponents/FilterBar";
import PubBar from "./PubBar";
import { SearchPageContext } from "../Pages/Search";
import Carousel from "react-elastic-carousel";
import COLORS from "../../colors";
import SearchImage from "../../Images/search.svg";
import { useParams } from "react-router-dom";
import TransitList from "./TransitList";
import MobileAdvertisement from "../MobileAdvertisement";

const Paginator = ({ datas }) => {
  const { noMoreFlight, showTenMoreFlights } = useContext(SearchPageContext);

  const {
    departureCity,
    departureCountry,
    destinationCity,
    destinationCountry,
    date,
  } = useParams();

  const [loading, setloading] = useState(false);

  async function handleNextArticles() {
    console.log("loading 10 more articles");
    setloading(true);
    await showTenMoreFlights(departureCity, destinationCity, date);
    setloading(false);
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      textAlign="center"
      alignItems="center"
      flex={1}
      my={2}
    >
      {loading ? (
        <Button disabled endIcon={<CircularProgress size={15} />}>
          Chargement en cours ...
        </Button>
      ) : (
        <>
          {noMoreFlight ? (
            <Stack>
              <MobileAdvertisement />
              <Typography variant="body2" color="grayText">
                Fin des résultats
              </Typography>
            </Stack>
          ) : (
            <Button
              variant="outlined"
              endIcon={<FaPlus size={13} />}
              onClick={handleNextArticles}
            >
              10 Annonces suivantes
            </Button>
          )}
        </>
      )}
    </Box>
  );
};
const FlightList = () => {
  const { onBoarding, loading, filteredFlight, superlatives, initializing } =
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
  const breakPoints = [
    { width: 1, itemsToShow: 2 },
    { width: 550, itemsToShow: 4 },
    { width: 768, itemsToShow: 4 },
    { width: 1200, itemsToShow: 4 },
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
        // <Grid item xs={6} sm={6} md={3} xl={3} lg={3}>
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
                <Typography fontSize={12}>
                  {" "}
                  {loading ? <Skeleton /> : getDate()}
                </Typography>
              </Box>
            </Stack>
          </ButtonBase>
        </Paper>
        // </Grid>
      );
    };

    const BestItemViewer = () => {
      return (
        <Paper
          sx={{
            mt: 2,
            border: 2,
            borderColor: "#E2E2E2",
            background: "#DADAEC",
          }}
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
      <Box mt={{ xs: 0, md: 1 }}>
        {/* <Grid container spacing={2}> */}

        {onBoarding ? (
          <Stack
            direction="column"
            my={2}
            flex={1}
            alignItems="center"
            spacing={2}
          >
            <Typography variant="h5" fontWeight={600} color="primary">
              Que recherchez-vous?
            </Typography>
            <img src={SearchImage} alt={SearchImage} width="40%" />
          </Stack>
        ) : (
          <>
            {superlatives.length > 0 && (
              <Box minHeight={50}>
                <Carousel
                  showArrows={true}
                  pagination={false}
                  disableArrowsOnEnd={true}
                  breakPoints={breakPoints}
                  renderArrow={(props) =>
                    props.type === "NEXT" ? (
                      <Stack height="100%" justifyContent="center">
                        {" "}
                        <FaAngleRight {...props} color={COLORS.primary} />
                      </Stack>
                    ) : (
                      <Stack height="100%" justifyContent="center">
                        <FaAngleLeft {...props} color={COLORS.primary} />
                      </Stack>
                    )
                  }
                >
                  {bests.map((best, index) => (
                    <BestPrice
                      data={best.flight}
                      label={best.label}
                      key={index}
                    />
                  ))}
                </Carousel>
              </Box>
            )}
            {/* </Grid> */}
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
                        {index + 1 == 10 && filteredFlight.length % 10 > 0 && (
                          <Divider sx={{ mb: 3 }}></Divider>
                        )}
                      </Box>
                    ))}
                    <Paginator datas={filteredFlight} />
                  </Box>
                ) : (
                  <Paper variant="outlined" sx={{ my: 2 }}>
                    <Stack
                      direction="row"
                      p={3}
                      justifyContent="center"
                      spacing={2}
                      sx={{ background: "white" }}
                    >
                      <Typography variant="body1" color="GrayText">
                        Fin des résultats...
                      </Typography>
                      <FaRegCalendarTimes color="gray" size={20} />
                    </Stack>
                  </Paper>
                )}
              </Box>
            )}
          </>
        )}
      </Box>
    );
  };

  return (
    <Grid container spacing={2} p={{ xs: 0, sm: 0, md: 1 }}>
      <Grid
        item
        md={2}
        lg={2}
        sx={{
          display: {
            sm: "none",
            xs: "none",
            lg: "block",
            xl: "block",
          },
        }}
      >
        <FilterBar />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={7}>
        <Middle />
        {/* {nearFlights.length > 0 && <TransitList />} */}
        <TransitList />
      </Grid>
      <Grid
        item
        md={3}
        lg={3}
        sx={{
          display: {
            sm: "none",
            xs: "none",
            lg: "block",
            xl: "block",
          },
        }}
      >
        <PubBar />
      </Grid>
    </Grid>
  );
};

export default FlightList;
