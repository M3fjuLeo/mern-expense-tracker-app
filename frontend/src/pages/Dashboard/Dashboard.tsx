import DashboardLayout from "../../components/DashboardLayout";
import Tile from "../../components/tile";
import { CiCreditCard1 } from "react-icons/ci";
import { LuHandCoins, LuWalletMinimal } from "react-icons/lu";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosInstance.get(
        `${API_PATHS.DASHBOARD.GET_DATA}`
      );

      if (response.data) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.log("Something went wrond. Please try again.", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    return () => {};
  }, []);

  console.log(dashboardData);

  return (
    <DashboardLayout>
      <div>
        <div className="flex gap-4 w-full">
          <Tile
            title="Total Balance"
            value={dashboardData?.totalBalance}
            icon={CiCreditCard1}
            color="bg-purple-500"
          />
          <Tile
            title="Total Income"
            value={dashboardData?.totalIncome}
            icon={LuWalletMinimal}
            color="bg-orange-500"
          />
          <Tile
            title="Total Expenses"
            value={dashboardData?.totalExpense}
            icon={LuHandCoins}
            color="bg-red-500"
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
