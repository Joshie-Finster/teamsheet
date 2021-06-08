import React, { useEffect, useState } from "react";
import Schedule from "./Schedule";
import "./App.scss";
import "semantic-ui-css/semantic.min.css";
const fetch = require("node-fetch");

function App() {
  const [divTable, setDivTable] = useState([]);
  const [fixList, setFixList] = useState([]);

  useEffect(() => {
    getGolData();
  }, []);

  const getGolData = async () => {
    console.log("retrieving data from Gol");
    const response = await fetch("http://127.0.0.1/public/scrape.php");
    const data = await response.json();
    setDivTable(data.division);
    setFixList(data.schedule);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="title">Teamsheet</h1>
      </header>
      <Schedule divTable={divTable} fixList={fixList} />
      {/*<Squadsheet/>*/}
      {/*<Stats/>*/}
      {/*PointlessGraphic*/}
    </div>
  );
}

export default App;
