import { useDashboardData } from "../hooks/useDashboardData";
import TransactionCard from "./TransactionCard";
const RecentTransactions = () => {
  const { dashboardData, loading } = useDashboardData();

  return (
    <div className="bg-white rounded-lg flex-2 p-6">
      <div className="flex justify-between mb-8">
        <h1 className="text-xl font-medium">Recent Transactions</h1>
        <button>See All</button>
      </div>

      <div className="">
        {loading ? (
          <p className="">Loading...</p>
        ) : (
          <div className="flex flex-col gap-4">
            {dashboardData?.recentTransactions?.length ? (
              dashboardData.recentTransactions
                .slice(0, 5)
                .map((txn) => (
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
        )}
      </div>
    </div>
  );
};

export default RecentTransactions;
