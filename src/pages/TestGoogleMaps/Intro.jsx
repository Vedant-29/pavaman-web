import { APIProvider, Map } from '@vis.gl/react-google-maps';
import React from 'react'

function Intro() {
  const position = {
    lat: 53.34,
    lng: 10
  };

  return (
    <APIProvider apiKey="AIzaSyB6Osf9bMzZ9pm4DgM6yUocYzZDUf154Ao">
      <div style={{height: "100vh"}}>
        <Map zoom={10} center={position}></Map>
      </div>
    </APIProvider>
  )
}

export default Intro