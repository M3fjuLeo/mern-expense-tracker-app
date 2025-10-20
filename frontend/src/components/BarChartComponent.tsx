import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Transaction = {
  date: string;
  amount: number;
};

type Props = {
  dashboardData?: {
    last30DaysExpenses?: {
      transactions?: Transaction[];
    };
  };
  title: string;
};

const BarChartComponent: React.FC<Props> = ({ dashboardData, title }) => {
  const transactions = dashboardData?.last30DaysExpenses?.transactions ?? [];

  const data = Object.values(
    transactions.reduce<Record<string, number>>((acc, { date, amount }) => {
      const key = new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
      acc[key] = (acc[key] ?? 0) + amount;
      return acc;
    }, {})
  ).map((_, i, arr) => ({
    name: Object.keys(
      transactions.reduce<Record<string, number>>((acc, { date, amount }) => {
        const key = new Date(date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });
        acc[key] = (acc[key] ?? 0) + amount;
        return acc;
      }, {})
    )[i],
    amount: arr[i],
  }));

  return (
    <div className="bg-white p-6 rounded-lg shadow flex-3">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} barSize={60}>
          <XAxis dataKey="name" axisLine={false} tickLine={false} />
          <YAxis axisLine={false} tickLine={false} />
          <Tooltip />
          <Bar dataKey="amount" fill="url(#colorUv)" radius={[10, 10, 0, 0]} />
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#A78BFA" stopOpacity={1} />
              <stop offset="100%" stopColor="#7C3AED" stopOpacity={1} />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;
