import { GeoJSON } from "react-leaflet";
import BaseMap from "./BaseMap";
import Buildings1928 from "../data/reynoldstown1928";
import PopupContent from "../utils/PopupContent";
import type { Feature } from "geojson";
import type { Layer, StyleFunction } from "leaflet";

const DoorCount1928 = () => {
  const onEachFeature = (feature: Feature, layer: Layer) => {
    layer.bindPopup(PopupContent(feature.properties));
  };

  const style = (feature: Feature) => {
    const color = feature?.properties?.Land_Use === "R" ? "#162080" : "darkgray";
    return {
      color,
      weight: 1,
      fillColor: color,
      fillOpacity: 1,
    };
  };
  return (
    <BaseMap>
      <GeoJSON
        data={Buildings1928}
        onEachFeature={onEachFeature}
        style={style as StyleFunction}
      />
    </BaseMap>
  );
};

export default DoorCount1928;
