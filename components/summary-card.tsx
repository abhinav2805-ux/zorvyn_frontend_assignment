import { TrendingDown, TrendingUp } from 'lucide-react';

interface SummaryCardProps {
  title: string;
  amount: string;
  trend: number;
  positive: boolean;
}

export function SummaryCard({ title, amount, trend, positive }: SummaryCardProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <p className="text-sm font-medium text-muted-foreground">{title}</p>
      <div className="mt-4 flex items-end justify-between">
        <h3 className="text-3xl font-bold text-card-foreground">{amount}</h3>
        <div
          className={`flex items-center gap-1 rounded-lg px-2 py-1 text-sm font-medium ${
            positive
              ? 'bg-success/10 text-success'
              : 'bg-destructive/10 text-destructive'
          }`}
        >
          {positive ? (
            <TrendingUp className="h-4 w-4" />
          ) : (
            <TrendingDown className="h-4 w-4" />
          )}
          <span>{Math.abs(trend)}%</span>
        </div>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        {positive ? '+' : '-'}{Math.abs(trend)}% from last month
      </p>
    </div>
  );
}
