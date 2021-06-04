import React from "react";
import Schedule from "./Schedule";
import "./App.scss";
import 'semantic-ui-css/semantic.min.css'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="title">Teamsheet</h1>
      </header>
      <Schedule/>
      {/*<Squadsheet/>*/}
      {/*<Stats/>*/}
      {/*PointlessGraphic*/}
    </div>
  );
}

export default App;
