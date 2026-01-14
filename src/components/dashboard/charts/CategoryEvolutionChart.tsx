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
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface CategoryEvolutionChartProps {
  data: FinanceRecord[];
}

export function CategoryEvolutionChart({ data }: CategoryEvolutionChartProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showIncome, setShowIncome] = useState(false);

  // Get categories that have data
  const categoriesWithData = useMemo(() => {
    const expenseCategories = new Set(
      data.filter(r => r.tipo === 'saida').map(r => r.categoria)
    );
    const incomeCategories = new Set(
      data.filter(r => r.tipo === 'entrada').map(r => r.categoria)
    );
    return {
      expense: EXPENSE_CATEGORIES.filter(c => expenseCategories.has(c)),
      income: INCOME_CATEGORIES.filter(c => incomeCategories.has(c)),
    };
  }, [data]);

  const chartData = useMemo(() => {
    // Group data by month
    const monthlyData: Record<string, { saidas: number; entradas: number }> = {};

    data.forEach(record => {
      const date = parseISO(record.data_comprovante);
      const monthKey = format(date, 'yyyy-MM');
      
      // Filter by category if selected
      if (selectedCategory !== 'all' && record.categoria !== selectedCategory) {
        return;
      }

      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = { saidas: 0, entradas: 0 };
      }

      if (record.tipo === 'saida') {
        monthlyData[monthKey].saidas += record.valor;
      } else {
        monthlyData[monthKey].entradas += record.valor;
      }
    });

    // Sort and format
    return Object.entries(monthlyData)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([monthKey, values]) => ({
        month: monthKey,
        monthFormatted: format(parseISO(`${monthKey}-01`), 'MMM/yy', { locale: ptBR }),
        saidas: values.saidas,
        entradas: values.entradas,
      }));
  }, [data, selectedCategory]);

  const isExpenseCategory = selectedCategory === 'all' || 
    (EXPENSE_CATEGORIES as readonly string[]).includes(selectedCategory);

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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 shrink-0">
        <h3 className="text-lg font-semibold text-foreground">Evolução por Categoria</h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Switch 
              id="showIncome" 
              checked={showIncome}
              onCheckedChange={setShowIncome}
            />
            <Label htmlFor="showIncome" className="text-xs text-muted-foreground cursor-pointer">
              Mostrar Entradas
            </Label>
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[160px] h-8 text-xs">
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="text-xs font-medium">
                Todas as Categorias
              </SelectItem>
              {categoriesWithData.expense.length > 0 && (
                <>
                  <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground border-t mt-1 pt-2">
                    Saídas
                  </div>
                  {categoriesWithData.expense.map(cat => (
                    <SelectItem key={cat} value={cat} className="text-xs">
                      {cat}
                    </SelectItem>
                  ))}
                </>
              )}
              {categoriesWithData.income.length > 0 && (
                <>
                  <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground border-t mt-1 pt-2">
                    Entradas
                  </div>
                  {categoriesWithData.income.map(cat => (
                    <SelectItem key={cat} value={cat} className="text-xs">
                      {cat}
                    </SelectItem>
                  ))}
                </>
              )}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {chartData.length === 0 ? (
        <div className="flex-1 flex items-center justify-center text-muted-foreground">
          Nenhum dado disponível para o período selecionado
        </div>
      ) : (
        <div className="flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorSaidasEvol" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorEntradasEvol" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="monthFormatted" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
                tickFormatter={(value) => value >= 1000 ? `R$${(value/1000).toFixed(0)}k` : `R$${value}`}
                width={55}
              />
              <Tooltip content={<CustomTooltip />} />
              
              {isExpenseCategory && (
                <Area
                  type="monotone"
                  dataKey="saidas"
                  name="Saídas"
                  stroke="hsl(var(--destructive))"
                  strokeWidth={2}
                  fill="url(#colorSaidasEvol)"
                  dot={{ fill: 'hsl(var(--destructive))', strokeWidth: 0, r: 4 }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              )}
              
              {showIncome && (
                <Area
                  type="monotone"
                  dataKey="entradas"
                  name="Entradas"
                  stroke="hsl(var(--success))"
                  strokeWidth={2}
                  fill="url(#colorEntradasEvol)"
                  dot={{ fill: 'hsl(var(--success))', strokeWidth: 0, r: 4 }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
