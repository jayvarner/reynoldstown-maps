import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, defer } from "react-router-dom";
import { fetchDoors } from "./data/buildings";
import DoorCount from "./components/DoorCount";
import "leaflet/dist/leaflet.css";
import "./index.css";

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
  ],
  {
    basename: "/reynoldstown-maps",
  }
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
