import React, { Component } from "react";
import Header from './components/Header.js';
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      applicationName:'Traffic Maps'
    };
  }

  render() {
    return (
      <div className="App">
        <Header appName={this.state.applicationName}/>
        <div id="map" />
      </div>
    );
  }
}

export default App;
