import { useRef, Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";
import { MapContainer, GeoJSON, TileLayer, useMap } from "react-leaflet";
import { latLngBounds, latLng } from "leaflet";
import type { GeoJsonProperties, FeatureCollection, Feature } from "geojson";
import type { LatLngBounds, Layer } from "leaflet";
import Legend from "./Legend";

const MapRef = () => {
  const map = useMap();
  map.setMaxZoom(20);
  return null;
};

const BOUNDS: LatLngBounds = latLngBounds(
  latLng(33.7433675899999983, -84.36263325000000179),
  latLng(33.7599344400000021, -84.3491589900000065)
);

const PopupContent = (properties: GeoJsonProperties) => {
  if (!properties) return "";

  const rows: string[] = [];
  Object.keys(properties as { [key: string]: string }).forEach((prop) => {
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
  const buildings = useLoaderData() as {
    doors: { [key: string]: FeatureCollection };
  };
  const houseCount = useRef<number>(0);
  const flatCount = useRef<number>(0);

  const onEachFeature = (feature: Feature, layer: Layer) => {
    if (feature.properties) {
      if (
        feature.properties?.["building:flats"] &&
        !isNaN(parseInt(feature.properties["building:flats"]))
      ) {
        flatCount.current =
          flatCount.current + parseInt(feature.properties["building:flats"]);
      }
      if (feature.properties?.building === "house") {
        houseCount.current = houseCount.current + 1;
      }
      layer.bindPopup(PopupContent(feature.properties));
    }
  };
  return (
    <MapContainer bounds={BOUNDS}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        maxZoom={20}
      />
      <Suspense
        fallback={
          <p className="flex items-center justify-center h-screen text-4xl z-[99999] text-center">
            Loading
          </p>
        }
      >
        <Await resolve={buildings.doors} errorElement={<p>Error</p>}>
          {(doors) => {
            return (
              <>
                <GeoJSON
                  data={doors.houses}
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
                  data={doors.apartments}
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
                  data={doors.otherBuildings}
                  style={() => {
                    return {
                      fillColor: "darkgray",
                      fillOpacity: 0.75,
                      color: "darkgray",
                    };
                  }}
                  onEachFeature={onEachFeature}
                />
              </>
            );
          }}
        </Await>
      </Suspense>
      <MapRef />
      <Legend summary="Housing Units">
        <table className="table-auto mb-4" airi-role="legend">
          <thead>
            <tr>
              <th colSpan={2} className="text-left">
                Legend
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ background: "#162080", color: "#162080" }}>---</td>
              <td className="pl-2">Single Family Houses</td>
            </tr>
            <tr>
              <td className="bg-rtown-yellow text-rtown-yellow">---</td>
              <td className="pl-2">Apartment Buildings</td>
            </tr>
            <tr>
              <td className="bg-gray-400 text-gray-400">---</td>
              <td className="pl-2">Other Buildings</td>
            </tr>
          </tbody>
        </table>
        <Suspense fallback={<p>Loading</p>}>
          <Await resolve={buildings.doors} errorElement={<p>Error</p>}>
            {(doors) => {
              return (
                <table className="table-auto w-full">
                  <caption className="caption-bottom text-sm">
                    *<span className="italic">Source OpenStreetMap as of {doors.downloadedAt}</span>
                  </caption>
                  <thead>
                    <tr>
                      <th colSpan={2} className="text-left">
                        Total Counts*
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border border-slate-700">
                      <td className="px-2 py-1">Single Family Houses</td>
                      <td className="px-2 py-1">
                        {doors.houseCount.toLocaleString("en", {
                          useGrouping: true,
                        })}
                      </td>
                    </tr>
                    <tr className="border-b border-x border-slate-700">
                      <td className="px-2 py-1">Apartment/Condo Units</td>
                      <td className="px-2 py-1">
                        {doors.flatCount.toLocaleString("en", {
                          useGrouping: true,
                        })}
                      </td>
                    </tr>
                    <tr className="border-b border-x border-slate-700">
                      <td className="px-2 py-1">Total Housing Units</td>
                      <td className="px-2 py-1">
                        {(doors.houseCount + doors.flatCount).toLocaleString(
                          "en",
                          {
                            useGrouping: true,
                          }
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              );
            }}
          </Await>
        </Suspense>
      </Legend>
    </MapContainer>
  );
};

export default DoorCount;
