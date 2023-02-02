import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "../App.css";
import MarkerPosition from "./MarkerPosition";
const MapComponent = ({ data }) => {
  let position;
  if (data) {
    position = [data.location.latitude, data.location.longitude];
  }

  return (
    <div className="map">
      {data && (
        <MapContainer
          center={position}
          zoom={13}
          scrollWheelZoom={true}
          className="map"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MarkerPosition data={data}></MarkerPosition>
        </MapContainer>
      )}
    </div>
  );
};

export default MapComponent;
