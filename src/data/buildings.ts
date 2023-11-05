import type { GeoJSON as TGeoJSON } from "geojson";
import osmtogeojson from "osmtogeojson";

const reynoldstown =
  "poly:'33.75993444 -84.34915899 33.75541611 -84.34917278 33.75240739 -84.34921493 33.74806758 -84.34919833 33.74549314 -84.34921015 33.74544737 -84.34972408 33.74503015 -84.35196375 33.74483887 -84.3527831 33.74449594 -84.35406305 33.74412116 -84.35546857 33.7438354 -84.35674299 33.74362074 -84.35819749 33.7434747 -84.35884406 33.74336759 -84.36232078 33.74665515 -84.36227833 33.75247935 -84.36215005 33.75361471 -84.36263325 33.75406445 -84.36002295 33.75436939 -84.35894842 33.75474297 -84.35757809 33.7553025 -84.35605993 33.75586116 -84.35509762 33.75632638 -84.35450569 33.7567607 -84.35387663 33.75762872 -84.35302615 33.75828039 -84.35195282 33.75949023 -84.35021357 33.75993444 -84.34915899'";

const query = (nwr: string) => {
  return encodeURIComponent(`
    [out:json]
    [timeout:90]
    ;
    (
      nwr${nwr}(
        ${reynoldstown}
      );
    );
    out geom;
  `);
};

const getGeoJSON = async (result: Response) => {
  const data = await result.json();
  const geojsonResponse: TGeoJSON = osmtogeojson(data);
  return geojsonResponse;
};

export const fetchApartments = async () => {
  const result = await fetch("https://overpass-api.de/api/interpreter", {
    method: "POST",
    body: `data=${query('["building"="apartments"]')}`,
  });
  return await getGeoJSON(result);
};

export const fetchHouses = async () => {
  const result = await fetch("https://overpass-api.de/api/interpreter", {
    method: "POST",
    body: `data=${query('["building"="house"]')}`,
  });
  return await getGeoJSON(result);
};

export const fetchOtherBuildings = async () => {
  const result = await fetch("https://overpass-api.de/api/interpreter", {
    method: "POST",
    body: `data=${query(
      '["building"~".*"]["building"!="house"]["building"!="apartments"]'
    )}`,
  });
  return await getGeoJSON(result);
};

export const fetchDoors = async () => {
  const houses = await fetchHouses();
  const apartments = await fetchApartments();
  const otherBuildings = await fetchOtherBuildings();
  const flatCount = apartments.features
    .map((building) => {
      if (
        building.properties?.["building:flats"] &&
        !isNaN(parseInt(building.properties["building:flats"]))
      ) {
        return parseInt(building.properties["building:flats"]);
      }
    })
    .reduce((count: number, units) => count + (units || 0), 0);
  const houseCount = houses.features.length;
  return { houses, apartments, otherBuildings, flatCount, houseCount };
};
