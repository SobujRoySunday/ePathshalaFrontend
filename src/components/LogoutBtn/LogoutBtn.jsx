// system imports
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// custom imports
import { Button, Loader } from "../";
import { authService } from "../../services";
import { logout } from "../../store/authSlice";

const LogoutBtn = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutUser = () => {
    setLoading(true);

    authService
      .logout()
      .then((response) => {
        if (response === 500) {
          toast.error("Something went wrong while logging you out");
        } else if (response === null) {
          toast.error("Something went wrong");
        } else {
          dispatch(logout());
          navigate("/");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Button onClick={logoutUser} className="bg-red-500">
        {children}
      </Button>
      {loading ? <Loader /> : null}
    </>
  );
};

export default LogoutBtn;
