import React, { useEffect, useState } from "react";
import "./App.scss";
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
    <div className="schedule">
      <div className="divcontainer">
        <h1> Division Table</h1>

        <table className="divtable">
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
                <td className="divTeam ">{i.Team}</td>
                <td>{i.GP}</td>
                <td>{i.W}</td>
                <td>{i.L}</td>
                <td>{i.D}</td>
                <td>{i.GF}</td>
                <td>{i.GA}</td>
                <td>{i.GD}</td>
                <td>{i.PTS}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="fixtures">
        <h1>Fixture list</h1>
        <tbody className="fixturelist">
          <tr className='titleRow'>
            <th>Home</th>
            <th>Score</th>
            <th>Away</th>
            <th>Date</th>
            <th>Time/Status</th>
          </tr>
          {fixList
            .filter((i) => i.Home == "Well Done, He's 13" | i.Away === "Well Done, He's 13")
            .map((i) => (
              <tr className="row">
                <td className='fixHome'>{i.Home}</td>
                <td className='fixScore'>{i.Score}</td>
                <td className='fixAway'>{i.Away}</td>
                <td className='fixDate'>{i.Date}</td>
                <td className='fixTS'>{i["Time/Status"]}</td>
              </tr>
            ))}
        </tbody>
      </div>
    </div>
  );
};
export default Schedule;
