import { Card } from "@/shared/components/ui/card";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

export function CategoryChart({
  categoriesBreakdown,
}: {
  categoriesBreakdown: any[];
}) {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        Spending by Category
      </h3>
      {categoriesBreakdown.length > 0 ? (
        <>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoriesBreakdown}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="total_amount"
                nameKey="category_name"
              >
                {categoriesBreakdown.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.category_color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => `$${value.toLocaleString()}`}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {categoriesBreakdown.map((category, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: category.category_color }}
                ></div>
                <span className="text-xs text-gray-600">
                  {category.category_name}
                </span>
                <span className="text-xs font-medium text-gray-900">
                  ${category.total_amount.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="text-gray-500">No data available</p>
      )}
    </Card>
  );
}
