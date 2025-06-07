import { Card } from "@/shared/components/ui/card";
import { ResponsiveContainer } from "recharts";
import { BarChart } from "recharts";
import { CartesianGrid } from "recharts";
import { XAxis } from "recharts";
import { YAxis } from "recharts";
import { Tooltip } from "recharts";
import { Bar } from "recharts";

export function WeeklyChart({ weeklySpending }: { weeklySpending: any[] }) {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        Weekly Spending Pattern
      </h3>
      {weeklySpending.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={weeklySpending}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="week" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip
              formatter={(value: number) => [
                `$${value.toLocaleString()}`,
                "Expenses",
              ]}
            />
            <Bar
              dataKey="expense"
              fill="#3B82F6"
              radius={[8, 8, 0, 0]}
              name="Expenses"
            />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-gray-500">No data available</p>
      )}
    </Card>
  );
}
