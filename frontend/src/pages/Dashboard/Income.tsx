import { useState } from "react";
import Modal from "../../components/Modal";
import BarChartComponent from "../../components/BarChartComponent";
import DashboardLayout from "../../components/DashboardLayout";
import { useDashboardData } from "../../hooks/useDashboardData";
import { CiImageOn } from "react-icons/ci";
import Input from "../../components/Input";
import FormButton from "../../components/FormButton";
import EmojiPicker from "emoji-picker-react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import IncomeSources from "../../components/IncomeSources";

const Income = () => {
  const { dashboardData, loading } = useDashboardData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [icon, setIcon] = useState(null);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!title || !amount || !date) {
      alert("All fields are required!");
      return;
    }

    try {
      const response = await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
        icon,
        title,
        amount: parseFloat(amount),
        date,
      });

      console.log("Income added: ", response.data);

      setIcon(null);
      setTitle("");
      setAmount("");
      setDate("");

      setIsModalOpen(false);
    } catch (error) {
      console.log("Error adding income: ", error);
    }
  };

  const downloadData = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.get(
        API_PATHS.INCOME.DOWNLOAD_INCOME,
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "income_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.log("Error downloading income: ", error);
    }
  };

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
        <form onSubmit={onSubmit} className="w-full flex flex-col gap-6">
          {icon ? (
            <div
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="flex items-center gap-2 cursor-pointer"
            >
              <span className="text-5xl text-purple-600 cursor-pointer bg-purple-50 p-2 rounded-lg">
                {icon}
              </span>
              <h2 className="text-xl">Change Icon</h2>
            </div>
          ) : (
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            >
              <CiImageOn className="text-5xl text-purple-600 cursor-pointer bg-purple-50 p-2 rounded-lg" />
              <h2 className="text-xl">Pick Icon</h2>
            </div>
          )}
          {showEmojiPicker && (
            <div className="absolute top-20 left-20 z-50">
              <EmojiPicker
                onEmojiClick={(emojiData) => {
                  setIcon(emojiData.emoji);
                  setShowEmojiPicker(false);
                }}
              />
            </div>
          )}
          <Input
            title="Income Source"
            type="text"
            placeholder="Freelance, Salary, etc."
            value={title}
            onChange={setTitle}
          />
          <Input
            title="Amount"
            type="number"
            placeholder="$"
            value={amount}
            onChange={setAmount}
          />
          <Input
            title="Date"
            type="date"
            placeholder="dd/mm/yyyy"
            value={date}
            onChange={setDate}
          />
          <FormButton title="Add Income" />
        </form>
      </Modal>

      <IncomeSources
        title="Income Sources"
        loading={loading}
        data={dashboardData?.last60DaysIncome?.transactions ?? []}
        downloadData={downloadData}
      />
    </DashboardLayout>
  );
};

export default Income;
