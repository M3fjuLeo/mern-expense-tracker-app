import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const BarChartComponent = ({ dashboardData }) => {
  const data = dashboardData?.last30DaysExpenses?.transactions?.map((item) => ({
    name: new Date(item.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    amount: item.amount,
  }));

  console.log(new Date().toISOString());

  return (
    <div className="bg-white p-6 rounded-lg shadow flex-3">
      <h2 className="text-lg font-medium mb-4">Last 30 Days Expenses</h2>
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
