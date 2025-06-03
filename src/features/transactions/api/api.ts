import type { TransactionFormData } from "../types";

const backendUrl = "http://localhost:3000/";

export const fetchTransactions = async (page: number = 1,limit: number = 10) => {
  const response = await fetch(`${backendUrl}transactions?page=${page}&limit=${limit}`, {
    method: "GET",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });
  const { message } = await response.json();
  return message;
};

export const fetchMothlySummary = async () => {
  const response = await fetch(`${backendUrl}transactions/monthly-summary`, {
    method: "GET",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });
  const { message } = await response.json();
  return message;
};

export const createTransaction = async (transaction: TransactionFormData) => {
  const response = await fetch(`${backendUrl}transactions`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(transaction),
  });

  const { message } = await response.json();
  console.log(message);

  return message;
};
