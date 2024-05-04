// system imports
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from "../../store/authSlice";

// custom imports
import Books from "../../assets/books.png";
import { Button, Input, Loader } from "../../components";
import { helperMail } from "../../conf/conf";
import { authService } from "../../services";

const Login = ({ setLogin, setRegister }) => {
  // user credentials
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  // loader animation state
  const [loading, setLoading] = useState(false);

  // navigator
  const navigate = useNavigate();

  // dispatcher
  const dispatch = useDispatch();

  // handling the inputs for input fields
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      return { ...prevFormData, [name]: value };
    });
  };

  const loginUser = (e) => {
    // prevent reloading of the page
    e.preventDefault();

    // start loading animation
    setLoading(true);

    // authenticating
    authService
      .login(formData)
      .then((response) => {
        if (response === 404) {
          toast.error("User doesn't exists");
        } else if (response === 401) {
          toast.error("Wrong password");
        } else if (response === 500) {
          toast.error("Something went wrong while logging you in");
        } else if (response === null) {
          toast.error("Something went wrong");
        } else {
          toast.success("Login successful");
          dispatch(login({ userData: response }));
          setFormData({ username: "", password: "" });
          console.log(`/dashboard/${response.userRole.toLowerCase()}`);
          navigate(`/dashboard/${response.userRole.toLowerCase()}`);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <div className="bg-[#00000088] absolute top-0 left-0 w-screen h-screen flex justify-center items-center">
        <form
          onSubmit={loginUser}
          className="flex flex-col w-96 bg-white rounded-lg shadow-lg relative"
        >
          {/* Top image illustration */}
          <img src={Books} alt="books image" className="rounded-t-lg" />

          {/* Actual Form */}
          <div className="flex flex-col px-10 pb-10 pt-5 gap-5">
            {/* Header */}
            <div className="text-sm flex flex-col gap-2">
              <h2 className="text-4xl font-semibold">Log in</h2>
              <p>
                or{" "}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setRegister(true);
                    setLogin(false);
                  }}
                  className="underline"
                >
                  create a free account
                </button>
              </p>
            </div>

            {/* Input fields */}
            <div className="flex flex-col gap-3">
              <Input
                placeholder="Enter your username"
                label="Username:"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
              <Input
                type="password"
                placeholder="Enter your password"
                label="Password:"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <Button>Login</Button>
          </div>

          {/* Contact details */}
          <p className="text-center text-xs py-5">
            Facing problems? Reach us on{" "}
            <a className="underline" href={`mailto:${helperMail}`}>
              {helperMail}
            </a>
          </p>

          {/* Login box closing button */}
          <button
            className="absolute top-3 right-10 text-2xl font-semibold"
            onClick={(e) => {
              e.preventDefault();
              setLogin(false);
            }}
          >
            x
          </button>
        </form>
      </div>

      {/* loader animation component conditionally rendered */}
      {loading ? <Loader /> : null}
    </>
  );
};

export default Login;
