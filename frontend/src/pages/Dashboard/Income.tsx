import { useState } from "react";
import Modal from "../../components/Modal";
import BarChartComponent from "../../components/BarChartComponent";
import DashboardLayout from "../../components/DashboardLayout";
import { useDashboardData } from "../../hooks/useDashboardData";
import { CiImageOn } from "react-icons/ci";
import Input from "../../components/Input";
import FormButton from "../../components/FormButton";

const Income = () => {
  const { dashboardData, loading } = useDashboardData();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <DashboardLayout>
      <BarChartComponent
        title="Income Overwiew"
        description="Track your earnings over time and analyze your income trades."
        transactions={dashboardData?.last60DaysIncome?.transactions}
        showButton={true}
        onButtonClick={() => setIsModalOpen(true)}
      />

      <Modal
        isOpen={isModalOpen}
        title="Add Income"
        onClose={() => setIsModalOpen(false)}
      >
        <form className="w-full flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <CiImageOn className="text-5xl text-purple-600 cursor-pointer bg-purple-50 p-2 rounded-lg" />
            <h2 className="text-xl">Pick Icon</h2>
          </div>
          <Input
            title="Income Source"
            type="text"
            placeholder="Freelance, Salary, etc."
          />
          <Input title="Amount" type="number" placeholder="$" />
          <Input title="Date" type="date" placeholder="dd/mm/yyyy" />
          <FormButton title="Add Income" />
        </form>
      </Modal>
    </DashboardLayout>
  );
};

export default Income;
