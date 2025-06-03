import { Card } from '@/shared/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

export const Performance = () => {
  const monthlyData = [
    { month: 'Aug', income: 6500, expenses: 4200, savings: 2300 },
    { month: 'Sep', income: 6500, expenses: 3800, savings: 2700 },
    { month: 'Oct', income: 7200, expenses: 4100, savings: 3100 },
    { month: 'Nov', income: 6500, expenses: 4500, savings: 2000 },
    { month: 'Dec', income: 8000, expenses: 5200, savings: 2800 },
    { month: 'Jan', income: 6500, expenses: 3200, savings: 3300 },
  ];

  const categoryData = [
    { name: 'Food & Dining', value: 850, color: '#EF4444' },
    { name: 'Transportation', value: 320, color: '#3B82F6' },
    { name: 'Entertainment', value: 480, color: '#8B5CF6' },
    { name: 'Shopping', value: 620, color: '#EC4899' },
    { name: 'Bills & Utilities', value: 930, color: '#6B7280' },
  ];

  const weeklySpending = [
    { week: 'Week 1', amount: 680 },
    { week: 'Week 2', amount: 520 },
    { week: 'Week 3', amount: 890 },
    { week: 'Week 4', amount: 750 },
  ];

  const totalIncome = monthlyData[monthlyData.length - 1].income;
  const totalExpenses = monthlyData[monthlyData.length - 1].expenses;
  const totalSavings = monthlyData[monthlyData.length - 1].savings;
  const savingsRate = ((totalSavings / totalIncome) * 100).toFixed(1);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Performance Summary</h1>
        <p className="text-gray-600">Analyze your financial patterns and track your progress</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 bg-gradient-to-br from-finance-blue to-finance-blue-accent/20 border-0">
          <div className="text-center">
            <p className="text-finance-blue-accent/80 text-sm font-medium">Savings Rate</p>
            <p className="text-3xl font-bold text-finance-blue-accent">{savingsRate}%</p>
            <p className="text-xs text-finance-blue-accent/60 mt-1">This month</p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="text-center">
            <p className="text-gray-600 text-sm font-medium">Avg Monthly Spending</p>
            <p className="text-3xl font-bold text-gray-900">$4,167</p>
            <p className="text-xs text-finance-green-accent mt-1">↓ 8% from last month</p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="text-center">
            <p className="text-gray-600 text-sm font-medium">Budget Adherence</p>
            <p className="text-3xl font-bold text-gray-900">87%</p>
            <p className="text-xs text-finance-green-accent mt-1">↑ 12% improvement</p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="text-center">
            <p className="text-gray-600 text-sm font-medium">Goal Progress</p>
            <p className="text-3xl font-bold text-gray-900">64%</p>
            <p className="text-xs text-gray-500 mt-1">On track</p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Income vs Expenses Trend */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Income vs Expenses (6 months)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Line 
                type="monotone" 
                dataKey="income" 
                stroke="#10B981" 
                strokeWidth={3}
                dot={{ fill: '#10B981', strokeWidth: 2, r: 6 }}
              />
              <Line 
                type="monotone" 
                dataKey="expenses" 
                stroke="#3B82F6" 
                strokeWidth={3}
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="flex items-center justify-center space-x-6 mt-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-finance-green-accent rounded-full"></div>
              <span className="text-sm text-gray-600">Income</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-finance-blue-accent rounded-full"></div>
              <span className="text-sm text-gray-600">Expenses</span>
            </div>
          </div>
        </Card>

        {/* Spending by Category */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Spending by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {categoryData.map((category, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: category.color }}
                ></div>
                <span className="text-xs text-gray-600">{category.name}</span>
                <span className="text-xs font-medium text-gray-900">${category.value}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Weekly Spending Pattern */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Weekly Spending Pattern</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklySpending}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="week" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Bar 
                dataKey="amount" 
                fill="#3B82F6" 
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Savings Growth */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Savings Growth</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Line 
                type="monotone" 
                dataKey="savings" 
                stroke="#10B981" 
                strokeWidth={4}
                dot={{ fill: '#10B981', strokeWidth: 2, r: 8 }}
                fill="url(#savingsGradient)"
              />
              <defs>
                <linearGradient id="savingsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                </linearGradient>
              </defs>
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Monthly Summary */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">January 2024 Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-finance-green rounded-xl">
            <p className="text-finance-green-accent text-sm font-medium">Total Income</p>
            <p className="text-2xl font-bold text-finance-green-accent">${totalIncome.toLocaleString()}</p>
          </div>
          <div className="text-center p-4 bg-finance-blue rounded-xl">
            <p className="text-finance-blue-accent text-sm font-medium">Total Expenses</p>
            <p className="text-2xl font-bold text-finance-blue-accent">${totalExpenses.toLocaleString()}</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-xl">
            <p className="text-gray-600 text-sm font-medium">Net Savings</p>
            <p className="text-2xl font-bold text-gray-900">${totalSavings.toLocaleString()}</p>
          </div>
        </div>
      </Card>
    </div>
  );
};
