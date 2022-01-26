import { Button, Stack, Typography, Grid, Paper, Skeleton } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useState } from "react";
import { ProfileDetailsContext } from "../Pages/ProfileDetails";
import COLORS from "../../colors";
import { resendEmailVerification } from "../../firebase/auth";

const Header = () => {
  return (
    <Box>
      <Grid container p={1} spacing={1} display="flex" color={COLORS.black}>
        <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
          <Typography variant="body1" fontWeight="bold" color="GrayText" noWrap>
            Type
          </Typography>
        </Grid>
        <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
          <Typography variant="body1" fontWeight="bold" color="GrayText" noWrap>
            Vérification
          </Typography>
        </Grid>
        <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
          <Typography variant="body1" fontWeight="bold" color="GrayText" noWrap>
            Etat
          </Typography>
        </Grid>
        <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
          <Typography variant="body1" fontWeight="bold" color="GrayText" noWrap>
            Action
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

const Package = ({ type, verification, status, action }) => {
  const Status = ({ text }) => {
    return (
      <Typography
        sx={{ px: 1, py: 0.5, backgroundColor: text ? "green" : "lightgray", borderRadius: 5 }}
        textAlign="center"
        variant="caption"
        noWrap
        color={text ? "white" : "GrayText"}
      >
        {text ? "Vérifié" : "En attente"}
      </Typography>
    );
  };
  return (
    <Paper sx={{ flex: 1, boxShadow: "0px 1px 3px rgba(3, 0, 71, 0.2)" }} elevation={0}>
      <Grid container spacing={1} color={COLORS.black} p={2} alignItems="center">
        <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
          <Typography variant="body1" fontWeight={600} color="primary" noWrap>
            {type}
          </Typography>
        </Grid>
        <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
          <Typography variant="body2" fontWeight={500} noWrap>
            {verification}
          </Typography>
        </Grid>
        <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
          <Status text={status} />
        </Grid>
        <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
          <Typography variant="body2" fontWeight={500} noWrap>
            {action}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

const PackageSkeleton = () => {
  return (
    <Paper sx={{ flex: 1, boxShadow: "0px 1px 3px rgba(3, 0, 71, 0.2)" }} elevation={0}>
      <Grid container spacing={1} display="flex" color={COLORS.black} p={2}>
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

const Documents = () => {
  const { profilState, user, loading } = useContext(ProfileDetailsContext);

  const [clicked, setclicked] = useState({ phone: false, email: false, document: false });

  async function sendEmailVerification() {
    await resendEmailVerification();
    setclicked({ ...clicked, email: true });
  }

  async function phoneVerification() {
    setclicked({ ...clicked, phone: true });
  }

  async function documentVerification() {
    setclicked({ ...clicked, document: true });
  }

  return (
    <Box>
      <Stack direction="row" spacing={2} alignItems="center" mb={2}>
        {profilState.icon}
        <Typography fontWeight="bold" variant="h5" color="primary" flexGrow={1}>
          {profilState.label}
        </Typography>
        <Button varaint="contained" color="warning">
          Modifier
        </Button>
      </Stack>

      {/* body */}
      <Header />
      {loading ? (
        <Stack spacing={2}>
          {["1", "2", "3", "4"].map((item) => (
            <PackageSkeleton key={item} />
          ))}
        </Stack>
      ) : (
        <>
          {user?.role === "GP" ? (
            <Stack spacing={2}>
              <Package
                type="Email"
                verification={user?.email}
                status={user?.emailVerified}
                action={
                  clicked.email ? (
                    <Typography variant="body2" color="GrayText">
                      Veuillez vérifier vos mails
                    </Typography>
                  ) : !user?.emailVerified ? (
                    <Button
                      sx={{ p: 0, m: 0 }}
                      disabled={clicked.email}
                      size="small"
                      onClick={sendEmailVerification}
                    >
                      renvoyer
                    </Button>
                  ) : (
                    <Typography color="green">Vérifié</Typography>
                  )
                }
              />
              <Package
                type="Identité"
                verification={user?.documentIdentity}
                status={user?.documentVerified}
                action={
                  clicked.document ? (
                    <Typography variant="body2" color="GrayText">
                      Nos équipes verifient vos documents.
                    </Typography>
                  ) : !user?.documentVerified ? (
                    <Button sx={{ p: 0, m: 0 }} size="small" onClick={documentVerification}>
                      Relancer
                    </Button>
                  ) : (
                    <Typography color="green">Vérifié</Typography>
                  )
                }
              />
              <Package
                type="Téléphone"
                verification={user?.phone}
                status={user?.phoneNumberVerified}
                action={
                  clicked.phone ? (
                    <Typography variant="body2" color="GrayText">
                      Nos équipes vous contacteront
                    </Typography>
                  ) : !user?.phoneNumberVerified ? (
                    <Button
                      sx={{ p: 0, m: 0 }}
                      disabled={clicked.phone}
                      onClick={phoneVerification}
                      size="small"
                    >
                      Relancer
                    </Button>
                  ) : (
                    <Typography color="green">Vérifié</Typography>
                  )
                }
              />
            </Stack>
          ) : (
            <Stack spacing={2}>
              <Package
                type="Email"
                verification={user?.email}
                status={user?.emailVerified}
                action={
                  clicked.email ? (
                    <Typography variant="body2" color="GrayText">
                      Veuillez vérifier vos mails
                    </Typography>
                  ) : !user?.emailVerified ? (
                    <Button
                      sx={{ p: 0, m: 0 }}
                      disabled={clicked.email}
                      size="small"
                      onClick={sendEmailVerification}
                    >
                      renvoyer
                    </Button>
                  ) : (
                    <Typography color="green">Vérifié</Typography>
                  )
                }
              />
              <Package
                type="Téléphone"
                verification={user?.phone}
                status={user?.phoneNumberVerified}
                action={
                  clicked.phone ? (
                    <Typography variant="body2" color="GrayText">
                      Nos équipes vous contacteront
                    </Typography>
                  ) : !user?.phoneNumberVerified ? (
                    <Button
                      sx={{ p: 0, m: 0 }}
                      disabled={clicked.phone}
                      onClick={phoneVerification}
                      size="small"
                    >
                      Relancer
                    </Button>
                  ) : (
                    <Typography color="green">Vérifié</Typography>
                  )
                }
              />
            </Stack>
          )}
        </>
      )}
    </Box>
  );
};

export default Documents;
