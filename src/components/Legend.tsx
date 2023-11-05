import type { ReactNode } from "react";

interface Props {
  summary?: string
  children: ReactNode;
}

const Legend = ({ summary, children }: Props) => {
  return (
    <div className="w-1/3 mx-auto p-8 leaflet-top leaflet-right">
      <details
        className="leaflet-control leaflet-bar w-3/4 bg-white bg-opacity-70 open:bg-opacity-90 open:ring-1 open:ring-black/5 open:shadow-lg p-6 rounded-lg"
        open
      >
        <summary className="leading-6 text-2xl text-slate-900 font-semibold select-none">
          {summary ?? "Legend"}
        </summary>
        <div className="mt-3 text-lg leading-6 text-slate-600 pointer-events-none w-full">
          {children}
        </div>
      </details>
    </div>
  );
};

export default Legend;
