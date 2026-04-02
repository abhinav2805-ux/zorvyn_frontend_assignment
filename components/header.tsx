'use client';

import { useDashboard } from '@/app/dashboard-context';
import { useFinanceStore } from '@/src/store/useFinanceStore';
import { Switch } from '@/components/ui/switch';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Menu, ChevronDown, Shield, User } from 'lucide-react';
import { useEffect } from 'react';

export function Header() {
  const { darkMode, setDarkMode, setSidebarOpen } = useDashboard();
  const role = useFinanceStore((s) => s.role);
  const setRole = useFinanceStore((s) => s.setRole);
  const roleLabel = role === 'admin' ? 'Admin' : 'Viewer';

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background">
      <div className="flex items-center justify-between px-4 py-4 sm:px-6">
        {/* Left Section */}
        <button
          onClick={() => setSidebarOpen(prev => !prev)}
          className="lg:hidden"
        >
          <Menu className="h-6 w-6" />
        </button>

        <div className="flex-1" />

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Dark Mode Toggle */}
          <div className="flex items-center gap-2 rounded-lg border border-border px-3 py-2">
            <span className="text-sm font-medium text-muted-foreground">Dark Mode</span>
            <Switch
              checked={darkMode}
              onCheckedChange={setDarkMode}
              aria-label="Toggle dark mode"
            />
          </div>

          {/* Role Dropdown (Zustand — persisted) */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 hover:bg-muted">
                {role === 'admin' ? (
                  <Shield className="h-4 w-4 text-primary" />
                ) : (
                  <User className="h-4 w-4 text-muted-foreground" />
                )}
                <span className="text-sm font-medium">View As: {roleLabel}</span>
                <ChevronDown className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setRole('admin')}>
                Admin
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setRole('viewer')}>
                Viewer
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Avatar */}
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
            JD
          </div>
        </div>
      </div>
    </header>
  );
}
