import { Header } from '@/components/header';
import { Sidebar } from '@/components/sidebar';
import { SummaryCard } from '@/components/summary-card';
import { InsightCard } from '@/components/insight-card';
import { BalanceChart, SpendingChart } from '@/components/charts';
import { TransactionsTable } from '@/components/transactions-table';

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-background">
          <div className="space-y-8 p-4 sm:p-6 lg:p-8">
            {/* Welcome Section */}
            <div>
              <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
              <p className="mt-2 text-muted-foreground">
                Welcome back! Here&apos;s your financial overview.
              </p>
            </div>

            {/* Summary Cards */}
            <div className="grid gap-6 md:grid-cols-3">
              <SummaryCard
                title="Total Balance"
                amount="$28,450.00"
                trend={2.5}
                positive={true}
              />
              <SummaryCard
                title="Total Income"
                amount="$15,800.00"
                trend={5.2}
                positive={true}
              />
              <SummaryCard
                title="Total Expenses"
                amount="$4,234.50"
                trend={-1.8}
                positive={false}
              />
            </div>

            {/* Charts and Insight */}
            <div className="grid gap-6 xl:grid-cols-12">
              <div className="xl:col-span-6">
                <BalanceChart />
              </div>
              <div className="xl:col-span-4">
                <SpendingChart />
              </div>
              <div className="xl:col-span-2">
                <InsightCard
                  title="Highest Spending Category"
                  value="Housing ($1,200)"
                />
              </div>
            </div>

            {/* Transactions */}
            <div>
              <h2 className="mb-6 text-2xl font-bold text-foreground">
                Recent Transactions
              </h2>
              <TransactionsTable />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
