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
              <Bar dataKey="total_income" fill="#8884d8" name="Income" />
              <Bar dataKey="total_expense" fill="#82ca9d" name="Expenses" />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex items-center justify-center space-x-6 mt-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-finance-green-accent rounded-full"></div>
              <span className="text-sm text-gray-600">Income</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-finance-blue-accent rounded-full"></div>
              <span className="text-sm text-gray-600">Expenses</span>
            </div>
          </div>
        </>
      ) : (
        <p className="text-gray-500">No data available</p>
      )}
    </Card>
  );
}
