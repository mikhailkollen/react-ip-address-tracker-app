import React, { useEffect } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import Icon from "./Icon";
const MarkerPosition = ({ data }) => {
  let position;
  if (data) {
    position = [data.latitude, data.longitude];
  }
  const map = useMap();
  useEffect(() => {
    map.flyTo(position, 13, {
      animate: true,
    });
  }, [map, position]);
  return (
    <Marker position={position} icon={Icon}>
      <Popup>
        Your IP: {data.ip} <br />
        Your location: {data.city}, {data.country}
        <br />
        Your ISP:
        <br /> Your domain: <br />
      </Popup>
    </Marker>
  );
};

export default MarkerPosition;
