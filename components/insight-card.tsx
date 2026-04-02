import { Lightbulb } from 'lucide-react';

interface InsightCardProps {
  title: string;
  value: string;
  /** Optional context line (e.g. share of total expenses). */
  subtitle?: string;
}

export function InsightCard({ title, value, subtitle }: InsightCardProps) {
  return (
    <div className="h-full rounded-2xl border border-accent/20 bg-accent/5 p-6">
      <div className="flex items-start gap-4">
        <div className="rounded-lg bg-accent/20 p-3">
          <Lightbulb className="h-6 w-6 text-accent" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="mt-2 text-2xl font-bold text-card-foreground break-words">
            {value}
          </p>
          {subtitle ? (
            <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
