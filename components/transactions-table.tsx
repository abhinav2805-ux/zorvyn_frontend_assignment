'use client';

import { useDashboard } from '@/app/dashboard-context';
import { Input } from '@/components/ui/input';
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
import { ChevronDown, Download, Plus, MoreHorizontal, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { useState, useMemo } from 'react';

interface Transaction {
  id: string;
  date: string;
  description: string;
  category: string;
  type: 'income' | 'expense';
  amount: number;
}

const transactionsData: Transaction[] = [
  {
    id: '1',
    date: '2024-07-15',
    description: 'Monthly Salary',
    category: 'Income',
    type: 'income',
    amount: 5000,
  },
  {
    id: '2',
    date: '2024-07-14',
    description: 'Apartment Rent',
    category: 'Housing',
    type: 'expense',
    amount: 1200,
  },
  {
    id: '3',
    date: '2024-07-13',
    description: 'Grocery Store',
    category: 'Food',
    type: 'expense',
    amount: 124.50,
  },
  {
    id: '4',
    date: '2024-07-12',
    description: 'Gas Station',
    category: 'Transport',
    type: 'expense',
    amount: 56.00,
  },
  {
    id: '5',
    date: '2024-07-11',
    description: 'Movie Tickets',
    category: 'Entertainment',
    type: 'expense',
    amount: 30.00,
  },
  {
    id: '6',
    date: '2024-07-10',
    description: 'Freelance Project',
    category: 'Income',
    type: 'income',
    amount: 800,
  },
  {
    id: '7',
    date: '2024-07-09',
    description: 'Coffee Shop',
    category: 'Food',
    type: 'expense',
    amount: 12.50,
  },
  {
    id: '8',
    date: '2024-07-08',
    description: 'Utility Bill',
    category: 'Housing',
    type: 'expense',
    amount: 145.00,
  },
];

type SortField = 'date' | 'amount' | 'description';
type SortOrder = 'asc' | 'desc';

export function TransactionsTable() {
  const { role } = useDashboard();
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  const filteredAndSorted = useMemo(() => {
    let filtered = transactionsData.filter(tx => {
      const matchesSearch =
        tx.description.toLowerCase().includes(search.toLowerCase()) ||
        tx.category.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || tx.category === categoryFilter;
      const matchesType = typeFilter === 'all' || tx.type === typeFilter;
      return matchesSearch && matchesCategory && matchesType;
    });

    return filtered.sort((a, b) => {
      let aVal: string | number = a[sortField] || '';
      let bVal: string | number = b[sortField] || '';

      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = (bVal as string).toLowerCase();
      }

      if (sortOrder === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });
  }, [search, categoryFilter, typeFilter, sortField, sortOrder]);

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const categories = ['all', ...new Set(transactionsData.map(tx => tx.category))];

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 sm:flex-row sm:items-center">
        <Input
          placeholder="Search transactions..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1"
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              Category <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {categories.map(cat => (
              <DropdownMenuItem
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={categoryFilter === cat ? 'bg-muted' : ''}
              >
                {cat === 'all' ? 'All Categories' : cat}
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
              onClick={() => setTypeFilter('all')}
              className={typeFilter === 'all' ? 'bg-muted' : ''}
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

        <Button variant="outline" size="sm" className="gap-2">
          <Download className="h-4 w-4" />
          Export CSV
        </Button>

        {role === 'Admin' && (
          <Button size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            Add Transaction
          </Button>
        )}
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-border hover:bg-transparent">
                <TableHead
                  onClick={() => toggleSort('date')}
                  className="cursor-pointer hover:bg-muted"
                >
                  Date
                  {sortField === 'date' && (
                    <span className="ml-1">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                  )}
                </TableHead>
                <TableHead
                  onClick={() => toggleSort('description')}
                  className="cursor-pointer hover:bg-muted"
                >
                  Description
                  {sortField === 'description' && (
                    <span className="ml-1">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                  )}
                </TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Type</TableHead>
                <TableHead
                  onClick={() => toggleSort('amount')}
                  className="cursor-pointer text-right hover:bg-muted"
                >
                  Amount
                  {sortField === 'amount' && (
                    <span className="ml-1">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                  )}
                </TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSorted.map(tx => (
                <TableRow key={tx.id} className="border-b border-border hover:bg-muted/50">
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
                    {tx.type === 'income' ? '+' : '-'}${tx.amount.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="rounded-lg p-2 hover:bg-muted">
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {role === 'Admin' && (
                          <>
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              Delete
                            </DropdownMenuItem>
                          </>
                        )}
                        {role === 'Viewer' && (
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
