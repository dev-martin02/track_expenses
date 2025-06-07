import { Card } from "@/shared/components/ui/card";
import { ResponsiveContainer } from "recharts";
import { LineChart } from "recharts";
import { CartesianGrid } from "recharts";
import { XAxis } from "recharts";
import { YAxis } from "recharts";
import { Tooltip } from "recharts";
import { Line } from "recharts";
import { applicationStore } from "@/shared/Store";

export function MonthTrend() {
  const { MonthlySummary } = applicationStore();

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        Income vs Expenses (This year so far)
      </h3>
      {MonthlySummary.length > 0 ? (
        <>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={MonthlySummary}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                formatter={(value: number) => [
                  `$${value.toLocaleString()}`,
                  undefined,
                ]}
                labelFormatter={(label) => {
                  const date = new Date(label);
                  return date.toLocaleString("default", {
                    month: "long",
                    year: "numeric",
                  });
                }}
              />
              <Line
                type="monotone"
                dataKey="total_income"
                stroke="#10B981"
                strokeWidth={3}
                name="Income"
                dot={{ fill: "#10B981", strokeWidth: 2, r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="total_expense"
                stroke="#3B82F6"
                strokeWidth={3}
                name="Expenses"
                dot={{ fill: "#3B82F6", strokeWidth: 2, r: 6 }}
              />
            </LineChart>
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
