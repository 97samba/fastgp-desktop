import { Button, Container, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import COLORS from "../../colors";

import sendFirstStep from "../../Images/Home/sendFirstStep.png";
import sendSecondStep from "../../Images/Home/sendSecondStep.png";
import sendThirdStep from "../../Images/Home/sendThirdStep.png";
import sendFourthStep from "../../Images/Home/sendFourthStep.png";
import { MdFilterAlt, MdOutlineDeliveryDining, MdSearch } from "react-icons/md";
import { GoPackage } from "react-icons/go";
import { Box } from "@mui/system";

const OneHowTo = ({ image, step, title, description, button, flip = 1 }) => {
  return (
    <Grid container p={2} spacing={2}>
      <Grid
        item
        xs={12}
        sm={12}
        md={6}
        lg={6}
        xl={6}
        display="flex"
        alignItems="center"
        justifyContent="center"
        py={2}
      >
        <Stack width={320}>
          <img src={image} alt="presentation" width="90%" />
        </Stack>
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={6}
        lg={6}
        xl={6}
        order={{ xs: -1, sm: -1, md: flip }}
      >
        <Stack spacing={2} my={4}>
          <Typography variant="body1" color={COLORS.warning}>
            {step}
          </Typography>
          <Typography variant="h4" fontWeight="bold" color="primary">
            {title}
          </Typography>
          <Typography variant="body2" color={COLORS.black}>
            {description}
          </Typography>
        </Stack>
        {button}
      </Grid>
    </Grid>
  );
};

const HowToSendPackage = () => {
  const HowToSend = [
    {
      image: sendFirstStep,
      step: "- Première étape",
      title: "Renseigner le départ et la destination",
      description:
        "Vous pouvez effectuer votre recherche sur plusieurs villes du monde ou taper le nom du pays et les villes vous seront proposées.",
      button: (
        <Button variant="contained" href="/search" endIcon={<MdSearch />}>
          Commencer la recherche
        </Button>
      ),
    },
    {
      image: sendSecondStep,
      step: "- Deuxième étape",
      title: "Trier et filtrer les résultats",
      description:
        "Vous pouvez filtrer vos résultats pour trouver la date et le prix qui vous arrange. Mais aussi, vous pouvez selectionner les Transporteurs certifiés ou en fonction de leur expérience.",
      button: (
        <Button variant="contained" href="/search" endIcon={<MdFilterAlt />}>
          Appliquer les filtres
        </Button>
      ),

      flip: -1,
    },
    {
      image: sendThirdStep,
      step: "- Troisième étape",
      title: "Réserver en ligne ou appeler le directement",
      description:
        "Vous avez le choix entre créer un compte pour réserver et suivre votre colis ou bien appeler le transporteur directement.",
      button: (
        <Button
          variant="contained"
          href="/profilDetails"
          endIcon={<GoPackage />}
        >
          Voir mes colis
        </Button>
      ),
    },
    {
      image: sendFourthStep,
      step: "- Dernière étape",
      title: "Suivre le colis",
      description:
        "Apres validation de la part du transporteur, vous avez une page dédiée pour suivre l'évolution du statut de votre colis.",
      button: (
        <Button
          variant="contained"
          href="/profilDetails"
          endIcon={<MdOutlineDeliveryDining />}
        >
          Suivre un colis
        </Button>
      ),

      flip: -1,
    },
  ];
  return (
    <Box>
      <Stack py={4}>
        <Typography variant="h4" fontWeight={555} color="primary">
          Comment envoyer un colis ?
        </Typography>
      </Stack>
      <Stack>
        {HowToSend.map((data, index) => (
          <OneHowTo {...data} key={index} />
        ))}
      </Stack>
    </Box>
  );
};

const HowToTransportPackage = () => {
  const datas = [
    {
      image: sendFirstStep,
      step: "- Première étape",
      title: "Vérifier que vous êtes en GP (transporteur)",
      description:
        "Avant de publier une annonce, il vous faut imperativement un compte GP. Vous pouvez  verifier votre statut depuis profil > documents.",
      button: (
        <Button variant="contained" href="/search" endIcon={<MdSearch />}>
          Vérifier votre profil
        </Button>
      ),
    },
    {
      image: sendSecondStep,
      step: "- Deuxième étape",
      title: "Trier et filtrer les résultats",
      description:
        "Vous pouvez filtrer vos résultats pour trouver la date et le prix qui vous arrange. Mais aussi, vous pouvez selectionner les Transporteurs certifiés ou en fonction de leur expérience.",
      button: (
        <Button variant="contained" href="/search" endIcon={<MdFilterAlt />}>
          Appliquer les filtres
        </Button>
      ),

      flip: -1,
    },
    {
      image: sendThirdStep,
      step: "- Troisième étape",
      title: "Réserver en ligne ou appeler le directement",
      description:
        "Vous avez le choix entre créer un compte pour réserver et suivre votre colis ou bien appeler le transporteur directement.",
      button: (
        <Button
          variant="contained"
          href="/profilDetails"
          endIcon={<GoPackage />}
        >
          Voir mes colis
        </Button>
      ),
    },
    {
      image: sendFourthStep,
      step: "- Dernière étape",
      title: "Suivre le colis",
      description:
        "Apres validation de la part du transporteur, vous avez une page dédiée pour suivre l'évolution du statut de votre colis.",
      button: (
        <Button
          variant="contained"
          href="/profilDetails"
          endIcon={<MdOutlineDeliveryDining />}
        >
          Suivre un colis
        </Button>
      ),

      flip: -1,
    },
  ];
  return (
    <Stack>
      <Typography variant="h4" fontWeight={555} color="primary">
        Comment publier une annonce ?
      </Typography>
      <Stack>
        {datas.map((data, index) => (
          <OneHowTo {...data} key={index} />
        ))}
      </Stack>
    </Stack>
  );
};

const Summary = () => {
  return (
    <Box>
      <Typography variant="h4" fontWeight={555} color="primary">
        Comment ça marche ?
      </Typography>{" "}
    </Box>
  );
};
const HowTo = () => {
  return (
    <Container>
      <HowToTransportPackage />
      <HowToSendPackage />
    </Container>
  );
};

export default HowTo;
