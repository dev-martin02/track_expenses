import { useState } from "react";
import { Card } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { applicationStore } from "@/shared/Store";
import { formatDate } from "@/shared/utils/utils";
import { TransactionForm } from "./components/TransactionForm";
import { Pagination } from "./components/Pagination";
import { fetchTransactions } from "./api/api";

export const Transactions = () => {
  const [selectedFilter, setSelectedFilter] = useState<string | number>("");
  const {
    MonthlySummary,
    Categories,
    Transactions,
    TransactionsPagination,
    setTransactionsPagination,
    setTransactions,
  } = applicationStore();
  const [displayForm, setDisplayForm] = useState<string>("");

  const filteredTransactions =
    selectedFilter === ""
      ? Transactions
      : Transactions.filter((t) => t.category_id === selectedFilter);

  const handlePageChange = async (newPage: number) => {
    const response = await fetchTransactions(
      newPage,
      TransactionsPagination.limit
    );
    setTransactions(response.data);
    setTransactionsPagination(response.pagination);
  };

  function findCategory(id: number) {
    return Categories.find((c) => c.id === id);
  }

  return (
    <>
      <div
        className={`space-y-8 ${
          displayForm ? "blur-sm" : ""
        } transition-all duration-200`}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Transactions
            </h1>
            <p className="text-gray-600">
              Track and manage your financial activities
            </p>
          </div>
          <Button
            className="bg-finance-blue-accent hover:bg-finance-blue-accent/90 text-white rounded-xl px-6"
            onClick={() => setDisplayForm("transaction")}
          >
            Add Transaction
          </Button>
        </div>

        {/* Summary Cards */}
        {MonthlySummary.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">
                    Total Income
                  </p>
                  <p className="text-2xl font-bold text-finance-green-accent">
                    +${MonthlySummary[0].total_income}
                  </p>
                </div>
                <div className="w-12 h-12 bg-finance-green rounded-xl flex items-center justify-center">
                  <span className="text-xl">📈</span>
                </div>
              </div>
            </Card>

            {/* Total Expenses */}
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">
                    Total Expenses
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    -${MonthlySummary[0].total_expense}
                  </p>
                </div>
                <div className="w-12 h-12 bg-finance-blue rounded-xl flex items-center justify-center">
                  <span className="text-xl">📉</span>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Transactions List */}
        <Card className="p-6">
          {/* Filters */}
          <div className="flex space-x-2 overflow-x-auto p-2">
            {Categories.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`px-4 py-2 rounded-xl whitespace-nowrap text-white transition-colors flex items-center gap-2 ${
                  selectedFilter === filter.id
                    ? "ring-4 ring-finance-blue-accent"
                    : "hover:opacity-80"
                }`}
                style={{ backgroundColor: filter.color }}
              >
                <span className="text-lg">{filter.icon}</span>
                <span>{filter.name}</span>
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {Transactions.length > 0 ? (
              Transactions.map((transaction) => (
                <div
                  key={crypto.randomUUID()}
                  className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors border border-gray-100"
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center`}
                      style={{
                        backgroundColor: Categories.find(
                          (c) => c.id === transaction.category_id
                        )?.color,
                      }}
                    >
                      <span className="text-lg">
                        {
                          Categories.find(
                            (c) => c.id === transaction.category_id
                          )?.icon
                        }
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {transaction.place}
                      </p>
                      <p className="text-sm text-gray-500">
                        {
                          Categories.find(
                            (c) => c.id === transaction.category_id
                          )?.name
                        }{" "}
                        • {formatDate(transaction.transaction_date)}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span
                      className={`text-lg font-bold ${
                        Number(transaction.amount) > 0
                          ? "text-finance-green-accent"
                          : "text-red-300"
                      }`}
                    >
                      {Number(transaction.amount) > 0 ? "+" : ""}$
                      {Math.abs(Number(transaction.amount)).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No transactions were found</p>
            )}
          </div>

          {/* Add Pagination */}
          <div className="mt-6">
            {Transactions.length > 0 && (
              <Pagination onPageChange={handlePageChange} />
            )}
          </div>
        </Card>
      </div>
      {displayForm === "transaction" && (
        <div className="fixed inset-0 z-50">
          <TransactionForm onClose={() => setDisplayForm("")} />
        </div>
      )}
    </>
  );
};
