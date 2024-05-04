import { useSelector } from "react-redux";

import { Button, LogoutBtn } from "../../components";
import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [userBox, setUserBox] = useState(false);
  const currentUser = useSelector((state) => state.userData);
  // console.log(currentUser);

  return (
    <>
      {/* Header/navigation */}
      <header className="relative">
        <nav className="flex justify-between items-center py-3">
          <h1 className="text-2xl font-semibold italic">EdPanel</h1>
          <ul className="flex gap-3 items-center">
            <li>
              <Button>Go Live</Button>
            </li>
            <li>
              <Button>Add</Button>
            </li>
            <li>
              <LogoutBtn>Logout</LogoutBtn>
            </li>
            <li>
              <button
                onClick={() => {
                  setUserBox(!userBox);
                  console.log(userBox);
                }}
              >
                <img
                  src={currentUser?.avatar}
                  alt="current user avatar"
                  className="w-12 rounded-full"
                />
              </button>
            </li>
          </ul>
        </nav>
        <hr />
        {/* User Box */}
        {userBox ? (
          <div className="absolute top-16 right-0 w-96 p-10 shadow-xl rounded flex flex-col bg-gray-100">
            <Link
              to={`/profile/${currentUser?.username}`}
              className="flex flex-col"
            >
              <h2 className="text-2xl font-semibold">
                Hi!{" "}
                <span className="text-blue-500">{currentUser?.fullName}</span>
              </h2>
              <p>View Profile Details</p>
            </Link>
          </div>
        ) : null}
      </header>
    </>
  );
};

export default Header;
