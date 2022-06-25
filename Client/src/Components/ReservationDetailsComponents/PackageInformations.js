import { Paper, Stack, Typography, Grid, Link } from "@mui/material";
import moment from "moment";
import React from "react";
import { FaUserAlt } from "react-icons/fa";
import { MdPhone, MdPhoto } from "react-icons/md";
import COLORS from "../../colors";
import BoardingPass from "../ViewComponents/BoardingPass";
import { FaEuroSign, FaPlaneDeparture } from "react-icons/fa";
import { MdTextsms } from "react-icons/md";
import InformationViewer from "./InformationViewer";

const bagageType = [
  { label: "Colis pesé", value: "thing" },
  {
    label: "Téléphone",
    value: "phone",
  },
  { label: "Ordinateur", value: "computer" },
  { label: "Parfum", value: "fragrance" },
  { label: "Documents", value: "paper" },
  { label: "Bijoux", value: "jewel" },
  { label: "Alimentaire", value: "food" },
];

const PackageInformations = ({ data }) => {
  function getPrice() {
    if (data?.finalPrice) {
      return data.finalPrice + " " + data?.currency;
    }
    if (data?.prices) {
      if (data.itemType === "thing")
        return `${data.prices.pricePerKG} ${data.currency} /Kg`;
      else return "à déterminer";
    } else {
      return "à déterminer";
    }
  }
  function getitemType() {
    return bagageType.filter((element) => element.value === data.itemType)[0];
  }
  return (
    <Paper
      sx={{
        flex: 1,
        boxShadow: "0px 1px 3px rgba(3, 0, 71, 0.2)",
        borderRadius: 3,
      }}
      elevation={0}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        bgcolor="#F2f2f2"
        flex={1}
        p={2}
        sx={{ borderTopLeftRadius: 3, borderTopRightRadius: 3 }}
      >
        <Stack direction="row" spacing={1}>
          <Typography color="GrayText" variant="body1">
            ID Colis :{" "}
          </Typography>
          <Typography color={COLORS.black} variant="body1">
            {data.id}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1}>
          <Typography color="GrayText" variant="body1">
            Date de réservation :{" "}
          </Typography>
          <Typography color={COLORS.black} variant="body1">
            {moment(data.reservationDate).format("D MMM YYYY")}
          </Typography>
        </Stack>
      </Stack>
      <Stack flex={1} p={3}>
        <BoardingPass
          sender={data.sender}
          receiver={data.reciever}
          currency={data.currency}
          state={{
            publisher: data.publisher,
            departure: data.departure,
            destination: data.destination,
            id: data.id,
            prices: data.prices,
            clientID: data.owner,
            GPId: data.gpId,
            finalPrice: data?.finalPrice,
            currency: data.currency,
          }}
        />
      </Stack>
      <Grid container rowSpacing={2} columnSpacing={6} px={3} pb={2}>
        <InformationViewer
          icon={<FaUserAlt size={15} color={COLORS.primary} />}
          label="Transporteur"
          information={
            <Link href={"/profilDetails/" + data.gpId + "/myProfile"} underline="hover">
              <Typography>
                {data.publisher.firstName + " " + data.publisher.lastName}
              </Typography>
            </Link>
          }
        />
        <InformationViewer
          icon={<FaPlaneDeparture size={15} color={COLORS.primary} />}
          label="Annonce"
          information={
            <Link href={"/view/" + data.flightId} underline="hover">
              <Typography>Cliquer ici</Typography>
            </Link>
          }
        />
        <InformationViewer
          icon={<MdPhone size={15} color={COLORS.primary} />}
          label="Appeler"
          information={
            <Link href={"tel:" + data.publisher.phone} underline="hover">
              <Typography>{data.publisher.phone}</Typography>
            </Link>
          }
        />
        <InformationViewer
          icon={<MdTextsms size={15} color={COLORS.primary} />}
          label="Description"
          information={<Typography>{data.itemDescription}</Typography>}
        />

        <InformationViewer
          icon={<MdTextsms size={15} color={COLORS.primary} />}
          label="Type de produit"
          information={
            <Typography color={COLORS.primary}>{getitemType().label}</Typography>
          }
        />
        <InformationViewer
          icon={<FaEuroSign size={15} color={COLORS.primary} />}
          label="Prix par kilo"
          information={<Typography color={COLORS.warning}>{getPrice()}</Typography>}
        />
        <InformationViewer
          icon={<MdPhoto size={15} color={COLORS.primary} />}
          label="Photo du colis"
          information={<Typography color={COLORS.primary}>Voir photo</Typography>}
          showDivider={false}
        />
      </Grid>
    </Paper>
  );
};
export default PackageInformations;
