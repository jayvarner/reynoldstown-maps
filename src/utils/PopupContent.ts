import type { GeoJsonProperties } from "geojson";

const PopupContent = ( properties: GeoJsonProperties) => {
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

export default PopupContent;
