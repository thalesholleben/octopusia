import { Bot, AlertCircle, AlertTriangle, CheckCircle } from 'lucide-react';
import { AIAlert } from '@/types/financial';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { cn } from '@/lib/utils';

interface AIAlertsCardProps {
  alerts: AIAlert[];
}

const priorityConfig = {
  baixa: {
    icon: CheckCircle,
    class: 'priority-low',
    bgClass: 'bg-success/5',
    label: 'Baixa',
    labelClass: 'text-success bg-success/10'
  },
  media: {
    icon: AlertTriangle,
    class: 'priority-medium',
    bgClass: 'bg-warning/5',
    label: 'Média',
    labelClass: 'text-warning bg-warning/10'
  },
  alta: {
    icon: AlertCircle,
    class: 'priority-high',
    bgClass: 'bg-destructive/5',
    label: 'Alta',
    labelClass: 'text-destructive bg-destructive/10'
  }
};

export function AIAlertsCard({ alerts }: AIAlertsCardProps) {
  return (
    <div className="card-float p-6 opacity-0 animate-fade-up" style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}>
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 rounded-xl bg-primary/10">
          <Bot className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">Avisos da IA</h2>
          <p className="text-xs text-muted-foreground">Insights automáticos sobre suas finanças</p>
        </div>
      </div>

      <div className="space-y-3 max-h-[280px] overflow-y-auto pr-2 custom-scrollbar">
        {alerts.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Bot className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>Nenhum aviso no momento</p>
          </div>
        ) : (
          alerts.map((alert) => {
            const config = priorityConfig[alert.prioridade];
            const Icon = config.icon;
            
            return (
              <div
                key={alert.id}
                className={cn(
                  'p-4 rounded-lg border border-border transition-all hover:border-primary/30',
                  config.class,
                  config.bgClass
                )}
              >
                <div className="flex items-start gap-3">
                  <Icon className={cn(
                    'w-5 h-5 mt-0.5 shrink-0',
                    alert.prioridade === 'baixa' && 'text-success',
                    alert.prioridade === 'media' && 'text-warning',
                    alert.prioridade === 'alta' && 'text-destructive'
                  )} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground leading-relaxed">
                      {alert.aviso}
                    </p>
                    <div className="flex items-center gap-3 mt-3">
                      <span className={cn(
                        'text-[10px] font-medium px-2 py-0.5 rounded-full uppercase tracking-wide',
                        config.labelClass
                      )}>
                        {config.label}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {format(new Date(alert.created_at), "dd MMM 'às' HH:mm", { locale: ptBR })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
