import {
  Button,
  ButtonBase,
  Checkbox,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { createContext, useContext, useState } from "react";
import { FaBusinessTime, FaHeart, FaSearch } from "react-icons/fa";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5";
import COLORS from "../../colors";
import AdImage from "../../Images/online_ad.svg";

const ProductSearchBar = () => {
  return (
    <Paper elevation={1} sx={{ mx: { md: 10, xs: 5, sm: 10, lg: 20 } }}>
      <Grid container mt={-3} p={1} columnSpacing={4}>
        <Grid item xs={12} sm={6} md={5} lg={5} xl={5}>
          <Box>
            <TextField
              placeholder="Produit recherché"
              variant="standard"
              fullWidth
              sx={{ border: 0 }}
              InputProps={{
                endAdornment: <FaSearch color="gray" />,
                disableUnderline: true,
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={5} lg={5} xl={5}>
          <Box>
            <TextField
              variant="standard"
              placeholder="Destination"
              // size="small"
              fullWidth
              InputProps={{
                endAdornment: <IoLocationSharp color="gray" size={17} style={{ marginRight: 2 }} />,
                disableUnderline: true,
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
          <Button variant="contained" color="warning" fullWidth>
            Rechercher
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};
const FilterBar = () => {
  return (
    <Stack direction="column" spacing={2}>
      <Box>
        <Typography fontWeight="bold" color="GrayText">
          Catégories
        </Typography>
        <FormGroup sx={{ pt: 1 }}>
          <FormControlLabel
            sx={{ height: 25 }}
            control={<Checkbox defaultChecked size="small" />}
            label={<Typography fontSize={13}>Mode femme</Typography>}
          />
          <FormControlLabel
            sx={{ height: 25 }}
            control={<Checkbox size="small" />}
            label={
              <Typography fontSize={13} color="GrayText">
                Mode homme
              </Typography>
            }
          />
          <FormControlLabel
            sx={{ height: 25 }}
            control={<Checkbox size="small" />}
            label={
              <Typography fontSize={13} color="GrayText">
                Alimentation
              </Typography>
            }
          />
        </FormGroup>
      </Box>
      <Box>
        <Typography fontWeight="bold" color="GrayText">
          Marques
        </Typography>
        <FormGroup sx={{ pt: 1 }}>
          <FormControlLabel
            sx={{ height: 25 }}
            control={<Checkbox defaultChecked size="small" />}
            label={<Typography fontSize={13}>Shein</Typography>}
          />
          <FormControlLabel
            sx={{ height: 25 }}
            control={<Checkbox size="small" />}
            label={
              <Typography fontSize={13} color="GrayText">
                Zara
              </Typography>
            }
          />
          <FormControlLabel
            sx={{ height: 25 }}
            control={<Checkbox size="small" />}
            label={
              <Typography fontSize={13} color="GrayText">
                Bohoo
              </Typography>
            }
          />
          <FormControlLabel
            sx={{ height: 25 }}
            control={<Checkbox size="small" />}
            label={
              <Typography fontSize={13} color="GrayText">
                Stradivarius
              </Typography>
            }
          />
          <FormControlLabel
            sx={{ height: 25 }}
            control={<Checkbox size="small" />}
            label={
              <Typography fontSize={13} color="GrayText">
                H&M
              </Typography>
            }
          />
        </FormGroup>
      </Box>
      <Box>
        <Typography fontWeight="bold" color="GrayText">
          Délais livraison
        </Typography>
        <FormGroup sx={{ pt: 1 }}>
          <FormControlLabel
            sx={{ height: 25 }}
            control={<Checkbox defaultChecked size="small" />}
            label={<Typography fontSize={13}>moins de 3 jours</Typography>}
          />
          <FormControlLabel
            sx={{ height: 25 }}
            control={<Checkbox size="small" />}
            label={
              <Typography fontSize={13} color="GrayText">
                Moins de 5 jours
              </Typography>
            }
          />
          <FormControlLabel
            sx={{ height: 25 }}
            control={<Checkbox size="small" />}
            label={
              <Typography fontSize={13} color="GrayText">
                Entre 1 et 2 semaines
              </Typography>
            }
          />
        </FormGroup>
      </Box>
    </Stack>
  );
};
const SearchResults = () => {
  const { shopState, showDialog } = useContext(ShopContext);
  const Article = ({ data }) => {
    return (
      <Grid item xs={12} sm={6} md={6} lg={3} xl={3}>
        <ButtonBase disableRipple onClick={showDialog}>
          <Paper elevation={0}>
            <Stack textAlign="left">
              <Box>
                <img src={data.imgUrl} alt={data.imgUrl} width="100%" height={300} />
              </Box>
              <Box py={2}>
                <Typography variant="body2">{data.name}</Typography>
                <Stack direction="row">
                  <Typography color={COLORS.warning} fontWeight="bold">
                    {data.newPrice + " " + data.currency}
                  </Typography>
                  <Typography
                    pl={1}
                    flexGrow={1}
                    varian="caption"
                    sx={{ textDecoration: "line-through", color: "GrayText" }}
                  >
                    {data.normalPrice}
                  </Typography>
                  <IoIosHeartEmpty size={20} />
                </Stack>
              </Box>
            </Stack>
          </Paper>
        </ButtonBase>
      </Grid>
    );
  };
  return (
    <Box flex={1}>
      <Paper elevation={0}>
        <Stack p={2} mb={0.4} direction="row" justifyContent="space-between">
          <Typography>Résults</Typography>
          <TextField
            select
            value="Prix bas à élevé"
            placeholder="Trier Par"
            size="small"
            label="Trier par"
            variant="standard"
            sx={{ minWidth: 100 }}
          >
            {["Date", "Prix bas à élevé"].map((option, index) => (
              <MenuItem value={option}>{option}</MenuItem>
            ))}
          </TextField>
        </Stack>
      </Paper>
      <Paper elevation={0}>
        <Grid container p={2} spacing={2}>
          {shopState.map((article, index) => (
            <Article data={article} key={index} />
          ))}
        </Grid>
      </Paper>
    </Box>
  );
};
const Advertisement = () => {
  return (
    <Box>
      <Typography gutterBottom>Publicités</Typography>
      <img src={AdImage} alt={AdImage} width="100%" />
      <Divider sx={{ my: 3 }} />
      <img src={AdImage} alt={AdImage} width="100%" />
    </Box>
  );
};
const Subscribe = () => {
  const { dialogOpen, setdialogOpen } = useContext(ShopContext);
  function handleClose() {
    setdialogOpen(false);
  }

  return (
    <Dialog open={dialogOpen} onClose={handleClose}>
      <DialogTitle>Soyer notifier le jour du lancement</DialogTitle>
      <DialogContent>
        <DialogContentText>Gagner deux livraisons gratuites ou moins 40%</DialogContentText>
        <Box p={2}>
          <TextField placeholder="email" label="email" type="email" size="small" fullWidth />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>fermer</Button>
        <Button onClick={handleClose} color="warning">
          Envoyer
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const ShopContext = createContext();

const Shop = () => {
  const articles = [
    {
      name: "Robe de soirée",
      normalPrice: 19,
      newPrice: 15,
      currency: "€",
      liked: false,
      promo: 0,
      imgUrl:
        "https://firebasestorage.googleapis.com/v0/b/fir-c69a6.appspot.com/o/shop%2Farticles%2F1631678377c7f60205e9edd2b13e7d027831e5573b_thumbnail_405x552.webp?alt=media&token=11391302-2be9-4bb6-a163-bb37a7cae48e",
    },
    {
      name: "Pull paris blanc",
      normalPrice: 12,
      newPrice: 12,
      currency: "€",
      liked: false,
      promo: 0,
      imgUrl:
        "https://firebasestorage.googleapis.com/v0/b/fir-c69a6.appspot.com/o/shop%2Farticles%2F16360835331d62ee262894f2d945da905a30b2ac64_thumbnail_405x552.webp?alt=media&token=c28c9aa6-dba8-45a4-a27f-3b921fc9b46e",
    },
    {
      name: "Maad (Saba Sénégalensis)",
      normalPrice: 15,
      newPrice: 10,
      currency: "€",
      liked: false,
      promo: 0,
      imgUrl:
        "https://firebasestorage.googleapis.com/v0/b/fir-c69a6.appspot.com/o/shop%2Farticles%2F41e7EqMnkjL.jpg?alt=media&token=35bf6299-fa24-45d6-84b4-5e66f5a5378a",
    },
    {
      name: "Ensemble chemise madras",
      normalPrice: 13,
      newPrice: 8,
      currency: "€",
      liked: false,
      promo: 0,
      imgUrl:
        "https://firebasestorage.googleapis.com/v0/b/fir-c69a6.appspot.com/o/shop%2Farticles%2F1609729455bae2da84b6fe47c017dccd7f3c0a8ac7_thumbnail_405x552.webp?alt=media&token=28acf073-38ef-4bac-868d-db424bc24fba",
    },
  ];
  const [shopState, setShopState] = useState(articles);
  const [dialogOpen, setdialogOpen] = useState(false);
  const Body = () => {
    return (
      <Grid container py={4} spacing={2}>
        <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
          <FilterBar />
        </Grid>
        <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
          <SearchResults />
        </Grid>
        <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
          <Advertisement />
        </Grid>
      </Grid>
    );
  };
  function showDialog() {
    setdialogOpen(true);
  }
  return (
    <ShopContext.Provider
      value={{ shopState, setShopState, dialogOpen, setdialogOpen, showDialog }}
    >
      <Box bgcolor="#F5F5F5" height="100%">
        <Box flex={1} bgcolor={COLORS.primary} p={6} mt={-2}>
          <Container style={{ minWidth: "90%" }}>
            <Typography color="white" variant="h5">
              Acheter des produits et faites vous livrer par un covaliseur
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography color={COLORS.warning} variant="h6">
                Bientot disponible
              </Typography>
              <FaBusinessTime color={COLORS.warning} size={20} />
            </Stack>
          </Container>
        </Box>
        <Box flex={1}>
          <Box mx={5}>
            <ProductSearchBar />
            <Body />
            <Subscribe />
          </Box>
        </Box>
      </Box>
    </ShopContext.Provider>
  );
};

export default Shop;
