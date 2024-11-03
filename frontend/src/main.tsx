import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import axios from "axios";
import Providers from "./providers.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import FrontPage from "./routes/root.tsx";
import Reports from "./routes/reports.tsx";
import NewReport from "./routes/new-report.tsx";
import App from "./App.tsx";

axios.defaults.baseURL = "http://localhost:3000";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <FrontPage />,
      },
      {
        path: "/reports",
        element: <Reports />,
      },
      {
        path: "/new",
        element: <NewReport />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  </StrictMode>
);
