import { Octagon } from 'lucide-react';

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="container h-full flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Octagon className="w-8 h-8 text-primary" strokeWidth={2.5} />
            <div className="absolute inset-0 blur-lg bg-primary/30 rounded-full" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-foreground">
              Octopus <span className="text-primary">IA</span>
            </span>
            <span className="text-[10px] text-muted-foreground uppercase tracking-widest">
              Controle Financeiro
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/50 border border-border">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="text-xs text-muted-foreground">Sincronizado</span>
          </div>
        </div>
      </div>
    </header>
  );
}
