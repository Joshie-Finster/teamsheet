import React, { useEffect, useState } from "react";
import Schedule from "./Schedule";
import "./App.scss";
import "semantic-ui-css/semantic.min.css";
const fetch = require("node-fetch");

function App() {
  const [divTable, setDivTable] = useState([]);
  const [fixList, setFixList] = useState([]);
  const [APITest, setAPITest] = useState("");
  const [DBtest, setDBTest] = useState("Not fetching");

  useEffect(() => {
    callAPI();
    callDB();
    getGolData();
  }, []);

  useEffect(() => {}, []);

  const callAPI = async () => {
    console.log("fetching API");
    await fetch("/testAPI")
      .then((res) => res.text())
      .then((res) => setAPITest(res));
  };

  const callDB = async () => {
    await fetch("/testDB")
      .then((res) => res.text())
      .then((res) => setDBTest(res));
  };
  const getGolData = async () => {
    console.log("retrieving data from Gol");
    const response = await fetch(
      "http://127.0.0.1/public/scrape.php"
    )
      .then((response) => response.json())
      .then((response) => {
        setDivTable(response.division);
        setFixList(response.schedule);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="title">Teamsheet</h1>
        <p className="app-intro">{APITest}</p>
        <p>{DBtest}</p>
      </header>
      <Schedule divTable={divTable} fixList={fixList} />
      {/*<Squadsheet/>*/}
      {/*<Stats/>*/}
      {/*PointlessGraphic*/}
    </div>
  );
}

export default App;
