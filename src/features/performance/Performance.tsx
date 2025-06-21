import { Card } from "@/shared/components/ui/card";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";
import {
  fetchCategoriesBreakdown,
  fetchMonthlyPerformance,
  fetchWeeklyPerformance,
} from "./api";
import { KeyMetrics } from "./components/KeyMetrics";
import { MonthTrend } from "./components/MonthTrend";
import { CategoryChart } from "./components/CategoryChart";
import { WeeklyChart } from "./components/WeeklyChart";
import { MonthlySummary } from "./components/MonthlySummary";
import { applicationStore } from "@/shared/Store";

export const Performance = () => {
  const [weeklySpending, setWeeklySpending] = useState<any[]>([]);
  const [categoriesBreakdown, setCategoriesBreakdown] = useState<any[]>([]);
  const { MonthlyPerformance, setMonthlyPerformance } = applicationStore();
  const monthlyData = [
    { month: "Aug", income: 6500, expenses: 4200, savings: 2300 },
    { month: "Sep", income: 6500, expenses: 3800, savings: 2700 },
    { month: "Oct", income: 7200, expenses: 4100, savings: 3100 },
    { month: "Nov", income: 6500, expenses: 4500, savings: 2000 },
    { month: "Dec", income: 8000, expenses: 5200, savings: 2800 },
    { month: "Jan", income: 6500, expenses: 3200, savings: 3300 },
  ];

  const totalIncome = monthlyData[monthlyData.length - 1].income;
  const totalExpenses = monthlyData[monthlyData.length - 1].expenses;
  const totalSavings = monthlyData[monthlyData.length - 1].savings;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesBreakdown = await fetchCategoriesBreakdown(5, 2025);
        setCategoriesBreakdown(categoriesBreakdown.expense);

        // const weeklyPerformance = await fetchWeeklyPerformance(5, 2025);
        // setWeeklySpending(weeklyPerformance);

        console.log("Fetching monthly performance...");
        const monthlyPerformance = await fetchMonthlyPerformance();
        console.log("Monthly performance response:", monthlyPerformance);
        // Sort the data by month in ascending order (January first)
        const sortedMonthlyPerformance = [...monthlyPerformance].sort(
          (a, b) => new Date(a.month).getTime() - new Date(b.month).getTime()
        );
        setMonthlyPerformance(sortedMonthlyPerformance);
        console.log("Monthly performance:", monthlyPerformance);
      } catch (error) {
        console.error("Error fetching data:", error);
        if (error instanceof Error) {
          console.error("Error details:", error.message);
        }
      }
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Performance Summary
        </h1>
        <p className="text-gray-600">
          Analyze your financial patterns and track your progress
        </p>
      </div>

      {/* Key Metrics */}
      <KeyMetrics />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Income vs Expenses Trend */}
        <MonthTrend />
        {/* Spending by Category */}
        <CategoryChart categoriesBreakdown={categoriesBreakdown} />
        {/* Weekly Spending Pattern */}
        <WeeklyChart weeklySpending={weeklySpending} />

        {/* Savings Growth
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Savings Growth
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Line
                type="monotone"
                dataKey="savings"
                stroke="#10B981"
                strokeWidth={4}
                dot={{ fill: "#10B981", strokeWidth: 2, r: 8 }}
                fill="url(#savingsGradient)"
              />
              <defs>
                <linearGradient
                  id="savingsGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                </linearGradient>
              </defs>
            </LineChart>
          </ResponsiveContainer>
        </Card> */}
      </div>

      {/* Monthly Summary */}
      <MonthlySummary
        totalIncome={totalIncome}
        totalExpenses={totalExpenses}
        totalSavings={totalSavings}
      />
    </div>
  );
};
