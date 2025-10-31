import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";
import { IoTrashOutline } from "react-icons/io5";

interface TransactionCardProps {
  id: string;
  title: string;
  icon: string;
  amount: number;
  date: string | Date;
  type: "income" | "expense";
  removable: boolean;
  onDelete: (id: string, type: "income" | "expense") => void;
}

const TransactionCard = ({
  id,
  title,
  icon,
  amount,
  date,
  type,
  removable,
  onDelete,
}: TransactionCardProps) => {
  const isExpense = type === "expense";

  return (
    <div className="flex group items-center rounded-lg hover:bg-gray-50 px-2 justify-between">
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

      <div className="flex items-center gap-4">
        {removable && (
          <button
            onClick={() => onDelete(id, type)}
            className="bg-gray-100 opacity-0 group-hover:opacity-100 p-2 hover:text-red-600 rounded-lg cursor-pointer"
          >
            <IoTrashOutline />
          </button>
        )}
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
    </div>
  );
};

export default TransactionCard;
