import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/shared/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form"
import { Input } from "@/shared/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select"
import { useToast } from "@/shared/components/ui/use-toast"
import type { Category } from "@/shared/type"
import { Textarea } from "@/shared/components/ui/textarea"

const categorySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  type: z.enum(["expense", "income"]),
  icon: z.string().min(1, "Please select an icon"),
  color: z.string().min(1, "Please select a color"),
  description: z.string().min(5, "Description must be at least 5 characters"),
})

type CategoryFormValues = z.infer<typeof categorySchema>

const icons = ["💰", "🏠", "🍔", "🚗", "🎮", "📱", "👕", "💊", "🎓", "✈️",  "🎉", "🎁", "🎈", "🎂", "🎃", "🎄", "🎆", "🎇", "🎈", "🎉", "🎊", "🎋", "🎌", "🎍", "🎎", "🎏", "🎐", "🎑", "🎒", "🎓", "🎔", "🎕", "🎖", "🎗", "🎘", "🎙", "🎚", "🎛", "🎜", "🎝", "🎞", "🎟", "🎠", "🎡", "🎢", "🎣", "🎤", "🎥", "🎦", "🎧", "🎨", "🎩", "🎪", "🎫", "🎬", "🎭", "🎮", "🎯", "🎰", "🎱", "🎲", "🎳", "🎴", "🎵", "🎶", "🎷", "🎸", "🎹", "🎺", "🎻", "🎼", "🎽"]
const colors = [
  { name: "Blue", value: "#3B82F6" },
  { name: "Red", value: "#EF4444" },
  { name: "Purple", value: "#8B5CF6" },
  { name: "Pink", value: "#EC4899" },
  { name: "Indigo", value: "#6366F1" },
  { name: "Gray", value: "#6B7280" },
  { name: "baby blue", value: "#e8f4fd" },
  { name: "light green", value: "#e8f8f5" },
  { name: "light red", value: "#fde8e8" },
  { name: "light yellow", value: "#fef3c7" },
  { name: "light purple", value: "#f3e8ff" },
  { name: "light pink", value: "#f9e6f5" },
  { name: "light indigo", value: "#e6e6fa" },
  { name: "light gray", value: "#f0f0f0" }
]

export function CategoryForm({ onClose }: { onClose: () => void }) {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      type: "expense",
      icon: "",
      color: colors[0].value,
      description: "",
    },
  })

  const formData = form.watch()

  async function onSubmit(data: CategoryFormValues) {
    setIsLoading(true)
    try {
      // TODO: Implement your category creation/update logic here
      console.log(data)
      toast({
        title: "Success",
        description: "Category has been saved successfully.",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11/12 md:w-2/3 lg:w-2/5 p-6 shadow-2xl rounded-lg z-50 bg-white">
      <div className="flex flex-col justify-center p-6">
        <header className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Category Form</h2>
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
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center text-white shadow-md"
              style={{ backgroundColor: formData.color }}
            >
              <span className="text-2xl">{formData.icon || "📊"}</span>
            </div>
            <div className="flex-1">
              <h1 className="font-bold text-xl text-gray-800">
                {formData.name || "New Category"}
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    formData.type === "expense"
                      ? "bg-red-100 text-red-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {formData.type}
                </span>
                {formData.description && (
                  <span className="text-xs text-gray-500 truncate max-w-xs">
                    {formData.description}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="p-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                {/* Top fields in 2-column grid */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Icon */}
                  <FormField
                    control={form.control}
                    name="icon"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Icon</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          disabled={isLoading}
                        >
                          <FormControl>
                            <SelectTrigger className="h-12 text-xl text-center">
                              <SelectValue placeholder="Select an icon" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {icons.map((icon) => (
                              <SelectItem key={icon} value={icon}>
                                <div className="flex items-center gap-2">
                                  <span>{icon}</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Type */}
                  <FormField
                    control={form.control}
                    name="type"
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

                {/* Name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. Groceries, Salary"
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Color */}
                <FormField
                  control={form.control}
                  name="color"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Color</FormLabel>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {colors.map((color) => (
                          <button
                            key={color.value}
                            type="button"
                            className={`w-8 h-8 rounded-full cursor-pointer transition-all ${
                              field.value === color.value
                                ? "ring-2 ring-offset-2 ring-gray-800 scale-110"
                                : "hover:scale-110"
                            }`}
                            style={{ backgroundColor: color.value }}
                            onClick={() => field.onChange(color.value)}
                            title={color.name}
                            disabled={isLoading}
                          />
                        ))}
                      </div>
                      <FormControl>
                        <Input
                          type="color"
                          {...field}
                          className="w-full h-10 rounded-md cursor-pointer appearance-none bg-transparent border border-gray-300"
                          disabled={isLoading}
                        />
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
                          placeholder="Add notes about this category (optional)"
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
                      "Save Category"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
} 