import { Navigation } from "./Navigation";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { fetchCategories } from "@/features/categories/api/api";
import { applicationStore } from "../Store";
import {
  fetchMonthlySummary,
  fetchTransactions,
} from "@/features/transactions/api/api";

export const Layout = () => {
  const {
    Categories,
    setCategories,
    user,
    setTransactions,
    setMonthlySummary,
    setTransactionsPagination,
  } = applicationStore();

  // TODO: Catch all the data for the user in one go
  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        try {
          // Fetch both independently
          const categoriesResult = await fetchCategories()
            .then((data) => {
              return data;
            })
            .catch((error) => {
              return []; // Return empty array if categories fail
            });

          const transactionsResult = await fetchTransactions(1, 5)
            .then((data) => {
              return data;
            })
            .catch((error) => {
              return []; // Return empty array if transactions fail
            });
          // Update state with whatever we got
          setCategories(categoriesResult);
          setTransactions(transactionsResult.data);
          setTransactionsPagination(transactionsResult.pagination);
        } catch (error) {
          console.error("Error in fetchData:", error);
        }
      };

      fetchData();
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-white font-inter">
      <Navigation />
      <main className="ml-64 p-8">
        <Outlet />
      </main>
    </div>
  );
};
