
import { useState } from 'react';
import { Card } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';

export const MonthlyPlanner = () => {
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  
  const currentMonth = 'January 2024';
  const daysInMonth = 31;
  const startDay = 1; // Monday = 1, Sunday = 0
  
  const budgetCategories = [
    { name: 'Food & Dining', budget: 600, spent: 320, color: 'bg-red-100 text-red-700' },
    { name: 'Transportation', budget: 200, spent: 150, color: 'bg-blue-100 text-blue-700' },
    { name: 'Entertainment', budget: 300, spent: 180, color: 'bg-purple-100 text-purple-700' },
    { name: 'Shopping', budget: 400, spent: 250, color: 'bg-pink-100 text-pink-700' },
    { name: 'Bills & Utilities', budget: 800, spent: 720, color: 'bg-gray-100 text-gray-700' },
  ];

  const plannedExpenses = [
    { date: 15, name: 'Rent Payment', amount: 1200, category: 'Bills' },
    { date: 20, name: 'Car Insurance', amount: 150, category: 'Bills' },
    { date: 25, name: 'Dentist Appointment', amount: 200, category: 'Healthcare' },
    { date: 28, name: 'Friend\'s Birthday', amount: 80, category: 'Entertainment' },
  ];

  const getDaysArray = () => {
    const days = [];
    // Add empty cells for days before the start of month
    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }
    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const hasPlannedExpense = (day: number) => {
    return plannedExpenses.some(expense => expense.date === day);
  };

  const getPlannedExpense = (day: number) => {
    return plannedExpenses.find(expense => expense.date === day);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Monthly Planner</h1>
          <p className="text-gray-600">Plan your budget and track spending for {currentMonth}</p>
        </div>
        <Button className="bg-finance-green-accent hover:bg-finance-green-accent/90 text-white rounded-xl px-6">
          Add Planned Expense
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calendar */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">{currentMonth}</h2>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="rounded-lg">←</Button>
                <Button variant="outline" size="sm" className="rounded-lg">→</Button>
              </div>
            </div>
            
            <div className="grid grid-cols-7 gap-2 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                  {day}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-2">
              {getDaysArray().map((day, index) => (
                <div
                  key={index}
                  className={`aspect-square p-2 rounded-lg cursor-pointer transition-colors ${
                    day === null ? '' :
                    selectedDate === day ? 'bg-finance-blue-accent text-white' :
                    hasPlannedExpense(day) ? 'bg-finance-green hover:bg-finance-green/80' :
                    'hover:bg-gray-100'
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

        {/* Budget Overview */}
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Budget Overview</h3>
            <div className="space-y-4">
              {budgetCategories.map((category, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">{category.name}</span>
                    <span className="text-sm text-gray-500">
                      ${category.spent} / ${category.budget}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        category.spent > category.budget ? 'bg-red-500' : 'bg-finance-blue-accent'
                      }`}
                      style={{ width: `${Math.min((category.spent / category.budget) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>{Math.round((category.spent / category.budget) * 100)}% used</span>
                    <span className={category.spent > category.budget ? 'text-red-600' : 'text-finance-green-accent'}>
                      ${category.budget - category.spent} remaining
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Planned Expenses</h3>
            <div className="space-y-3">
              {plannedExpenses.map((expense, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{expense.name}</p>
                    <p className="text-sm text-gray-500">{expense.category} • Jan {expense.date}</p>
                  </div>
                  <span className="font-semibold text-gray-900">${expense.amount}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Selected Date Details */}
      {selectedDate && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            January {selectedDate}, 2024
          </h3>
          {getPlannedExpense(selectedDate) ? (
            <div className="bg-finance-green p-4 rounded-lg">
              <p className="font-medium text-finance-green-accent">
                {getPlannedExpense(selectedDate)?.name}
              </p>
              <p className="text-sm text-finance-green-accent/80">
                ${getPlannedExpense(selectedDate)?.amount} • {getPlannedExpense(selectedDate)?.category}
              </p>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>No planned expenses for this date</p>
              <Button className="mt-4 bg-finance-blue-accent text-white rounded-lg">
                Add Expense
              </Button>
            </div>
          )}
        </Card>
      )}
    </div>
  );
};
