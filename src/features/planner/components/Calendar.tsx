import { Card } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { useState } from "react";

export function Calendar({
  selectedDate,
  hasPlannedExpense,
  setSelectedDate,
}: {
  selectedDate: number | null;
  hasPlannedExpense: (day: number) => boolean;
  setSelectedDate: (day: number) => void;
}) {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Get the first day of the month and how many days in the month
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const lastDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );
  const daysInMonth = lastDayOfMonth.getDate();
  const startingDayOfWeek = firstDayOfMonth.getDay(); // 0 = Sunday, 1 = Monday, etc.

  // Create array of days for the calendar grid
  const getDaysArray = () => {
    const days: (number | null)[] = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  // Format the current month for display
  const getCurrentMonth = () => {
    return currentDate.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  // Navigate to previous month
  const goToPreviousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  // Navigate to next month
  const goToNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  return (
    <div className="lg:col-span-2">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            {getCurrentMonth()}
          </h2>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="rounded-lg"
              onClick={goToPreviousMonth}
            >
              ←
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="rounded-lg"
              onClick={goToNextMonth}
            >
              →
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2 mb-4">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div
              key={day}
              className="text-center text-sm font-medium text-gray-500 py-2"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {getDaysArray().map((day, index) => (
            <div
              key={index}
              className={`aspect-square p-2 rounded-lg cursor-pointer transition-colors ${
                day === null
                  ? ""
                  : selectedDate === day
                  ? "bg-finance-blue-accent text-white"
                  : hasPlannedExpense(day)
                  ? "bg-finance-green hover:bg-finance-green/80"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => day && setSelectedDate(day)}
            >
              {day && (
                <div className="h-full flex flex-col justify-between">
                  <span className="text-sm font-medium">{day}</span>
                  {hasPlannedExpense(day) && (
                    <div className="w-2 h-2 bg-finance-green-accent rounded-full self-center"></div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
