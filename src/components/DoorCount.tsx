import { useRef, Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";
import { GeoJSON, useMap } from "react-leaflet";
import Legend from "./Legend";
import BaseMap from "./BaseMap";
import PopupContent from "../utils/PopupContent";
import type { FeatureCollection, Feature } from "geojson";
import type { Layer } from "leaflet";

const MapRef = () => {
  const map = useMap();
  map.setMaxZoom(20);
  return null;
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
    <BaseMap>
      <Suspense
        fallback={
          <p className="flex items-center justify-center absolute w-screen h-screen text-4xl z-[99999] text-center">
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
      <Legend summary="Door Count">
        <table className="table-auto mb-4 hidden md:block" airi-role="legend">
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
              <td className="pl-2">Apartment/Condo Buildings</td>
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
                  <caption className="caption-bottom text-xs md:text-sm mt-2 md:mt-0">
                    *
                    <span className="italic">
                      Source OpenStreetMap as of {doors.downloadedAt}
                    </span>
                  </caption>
                  <thead>
                    <tr>
                      <th colSpan={2} className="text-left text-sm md:text-base">
                        Total Counts*
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border border-slate-700 hidden md:block">
                      <td className="px-2 py-1">Single Family Houses</td>
                      <td className="px-2 py-1">
                        {doors.houseCount.toLocaleString("en", {
                          useGrouping: true,
                        })}
                      </td>
                    </tr>
                    <tr className="border-b border-x border-slate-700 hidden md:block">
                      <td className="px-2 py-1">Apartment/Condo Units</td>
                      <td className="px-2 py-1">
                        {doors.flatCount.toLocaleString("en", {
                          useGrouping: true,
                        })}
                      </td>
                    </tr>
                    <tr className="border-b border-x border-slate-700 hidden md:block">
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
                    <tr className="text-white bg-rtown-blue md:hidden text-sm">
                      <td className="px-2">
                        Single Family
                      </td>
                      <td className="px-2">
                        {doors.houseCount.toLocaleString()}
                      </td>
                    </tr>
                    <tr className="md:hidden bg-rtown-yellow text-sm text-black">
                      <td className="px-2">
                          Apartment/Condo Units
                      </td>
                      <td className="px-2">
                        {doors.flatCount.toLocaleString()}
                      </td>
                    </tr>
                    <tr className="md:hidden text-sm font-semibold">
                      <td className="px-2">
                        Total
                      </td>
                      <td className="px-2">
                        {(doors.houseCount + doors.flatCount).toLocaleString()}
                      </td>
                    </tr>
                  </tbody>
                </table>
              );
            }}
          </Await>
        </Suspense>
      </Legend>
    </BaseMap>
  );
};

export default DoorCount;
