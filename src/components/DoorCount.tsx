import React from "react";
import { MapContainer, GeoJSON, TileLayer, useMap } from "react-leaflet";
import { houses } from "../data/houses";
import { apartments } from "../data/apartments";
import { otherBuildings } from "../data/otherBuildings";

const MapRef = () => {
  const map = useMap();
  map.fitBounds([
    [33.7433675899999983, -84.36263325000000179],
    [33.7599344400000021, -84.3491589900000065],
  ]);
  return null;
};

const PopupContent = (properties) => {
  const rows = [];
  Object.keys(properties).forEach((prop) => {
    rows.push(
      `<tr>
          <td class='border border-slate-700 p-2'>
            ${prop}
          </td>
          <td class='border border-slate-700 p-2'>
            ${properties[prop]}
          </td>
        </tr>`
    );
  });

  return `<table class='border-collapse border border-slate-500'>
      <tbody class="table-auto">
        ${rows.join("")}
      </tbody>
    </table>`;
};

const DoorCount = () => {
  const onEachFeature = (feature, layer) => {
    if (feature.properties) {
      layer.bindPopup(PopupContent(feature.properties));
    }
  };
  return (
    <MapContainer center={[33.7503056, -84.3553056]} zoom={16} maxZoom={20}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        maxZoom={20}
        opacity={0.5}
      />
      <GeoJSON
        key="f5264356-a544-5963-9d96-fc8cb295e71a"
        data={houses}
        style={() => {
          return {
            fillColor: "#162080",
            fillOpacity: 1,
            color: "darkgray",
            weight: 1,
          };
        }}
        onEachFeature={onEachFeature}
      />
      <GeoJSON
        key="18e3c0a7-725b-5b4d-8310-8696e4990609"
        data={apartments}
        style={() => {
          return {
            fillColor: "#fdd32b",
            fillOpacity: 1,
            color: "darkgray",
            weight: 1,
          };
        }}
        onEachFeature={onEachFeature}
      />
      <GeoJSON
        key="757766a7-b8df-5e88-85b7-728125352e41"
        data={otherBuildings}
        style={() => {
          return {
            fillColor: "darkgray",
            fillOpacity: 0.75,
            color: "darkgray",
          };
        }}
        onEachFeature={onEachFeature}
      />
      {/* <GeoJSON key='e514b08c-48a4-5eb5-8bb7-0c1ba030fc4c'
        data={roads}
      /> */}
      <MapRef />
    </MapContainer>
  );
};

export default DoorCount;
