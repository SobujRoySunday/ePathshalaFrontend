import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

import "./index.css";
import { Home } from "./pages";
import { HealthCheckProvider } from "./layouts";

const router = createBrowserRouter(
  createRoutesFromElements(<Route path="" element={<Home />} />)
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <HealthCheckProvider>
    <RouterProvider router={router} />
  </HealthCheckProvider>
);
