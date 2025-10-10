import { useEffect, useState } from "react";
import { API_PATHS } from "../utils/apiPaths";
import axiosInstance from "../utils/axiosInstance";
import TransactionCard from "./TransactionCard";
const RecentTransactions = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );
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
    <div className="bg-white rounded-lg flex-2 p-6">
      <div className="flex justify-between mb-8">
        <h1 className="text-xl font-medium">Recent Transactions</h1>
        <button>See All</button>
      </div>

      <div className="flex flex-col gap-4">
        {dashboardData?.recentTransactions?.length ? (
          dashboardData.recentTransactions.map((txn) => (
            <TransactionCard
              key={txn._id}
              title={txn.title}
              date={txn.date}
              amount={txn.amount}
              type={txn.type}
              icon={txn.icon}
            />
          ))
        ) : (
          <p className="text-gray-500">No recent transactions found.</p>
        )}
      </div>
    </div>
  );
};

export default RecentTransactions;
