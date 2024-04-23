import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loader } from "../components";
import utilsService from "../services/utils.service";

const HealthCheckProvider = ({ children }) => {
  const [isResponsive, setIsResponsive] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    utilsService
      .healthCheck()
      .then((response) => {
        setIsResponsive(response);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      {/* Toast alerts */}
      <ToastContainer />

      {/* Loading animation while health checking */}
      {loading ? <Loader /> : null}

      {/* All other nested elements */}
      {children}

      {/* Non-responsive backend server */}
      {isResponsive ? null : (
        <div className="bg-red-500 text-white text-center absolute bottom-0 p-2 w-screen">
          Our backend servers are non-responsive right now. Visit us later
        </div>
      )}
    </>
  );
};

export default HealthCheckProvider;
