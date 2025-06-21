// Transaction Type
export type TransactionType = "expense" | "income";

export type PaymentMethod = "Credit Card" | "Cash" | "Debit Card";

export interface Transaction {
  transaction_id: number;
  amount: string;
  place: string;
  transaction_date: string;
  description: string;
  method: PaymentMethod;
  category_id: number;
  transaction_type: TransactionType;
  user_id: number;
  created_at: string;
  notes?: string;
  receipt_date?: string;
  receipt_image_path?: string;
  receipt_number?: string;
}

export type TransactionsPagination = {
  page: number;
  totalPages: number;
  total: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

// Category Type
export type Category = {
  id: number;
  name: string;
  type: "expense" | "income";
  icon: string;
  color: string;
  description: string;
};

// User Type
export type User = {
  email: string;
  name: string;
};

export type MonthlySummary = {
  month: string;
  total_income: number;
  total_expense: number;
};

export type MonthlyPerformance = {
  month: string;
  total_income: number;
  total_expense: number;
  net_amount: number;
  transaction_counts: {
    income: number;
    expense: number;
  };
};
