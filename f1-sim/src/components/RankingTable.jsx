import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import Navbar from "./Navbar";
import "./style/circuit.css"

const RankingTable = ({ ranking }) => {
  const username = localStorage.getItem("username");

  return (
    <TableContainer component={Paper}>
      <Navbar />
      <Typography variant="h6" component="div" style={{ padding: '16px' }}>
        Ranking
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Posición</TableCell>
            <TableCell>Usuario</TableCell>
            <TableCell>Puntos</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ranking.map((entry, index) => (
            <TableRow 
              key={index}
              sx={{
                backgroundColor: entry.user.name === username ? '#eef' : 'inherit'
              }}
            >
              <TableCell>{index + 1}</TableCell>
              <TableCell>{entry.user.name}</TableCell>
              <TableCell>{entry.scored}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RankingTable;
