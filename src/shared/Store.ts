import { create } from "zustand";
import {
  Category,
  Transaction,
  User,
  MonthlySummary,
  TransactionsPagination,
  MonthlyPerformance,
} from "./type.ts";

type Store = {
  Transactions: Transaction[];
  setTransactions: (newTrans: Transaction[]) => void;

  TransactionsPagination: TransactionsPagination;
  setTransactionsPagination: (newPagination: TransactionsPagination) => void;

  user: User | null; // User type is defined in the backend
  setUser: (newUser: User) => void;

  Categories: Category[];
  setCategories: (newCategories: Category[]) => void;

  MonthlySummary: MonthlySummary[];
  setMonthlySummary: (newMonthlySummary: MonthlySummary[]) => void;

  MonthlyPerformance: MonthlyPerformance[];
  setMonthlyPerformance: (newMonthlyPerformance: MonthlyPerformance[]) => void;
};

export const applicationStore = create<Store>((set) => ({
  Transactions: [],
  setTransactions: (newTrans) => set({ Transactions: newTrans }),

  TransactionsPagination: {
    page: 1,
    totalPages: 1,
    total: 0,
    limit: 10,
    hasNextPage: false,
    hasPrevPage: false,
  },
  setTransactionsPagination: (newPagination) =>
    set({ TransactionsPagination: newPagination }),

  user: null,
  setUser: (newUser) => set({ user: newUser }),

  Categories: [],
  setCategories: (newCategories) => set({ Categories: newCategories }),

  MonthlySummary: [],
  setMonthlySummary: (newMonthlySummary) =>
    set({ MonthlySummary: newMonthlySummary }),

  MonthlyPerformance: [],
  setMonthlyPerformance: (newMonthlyPerformance) =>
    set({ MonthlyPerformance: newMonthlyPerformance }),
}));
