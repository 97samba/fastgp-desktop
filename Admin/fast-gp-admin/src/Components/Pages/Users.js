import { CircularProgress, Paper, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { getAllUsers } from "../../firebase/db";

const Users = () => {
  const [state, setstate] = useState({ loading: true });

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
    { field: "phone", minWidth: 110, headerName: "Téléphone" },
  ];

  function getRows(datas) {
    var rows = datas.map((data) => {
      return {
        id: data.userId,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        emailVerified: data.emailVerified,
        document: data.documentIdentity,
        verified: data.documentVerified ? data.documentVerified : false,
        phone: data.phone,
      };
    });
    setrows(rows);
    setstate({ ...state, loading: false });
  }

  useEffect(async () => {
    getRows(await getAllUsers());
  }, []);

  return (
    <Box p={2}>
      <Typography variant="h5">Utilisateurs</Typography>
      <Box my={2}>
        {state.loading ? (
          <Stack p={3} alignItems="center" spacing={2}>
            <CircularProgress />
            <Typography>Chargement des utilisateurs</Typography>
          </Stack>
        ) : (
          <DataGrid columns={columns} rows={rows} rowsPerPageOptions={[]} />
        )}
      </Box>
    </Box>
  );
};

export default Users;
