import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

import "./index.css";
import { Home } from "./pages";

const router = createBrowserRouter(
  createRoutesFromElements(<Route path="" element={<Home />} />)
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
