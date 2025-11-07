import EmojiPicker from "emoji-picker-react";
import { useState } from "react";
import { CiImageOn } from "react-icons/ci";
import AllTransactions from "../../components/AllTransactions";
import DashboardLayout from "../../components/DashboardLayout";
import ExpenseOverview from "../../components/ExpenseOverview";
import FormButton from "../../components/FormButton";
import Input from "../../components/Input";
import Modal from "../../components/Modal";
import { useDashboardData } from "../../hooks/useDashboardData";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosInstance";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const Expense = () => {
  const { data: dashboardData, isLoading } = useDashboardData();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const [icon, setIcon] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [date, setDate] = useState<string>("");

  const queryClient = useQueryClient();

  const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!title || !amount || !date) {
      alert("All fields are required!");
      return;
    }

    try {
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        icon,
        title,
        amount: parseFloat(amount),
        date,
      });

      toast.success("Expense was added successfully");

      setIcon(null);
      setTitle("");
      setAmount("");
      setDate("");

      await queryClient.invalidateQueries({ queryKey: ["dashboard"] });

      setIsModalOpen(false);
    } catch (error) {
      console.log("Error adding income: ", error);
    }
  };

  const downloadData = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.get(
        API_PATHS.EXPENSE.DOWNLOAD_EXPENSE,
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "expense_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.log("Error downloading expense: ", error);
    }
  };

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
            title="Category"
            type="text"
            placeholder="Rent, Groceries, etc."
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
          <FormButton title="Add Expense" />
        </form>
      </Modal>

      <AllTransactions
        title="All Expanses"
        loading={isLoading}
        data={dashboardData?.last30DaysExpenses?.transactions ?? []}
        downloadData={downloadData}
      />
    </DashboardLayout>
  );
};

export default Expense;
