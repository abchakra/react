import MapboxGL from "mapbox-gl";
import React, { Component } from "react";
class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      api_url: "http://data.edmonton.ca/resource/87ck-293k.json",
      map: false,
      viewport: {
        zoom: 12,
        center: [-113.4909, 53.5444]
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
  static initializeMap(state) {
    MapboxGL.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;
    let map = new MapboxGL.Map({
      container: "map",
      style: "mapbox://style/mapbox/light-v9",
      ...state.viewport
    });

    map.on("load", () => {
      map.addLayer({
        id: "points",
        type: "circle",
        source: {
          type: "geojson",
          data: state.data
        },
        paint: {
          "circle-radius": 8,
          "circle-color": "#B4D455"
        }
      });
    });

    map.on("click", "points", e => {
      const coordinates = e.features[0].geometry.coordinates.slice();
      const {
        details,
        description,
        impact,
        duration
      } = e.features[0].properties;

      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      new MapboxGL.Popup()
        .setLngLat(coordinates)
        .setHTML(
          `
      <strong>${description}</strong>
      <em>${impact}</em><br/>
      <em>${duration}</em><br/>
      <p>${details}</p>
      `
        )
        .addTo(map);
    });

    map.on("mouseenter", "points", () => {
      map.getCanvas().style.cursor = "pointer";
    });

    map.on("mouseleave", "points", () => {
      map.getCanvas().style.cursor = "";
    });

    return map;
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { data, map } = prevState;

    if (data && !map) return Map.initializeMap(prevState);
    else return null;
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

  componentDidMount() {
    const { data, api_url } = this.state;

    if (!data) {
      fetch(api_url, { method: "GET" })
        .then(response => response.json())
        .then(response => this.createFeatureCollection(response))
        .then(response => this.setState({ data: response }));
    }
  }
  render() {
    return <div style={{ width: 1100, height: 600 }} id="map" />;
  }
}

export default Map;
