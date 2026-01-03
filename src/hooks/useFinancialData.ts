import { useMemo } from 'react';
import { FinanceRecord, DateFilter } from '@/types/financial';
import { mockFinanceRecords } from '@/data/mockData';
import { 
  isToday, 
  isWithinInterval, 
  subDays, 
  startOfMonth, 
  endOfMonth, 
  parseISO,
  subMonths
} from 'date-fns';

export function useFinancialData(
  dateFilter: DateFilter, 
  clientId: number | null
) {
  const filteredData = useMemo(() => {
    let data = mockFinanceRecords;

    // Filter by client
    if (clientId !== null) {
      data = data.filter(r => r.client_id === clientId);
    }

    // Filter by date
    const now = new Date();
    data = data.filter(record => {
      const recordDate = parseISO(record.data_comprovante);
      
      switch (dateFilter.type) {
        case 'today':
          return isToday(recordDate);
        case 'last7days':
          return isWithinInterval(recordDate, {
            start: subDays(now, 7),
            end: now
          });
        case 'last30days':
          return isWithinInterval(recordDate, {
            start: subDays(now, 30),
            end: now
          });
        case 'thisMonth':
          return isWithinInterval(recordDate, {
            start: startOfMonth(now),
            end: endOfMonth(now)
          });
        case 'custom':
          if (dateFilter.startDate && dateFilter.endDate) {
            return isWithinInterval(recordDate, {
              start: dateFilter.startDate,
              end: dateFilter.endDate
            });
          }
          return true;
        default:
          return true;
      }
    });

    return data;
  }, [dateFilter, clientId]);

  const kpis = useMemo(() => {
    const entradas = filteredData
      .filter(r => r.tipo === 'entrada')
      .reduce((sum, r) => sum + r.valor, 0);
    
    const saidas = filteredData
      .filter(r => r.tipo === 'saida')
      .reduce((sum, r) => sum + r.valor, 0);
    
    const saldo = entradas - saidas;

    // Category with highest spending
    const categoryTotals = filteredData
      .filter(r => r.tipo === 'saida')
      .reduce((acc, r) => {
        acc[r.categoria] = (acc[r.categoria] || 0) + r.valor;
        return acc;
      }, {} as Record<string, number>);

    const topCategory = Object.entries(categoryTotals)
      .sort(([, a], [, b]) => b - a)[0];

    // Calculate previous month data for comparison
    const now = new Date();
    const prevMonthStart = startOfMonth(subMonths(now, 1));
    const prevMonthEnd = endOfMonth(subMonths(now, 1));
    
    const prevMonthData = mockFinanceRecords.filter(r => {
      const recordDate = parseISO(r.data_comprovante);
      return isWithinInterval(recordDate, {
        start: prevMonthStart,
        end: prevMonthEnd
      }) && (clientId === null || r.client_id === clientId);
    });

    const prevMonthSaidas = prevMonthData
      .filter(r => r.tipo === 'saida')
      .reduce((sum, r) => sum + r.valor, 0);

    const variacao = prevMonthSaidas > 0 
      ? ((saidas - prevMonthSaidas) / prevMonthSaidas) * 100 
      : 0;

    // Average monthly expenses (simplified)
    const mediaMensal = saidas; // In a real app, calculate across multiple months

    return {
      saldo,
      entradas,
      saidas,
      mediaMensal,
      topCategory: topCategory ? { name: topCategory[0], value: topCategory[1] } : null,
      variacao: Math.round(variacao * 10) / 10,
    };
  }, [filteredData, clientId]);

  return {
    data: filteredData,
    kpis,
  };
}
