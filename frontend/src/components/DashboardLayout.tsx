import { ReactNode } from "react";
import { useUserAuth } from "../hooks/useUserAuth";
import Sidebar from "./Sidebar";

type DashboardLayoutProps = {
  children: ReactNode;
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  useUserAuth();
  return (
    <div className="h-screen overflow-hidden">
      <div className="w-full h-full">
        <div className="w-full p-4 border-b bg-white border-b-gray-200">
          <h1 className="text-2xl font-medium">Expense Tracker</h1>
        </div>
        <div className="flex h-full">
          <Sidebar />
          <div className="w-full h-full p-8 pb-24 overflow-scroll">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
