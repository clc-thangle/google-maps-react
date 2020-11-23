import React, { useState, useEffect } from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import * as parkData from "./data/data.json"; //  
import mapStyles from "./mapStyles";

function Map() {
  const [selectedPark, setSelectedPark] = useState(null);

  useEffect(() => {
    const listener = e => {
      if (e.key === "Escape") {
        setSelectedPark(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);
  
  return (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={{ lat: 16.072783606434253, lng: 108.22042419101558 }}
      defaultOptions={{ styles: mapStyles }}
    >
      {parkData.data.map(park => (
        <Marker
          // key={park.properties.PARK_ID}
          position={{
            lat: park.lat,
            lng: park.lon
          }}
          onClick={() => {
            setSelectedPark(park);
          }}
          icon={{
            url: `data:image/png;base64,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`,
            scaledSize: new window.google.maps.Size(25, 25)
          }}
        />
      ))}

      {selectedPark && (
        <InfoWindow
          onCloseClick={() => {
            setSelectedPark(null);
          }}
          position={{
            lat: selectedPark.lat,
            lng: selectedPark.lon
          }}
        >
          <div className="container-info">

            <img src="https://www.highlandscoffee.com.vn/vnt_upload/dealer/02_2018/Highlands-Coffee-anh1.jpg" style={{ display: 'inline-block', width: '46px' }} />
            <div className="title" style={{ display: 'inline-block', marginLeft: '10px' }}>
              <h2>{selectedPark.title}</h2>
              <p>{selectedPark.address}</p>
            </div>

          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}

const MapWrapped = withScriptjs(withGoogleMap(Map));

export default function App() {
  console.log(process.env)
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <MapWrapped
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
}
