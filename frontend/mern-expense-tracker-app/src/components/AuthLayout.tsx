import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex">
      <div className="w-screen flex-1 h-screen md:w-[60rem] px-20 pt-8 pb-12">
        <h1 className="text-2xl font-medium">Expense Tracker</h1>
        <div className="flex items-center h-full w-full">{children}</div>
      </div>

      <div className="h-screen w-[50rem] hidden lg:block bg-red-500">
        <img
          className="w-full h-full object-cover"
          src="/loginPageImg.png"
          alt=""
        />
      </div>
    </div>
  );
};

export default AuthLayout;
