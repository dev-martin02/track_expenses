import { Card } from "@/shared/components/ui/card";

export function ExpensesCard({
  selectedDate,
  selectedExpenses,
}: {
  selectedDate: number;
  selectedExpenses: any[];
}) {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Expenses for {selectedDate}th
      </h3>
      {selectedExpenses.length > 0 ? (
        <div className="space-y-3">
          {selectedExpenses.map((expense, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
            >
              <div>
                <p className="font-medium text-gray-900">{expense.name}</p>
                <p className="text-sm text-gray-500">{expense.category}</p>
              </div>
              <span className="font-semibold text-gray-900">
                ${expense.amount}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-sm">
          No planned expenses for this date.
        </p>
      )}
    </Card>
  );
}
