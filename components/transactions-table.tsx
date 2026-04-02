'use client';

import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { useFinanceStore } from '@/src/store/useFinanceStore';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  ChevronDown,
  Download,
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  ArrowUpDown,
  Pencil,
  Trash2,
} from 'lucide-react';
import { useState, useMemo, useCallback } from 'react';
import {
  TransactionModal,
  type TransactionRecord,
} from '@/components/transaction-modal';

interface Transaction {
  id: string;
  date: string;
  description: string;
  category: string;
  type: 'income' | 'expense';
  amount: number;
}

type SortKey = 'date' | 'amount';

function escapeCsvField(value: string): string {
  if (/[",\n\r]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export function TransactionsTable() {
  const role = useFinanceStore((state) => state.role);
  const deleteTransaction = useFinanceStore((state) => state.deleteTransaction);
  const transactions = useFinanceStore((state) => state.transactions) as Transaction[];

  const isAdmin = role === 'admin';

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [sortConfig, setSortConfig] = useState<{
    key: SortKey;
    direction: 'asc' | 'desc';
  }>({ key: 'date', direction: 'desc' });

  const [modalOpen, setModalOpen] = useState(false);
  const [editingTx, setEditingTx] = useState<TransactionRecord | null>(null);

  const filteredTransactions = useMemo(() => {
    let result = [...transactions];

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      result = result.filter((tx) =>
        tx.description.toLowerCase().includes(q)
      );
    }

    if (categoryFilter !== 'All') {
      result = result.filter((tx) => tx.category === categoryFilter);
    }

    if (typeFilter !== 'All') {
      result = result.filter((tx) => tx.type === typeFilter);
    }

    result.sort((a, b) => {
      if (sortConfig.key === 'date') {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return sortConfig.direction === 'asc' ? dateA - dateB : dateB - dateA;
      }
      if (sortConfig.key === 'amount') {
        return sortConfig.direction === 'asc'
          ? a.amount - b.amount
          : b.amount - a.amount;
      }
      return 0;
    });

    return result;
  }, [transactions, searchTerm, categoryFilter, typeFilter, sortConfig]);

  const handleSort = useCallback((key: SortKey) => {
    setSortConfig((prev) => {
      if (prev.key === key && prev.direction === 'asc') {
        return { key, direction: 'desc' };
      }
      return { key, direction: 'asc' };
    });
  }, []);

  const handleExportCSV = useCallback(() => {
    if (filteredTransactions.length === 0) return;

    const header = 'Date,Description,Category,Type,Amount';
    const rows = filteredTransactions.map((tx) => {
      const date = escapeCsvField(tx.date);
      const desc = escapeCsvField(tx.description);
      const cat = escapeCsvField(tx.category);
      const typ = escapeCsvField(tx.type);
      return `${date},${desc},${cat},${typ},${tx.amount}`;
    });
    const csvContent = [header, ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'transactions_export.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [filteredTransactions]);

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(transactions.map((tx) => tx.category))).sort()],
    [transactions]
  );

  const openAdd = () => {
    setEditingTx(null);
    setModalOpen(true);
  };

  const openEdit = (tx: Transaction) => {
    setEditingTx(tx);
    setModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this transaction?')) {
      deleteTransaction(id);
    }
  };

  const emptyColSpan = isAdmin ? 6 : 5;

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 sm:flex-row sm:flex-wrap sm:items-center">
        <Input
          placeholder="Search transactions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="min-w-[200px] flex-1"
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              Category <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {categories.map((cat) => (
              <DropdownMenuItem
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={categoryFilter === cat ? 'bg-muted' : ''}
              >
                {cat === 'All' ? 'All Categories' : cat}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              Type <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => setTypeFilter('All')}
              className={typeFilter === 'All' ? 'bg-muted' : ''}
            >
              All Types
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setTypeFilter('income')}
              className={typeFilter === 'income' ? 'bg-muted' : ''}
            >
              Income
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setTypeFilter('expense')}
              className={typeFilter === 'expense' ? 'bg-muted' : ''}
            >
              Expense
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          variant="outline"
          size="sm"
          className="gap-2"
          onClick={handleExportCSV}
          disabled={filteredTransactions.length === 0}
        >
          <Download className="h-4 w-4" />
          Export CSV
        </Button>

        {isAdmin && (
          <Button size="sm" className="gap-2" onClick={openAdd}>
            <Plus className="h-4 w-4" />
            Add Transaction
          </Button>
        )}
      </div>

      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-border hover:bg-transparent">
                <TableHead
                  onClick={() => handleSort('date')}
                  className="cursor-pointer select-none hover:bg-muted"
                >
                  <span className="inline-flex items-center gap-1">
                    Date
                    <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground" />
                    {sortConfig.key === 'date' && (
                      <span className="text-xs">
                        {sortConfig.direction === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </span>
                </TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Type</TableHead>
                <TableHead
                  onClick={() => handleSort('amount')}
                  className="cursor-pointer select-none text-right hover:bg-muted"
                >
                  <span className="inline-flex w-full items-center justify-end gap-1">
                    Amount
                    <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground" />
                    {sortConfig.key === 'amount' && (
                      <span className="text-xs">
                        {sortConfig.direction === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </span>
                </TableHead>
                {isAdmin && (
                  <TableHead className="text-right">Actions</TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={emptyColSpan}
                    className="py-12 text-center text-muted-foreground"
                  >
                    No transactions found matching your filters.
                  </TableCell>
                </TableRow>
              ) : (
                filteredTransactions.map((tx, index) => (
                  <motion.tr
                    key={tx.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="border-b border-border transition-colors hover:bg-muted/50"
                  >
                    <TableCell className="font-medium">
                      {new Date(tx.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </TableCell>
                    <TableCell>{tx.description}</TableCell>
                    <TableCell>{tx.category}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
                          tx.type === 'income'
                            ? 'bg-success/10 text-success'
                            : 'bg-destructive/10 text-destructive'
                        }`}
                      >
                        {tx.type === 'income' ? (
                          <ArrowDownLeft className="h-3 w-3" />
                        ) : (
                          <ArrowUpRight className="h-3 w-3" />
                        )}
                        {tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {tx.type === 'income' ? '+' : '-'}$
                      {tx.amount.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </TableCell>
                    {isAdmin && (
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon-sm"
                            className="text-primary"
                            aria-label="Edit transaction"
                            onClick={() => openEdit(tx)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon-sm"
                            className="text-destructive hover:text-destructive"
                            aria-label="Delete transaction"
                            onClick={() => handleDelete(tx.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    )}
                  </motion.tr>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <TransactionModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        existingTx={editingTx}
      />
    </div>
  );
}
