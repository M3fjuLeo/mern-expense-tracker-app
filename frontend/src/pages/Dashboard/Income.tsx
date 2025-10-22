import BarChartComponent from "../../components/BarChartComponent";
import DashboardLayout from "../../components/DashboardLayout";
import { useDashboardData } from "../../hooks/useDashboardData";

const Income = () => {
  const { dashboardData, loading } = useDashboardData();

  return (
    <DashboardLayout>
      <BarChartComponent
        title="Income Overwiew"
        description="Track your earnings over time and analyze your income trades."
        transactions={dashboardData?.last60DaysIncome?.transactions}
      />
    </DashboardLayout>
  );
};

export default Income;
