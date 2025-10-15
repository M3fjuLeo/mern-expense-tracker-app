import DashboardLayout from "../../components/DashboardLayout";
import Tile from "../../components/tile";
import { CiCreditCard1 } from "react-icons/ci";
import { LuHandCoins, LuWalletMinimal } from "react-icons/lu";
import FinancialOverview from "../../components/FinancialOverview";
import { useDashboardData } from "../../hooks/useDashboardData";
import TransactionsList from "../../components/TransactionsList";

const Dashboard = () => {
  const { dashboardData, loading } = useDashboardData();

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        <div className="flex gap-4 w-full">
          <Tile
            title="Total Balance"
            value={dashboardData?.totalBalance ?? 0}
            icon={CiCreditCard1}
            color="bg-purple-500"
          />
          <Tile
            title="Total Income"
            value={dashboardData?.totalIncome ?? 0}
            icon={LuWalletMinimal}
            color="bg-orange-500"
          />
          <Tile
            title="Total Expenses"
            value={dashboardData?.totalExpense ?? 0}
            icon={LuHandCoins}
            color="bg-red-500"
          />
        </div>

        <div className="flex gap-8">
          <TransactionsList
            data={dashboardData?.recentTransactions}
            loading={loading}
            title="Recent Transactions"
          />
          <FinancialOverview />
        </div>

        <div>
          <TransactionsList
            data={dashboardData?.recentExpenses}
            loading={loading}
            title="Expenses"
          />
          <FinancialOverview />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
