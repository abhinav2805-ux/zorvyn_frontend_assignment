'use client';

import { motion } from 'framer-motion';
import { useFinanceStore } from '@/src/store/useFinanceStore';
import { getCategoryData, getTrendData } from '@/src/utils/helpers';
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

export function BalanceChart() {
  const transactions = useFinanceStore((state) => state.transactions);
  const lineData = getTrendData(transactions);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="rounded-2xl border border-border bg-card p-6"
    >
      <h3 className="text-lg font-semibold text-card-foreground">Cash Flow Trend</h3>
      <div className="mt-6">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={lineData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis
              dataKey="date"
              stroke="var(--color-muted-foreground)"
              style={{ fontSize: '0.875rem' }}
            />
            <YAxis stroke="var(--color-muted-foreground)" style={{ fontSize: '0.875rem' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--color-card)',
                border: '1px solid var(--color-border)',
                borderRadius: '0.75rem',
              }}
              cursor={{ stroke: 'var(--color-primary)' }}
            />
            <Line
              type="monotone"
              dataKey="income"
              stroke="#10b981"
              strokeWidth={2}
              dot={{ fill: '#10b981', r: 3 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="expense"
              stroke="#ef4444"
              strokeWidth={2}
              dot={{ fill: '#ef4444', r: 3 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}

export function SpendingChart() {
  const transactions = useFinanceStore((state) => state.transactions);
  const pieData = getCategoryData(transactions);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="rounded-2xl border border-border bg-card p-6"
    >
      <h3 className="text-lg font-semibold text-card-foreground">Spending Breakdown</h3>
      <div className="mt-6">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--color-card)',
                border: '1px solid var(--color-border)',
                borderRadius: '0.75rem',
              }}
            />
            <Legend
              wrapperStyle={{
                paddingTop: '20px',
                color: 'var(--color-card-foreground)',
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
