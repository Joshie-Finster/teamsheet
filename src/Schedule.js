import React, { useEffect, useState } from "react";
import "./App.scss";
import { Container, Table } from "semantic-ui-react";
const fetch = require("node-fetch");
const cheerio = require("cheerio");

const Schedule = () => {
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
    <Container className="schedule">
      <Container className="divcontainer">
        <h1> Division Table</h1>

        <Table celled className="divtable">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Team</Table.HeaderCell>
              <Table.HeaderCell>GP</Table.HeaderCell>
              <Table.HeaderCell>W</Table.HeaderCell>
              <Table.HeaderCell>L</Table.HeaderCell>
              <Table.HeaderCell>D</Table.HeaderCell>
              <Table.HeaderCell>GF</Table.HeaderCell>
              <Table.HeaderCell>GA</Table.HeaderCell>
              <Table.HeaderCell>GD</Table.HeaderCell>
              <Table.HeaderCell>PTS</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {divTable.map((i) => (
              <Table.Row>
                <Table.Cell className="divTeam ">{i.Team}</Table.Cell>
                <Table.Cell>{i.GP}</Table.Cell>
                <Table.Cell>{i.W}</Table.Cell>
                <Table.Cell>{i.L}</Table.Cell>
                <Table.Cell>{i.D}</Table.Cell>
                <Table.Cell>{i.GF}</Table.Cell>
                <Table.Cell>{i.GA}</Table.Cell>
                <Table.Cell>{i.GD}</Table.Cell>
                <Table.Cell>{i.PTS}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Container>
      <Container className="fixtures">
        <h1>Fixture list</h1>
        <tbody className="fixturelist">
          <tr className="titleRow">
            <th>Home</th>
            <th>Score</th>
            <th>Away</th>
            <th>Date</th>
            <th>Time/Status</th>
          </tr>
          {fixList
            .filter(
              (i) =>
                (i.Home == "Well Done, He's 13") |
                (i.Away === "Well Done, He's 13")
            )
            .map((i) => (
              <tr className="row">
                <td className="fixHome">{i.Home}</td>
                <td className="fixScore">{i.Score}</td>
                <td className="fixAway">{i.Away}</td>
                <td className="fixDate">{i.Date}</td>
                <td className="fixTS">{i["Time/Status"]}</td>
              </tr>
            ))}
        </tbody>
      </Container>
    </Container>
  );
};
export default Schedule;
