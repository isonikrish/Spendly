"use client";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function BarChartDashboard({
  data,
}: {
  data: { name: string; amount: number; spent: number }[];
}) {
  return (
    <div className="border rounded-2xl p-8 h-auto w-full shadow-lg shadow-gray-800">
      <h2 className="font-bold text-3xl my-2">Activity</h2>
      <ResponsiveContainer width="100%" height={500}>
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="spent" stackId="a" fill="#193295" />
          <Bar dataKey="amount" stackId="a" fill="#10B981" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BarChartDashboard;
