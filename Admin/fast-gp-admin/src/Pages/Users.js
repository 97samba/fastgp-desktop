import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { getAllUsers } from "../firebase/db";

const Users = () => {
  const [rows, setrows] = useState([
    { id: 0, firstName: "Samba", lastName: "NDIAYE", email: "test@gmail.com" },
  ]);
  const columns = [
    { field: "firstName", minWidth: 120, resizable: true, headerName: "Prénom" },
    { field: "lastName", minWidth: 120, headerName: "Nom" },
    { field: "email", minWidth: 220, headerName: "Email" },
    { field: "emailVerified", minWidth: 120, headerName: "Etat Email" },
    { field: "document", minWidth: 110, headerName: "Document" },
    { field: "verified", minWidth: 110, headerName: "Vérification" },
  ];

  function getRows(datas) {
    var rows = datas.map((data) => {
      return {
        id: data.userId,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        document: data.documentIdentity,
        verified: data.documentVerified ? data.documentVerified : false,
      };
    });
    setrows(rows);
  }

  useEffect(async () => {
    getRows(await getAllUsers());
  }, []);

  return (
    <Box p={2}>
      <Typography variant="h5">Utilisateurs</Typography>
      <Box my={2}>
        <DataGrid columns={columns} rows={rows} rowsPerPageOptions={[]} />
      </Box>
    </Box>
  );
};

export default Users;
