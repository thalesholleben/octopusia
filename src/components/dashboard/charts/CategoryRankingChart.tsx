import { FinanceRecord } from '@/types/financial';
import { TrendingDown } from 'lucide-react';

interface CategoryRankingChartProps {
  data: FinanceRecord[];
}

const COLORS = [
  '#d97757',
  '#f97316', 
  '#eab308',
  '#22c55e',
  '#3b82f6',
];

export function CategoryRankingChart({ data }: CategoryRankingChartProps) {
  const expenses = data.filter(r => r.tipo === 'saida');
  
  const categoryTotals = expenses.reduce((acc, record) => {
    acc[record.categoria] = (acc[record.categoria] || 0) + record.valor;
    return acc;
  }, {} as Record<string, number>);

  const sortedCategories = Object.entries(categoryTotals)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  const maxValue = sortedCategories[0]?.[1] || 0;
  const totalExpenses = Object.values(categoryTotals).reduce((sum, val) => sum + val, 0);

  return (
    <div className="card-float p-6 h-[400px] opacity-0 animate-fade-up" style={{ animationDelay: '1000ms', animationFillMode: 'forwards' }}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Ranking de Gastos</h3>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <TrendingDown className="w-4 h-4" />
          <span>Top 5 categorias</span>
        </div>
      </div>
      
      {sortedCategories.length === 0 ? (
        <div className="h-full flex items-center justify-center text-muted-foreground">
          Nenhum gasto no período
        </div>
      ) : (
        <div className="space-y-5">
          {sortedCategories.map(([category, value], index) => {
            const percentage = ((value / totalExpenses) * 100).toFixed(1);
            const barWidth = (value / maxValue) * 100;
            
            return (
              <div key={category} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span 
                      className="w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold"
                      style={{ backgroundColor: `${COLORS[index]}20`, color: COLORS[index] }}
                    >
                      {index + 1}
                    </span>
                    <span className="text-sm font-medium text-foreground">{category}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-foreground">
                      R$ {value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                    <p className="text-xs text-muted-foreground">{percentage}%</p>
                  </div>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-700 ease-out"
                    style={{ 
                      width: `${barWidth}%`,
                      backgroundColor: COLORS[index],
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
