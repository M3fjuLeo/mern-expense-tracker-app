import CustomLink from "./CustomLink";
import { MdOutlineDashboard } from "react-icons/md";
import { LuHandCoins, LuWalletMinimal } from "react-icons/lu";
import { IoIosLogOut } from "react-icons/io";
import { UserContext } from "../context/userContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CiUser } from "react-icons/ci";

const Sidebar = () => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    clearUser();
    navigate("/login");
  };

  return (
    <div className="bg-white p-8 min-h-full flex flex-col gap-8">
      <div className="items-center flex flex-col gap-2">
        <CiUser className="text-6xl text-white bg-purple-400 rounded-full p-2" />
        <h1 className="text-lg font-medium">{user?.fullName}</h1>
      </div>
      <ul className="flex flex-col gap-4 w-full">
        <CustomLink to="/dashboard">
          <MdOutlineDashboard /> Dashboard
        </CustomLink>
        <CustomLink to="/income">
          <LuWalletMinimal />
          Income
        </CustomLink>
        <CustomLink to="/expense">
          <LuHandCoins />
          Expense
        </CustomLink>

        <button
          onClick={handleLogout}
          className="text-lg flex items-center gap-4 w-full py-2 px-8 rounded-md transition-colors cursor-pointer hover:bg-purple-500 hover:text-white"
        >
          <IoIosLogOut />
          Logout
        </button>
      </ul>
    </div>
  );
};

export default Sidebar;
