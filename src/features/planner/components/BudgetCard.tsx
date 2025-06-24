import { Card } from "@/shared/components/ui/card";

export function BudgetCard({ budgetCategories }: { budgetCategories: any[] }) {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Budget Categories
      </h3>
      <div className="space-y-4">
        {budgetCategories.map((category) => (
          <div key={category.name} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">
                {category.name}
              </span>
              <span
                className={`px-2 py-1 rounded-full text-xs ${category.color}`}
              >
                ${category.spent}/${category.budget}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-finance-blue h-2 rounded-full"
                style={{
                  width: `${Math.min(
                    (category.spent / category.budget) * 100,
                    100
                  )}%`,
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
