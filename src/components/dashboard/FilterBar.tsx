import { useState } from 'react';
import { Calendar, ChevronDown, Phone, CalendarDays } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { DateFilter, DateFilterType } from '@/types/financial';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { cn } from '@/lib/utils';

interface FilterBarProps {
  dateFilter: DateFilter;
  onDateFilterChange: (filter: DateFilter) => void;
  selectedClient: number | null;
  onClientChange: (clientId: number | null) => void;
  clients: { id: number; label: string }[];
}

const dateFilterLabels: Record<DateFilterType, string> = {
  today: 'Hoje',
  last7days: 'Últimos 7 dias',
  last30days: 'Últimos 30 dias',
  thisMonth: 'Mês atual',
  custom: 'Personalizado',
};

export function FilterBar({
  dateFilter,
  onDateFilterChange,
  selectedClient,
  onClientChange,
  clients,
}: FilterBarProps) {
  const [customDateOpen, setCustomDateOpen] = useState(false);
  const [tempStartDate, setTempStartDate] = useState<Date | undefined>(dateFilter.startDate);
  const [tempEndDate, setTempEndDate] = useState<Date | undefined>(dateFilter.endDate);

  const handleDateFilterSelect = (type: DateFilterType) => {
    if (type === 'custom') {
      setCustomDateOpen(true);
    } else {
      onDateFilterChange({ type });
    }
  };

  const handleCustomDateApply = () => {
    if (tempStartDate && tempEndDate) {
      onDateFilterChange({
        type: 'custom',
        startDate: tempStartDate,
        endDate: tempEndDate,
      });
      setCustomDateOpen(false);
    }
  };

  const selectedClientLabel = selectedClient
    ? clients.find(c => c.id === selectedClient)?.label || 'Selecionar'
    : 'Todos os clientes';

  const getDateFilterDisplay = () => {
    if (dateFilter.type === 'custom' && dateFilter.startDate && dateFilter.endDate) {
      return `${format(dateFilter.startDate, 'dd/MM')} - ${format(dateFilter.endDate, 'dd/MM')}`;
    }
    return dateFilterLabels[dateFilter.type];
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Date Filter */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            className="h-10 px-4 bg-secondary/50 border-border hover:bg-secondary hover:border-primary/50 transition-all"
          >
            <CalendarDays className="w-4 h-4 mr-2 text-primary" />
            <span className="text-sm">{getDateFilterDisplay()}</span>
            <ChevronDown className="w-4 h-4 ml-2 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48">
          {(Object.keys(dateFilterLabels) as DateFilterType[]).map((type) => (
            <DropdownMenuItem
              key={type}
              onClick={() => handleDateFilterSelect(type)}
              className={cn(
                'cursor-pointer',
                dateFilter.type === type && 'bg-primary/10 text-primary'
              )}
            >
              {dateFilterLabels[type]}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Custom Date Popover */}
      <Popover open={customDateOpen} onOpenChange={setCustomDateOpen}>
        <PopoverTrigger asChild>
          <span />
        </PopoverTrigger>
        <PopoverContent className="w-auto p-4" align="start">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Data inicial</label>
              <CalendarComponent
                mode="single"
                selected={tempStartDate}
                onSelect={setTempStartDate}
                locale={ptBR}
                className="rounded-md border pointer-events-auto"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Data final</label>
              <CalendarComponent
                mode="single"
                selected={tempEndDate}
                onSelect={setTempEndDate}
                locale={ptBR}
                className="rounded-md border pointer-events-auto"
              />
            </div>
            <Button 
              onClick={handleCustomDateApply} 
              className="w-full"
              disabled={!tempStartDate || !tempEndDate}
            >
              Aplicar
            </Button>
          </div>
        </PopoverContent>
      </Popover>

      {/* Client Filter */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            className="h-10 px-4 bg-secondary/50 border-border hover:bg-secondary hover:border-primary/50 transition-all"
          >
            <Phone className="w-4 h-4 mr-2 text-primary" />
            <span className="text-sm">{selectedClientLabel}</span>
            <ChevronDown className="w-4 h-4 ml-2 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56">
          <DropdownMenuItem
            onClick={() => onClientChange(null)}
            className={cn(
              'cursor-pointer',
              selectedClient === null && 'bg-primary/10 text-primary'
            )}
          >
            Todos os clientes
          </DropdownMenuItem>
          {clients.map((client) => (
            <DropdownMenuItem
              key={client.id}
              onClick={() => onClientChange(client.id)}
              className={cn(
                'cursor-pointer font-mono text-sm',
                selectedClient === client.id && 'bg-primary/10 text-primary'
              )}
            >
              {client.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
