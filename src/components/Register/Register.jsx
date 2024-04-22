/* eslint-disable react/prop-types */
import { Button, FileInput, Input } from "../../components";
import StudyingVector from "../../assets/studying.png";
import { helperMail } from "../../conf/conf";

const Register = ({ setRegister, setLogin }) => {
  return (
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
        <form className="flex flex-col w-96 gap-5 bg-white rounded-r-lg shadow-lg relative">
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
              <Input placeholder="Enter your full name" label="Fullname:" />
              <Input
                type="email"
                placeholder="Enter your email address"
                label="Email:"
              />
              <Input placeholder="Enter your username" label="Username:" />
              <Input
                type="password"
                placeholder="Enter your password"
                label="Password:"
              />
              <Input
                type="password"
                placeholder="Re-type your password"
                label="Confirm Password:"
              />
              <FileInput
                label="Profile Picture:"
                accept="image/jpeg, image/png, image/gif"
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
  );
};

export default Register;
