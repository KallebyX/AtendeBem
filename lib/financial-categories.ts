// Categorias de Receitas e Despesas pré-definidas para o módulo financeiro
// Estas categorias são usadas como fallback quando o banco de dados não está disponível
// e também servem como referência para novas instalações

export interface FinancialCategory {
  name: string
  type: 'income' | 'expense'
  color: string
  icon: string
  group?: string
}

// =====================================================
// CATEGORIAS DE RECEITA (INCOME)
// =====================================================

export const INCOME_CATEGORIES: FinancialCategory[] = [
  // Atendimentos Médicos
  { name: 'Consulta Particular', type: 'income', color: '#10b981', icon: 'user', group: 'Atendimentos' },
  { name: 'Consulta Convênio', type: 'income', color: '#059669', icon: 'briefcase', group: 'Atendimentos' },
  { name: 'Primeira Consulta', type: 'income', color: '#34d399', icon: 'user-plus', group: 'Atendimentos' },
  { name: 'Retorno', type: 'income', color: '#06b6d4', icon: 'repeat', group: 'Atendimentos' },
  { name: 'Consulta de Emergência', type: 'income', color: '#ef4444', icon: 'alert-circle', group: 'Atendimentos' },
  { name: 'Teleconsulta', type: 'income', color: '#8b5cf6', icon: 'video', group: 'Atendimentos' },
  { name: 'Segunda Opinião', type: 'income', color: '#6366f1', icon: 'users', group: 'Atendimentos' },
  { name: 'Consulta Domiciliar', type: 'income', color: '#14b8a6', icon: 'home', group: 'Atendimentos' },

  // Procedimentos e Cirurgias
  { name: 'Procedimento Ambulatorial', type: 'income', color: '#3b82f6', icon: 'activity', group: 'Procedimentos' },
  { name: 'Pequena Cirurgia', type: 'income', color: '#2563eb', icon: 'scissors', group: 'Procedimentos' },
  { name: 'Cirurgia', type: 'income', color: '#1d4ed8', icon: 'heart-pulse', group: 'Procedimentos' },
  { name: 'Curativo', type: 'income', color: '#60a5fa', icon: 'bandage', group: 'Procedimentos' },
  { name: 'Sutura', type: 'income', color: '#93c5fd', icon: 'stethoscope', group: 'Procedimentos' },
  { name: 'Biópsia', type: 'income', color: '#1e40af', icon: 'microscope', group: 'Procedimentos' },
  { name: 'Cauterização', type: 'income', color: '#3730a3', icon: 'zap', group: 'Procedimentos' },
  { name: 'Drenagem', type: 'income', color: '#4f46e5', icon: 'droplet', group: 'Procedimentos' },

  // Exames e Diagnósticos
  { name: 'Exame Laboratorial', type: 'income', color: '#8b5cf6', icon: 'flask-conical', group: 'Exames' },
  { name: 'Exame de Imagem', type: 'income', color: '#a855f7', icon: 'scan', group: 'Exames' },
  { name: 'Eletrocardiograma', type: 'income', color: '#c084fc', icon: 'heart', group: 'Exames' },
  { name: 'Ultrassonografia', type: 'income', color: '#d8b4fe', icon: 'radio', group: 'Exames' },
  { name: 'Raio-X', type: 'income', color: '#7c3aed', icon: 'scan-line', group: 'Exames' },
  { name: 'Endoscopia', type: 'income', color: '#6d28d9', icon: 'eye', group: 'Exames' },
  { name: 'Colonoscopia', type: 'income', color: '#5b21b6', icon: 'search', group: 'Exames' },
  { name: 'Teste Ergométrico', type: 'income', color: '#9333ea', icon: 'activity', group: 'Exames' },
  { name: 'Holter', type: 'income', color: '#a21caf', icon: 'watch', group: 'Exames' },
  { name: 'MAPA', type: 'income', color: '#86198f', icon: 'gauge', group: 'Exames' },

  // Terapias e Tratamentos
  { name: 'Fisioterapia', type: 'income', color: '#0891b2', icon: 'accessibility', group: 'Terapias' },
  { name: 'Psicoterapia', type: 'income', color: '#0e7490', icon: 'brain', group: 'Terapias' },
  { name: 'Fonoaudiologia', type: 'income', color: '#155e75', icon: 'mic', group: 'Terapias' },
  { name: 'Nutrição', type: 'income', color: '#22c55e', icon: 'apple', group: 'Terapias' },
  { name: 'Acupuntura', type: 'income', color: '#16a34a', icon: 'target', group: 'Terapias' },
  { name: 'Quiropraxia', type: 'income', color: '#15803d', icon: 'bone', group: 'Terapias' },
  { name: 'Terapia Ocupacional', type: 'income', color: '#166534', icon: 'hand', group: 'Terapias' },
  { name: 'RPG', type: 'income', color: '#14532d', icon: 'move', group: 'Terapias' },
  { name: 'Pilates', type: 'income', color: '#84cc16', icon: 'dumbbell', group: 'Terapias' },
  { name: 'Hidroterapia', type: 'income', color: '#65a30d', icon: 'waves', group: 'Terapias' },

  // Estética e Dermatologia
  { name: 'Procedimento Estético', type: 'income', color: '#ec4899', icon: 'sparkles', group: 'Estética' },
  { name: 'Botox', type: 'income', color: '#db2777', icon: 'syringe', group: 'Estética' },
  { name: 'Preenchimento', type: 'income', color: '#be185d', icon: 'droplet', group: 'Estética' },
  { name: 'Peeling', type: 'income', color: '#9d174d', icon: 'layers', group: 'Estética' },
  { name: 'Laser', type: 'income', color: '#831843', icon: 'zap', group: 'Estética' },
  { name: 'Depilação', type: 'income', color: '#f472b6', icon: 'scissors', group: 'Estética' },
  { name: 'Limpeza de Pele', type: 'income', color: '#f9a8d4', icon: 'droplets', group: 'Estética' },
  { name: 'Microagulhamento', type: 'income', color: '#fbcfe8', icon: 'grid', group: 'Estética' },

  // Odontologia
  { name: 'Consulta Odontológica', type: 'income', color: '#06b6d4', icon: 'smile', group: 'Odontologia' },
  { name: 'Limpeza Dental', type: 'income', color: '#0891b2', icon: 'sparkle', group: 'Odontologia' },
  { name: 'Restauração', type: 'income', color: '#0e7490', icon: 'puzzle', group: 'Odontologia' },
  { name: 'Extração', type: 'income', color: '#155e75', icon: 'minus-circle', group: 'Odontologia' },
  { name: 'Canal', type: 'income', color: '#164e63', icon: 'git-branch', group: 'Odontologia' },
  { name: 'Prótese Dentária', type: 'income', color: '#083344', icon: 'box', group: 'Odontologia' },
  { name: 'Implante Dentário', type: 'income', color: '#22d3ee', icon: 'anchor', group: 'Odontologia' },
  { name: 'Ortodontia', type: 'income', color: '#67e8f9', icon: 'align-center', group: 'Odontologia' },
  { name: 'Clareamento Dental', type: 'income', color: '#a5f3fc', icon: 'sun', group: 'Odontologia' },
  { name: 'Periodontia', type: 'income', color: '#cffafe', icon: 'layers', group: 'Odontologia' },

  // Documentos e Laudos
  { name: 'Laudo Médico', type: 'income', color: '#64748b', icon: 'file-text', group: 'Documentos' },
  { name: 'Atestado Médico', type: 'income', color: '#475569', icon: 'file-check', group: 'Documentos' },
  { name: 'Relatório Médico', type: 'income', color: '#334155', icon: 'file-edit', group: 'Documentos' },
  { name: 'Parecer Técnico', type: 'income', color: '#1e293b', icon: 'clipboard', group: 'Documentos' },
  { name: 'Declaração', type: 'income', color: '#94a3b8', icon: 'file', group: 'Documentos' },
  { name: 'Receituário Especial', type: 'income', color: '#cbd5e1', icon: 'file-plus', group: 'Documentos' },

  // Vacinação e Injetáveis
  { name: 'Vacina', type: 'income', color: '#f59e0b', icon: 'syringe', group: 'Injetáveis' },
  { name: 'Aplicação Injetável', type: 'income', color: '#d97706', icon: 'target', group: 'Injetáveis' },
  { name: 'Medicação Intravenosa', type: 'income', color: '#b45309', icon: 'activity', group: 'Injetáveis' },
  { name: 'Soro', type: 'income', color: '#92400e', icon: 'droplet', group: 'Injetáveis' },

  // Outros Serviços
  { name: 'Check-up Completo', type: 'income', color: '#0ea5e9', icon: 'clipboard-list', group: 'Outros' },
  { name: 'Avaliação Pré-Operatória', type: 'income', color: '#0284c7', icon: 'clipboard-check', group: 'Outros' },
  { name: 'Acompanhamento', type: 'income', color: '#0369a1', icon: 'calendar', group: 'Outros' },
  { name: 'Internação', type: 'income', color: '#075985', icon: 'bed', group: 'Outros' },
  { name: 'Day Clinic', type: 'income', color: '#0c4a6e', icon: 'clock', group: 'Outros' },
  { name: 'Home Care', type: 'income', color: '#7dd3fc', icon: 'home', group: 'Outros' },
  { name: 'Locação de Equipamentos', type: 'income', color: '#bae6fd', icon: 'box', group: 'Outros' },
  { name: 'Venda de Produtos', type: 'income', color: '#e0f2fe', icon: 'shopping-bag', group: 'Outros' },
  { name: 'Curso/Palestra', type: 'income', color: '#f0f9ff', icon: 'presentation', group: 'Outros' },
  { name: 'Outras Receitas', type: 'income', color: '#6b7280', icon: 'plus-circle', group: 'Outros' },
]

// =====================================================
// CATEGORIAS DE DESPESA (EXPENSE)
// =====================================================

export const EXPENSE_CATEGORIES: FinancialCategory[] = [
  // Pessoal e Folha de Pagamento
  { name: 'Salários', type: 'expense', color: '#ef4444', icon: 'users', group: 'Pessoal' },
  { name: 'Pró-labore', type: 'expense', color: '#dc2626', icon: 'user', group: 'Pessoal' },
  { name: 'Férias', type: 'expense', color: '#b91c1c', icon: 'calendar', group: 'Pessoal' },
  { name: '13º Salário', type: 'expense', color: '#991b1b', icon: 'gift', group: 'Pessoal' },
  { name: 'FGTS', type: 'expense', color: '#7f1d1d', icon: 'landmark', group: 'Pessoal' },
  { name: 'INSS Patronal', type: 'expense', color: '#450a0a', icon: 'shield', group: 'Pessoal' },
  { name: 'Vale Transporte', type: 'expense', color: '#fca5a5', icon: 'bus', group: 'Pessoal' },
  { name: 'Vale Refeição/Alimentação', type: 'expense', color: '#fecaca', icon: 'utensils', group: 'Pessoal' },
  { name: 'Plano de Saúde', type: 'expense', color: '#fee2e2', icon: 'heart', group: 'Pessoal' },
  { name: 'Plano Odontológico', type: 'expense', color: '#fef2f2', icon: 'smile', group: 'Pessoal' },
  { name: 'Comissões', type: 'expense', color: '#f87171', icon: 'percent', group: 'Pessoal' },
  { name: 'Bonificações', type: 'expense', color: '#ef4444', icon: 'award', group: 'Pessoal' },
  { name: 'Hora Extra', type: 'expense', color: '#dc2626', icon: 'clock', group: 'Pessoal' },
  { name: 'Rescisão', type: 'expense', color: '#b91c1c', icon: 'user-minus', group: 'Pessoal' },

  // Instalações e Infraestrutura
  { name: 'Aluguel', type: 'expense', color: '#f97316', icon: 'home', group: 'Infraestrutura' },
  { name: 'Condomínio', type: 'expense', color: '#ea580c', icon: 'building', group: 'Infraestrutura' },
  { name: 'IPTU', type: 'expense', color: '#c2410c', icon: 'landmark', group: 'Infraestrutura' },
  { name: 'Energia Elétrica', type: 'expense', color: '#9a3412', icon: 'zap', group: 'Infraestrutura' },
  { name: 'Água', type: 'expense', color: '#7c2d12', icon: 'droplet', group: 'Infraestrutura' },
  { name: 'Gás', type: 'expense', color: '#431407', icon: 'flame', group: 'Infraestrutura' },
  { name: 'Internet', type: 'expense', color: '#fdba74', icon: 'wifi', group: 'Infraestrutura' },
  { name: 'Telefone', type: 'expense', color: '#fb923c', icon: 'phone', group: 'Infraestrutura' },
  { name: 'Seguro do Imóvel', type: 'expense', color: '#f97316', icon: 'shield', group: 'Infraestrutura' },
  { name: 'Manutenção Predial', type: 'expense', color: '#ea580c', icon: 'wrench', group: 'Infraestrutura' },
  { name: 'Reforma', type: 'expense', color: '#c2410c', icon: 'hammer', group: 'Infraestrutura' },
  { name: 'Jardinagem', type: 'expense', color: '#22c55e', icon: 'leaf', group: 'Infraestrutura' },
  { name: 'Decoração', type: 'expense', color: '#ec4899', icon: 'palette', group: 'Infraestrutura' },

  // Materiais e Suprimentos
  { name: 'Material Médico', type: 'expense', color: '#a855f7', icon: 'package', group: 'Materiais' },
  { name: 'Medicamentos', type: 'expense', color: '#9333ea', icon: 'pill', group: 'Materiais' },
  { name: 'Material Descartável', type: 'expense', color: '#7c3aed', icon: 'trash-2', group: 'Materiais' },
  { name: 'EPI', type: 'expense', color: '#6d28d9', icon: 'shield', group: 'Materiais' },
  { name: 'Material de Escritório', type: 'expense', color: '#5b21b6', icon: 'paperclip', group: 'Materiais' },
  { name: 'Material de Limpeza', type: 'expense', color: '#4c1d95', icon: 'spray-can', group: 'Materiais' },
  { name: 'Material de Copa', type: 'expense', color: '#c4b5fd', icon: 'coffee', group: 'Materiais' },
  { name: 'Uniformes', type: 'expense', color: '#ddd6fe', icon: 'shirt', group: 'Materiais' },
  { name: 'Impressos', type: 'expense', color: '#ede9fe', icon: 'printer', group: 'Materiais' },

  // Equipamentos e Tecnologia
  { name: 'Equipamento Médico', type: 'expense', color: '#3b82f6', icon: 'stethoscope', group: 'Tecnologia' },
  { name: 'Manutenção de Equipamentos', type: 'expense', color: '#2563eb', icon: 'settings', group: 'Tecnologia' },
  { name: 'Computadores e Periféricos', type: 'expense', color: '#1d4ed8', icon: 'monitor', group: 'Tecnologia' },
  { name: 'Software/Sistemas', type: 'expense', color: '#1e40af', icon: 'code', group: 'Tecnologia' },
  { name: 'Licenças de Software', type: 'expense', color: '#1e3a8a', icon: 'key', group: 'Tecnologia' },
  { name: 'Mobiliário', type: 'expense', color: '#93c5fd', icon: 'armchair', group: 'Tecnologia' },
  { name: 'Ar Condicionado', type: 'expense', color: '#bfdbfe', icon: 'wind', group: 'Tecnologia' },
  { name: 'Calibração de Equipamentos', type: 'expense', color: '#dbeafe', icon: 'gauge', group: 'Tecnologia' },

  // Serviços Terceirizados
  { name: 'Contabilidade', type: 'expense', color: '#64748b', icon: 'calculator', group: 'Serviços' },
  { name: 'Advocacia', type: 'expense', color: '#475569', icon: 'scale', group: 'Serviços' },
  { name: 'Consultoria', type: 'expense', color: '#334155', icon: 'lightbulb', group: 'Serviços' },
  { name: 'Limpeza Terceirizada', type: 'expense', color: '#1e293b', icon: 'spray-can', group: 'Serviços' },
  { name: 'Segurança', type: 'expense', color: '#0f172a', icon: 'shield-check', group: 'Serviços' },
  { name: 'Lavanderia', type: 'expense', color: '#94a3b8', icon: 'shirt', group: 'Serviços' },
  { name: 'Coleta de Resíduos', type: 'expense', color: '#cbd5e1', icon: 'trash', group: 'Serviços' },
  { name: 'Esterilização', type: 'expense', color: '#e2e8f0', icon: 'sparkles', group: 'Serviços' },
  { name: 'TI/Suporte Técnico', type: 'expense', color: '#f1f5f9', icon: 'headphones', group: 'Serviços' },

  // Marketing e Comunicação
  { name: 'Marketing Digital', type: 'expense', color: '#ec4899', icon: 'globe', group: 'Marketing' },
  { name: 'Publicidade', type: 'expense', color: '#db2777', icon: 'megaphone', group: 'Marketing' },
  { name: 'Material Gráfico', type: 'expense', color: '#be185d', icon: 'image', group: 'Marketing' },
  { name: 'Site/Hospedagem', type: 'expense', color: '#9d174d', icon: 'globe', group: 'Marketing' },
  { name: 'Redes Sociais', type: 'expense', color: '#831843', icon: 'share-2', group: 'Marketing' },
  { name: 'Eventos', type: 'expense', color: '#f9a8d4', icon: 'calendar', group: 'Marketing' },
  { name: 'Brindes', type: 'expense', color: '#fbcfe8', icon: 'gift', group: 'Marketing' },

  // Impostos e Taxas
  { name: 'ISS', type: 'expense', color: '#78716c', icon: 'file-text', group: 'Impostos' },
  { name: 'PIS', type: 'expense', color: '#57534e', icon: 'file-text', group: 'Impostos' },
  { name: 'COFINS', type: 'expense', color: '#44403c', icon: 'file-text', group: 'Impostos' },
  { name: 'IRPJ', type: 'expense', color: '#292524', icon: 'file-text', group: 'Impostos' },
  { name: 'CSLL', type: 'expense', color: '#1c1917', icon: 'file-text', group: 'Impostos' },
  { name: 'Simples Nacional', type: 'expense', color: '#a8a29e', icon: 'file-text', group: 'Impostos' },
  { name: 'Taxas de Alvará', type: 'expense', color: '#d6d3d1', icon: 'file-badge', group: 'Impostos' },
  { name: 'Taxas CRM/CRO', type: 'expense', color: '#e7e5e4', icon: 'badge', group: 'Impostos' },
  { name: 'Taxas Vigilância Sanitária', type: 'expense', color: '#f5f5f4', icon: 'shield', group: 'Impostos' },

  // Financeiro
  { name: 'Taxas Bancárias', type: 'expense', color: '#fbbf24', icon: 'landmark', group: 'Financeiro' },
  { name: 'Taxas de Cartão', type: 'expense', color: '#f59e0b', icon: 'credit-card', group: 'Financeiro' },
  { name: 'Juros', type: 'expense', color: '#d97706', icon: 'trending-up', group: 'Financeiro' },
  { name: 'Multas', type: 'expense', color: '#b45309', icon: 'alert-triangle', group: 'Financeiro' },
  { name: 'IOF', type: 'expense', color: '#92400e', icon: 'percent', group: 'Financeiro' },
  { name: 'Empréstimos/Financiamentos', type: 'expense', color: '#78350f', icon: 'banknote', group: 'Financeiro' },
  { name: 'Antecipação de Recebíveis', type: 'expense', color: '#fcd34d', icon: 'fast-forward', group: 'Financeiro' },

  // Seguros
  { name: 'Seguro de Responsabilidade Civil', type: 'expense', color: '#06b6d4', icon: 'shield', group: 'Seguros' },
  { name: 'Seguro de Equipamentos', type: 'expense', color: '#0891b2', icon: 'box', group: 'Seguros' },
  { name: 'Seguro de Vida', type: 'expense', color: '#0e7490', icon: 'heart', group: 'Seguros' },
  { name: 'Seguro Empresarial', type: 'expense', color: '#155e75', icon: 'building', group: 'Seguros' },

  // Educação e Treinamento
  { name: 'Cursos e Congressos', type: 'expense', color: '#10b981', icon: 'graduation-cap', group: 'Educação' },
  { name: 'Treinamento de Equipe', type: 'expense', color: '#059669', icon: 'users', group: 'Educação' },
  { name: 'Livros e Materiais', type: 'expense', color: '#047857', icon: 'book', group: 'Educação' },
  { name: 'Assinaturas (Revistas/Journals)', type: 'expense', color: '#065f46', icon: 'newspaper', group: 'Educação' },

  // Transporte e Viagens
  { name: 'Combustível', type: 'expense', color: '#84cc16', icon: 'fuel', group: 'Transporte' },
  { name: 'Estacionamento', type: 'expense', color: '#65a30d', icon: 'car', group: 'Transporte' },
  { name: 'Manutenção Veicular', type: 'expense', color: '#4d7c0f', icon: 'wrench', group: 'Transporte' },
  { name: 'Transporte/Uber', type: 'expense', color: '#3f6212', icon: 'car', group: 'Transporte' },
  { name: 'Viagens', type: 'expense', color: '#365314', icon: 'plane', group: 'Transporte' },
  { name: 'Hospedagem', type: 'expense', color: '#1a2e05', icon: 'bed', group: 'Transporte' },

  // Outras Despesas
  { name: 'Depreciação', type: 'expense', color: '#6b7280', icon: 'trending-down', group: 'Outros' },
  { name: 'Perdas e Danos', type: 'expense', color: '#4b5563', icon: 'alert-octagon', group: 'Outros' },
  { name: 'Doações', type: 'expense', color: '#374151', icon: 'heart-handshake', group: 'Outros' },
  { name: 'Despesas Diversas', type: 'expense', color: '#1f2937', icon: 'more-horizontal', group: 'Outros' },
  { name: 'Outras Despesas', type: 'expense', color: '#111827', icon: 'plus-circle', group: 'Outros' },
]

// Todas as categorias combinadas
export const ALL_CATEGORIES: FinancialCategory[] = [...INCOME_CATEGORIES, ...EXPENSE_CATEGORIES]

// Grupos de categorias de receita
export const INCOME_GROUPS = [...new Set(INCOME_CATEGORIES.map(c => c.group).filter(Boolean))]

// Grupos de categorias de despesa
export const EXPENSE_GROUPS = [...new Set(EXPENSE_CATEGORIES.map(c => c.group).filter(Boolean))]

// Função para buscar categorias por tipo
export function getCategoriesByType(type: 'income' | 'expense'): FinancialCategory[] {
  return type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES
}

// Função para buscar categorias por grupo
export function getCategoriesByGroup(type: 'income' | 'expense', group: string): FinancialCategory[] {
  const categories = getCategoriesByType(type)
  return categories.filter(c => c.group === group)
}

// Métodos de pagamento padrão
export const PAYMENT_METHODS = [
  { name: 'Dinheiro', type: 'cash', fees: 0 },
  { name: 'PIX', type: 'pix', fees: 0 },
  { name: 'Cartão de Crédito', type: 'credit_card', fees: 3.5 },
  { name: 'Cartão de Débito', type: 'debit_card', fees: 1.5 },
  { name: 'Transferência Bancária', type: 'bank_transfer', fees: 0 },
  { name: 'Convênio/Plano', type: 'insurance', fees: 0 },
  { name: 'Cheque', type: 'check', fees: 0 },
  { name: 'Boleto', type: 'bank_transfer', fees: 2.5 },
  { name: 'Parcelado', type: 'credit_card', fees: 4.5 },
  { name: 'Link de Pagamento', type: 'other', fees: 3.0 },
  { name: 'Depósito', type: 'bank_transfer', fees: 0 },
]
