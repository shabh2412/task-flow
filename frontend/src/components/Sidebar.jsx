import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  CheckSquare,
  ListTodo,
  Clock,
  CheckCircle2,
  Sun,
  Moon,
  LogOut,
  Shield
} from 'lucide-react';

const Sidebar = ({ activeFilter, onFilterChange, stats }) => {
  const { user, logout, isAdmin } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { id: 'all', label: 'All Tasks', icon: ListTodo, count: stats.total },
    { id: 'pending', label: 'Pending', icon: Clock, count: stats.pending },
    { id: 'completed', label: 'Completed', icon: CheckCircle2, count: stats.completed },
  ];

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-card transition-transform -translate-x-full lg:translate-x-0">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center gap-2 border-b px-6">
          <CheckSquare className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">TaskFlow</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-4">
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Tasks
          </p>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onFilterChange(item.id)}
              className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${activeFilter === item.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
            >
              <span className="flex items-center gap-3">
                <item.icon className="h-4 w-4" />
                {item.label}
              </span>
              <span className={`rounded-full px-2 py-0.5 text-xs ${activeFilter === item.id
                  ? 'bg-primary-foreground/20 text-primary-foreground'
                  : 'bg-muted-foreground/10'
                }`}>
                {item.count}
              </span>
            </button>
          ))}
        </nav>

        {/* User Section */}
        <div className="border-t p-4">
          <div className="mb-3 flex items-center gap-3 rounded-lg bg-muted/50 p-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-medium">{user?.name}</p>
              <p className="flex items-center gap-1 text-xs text-muted-foreground">
                {isAdmin && <Shield className="h-3 w-3" />}
                {isAdmin ? 'Administrator' : 'Member'}
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={toggleTheme}
            >
              {theme === 'light' ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1 text-destructive hover:bg-destructive hover:text-destructive-foreground"
              onClick={logout}
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
