import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { applicationStore } from '@/shared/Store';

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: '📊' },
  { name: 'Transactions', path: '/transactions', icon: '💳' },
  { name: 'Planner', path: '/planner', icon: '📅' },
  { name: 'Performance', path: '/performance', icon: '📈' },
  { name: 'Settings', path: '/settings', icon: '⚙️' },
];

export const Navigation = () => {
  const location = useLocation();
  const { user } = applicationStore();

  return (
    <nav className="bg-white border-r border-gray-100 h-full w-64 p-6 fixed left-0 top-0 z-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 font-inter">{user?.name}</h1>
        <p className="text-sm text-gray-500 mt-1">Personal Finance Manager</p>
      </div>
      
      <ul className="space-y-2">
        {navItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={cn(
                "flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium",
                location.pathname === item.path
                  ? "bg-finance-blue text-finance-blue-accent"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
