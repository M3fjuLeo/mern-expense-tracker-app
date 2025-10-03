import CustomLink from "./CustomLink";
import { MdOutlineDashboard } from "react-icons/md";

const Sidebar = () => {
  return (
    <div className="bg-white p-4 min-h-full">
      <ul className="flex flex-col gap-4 w-full">
        <CustomLink to="/dashboard">
          <MdOutlineDashboard /> Dashboard
        </CustomLink>
        <CustomLink to="/income">Income</CustomLink>
        <CustomLink to="/expense">Expense</CustomLink>

        <li>
          <button>Logout</button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
