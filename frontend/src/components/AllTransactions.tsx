import TransactionCard from "./TransactionCard";
import { FiDownload } from "react-icons/fi";

const AllTransactions = ({ title, loading, data, downloadData }) => {
  const handleDelete = async (id, type) => {
    try {
      const endpoint =
        type === "expense"
          ? API_PATHS.EXPENSE.DELETE_EXPENSE(id)
          : API_PATHS.INCOME.DELETE_INCOME(id);

      await axiosInstance.delete(endpoint);

      if (refresh) refresh();
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
                  onDelete={handleDelete}
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
