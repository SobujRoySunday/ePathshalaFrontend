// system import
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// custom imports
import { Loader } from "../components";

const AuthProvider = ({ children, isAuthRequired }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const authStatus = useSelector((state) => state.status);
  const userData = useSelector((state) => state.userData);

  useEffect(() => {
    // redirect logic
    if (!authStatus && isAuthRequired) {
      navigate("/");
    } else if (
      authStatus &&
      userData?.userRole == "STUDENT" &&
      isAuthRequired === "EDUCATOR"
    ) {
      navigate(`/dashboard/student`);
    } else if (
      authStatus &&
      userData?.userRole == "EDUCATOR" &&
      isAuthRequired === "STUDENT"
    ) {
      navigate(`/dashboard/educator`);
    } else if (authStatus && userData && !isAuthRequired) {
      navigate(`/dashboard/${userData?.userRole.toLowerCase()}`);
    }
    setLoading(false);
  }, [navigate, authStatus, userData, isAuthRequired]);

  return loading ? <Loader /> : children;
};

export default AuthProvider;
