import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/shared/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { useToast } from "@/shared/components/ui/use-toast";
import { Textarea } from "@/shared/components/ui/textarea";
import { applicationStore } from "@/shared/Store";
import { createTransaction } from "../api/api";
import { TransactionFormData } from "../types";

const transactionSchema = z.object({
  amount: z.string().min(1, "Amount is required"),
  place: z.string().min(2, "Place must be at least 2 characters"),
  transaction_date: z.string().min(1, "Date is required"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  method: z.enum(["Credit Card", "Cash", "Debit Card"]),
  category_id: z.number().min(1, "Please select a category"),
  transaction_type: z.enum(["expense", "income"]),
  notes: z.string().optional(),
});

type TransactionFormValues = TransactionFormData;

interface TransactionFormProps {
  onClose: () => void;
}

export function TransactionForm({ onClose }: TransactionFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { Categories } = applicationStore();

  const form = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      amount: "",
      place: "",
      transaction_date: new Date().toISOString().split("T")[0],
      description: "",
      method: "Cash",
      category_id: 0,
      transaction_type: "expense",
    },
  });

  const formData = form.watch();

  async function onSubmit(data: TransactionFormValues) {
    setIsLoading(true);
    try {
      await createTransaction(data);
      toast({
        title: "Success",
        description: "Transaction has been saved successfully.",
      });
      onClose();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11/12 md:w-2/3 lg:w-2/5 p-6 shadow-2xl rounded-lg z-50 bg-white">
      <div className="flex flex-col justify-center p-6">
        <header className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Transaction Form</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            ✕
          </button>
        </header>

        <div className="rounded-2xl shadow-lg overflow-hidden">
          {/* Preview Header */}
          <div
            className="p-6 flex items-center gap-4 border-b"
            style={{ backgroundColor: "rgba(99, 102, 241, 0.05)" }}
          >
            <div className="flex-1">
              <h1 className="font-bold text-xl text-gray-800">
                {formData.place || "New Transaction"}
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    formData.transaction_type === "expense"
                      ? "bg-red-100 text-red-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {formData.transaction_type}
                </span>
                {formData.amount && (
                  <span className="text-lg font-semibold">
                    ${formData.amount}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="p-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                {/* Top fields in 2-column grid */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Amount */}
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Amount</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            disabled={isLoading}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Transaction Type */}
                  <FormField
                    control={form.control}
                    name="transaction_type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          disabled={isLoading}
                        >
                          <FormControl>
                            <SelectTrigger className="h-12">
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="expense">Expense</SelectItem>
                            <SelectItem value="income">Income</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Place */}
                <FormField
                  control={form.control}
                  name="place"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Place</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. Walmart, Salary"
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Payment Method */}
                <FormField
                  control={form.control}
                  name="method"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Payment Method</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={isLoading}
                      >
                        <FormControl>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Select payment method" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Credit Card">
                            Credit Card
                          </SelectItem>
                          <SelectItem value="Cash">Cash</SelectItem>
                          <SelectItem value="Debit Card">Debit Card</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Category */}
                <FormField
                  control={form.control}
                  name="category_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select
                        onValueChange={(value) => field.onChange(Number(value))}
                        defaultValue={field.value?.toString()}
                        disabled={isLoading}
                      >
                        <FormControl>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Categories.filter(
                            (category) =>
                              category.type === formData.transaction_type
                          ).map((category) => (
                            <SelectItem
                              key={category.id}
                              value={category.id.toString()}
                            >
                              <div className="flex items-center gap-2">
                                <span>{category.icon}</span>
                                <span>{category.name}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Transaction Date */}
                <FormField
                  control={form.control}
                  name="transaction_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date</FormLabel>
                      <FormControl>
                        <Input type="date" disabled={isLoading} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Description */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Add details about this transaction"
                          className="resize-none"
                          rows={3}
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Save Button */}
                <div className="flex gap-2.5 pt-3">
                  <Button
                    type="submit"
                    className="w-40 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Saving...
                      </div>
                    ) : (
                      "Save Transaction"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
