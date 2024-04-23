// system imports
import { useState } from "react";
import { toast } from "react-toastify";

// custom imports
import StudyingVector from "../../assets/studying.png";
import { Button, FileInput, Input, Loader } from "../../components";
import { helperMail } from "../../conf/conf";
import { authService } from "../../services";

const Register = ({ setRegister, setLogin }) => {
  // state to display the loading animation
  const [loading, setLoading] = useState(false);

  // state to maintain register form data
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
    rePassword: "",
    avatar: null,
  });

  // function to handle changes in input field
  const handleChange = (event) => {
    setFormData((previousFormData) => {
      const { name, value, type, files } = event.target;
      if (type === "file") {
        // if its a file
        return {
          ...previousFormData,
          [name]: files[0],
        };
      } else {
        // if its a any other text based fields
        return {
          ...previousFormData,
          [name]: value,
        };
      }
    });
  };

  // function to register the user
  const registerUser = (event) => {
    // prevent the reload of page
    event.preventDefault();

    // start loading animation
    setLoading(true);

    // register using auth service
    authService
      .createAccount(formData)
      .then((response) => {
        // Showing toast alert depending on the response content
        if (response === 400) {
          toast.error("Passwords didn't match");
        } else if (response === 409) {
          toast.error("User with that email or username already exists");
        } else if (response === 500) {
          toast.error("Something went wrong while registering your account");
        } else if (response === null) {
          toast.error("Something went wrong");
        } else {
          toast.success("Your account has been registered");
          // clear input fields
          setFormData({
            fullName: "",
            email: "",
            username: "",
            password: "",
            rePassword: "",
            avatar: null,
          });
        }
      })
      .finally(() => {
        // stop loading animation
        setLoading(false);
      });
  };

  return (
    <>
      <div className="bg-[#00000088] absolute top-0 left-0 w-screen h-screen flex justify-center items-center">
        {/* Container */}
        <div className="flex flex-row rounded-lg">
          {/* illustration */}
          <div className="max-w-[36rem]">
            <img
              src={StudyingVector}
              className="rounded-l-lg h-full brightness-[.80]"
              alt="a boy studying image"
            />
          </div>

          {/* Form starts here */}
          <form
            onSubmit={registerUser}
            className="flex flex-col w-96 gap-5 bg-white rounded-r-lg shadow-lg relative"
          >
            <div className="flex flex-col p-10 gap-5">
              {/* Header */}
              <div className="flex flex-col gap-1">
                <h2 className="text-4xl font-semibold">Sign up</h2>
                <p>
                  or{" "}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setLogin(true);
                      setRegister(false);
                    }}
                    className="underline"
                  >
                    already have an account?
                  </button>
                </p>
              </div>

              {/* Input fields */}
              <div className="flex flex-col gap-3">
                <Input
                  placeholder="Enter your full name"
                  label="Fullname:"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                />
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  label="Email:"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
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
                <Input
                  type="password"
                  placeholder="Re-type your password"
                  label="Confirm Password:"
                  name="rePassword"
                  value={formData.rePassword}
                  onChange={handleChange}
                />
                <FileInput
                  label="Profile Picture:"
                  accept="image/jpeg, image/png, image/gif"
                  name="avatar"
                  onChange={handleChange}
                />
              </div>
              <Button>Create account</Button>
            </div>

            {/* Contact details */}
            <p className="text-center text-xs py-5">
              Facing problems? Reach us on{" "}
              <a className="underline" href={`mailto:${helperMail}`}>
                {helperMail}
              </a>
            </p>

            {/* button to close the sign up box */}
            <button
              className="absolute top-3 right-10 text-2xl font-semibold"
              onClick={(e) => {
                e.preventDefault();
                setRegister(false);
              }}
            >
              x
            </button>
          </form>
        </div>
      </div>

      {/* conditionally rendered loader animation */}
      {loading ? <Loader /> : null}
    </>
  );
};

export default Register;
