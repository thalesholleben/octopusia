import { useState, useMemo } from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  ResponsiveContainer, 
  Tooltip 
} from 'recharts';
import { FinanceRecord, EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '@/types/financial';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface CategoryEvolutionChartProps {
  data: FinanceRecord[];
}

export function CategoryEvolutionChart({ data }: CategoryEvolutionChartProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(EXPENSE_CATEGORIES[0]);
  const [showIncome, setShowIncome] = useState(false);

  const allCategories = useMemo(() => {
    return [...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES];
  }, []);

  const chartData = useMemo(() => {
    const filtered = data.filter(r => r.categoria === selectedCategory);
    
    const grouped = filtered.reduce((acc, record) => {
      const date = record.data_comprovante;
      if (!acc[date]) {
        acc[date] = { date, saidas: 0, entradas: 0 };
      }
      if (record.tipo === 'saida') {
        acc[date].saidas += record.valor;
      } else {
        acc[date].entradas += record.valor;
      }
      return acc;
    }, {} as Record<string, { date: string; saidas: number; entradas: number }>);

    return Object.values(grouped)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .map(item => ({
        ...item,
        dateFormatted: new Date(item.date).toLocaleDateString('pt-BR', { 
          day: '2-digit', 
          month: 'short' 
        })
      }));
  }, [data, selectedCategory]);

  const isExpenseCategory = (EXPENSE_CATEGORIES as readonly string[]).includes(selectedCategory);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-foreground mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: R$ {entry.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="card-float p-6 h-[400px] flex flex-col opacity-0 animate-fade-up" style={{ animationDelay: '1200ms', animationFillMode: 'forwards' }}>
      <div className="flex items-center justify-between mb-4 shrink-0">
        <h3 className="text-lg font-semibold text-foreground">Evolução por Categoria</h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Checkbox 
              id="showIncome" 
              checked={showIncome}
              onCheckedChange={(checked) => setShowIncome(checked as boolean)}
            />
            <Label htmlFor="showIncome" className="text-xs text-muted-foreground cursor-pointer">
              Mostrar Entradas
            </Label>
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px] h-8 text-xs">
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent>
              <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">Saídas</div>
              {EXPENSE_CATEGORIES.map(cat => (
                <SelectItem key={cat} value={cat} className="text-xs">
                  {cat}
                </SelectItem>
              ))}
              <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground border-t mt-1 pt-2">Entradas</div>
              {INCOME_CATEGORIES.map(cat => (
                <SelectItem key={cat} value={cat} className="text-xs">
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {chartData.length === 0 ? (
        <div className="flex-1 flex items-center justify-center text-muted-foreground">
          Nenhum dado para "{selectedCategory}" no período
        </div>
      ) : (
        <div className="flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorSaidas" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorEntradas" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="dateFormatted" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
                tickFormatter={(value) => `R$${(value/1000).toFixed(0)}k`}
                width={50}
              />
              <Tooltip content={<CustomTooltip />} />
              
              {isExpenseCategory && (
                <Area
                  type="monotone"
                  dataKey="saidas"
                  name="Saídas"
                  stroke="hsl(var(--destructive))"
                  strokeWidth={2}
                  fill="url(#colorSaidas)"
                  dot={{ fill: 'hsl(var(--destructive))', strokeWidth: 0, r: 3 }}
                  activeDot={{ r: 5, strokeWidth: 0 }}
                />
              )}
              
              {(showIncome || !isExpenseCategory) && (
                <Area
                  type="monotone"
                  dataKey="entradas"
                  name="Entradas"
                  stroke="hsl(var(--success))"
                  strokeWidth={2}
                  fill="url(#colorEntradas)"
                  dot={{ fill: 'hsl(var(--success))', strokeWidth: 0, r: 3 }}
                  activeDot={{ r: 5, strokeWidth: 0 }}
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
