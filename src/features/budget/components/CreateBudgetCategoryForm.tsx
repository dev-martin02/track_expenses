import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { useToast } from "@/shared/components/ui/use-toast";

interface BudgetCategory {
  name: string;
  budget: number;
  spent: number;
  color: string;
}

interface CreateBudgetCategoryFormProps {
  onSubmit: (category: BudgetCategory) => void;
  onCancel?: () => void;
}

const colorOptions = [
  { value: "bg-red-100 text-red-700", label: "Red", preview: "bg-red-100" },
  { value: "bg-blue-100 text-blue-700", label: "Blue", preview: "bg-blue-100" },
  {
    value: "bg-green-100 text-green-700",
    label: "Green",
    preview: "bg-green-100",
  },
  {
    value: "bg-purple-100 text-purple-700",
    label: "Purple",
    preview: "bg-purple-100",
  },
  { value: "bg-pink-100 text-pink-700", label: "Pink", preview: "bg-pink-100" },
  {
    value: "bg-yellow-100 text-yellow-700",
    label: "Yellow",
    preview: "bg-yellow-100",
  },
  {
    value: "bg-indigo-100 text-indigo-700",
    label: "Indigo",
    preview: "bg-indigo-100",
  },
  { value: "bg-gray-100 text-gray-700", label: "Gray", preview: "bg-gray-100" },
];

export const CreateBudgetCategoryForm = ({
  onSubmit,
  onCancel,
}: CreateBudgetCategoryFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    budget: "",
    spent: "0",
    color: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Category name is required";
    }

    if (!formData.budget || parseFloat(formData.budget) <= 0) {
      newErrors.budget = "Budget amount must be greater than 0";
    }

    if (!formData.color) {
      newErrors.color = "Please select a color";
    }

    if (formData.spent && parseFloat(formData.spent) < 0) {
      newErrors.spent = "Spent amount cannot be negative";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors in the form",
        variant: "destructive",
      });
      return;
    }

    const newCategory: BudgetCategory = {
      name: formData.name.trim(),
      budget: parseFloat(formData.budget),
      spent: parseFloat(formData.spent) || 0,
      color: formData.color,
    };

    onSubmit(newCategory);

    toast({
      title: "Success",
      description: "Budget category created successfully!",
    });

    // Reset form
    setFormData({
      name: "",
      budget: "",
      spent: "0",
      color: "",
    });
    setErrors({});
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11/12 md:w-2/3 lg:w-2/5 p-6 shadow-2xl rounded-lg z-50 bg-white">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-900">
            Create Budget Category
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Category Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Category Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="e.g., Food & Dining"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name}</p>
              )}
            </div>

            {/* Budget Amount */}
            <div className="space-y-2">
              <Label htmlFor="budget">Budget Amount ($)</Label>
              <Input
                id="budget"
                type="number"
                step="0.01"
                min="0"
                placeholder="e.g., 500"
                value={formData.budget}
                onChange={(e) => handleInputChange("budget", e.target.value)}
                className={errors.budget ? "border-red-500" : ""}
              />
              {errors.budget && (
                <p className="text-sm text-red-500">{errors.budget}</p>
              )}
            </div>

            {/* Already Spent (Optional) */}
            <div className="space-y-2">
              <Label htmlFor="spent">Already Spent ($)</Label>
              <Input
                id="spent"
                type="number"
                step="0.01"
                min="0"
                placeholder="0"
                value={formData.spent}
                onChange={(e) => handleInputChange("spent", e.target.value)}
                className={errors.spent ? "border-red-500" : ""}
              />
              {errors.spent && (
                <p className="text-sm text-red-500">{errors.spent}</p>
              )}
            </div>

            {/* Color Selection */}
            <div className="space-y-2">
              <Label htmlFor="color">Color Theme</Label>
              <Select
                value={formData.color}
                onValueChange={(value) => handleInputChange("color", value)}
              >
                <SelectTrigger className={errors.color ? "border-red-500" : ""}>
                  <SelectValue placeholder="Choose a color theme" />
                </SelectTrigger>
                <SelectContent>
                  {colorOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-4 h-4 rounded ${option.preview} border`}
                        />
                        <span>{option.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.color && (
                <p className="text-sm text-red-500">{errors.color}</p>
              )}
            </div>

            {/* Preview */}
            {formData.name && formData.color && (
              <div className="space-y-2">
                <Label>Preview</Label>
                <div className={`p-3 rounded-lg ${formData.color}`}>
                  <div className="font-medium">{formData.name}</div>
                  <div className="text-sm">
                    ${formData.spent || 0} / ${formData.budget || 0}
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                className="flex-1 bg-finance-blue hover:bg-finance-blue-accent"
              >
                Create Category
              </Button>
              {onCancel && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={onCancel}
                  className="flex-1"
                >
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
