import { useMemo, useEffect, useState } from 'react';
import { DateFilter } from '@/types/financial';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { 
  isToday, 
  isWithinInterval, 
  subDays, 
  startOfMonth, 
  endOfMonth, 
  parseISO,
  subMonths
} from 'date-fns';

interface FinanceRecordDB {
  id: string;
  user_id: string;
  valor: number;
  de: string;
  para: string;
  tipo: string;
  categoria: string;
  data_comprovante: string;
  created_at: string;
}

export function useFinancialDataDB(dateFilter: DateFilter) {
  const { user } = useAuth();
  const [records, setRecords] = useState<FinanceRecordDB[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (!user) {
        setRecords([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      const { data, error } = await supabase
        .from('finance_records')
        .select('*')
        .eq('user_id', user.id)
        .order('data_comprovante', { ascending: false });

      if (error) {
        console.error('Error fetching finance records:', error);
        setRecords([]);
      } else {
        setRecords(data || []);
      }
      setLoading(false);
    }

    fetchData();
  }, [user]);

  const filteredData = useMemo(() => {
    let data = records;
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
  }, [dateFilter, records]);

  const kpis = useMemo(() => {
    const entradas = filteredData
      .filter(r => r.tipo === 'entrada')
      .reduce((sum, r) => sum + Number(r.valor), 0);
    
    const saidas = filteredData
      .filter(r => r.tipo === 'saida')
      .reduce((sum, r) => sum + Number(r.valor), 0);
    
    const saldo = entradas - saidas;

    const categoryTotals = filteredData
      .filter(r => r.tipo === 'saida')
      .reduce((acc, r) => {
        acc[r.categoria] = (acc[r.categoria] || 0) + Number(r.valor);
        return acc;
      }, {} as Record<string, number>);

    const topCategory = Object.entries(categoryTotals)
      .sort(([, a], [, b]) => b - a)[0];

    const now = new Date();
    const prevMonthStart = startOfMonth(subMonths(now, 1));
    const prevMonthEnd = endOfMonth(subMonths(now, 1));
    
    const prevMonthData = records.filter(r => {
      const recordDate = parseISO(r.data_comprovante);
      return isWithinInterval(recordDate, {
        start: prevMonthStart,
        end: prevMonthEnd
      });
    });

    const prevMonthSaidas = prevMonthData
      .filter(r => r.tipo === 'saida')
      .reduce((sum, r) => sum + Number(r.valor), 0);

    const variacao = prevMonthSaidas > 0 
      ? ((saidas - prevMonthSaidas) / prevMonthSaidas) * 100 
      : 0;

    const mediaMensal = saidas;

    return {
      saldo,
      entradas,
      saidas,
      mediaMensal,
      topCategory: topCategory ? { name: topCategory[0], value: topCategory[1] } : null,
      variacao: Math.round(variacao * 10) / 10,
    };
  }, [filteredData, records]);

  return {
    data: filteredData.map(r => ({
      id: parseInt(r.id.substring(0, 8), 16),
      client_id: 0,
      valor: Number(r.valor),
      de: r.de,
      para: r.para,
      tipo: r.tipo as 'entrada' | 'saida',
      categoria: r.categoria,
      data_comprovante: r.data_comprovante,
      created_at: r.created_at,
    })),
    kpis,
    loading,
    isEmpty: records.length === 0,
  };
}
