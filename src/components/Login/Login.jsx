/* eslint-disable react/prop-types */
import { Button, Input } from "../../components";
import Books from "../../assets/books.png";
import { helperMail } from "../../conf/conf";

const Login = ({ setLogin, setRegister }) => {
  return (
    <div className="bg-[#00000088] absolute top-0 left-0 w-screen h-screen flex justify-center items-center">
      <form className="flex flex-col w-96 bg-white rounded-lg shadow-lg relative">
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
            <Input placeholder="Enter your username" label="Username:" />
            <Input
              type="password"
              placeholder="Enter your password"
              label="Password:"
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
  );
};

export default Login;
