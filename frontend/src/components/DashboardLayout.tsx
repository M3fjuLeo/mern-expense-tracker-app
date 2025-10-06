import { useUserAuth } from "../hooks/useUserAuth";
import Sidebar from "./Sidebar";

const DashboardLayout = ({ children }) => {
  useUserAuth();
  return (
    <div className="h-screen overflow-hidden">
      <div className="w-full h-full">
        <div className="w-full p-4 border-b bg-white border-b-gray-200">
          <h1 className="text-2xl font-medium">Expense Tracker</h1>
        </div>
        <div className="flex h-full">
          <Sidebar />
          <div className="w-full h-full bg-red-50">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
