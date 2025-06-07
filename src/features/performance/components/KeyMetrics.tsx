import { Card } from "@/shared/components/ui/card";

export function KeyMetrics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card className="p-6 bg-gradient-to-br from-finance-blue to-finance-blue-accent/20 border-0">
        <div className="text-center">
          <p className="text-finance-blue-accent/80 text-sm font-medium">
            Savings Rate
          </p>
          <p className="text-3xl font-bold text-finance-blue-accent">5%</p>
          <p className="text-xs text-finance-blue-accent/60 mt-1">This month</p>
        </div>
      </Card>

      <Card className="p-6">
        <div className="text-center">
          <p className="text-gray-600 text-sm font-medium">
            Avg Monthly Spending
          </p>
          <p className="text-3xl font-bold text-gray-900">$4,167</p>
          <p className="text-xs text-finance-green-accent mt-1">
            ↓ 8% from last month
          </p>
        </div>
      </Card>

      <Card className="p-6">
        <div className="text-center">
          <p className="text-gray-600 text-sm font-medium">Budget Adherence</p>
          <p className="text-3xl font-bold text-gray-900">87%</p>
          <p className="text-xs text-finance-green-accent mt-1">
            ↑ 12% improvement
          </p>
        </div>
      </Card>

      <Card className="p-6">
        <div className="text-center">
          <p className="text-gray-600 text-sm font-medium">Goal Progress</p>
          <p className="text-3xl font-bold text-gray-900">64%</p>
          <p className="text-xs text-gray-500 mt-1">On track</p>
        </div>
      </Card>
    </div>
  );
}
