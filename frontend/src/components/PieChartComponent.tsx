import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";

type PieChartData = {
  name: string;
  value: number;
};

type Props = {
  data: PieChartData[];
  colors?: string[];
  centerLabel: string;
  centerValue?: string | number;
  loading?: boolean;
  title: string;
};

const PieChartComponent: React.FC<Props> = ({
  title,
  data,
  colors = ["#6D28D9", "#DC2626", "#ffc658", "#F97316", "#a4de6c"],
  centerLabel,
  centerValue,
  loading,
}) => {
  return (
    <div className="rounded-lg bg-white w-full flex-3 p-6 shadow">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>

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
              {data.map((_, i) => (
                <Cell key={i} fill={colors[i % colors.length]} />
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
              {centerLabel}
            </text>
            <text
              x="50%"
              y="60%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-gray-600"
              style={{ fontSize: "24px" }}
            >
              ${centerValue}
            </text>

            <Tooltip formatter={(value, name) => [`$${value}`, name]} />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PieChartComponent;
