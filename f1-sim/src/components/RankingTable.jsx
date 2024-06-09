import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import Navbar from "./Navbar"

const RankingTable = ({ ranking }) => {
  console.log(ranking);
  return (
    <TableContainer component={Paper}>
      <Navbar></Navbar>
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
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{entry.user.name}</TableCell>
              <TableCell>{entry.score}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RankingTable;