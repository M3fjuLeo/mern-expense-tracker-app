import { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import ExpenseOverview from "../../components/ExpenseOverview";
import Modal from "../../components/Modal";
import { useDashboardData } from "../../hooks/useDashboardData";

const Expense = () => {
  const { dashboardData, loading } = useDashboardData();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <DashboardLayout>
      <ExpenseOverview
        title="Expense Overview"
        description="Track your spending trends over time and gains insights into where your money goes."
        transactions={dashboardData?.last30DaysExpenses?.transactions}
        showButton={true}
        onButtonClick={() => setIsModalOpen(true)}
        buttonText="Add Expense"
      />

      <Modal
        isOpen={isModalOpen}
        title="Add Expense"
        onClose={() => setIsModalOpen(false)}
      ></Modal>
    </DashboardLayout>
  );
};

export default Expense;
