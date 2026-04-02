import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { mockTransactions } from '../utils/mockData';

export const useFinanceStore = create(
  persist(
    (set) => ({
      // State variables
      transactions: mockTransactions,
      role: 'viewer', // 'viewer' or 'admin'
      theme: 'light', // 'light' or 'dark'

      // Actions
      setRole: (newRole) => set({ role: newRole }),

      setTheme: (newTheme) => set({ theme: newTheme }),

      addTransaction: (transaction) =>
        set((state) => ({
          transactions: [transaction, ...state.transactions],
        })),

      deleteTransaction: (id) =>
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        })),

      updateTransaction: (updatedTx) =>
        set((state) => ({
          transactions: state.transactions.map((t) =>
            t.id === updatedTx.id ? updatedTx : t
          ),
        })),
    }),
    {
      name: 'finance-dashboard-storage',
      // This is the key used in localStorage
    }
  )
);
