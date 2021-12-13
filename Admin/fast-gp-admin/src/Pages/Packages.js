import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { getAllUsers } from "../firebase/db";

const Packages = () => {
  const [rows, setrows] = useState([
    { id: 0, firstName: "Samba", lastName: "NDIAYE", email: "test@gmail.com" },
  ]);
  const columns = [
    { field: "firstName", minWidth: 120, resizable: true },
    { field: "lastName", minWidth: 120 },
    { field: "email", minWidth: 220 },
    { field: "document", minWidth: 150 },
    { field: "verified", minWidth: 150, headerName: "Vérification" },
  ];

  function getRows(datas) {
    var rows = datas.map((data) => {
      return {
        id: data.userId,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        document: data.documentIdentity,
        verified: data.documentVerified,
      };
    });
    setrows(rows);
  }

  useEffect(async () => {
    getRows(await getAllUsers());
  }, []);

  return (
    <Box>
      <Typography>colis a livrés</Typography>
      <Box>
        <DataGrid columns={columns} rows={rows} />
      </Box>
    </Box>
  );
};

export default Packages;
