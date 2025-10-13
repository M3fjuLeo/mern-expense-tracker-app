import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";

const FinancialOverview = () => {
  const data = [
    { name: "Total Balance", value: 12000 },
    { name: "Total Expenses", value: 7100 },
    { name: "Total Income", value: 15000 },
  ];

  const COLORS = ["#6D28D9", "#DC2626", "#F97316"];

  return (
    <div className="rounded-lg bg-white w-full flex-3 p-6 shadow">
      <h2 className="text-lg font-semibold mb-4">Financial Overview</h2>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={100}
              paddingAngle={3}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <text
              x="50%"
              y="45%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-gray-800"
              style={{ fontSize: "16px", fontWeight: "bold" }}
            >
              Total Balance
            </text>
            <text
              x="50%"
              y="60%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-gray-600"
              style={{ fontSize: "18px" }}
            >
              $
            </text>

            <Tooltip formatter={(value, name) => [`$${value}`, name]} />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FinancialOverview;
