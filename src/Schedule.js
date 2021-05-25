import React, { useEffect, useState } from "react";
import "./App.scss";
const fetch = require("node-fetch");
const cheerio = require("cheerio");

const Schedule = () => {
  const [golData, setGolData] = useState([]);

  useEffect(() => {
    getGolData();
  });
  const getGolData = async () => {
    console.log("hello");
    const response = await fetch(
      "https://www.golcentres.co.uk/results?LeagueId=393018"
    )
      .then((res) => res.text())
      .then((body) => console.log(body));
  };

  return (
    <div className="schedule">
      <div className="table">
        <h1> Division Table</h1>
        <div></div>
      </div>
      <div className="fixtures">
        <h1>fixtures list</h1>
      </div>
    </div>
  );
};
export default Schedule;
