import { CircularProgress, Link, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { getAllReservations } from "../../firebase/db";

const Packages = () => {
  const [state, setstate] = useState({ loading: true });
  const [rows, setrows] = useState([]);
  const columns = [
    {
      field: "sender",
      minWidth: 200,
      resizable: true,
      renderCell: (props) => (
        <Link>
          <Typography>{props.value.firstName + " " + props.value.lastName} </Typography>
        </Link>
      ),
    },
    {
      field: "reciever",
      minWidth: 200,
      renderCell: (props) => (
        <Typography>{props.value.firstName + " " + props.value.lastName} </Typography>
      ),
    },
    {
      field: "publisher",
      minWidth: 200,
      headerName: "Gp",
      renderCell: (props) => (
        <Link>
          <Typography>
            {props.value.firstName} {props.value.lastName}
          </Typography>
        </Link>
      ),
    },
    {
      field: "shipping",
      minWidth: 120,
      headerName: "Livraison",
      renderCell: (props) => (
        <Typography color={props.value ? "green" : "red"}>{props.value ? "Oui" : "non"}</Typography>
      ),
    },
    {
      field: "contact",
      minWidth: 120,
      headerName: "Contact",
    },
    {
      field: "status",
      minWidth: 120,
      headerName: "Etat",
    },
    {
      field: "shipped",
      minWidth: 120,
      headerName: "Livré",
      renderCell: (props) => (
        <Typography color={props.value ? "green" : "red"}>{props.value ? "Oui" : "non"}</Typography>
      ),
    },
  ];

  function getRows(datas) {
    console.log(`datas.length`, datas.length);
    var rows = datas.map((data) => {
      return {
        id: data.id,
        sender: data.sender,
        reciever: data.reciever,
        publisher: data.publisher,
        shipping: data.shipping,
        contact: data.reciever.phoneNumber,
        status: data.status,
        shipped: data?.shipped,
      };
    });
    setrows(rows);
    setstate({ ...state, loading: false });
  }

  useEffect(async () => {
    async function init() {
      getRows(await getAllReservations());
    }
    init();
  }, []);

  return (
    <Box p={2}>
      <Typography variant="h5">Colis à livrer</Typography>
      <Box my={2}>
        {state.loading ? (
          <Stack p={3} alignItems="center" spacing={2}>
            <CircularProgress />
            <Typography>Chargement des livraisons</Typography>
          </Stack>
        ) : (
          <DataGrid columns={columns} rows={rows} rowsPerPageOptions={[]} />
        )}
      </Box>
    </Box>
  );
};

export default Packages;
