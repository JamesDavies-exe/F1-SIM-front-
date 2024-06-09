import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import LoginError from "./LoginError";
import { Card, CardContent, Typography, Button } from '@mui/material';
import Navbar from "./Navbar";

function Circuit(){
    const [circuits, setCircuits] = useState([]);
    const navigate = useNavigate();
    const [token] = useState(localStorage.getItem("token"))

    useEffect(() => {
        getCircuits();
    }, [])

    async function getCircuits() {
        let response = await fetch("http://localhost:8080/getCircuits", {
          headers: {
            "Authorization" : token
          }        
        });
        if (response.ok) {
          let json = await response.json();
          console.log(json);
          setCircuits(json);
        } else {
          console.log("Error, user not found")
        }
      }

      if (token == null) {
        return (
          <>
            <LoginError></LoginError>
          </>
        );
      }
    return (
        <>
        <Navbar></Navbar>
        <div>
      {circuits.map(circuit => (
         <Card key={circuit.id} style={{ margin: '10px', display:"flex"}}>
         <CardContent
         >
           <Typography variant="h6">Ronda: {circuit.id}</Typography>
           <Typography variant="subtitle1">GP {circuit.name}</Typography>
           {circuit.done ? (
             <Button
               variant="contained"
               color="primary"
               onClick={() => navigate('/results', { state: { circuitId: circuit.id } })}
             >
               Ver Resultados
             </Button>
           ) : (
             <Button
               variant="contained"
               color="secondary"
               onClick={() => navigate('/quiz', { state: circuit.id })}
             >
               Jugar
             </Button>
           )}
         </CardContent>
       </Card>
      ))}
    </div>
        </>
    )
}

export default Circuit;