import { useState } from "react";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { applicationStore } from "@/shared/Store";
import { formatDate } from "@/shared/utils/utils";
import { TransactionForm } from "./components/TransactionForm";
import { Pagination } from "./components/Pagination";
import { fetchTransactions, filterTransactions } from "./api/api";
import { UploaderForm } from "./components/Uploader";

// TODO: Add a loading state
// TODO: Add a search bar
// TODO: Add a filter by date
// TODO: Add a filter by amount
// TODO: Add a filter by category
// TODO: Add a filter by place
// TODO: Add a filter by transaction type
// TODO: Add a filter by transaction date
// TODO: Add a double click functionality to exit the form
// TODO: add the transaction and update the transaction list

export const Transactions = () => {
  const {
    MonthlySummary,
    Categories,
    Transactions,
    TransactionsPagination,
    setTransactionsPagination,
    setTransactions,
  } = applicationStore();

  const [displayForm, setDisplayForm] = useState<string>("");
  const [selectedFilter, setSelectedFilter] = useState<string | number>("");

  const handlePageChange = async (newPage: number) => {
    const response = await fetchTransactions(
      newPage,
      TransactionsPagination.limit
    );
    setTransactions(response.data);
    setTransactionsPagination(response.pagination);
  };

  const handleFilter = async (categoryId: number | string) => {
    const response = await filterTransactions(categoryId);
    setTransactions(response);
    setSelectedFilter(categoryId);
  };

  return (
    <>
      <div
        className={`flex flex-col ${
          displayForm ? "blur-sm" : ""
        } transition-all duration-200 h-full min-h-[calc(100vh-8rem)]`}
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Transactions
            </h1>
            <p className="text-gray-600">
              Track and manage your financial activities
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              className="bg-finance-blue-accent hover:bg-finance-blue-accent/90 text-white rounded-xl px-6"
              onClick={() => setDisplayForm("transaction")}
            >
              Add Transaction
            </Button>
            <Button
              className="bg-finance-blue-accent hover:bg-finance-blue-accent/90 text-white rounded-xl px-6"
              onClick={() => setDisplayForm("upload")}
            >
              Upload PDF
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        {MonthlySummary.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
        <div className="p-6 border border-gray-200 rounded-xl flex-1 overflow-hidden flex flex-col">
          {/* Filters */}
          <div className="flex space-x-2 overflow-x-auto p-2 mb-4">
            {Categories.map((filter) => (
              <button
                key={filter.id}
                onClick={() => handleFilter(filter.id)}
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

          <div className="space-y-4 flex-1 overflow-y-auto">
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
                        transaction.transaction_type === "income"
                          ? "text-finance-green-accent"
                          : "text-red-500"
                      }`}
                    >
                      {transaction.transaction_type === "income" ? "+" : "-"}$
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
        </div>
      </div>
      {displayForm === "transaction" && (
        <div className="fixed inset-0 z-50">
          <TransactionForm onClose={() => setDisplayForm("")} />
        </div>
      )}
      {displayForm === "upload" && (
        <div className="fixed inset-0 z-50">
          <UploaderForm />
        </div>
      )}
    </>
  );
};
