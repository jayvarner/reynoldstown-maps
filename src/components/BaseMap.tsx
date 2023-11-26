import { MapContainer, TileLayer } from "react-leaflet";
import { latLngBounds, latLng } from "leaflet";
import type { ReactNode } from "react";
import type { LatLngBounds } from "leaflet";

interface BaseMapProps {
  children: ReactNode;
}

const BOUNDS: LatLngBounds = latLngBounds(
  latLng(33.7433675899999983, -84.36263325000000179),
  latLng(33.7599344400000021, -84.3491589900000065)
);


const BaseMap = ({ children }: BaseMapProps) => {
  return (
    <MapContainer bounds={BOUNDS}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        maxZoom={20}
      />
      {children}
    </MapContainer>
  );
}

export default BaseMap;