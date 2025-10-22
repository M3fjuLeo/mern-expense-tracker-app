import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";

const TransactionCard = ({ title, icon, amount, date, type }) => {
  const isExpense = type === "expense";

  return (
    <div className="flex items-center rounded-lg hover:bg-gray-50 px-2 justify-between">
      <div className="flex gap-6 items-center">
        <div className="bg-gray-50 size-16 inline-flex items-center justify-center rounded-full">
          <span className="text-3xl">{icon}</span>
        </div>

        <div>
          <h2 className="font-medium">{title}</h2>
          <span className="font-light">
            {new Date(date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>
      </div>

      <div
        className={`${
          isExpense ? "bg-red-100" : "bg-green-100"
        } px-2 py-1 rounded-lg`}
      >
        <span
          className={`flex items-center gap-4 ${
            isExpense ? "text-red-700" : "text-green-700"
          }`}
        >
          {isExpense ? "-" : "+"}{" "}
          {amount?.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
          {isExpense ? <FaArrowTrendDown /> : <FaArrowTrendUp />}
        </span>
      </div>
    </div>
  );
};

export default TransactionCard;
