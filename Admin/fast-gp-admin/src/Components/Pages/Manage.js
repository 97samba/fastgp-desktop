import { Button, IconButton, Link, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { FaEye, FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { getAllFlights, removeAFlight } from "../../firebase/db";

const Manage = () => {
  const [rows, setrows] = useState([
    {
      id: 0,
      departure: "Dakar",
      destination: "Paris",
      distributionDate: moment(new Date()).format("DD/MM/Y"),
      publisher: { firstName: "Samba", lastName: "Ndiaye", id: "FqhRunpZYBbV7mEZgQTyD9NAeT93" },
      status: "ok",
    },
  ]);
  const columns = [
    { field: "departure", minWidth: 150, resizable: true, headerName: "Départ" },
    { field: "destination", minWidth: 150, headerName: "Destination" },
    {
      field: "distributionDate",
      minWidth: 150,
      headerName: "Date",
      renderCell: (props) => <Typography>{moment(props.value).format("DD/MM/Y")}</Typography>,
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
    { field: "status", minWidth: 150, headerName: "Etat" },
    {
      field: "action",
      minWidth: 150,
      headerName: "Action",
      renderCell: (props) => (
        <Stack direction="row" spacing={2}>
          <IconButton color="primary" size="small" variant="contained">
            <FaEye />
          </IconButton>
          <IconButton
            color="error"
            size="small"
            variant="contained"
            onClick={() => deleteFlight(props.value)}
          >
            <FaTrash />
          </IconButton>
          <IconButton color="primary" size="small" variant="contained">
            <MdEdit />
          </IconButton>
        </Stack>
      ),
    },
  ];

  function getRows(datas) {
    var rows = datas.map((data) => {
      return {
        id: data.id,
        departure: data.departure.name,
        destination: data.destination.name,
        distributionDate: data.distributionDate,
        publisher: data.publisher,
        status: moment(data.distributionDate).isBefore(moment()) ? "passé" : "bon",
        action: data.id,
      };
    });
    setrows(rows);
  }
  async function deleteFlight(id) {
    console.log("deleting flight " + id);
    await removeAFlight(id);
    setrows(rows.filter((row) => row.id != id));
    console.log(rows.length);
  }

  useEffect(() => {
    async function init() {
      const result = await getAllFlights();
      console.log(`result.length`, result.length);
      getRows(result);
    }
    init();
  }, []);
  return (
    <Box p={2}>
      <Typography variant="h5">Vols</Typography>
      <Box my={2}>
        <DataGrid columns={columns} rows={rows} rowsPerPageOptions={[]} />
      </Box>
    </Box>
  );
};

export default Manage;
