// System imports
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import { Provider } from "react-redux";
import axios from "axios";

// custom imports
import "./index.css";
import { Home } from "./pages";
import { HealthCheckProvider } from "./layouts";
import store from "./store/store";

// initialization
axios.defaults.withCredentials = true;
const router = createBrowserRouter(
  createRoutesFromElements(<Route path="" element={<Home />} />)
);

// rendering
ReactDOM.createRoot(document.getElementById("root")).render(
  <HealthCheckProvider>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </HealthCheckProvider>
);
