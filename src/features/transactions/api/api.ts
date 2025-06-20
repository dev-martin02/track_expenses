import type { TransactionFormData } from "../types";

const backendUrl = "http://localhost:3000/";

export const fetchTransactions = async (
  page: number = 1,
  limit: number = 10
) => {
  const response = await fetch(
    `${backendUrl}transactions?page=${page}&limit=${limit}`,
    {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    }
  );
  const { message } = await response.json();
  return message;
};

export const fetchMonthlySummary = async () => {
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
  //
  const { message } = await response.json();
  console.log(message);

  return message;
};

export const filterTransactions = async (categoryId: number | string) => {
  const response = await fetch(
    `${backendUrl}transactions/category?categoryId=${categoryId}`,
    {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    }
  );
  const { message } = await response.json();
  return message;
};

export const uploadTransactions = async (file: File) => {
  const response = await fetch(`${backendUrl}transactions/upload`, {
    method: "POST",
    credentials: "include",
    headers: {
      filename: file.name,
    },
    body: file,
  });
};
