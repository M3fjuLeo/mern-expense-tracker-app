import TransactionCard from "./TransactionCard";
import { FiDownload } from "react-icons/fi";
import { useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

const AllTransactions = ({ title, loading, data, downloadData }) => {
  const queryClient = useQueryClient();

  const handleDelete = async (id, type) => {
    try {
      const endpoint =
        type === "expense"
          ? API_PATHS.EXPENSE.DELETE_EXPENSE(id)
          : API_PATHS.INCOME.DELETE_INCOME(id);

      await axiosInstance.delete(endpoint);
      await queryClient.invalidateQueries(["dashboard"]);
    } catch (error) {
      console.log("Error deleting transaction: ", error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow flex-2 p-6 mt-6">
      <div className="flex justify-between mb-8">
        <h1 className="text-xl font-medium">{title}</h1>
        <button
          onClick={downloadData}
          className="bg-gray-50 flex items-center gap-2 hover:bg-purple-50 duration-100 hover:text-purple-600 px-4 py-1 border cursor-pointer border-gray-200 rounded-lg"
        >
          <FiDownload />
          Download
        </button>
      </div>

      <div className="">
        {loading ? (
          <p className="">Loading...</p>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {data?.length ? (
              data.map((txn) => (
                <TransactionCard
                  removable
                  onDelete={() => handleDelete(txn._id, txn.type)}
                  id={txn._id}
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

export default AllTransactions;
