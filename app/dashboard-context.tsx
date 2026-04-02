'use client';

import React, { createContext, useContext, useState } from 'react';

type DashboardContextType = {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  role: 'Admin' | 'Viewer';
  setRole: (role: 'Admin' | 'Viewer') => void;
  sidebarOpen: boolean;
  setSidebarOpen: (value: boolean) => void;
};

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState(false);
  const [role, setRole] = useState<'Admin' | 'Viewer'>('Admin');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <DashboardContext.Provider
      value={{ darkMode, setDarkMode, role, setRole, sidebarOpen, setSidebarOpen }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within DashboardProvider');
  }
  return context;
}
