import { Header } from '@/components/header';
import { Sidebar } from '@/components/sidebar';
import { TransactionsTable } from '@/components/transactions-table';

export default function TransactionsPage() {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-background">
          <div className="space-y-8 p-4 sm:p-6 lg:p-8">
            {/* Header */}
            <div>
              <h1 className="text-3xl font-bold text-foreground">Transactions</h1>
              <p className="mt-2 text-muted-foreground">
                View and manage all your transactions in one place.
              </p>
            </div>

            {/* Transactions Table */}
            <TransactionsTable />
          </div>
        </main>
      </div>
    </div>
  );
}
