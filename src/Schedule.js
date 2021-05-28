import React, { useEffect, useState } from "react";
import "./App.scss";
const fetch = require("node-fetch");
const cheerio = require("cheerio");

const Schedule = () => {
  const [divTable, setDivTable] = useState();
  const [fixList, setFixList] = useState();

  useEffect(() => {
    getGolData();
  });

  const getGolData = async () => {
    console.log("retrieving data from Gol");
    await fetch("http://127.0.0.1/public/scrape.php")
      .then((res) => {
        var data = res.json()
        console.log("div table?: " + data[0])
      })
      .then((body) => {
        setDivTable(body);
        console.log("Div table: " + divTable);
      });
  };

  return (
    <div className="schedule">
      <div className="table">
        <h1> Division Table</h1>

        <div dangerouslySetInnerHTML={{ __html: divTable }}></div>
      </div>
      <div className="fixtures">
        <h1>fixtures list</h1>
      </div>
    </div>
  );
};
export default Schedule;
