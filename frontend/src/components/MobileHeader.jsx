import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { Button } from '@/components/ui/button';
import {
  CheckSquare,
  Menu,
  X,
  ListTodo,
  Clock,
  CheckCircle2,
  Sun,
  Moon,
  LogOut,
  Shield
} from 'lucide-react';

const MobileHeader = ({ activeFilter, onFilterChange, stats }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout, isAdmin } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { id: 'all', label: 'All Tasks', icon: ListTodo, count: stats.total },
    { id: 'pending', label: 'Pending', icon: Clock, count: stats.pending },
    { id: 'completed', label: 'Completed', icon: CheckCircle2, count: stats.completed },
  ];

  const handleFilterChange = (filter) => {
    onFilterChange(filter);
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Header */}
      <header className="fixed left-0 right-0 top-0 z-50 flex h-16 items-center justify-between border-b bg-card px-4 lg:hidden">
        <div className="flex items-center gap-2">
          <CheckSquare className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold">TaskFlow</span>
        </div>
        <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </header>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <div className={`fixed right-0 top-0 z-50 h-full w-72 transform bg-card shadow-xl transition-transform lg:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center justify-between border-b px-4">
            <span className="font-semibold">Menu</span>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <nav className="flex-1 space-y-1 p-4">
            <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Filter Tasks
            </p>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleFilterChange(item.id)}
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
                  <><Moon className="mr-2 h-4 w-4" /> Dark</>
                ) : (
                  <><Sun className="mr-2 h-4 w-4" /> Light</>
                )}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 text-destructive hover:bg-destructive hover:text-destructive-foreground"
                onClick={logout}
              >
                <LogOut className="mr-2 h-4 w-4" /> Logout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileHeader;
