import CustomLink from "./CustomLink";
import { MdOutlineDashboard } from "react-icons/md";
import { LuHandCoins, LuWalletMinimal } from "react-icons/lu";
import { IoIosLogOut } from "react-icons/io";
import { UserContext } from "../context/UserContext";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CiUser } from "react-icons/ci";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

const Sidebar = () => {
  const userContext = useContext(UserContext);

  // jeśli kontekst jeszcze się nie załadował → nie renderujemy UI
  if (!userContext) return null;

  const { user, updateUser, clearUser } = userContext;
  const navigate = useNavigate();

  const handleLogout = () => {
    clearUser();
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || user) return;

    const fetchUserInfo = async () => {
      try {
        const res = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO);
        if (res.data && res.data.user) {
          updateUser({
            id: res.data.user._id,
            email: res.data.user.email,
            fullName: res.data.user.fullName,
            avatar: res.data.user.avatar,
          });
        }
      } catch (error) {
        console.log("Failed to download user data: ", error);
      }
    };

    fetchUserInfo();
  }, [user, updateUser]);

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
