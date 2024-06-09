import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import RankingTable from "./RankingTable";
function Results(){
    const location = useLocation();
    const [ranking, setRanking] = useState([]);
    useEffect(() => {
        let id = location.state;
        console.log(id)
        getRanking(id);

    }, [])
    async function getRanking(id){
        let response = await fetch("http://localhost:8080/getRanking/" + id.circuitId);
    if (response.ok) {
      let json = await response.json();
      setRanking(json);
    } else {
      alert("Error-HTTP: " + response.status);
    }
    }
    return(
        <>
        <RankingTable ranking={ranking}  />
        </>
    )
}

export default Results;