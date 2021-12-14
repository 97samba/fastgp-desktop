import { Grid, Paper, Skeleton, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const FlightSkeleton = () => {
  const Left = () => {
    return (
      <Stack direction="column" spacing={1}>
        <Typography variant="h4">
          <Skeleton />
        </Typography>

        <Typography variant="caption">
          <Skeleton />
        </Typography>
      </Stack>
    );
  };

  const Right = () => {
    return (
      <Stack direction="column" spacing={1} alignItems="flex-end" width="100%">
        <Typography variant="h4" width="100%">
          <Skeleton />
        </Typography>

        <Typography variant="caption" width="100%">
          <Skeleton />
        </Typography>
      </Stack>
    );
  };
  const Coupon = () => {
    return (
      <Box>
        <Box
          bgcolor="#f6f6f9"
          px={1}
          py={0.6}
          mt={-0.1}
          position="absolute"
          ml={-1}
          sx={{
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            borderLeft: 1,
            borderRight: 1,
            borderColor: "#E2E2E2",
          }}
        ></Box>

        <Stack direction="column" borderLeft={0.1} borderColor="#E2E2E2" p={2}>
          <Stack direction="row" spacing={1}>
            {[1, 2, 3, 4].map((index) => (
              <Skeleton flex={1} width="100%" key={index} sx={{ p: 1 }} />
            ))}
          </Stack>
          <Skeleton flex={1} sx={{ py: 2, width: "40%" }} />
          <Skeleton flex={1} sx={{ py: 2, width: "100%" }} />
        </Stack>
        <Box
          bgcolor="#f6f6f9"
          px={1}
          py={0.6}
          position="absolute"
          ml={-1}
          mt={-1}
          sx={{
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            borderLeft: 1,
            borderRight: 1,
            borderColor: "#E2E2E2",
          }}
        ></Box>
      </Box>
    );
  };
  const Ticket = () => {
    return (
      <Box>
        <Stack
          p={0.5}
          px={1}
          direction="row"
          alignItems="center"
          height="10%"
          borderBottom={0.2}
          borderColor="#e2e2e2"
        >
          <Stack direction="row" alignItems="center" flex={1} spacing={1}>
            <Skeleton animation="wave" variant="circular" width={25} height={25} />
            <Box width={100}>
              <Skeleton animation="wave" variant="text" />
            </Box>
          </Stack>
          <Stack direction="row-reverse" spacing={0.5} flex={1}>
            <Skeleton animation="wave" variant="text" width={50} />
          </Stack>
        </Stack>

        <Grid p={2} container flex={1} alignItems="center" height="90%">
          <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
            <Left />
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={3} xl={3} display="flex" justifyContent="center">
            <Skeleton variant="rectangular" width={100} />
          </Grid>
          <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
            <Right />
          </Grid>
        </Grid>
      </Box>
    );
  };

  return (
    <Paper
      sx={{
        // boxShadow: "1px 1px 3px 1px #e2e2e2",
        border: 1,
        borderColor: "#E2E2E2",
        marginBottom: 3,
      }}
      elevation={0}
    >
      <Grid container>
        <Grid item xs={12} sm={12} lg={9} xl={9} md={9} flex={1} alignItems="center">
          <Ticket />
        </Grid>
        <Grid item lg={3} xl={3} md={3} display={{ xs: "none", sm: "none", md: "block" }}>
          <Coupon />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default FlightSkeleton;
