import React, { Component } from "react";
import {Container} from 'reactstrap';
import Header from './components/Header';
import Map from './components/Map';
// import logo from "./logo.svg";
import "./App.css";

require('dotenv').config()



class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      applicationName:'Traffic Maps'
    };
  }

  render() {
    return (
      <div>
        <Header appName={this.state.applicationName}/>
        <Container>
          <Map/>
        </Container>
      </div>
    );
  }
}

export default App;
