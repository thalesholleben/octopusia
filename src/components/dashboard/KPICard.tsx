import { ReactNode } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface KPICardProps {
  title: string;
  value: string;
  subtitle?: string;
  trend?: {
    value: number;
    label: string;
  };
  icon: ReactNode;
  variant?: 'default' | 'positive' | 'negative' | 'warning';
  delay?: number;
}

export function KPICard({ 
  title, 
  value, 
  subtitle, 
  trend, 
  icon,
  variant = 'default',
  delay = 0 
}: KPICardProps) {
  const getTrendIcon = () => {
    if (!trend) return null;
    if (trend.value > 0) return <TrendingUp className="w-4 h-4" />;
    if (trend.value < 0) return <TrendingDown className="w-4 h-4" />;
    return <Minus className="w-4 h-4" />;
  };

  const getTrendClass = () => {
    if (!trend) return '';
    if (trend.value > 0) return 'trend-up';
    if (trend.value < 0) return 'trend-down';
    return 'trend-neutral';
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'positive':
        return 'border-success/20 bg-gradient-to-br from-success/5 to-transparent';
      case 'negative':
        return 'border-destructive/20 bg-gradient-to-br from-destructive/5 to-transparent';
      case 'warning':
        return 'border-warning/20 bg-gradient-to-br from-warning/5 to-transparent';
      default:
        return 'border-border';
    }
  };

  const getIconBg = () => {
    switch (variant) {
      case 'positive':
        return 'bg-success/10 text-success';
      case 'negative':
        return 'bg-destructive/10 text-destructive';
      case 'warning':
        return 'bg-warning/10 text-warning';
      default:
        return 'bg-primary/10 text-primary';
    }
  };

  return (
    <div 
      className={cn(
        'card-float p-5 opacity-0 animate-fade-up',
        getVariantStyles()
      )}
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={cn('p-2.5 rounded-xl', getIconBg())}>
          {icon}
        </div>
        {trend && (
          <div className={cn('flex items-center gap-1 text-sm font-medium', getTrendClass())}>
            {getTrendIcon()}
            <span>{Math.abs(trend.value)}%</span>
          </div>
        )}
      </div>
      
      <div className="space-y-1">
        <p className="kpi-label">{title}</p>
        <p className={cn(
          'kpi-value',
          variant === 'positive' && 'text-success',
          variant === 'negative' && 'text-destructive'
        )}>
          {value}
        </p>
        {subtitle && (
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        )}
        {trend && (
          <p className="text-xs text-muted-foreground">{trend.label}</p>
        )}
      </div>
    </div>
  );
}
