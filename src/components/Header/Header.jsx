import { Link, NavLink } from "react-router-dom";
import { LockClosedIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { PersonIcon } from "@radix-ui/react-icons";
import { ModeToggle } from "../ModeToggle";

const Header = () => {
  return (
    <>
      <div className="flex justify-between p-3 items-center">
        <Link to="/">
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            ePathshala
          </h3>
        </Link>
        <div className="flex flex-row justify-center items-center gap-2">
          <NavLink
            to="login"
            className={({ isActive }) => `${isActive ? "hidden" : ""}`}
          >
            <Button>
              <LockClosedIcon className="mr-2 h-4 w-4" /> Login
            </Button>
          </NavLink>

          <NavLink
            to="register"
            className={({ isActive }) => `${isActive ? "hidden" : ""}`}
          >
            <Button>
              <PersonIcon className="mr-2 h-4 w-4" /> Register
            </Button>
          </NavLink>
          <ModeToggle />
        </div>
      </div>
      <Separator />
    </>
  );
};

export default Header;
