import React, { useEffect, useState } from "react";
import "./App.scss";
const fetch = require("node-fetch");
const cheerio = require("cheerio");

const Schedule = () => {
  const [divTable, setDivTable] = useState();
  const [fixList, setFixList] = useState();

  useEffect(() => {
    getGolData();
  }, []);

  const getGolData = async () => {
    console.log("retrieving data from Gol");
    const response = await fetch("http://127.0.0.1/public/scrape.php");
    const data = await response.json();
    setDivTable(data.division);
    setFixList(data.schedule);
    console.log(divTable[0]);
    console.log(fixList[0]);
  };

  return (
    <div className="schedule">
      <div className="table">
        <h1> Division Table</h1>

        <table className="div-table">
          <tbody>
            <tr>
              <th>Team</th>
              <th>GP</th>
              <th>W</th>
              <th>L</th>
              <th>D</th>
              <th>GF</th>
              <th>GA</th>
              <th>GD</th>
              <th>PTS</th>
            </tr>

            {divTable.map((i) => (
              <tr>
                <th>{i.Team}</th>
                <th>{i.GP}</th>
                <th>{i.W}</th>
                <th>{i.L}</th>
                <th>{i.D}</th>
                <th>{i.GF}</th>
                <th>{i.GA}</th>
                <th>{i.GD}</th>
                <th>{i.PTS}</th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="fixtures">
        <h1>fixtures list</h1>
        <tbody className="fixture-list">
          <tr>
            <th>Home</th>
            <th>Score</th>
            <th>Away</th>
            <th>Time/Status</th>
          </tr>
          {fixList.map((i)=>(
            <tr>
            <th>{i.Home}</th>
            <th>{i.Score}</th>
            <th>{i.Away}</th>
            
          </tr>
          ))}
        </tbody>
      </div>
    </div>
  );
};
export default Schedule;
