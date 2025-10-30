import TransactionCard from "./TransactionCard";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const TransactionsList = ({ data, title, loading, to }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg shadow flex-2 p-6">
      <div className="flex justify-between mb-8">
        <h1 className="text-xl font-medium">{title}</h1>
        {to && (
          <button
            onClick={() => navigate(to)}
            className="bg-gray-50 flex items-center gap-2 hover:bg-purple-50 duration-100 hover:text-purple-600 px-4 py-1 border cursor-pointer border-gray-200 rounded-lg"
          >
            See All <FaArrowRight />
          </button>
        )}
      </div>

      <div className="">
        {loading ? (
          <p className="">Loading...</p>
        ) : (
          <div className="flex flex-col gap-4">
            {data?.length ? (
              data
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

export default TransactionsList;
