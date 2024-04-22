import axios from "axios";
import { useEffect, useState } from "react";
import { backendURL } from "../conf/conf";

const HealthCheckProvider = ({ children }) => {
  const [isResponsive, setIsResponsive] = useState(true);

  useEffect(() => {
    axios
      .get(`${backendURL}/health-check`)
      .then((response) => {
        setIsResponsive(true);
        console.log(response);
      })
      .catch((error) => {
        setIsResponsive(false);
        console.log(error);
      });
  });

  return (
    <>
      {children}
      {isResponsive ? null : (
        <div className="bg-red-500 text-white text-center absolute bottom-0 p-2 w-screen">
          Our backend servers are non-responsive right now. Visit us later
        </div>
      )}
    </>
  );
};

export default HealthCheckProvider;
