import { Card } from "@/shared/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

import { applicationStore } from "@/shared/Store";

export function MonthTrend() {
  const { MonthlyPerformance } = applicationStore();

  console.log("MonthlyPerformance", MonthlyPerformance);
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        Income vs Expenses (This year so far)
      </h3>
      {MonthlyPerformance.length > 0 ? (
        <>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={MonthlyPerformance}
              width={500}
              height={300}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="total_income" fill="#6488EA" name="Income" />
              <Bar dataKey="total_expense" fill="#EC644B" name="Expenses" />
            </BarChart>
          </ResponsiveContainer>
        </>
      ) : (
        <p className="text-gray-500">No data available</p>
      )}
    </Card>
  );
}
