import { Lightbulb } from 'lucide-react';

interface InsightCardProps {
  title: string;
  value: string;
}

export function InsightCard({ title, value }: InsightCardProps) {
  return (
    <div className="h-full rounded-2xl border border-accent/20 bg-accent/5 p-6">
      <div className="flex items-start gap-4">
        <div className="rounded-lg bg-accent/20 p-3">
          <Lightbulb className="h-6 w-6 text-accent" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="mt-2 text-2xl font-bold text-card-foreground">{value}</p>
        </div>
      </div>
    </div>
  );
}
