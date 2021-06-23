import React, { useEffect, useState } from "react";
import Schedule from "./Schedule";
import Squadsheet from "./Squadsheet";
import "./App.scss";
import "semantic-ui-css/semantic.min.css";
import { Popup, Button, Grid, Icon } from "semantic-ui-react";
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
    console.log("fetching Database");
    await fetch("/testDB")
      .then((res) => res.text())
      .then((res) => setDBTest(res));
  };
  const getGolData = async () => {
    console.log("retrieving data from Gol");
    const response = await fetch("http://127.0.0.1/public/scrape.php")
      .then((response) => response.json())
      .then((response) => {
        setDivTable(response.division);
        setFixList(response.schedule);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <Grid centered textAlign="center" columns="equal">
          <Grid.Column floated="left">
            <Popup
              trigger={<Icon circular inverted size="mini" name="laptop" />}
              flowing
              hoverable
              small
              className="test-results"
            >
              <p>{APITest}</p>
              <p>{DBtest}</p>
            </Popup>
          </Grid.Column>
          <Grid.Column textAlign="center" width={8}>
            <h1 className="title">Teamsheet</h1>
          </Grid.Column>
          <Grid.Column></Grid.Column>
        </Grid>
      </header>
      <Squadsheet/>
      <Schedule divTable={divTable} fixList={fixList} />
      
      {/*<Stats/>*/}
      {/*PointlessGraphic*/}
    </div>
  );
}

export default App;
