import { useState } from "react";
import { Card } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Calendar } from "./components/Calendar";
import { BudgetCard } from "./components/BudgetCard";
import { ExpensesCard } from "./components/ExpensesCard";

export const MonthlyPlanner = () => {
  const [selectedDate, setSelectedDate] = useState<number | null>(null);

  const budgetCategories = [
    {
      name: "Food & Dining",
      budget: 600,
      spent: 320,
      color: "bg-red-100 text-red-700",
    },
    {
      name: "Transportation",
      budget: 200,
      spent: 150,
      color: "bg-blue-100 text-blue-700",
    },
    {
      name: "Entertainment",
      budget: 300,
      spent: 180,
      color: "bg-purple-100 text-purple-700",
    },
    {
      name: "Shopping",
      budget: 400,
      spent: 250,
      color: "bg-pink-100 text-pink-700",
    },
    {
      name: "Bills & Utilities",
      budget: 800,
      spent: 720,
      color: "bg-gray-100 text-gray-700",
    },
  ];

  const plannedExpenses = [
    { date: 15, name: "Rent Payment", amount: 1200, category: "Bills" },
    { date: 20, name: "Car Insurance", amount: 150, category: "Bills" },
    {
      date: 25,
      name: "Dentist Appointment",
      amount: 200,
      category: "Healthcare",
    },
    {
      date: 28,
      name: "Friend's Birthday",
      amount: 80,
      category: "Entertainment",
    },
  ];

  const hasPlannedExpense = (day: number) => {
    return plannedExpenses.some((expense) => expense.date === day);
  };

  const selectedExpenses = selectedDate
    ? plannedExpenses.filter((expense) => expense.date === selectedDate)
    : [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Monthly Planner</h1>
        <Button className="bg-finance-blue hover:bg-finance-blue-accent">
          Add Planned Expense
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Calendar
          selectedDate={selectedDate}
          hasPlannedExpense={hasPlannedExpense}
          setSelectedDate={setSelectedDate}
        />

        {/* Budget Categories */}
        <div className="space-y-4">
          <BudgetCard budgetCategories={budgetCategories} />

          {/* Selected Date Expenses */}
          {selectedDate && (
            <ExpensesCard
              selectedDate={selectedDate}
              selectedExpenses={selectedExpenses}
            />
          )}
        </div>
      </div>
    </div>
  );
};
