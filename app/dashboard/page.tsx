'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Header } from '@/components/header';
import { Sidebar } from '@/components/sidebar';
import { SummaryCard } from '@/components/summary-card';
import { InsightCard } from '@/components/insight-card';
import { BalanceChart, SpendingChart } from '@/components/charts';
import { TransactionsTable } from '@/components/transactions-table';
import { DashboardSkeleton } from '@/components/dashboard-skeleton';
import { useFinanceStore } from '@/src/store/useFinanceStore';
import { calculateSummary, getHighestSpendingCategory } from '@/src/utils/helpers';

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const transactions = useFinanceStore((state) => state.transactions);
  const { income, expenses, balance } = calculateSummary(transactions);
  const topSpending = getHighestSpendingCategory(transactions);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-background">
          <div className="space-y-8 p-4 sm:p-6 lg:p-8">
            {isLoading ? (
              <DashboardSkeleton />
            ) : (
              <>
                <div>
                  <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
                  <p className="mt-2 text-muted-foreground">
                    Welcome back! Here&apos;s your financial overview.
                  </p>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0 }}
                  >
                    <SummaryCard
                      title="Total Balance"
                      amount={`$${balance.toLocaleString()}`}
                      trend={2.5}
                      positive={true}
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.08 }}
                  >
                    <SummaryCard
                      title="Total Income"
                      amount={`$${income.toLocaleString()}`}
                      trend={5.2}
                      positive={true}
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.16 }}
                  >
                    <SummaryCard
                      title="Total Expenses"
                      amount={`$${expenses.toLocaleString()}`}
                      trend={-1.8}
                      positive={false}
                    />
                  </motion.div>
                </div>

                <div className="grid gap-6 xl:grid-cols-12">
                  <div className="xl:col-span-6">
                    <BalanceChart />
                  </div>
                  <div className="xl:col-span-4">
                    <SpendingChart />
                  </div>
                  <motion.div
                    className="xl:col-span-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.28 }}
                  >
                    <InsightCard
                      title="Highest Spending Category"
                      value={
                        topSpending
                          ? `${topSpending.name} ($${topSpending.amount.toLocaleString()})`
                          : 'No expense data'
                      }
                      subtitle={
                        topSpending
                          ? `${topSpending.percentOfTotalExpenses}% of total expenses ($${topSpending.totalExpenses.toLocaleString()})`
                          : undefined
                      }
                    />
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.32 }}
                >
                  <h2 className="mb-6 text-2xl font-bold text-foreground">
                    Recent Transactions
                  </h2>
                  <TransactionsTable />
                </motion.div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
