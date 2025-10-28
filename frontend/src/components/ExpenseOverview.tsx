import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type ChartData = {
  name: string;
  amount: number;
};

type Transaction = {
  date: string;
  amount: number;
};

type Props = {
  title: string;
  description?: string;
  data?: ChartData[];
  transactions?: Transaction[];
  barColor?: string;
  gradientStart?: string;
  gradientEnd?: string;
  barSize?: number;
  height?: number;
  showButton?: boolean;
  buttonText?: string;
  onButtonClick?: () => void;
};

const ExpenseOverview: React.FC<Props> = ({
  title,
  description,
  data,
  transactions,
  barColor,
  gradientEnd = "#7C3AED",
  height = 300,
  showButton = false,
  buttonText,
  onButtonClick,
}) => {
  let chartData: ChartData[] = data ?? [];

  // Jeśli podano transakcje, przetwórz je
  if (!data && transactions && transactions.length > 0) {
    const grouped = transactions.reduce<Record<string, number>>(
      (acc, { date, amount }) => {
        const key = new Date(date).toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
        });
        acc[key] = (acc[key] ?? 0) + amount;
        return acc;
      },
      {}
    );

    chartData = Object.entries(grouped).map(([name, amount]) => ({
      name,
      amount,
    }));
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow flex-3">
      <div className="mb-8 flex justify-between items-start">
        <div className="flex items-center w-full justify-between">
          <div>
            <h2 className="text-lg font-semibold">{title}</h2>
            {description && (
              <p className="font-light text-gray-500 text-sm mt-1">
                {description}
              </p>
            )}
          </div>
          {showButton && (
            <button
              onClick={onButtonClick}
              className="bg-gray-50 flex items-center gap-2 hover:bg-purple-50 duration-100 hover:text-purple-600 px-4 py-2 border cursor-pointer border-gray-200 rounded-lg"
            >
              <span>+</span>
              {buttonText}
            </button>
          )}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={height}>
        <AreaChart
          data={chartData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "#6B7280" }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "#6B7280" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #E5E7EB",
              borderRadius: "8px",
              padding: "8px 12px",
            }}
            formatter={(value: number) => [`Amount: $${value}`, ""]}
            labelStyle={{ display: "none" }}
          />
          <Area
            type="monotone"
            dataKey="amount"
            stroke={gradientEnd}
            strokeWidth={2}
            fill="url(#areaGradient)"
          />
          {!barColor && (
            <defs>
              <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={gradientEnd} stopOpacity={0.8} />
                <stop offset="100%" stopColor={gradientEnd} stopOpacity={0.1} />
              </linearGradient>
            </defs>
          )}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpenseOverview;
