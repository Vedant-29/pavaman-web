import {
  APIProvider,
  AdvancedMarker,
  InfoWindow,
  Map,
  Marker,
  Pin,
} from "@vis.gl/react-google-maps";
import React, { useState } from "react";
import trees from "../TestGoogleMaps/data/trees"

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
          <AdvancedMarker position={position} onClick={() => setOpen(true)}>
            <Pin background={"red"} borderColor={"red"} glyphColor={"white"} />
          </AdvancedMarker>
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

export default Intro;
