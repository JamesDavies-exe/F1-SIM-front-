import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Circuit(){
    const [circuits, setCircuits] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getCircuits();
    }, [])

    async function getCircuits() {
        let response = await fetch("http://localhost:8080/getCircuits");
        if (response.ok) {
          let json = await response.json();
          console.log(json);
          setCircuits(json);
        } else {
          alert("Error-HTTP: " + response.status);
        }
      }
    return (
        <>
        <div>
      {circuits.map(circuit => (
        <div key={circuit.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
          <p>Ronda: {circuit.id}</p>
          <p>GP {circuit.name}</p>
          <button onClick={() => navigate("/quiz", {state: circuit.id})}>Jugar</button>
        </div>
      ))}
    </div>
        </>
    )
}

export default Circuit;