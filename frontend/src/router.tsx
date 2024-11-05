import { createBrowserRouter } from "react-router-dom";
import FrontPage from "./routes/root.tsx";
import Reports from "./routes/reports.tsx";
import NewReport from "./routes/new-report.tsx";
import App from "./App.tsx";

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

export default router;
