/* 
|*************************************|
|               Imports               |
|*************************************|
*/

// System imports
import { useSelector } from "react-redux";

// Custom imports
import LogoutIcon from "../../assets/logout.png";
import AddIcon from "../../assets/plus-symbol-button.png";
import StreamIcon from "../../assets/live.png";
import { LogoutBtn } from "../../components";
import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [userBox, setUserBox] = useState(false);
  const currentUser = useSelector((state) => state.userData);

  return (
    <>
      {/* Header/navigation */}
      <header className="relative">
        <nav className="flex justify-between items-center p-2">
          <h1 className="text-2xl font-semibold italic">EdPanel</h1>
          <div className="flex items-center gap-4">
            <Link className="transition hover:scale-125">
              <img
                src={StreamIcon}
                alt="stream button icon"
                width={20}
                height={20}
              />
            </Link>
            <Link className="transition hover:scale-125">
              <img src={AddIcon} alt="add button icon" width={20} height={20} />
            </Link>
            <LogoutBtn className="transition hover:scale-125">
              <img
                src={LogoutIcon}
                alt="Logout button icon"
                width={20}
                height={20}
              />
            </LogoutBtn>
            <button
              onClick={() => {
                setUserBox(!userBox);
                console.log(userBox);
              }}
              className="transition hover:scale-90"
            >
              <img
                src={currentUser?.avatar}
                alt="current user avatar"
                className="rounded-full"
                width={50}
                height={50}
              />
            </button>
          </div>
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
