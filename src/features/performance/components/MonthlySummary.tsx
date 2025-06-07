import { Card } from "@/shared/components/ui/card";

export function MonthlySummary({
  totalIncome,
  totalExpenses,
  totalSavings,
}: {
  totalIncome: number;
  totalExpenses: number;
  totalSavings: number;
}) {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        January 2024 Summary
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="text-center p-4 bg-finance-green rounded-xl">
          <p className="text-finance-green-accent text-sm font-medium">
            Total Income
          </p>
          <p className="text-2xl font-bold text-finance-green-accent">
            ${totalIncome.toLocaleString()}
          </p>
        </div>
        <div className="text-center p-4 bg-finance-blue rounded-xl">
          <p className="text-finance-blue-accent text-sm font-medium">
            Total Expenses
          </p>
          <p className="text-2xl font-bold text-finance-blue-accent">
            ${totalExpenses.toLocaleString()}
          </p>
        </div>
        <div className="text-center p-4 bg-gray-50 rounded-xl">
          <p className="text-gray-600 text-sm font-medium">Net Savings</p>
          <p className="text-2xl font-bold text-gray-900">
            ${totalSavings.toLocaleString()}
          </p>
        </div>
      </div>
    </Card>
  );
}
