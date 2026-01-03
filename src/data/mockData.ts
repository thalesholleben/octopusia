import { FinanceRecord, AIAlert } from '@/types/financial';

// Generate mock financial data with more realistic dates
const generateDate = (daysAgo: number) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString().split('T')[0];
};

export const mockFinanceRecords: FinanceRecord[] = [
  // Entradas recentes
  { id: 1, client_id: 554899999999, valor: 5500, de: 'Cliente ABC', para: 'Conta Principal', tipo: 'entrada', categoria: 'Site', data_comprovante: generateDate(2), created_at: new Date().toISOString() },
  { id: 2, client_id: 554899999999, valor: 3200, de: 'Projeto X', para: 'Conta Principal', tipo: 'entrada', categoria: 'Automação', data_comprovante: generateDate(5), created_at: new Date().toISOString() },
  { id: 3, client_id: 554899999999, valor: 1800, de: 'Logo Design', para: 'Conta Principal', tipo: 'entrada', categoria: 'Design', data_comprovante: generateDate(8), created_at: new Date().toISOString() },
  { id: 4, client_id: 554899999999, valor: 4500, de: 'Cliente DEF', para: 'Conta Principal', tipo: 'entrada', categoria: 'Site', data_comprovante: generateDate(12), created_at: new Date().toISOString() },
  { id: 5, client_id: 554899999999, valor: 2800, de: 'Automação CRM', para: 'Conta Principal', tipo: 'entrada', categoria: 'Automação', data_comprovante: generateDate(15), created_at: new Date().toISOString() },
  { id: 6, client_id: 554899999999, valor: 6200, de: 'E-commerce GHI', para: 'Conta Principal', tipo: 'entrada', categoria: 'Site', data_comprovante: generateDate(18), created_at: new Date().toISOString() },
  { id: 7, client_id: 554899999999, valor: 1500, de: 'Landing Page', para: 'Conta Principal', tipo: 'entrada', categoria: 'Design', data_comprovante: generateDate(22), created_at: new Date().toISOString() },
  
  // Saídas recentes
  { id: 10, client_id: 554899999999, valor: 1500, de: 'Conta Principal', para: 'Proprietário', tipo: 'saida', categoria: 'Aluguel', data_comprovante: generateDate(1), created_at: new Date().toISOString() },
  { id: 11, client_id: 554899999999, valor: 450, de: 'Conta Principal', para: 'CPFL', tipo: 'saida', categoria: 'Contas Fixas', data_comprovante: generateDate(3), created_at: new Date().toISOString() },
  { id: 12, client_id: 554899999999, valor: 800, de: 'Conta Principal', para: 'Supermercado', tipo: 'saida', categoria: 'Alimentação', data_comprovante: generateDate(4), created_at: new Date().toISOString() },
  { id: 13, client_id: 554899999999, valor: 120, de: 'Conta Principal', para: 'iFood', tipo: 'saida', categoria: 'FastFood', data_comprovante: generateDate(5), created_at: new Date().toISOString() },
  { id: 14, client_id: 554899999999, valor: 350, de: 'Conta Principal', para: 'Uber/99', tipo: 'saida', categoria: 'Transporte', data_comprovante: generateDate(6), created_at: new Date().toISOString() },
  { id: 15, client_id: 554899999999, valor: 280, de: 'Conta Principal', para: 'Farmácia', tipo: 'saida', categoria: 'Saúde', data_comprovante: generateDate(7), created_at: new Date().toISOString() },
  { id: 16, client_id: 554899999999, valor: 200, de: 'Conta Principal', para: 'Material Escolar', tipo: 'saida', categoria: 'Filhos', data_comprovante: generateDate(9), created_at: new Date().toISOString() },
  { id: 17, client_id: 554899999999, valor: 150, de: 'Conta Principal', para: 'Café/Coworking', tipo: 'saida', categoria: 'Trabalho', data_comprovante: generateDate(10), created_at: new Date().toISOString() },
  { id: 18, client_id: 554899999999, valor: 89, de: 'Conta Principal', para: 'Figma', tipo: 'saida', categoria: 'Ferramentas', data_comprovante: generateDate(11), created_at: new Date().toISOString() },
  { id: 19, client_id: 554899999999, valor: 300, de: 'Conta Principal', para: 'Cinema/Bar', tipo: 'saida', categoria: 'Lazer e Vida Social', data_comprovante: generateDate(13), created_at: new Date().toISOString() },
  { id: 20, client_id: 554899999999, valor: 520, de: 'Conta Principal', para: 'Internet/Celular', tipo: 'saida', categoria: 'Contas Fixas', data_comprovante: generateDate(14), created_at: new Date().toISOString() },
  { id: 21, client_id: 554899999999, valor: 950, de: 'Conta Principal', para: 'Supermercado', tipo: 'saida', categoria: 'Alimentação', data_comprovante: generateDate(16), created_at: new Date().toISOString() },
  { id: 22, client_id: 554899999999, valor: 180, de: 'Conta Principal', para: 'iFood', tipo: 'saida', categoria: 'FastFood', data_comprovante: generateDate(17), created_at: new Date().toISOString() },
  { id: 23, client_id: 554899999999, valor: 400, de: 'Conta Principal', para: 'Uber/99', tipo: 'saida', categoria: 'Transporte', data_comprovante: generateDate(19), created_at: new Date().toISOString() },
  { id: 24, client_id: 554899999999, valor: 500, de: 'Conta Principal', para: 'Curso Online', tipo: 'saida', categoria: 'Educação', data_comprovante: generateDate(20), created_at: new Date().toISOString() },
  { id: 25, client_id: 554899999999, valor: 600, de: 'Conta Principal', para: 'Cartão Nubank', tipo: 'saida', categoria: 'Dívidas', data_comprovante: generateDate(21), created_at: new Date().toISOString() },
  { id: 26, client_id: 554899999999, valor: 1000, de: 'Conta Principal', para: 'Poupança', tipo: 'saida', categoria: 'Reserva', data_comprovante: generateDate(23), created_at: new Date().toISOString() },
  { id: 27, client_id: 554899999999, valor: 250, de: 'Conta Principal', para: 'Viagem', tipo: 'saida', categoria: 'Objetivos', data_comprovante: generateDate(25), created_at: new Date().toISOString() },
  { id: 28, client_id: 554899999999, valor: 350, de: 'Conta Principal', para: 'Conserto Celular', tipo: 'saida', categoria: 'Imprevistos', data_comprovante: generateDate(27), created_at: new Date().toISOString() },

  // Dados de outro cliente
  { id: 30, client_id: 554888888888, valor: 8000, de: 'Empresa XYZ', para: 'Conta', tipo: 'entrada', categoria: 'Site', data_comprovante: generateDate(3), created_at: new Date().toISOString() },
  { id: 31, client_id: 554888888888, valor: 4500, de: 'Consultoria', para: 'Conta', tipo: 'entrada', categoria: 'Automação', data_comprovante: generateDate(10), created_at: new Date().toISOString() },
  { id: 32, client_id: 554888888888, valor: 2000, de: 'Conta', para: 'Aluguel', tipo: 'saida', categoria: 'Aluguel', data_comprovante: generateDate(5), created_at: new Date().toISOString() },
  { id: 33, client_id: 554888888888, valor: 1200, de: 'Conta', para: 'Mercado', tipo: 'saida', categoria: 'Alimentação', data_comprovante: generateDate(8), created_at: new Date().toISOString() },
  { id: 34, client_id: 554888888888, valor: 800, de: 'Conta', para: 'Investimentos', tipo: 'saida', categoria: 'Reserva', data_comprovante: generateDate(12), created_at: new Date().toISOString() },
];

// Dados de investimentos mock
export const mockInvestments = {
  total: 45680.50,
  rendimento: 2.8, // percentual
  patrimonio: 125000,
};

export const mockAIAlerts: AIAlert[] = [
  {
    id: 1,
    aviso: 'Gastos com Alimentação aumentaram 23% em relação ao mês anterior. Considere revisar seus hábitos de compra.',
    client_id: 554899999999,
    prioridade: 'alta',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 2,
    aviso: 'Você atingiu 80% do limite mensal para FastFood. Ainda restam 5 dias para o fechamento.',
    client_id: 554899999999,
    prioridade: 'media',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 3,
    aviso: 'Parabéns! Você economizou R$ 350 em Transporte este mês comparado à sua média.',
    client_id: 554899999999,
    prioridade: 'baixa',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 4,
    aviso: 'Oportunidade: planos anuais de Ferramentas podem gerar economia de até 20%.',
    client_id: 554899999999,
    prioridade: 'baixa',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 5,
    aviso: 'Atenção: Reserva de emergência está abaixo do recomendado. Atual: 1.5 meses.',
    client_id: 554899999999,
    prioridade: 'alta',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 6,
    aviso: 'Sua receita de Site cresceu 15% este mês. Continue assim!',
    client_id: 554899999999,
    prioridade: 'baixa',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

export const getUniqueClients = () => {
  const clients = [...new Set(mockFinanceRecords.map(r => r.client_id))];
  return clients.map(id => ({
    id,
    label: `+55 ${String(id).slice(2, 4)} ${String(id).slice(4, 9)}-${String(id).slice(9)}`
  }));
};
