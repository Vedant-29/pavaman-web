import {
  APIProvider,
  AdvancedMarker,
  InfoWindow,
  Map,
  Marker,
  Pin,
  useMap,
} from "@vis.gl/react-google-maps";
import React, { useEffect, useRef, useState } from "react";
import trees from "../TestGoogleMaps/data/trees";
import { MarkerClusterer } from "@googlemaps/markerclusterer";

function Intro() {
  const [open, setOpen] = useState(false);

  const position = {
    lat: 17.366,
    lng: 78.476,
  };

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <div style={{ height: "100vh", width: "100%" }}>
        <Map
          defaultZoom={12}
          defaultCenter={position}
          mapId={import.meta.env.VITE_PUBLIC_MAP_ID}
        >
          <Markers points={trees} />
          {/* <AdvancedMarker position={position} onClick={() => setOpen(true)}>
            <Pin background={"red"} borderColor={"red"} glyphColor={"white"} />
          </AdvancedMarker> */}
          {open && (
            <InfoWindow position={position} onCloseClick={() => setOpen(false)}>
              <p>Im in hamburg</p>
            </InfoWindow>
          )}
        </Map>
      </div>
    </APIProvider>
  );
}

const Markers = ({ points }) => {
  const map = useMap();
  const [markers, setMarkers] = useState({});
  const clusterer = useRef(null);

  useEffect(() => {
    if (!map) return;
    if (!clusterer.current) {
      clusterer.current = new MarkerClusterer({ map });
    }
  }, [map]);

  useEffect(() => {
    clusterer.current?.clearMarkers();
    clusterer.current?.addMarkers(Object.values(markers));
  }, [markers]);

  const setMarkerRef = (marker, key) => {
    if (marker && markers[key]) return;
    if (!marker && !markers[key]) return;

    setMarkers((prev) => {
      if (marker) {
        return { ...prev, [key]: marker };
      } else {
        const newMarkers = { ...prev };
        delete newMarkers[key];
        return newMarkers;
      }
    });
  };

  return (
    <>
      {points.map((point) => (
        <AdvancedMarker
          position={point}
          key={point.key}
          ref={(marker) => setMarkerRef(marker, point.key)}
        >
          <span style={{ fontSize: "2rem" }}>🌳</span>
        </AdvancedMarker>
      ))} 
    </>
  );
};

export default Intro;
