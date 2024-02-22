import { GeoJSON } from "react-leaflet";
import { icon, marker } from "leaflet";
import BaseMap from "./BaseMap";
import ReidsSeedsData from "../data/reidsSeedsData";
import type { Feature } from "geojson";
import type { LatLng } from "leaflet";

const cosmosIcon = icon({
  iconUrl: "/images/cosmos.svg",
  iconSize: [32, 37],
  iconAnchor: [16, 37],
  popupAnchor: [0, -28],
});

const ReidsSeeds = () => {
  const pointToLayer = (feature: Feature, latlng: LatLng) => {
    return marker(latlng, { icon: cosmosIcon });
  };

  return (
    <BaseMap>
      <GeoJSON data={ReidsSeedsData} pointToLayer={pointToLayer} />
    </BaseMap>
  );
};

export default ReidsSeeds;
