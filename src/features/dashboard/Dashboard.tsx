import { Card } from "@/shared/components/ui/card";
import { useState } from "react";
import { Link } from "react-router-dom";
import { CategoryForm } from "../categories/components/CategoryForm";
import { TransactionForm } from "../transactions/components/TransactionForm";
import { applicationStore } from "@/shared/Store";
import { formatDate } from "@/shared/utils/utils";

export const Dashboard = () => {
  const { user, Transactions, Categories, MonthlySummary } = applicationStore();
  const [displayForm, setDisplayForm] = useState<string>("");

  const goals = [
    {
      name: "Emergency Fund",
      current: 2500,
      target: 10000,
      color: "bg-finance-blue-accent",
    },
    {
      name: "Vacation",
      current: 1200,
      target: 3000,
      color: "bg-finance-green-accent",
    },
    { name: "New Laptop", current: 800, target: 1500, color: "bg-purple-500" },
  ];

  function getCategoryInfo(category_id: number) {
    const category = Categories.find((category) => category.id === category_id);
    return [category];
  }
  return (
    <div className="relative">
      <div
        className={`space-y-6 ${
          displayForm ? "blur-sm" : ""
        } transition-all duration-200`}
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Good morning, {user?.name}! 👋
          </h1>
          <p className="text-gray-600">
            Here's your financial overview for today
          </p>
        </div>

        {/* Balance Cards */}
        {MonthlySummary.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Monthly Overview */}
            <Card className="p-6 bg-gradient-to-br from-finance-blue to-finance-blue-accent/20 border-0">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-finance-blue-accent/80 text-sm font-medium">
                    Monthly Overview
                  </p>
                  <p className="text-2xl font-bold text-finance-blue-accent">
                    $
                    {MonthlySummary[0].total_income +
                      MonthlySummary[0].total_expense}
                  </p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <span className="text-xl">💰</span>
                </div>
              </div>
            </Card>

            {/* Monthly Income */}
            <Card className="p-6 bg-gradient-to-br from-finance-green to-finance-green-accent/20 border-0">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-finance-green-accent/80 text-sm font-medium">
                    Monthly Income
                  </p>
                  <p className="text-2xl font-bold text-finance-green-accent">
                    +${MonthlySummary[0].total_income}
                  </p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <span className="text-xl">📈</span>
                </div>
              </div>
            </Card>

            {/* Monthly Expenses */}
            <Card className="p-6 bg-gradient-to-br from-red-50 to-red-100 border-0">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-600 text-sm font-medium">
                    Monthly Expenses
                  </p>
                  <p className="text-2xl font-bold text-red-900">
                    ${MonthlySummary[0].total_expense}
                  </p>
                </div>
                <div className="w-12 h-12 bg-white/50 rounded-xl flex items-center justify-center">
                  <span className="text-xl">🎯</span>
                </div>
              </div>
            </Card>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Transactions */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Recent Transactions
              </h2>
              <Link
                to="/transactions"
                className="text-finance-blue-accent text-sm font-medium hover:underline"
              >
                View All
              </Link>
            </div>
            <div className="space-y-4">
              {Transactions.length > 0 ? (
                Transactions.map((transaction) =>
                  getCategoryInfo(transaction.category_id).map((category) => (
                    <div
                      key={transaction.transaction_id}
                      className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-3">
                          <div
                            style={{ backgroundColor: category.color }}
                            className={`w-10 h-10 rounded-full flex items-center justify-center`}
                          >
                            <span className="text-sm">{category.icon}</span>
                          </div>
                        </div>

                        <div>
                          <p className="font-medium text-gray-900">
                            {transaction.place}
                          </p>
                          <p className="text-sm text-gray-500">
                            {category.name} •{" "}
                            {formatDate(transaction.transaction_date)}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`font-semibold ${
                          transaction.transaction_type === "income"
                            ? "text-finance-green-accent"
                            : "text-red-700"
                        }`}
                      >
                        {transaction.transaction_type === "income" ? "+" : "-"}$
                        {Math.abs(Number(transaction.amount)).toFixed(2)}
                      </span>
                    </div>
                  ))
                )
              ) : (
                <p className="text-gray-500">No transactions were found</p>
              )}
            </div>
          </Card>

          {/* ---Should I change this? To AI review of you last month?--- */}
          {/* Financial Goals */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Financial Goals
            </h2>
            <div className="space-y-6">
              {goals.map((goal, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">
                      {goal.name}
                    </span>
                    <span className="text-sm text-gray-500">
                      ${goal.current.toLocaleString()} / $
                      {goal.target.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full ${goal.color} transition-all duration-300`}
                      style={{
                        width: `${(goal.current / goal.target) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {Math.round((goal.current / goal.target) * 100)}% complete
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className={`p-6`}>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Quick Actions
          </h2>

          {/* Transaction Button */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button
              className="p-4 bg-finance-blue hover:bg-finance-blue/80 rounded-xl text-center transition-colors group"
              onClick={() => setDisplayForm("transaction")}
            >
              <div className="text-2xl mb-2">💳</div>
              <span className="text-sm font-medium text-finance-blue-accent group-hover:text-finance-blue-accent/80">
                Add Transaction
              </span>
            </button>

            {/* Category Button */}
            <button
              className="p-4 bg-finance-green hover:bg-finance-green/80 rounded-xl text-center transition-colors group"
              onClick={() => setDisplayForm("category")}
            >
              <div className="text-2xl mb-2">🏛️</div>
              <span className="text-sm font-medium text-finance-green-accent group-hover:text-finance-green-accent/80">
                Add Category
              </span>
            </button>

            {/* Goal Button */}
            <button
              className="p-4 bg-gray-50 hover:bg-gray-100 rounded-xl text-center transition-colors group"
              onClick={() => setDisplayForm("goal")}
            >
              <div className="text-2xl mb-2">🎯</div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-gray-600">
                Set Goal
              </span>
            </button>

            {/* Report Button */}
            <button
              className="p-4 bg-gray-50 hover:bg-gray-100 rounded-xl text-center transition-colors group"
              onClick={() => setDisplayForm("report")}
            >
              <div className="text-2xl mb-2">📊</div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-gray-600">
                View Report
              </span>
            </button>
          </div>
        </Card>
      </div>

      {/* Display Form */}
      {displayForm === "transaction" && (
        <div className="fixed inset-0 z-50">
          <TransactionForm onClose={() => setDisplayForm("")} />
        </div>
      )}
      {displayForm === "category" && (
        <div className="fixed inset-0 z-50">
          <CategoryForm onClose={() => setDisplayForm("")} />
        </div>
      )}
      {/* {displayForm === "goal" && <GoalForm />} */}
      {/* {displayForm === "report" && <ReportForm />} */}
    </div>
  );
};
