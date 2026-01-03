import { FinanceRecord, AIAlert } from '@/types/financial';

// Generate mock financial data
export const mockFinanceRecords: FinanceRecord[] = [
  // Entradas
  { id: 1, client_id: 554899999999, valor: 5500, de: 'Cliente ABC', para: 'Conta Principal', tipo: 'entrada', categoria: 'Site', data_comprovante: '2024-01-15', created_at: '2024-01-15T10:00:00' },
  { id: 2, client_id: 554899999999, valor: 3200, de: 'Projeto X', para: 'Conta Principal', tipo: 'entrada', categoria: 'Automação', data_comprovante: '2024-01-20', created_at: '2024-01-20T14:00:00' },
  { id: 3, client_id: 554899999999, valor: 1800, de: 'Logo Design', para: 'Conta Principal', tipo: 'entrada', categoria: 'Design', data_comprovante: '2024-01-25', created_at: '2024-01-25T09:00:00' },
  { id: 4, client_id: 554899999999, valor: 4500, de: 'Cliente DEF', para: 'Conta Principal', tipo: 'entrada', categoria: 'Site', data_comprovante: '2024-02-05', created_at: '2024-02-05T11:00:00' },
  { id: 5, client_id: 554899999999, valor: 2800, de: 'Automação CRM', para: 'Conta Principal', tipo: 'entrada', categoria: 'Automação', data_comprovante: '2024-02-15', created_at: '2024-02-15T16:00:00' },
  
  // Saídas - Janeiro
  { id: 10, client_id: 554899999999, valor: 1500, de: 'Conta Principal', para: 'Proprietário', tipo: 'saida', categoria: 'Aluguel', data_comprovante: '2024-01-05', created_at: '2024-01-05T08:00:00' },
  { id: 11, client_id: 554899999999, valor: 450, de: 'Conta Principal', para: 'CPFL', tipo: 'saida', categoria: 'Contas Fixas', data_comprovante: '2024-01-10', created_at: '2024-01-10T09:00:00' },
  { id: 12, client_id: 554899999999, valor: 800, de: 'Conta Principal', para: 'Supermercado', tipo: 'saida', categoria: 'Alimentação', data_comprovante: '2024-01-12', created_at: '2024-01-12T18:00:00' },
  { id: 13, client_id: 554899999999, valor: 120, de: 'Conta Principal', para: 'iFood', tipo: 'saida', categoria: 'FastFood', data_comprovante: '2024-01-14', created_at: '2024-01-14T20:00:00' },
  { id: 14, client_id: 554899999999, valor: 350, de: 'Conta Principal', para: 'Uber/99', tipo: 'saida', categoria: 'Transporte', data_comprovante: '2024-01-18', created_at: '2024-01-18T15:00:00' },
  { id: 15, client_id: 554899999999, valor: 280, de: 'Conta Principal', para: 'Farmácia', tipo: 'saida', categoria: 'Saúde', data_comprovante: '2024-01-20', created_at: '2024-01-20T11:00:00' },
  { id: 16, client_id: 554899999999, valor: 200, de: 'Conta Principal', para: 'Material Escolar', tipo: 'saida', categoria: 'Filhos', data_comprovante: '2024-01-22', created_at: '2024-01-22T14:00:00' },
  { id: 17, client_id: 554899999999, valor: 150, de: 'Conta Principal', para: 'Café/Coworking', tipo: 'saida', categoria: 'Trabalho', data_comprovante: '2024-01-25', created_at: '2024-01-25T10:00:00' },
  { id: 18, client_id: 554899999999, valor: 89, de: 'Conta Principal', para: 'Figma', tipo: 'saida', categoria: 'Ferramentas', data_comprovante: '2024-01-28', created_at: '2024-01-28T09:00:00' },
  { id: 19, client_id: 554899999999, valor: 300, de: 'Conta Principal', para: 'Cinema/Bar', tipo: 'saida', categoria: 'Lazer e Vida Social', data_comprovante: '2024-01-30', created_at: '2024-01-30T22:00:00' },
  
  // Saídas - Fevereiro
  { id: 20, client_id: 554899999999, valor: 1500, de: 'Conta Principal', para: 'Proprietário', tipo: 'saida', categoria: 'Aluguel', data_comprovante: '2024-02-05', created_at: '2024-02-05T08:00:00' },
  { id: 21, client_id: 554899999999, valor: 520, de: 'Conta Principal', para: 'CPFL', tipo: 'saida', categoria: 'Contas Fixas', data_comprovante: '2024-02-10', created_at: '2024-02-10T09:00:00' },
  { id: 22, client_id: 554899999999, valor: 950, de: 'Conta Principal', para: 'Supermercado', tipo: 'saida', categoria: 'Alimentação', data_comprovante: '2024-02-12', created_at: '2024-02-12T18:00:00' },
  { id: 23, client_id: 554899999999, valor: 180, de: 'Conta Principal', para: 'iFood', tipo: 'saida', categoria: 'FastFood', data_comprovante: '2024-02-14', created_at: '2024-02-14T21:00:00' },
  { id: 24, client_id: 554899999999, valor: 400, de: 'Conta Principal', para: 'Uber/99', tipo: 'saida', categoria: 'Transporte', data_comprovante: '2024-02-18', created_at: '2024-02-18T16:00:00' },
  { id: 25, client_id: 554899999999, valor: 500, de: 'Conta Principal', para: 'Curso Online', tipo: 'saida', categoria: 'Educação', data_comprovante: '2024-02-20', created_at: '2024-02-20T10:00:00' },
  { id: 26, client_id: 554899999999, valor: 600, de: 'Conta Principal', para: 'Cartão Nubank', tipo: 'saida', categoria: 'Dívidas', data_comprovante: '2024-02-22', created_at: '2024-02-22T12:00:00' },
  { id: 27, client_id: 554899999999, valor: 1000, de: 'Conta Principal', para: 'Poupança', tipo: 'saida', categoria: 'Reserva', data_comprovante: '2024-02-25', created_at: '2024-02-25T08:00:00' },
  { id: 28, client_id: 554899999999, valor: 250, de: 'Conta Principal', para: 'Viagem', tipo: 'saida', categoria: 'Objetivos', data_comprovante: '2024-02-28', created_at: '2024-02-28T15:00:00' },
  { id: 29, client_id: 554899999999, valor: 350, de: 'Conta Principal', para: 'Conserto Celular', tipo: 'saida', categoria: 'Imprevistos', data_comprovante: '2024-02-28', created_at: '2024-02-28T17:00:00' },

  // Dados de outro cliente
  { id: 30, client_id: 554888888888, valor: 8000, de: 'Empresa XYZ', para: 'Conta', tipo: 'entrada', categoria: 'Site', data_comprovante: '2024-02-01', created_at: '2024-02-01T09:00:00' },
  { id: 31, client_id: 554888888888, valor: 2000, de: 'Conta', para: 'Aluguel', tipo: 'saida', categoria: 'Aluguel', data_comprovante: '2024-02-05', created_at: '2024-02-05T10:00:00' },
  { id: 32, client_id: 554888888888, valor: 1200, de: 'Conta', para: 'Mercado', tipo: 'saida', categoria: 'Alimentação', data_comprovante: '2024-02-10', created_at: '2024-02-10T12:00:00' },
];

export const mockAIAlerts: AIAlert[] = [
  {
    id: 1,
    aviso: 'Gastos com Alimentação aumentaram 23% em relação ao mês anterior. Considere revisar seus hábitos de compra.',
    client_id: 554899999999,
    prioridade: 'alta',
    created_at: '2024-02-28T10:00:00',
    updated_at: '2024-02-28T10:00:00'
  },
  {
    id: 2,
    aviso: 'Você atingiu 80% do seu limite mensal para FastFood. Ainda restam 5 dias para o fechamento.',
    client_id: 554899999999,
    prioridade: 'media',
    created_at: '2024-02-27T14:00:00',
    updated_at: '2024-02-27T14:00:00'
  },
  {
    id: 3,
    aviso: 'Parabéns! Você economizou R$ 350 em Transporte este mês comparado à sua média.',
    client_id: 554899999999,
    prioridade: 'baixa',
    created_at: '2024-02-26T09:00:00',
    updated_at: '2024-02-26T09:00:00'
  },
  {
    id: 4,
    aviso: 'Detectamos uma oportunidade: seus gastos com Ferramentas são consistentes. Considere assinar planos anuais para economia de até 20%.',
    client_id: 554899999999,
    prioridade: 'baixa',
    created_at: '2024-02-25T16:00:00',
    updated_at: '2024-02-25T16:00:00'
  },
  {
    id: 5,
    aviso: 'Atenção: Sua reserva de emergência está abaixo do recomendado (3 meses de gastos). Atual: 1.5 meses.',
    client_id: 554899999999,
    prioridade: 'alta',
    created_at: '2024-02-24T11:00:00',
    updated_at: '2024-02-24T11:00:00'
  }
];

export const getUniqueClients = () => {
  const clients = [...new Set(mockFinanceRecords.map(r => r.client_id))];
  return clients.map(id => ({
    id,
    label: `+55 ${String(id).slice(2, 4)} ${String(id).slice(4, 9)}-${String(id).slice(9)}`
  }));
};
