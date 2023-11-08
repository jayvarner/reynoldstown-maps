import type { ReactNode } from "react";

interface Props {
  summary?: string;
  children: ReactNode;
}

const Legend = ({ summary, children }: Props) => {
  return (
    <div className="w-11/12 md:w-1/3 mx-auto leaflet-top leaflet-right">
      <details
        className="leaflet-control leaflet-bar bg-white bg-opacity-70 open:bg-opacity-100 open:ring-1 open:ring-black/5 open:shadow-lg py-2 px-4 md:p-6 rounded-lg cursor-pointer transition-[background-color] duration-700"
        open
      >
        <summary className="md:leading-6 text-base md:text-2xl text-slate-900 font-semibold select-none">
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
