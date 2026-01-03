import { useState } from 'react';
import { 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  PiggyBank, 
  Tag,
  BarChart3
} from 'lucide-react';
import { Header } from '@/components/dashboard/Header';
import { FilterBar } from '@/components/dashboard/FilterBar';
import { KPICard } from '@/components/dashboard/KPICard';
import { AIAlertsCard } from '@/components/dashboard/AIAlertsCard';
import { ExpensePieChart } from '@/components/dashboard/charts/ExpensePieChart';
import { EvolutionLineChart } from '@/components/dashboard/charts/EvolutionLineChart';
import { MonthlyComparisonChart } from '@/components/dashboard/charts/MonthlyComparisonChart';
import { CategoryRankingChart } from '@/components/dashboard/charts/CategoryRankingChart';
import { useFinancialData } from '@/hooks/useFinancialData';
import { mockAIAlerts, getUniqueClients } from '@/data/mockData';
import { DateFilter } from '@/types/financial';

const Index = () => {
  const [dateFilter, setDateFilter] = useState<DateFilter>({ type: 'last30days' });
  const [selectedClient, setSelectedClient] = useState<number | null>(554899999999);
  
  const clients = getUniqueClients();
  const { data, kpis } = useFinancialData(dateFilter, selectedClient);
  
  const filteredAlerts = selectedClient 
    ? mockAIAlerts.filter(a => a.client_id === selectedClient)
    : mockAIAlerts;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-background bg-grid-pattern">
      <Header />
      
      <main className="container pt-24 pb-12">
        {/* Filters Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Dashboard Financeiro</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Acompanhe suas finanças em tempo real
              </p>
            </div>
            <FilterBar
              dateFilter={dateFilter}
              onDateFilterChange={setDateFilter}
              selectedClient={selectedClient}
              onClientChange={setSelectedClient}
              clients={clients}
            />
          </div>
        </div>

        {/* KPI Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
          <KPICard
            title="Saldo Total"
            value={formatCurrency(kpis.saldo)}
            icon={<Wallet className="w-5 h-5" />}
            variant={kpis.saldo >= 0 ? 'positive' : 'negative'}
            delay={100}
          />
          <KPICard
            title="Total de Entradas"
            value={formatCurrency(kpis.entradas)}
            icon={<TrendingUp className="w-5 h-5" />}
            variant="positive"
            delay={150}
          />
          <KPICard
            title="Total de Saídas"
            value={formatCurrency(kpis.saidas)}
            icon={<TrendingDown className="w-5 h-5" />}
            variant="negative"
            delay={200}
          />
          <KPICard
            title="Média de Gastos"
            value={formatCurrency(kpis.mediaMensal)}
            subtitle="Período selecionado"
            icon={<PiggyBank className="w-5 h-5" />}
            delay={250}
          />
          <KPICard
            title="Maior Categoria"
            value={kpis.topCategory?.name || '-'}
            subtitle={kpis.topCategory ? formatCurrency(kpis.topCategory.value) : undefined}
            icon={<Tag className="w-5 h-5" />}
            delay={300}
          />
          <KPICard
            title="Variação Mensal"
            value={`${kpis.variacao > 0 ? '+' : ''}${kpis.variacao}%`}
            trend={{ 
              value: kpis.variacao, 
              label: 'vs mês anterior' 
            }}
            icon={<BarChart3 className="w-5 h-5" />}
            variant={kpis.variacao <= 0 ? 'positive' : 'negative'}
            delay={350}
          />
        </div>

        {/* AI Alerts Section */}
        <div className="mb-8">
          <AIAlertsCard alerts={filteredAlerts} />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ExpensePieChart data={data} />
          <EvolutionLineChart data={data} />
          <MonthlyComparisonChart data={data} />
          <CategoryRankingChart data={data} />
        </div>
      </main>
    </div>
  );
};

export default Index;
