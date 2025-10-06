import { NavLink } from "react-router-dom";

const CustomLink = ({ children, to }) => {
  return (
    <li className="w-full">
      <NavLink
        to={to}
        className={({ isActive }) =>
          `text-lg flex items-center gap-4 w-full py-2 px-8 rounded-md transition-colors ${
            isActive
              ? "bg-purple-500 text-white"
              : "hover:bg-purple-500 hover:text-white text-gray-700"
          }`
        }
      >
        {children}
      </NavLink>
    </li>
  );
};

export default CustomLink;
