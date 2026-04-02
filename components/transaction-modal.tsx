'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { useFinanceStore } from '@/src/store/useFinanceStore';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export type TransactionRecord = {
  id: string;
  date: string;
  description: string;
  category: string;
  type: 'income' | 'expense';
  amount: number;
};

const CATEGORY_OPTIONS = [
  'Income',
  'Housing',
  'Food',
  'Transport',
  'Utilities',
  'Entertainment',
  'Health',
  'Shopping',
  'Travel',
] as const;

function emptyForm() {
  return {
    date: new Date().toISOString().slice(0, 10),
    description: '',
    category: 'Housing' as string,
    type: 'expense' as 'income' | 'expense',
    amount: '',
  };
}

interface TransactionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  existingTx: TransactionRecord | null;
}

export function TransactionModal({
  open,
  onOpenChange,
  existingTx,
}: TransactionModalProps) {
  const addTransaction = useFinanceStore((s) => s.addTransaction);
  const updateTransaction = useFinanceStore((s) => s.updateTransaction);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (!open) return;
    if (existingTx) {
      setForm({
        date: existingTx.date,
        description: existingTx.description,
        category: existingTx.category,
        type: existingTx.type,
        amount: String(existingTx.amount),
      });
    } else {
      setForm(emptyForm());
    }
  }, [existingTx, open]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(form.amount);
    if (Number.isNaN(amount) || amount < 0) return;

    const base = {
      date: form.date,
      description: form.description.trim(),
      category: form.category,
      type: form.type,
      amount,
    };

    if (existingTx) {
      updateTransaction({ ...base, id: existingTx.id });
    } else {
      addTransaction({ ...base, id: `tx-${Date.now()}` });
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {existingTx ? 'Edit Transaction' : 'Add Transaction'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="tx-date">Date</Label>
            <Input
              id="tx-date"
              type="date"
              required
              value={form.date}
              onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tx-desc">Description</Label>
            <Input
              id="tx-desc"
              required
              placeholder="e.g., Groceries"
              value={form.description}
              onChange={(e) =>
                setForm((f) => ({ ...f, description: e.target.value }))
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tx-type">Type</Label>
              <select
                id="tx-type"
                value={form.type}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    type: e.target.value as 'income' | 'expense',
                  }))
                }
                className="border-input bg-background ring-offset-background focus-visible:ring-ring flex h-9 w-full rounded-md border px-3 py-1 text-sm shadow-xs focus-visible:ring-[3px] focus-visible:outline-none"
              >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="tx-cat">Category</Label>
              <select
                id="tx-cat"
                value={form.category}
                onChange={(e) =>
                  setForm((f) => ({ ...f, category: e.target.value }))
                }
                className="border-input bg-background ring-offset-background focus-visible:ring-ring flex h-9 w-full rounded-md border px-3 py-1 text-sm shadow-xs focus-visible:ring-[3px] focus-visible:outline-none"
              >
                {CATEGORY_OPTIONS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="tx-amt">Amount</Label>
            <Input
              id="tx-amt"
              type="number"
              required
              min={0}
              step="0.01"
              value={form.amount}
              onChange={(e) =>
                setForm((f) => ({ ...f, amount: e.target.value }))
              }
            />
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
