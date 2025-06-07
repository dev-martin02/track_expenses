import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { applicationStore } from "@/shared/Store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { logout } from "@/features/auth/api/api";
import { useToast } from "@/shared/components/ui/use-toast";

const navItems = [
  { name: "Dashboard", path: "/dashboard", icon: "📊" },
  { name: "Transactions", path: "/transactions", icon: "💳" },
  { name: "Planner", path: "/planner", icon: "📅" },
  { name: "Performance", path: "/performance", icon: "📈" },
  { name: "Settings", path: "/settings", icon: "⚙️" },
];

export const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, setUser } = applicationStore();

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      localStorage.removeItem("sessionId");
      navigate("/login");
      toast({
        title: "Success",
        description: "You have been logged out successfully.",
      });
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to logout. Please try again.",
      });
    }
  };

  return (
    <nav className="bg-white border-r border-gray-100 h-full w-64 p-6 fixed left-0 top-0 z-10">
      <div className="mb-8">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 outline-none">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{user?.name}</h1>
              <p className="text-sm text-gray-500 mt-1">
                Personal Finance Manager
              </p>
            </div>
            <span className="text-gray-400">▼</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
