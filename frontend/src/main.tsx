import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import axios from "axios";
import Providers from "./providers.tsx";
import router from "./router.tsx";
import { RouterProvider } from "react-router-dom";

export const BASE_URL = "/api";
axios.defaults.baseURL = BASE_URL;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  </StrictMode>
);
