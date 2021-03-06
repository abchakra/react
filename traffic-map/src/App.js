import React, { Component } from "react";
import { Container } from "reactstrap";
import Header from "./components/Header";
import Map from "./components/Map";
// import logo from "./logo.svg";
import "./App.css";



class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      applicationName: "Traffic Maps",
      api_url: "http://data.edmonton.ca/resource/87ck-293k.json",
      data: null
    };
  }

  render() {
    return (
      <div>
        <Header appName={this.state.applicationName} />
        <Container>
          <Map data={this.state.data} />
        </Container>
      </div>
    );
  }

  componentDidMount() {
    const { data, api_url } = this.state;

    if (!data) {
      fetch(api_url, { method: "GET" })
        .then(response => response.json())
        .then(response => this.createFeatureCollection(response))
        .then(response => this.setState({ data: response }));
    }
  }

  createFeatureCollection(data) {
    let features = [];
    data.forEach(point => {
      features.push({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [
            parseFloat(point.location.longitude),
            parseFloat(point.location.latitude)
          ]
        },
        properties: {
          description: point.description,
          details: point.details,
          duration: point.duration,
          impact: point.impact
        }
      });
    });

    return {
      type: "FeatureCollection",
      features: features
    };
  }
}

export default App;
