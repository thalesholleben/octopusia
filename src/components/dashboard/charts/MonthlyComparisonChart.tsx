import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { FinanceRecord } from '@/types/financial';
import { format, parseISO, startOfMonth, subMonths } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface MonthlyComparisonChartProps {
  data: FinanceRecord[];
}

export function MonthlyComparisonChart({ data }: MonthlyComparisonChartProps) {
  const now = new Date();
  const currentMonth = startOfMonth(now);
  const previousMonth = subMonths(currentMonth, 1);

  // Group by month
  const monthlyData = data.reduce((acc, record) => {
    const recordDate = parseISO(record.data_comprovante);
    const monthKey = format(recordDate, 'yyyy-MM');
    
    if (!acc[monthKey]) {
      acc[monthKey] = { entradas: 0, saidas: 0 };
    }
    
    if (record.tipo === 'entrada') {
      acc[monthKey].entradas += record.valor;
    } else {
      acc[monthKey].saidas += record.valor;
    }
    
    return acc;
  }, {} as Record<string, { entradas: number; saidas: number }>);

  const chartData = Object.entries(monthlyData)
    .map(([month, values]) => ({
      month,
      monthLabel: format(parseISO(`${month}-01`), 'MMM/yy', { locale: ptBR }),
      entradas: values.entradas,
      saidas: values.saidas,
    }))
    .sort((a, b) => a.month.localeCompare(b.month))
    .slice(-6); // Last 6 months

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-foreground mb-2 capitalize">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-xs text-muted-foreground">{entry.name}:</span>
              <span className="text-sm font-medium text-foreground">
                R$ {entry.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="card-float p-6 h-[400px] opacity-0 animate-fade-up" style={{ animationDelay: '900ms', animationFillMode: 'forwards' }}>
      <h3 className="text-lg font-semibold text-foreground mb-4">Comparativo Mensal</h3>
      
      {chartData.length === 0 ? (
        <div className="h-full flex items-center justify-center text-muted-foreground">
          Nenhum dado disponível
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="85%">
          <BarChart data={chartData} barGap={8}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis 
              dataKey="monthLabel" 
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              stroke="hsl(var(--border))"
            />
            <YAxis 
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              tickFormatter={(value) => `R$${(value / 1000).toFixed(0)}k`}
              stroke="hsl(var(--border))"
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              formatter={(value) => (
                <span className="text-xs text-muted-foreground capitalize">{value}</span>
              )}
            />
            <Bar 
              dataKey="entradas" 
              name="Entradas" 
              fill="#22c55e" 
              radius={[4, 4, 0, 0]}
              maxBarSize={40}
            />
            <Bar 
              dataKey="saidas" 
              name="Saídas" 
              fill="#ef4444" 
              radius={[4, 4, 0, 0]}
              maxBarSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
