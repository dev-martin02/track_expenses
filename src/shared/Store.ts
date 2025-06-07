import { create } from "zustand";
import {
  Category,
  Transaction,
  User,
  MonthlySummary,
  TransactionsPagination,
} from "./type";

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
}));
