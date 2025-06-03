
import { useState } from 'react';
import { Card } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { Switch } from '@/shared/components/ui/switch';

export const Settings = () => {
  const [monthlyIncome, setMonthlyIncome] = useState('6500');
  const [currency, setCurrency] = useState('USD');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [budgetAlerts, setBudgetAlerts] = useState(true);
  const [goalReminders, setGoalReminders] = useState(false);

  const financialGoals = [
    { id: 1, name: 'Emergency Fund', target: 10000, current: 2500, deadline: '2024-12-31' },
    { id: 2, name: 'Vacation Fund', target: 3000, current: 1200, deadline: '2024-06-15' },
    { id: 3, name: 'New Laptop', target: 1500, current: 800, deadline: '2024-03-30' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Manage your profile, income, goals, and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Profile & Income */}
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Profile Information</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-finance-blue-accent rounded-full flex items-center justify-center">
                  <span className="text-2xl text-white">👤</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Alex Johnson</h4>
                  <p className="text-sm text-gray-500">alex.johnson@email.com</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="monthly-income">Monthly Income</Label>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className="text-gray-500">$</span>
                    <Input
                      id="monthly-income"
                      type="number"
                      value={monthlyIncome}
                      onChange={(e) => setMonthlyIncome(e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="currency">Currency</Label>
                  <select
                    id="currency"
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-finance-blue-accent focus:border-transparent"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="CAD">CAD ($)</option>
                  </select>
                </div>
              </div>
              
              <Button className="w-full bg-finance-blue-accent hover:bg-finance-blue-accent/90 text-white">
                Update Profile
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Notification Preferences</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Push Notifications</p>
                  <p className="text-sm text-gray-500">Receive notifications on your device</p>
                </div>
                <Switch
                  checked={notificationsEnabled}
                  onCheckedChange={setNotificationsEnabled}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Budget Alerts</p>
                  <p className="text-sm text-gray-500">Get notified when approaching budget limits</p>
                </div>
                <Switch
                  checked={budgetAlerts}
                  onCheckedChange={setBudgetAlerts}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Goal Reminders</p>
                  <p className="text-sm text-gray-500">Weekly reminders about your financial goals</p>
                </div>
                <Switch
                  checked={goalReminders}
                  onCheckedChange={setGoalReminders}
                />
              </div>
            </div>
          </Card>
        </div>

        {/* Financial Goals */}
        <div className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Financial Goals</h3>
              <Button 
                size="sm" 
                className="bg-finance-green-accent hover:bg-finance-green-accent/90 text-white"
              >
                Add Goal
              </Button>
            </div>
            
            <div className="space-y-6">
              {financialGoals.map((goal) => (
                <div key={goal.id} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-900">{goal.name}</h4>
                    <button className="text-gray-400 hover:text-gray-600">✕</button>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium">
                        ${goal.current.toLocaleString()} / ${goal.target.toLocaleString()}
                      </span>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="h-3 bg-finance-green-accent rounded-full transition-all duration-300"
                        style={{ width: `${(goal.current / goal.target) * 100}%` }}
                      ></div>
                    </div>
                    
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>{Math.round((goal.current / goal.target) * 100)}% complete</span>
                      <span>Due: {new Date(goal.deadline).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Budget Categories</h3>
            <div className="space-y-4">
              {[
                { name: 'Food & Dining', budget: 600 },
                { name: 'Transportation', budget: 200 },
                { name: 'Entertainment', budget: 300 },
                { name: 'Shopping', budget: 400 },
                { name: 'Bills & Utilities', budget: 800 },
              ].map((category, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="font-medium text-gray-900">{category.name}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-500">$</span>
                    <Input
                      type="number"
                      value={category.budget}
                      className="w-20"
                    />
                  </div>
                </div>
              ))}
            </div>
            
            <Button className="w-full mt-6 bg-finance-blue-accent hover:bg-finance-blue-accent/90 text-white">
              Update Budgets
            </Button>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Data & Privacy</h3>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                📊 Export Data
              </Button>
              <Button variant="outline" className="w-full justify-start">
                🔒 Privacy Settings
              </Button>
              <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700">
                🗑️ Delete Account
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
