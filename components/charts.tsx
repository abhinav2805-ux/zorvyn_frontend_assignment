'use client';

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

const lineData = [
  { month: 'Jan', balance: 8400 },
  { month: 'Feb', balance: 9210 },
  { month: 'Mar', balance: 8500 },
  { month: 'Apr', balance: 10200 },
  { month: 'May', balance: 11800 },
  { month: 'Jun', balance: 13200 },
  { month: 'Jul', balance: 14800 },
];

const pieData = [
  { name: 'Housing', value: 1200, color: '#3b5bdb' },
  { name: 'Food', value: 450, color: '#f76707' },
  { name: 'Transport', value: 380, color: '#2f9e44' },
  { name: 'Entertainment', value: 320, color: '#d0bfff' },
  { name: 'Others', value: 250, color: '#868e96' },
];

export function BalanceChart() {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <h3 className="text-lg font-semibold text-card-foreground">Balance Trend</h3>
      <div className="mt-6">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={lineData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis
              dataKey="month"
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
              dataKey="balance"
              stroke="var(--color-primary)"
              strokeWidth={3}
              dot={{ fill: 'var(--color-primary)', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function SpendingChart() {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <h3 className="text-lg font-semibold text-card-foreground">Spending by Category</h3>
      <div className="mt-6">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
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
    </div>
  );
}
