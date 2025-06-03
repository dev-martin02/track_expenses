import { TransactionType, PaymentMethod } from "@/shared/type";

export interface TransactionFormData {
    amount: string;
    place: string;
    transaction_date: string;
    description: string;
    method: PaymentMethod;
    category_id: number;
    transaction_type: TransactionType;
  }
  
