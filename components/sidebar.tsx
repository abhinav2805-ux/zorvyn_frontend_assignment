'use client';

import { useDashboard } from '@/app/dashboard-context';
import { LayoutDashboard, Settings, Wallet, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Sidebar() {
  const { sidebarOpen, setSidebarOpen } = useDashboard();
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Transactions', path: '/transactions', icon: Wallet },
    { label: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-transform duration-300 lg:relative lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } z-50 flex flex-col`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-sidebar-border bg-sidebar p-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary">
              <Wallet className="h-5 w-5 text-sidebar-primary-foreground" />
            </div>
            <span className="hidden text-lg font-bold text-sidebar-primary lg:inline">FinanceHub</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-4">
          {navItems.map(({ label, path, icon: Icon }) => (
            <Link
              key={path}
              href={path}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                isActive(path)
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{label}</span>
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-sidebar-border p-4">
          <div className="rounded-lg bg-sidebar-accent p-4">
            <p className="text-xs font-medium text-sidebar-accent-foreground">
              Pro Tier
            </p>
            <p className="mt-1 text-xs text-sidebar-accent-foreground/70">
              Unlimited transactions
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
