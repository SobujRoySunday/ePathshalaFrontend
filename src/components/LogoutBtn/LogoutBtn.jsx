// system imports
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// custom imports
import { authService } from "../../services";
import { logout } from "../../store/authSlice";

const LogoutBtn = ({ className = "", children }) => {
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
          toast.success("Logged out successfully");
          navigate("/");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <button
        onClick={logoutUser}
        className={`${className}`}
        disabled={loading}
      >
        {children}
      </button>
    </>
  );
};

export default LogoutBtn;
