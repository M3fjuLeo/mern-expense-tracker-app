import { Link } from "react-router-dom";

const CustomLink = ({ children, to }) => {
  return (
    <li className="w-full">
      <Link
        to={to}
        className="hover:bg-purple-400 text-lg hover:text-white flex items-center gap-4 w-full p-2"
      >
        {children}
      </Link>
    </li>
  );
};

export default CustomLink;
