import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, defer } from "react-router-dom";
import { fetchDoors } from "./data/buildings";
import DoorCount from "./components/DoorCount";
import "leaflet/dist/leaflet.css";
import "./index.css";
import DoorCount1928 from "./components/DoorCount1928";

const doorCountLoader = async () => {
  const doors = fetchDoors();
  return defer({doors});
};

const router = createBrowserRouter(
  [
    {
      path: "/",
      loader: doorCountLoader,
      element: <DoorCount />,
    },
    {
      path: "/doors/present",
      loader: doorCountLoader,
      element: <DoorCount />,
    },
    {
      path: "/doors/1928",
      element: <DoorCount1928 />,
    },
  ],
  {
    basename: "/reynoldstown-maps/",
  }
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
