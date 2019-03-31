import React, { Component } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import Pin from "./Pin";
class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      api_url: "http://data.edmonton.ca/resource/87ck-293k.json",
      viewport: {
        width: 1400,
        height: 768,
        latitude: 53.5444,
        longitude: -113.4909,
        zoom: 12
      },
      coords: [
        { latitude: 53.5224, longitude: -113.4098 },
        { latitude: 53.5624, longitude: -113.4227 },
        { latitude: 53.5824, longitude: -113.4336 },
        { latitude: 53.5424, longitude: -113.4771 },
        { latitude: 53.5294, longitude: -113.4052 }
      ],
      data: null
    };
  }

  componentDidMount() {
    const { data, api_url } = this.state;
    if (!data) {
      fetch(api_url, { method: "GET" })
        .then(response => response.json())
        .then(response => this.setState({ data: response }));
    }
  }
  render() {
    const { coords,data } = this.state;
    return (
      <ReactMapGL
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        {...this.state.viewport}
        onViewportChange={viewport => this.setState({ viewport })}
      >
        {data &&
          data.map((coord, i) => (
            <Marker
              key={`Marker-${i * (Math.random() * 200 + 1)}`}
              latitude={parseFloat(coord.location.latitude)}
              longitude={parseFloat(coord.location.longitude)}
              // latitude={coord.latitude}
              // longitude={coord.longitude}
            >
              <Pin />
            </Marker>
          ))}
      </ReactMapGL>
    );
  }
}

export default Map;
