/* 
|*************************************|
|               Imports               |
|*************************************|
*/

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

// Custom imports
import "./index.css";
import { EducatorDashboard, Home, StudentDashboard } from "./pages";
import { HealthCheckProvider, AuthProvider } from "./layouts";
import store from "./store/store";

/* 
|*************************************|
|           Initialization            |
|*************************************|
*/

// I made the withCredential option true as default as I'll have many queries which needs authentication
axios.defaults.withCredentials = true;

// Complete routes library
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path="/"
        element={
          <AuthProvider isAuthRequired={false}>
            <Home />
          </AuthProvider>
        }
      />
      <Route
        path="/dashboard/educator"
        element={
          <AuthProvider isAuthRequired={"EDUCATOR"}>
            <EducatorDashboard />
          </AuthProvider>
        }
      />
      <Route
        path="/dashboard/student"
        element={
          <AuthProvider isAuthRequired={"STUDENT"}>
            <StudentDashboard />
          </AuthProvider>
        }
      />
    </>
  )
);

/* 
|*************************************|
|             Rendering               |
|*************************************|
*/
ReactDOM.createRoot(document.getElementById("root")).render(
  <HealthCheckProvider>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </HealthCheckProvider>
);
