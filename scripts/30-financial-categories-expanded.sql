-- Migration: Categorias Financeiras Expandidas
-- Data: 2025-12-22
-- Descrição: Adiciona categorias abrangentes de receitas e despesas para clínicas médicas

-- =====================================================
-- CATEGORIAS DE RECEITA (INCOME)
-- =====================================================

-- Atendimentos Médicos
INSERT INTO revenue_categories (tenant_id, name, type, color, icon) VALUES
('00000000-0000-0000-0000-000000000001', 'Consulta Particular', 'income', '#10b981', 'user'),
('00000000-0000-0000-0000-000000000001', 'Consulta Convênio', 'income', '#059669', 'briefcase'),
('00000000-0000-0000-0000-000000000001', 'Primeira Consulta', 'income', '#34d399', 'user-plus'),
('00000000-0000-0000-0000-000000000001', 'Retorno', 'income', '#06b6d4', 'repeat'),
('00000000-0000-0000-0000-000000000001', 'Consulta de Emergência', 'income', '#ef4444', 'alert-circle'),
('00000000-0000-0000-0000-000000000001', 'Teleconsulta', 'income', '#8b5cf6', 'video'),
('00000000-0000-0000-0000-000000000001', 'Segunda Opinião', 'income', '#6366f1', 'users'),
('00000000-0000-0000-0000-000000000001', 'Consulta Domiciliar', 'income', '#14b8a6', 'home')
ON CONFLICT DO NOTHING;

-- Procedimentos e Cirurgias
INSERT INTO revenue_categories (tenant_id, name, type, color, icon) VALUES
('00000000-0000-0000-0000-000000000001', 'Procedimento Ambulatorial', 'income', '#3b82f6', 'activity'),
('00000000-0000-0000-0000-000000000001', 'Pequena Cirurgia', 'income', '#2563eb', 'scissors'),
('00000000-0000-0000-0000-000000000001', 'Cirurgia', 'income', '#1d4ed8', 'heart-pulse'),
('00000000-0000-0000-0000-000000000001', 'Curativo', 'income', '#60a5fa', 'bandage'),
('00000000-0000-0000-0000-000000000001', 'Sutura', 'income', '#93c5fd', 'stethoscope'),
('00000000-0000-0000-0000-000000000001', 'Biópsia', 'income', '#1e40af', 'microscope'),
('00000000-0000-0000-0000-000000000001', 'Cauterização', 'income', '#3730a3', 'zap'),
('00000000-0000-0000-0000-000000000001', 'Drenagem', 'income', '#4f46e5', 'droplet')
ON CONFLICT DO NOTHING;

-- Exames e Diagnósticos
INSERT INTO revenue_categories (tenant_id, name, type, color, icon) VALUES
('00000000-0000-0000-0000-000000000001', 'Exame Laboratorial', 'income', '#8b5cf6', 'flask-conical'),
('00000000-0000-0000-0000-000000000001', 'Exame de Imagem', 'income', '#a855f7', 'scan'),
('00000000-0000-0000-0000-000000000001', 'Eletrocardiograma', 'income', '#c084fc', 'heart'),
('00000000-0000-0000-0000-000000000001', 'Ultrassonografia', 'income', '#d8b4fe', 'radio'),
('00000000-0000-0000-0000-000000000001', 'Raio-X', 'income', '#7c3aed', 'scan-line'),
('00000000-0000-0000-0000-000000000001', 'Endoscopia', 'income', '#6d28d9', 'eye'),
('00000000-0000-0000-0000-000000000001', 'Colonoscopia', 'income', '#5b21b6', 'search'),
('00000000-0000-0000-0000-000000000001', 'Teste Ergométrico', 'income', '#9333ea', 'activity'),
('00000000-0000-0000-0000-000000000001', 'Holter', 'income', '#a21caf', 'watch'),
('00000000-0000-0000-0000-000000000001', 'MAPA', 'income', '#86198f', 'gauge')
ON CONFLICT DO NOTHING;

-- Terapias e Tratamentos
INSERT INTO revenue_categories (tenant_id, name, type, color, icon) VALUES
('00000000-0000-0000-0000-000000000001', 'Fisioterapia', 'income', '#0891b2', 'accessibility'),
('00000000-0000-0000-0000-000000000001', 'Psicoterapia', 'income', '#0e7490', 'brain'),
('00000000-0000-0000-0000-000000000001', 'Fonoaudiologia', 'income', '#155e75', 'mic'),
('00000000-0000-0000-0000-000000000001', 'Nutrição', 'income', '#22c55e', 'apple'),
('00000000-0000-0000-0000-000000000001', 'Acupuntura', 'income', '#16a34a', 'target'),
('00000000-0000-0000-0000-000000000001', 'Quiropraxia', 'income', '#15803d', 'bone'),
('00000000-0000-0000-0000-000000000001', 'Terapia Ocupacional', 'income', '#166534', 'hand'),
('00000000-0000-0000-0000-000000000001', 'RPG', 'income', '#14532d', 'move'),
('00000000-0000-0000-0000-000000000001', 'Pilates', 'income', '#84cc16', 'dumbbell'),
('00000000-0000-0000-0000-000000000001', 'Hidroterapia', 'income', '#65a30d', 'waves')
ON CONFLICT DO NOTHING;

-- Estética e Dermatologia
INSERT INTO revenue_categories (tenant_id, name, type, color, icon) VALUES
('00000000-0000-0000-0000-000000000001', 'Procedimento Estético', 'income', '#ec4899', 'sparkles'),
('00000000-0000-0000-0000-000000000001', 'Botox', 'income', '#db2777', 'syringe'),
('00000000-0000-0000-0000-000000000001', 'Preenchimento', 'income', '#be185d', 'droplet'),
('00000000-0000-0000-0000-000000000001', 'Peeling', 'income', '#9d174d', 'layers'),
('00000000-0000-0000-0000-000000000001', 'Laser', 'income', '#831843', 'zap'),
('00000000-0000-0000-0000-000000000001', 'Depilação', 'income', '#f472b6', 'scissors'),
('00000000-0000-0000-0000-000000000001', 'Limpeza de Pele', 'income', '#f9a8d4', 'droplets'),
('00000000-0000-0000-0000-000000000001', 'Microagulhamento', 'income', '#fbcfe8', 'grid')
ON CONFLICT DO NOTHING;

-- Odontologia
INSERT INTO revenue_categories (tenant_id, name, type, color, icon) VALUES
('00000000-0000-0000-0000-000000000001', 'Consulta Odontológica', 'income', '#06b6d4', 'smile'),
('00000000-0000-0000-0000-000000000001', 'Limpeza Dental', 'income', '#0891b2', 'sparkle'),
('00000000-0000-0000-0000-000000000001', 'Restauração', 'income', '#0e7490', 'puzzle'),
('00000000-0000-0000-0000-000000000001', 'Extração', 'income', '#155e75', 'minus-circle'),
('00000000-0000-0000-0000-000000000001', 'Canal', 'income', '#164e63', 'git-branch'),
('00000000-0000-0000-0000-000000000001', 'Prótese Dentária', 'income', '#083344', 'box'),
('00000000-0000-0000-0000-000000000001', 'Implante Dentário', 'income', '#22d3ee', 'anchor'),
('00000000-0000-0000-0000-000000000001', 'Ortodontia', 'income', '#67e8f9', 'align-center'),
('00000000-0000-0000-0000-000000000001', 'Clareamento Dental', 'income', '#a5f3fc', 'sun'),
('00000000-0000-0000-0000-000000000001', 'Periodontia', 'income', '#cffafe', 'layers')
ON CONFLICT DO NOTHING;

-- Documentos e Laudos
INSERT INTO revenue_categories (tenant_id, name, type, color, icon) VALUES
('00000000-0000-0000-0000-000000000001', 'Laudo Médico', 'income', '#64748b', 'file-text'),
('00000000-0000-0000-0000-000000000001', 'Atestado Médico', 'income', '#475569', 'file-check'),
('00000000-0000-0000-0000-000000000001', 'Relatório Médico', 'income', '#334155', 'file-edit'),
('00000000-0000-0000-0000-000000000001', 'Parecer Técnico', 'income', '#1e293b', 'clipboard'),
('00000000-0000-0000-0000-000000000001', 'Declaração', 'income', '#94a3b8', 'file'),
('00000000-0000-0000-0000-000000000001', 'Receituário Especial', 'income', '#cbd5e1', 'file-plus')
ON CONFLICT DO NOTHING;

-- Vacinação e Injetáveis
INSERT INTO revenue_categories (tenant_id, name, type, color, icon) VALUES
('00000000-0000-0000-0000-000000000001', 'Vacina', 'income', '#f59e0b', 'syringe'),
('00000000-0000-0000-0000-000000000001', 'Aplicação Injetável', 'income', '#d97706', 'target'),
('00000000-0000-0000-0000-000000000001', 'Medicação Intravenosa', 'income', '#b45309', 'activity'),
('00000000-0000-0000-0000-000000000001', 'Soro', 'income', '#92400e', 'droplet')
ON CONFLICT DO NOTHING;

-- Outros Serviços
INSERT INTO revenue_categories (tenant_id, name, type, color, icon) VALUES
('00000000-0000-0000-0000-000000000001', 'Check-up Completo', 'income', '#0ea5e9', 'clipboard-list'),
('00000000-0000-0000-0000-000000000001', 'Avaliação Pré-Operatória', 'income', '#0284c7', 'clipboard-check'),
('00000000-0000-0000-0000-000000000001', 'Acompanhamento', 'income', '#0369a1', 'calendar'),
('00000000-0000-0000-0000-000000000001', 'Internação', 'income', '#075985', 'bed'),
('00000000-0000-0000-0000-000000000001', 'Day Clinic', 'income', '#0c4a6e', 'clock'),
('00000000-0000-0000-0000-000000000001', 'Home Care', 'income', '#7dd3fc', 'home'),
('00000000-0000-0000-0000-000000000001', 'Locação de Equipamentos', 'income', '#bae6fd', 'box'),
('00000000-0000-0000-0000-000000000001', 'Venda de Produtos', 'income', '#e0f2fe', 'shopping-bag'),
('00000000-0000-0000-0000-000000000001', 'Curso/Palestra', 'income', '#f0f9ff', 'presentation'),
('00000000-0000-0000-0000-000000000001', 'Outras Receitas', 'income', '#6b7280', 'plus-circle')
ON CONFLICT DO NOTHING;

-- =====================================================
-- CATEGORIAS DE DESPESA (EXPENSE)
-- =====================================================

-- Pessoal e Folha de Pagamento
INSERT INTO revenue_categories (tenant_id, name, type, color, icon) VALUES
('00000000-0000-0000-0000-000000000001', 'Salários', 'expense', '#ef4444', 'users'),
('00000000-0000-0000-0000-000000000001', 'Pró-labore', 'expense', '#dc2626', 'user'),
('00000000-0000-0000-0000-000000000001', 'Férias', 'expense', '#b91c1c', 'calendar'),
('00000000-0000-0000-0000-000000000001', '13º Salário', 'expense', '#991b1b', 'gift'),
('00000000-0000-0000-0000-000000000001', 'FGTS', 'expense', '#7f1d1d', 'landmark'),
('00000000-0000-0000-0000-000000000001', 'INSS Patronal', 'expense', '#450a0a', 'shield'),
('00000000-0000-0000-0000-000000000001', 'Vale Transporte', 'expense', '#fca5a5', 'bus'),
('00000000-0000-0000-0000-000000000001', 'Vale Refeição/Alimentação', 'expense', '#fecaca', 'utensils'),
('00000000-0000-0000-0000-000000000001', 'Plano de Saúde', 'expense', '#fee2e2', 'heart'),
('00000000-0000-0000-0000-000000000001', 'Plano Odontológico', 'expense', '#fef2f2', 'smile'),
('00000000-0000-0000-0000-000000000001', 'Comissões', 'expense', '#f87171', 'percent'),
('00000000-0000-0000-0000-000000000001', 'Bonificações', 'expense', '#ef4444', 'award'),
('00000000-0000-0000-0000-000000000001', 'Hora Extra', 'expense', '#dc2626', 'clock'),
('00000000-0000-0000-0000-000000000001', 'Rescisão', 'expense', '#b91c1c', 'user-minus')
ON CONFLICT DO NOTHING;

-- Instalações e Infraestrutura
INSERT INTO revenue_categories (tenant_id, name, type, color, icon) VALUES
('00000000-0000-0000-0000-000000000001', 'Aluguel', 'expense', '#f97316', 'home'),
('00000000-0000-0000-0000-000000000001', 'Condomínio', 'expense', '#ea580c', 'building'),
('00000000-0000-0000-0000-000000000001', 'IPTU', 'expense', '#c2410c', 'landmark'),
('00000000-0000-0000-0000-000000000001', 'Energia Elétrica', 'expense', '#9a3412', 'zap'),
('00000000-0000-0000-0000-000000000001', 'Água', 'expense', '#7c2d12', 'droplet'),
('00000000-0000-0000-0000-000000000001', 'Gás', 'expense', '#431407', 'flame'),
('00000000-0000-0000-0000-000000000001', 'Internet', 'expense', '#fdba74', 'wifi'),
('00000000-0000-0000-0000-000000000001', 'Telefone', 'expense', '#fb923c', 'phone'),
('00000000-0000-0000-0000-000000000001', 'Seguro do Imóvel', 'expense', '#f97316', 'shield'),
('00000000-0000-0000-0000-000000000001', 'Manutenção Predial', 'expense', '#ea580c', 'wrench'),
('00000000-0000-0000-0000-000000000001', 'Reforma', 'expense', '#c2410c', 'hammer'),
('00000000-0000-0000-0000-000000000001', 'Jardinagem', 'expense', '#22c55e', 'leaf'),
('00000000-0000-0000-0000-000000000001', 'Decoração', 'expense', '#ec4899', 'palette')
ON CONFLICT DO NOTHING;

-- Materiais e Suprimentos
INSERT INTO revenue_categories (tenant_id, name, type, color, icon) VALUES
('00000000-0000-0000-0000-000000000001', 'Material Médico', 'expense', '#a855f7', 'package'),
('00000000-0000-0000-0000-000000000001', 'Medicamentos', 'expense', '#9333ea', 'pill'),
('00000000-0000-0000-0000-000000000001', 'Material Descartável', 'expense', '#7c3aed', 'trash-2'),
('00000000-0000-0000-0000-000000000001', 'EPI', 'expense', '#6d28d9', 'shield'),
('00000000-0000-0000-0000-000000000001', 'Material de Escritório', 'expense', '#5b21b6', 'paperclip'),
('00000000-0000-0000-0000-000000000001', 'Material de Limpeza', 'expense', '#4c1d95', 'spray-can'),
('00000000-0000-0000-0000-000000000001', 'Material de Copa', 'expense', '#c4b5fd', 'coffee'),
('00000000-0000-0000-0000-000000000001', 'Uniformes', 'expense', '#ddd6fe', 'shirt'),
('00000000-0000-0000-0000-000000000001', 'Impressos', 'expense', '#ede9fe', 'printer')
ON CONFLICT DO NOTHING;

-- Equipamentos e Tecnologia
INSERT INTO revenue_categories (tenant_id, name, type, color, icon) VALUES
('00000000-0000-0000-0000-000000000001', 'Equipamento Médico', 'expense', '#3b82f6', 'stethoscope'),
('00000000-0000-0000-0000-000000000001', 'Manutenção de Equipamentos', 'expense', '#2563eb', 'settings'),
('00000000-0000-0000-0000-000000000001', 'Computadores e Periféricos', 'expense', '#1d4ed8', 'monitor'),
('00000000-0000-0000-0000-000000000001', 'Software/Sistemas', 'expense', '#1e40af', 'code'),
('00000000-0000-0000-0000-000000000001', 'Licenças de Software', 'expense', '#1e3a8a', 'key'),
('00000000-0000-0000-0000-000000000001', 'Mobiliário', 'expense', '#93c5fd', 'armchair'),
('00000000-0000-0000-0000-000000000001', 'Ar Condicionado', 'expense', '#bfdbfe', 'wind'),
('00000000-0000-0000-0000-000000000001', 'Calibração de Equipamentos', 'expense', '#dbeafe', 'gauge')
ON CONFLICT DO NOTHING;

-- Serviços Terceirizados
INSERT INTO revenue_categories (tenant_id, name, type, color, icon) VALUES
('00000000-0000-0000-0000-000000000001', 'Contabilidade', 'expense', '#64748b', 'calculator'),
('00000000-0000-0000-0000-000000000001', 'Advocacia', 'expense', '#475569', 'scale'),
('00000000-0000-0000-0000-000000000001', 'Consultoria', 'expense', '#334155', 'lightbulb'),
('00000000-0000-0000-0000-000000000001', 'Limpeza Terceirizada', 'expense', '#1e293b', 'spray-can'),
('00000000-0000-0000-0000-000000000001', 'Segurança', 'expense', '#0f172a', 'shield-check'),
('00000000-0000-0000-0000-000000000001', 'Lavanderia', 'expense', '#94a3b8', 'shirt'),
('00000000-0000-0000-0000-000000000001', 'Coleta de Resíduos', 'expense', '#cbd5e1', 'trash'),
('00000000-0000-0000-0000-000000000001', 'Esterilização', 'expense', '#e2e8f0', 'sparkles'),
('00000000-0000-0000-0000-000000000001', 'TI/Suporte Técnico', 'expense', '#f1f5f9', 'headphones')
ON CONFLICT DO NOTHING;

-- Marketing e Comunicação
INSERT INTO revenue_categories (tenant_id, name, type, color, icon) VALUES
('00000000-0000-0000-0000-000000000001', 'Marketing Digital', 'expense', '#ec4899', 'globe'),
('00000000-0000-0000-0000-000000000001', 'Publicidade', 'expense', '#db2777', 'megaphone'),
('00000000-0000-0000-0000-000000000001', 'Material Gráfico', 'expense', '#be185d', 'image'),
('00000000-0000-0000-0000-000000000001', 'Site/Hospedagem', 'expense', '#9d174d', 'globe'),
('00000000-0000-0000-0000-000000000001', 'Redes Sociais', 'expense', '#831843', 'share-2'),
('00000000-0000-0000-0000-000000000001', 'Eventos', 'expense', '#f9a8d4', 'calendar'),
('00000000-0000-0000-0000-000000000001', 'Brindes', 'expense', '#fbcfe8', 'gift')
ON CONFLICT DO NOTHING;

-- Impostos e Taxas
INSERT INTO revenue_categories (tenant_id, name, type, color, icon) VALUES
('00000000-0000-0000-0000-000000000001', 'ISS', 'expense', '#78716c', 'file-text'),
('00000000-0000-0000-0000-000000000001', 'PIS', 'expense', '#57534e', 'file-text'),
('00000000-0000-0000-0000-000000000001', 'COFINS', 'expense', '#44403c', 'file-text'),
('00000000-0000-0000-0000-000000000001', 'IRPJ', 'expense', '#292524', 'file-text'),
('00000000-0000-0000-0000-000000000001', 'CSLL', 'expense', '#1c1917', 'file-text'),
('00000000-0000-0000-0000-000000000001', 'Simples Nacional', 'expense', '#a8a29e', 'file-text'),
('00000000-0000-0000-0000-000000000001', 'Taxas de Alvará', 'expense', '#d6d3d1', 'file-badge'),
('00000000-0000-0000-0000-000000000001', 'Taxas CRM/CRO', 'expense', '#e7e5e4', 'badge'),
('00000000-0000-0000-0000-000000000001', 'Taxas Vigilância Sanitária', 'expense', '#f5f5f4', 'shield')
ON CONFLICT DO NOTHING;

-- Financeiro
INSERT INTO revenue_categories (tenant_id, name, type, color, icon) VALUES
('00000000-0000-0000-0000-000000000001', 'Taxas Bancárias', 'expense', '#fbbf24', 'landmark'),
('00000000-0000-0000-0000-000000000001', 'Taxas de Cartão', 'expense', '#f59e0b', 'credit-card'),
('00000000-0000-0000-0000-000000000001', 'Juros', 'expense', '#d97706', 'trending-up'),
('00000000-0000-0000-0000-000000000001', 'Multas', 'expense', '#b45309', 'alert-triangle'),
('00000000-0000-0000-0000-000000000001', 'IOF', 'expense', '#92400e', 'percent'),
('00000000-0000-0000-0000-000000000001', 'Empréstimos/Financiamentos', 'expense', '#78350f', 'banknote'),
('00000000-0000-0000-0000-000000000001', 'Antecipação de Recebíveis', 'expense', '#fcd34d', 'fast-forward')
ON CONFLICT DO NOTHING;

-- Seguros
INSERT INTO revenue_categories (tenant_id, name, type, color, icon) VALUES
('00000000-0000-0000-0000-000000000001', 'Seguro de Responsabilidade Civil', 'expense', '#06b6d4', 'shield'),
('00000000-0000-0000-0000-000000000001', 'Seguro de Equipamentos', 'expense', '#0891b2', 'box'),
('00000000-0000-0000-0000-000000000001', 'Seguro de Vida', 'expense', '#0e7490', 'heart'),
('00000000-0000-0000-0000-000000000001', 'Seguro Empresarial', 'expense', '#155e75', 'building')
ON CONFLICT DO NOTHING;

-- Educação e Treinamento
INSERT INTO revenue_categories (tenant_id, name, type, color, icon) VALUES
('00000000-0000-0000-0000-000000000001', 'Cursos e Congressos', 'expense', '#10b981', 'graduation-cap'),
('00000000-0000-0000-0000-000000000001', 'Treinamento de Equipe', 'expense', '#059669', 'users'),
('00000000-0000-0000-0000-000000000001', 'Livros e Materiais', 'expense', '#047857', 'book'),
('00000000-0000-0000-0000-000000000001', 'Assinaturas (Revistas/Journals)', 'expense', '#065f46', 'newspaper')
ON CONFLICT DO NOTHING;

-- Transporte e Viagens
INSERT INTO revenue_categories (tenant_id, name, type, color, icon) VALUES
('00000000-0000-0000-0000-000000000001', 'Combustível', 'expense', '#84cc16', 'fuel'),
('00000000-0000-0000-0000-000000000001', 'Estacionamento', 'expense', '#65a30d', 'car'),
('00000000-0000-0000-0000-000000000001', 'Manutenção Veicular', 'expense', '#4d7c0f', 'wrench'),
('00000000-0000-0000-0000-000000000001', 'Transporte/Uber', 'expense', '#3f6212', 'car'),
('00000000-0000-0000-0000-000000000001', 'Viagens', 'expense', '#365314', 'plane'),
('00000000-0000-0000-0000-000000000001', 'Hospedagem', 'expense', '#1a2e05', 'bed')
ON CONFLICT DO NOTHING;

-- Outras Despesas
INSERT INTO revenue_categories (tenant_id, name, type, color, icon) VALUES
('00000000-0000-0000-0000-000000000001', 'Depreciação', 'expense', '#6b7280', 'trending-down'),
('00000000-0000-0000-0000-000000000001', 'Perdas e Danos', 'expense', '#4b5563', 'alert-octagon'),
('00000000-0000-0000-0000-000000000001', 'Doações', 'expense', '#374151', 'heart-handshake'),
('00000000-0000-0000-0000-000000000001', 'Despesas Diversas', 'expense', '#1f2937', 'more-horizontal'),
('00000000-0000-0000-0000-000000000001', 'Outras Despesas', 'expense', '#111827', 'plus-circle')
ON CONFLICT DO NOTHING;

-- =====================================================
-- MÉTODOS DE PAGAMENTO ADICIONAIS
-- =====================================================
INSERT INTO payment_methods (tenant_id, name, type, fees_percentage) VALUES
('00000000-0000-0000-0000-000000000001', 'Boleto', 'bank_transfer', 2.5),
('00000000-0000-0000-0000-000000000001', 'Parcelado', 'credit_card', 4.5),
('00000000-0000-0000-0000-000000000001', 'Link de Pagamento', 'other', 3.0),
('00000000-0000-0000-0000-000000000001', 'Depósito', 'bank_transfer', 0)
ON CONFLICT DO NOTHING;
