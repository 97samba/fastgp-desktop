import { Divider, Paper, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext } from "react";
import { IoPlanetOutline } from "react-icons/io5";
import Flight from "../Flight";
import FlightSkeleton from "../FlightSkeleton";
import { SearchPageContext } from "../Pages/Search";
import TransitFlight from "../TransitFlight";

const Header = () => {
    return (
        <Stack direction="row" alignItems="end" spacing={1} my={1}>
            <Stack direction="row" spacing={2} alignItems="center">
                <IoPlanetOutline color="grayText" size={22} />
                <Typography
                    fontWeight="bold"
                    variant="h6"
                    color="primary"
                    flexGrow={1}
                >
                    Transit
                </Typography>
                <Typography variant="body1" color="GrayText" flexGrow={1}>
                    Essayez les envois multiples
                </Typography>
            </Stack>
        </Stack>
    );
};

const TransitList = () => {
    const { onBoarding, loading, filteredFlight, nearFlights, initializing } =
        useContext(SearchPageContext);
    return (
        <Box flex={1}>
            <Divider />
            <Header />
            <Box>
                {loading || initializing ? (
                    <Box pt={2}>
                        {[1, 2, 3, 4, 5].map((data, index) => (
                            <FlightSkeleton index={index} />
                        ))}
                    </Box>
                ) : (
                    <Box pt={2}>
                        {nearFlights.map((data, index) => (
                            <TransitFlight
                                departure={data.first}
                                destination={data.second}
                                key={index}
                            />
                        ))}
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default TransitList;
