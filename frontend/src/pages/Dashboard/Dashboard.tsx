import DashboardLayout from "../../components/DashboardLayout";
import Tile from "../../components/tile";
import { CiCreditCard1 } from "react-icons/ci";
import { LuHandCoins, LuWalletMinimal } from "react-icons/lu";
import { useDashboardData } from "../../hooks/useDashboardData";
import TransactionsList from "../../components/TransactionsList";
import BarChartComponent from "../../components/BarChartComponent";
import PieChartComponent from "../../components/PieChartComponent";

const Dashboard = () => {
  const { data: dashboardData, isLoading } = useDashboardData();

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
            loading={isLoading}
            title="Recent Transactions"
          />
          <PieChartComponent
            title="Financial Overwiew"
            loading={isLoading}
            data={[
              { name: "Total Balance", value: dashboardData?.totalBalance },
              { name: "Total Expenses", value: dashboardData?.totalExpense },
              { name: "Total Income", value: dashboardData?.totalIncome },
            ]}
            colors={["#6D28D9", "#DC2626", "#F97316"]}
            centerLabel="Total Balance"
            centerValue={`${dashboardData?.totalBalance ?? 0}`}
          />
        </div>

        <div className="flex gap-8">
          <TransactionsList
            data={dashboardData?.recentExpenses}
            loading={isLoading}
            title="Expenses"
            to="/expense"
          />
          <BarChartComponent
            title="Last 30 Days Expenses"
            transactions={dashboardData?.last30DaysExpenses?.transactions}
          />
        </div>

        <div className="flex gap-8">
          <PieChartComponent
            title="Last 60 Days Income"
            loading={isLoading}
            data={
              dashboardData?.last60DaysIncome?.byTitle.map((item) => ({
                name: item._id,
                value: item.total,
              })) ?? []
            }
            centerLabel="Total Income"
            centerValue={dashboardData?.last60DaysIncome?.total ?? 0}
          />

          <TransactionsList
            data={dashboardData?.recentIncomes}
            loading={isLoading}
            title="Last 60 Days Income"
            to="/income"
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
