// Base de dados TUSS completa - Extraída da planilha oficial ANS
// Total de procedimentos: 4901
// Fonte: Tabela TUSS Médico - ANS
// Atualizado em: Dezembro 2025

export interface TUSSProcedure {
  code: string
  description: string
  chapter: string
  group: string
  subgroup?: string
  porte?: string
  porteAnestesico?: string
  requiresAuth: boolean
  aux?: number
  uco?: number
  cbos?: string
}

// Base completa de procedimentos TUSS
export const tussProcedures: TUSSProcedure[] = [
  {
    code: "10101012",
    description: "CONSULTA REUMATOLOGISTA",
    chapter: "1",
    group: "Consultas",
    requiresAuth: false,
    cbos: "225136"
  },
  {
    code: "10101012",
    description: "CONSULTA COM ALERGOLOGISTA/ IMUNOLOGISTA",
    chapter: "1",
    group: "Consultas",
    requiresAuth: false,
    cbos: "225110"
  },
  {
    code: "10101012",
    description: "CONSULTA COM CLÍNICO GERAL",
    chapter: "1",
    group: "Consultas",
    requiresAuth: false,
    cbos: "225125"
  },
  {
    code: "10101012",
    description: "CONSULTA COM PNEUMOLOGISTA",
    chapter: "1",
    group: "Consultas",
    requiresAuth: false,
    cbos: "225127"
  },
  {
    code: "51010101",
    description: "CONSULTA COM HEMODINAMICISTA E CARDIOLOGISTA INTERVENCIONISTA",
    chapter: "5",
    group: "Outros",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "10101012",
    description: "CONSULTA COM GINECOLOGISTA E OBSTÉTRA",
    chapter: "1",
    group: "Consultas",
    requiresAuth: false,
    cbos: "225250"
  },
  {
    code: "10101012",
    description: "CONSULTA COM NEUROCIRURGIÃO",
    chapter: "1",
    group: "Consultas",
    requiresAuth: false,
    cbos: "225260"
  },
  {
    code: "10101012",
    description: "CONSULTA COM CIRURGIÃO PEDIÁTRICO",
    chapter: "1",
    group: "Consultas",
    requiresAuth: false,
    cbos: "225230"
  },
  {
    code: "10101012",
    description: "CONSULTA COM PEDIATRA ELETIVA",
    chapter: "1",
    group: "Consultas",
    requiresAuth: false,
    cbos: "225124"
  },
  {
    code: "10101012",
    description: "CONSULTA COM ENDOCRINOLOGISTA E METABOLOGISTA",
    chapter: "1",
    group: "Consultas",
    requiresAuth: false,
    cbos: "225155"
  },
  {
    code: "10101012",
    description: "CONSULTA COM GERIATRA",
    chapter: "1",
    group: "Consultas",
    requiresAuth: false,
    cbos: "225180"
  },
  {
    code: "10101012",
    description: "CONSULTA COM INFECTOLOGISTA",
    chapter: "1",
    group: "Consultas",
    requiresAuth: false,
    cbos: "225103"
  },
  {
    code: "10101012",
    description: "CONSULTA COM NEUROLOGISTA",
    chapter: "1",
    group: "Consultas",
    requiresAuth: false,
    cbos: "225112"
  },
  {
    code: "10101012",
    description: "CONSULTA COM PSIQUIATRA",
    chapter: "1",
    group: "Consultas",
    requiresAuth: false,
    cbos: "225133"
  },
  {
    code: "10101012",
    description: "Consulta Médica Eletiva Diversas Especialidades",
    chapter: "1",
    group: "Consultas",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "10101039",
    description: "Consulta Em Pronto Socorro",
    chapter: "1",
    group: "Consultas",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "10102019",
    description: "Visita Hospitalar (Paciente Internado)",
    chapter: "1",
    group: "Consultas",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "10102990",
    description: "Para visita hospitalar, será observado o que consta dos itens 3.1 e 6 das Instruções Gerais.",
    chapter: "1",
    group: "Consultas",
    requiresAuth: false,
    cbos: ""
  },
  {
    code: "10103015",
    description: "Atendimento Ao Recém-Nascido Em Berçário",
    chapter: "1",
    group: "Consultas",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "10103023",
    description: "Atendimento Ao Recém-Nascido Em Sala De Parto (Parto Normal Ou Operatório De Baixo Risco)",
    chapter: "1",
    group: "Consultas",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "10103031",
    description: "Atendimento Ao Recém-Nascido Em Sala De Parto (Parto Normal Ou Operatório De Alto Risco)",
    chapter: "1",
    group: "Consultas",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "10104011",
    description: "Atendimento Do Intensivista Diarista (Por Dia E Por Paciente)",
    chapter: "1",
    group: "Consultas",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "10104020",
    description: "Atendimento Médico Do Intensivista Em Uti Geral Ou Pediátrica (Plantão De 12 Horas - Por Paciente)",
    chapter: "1",
    group: "Consultas",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "10105077",
    description: "Acompanhamento médico para transporte intra-hospitalar de pacientes graves, com ventilação assistida, da UTI para o centro de diagnósitco",
    chapter: "1",
    group: "Consultas",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "10106014",
    description: "Aconselhamento Genético",
    chapter: "1",
    group: "Consultas",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "10106030",
    description: "Atendimento Ao Familiar Do Adolescente",
    chapter: "1",
    group: "Consultas",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "10106049",
    description: "Atendimento Pediátrico A Gestantes (3º Trimestre)",
    chapter: "1",
    group: "Consultas",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "10106073",
    description: "Junta Médica (Três Ou Mais Profissionais) - Destina-Se Ao Esclarecimento Diagnóstico Ou Decisão De Conduta Em Caso De Difícil Solução - Por Profissional",
    chapter: "1",
    group: "Consultas",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "10106146",
    description: "Atendimento Ambulatorial Em Puericultura",
    chapter: "1",
    group: "Consultas",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "10106154",
    description: "Atendimento ambulatorial oftalmológico de criança pré-verbal (<4 anos) ou crianças com déficit intelectual, dificuldade de comunicação ou pouco colaborativas realizada em consultório",
    chapter: "1",
    group: "Consultas",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20101015",
    description: "Acompanhamento Clínico Ambulatorial Pós-Transplante Renal - Por Avaliação",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20101023",
    description: "Análise Da Proporcionalidade Cineantropométrica",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20101074",
    description: "Avaliação Nutrológica (Inclui Consulta)",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20101082",
    description: "Avaliação Nutrológica Pré E Pós-Cirurgia Bariátrica (Inclui Consulta)",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20101090",
    description: "Avaliação Da Composição Corporal Por Antropometria (Inclui Consulta)",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20101104",
    description: "Avaliação Da Composição Corporal Por Bioimpedanciometria",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20101112",
    description: "Avaliação Da Composição Corporal Por Pesagem Hidrostática",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20101171",
    description: "Rejeição De Enxerto Renal - Tratamento Ambulatorial - Avaliação Clínica Diária",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20101198",
    description: "Teste E Adaptação De Lente De Contato (Sessão) - Binocular",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20101201",
    description: "Avaliação Clínica E Eletrônica De Paciente Portador De Marca-Passo Ou Sincronizador Ou Desfibrilador",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20101210",
    description: "Acompanhamento Clínico Ambulatorial Pós-Transplante De Córnea -Por Avaliação Do 11º Ao 30º Dia Até 3 Avaliações",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20101244",
    description: "Avaliação e seleção para implante coclear unilateral",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20101252",
    description: "Ativação de Implante Coclear - Unilateral",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20101260",
    description: "Mapeamento e balanciamento dos eletrodos do implante coclear - unilateral",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20101228",
    description: "Acompanhamento Clínico Ambulatorial Pós-Transplante De Medula Óssea",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20101236",
    description: "Avaliação geriátrica ampla _AGA",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20101287",
    description: "Reflexo estapediano eliciado eletricamente unilateral",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20101295",
    description: "Troca do processador de áudio do implante coclear unilateral",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20101309",
    description: "Avaliação clínica pré coleta de líquor no teste de punção lombar única ou repetida – TAP test",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20101317",
    description: "Avaliação clínica pós coleta de líquor no teste de punção lombar única ou repetida – TAP test",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20101325",
    description: "Avaliação e diagnóstico de morte encefálica - exame clínico que confirme coma não perceptivo e ausência de função tronco encefálico",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20101333",
    description: "Avaliação e diagnóstico de morte encefálica - teste de apneia que confirme ausência de movimentos respiratórios após estimulação máxima dos centros respiratórios",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20101341",
    description: "Avaliação neurológica ampla - ANA",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20101350",
    description: "Programação de dispositivos neurofuncionais",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20101368",
    description: "Teste de provocação oral (TPO) com alimentos",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20101376",
    description: "Teste cutâneo de puntura ou intradérmico com medicamentos (até 3 drogas)",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20101384",
    description: "Teste de provocação com medicamentos via oral",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20101392",
    description: "teste de provocação com medicamentos via injetável",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20101406",
    description: "Acompanhamento clínico ambulatorial pós-cirurgia fistulizante antiglacomatosa - por avaliação do 11º ao 30º dia, até três avaliações",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20101414",
    description: "Acompanhamento clínico ambulatorial do tabagista, por avaliação, do 1º ao 90º dia, até 7 avaliações clínicas",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20101422",
    description: "Monoximetria não invasiva (COex)",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20101430",
    description: "Acompanhamento clínico ambulatorial do pós-operatório de cirurgia de catarata congênita ou glaucoma congênito, por avaliação do 11 ao 30º dia, até 3 avaliações, em consultório",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20101449",
    description: "Acompanhamento clínico ambulatorial da retinopatia da prematuridade por avaliação do 1 ao 30º dia, até 5 avaliações, em consultório",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20101457",
    description: "Acompanhamento clínico ambulatorial de uveítes anteriores agudas e/ou coriorretinites focal ou disseminada em atividade por avaliação do 1 ao 30º dia, até 5 avaliações, em consultório",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20101465",
    description: "Acompanhamento clínico ambulatorial pós-transplante hepático",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20102011",
    description: "Holter De 24 Horas - 2 Ou Mais Canais - Analógico",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20102020",
    description: "Holter De 24 Horas - 3 Canais - Digital",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20102038",
    description: "Monitorização Ambulatorial Da Pressão Arterial - Mapa (24 Horas)",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20102062",
    description: "Monitor De Eventos Sintomáticos Por 15 A 30 Dias (Looper)",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20102070",
    description: "Tilt Teste",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20102160",
    description: "Monitorização ambulatorial da pressão arterial de 5 dias - MAPA 5d",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20102178",
    description: "Monitorização contínua da insuficiência respiratótia em pacientes com esclerose lateral amiotrófica (ELA) que necessitam de assistência ventilatória não-invasiva",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20103018",
    description: "Adaptação E Treinamento De Recursos Ópticos Para Visão Subnormal (Por Sessão) - Binocular",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20103026",
    description: "Amputação Bilateral (Preparação Do Coto)",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20103034",
    description: "Amputação Bilateral (Treinamento Protético)",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20103042",
    description: "Amputação Unilateral (Preparação Do Coto)",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20103050",
    description: "Amputação Unilateral (Treinamento Protético)",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20103069",
    description: "Assistência Fisiátrica Respiratória Em Pré E Pós-Operatório De Condições Cirúrgicas",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20103077",
    description: "Ataxias",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20103093",
    description: "Atendimento Fisiátrico No Pré E Pós-Operatório De Pacientes Para Prevenção De Sequelas",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20103107",
    description: "Atendimento Fisiátrico No Pré E Pós-Parto",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20103115",
    description: "Atividade Reflexa Ou Aplicação De Técnica Cinesioterápica Específica",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20103123",
    description: "Atividades Em Escola De Postura (Máximo De 10 Pessoas) - Por Sessão",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20103131",
    description: "Biofeedback Com Emg",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20103140",
    description: "Bloqueio Fenólico, Alcoólico Ou Com Toxina Botulínica Por Segmento Corporal",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20103158",
    description: "Confecção De Órteses Em Material Termo-Sensível (Por Unidade)",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20103166",
    description: "Confecção De Prótese Imediata",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20103174",
    description: "Confecção De Prótese Provisória",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20103182",
    description: "Desvios Posturais Da Coluna Vertebral",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20103190",
    description: "Disfunção Vésico-Uretral",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20103204",
    description: "Distrofia Simpático-Reflexa",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20103212",
    description: "Distúrbios Circulatórios Artério-Venosos E Linfáticos",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20103220",
    description: "Doenças Pulmonares Atendidas Em Ambulatório",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20103239",
    description: "Exercícios De Ortóptica (Por Sessão)",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20103247",
    description: "Exercícios Para Reabilitação Do Asmático (Erac) - Por Sessão Coletiva",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20103255",
    description: "Exercícios Para Reabilitação Do Asmático (Erai) - Por Sessão Individual",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20103263",
    description: "Hemiparesia",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20103271",
    description: "Hemiplegia",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20103280",
    description: "Hemiplegia E Hemiparesia Com Afasia",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20103298",
    description: "Hipo Ou Agenesia De Membros",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20103301",
    description: "Infiltração De Ponto Gatilho (Por Músculo) Ou Agulhamento Seco (Por Músculo)",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20103310",
    description: "Lesão Nervosa Periférica Afetando Mais De Um Nervo Com Alterações Sensitivas E/Ou Motoras",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20103328",
    description: "Lesão Nervosa Periférica Afetando Um Nervo Com Alterações Sensitivas E/Ou Motoras",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20103336",
    description: "Manipulação Vertebral",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20103344",
    description: "Miopatias",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20103360",
    description: "Paciente Com D.P.O.C. Em Atendimento Ambulatorial Necessitando Reeducação E Reabilitação Respiratória",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20103379",
    description: "Paciente Em Pós-Operatório De Cirurgia Cardíaca, Atendido Em Ambulatório, Duas A Três Vezes Por Semana",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20103387",
    description: "Pacientes Com Doença Isquêmica Do Coração, Atendido Em Ambulatório De 8 A 24 Semanas",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20103395",
    description: "Pacientes Com Doença Isquêmica Do Coração, Atendido Em Ambulatório, Até 8 Semanas De Programa",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20103409",
    description: "Pacientes Com Doenças Neuro-Músculo-Esqueléticas Com Envolvimento Tegumentar",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20103417",
    description: "Pacientes Sem Doença Coronariana Clinicamente Manifesta, Mas Considerada De Alto  Risco,  Atendido  Em Ambulatório, Duas A Três Vezes Por Semana",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20103425",
    description: "Paralisia Cerebral",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20103433",
    description: "Paralisia Cerebral Com Distúrbio De Comunicação",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20103441",
    description: "Paraparesia/Tetraparesia",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20103450",
    description: "Paraplegia E Tetraplegia",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20103468",
    description: "Parkinson",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20103476",
    description: "Patologia Neurológica Com Dependência De Atividades Da Vida Diária",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20103484",
    description: "Patologia Osteomioarticular Em Um Membro",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20103492",
    description: "Patologia Osteomioarticular Em Dois Ou Mais Membros",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20103506",
    description: "Patologia Osteomioarticular Em Um Segmento Da Coluna",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20103514",
    description: "Patologia Osteomioarticular Em Diferentes Segmentos Da Coluna",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20103522",
    description: "Patologias Osteomioarticulares Com Dependência De Atividades Da Vida Diária",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20103530",
    description: "Recuperação Funcional Pós-Operatória Ou Por Imobilização Da Patologia Vertebral",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20103549",
    description: "Procedimentos Mesoterápicos (Por Região Anatômica)",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20103557",
    description: "Procedimentos Mesoterápicos Com Calcitonina (Qualquer Segmento)",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20103565",
    description: "Processos Inflamatórios Pélvicos",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20103573",
    description: "Programa De Exercício Supervisionado Com Obtenção De Eletrocardiograma E/Ou Saturação De O2 - Sessão Individual",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20103581",
    description: "Programa De Exercício Supervisionado Com Obtenção De Eletrocardiograma E/Ou Saturação De O2 - Sessão Coletiva",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20103590",
    description: "Programa De Exercício Supervisionado Sem Obtenção De Eletrocardiograma E/Ou Saturação De O2 - Sessão Individual",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20103603",
    description: "Programa De Exercício Supervisionado Sem Obtenção De Eletrocardiograma E/Ou Saturação De O2 - Sessão Coletiva",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20103611",
    description: "Queimados - Seguimento Ambulatorial Para Prevenção De Sequelas (Por Segmento)",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20103620",
    description: "Reabilitação De Paciente Com Endoprótese",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20103638",
    description: "Reabilitação Labiríntica (Por Sessão)",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20103646",
    description: "Reabilitação Perineal Com Biofeedback",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20103654",
    description: "Recuperação Funcional De Distúrbios Crânio-Faciais",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20103662",
    description: "Recuperação Funcional Pós-Operatória Ou Pós-Imobilização Gessada De  Patologia  Osteomioarticular  Com Complicações Neurovasculares Afetando Um Membro",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20103670",
    description: "Recuperação Funcional Pós-Operatória Ou Pós-Imobilização Gessada De  Patologia  Osteomioarticular  Com Complicações Neurovasculares Afetando Mais De Um Membro",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20103689",
    description: "Retardo Do Desenvolvimento Psicomotor",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20103697",
    description: "Sequelas De Traumatismos Torácicos E Abdominais",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20103700",
    description: "Sequelas Em Politraumatizados (Em Diferentes Segmentos)",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20103719",
    description: "Sinusites",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20103727",
    description: "Reabilitação  Cardíaca Supervisionada. Programa De 12 Semanas. Duas A Três Sessões Por Semana (Por Sessão)",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20103743",
    description: "Exercícios de pleóptica",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20103000",
    description: "1- Os procedimentos de fisiatria não serão autorizados/ pagos caso sejam realizados por fisiotepeutas.",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: ""
  },
  {
    code: "20104014",
    description: "Actinoterapia (Por Sessão)",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20104022",
    description: "Aplicação De Hipossensibilizante - Em Consultório (Ahc) Exclusive O Alérgeno - Planejamento Técnico Para",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20104049",
    description: "Cateterismo Vesical Em Retenção Urinária",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20104057",
    description: "Cauterização Química Vesical",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "20104065",
    description: "Cerumen - Remoção (Bilateral)",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20104073",
    description: "Crioterapia (Grupo De Até 5 Lesões)",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20104081",
    description: "Curativos Em Geral Com Anestesia, Exceto Queimados",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20104090",
    description: "Curativo De Extremidades De Origem Vascular",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20104103",
    description: "Curativos Em Geral Sem Anestesia, Exceto Queimados",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20104111",
    description: "Dilatação Uretral (Sessão)",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20104120",
    description: "Fototerapia Com Uva (Puva) (Por Sessão)",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20104138",
    description: "Imunoterapia Específica - 30 Dias - Planejamento Técnico",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20104146",
    description: "Imunoterapia Inespecífica - 30 Dias - Planejamento Técnico",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20104154",
    description: "Instilação Vesical Ou Uretral",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20104170",
    description: "Sessão De Eletroconvulsoterapia (Em Sala Com Oxímetro De Pulso, Monitor De Ecg, Eeg), Sob Anestesia",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20104189",
    description: "Sessão De Oxigenoterapia Hiperbárica (Por Sessão De 2 Horas)",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20104227",
    description: "Sessão de psicoterapia infantil",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20104235",
    description: "Terapia Inalatória - Por Nebulização",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20104243",
    description: "Terapia Oncológica Com Altas Doses - Planejamento E 1º Dia De Tratamento",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20104251",
    description: "Terapia Oncológica Com Altas Doses - Por Dia Subsequente De Tratamento",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20104260",
    description: "Terapia Oncológica Com Aplicação De Medicamentos Por Via Intracavitária Ou Intratecal  - Por Procedimento",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20104278",
    description: "Terapia Oncológica Com Aplicação Intra-Arterial Ou Intravenosa De Medicamentos Em Infusão De Duração Mínima De 6 Horas - Planejamento E 1º Dia De Tratamento",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20104286",
    description: "Terapia Oncológica Com Aplicação Intra-Arterial Ou Intravenosa De Medicamentos Em Infusão De Duração Mínima De 6 Horas - Por Dia Subsequente De Tratamento",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20104294",
    description: "Terapia Oncológica - Planejamento E 1º Dia De Tratamento",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20104308",
    description: "Terapia Oncológica - Por Dia Subsequente De Tratamento",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20104316",
    description: "Curativo De Ouvido (Cada)",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20104324",
    description: "Curativo Oftalmológico",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20104332",
    description: "Bota De Unna - Confecção",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "20104340",
    description: "Cateterismo De Canais Ejaculadores",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "20104359",
    description: "Massagem Prostática",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "20104375",
    description: "Pneumotórax Artificial",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "20104413",
    description: "Estimulação magnética transcraniana superficial (repetida) - EMT",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20104421",
    description: "Terapia imunobiológica subcutânea (por sessão) ambulatorial",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20104430",
    description: "Terapia antineoplásica oral para tratamento do câncer",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20104448",
    description: "Terapia de pressão negativa - ambulatorial",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20104464",
    description: "Terapia imunoprofilática com palivizumabe para o vírus sincicial respiratório (por sessão) – ambulatorial",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20104480",
    description: "Terapia anti-reabsortiva óssea intravenosa - ambulatorial",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20204175",
    description: "Terapia imunobiológica subcutânea (por sessão) - hospitalar",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20104383",
    description: "Pulsoterapia Intravenosa (Por Sessão) - Ambulatorial",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20104391",
    description: "Terapia Imunobiológica Intravenosa (Por Sessão) - Ambulatorial",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20104510",
    description: "Terapia imunobiológica intramuscular (por sessão) - ambulatorial",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20104529",
    description: "Aplicação de contraceptivo hormonal injetável",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20105029",
    description: "Perícia psiquiátrica administrativa",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20201010",
    description: "Acompanhamento Clínico De Transplante Renal No Período De Internação Do Receptor E Do Doador (Pós-Operatório Até 15 Dias)",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20201028",
    description: "Acompanhamento Peroperatório",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20201036",
    description: "Assistência Cardiológica Peroperatória Em Cirurgia Geral E Em Parto (Primeira Hora)",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20201044",
    description: "Assistência Cardiológica Peroperatória Em Cirurgia Geral E Em Parto (Horas Suplementares) - Máximo De 4 Horas",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20201052",
    description: "Cardioversão Elétrica Eletiva (Avaliação Clínica, Eletrocardiográfica, Indispensável À Desfibrilação)",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20201060",
    description: "Rejeição De Enxerto Renal - Tratamento Internado - Avaliação Clínica Diária - Por Visita",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20201079",
    description: "Transplante Duplo Rim-Pâncreas - Acompanhamento Clínico (Pós-Operatório Até 15 Dias)",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20201087",
    description: "Tratamento  Conservador  De  Traumatismo  Cranioencefálico, Hipertensão  Intracraniana  E  Hemorragia (Por Dia)",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20201095",
    description: "Assistência Cardiológica No Pós-Operatório De Cirurgia Cardíaca (Após A Alta Da Uti)",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20201109",
    description: "Avaliação Clínica Diária Enteral",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20201117",
    description: "Avaliação Clínica Diária Parenteral",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20201125",
    description: "Avaliação Clínica Diária Parenteral E Enteral",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20201141",
    description: "Acompanhamento clínico de transplante hepático no período de internação do receptor e do doador",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20201150",
    description: "Acompanhamento clínico hospitalar do tabagista em síndrome de abstinência, por avaliação, com visitas pós internação e pré alta, limitada a 2",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20202016",
    description: "Cardiotocografia Anteparto",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20202024",
    description: "Cardiotocografia Intraparto (Por Hora) Até 6 Horas Externa",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20202032",
    description: "Monitorização Hemodinâmica Invasiva (Por 12 Horas)",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20202040",
    description: "Monitorização Neurofisiológica Intra-Operatória",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20202059",
    description: "Potencial Evocado Intra-Operatório - Monitorização Cirúrgica (Pe/Io)",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20202067",
    description: "Monitorização Da Pressão Intracraniana (Por Dia)",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20203012",
    description: "Assistência Fisiátrica Respiratória Em Paciente Internado Com Ventilação Mecânica",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20203020",
    description: "Eletroestimulação Do Assoalho Pélvico E/Ou Outra Técnica De Exercícios Perineais",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20203047",
    description: "Assistência Fisiátrica Respiratória Em Doente Clínico Internado",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20203063",
    description: "Pacientes Com Doença Isquêmica Do Coração, Hospitalizado, Até 8 Semanas De Programa",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20203071",
    description: "Pacientes Em Pós-Operatório De Cirurgia Cardíaca, Hospitalizado, Até 8 Semanas De Programa",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20204027",
    description: "Cardioversão Elétrica De Emergência",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20204035",
    description: "Cardioversão Química De Arritmia Paroxísta Em Emergência",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20204043",
    description: "Priapismo - Tratamento Não Cirúrgico",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20204086",
    description: "Terapia Oncológica Com Aplicação Intra-Arterial De Medicamentos, Em Regime De Aplicação Peroperatória, Por Meio De Cronoinfusor Ou Perfusor Extra-Corpórea",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20204159",
    description: "Pulsoterapia Intravenosa (Por Sessão) - Hospitalar",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20204167",
    description: "Terapia Imunobiológica Intravenosa (Por Sessão) - Hospitalar",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20204191",
    description: "Trombólise endovenosa no acidente vascular cerebral AVC isquêmico agudo",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "20204205",
    description: "Terapia anti-reabsortiva óssea intravenosa - hospitalar",
    chapter: "2",
    group: "Procedimentos Clínicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "30101018",
    description: "Abrasão Cirúrgica (Por Sessão)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30101026",
    description: "Alopecia Parcial - Exérese E Sutura",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30101034",
    description: "Alopecia Parcial - Rotação De Retalho",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30101050",
    description: "Apêndice Pré-Auricular - Ressecção",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30101069",
    description: "Autonomização De Retalho - Por Estágio",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30101077",
    description: "Biópsia De Pele, Tumores Superficiais, Tecido Celular Subcutâneo, Linfonodo Superficial, Etc",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "30101085",
    description: "Biópsia De Unha",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "30101093",
    description: "Calosidade E/Ou Mal Perfurante - Desbastamento (Por Lesão)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "30101107",
    description: "Cauterização Química (Por Grupo De Até 5 Lesões)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "30101115",
    description: "Cirurgia Da Hidrosadenite (Por Região)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30101123",
    description: "Cirurgia Micrográfica De Mohs",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30101140",
    description: "Correção Cirúrgica De Linfedema (Por Estágio)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30101158",
    description: "Correção Cirúrgica De Sequelas De Alopecia Traumática Com Microenxertos Pilosos (Por Região)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30101166",
    description: "Correção De Deformidades Nos Membros Com Utilização De Implantes",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30101174",
    description: "Correção De Deformidades Por Exérese De Tumores, Cicatrizes Ou Ferimentos Com O Emprego De Expansores  Em Retalhos  Musculares Ou Miocutâneos (Por Estágio)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30101182",
    description: "Correção De Deformidades Por Exérese De Tumores, Cicatrizes Ou Ferimentos, Com O Emprego De Expansores De Tecido, Em Retalhos Cutâneos (Por Estágio)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30101190",
    description: "Correção De Lipodistrofia Braquial, Crural Ou Trocanteriana De Membros Superiores E Inferiores",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30101204",
    description: "Criocirurgia (Nitrogênio Líquido) De Neoplasias Cutâneas",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30101212",
    description: "Curativo De Queimaduras - Por Unidade Topográfica (Ut) Ambulatorial",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30101220",
    description: "Curativo De Queimaduras - Por Unidade Topográfica (Ut) Hospitalar",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30101239",
    description: "Curativo Especial Sob Anestesia - Por Unidade Topográfica (Ut)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30101247",
    description: "Curetagem E Eletrocoagulação De Ca De Pele (Por Lesão)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "30101255",
    description: "Curetagem Simples De Lesões De Pele (Por Grupo De Até 5 Lesões)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "30101263",
    description: "Dermoabrasão De Lesões Cutâneas",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "30101271",
    description: "Dermolipectomia Para Correção De Abdome Em Avental",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30101280",
    description: "Desbridamento Cirúrgico - Por Unidade Topográfica (Ut)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30101298",
    description: "Eletrocoagulação De Lesões De Pele E Mucosas - Com Ou Sem Curetagem (Por Grupo De Até 5 Lesões)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "30101301",
    description: "Enxerto Cartilaginoso",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30101310",
    description: "Enxerto Composto",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30101328",
    description: "Enxerto De Mucosa",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30101336",
    description: "Enxerto De Pele (Homoenxerto Inclusive)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30101344",
    description: "Enxerto De Pele Múltiplo - Por Unidade Topográfica (Ut)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30101352",
    description: "Epilação Por Eletrólise (Por Sessão)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "30101360",
    description: "Escalpo  Parcial  -  Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30101379",
    description: "Escalpo Total - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30101387",
    description: "Escarectomia Descompressiva (Pele E Estruturas Profundas) - Por Unidade Topográfica (Ut)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30101395",
    description: "Esfoliação Química Média (Por Sessão)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "30101409",
    description: "Esfoliação Química Profunda (Por Sessão)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "30101417",
    description: "Esfoliação Química Superficial (Por Sessão)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "30101425",
    description: "Exérese De Higroma Cístico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30101433",
    description: "Exérese De Higroma Cístico No Rn E Lactente",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30101441",
    description: "Exérese De Lesão Com Auto-Enxertia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30101450",
    description: "Exérese E Sutura De Lesões (Circulares Ou Não) Com Rotação De Retalhos Cutâneos",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30101468",
    description: "Exérese De Lesão / Tumor De Pele E Mucosas",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "30101476",
    description: "Exérese De Tumor E Rotação De Retalho Músculo-Cutâneo",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30101484",
    description: "Exérese De Unha",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "30101492",
    description: "Exérese E Sutura Simples De Pequenas Lesões (Por Grupo De Até 5 Lesões)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "30101506",
    description: "Exérese Tangencial (Shaving) - (Por Grupo De Até 5 Lesões)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30101514",
    description: "Expansão Tissular (Por Sessão)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30101522",
    description: "Extensos Ferimentos, Cicatrizes Ou Tumores - Excisão E Retalhos Cutâneos Da Região",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30101530",
    description: "Extensos Ferimentos, Cicatrizes Ou Tumores - Exérese E Emprego De Retalhos Cutâneos Ou Musculares  Cruzados (Por Estágio)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30101549",
    description: "Extensos Ferimentos, Cicatrizes Ou Tumores - Exérese E Retalhos Cutâneos À Distância",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30101557",
    description: "Extensos Ferimentos, Cicatrizes Ou Tumores - Exérese E Rotação De Retalho Fasciocutâneo Ou Axial",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30101565",
    description: "Extensos Ferimentos, Cicatrizes Ou Tumores - Exérese E Rotação De Retalhos Miocutâneos",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30101573",
    description: "Extensos Ferimentos, Cicatrizes Ou Tumores - Exérese E Rotação De Retalhos Musculares",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30101581",
    description: "Extensos Ferimentos, Cicatrizes, Ou Tumores - Exérese E Enxerto Cutâneo",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30101590",
    description: "Face - Biópsia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "30101603",
    description: "Ferimentos Infectados E Mordidas De Animais (Desbridamento)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30101611",
    description: "Incisão E Drenagem De Tenossinovites Purulentas",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30101620",
    description: "Incisão E Drenagem De Abscesso, Hematoma Ou Panarício",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "30101638",
    description: "Incisão E Drenagem De Flegmão",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "30101646",
    description: "Infiltração  Intralesional, Cicatricial / Hemangiomas - Por Sessão",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "30101654",
    description: "Lasercirurgia (Por Sessão)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30101662",
    description: "Matricectomia Por Dobra Ungueal",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "30101670",
    description: "Plástica Em Z Ou W",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30101689",
    description: "Reconstrução Com Retalhos De Gálea Aponeurótica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30101697",
    description: "Retalho Composto (Incluindo Cartilagem Ou Osso)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30101700",
    description: "Retalho local ou regional",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "30101719",
    description: "Retalho muscular ou miocutâneo",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30101735",
    description: "Retirada De Corpo Estranho Subcutâneo",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "30101743",
    description: "Retração Cicatricial De Axila - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30101751",
    description: "Retração Cicatricial De Zona De Flexão E Extensão De Membros Superiores E Inferiores - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30101760",
    description: "Retração Cicatricial Do Cotovelo - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30101778",
    description: "Retração De Aponevrose Palmar (Dupuytren) - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30101786",
    description: "Sutura De Extensos Ferimentos Com Ou Sem Desbridamento",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30101794",
    description: "Sutura De Pequenos Ferimentos Com Ou Sem Desbridamento",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "30101808",
    description: "Transecção De Retalho",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30101816",
    description: "Transferência Intermediária De Retalho",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30101824",
    description: "Tratamento Cirúrgico De Bridas Constrictivas",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30101832",
    description: "Tratamento Cirúrgico De Grandes Hemangiomas",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30101840",
    description: "Tratamento Da Miiase Furunculóide (Por Lesão)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "30101859",
    description: "Tratamento De Anomalias Pilosas A Laser/Photoderm - Por Sessão",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30101867",
    description: "Tratamento De Escaras Ou Ulcerações Com Enxerto De Pele",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30101875",
    description: "Tratamento De Escaras Ou Ulcerações Com Retalhos Cutâneos Locais",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30101883",
    description: "Tratamento De Escaras Ou Ulcerações Com Retalhos Miocutâneos Ou Musculares",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30101891",
    description: "Tratamento De Fístula Cutânea",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30101905",
    description: "Tratamento De Lesões Cutâneas E Vasculares A Laser/Photoderm - Por Sessão",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30101913",
    description: "Tu Partes Moles - Exérese",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30101921",
    description: "Exérese E Sutura De Hemangioma, Linfangioma Ou Nevus (Por Grupo De Até 5 Lesões)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "30101930",
    description: "Abscesso De Unha (Drenagem) - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "30101948",
    description: "Cantoplastia Ungueal",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30101956",
    description: "Unha (Enxerto) - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30101964",
    description: "Retalho Expandido",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30101972",
    description: "Abdominoplastia pós bariátrica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30101980",
    description: "Dermolipectomia dos membros superiores - braquioplastia pós-bariátrica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30101999",
    description: "Dermolipectomia dos membros inferiores - coxoplastia pós-bariátrica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30102014",
    description: "Terapia de pressão negativa - cirúrgica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30201012",
    description: "Biópsia De Lábio",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "30201020",
    description: "Excisão Com Plástica De Vermelhão",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30201039",
    description: "Excisão Com Reconstrução À Custa De Retalhos",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30201047",
    description: "Excisão Com Reconstrução Total",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30201055",
    description: "Excisão Em Cunha",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "30201063",
    description: "Frenotomia Labial",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "30201071",
    description: "Queiloplastia Para Fissura Labial Unilateral - Por Estágio",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30201080",
    description: "Reconstrução De Sulco Gengivo-Labial",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30201098",
    description: "Reconstrução Total Do Lábio",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30201101",
    description: "Tratamento Cirúrgico Da Macrostomia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30201110",
    description: "Tratamento Cirúrgico Da Microstomia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30202019",
    description: "Alongamento Cirúrgico Do Palato Mole",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30202027",
    description: "Biópsia De Boca",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "30202035",
    description: "Excisão De Lesão Maligna Com Reconstrução À Custa De Retalhos Locais",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30202043",
    description: "Excisão De Tumor De Boca Com Mandibulectomia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30202051",
    description: "Exérese De Tumor E Enxerto Cutâneo Ou Mucoso",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30202060",
    description: "Fístula Orofacial - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30202078",
    description: "Glossectomia Subtotal Ou Total, Com Ou Sem Mandibulectomia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30202086",
    description: "Palato-Queiloplastia Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30202094",
    description: "Palatoplastia Com Enxerto Ósseo",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30202108",
    description: "Palatoplastia Com Retalho Faríngeo",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30202116",
    description: "Palatoplastia Com Retalho Miomucoso",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30202124",
    description: "Palatoplastia Parcial",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30202132",
    description: "Palatoplastia Total",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30202140",
    description: "Plástica Do Ducto Parotídeo",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30202159",
    description: "Laserterapia para o tratamento da mucosite oral / orofaringe, por sessão",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30203015",
    description: "Frenotomia Lingual",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "30203023",
    description: "Tumor De Língua - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30203031",
    description: "Biópsia De Língua",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30204011",
    description: "Biópsia De Glândula Salivar",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "30204020",
    description: "Excisão De Glândula Submandibular",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30204038",
    description: "Exérese De Rânula Ou Mucocele",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30204046",
    description: "Parotidectomia Parcial Com Conservação Do Nervo Facial",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30204054",
    description: "Parotidectomia Total Ampliada Com Ou Sem Reconstrução Com Retalhos Locais",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30204062",
    description: "Parotidectomia Total Com Conservação Do Nervo Facial",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30204070",
    description: "Parotidectomia Total Com Reconstrução Do Nervo Facial",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30204089",
    description: "Parotidectomia Total Com Sacrificio Do Nervo Facial, Sem Reconstrução",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30204097",
    description: "Plastia De Ducto Salivar Ou Exérese De Cálculo Ou De Rânula Salivar",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30204100",
    description: "Ressecção De Tumor De Glândula Sublingual",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30205018",
    description: "Abscesso Faríngeo - Qualquer Área",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30205026",
    description: "Adeno Tonsilectomia - Revisão Cirúrgica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30205034",
    description: "Adeno-Amigdalectomia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30205042",
    description: "Adenoidectomia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30205050",
    description: "Amigdalectomia Das Palatinas",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30205069",
    description: "Amigdalectomia Lingual",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30205077",
    description: "Biópsia Do Cavum, Orofaringe Ou Hipofaringe",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30205085",
    description: "Cauterização (Qualquer Técnica) Por Sessão",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "30205093",
    description: "Corpo Estranho De Faringe - Retirada Em Consultório",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "30205107",
    description: "Corpo Estranho De Faringe - Retirada Sob Anestesia Geral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30205115",
    description: "Criptólise Amigdaliana",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30205140",
    description: "Faringolaringectomia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30205158",
    description: "Faringolaringoesofagectomia Total",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "7"
  },
  {
    code: "30205166",
    description: "Ressecção De Nasoangiofibroma",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30205174",
    description: "Ressecção De Tumor De Faringe (Via Bucal Ou Nasal)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30205182",
    description: "Ressecção De Tumor De Faringe Com Acesso Por Faringotomia Ou Por Retalho Jugal",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30205190",
    description: "Ressecção De Tumor De Faringe Com Mandibulectomia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30205204",
    description: "Ressecção De Tumor De Faringe Por Mandibulotomia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30205212",
    description: "Ressecção De Tumor De Nasofaringe Via Endoscópica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30205220",
    description: "Tonsilectomia A Laser",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30205239",
    description: "Tumor De Boca Ou Faringe - Ressecção",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30205247",
    description: "Uvulopalatofaringoplastia (Qualquer Técnica)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30205263",
    description: "Uvulopalatofaringoplastia Por Radiofrequência",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30205271",
    description: "Adenoidectomia Por Videoendoscopia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30205280",
    description: "Ressecção De Nasoangiofibroma Por Videoendoscopia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30206014",
    description: "Alargamento De Traqueostomia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30206022",
    description: "Aritenoidectomia Microcirúrgica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30206030",
    description: "Aritenoidectomia Ou Aritenopexia Via Externa",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30206049",
    description: "Confecção De Fístula Tráqueo-Esofágica Para Prótese Fonatória Com Miotomia Faríngea",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30206065",
    description: "Exérese De Tumor Por Via Endoscópica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30206103",
    description: "Injeção Intralaríngea De Toxina Botulínica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30206120",
    description: "Laringectomia Parcial",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30206138",
    description: "Laringectomia Total",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30206170",
    description: "Laringofissura (Inclusive Com Cordectomia)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30206200",
    description: "Laringotraqueoplastia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30206219",
    description: "Microcirurgia Com Laser Para Remoção De Lesões Malignas",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30206227",
    description: "Microcirurgia Com Uso De Laser Para Ressecção De Lesões Benignas",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30206235",
    description: "Microcirurgia Para Decorticação Ou Tratamento De Edema De Reinke",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30206243",
    description: "Microcirurgia Para Remoção De Cisto Ou Lesão Intracordal",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30206251",
    description: "Microcirurgia Para Ressecção De Papiloma",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30206260",
    description: "Microcirurgia Para Ressecção De Pólipo, Nódulo Ou Granuloma",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30206278",
    description: "Microcirurgia Para Tratamento De Paralisia De Prega Vocal (Inclui Injeção De Materiais)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30206294",
    description: "Reconstrução Para Fonação Após Laringectomia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30206308",
    description: "Tiroplastia Tipo 1 Com Rotação De Aritenóide",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30206316",
    description: "Tiroplastia Tipo 1 Simples",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30206324",
    description: "Tiroplastia Tipo 2 Ou 3",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30206359",
    description: "Tratamento Cirúrgico Da Estenose Laringo-Traqueal",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "7"
  },
  {
    code: "30206367",
    description: "Tratamento Cirúrgico De Trauma Laríngeo (Agudo)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30207010",
    description: "Redução De Fratura Do Malar (Sem Fixação)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30207029",
    description: "Redução De Fratura Do Malar (Com Fixação)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30207037",
    description: "Redução De Fratura De Seio Frontal (Acesso Frontal)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30207045",
    description: "Redução De Fratura De Seio Frontal (Acesso Coronal)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30207061",
    description: "Fratura Do Arco Zigomático - Redução Instrumental Sem Fixação",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30207070",
    description: "Fratura Do Arco Zigomático - Redução Cirúrgica Com Fixação",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30207088",
    description: "Fratura  Simples De Mandíbula Com Contenção E Bloqueio Intermaxilar Eventual",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30207096",
    description: "Fratura Simples De Mandíbula - Redução Cirúrgica Com Fixação Óssea E Bloqueio Intermaxilar Eventual",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30207100",
    description: "Fratura Naso Etmóido Órbito-Etmoidal",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30207118",
    description: "Fratura Cominutiva De Mandíbula - Redução Cirúrgica Com Fixação Óssea E Bloqueio Intermaxilar Eventual",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30207126",
    description: "Fraturas Complexas De Mandíbula - Redução Cirúrgica Com Fixação Óssea E Eventual Bloqueio Intermaxilar",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30207134",
    description: "Fraturas Alveolares - Fixação Com Aparelho E Contenção",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30207142",
    description: "Fratura De Maxila, Tipo Lefort I E Ii - Redução E Aplicação De Levantamento Zigomático-Maxilar Com Bloqueio Intermaxilar Eventual",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30207150",
    description: "Fratura De Maxila, Tipo Lefort Iii - Redução E Aplicação De Levantamento Crânio-Maxilar Com Bloqueio Intermaxilar Eventual",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30207169",
    description: "Fratura Lefort I - Fixação Cirúrgica Com Síntese Óssea, Levantamento E Bloqueio Intermaxilar Eventual",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30207177",
    description: "Fratura Lefort Ii - Fixação Cirúrgica Com Síntese Óssea, Levantamento E Bloqueio Intermaxilar Eventual",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30207185",
    description: "Fratura Lefort Iii - Fixação Cirúrgica Com Síntese Óssea, Levantamento Crânio-Maxilar E Bloqueio Intermaxilar Eventual",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30207193",
    description: "Fraturas Múltiplas De Terço Médio Da Face:Fixação Cirúrgica Com Síntese Óssea, Levantamento Crânio Maxilar E Bloqueio Intermaxilar",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30207207",
    description: "Fraturas Complexas Do Terço Médio Da Face, Fixação Cirúrgica Com Síntese, Levantamento Crânio-Maxilar, Enxerto Ósseo, Halo Craniano Eventual",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30207215",
    description: "Retirada Dos Meios De Fixação (Na Face)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30207223",
    description: "Tratamento Conservador De Fratura De Ossos",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "30207231",
    description: "Redução De Luxação Do Atm",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30208017",
    description: "Artroplastia Para Luxação Recidivante Da Articulação Têmporo-Mandibular",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30208025",
    description: "Osteoplastia Para Prognatismo, Micrognatismo Ou Laterognatismo",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30208033",
    description: "Osteotomias Alvéolo Palatinas",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30208041",
    description: "Osteotomias Segmentares Da Maxila Ou Malar",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30208050",
    description: "Osteotomia Tipo Lefort I",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30208068",
    description: "Osteotomia Tipo Lefort Ii",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30208076",
    description: "Osteotomia Tipo Lefort Iii - Extracraniana",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30208084",
    description: "Osteotomia Crânio-Maxilares Complexas",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30208092",
    description: "Redução Simples Da Luxação Da Articulação Têmporo-Mandibular Com Fixação Intermaxilar",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30208106",
    description: "Reconstrução Parcial Da Mandíbula Com Enxerto Ósseo",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30208114",
    description: "Reconstrução Total De Mandíbula Com Prótese E Ou Enxerto Ósseo",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30208122",
    description: "Tratamento Cirúrgico De Anquilose Da Articulação Têmporo-Mandibular",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30208130",
    description: "Translocação Etmóido Orbital Para Tratamento Do Hipertelorismo    Miocutâneo Associado A Expansor De Tecido - Por Lado",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30208157",
    description: "Osteotomia da mandíbula e/ou maxila com aplicação de osteodistrator",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30209013",
    description: "Osteoplastias Etmóido Orbitais",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30209021",
    description: "Osteoplastias De Mandíbula",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30209030",
    description: "Osteoplastias Do Arco Zigomático",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30209048",
    description: "Osteoplastias Da Órbita",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30209056",
    description: "Correção Cirúrgica De Depressão (Afundamento) Da Região Frontal",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30210011",
    description: "Hemiatrofia Facial, Correção Com Enxerto De Gordura Ou Implante",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30210020",
    description: "Correção De Tumores, Cicatrizes Ou Ferimentos Com O Auxílio De Expansores De Tecidos - Por Estágio",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30210038",
    description: "Paralisia Facial - Reanimação Com O Músculo Temporal (Região Oral), Sem Neurotização",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30210046",
    description: "Paralisia Facial - Reanimação Com O Músculo Temporal (Região Orbital), Sem Neurotização",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30210054",
    description: "Paralisia Facial - Reanimação Com O Músculo Temporal (Região Oral) Com Neurotização",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30210062",
    description: "Paralisia Facial - Reanimação Com O Músculo Temporal (Região Orbital E Oral) Com Neurotização",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30210070",
    description: "Reconstrução Com Retalhos Axiais Supra-Orbitais E Supratrocleares",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30210089",
    description: "Reconstrução Com Retalho Axial Da Artéria Temporal Superficial",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30210097",
    description: "Reconstrução Com Retalhos Em Vy De Pedículo Subarterial",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30210100",
    description: "Reconstrução Com Rotação Do Músculo Temporal",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30210119",
    description: "Exérese De Tumor Maligno De Pele",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30210127",
    description: "Exérese De Tumor Benigno, Cisto Ou Fístula",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30211018",
    description: "Biópsia De Mandíbula",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30211034",
    description: "Ressecção De Tumor De Mandíbula Com Desarticulação De Atm",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30211042",
    description: "Hemimandibulectomia Ou Ressecção Segmentar Ou Seccional Da Mandíbula",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30211050",
    description: "Mandibulectomia Total",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30211069",
    description: "Mandibulectomia com ou sem esvaziamento orbitário e rinotomia lateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30212014",
    description: "Cervicotomia Exploradora",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30212022",
    description: "Drenagem De Abscesso Cervical Profundo",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30212030",
    description: "Esvaziamento Cervical Radical (Especificar O Lado)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30212049",
    description: "Esvaziamento Cervical Radical Ampliado",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30212057",
    description: "Esvaziamento Cervical Seletivo (Especificar O Lado)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30212065",
    description: "Exérese De Cisto Branquial",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30212073",
    description: "Exérese De Cisto Tireoglosso",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30212081",
    description: "Exérese De Tumor Benigno, Cisto Ou Fístula Cervical",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30212090",
    description: "Linfadenectomia Profunda",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30212103",
    description: "Linfadenectomia Superficial",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30212111",
    description: "Neuroblastoma Cervical - Exérese",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30212120",
    description: "Punção-Biópsia De Pescoço",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "30212138",
    description: "Reconstrução De Esôfago Cervical",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30212146",
    description: "Ressecção De Tumor De Corpo Carotídeo",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30212154",
    description: "Retração Cicatricial Cervical - Por Estágio",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30212162",
    description: "Retração Cicatricial Cervical Com Emprego De Expansores De Tecido - Por Estágio",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30212170",
    description: "Torcicolo Congênito - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30212189",
    description: "Tratamento Cirúrgico Da Lipomatose Cervical",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30212197",
    description: "Tratamento Cirúrgico De Fístula Com Retalho Cutâneo",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30213010",
    description: "Biópsia De Tireóide",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "30213029",
    description: "Bócio Mergulhante: Extirpação Por Acesso Cérvico-Torácico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30213037",
    description: "Istmectomia Ou Nodulectomia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30213045",
    description: "Tireoidectomia Parcial",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30213053",
    description: "Tireoidectomia Total",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30214017",
    description: "Biópsia De Paratireóide",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30214025",
    description: "Paratireoidectomia Com Toracotomia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30214033",
    description: "Reimplante De Paratireóide Previamente Preservada",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30214041",
    description: "Tratamento Cirúrgico Do Hiperparatireoidismo Primário",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30214050",
    description: "Tratamento Cirúrgico Do Hiperparatireoidismo Secundário",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30214068",
    description: "Paratireoidectomia total com reimplante primário de paratireóide",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30215013",
    description: "Cranioplastia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30215021",
    description: "Craniotomia Descompressiva",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30215030",
    description: "Craniotomia Para Tumores Ósseos",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30215048",
    description: "Reconstrução Craniana Ou Craniofacial",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "7"
  },
  {
    code: "30215056",
    description: "Retirada De Cranioplastia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30215072",
    description: "Tratamento Cirúrgico Da Craniossinostose",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30215080",
    description: "Tratamento Cirúrgico Da Fratura Do Crânio - Afundamento",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30215099",
    description: "Tratamento Cirúrgico Da Osteomielite De Crânio",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30301017",
    description: "Abscesso De Pálpebra - Drenagem",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "30301025",
    description: "Biópsia De Pálpebra",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "30301033",
    description: "Blefarorrafia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30301041",
    description: "Calázio - Exérese",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "30301050",
    description: "Cantoplastia Lateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30301068",
    description: "Cantoplastia Medial",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30301076",
    description: "Coloboma - Com Plástica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30301084",
    description: "Correção Cirúrgica De Ectrópio Ou Entrópio",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30301092",
    description: "Correção De Bolsas Palpebrais - Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30301114",
    description: "Epicanto - Correção Cirúrgica - Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30301122",
    description: "Epilação",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "30301130",
    description: "Epilação De Cílios (Diatermo-Coagulação)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30301149",
    description: "Fissura Palpebral - Correção Cirúrgica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30301157",
    description: "Lagoftalmo - Correção Cirúrgica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30301165",
    description: "Pálpebra - Reconstrução Parcial (Com Ou Sem Ressecção De Tumor)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30301173",
    description: "Pálpebra - Reconstrução Total (Com Ou Sem Ressecção De Tumor) - Por Estágio",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30301181",
    description: "Ptose Palpebral - Correção Cirúrgica - Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30301190",
    description: "Ressecção De Tumores Palpebrais",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30301203",
    description: "Retração Palpebral - Correção Cirúrgica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30301211",
    description: "Simbléfaro Com Ou Sem Enxerto - Correção Cirúrgica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30301220",
    description: "Supercílio - Reconstrução Total",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30301238",
    description: "Sutura De Pálpebra",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "30301246",
    description: "Tarsorrafia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30301254",
    description: "Telecanto - Correção Cirúrgica - Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30301262",
    description: "Triquíase Com Ou Sem Enxerto",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30301270",
    description: "Xantelasma Palpebral - Exérese - Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "30302013",
    description: "Correção Da Enoftalmia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30302021",
    description: "Descompressão De Órbita Ou Nervo Ótico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30302030",
    description: "Exenteração Com Osteotomia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30302048",
    description: "Exenteração De Órbita",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30302056",
    description: "Exérese De Tumor Com Abordagem Craniofacial Oncológica (Tempo Facial) Pálpebra, Cavidade Orbitária E Olhos",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "7"
  },
  {
    code: "30302064",
    description: "Fratura De Órbita - Redução Cirúrgica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30302072",
    description: "Fratura De Órbita - Redução Cirúrgica E Enxerto Ósseo",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30302080",
    description: "Implante Secundário De Órbita",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30302099",
    description: "Microcirurgia Para Tumores Orbitários",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "7"
  },
  {
    code: "30302102",
    description: "Reconstituição De Paredes Orbitárias",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30302110",
    description: "Reconstrução Parcial Da Cavidade Orbital - Por Estágio",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30302129",
    description: "Reconstrução Total Da Cavidade Orbital - Por Estágio",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30302137",
    description: "Tumor De Órbita - Exérese",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30303010",
    description: "Autotransplante Conjuntival",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30303028",
    description: "Biópsia De Conjuntiva",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30303036",
    description: "Enxerto De Membrana Amniótica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30303044",
    description: "Infiltração Subconjuntival",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "30303052",
    description: "Plástica De Conjuntiva",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30303060",
    description: "Pterígio - Exérese",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "30303079",
    description: "Reconstituição De Fundo De Saco",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30303087",
    description: "Sutura De Conjuntiva",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "30303095",
    description: "Transplante De Limbo",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30303109",
    description: "Tumor De Conjuntiva - Exérese",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "30303117",
    description: "Crioterapia conjuntival",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30303125",
    description: "Reconstrução de superfície ocular com membrana amniótica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30310172",
    description: "Cirurgia Antiglaucomatosa Via Angular com Implante de Stent de Drenagem por Técnica Minimamente Invasiva",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30304016",
    description: "Cauterização De Córnea",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "30304024",
    description: "Ceratectomia Superficial - Monocular",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30304032",
    description: "Corpo Estranho Da Córnea - Retirada",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30304040",
    description: "Ptk Ceratectomia Fototerapêutica - Monocular",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30304059",
    description: "Recobrimento Conjuntival",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "30304067",
    description: "Sutura De Córnea (Com Ou Sem Hérnia De Íris)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30304075",
    description: "Tarsoconjuntivoceratoplastia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30304083",
    description: "Implante De Anel Intra-Estromal",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30304091",
    description: "Fotoablação De Superfície Convencional - Prk",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "30304105",
    description: "Delaminação Corneana Com Fotoablação Estromal - Lasik",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "30304113",
    description: "Transplante lamelar anterior",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30304121",
    description: "Transplante lamelar posterior",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30304130",
    description: "Preparo da membrana amniótica para procedimentos oftalmológicos",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "30304156",
    description: "Cross-linking (CXL) de colágeno corneano",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30305012",
    description: "Paracentese Da Câmara Anterior",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30305020",
    description: "Reconstrução Da Câmara Anterior",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30305039",
    description: "Remoção De Hifema",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30305047",
    description: "Retirada De Corpo Estranho Da Câmara Anterior",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30306019",
    description: "Capsulotomia Yag Ou Cirúrgica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30306027",
    description: "Facectomia Com Lente Intra-Ocular Com Facoemulsificação",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30306035",
    description: "Facectomia Com Lente Intra-Ocular Sem Facoemulsificação",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30306043",
    description: "Facectomia Sem Implante",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30306051",
    description: "Fixação Iriana De Lente Intra-Ocular",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30306060",
    description: "Implante Secundário / Explante / Fixação Escleral Ou Iriana",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30306078",
    description: "Remoção De Pigmentos Da Lente Intra-Ocular Com Yag-Laser",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30306116",
    description: "Reposicionamento de lentes intraoculares",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30307015",
    description: "Biópsia De Tumor Via Pars Plana",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30307023",
    description: "Biópsia De Vítreo Via Pars Plana",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30307031",
    description: "Endolaser/Endodiatermia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30307040",
    description: "Implante De Silicone Intravítreo",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30307058",
    description: "Infusão De Perfluocarbono",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30307066",
    description: "Membranectomia Epi Ou Sub-Retiniana",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30307074",
    description: "Retirada De Corpo Estranho Do Corpo Vítreo",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30307082",
    description: "Retirada De Óleo De Silicone Via Pars Plana",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30307090",
    description: "Troca Fluido Gasosa",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30307104",
    description: "Vitrectomia A Céu Aberto - Ceratoprótese",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30307112",
    description: "Vitrectomia Anterior",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30307120",
    description: "Vitrectomia Vias Pars Plana",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30307139",
    description: "Infusão Intravítrea De Medicação Anti-Inflamatória",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30307147",
    description: "Tratamento Ocular Quimioterápico Com Anti-Angiogênico. Programa De 24 Meses. Uma Sessão Por Mês (Por Sessão)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30308011",
    description: "Biópsia De Esclera",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30308020",
    description: "Enxerto De Esclera (Qualquer Técnica)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30308038",
    description: "Sutura De Esclera",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30308046",
    description: "Exérese De Tumor De Esclera",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30309018",
    description: "Enucleação Ou Evisceração Com Ou Sem Implante",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30309026",
    description: "Injeção Retrobulbar",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30309034",
    description: "Reconstituição De Globo Ocular Com Lesão De Estruturas Intra-Oculares",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30310016",
    description: "Biópsia De Íris E Corpo Ciliar",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30310024",
    description: "Cicloterapia - Qualquer Técnica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30310032",
    description: "Cirurgias Fistulizantes Antiglaucomatosas",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30310040",
    description: "Cirurgias Fistulizantes Com Implantes Valvulares",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30310059",
    description: "Drenagem De Descolamento De Coróide",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30310067",
    description: "Fototrabeculoplastia (Laser)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30310075",
    description: "Goniotomia Ou Trabeculotomia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30310083",
    description: "Iridectomia (Laser Ou Cirúrgica)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30310091",
    description: "Iridociclectomia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30310105",
    description: "Sinequiotomia (Cirúrgica)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30310113",
    description: "Sinequiotomia (Laser)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30310121",
    description: "Cirurgia antiglaucomatosa via angular (com ou sem implante de drenagem)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30310130",
    description: "Iridoplastia periférica a laser",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "30310148",
    description: "Sutura de íris - pupiloplastia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30310156",
    description: "Revisão de cirurgia fistulizante antiglaucomatosa",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30311012",
    description: "Biópsia De Músculos",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30311020",
    description: "Cirurgia Com Sutura Ajustável",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30311039",
    description: "Estrabismo Ciclo Vertical/Transposição - Monocular - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30311047",
    description: "Estrabismo Horizontal - Monocular - Tratamento Ciúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30311055",
    description: "Injeção De Toxina Botulínica - Monocular",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "30311063",
    description: "Cirurgia de nistagmo",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30312019",
    description: "Aplicação De Placa Radiativa Episcleral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30312027",
    description: "Biópsia De Retina",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30312035",
    description: "Exérese De Tumor De Coróide E/Ou Corpo Ciliar",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30312043",
    description: "Fotocoagulação (Laser) - Por Sessão  - Monocular",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30312051",
    description: "Infusão De Gás Expansor",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30312060",
    description: "Pancrioterapia Periférica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30312078",
    description: "Remoção De Implante Episcleral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30312086",
    description: "Retinopexia Com Introflexão Escleral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30312094",
    description: "Retinopexia Pneumática",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30312108",
    description: "Retinopexia Profilática (Criopexia)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30312116",
    description: "Retinotomia Relaxante",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30312124",
    description: "Pantofotocoagulação na retinopatia da prematuridade –binocular",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30312132",
    description: "Implante intravítreo de polímero farmacológico de liberação controlada",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30312140",
    description: "Fármaco modulação com anti-angiogênico para retinopatia diabética e obstrução venosa retiniana",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30312159",
    description: "Termoterapia transpupilar",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30313015",
    description: "Cirurgia Da Glândula Lacrimal",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30313023",
    description: "Dacriocistectomia - Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30313031",
    description: "Dacriocistorrinostomia Com Ou Sem Intubação - Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30313040",
    description: "Fechamento Dos Pontos Lacrimais",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "30313058",
    description: "Reconstituição De Vias Lacrimais Com Silicone Ou Outro Material",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30313066",
    description: "Sondagem Das Vias Lacrimais - Com Ou Sem Lavagem",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "30313074",
    description: "Reconstituição De Pontos Lacrimais",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "30401011",
    description: "Biópsia De Pavilhão Auricular",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "30401020",
    description: "Exérese De Tumor Com Abordagem Craniofacial Oncológica Pavilhão Auricular (Tempo Facial)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "7"
  },
  {
    code: "30401038",
    description: "Exérese De Tumor Com Fechamento Primário",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30401046",
    description: "Outros Defeitos Congênitos Que Não A Microtia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30401054",
    description: "Reconstrução  De Orelha - Retoques",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30401062",
    description: "Reconstrução De Unidade Anatômica Do Pavilhão Auricular - Por Estágio",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30401070",
    description: "Reconstrução Total De Orelha - Único Estágio",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30401089",
    description: "Ressecção De Tumor De Pavilhão Auricular, Incluindo Parte Do Osso Temporal",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "7"
  },
  {
    code: "30401097",
    description: "Ressecção Subtotal Ou Total De Orelha",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30401100",
    description: "Tratamento Cirúrgico De Sinus Pré-Auricular",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30402018",
    description: "Aspiração Auricular",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30402026",
    description: "Biópsia (Orelha Externa)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30402034",
    description: "Cisto Pré-Auricular (Coloboma Auris) - Exérese-Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30402042",
    description: "Corpos Estranhos, Pólipos Ou Biópsia - Em Consultório",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "30402050",
    description: "Corpos Estranhos, Pólipos Ou Biópsia - Em Hospital Sob Anestesia Geral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30402069",
    description: "Estenose De Conduto Auditivo Externo - Correção",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30402077",
    description: "Furúnculo - Drenagem (Ouvido)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30402085",
    description: "Pericondrite De Pavilhão - Tratamento Cirúrgico Com Desbridamento",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30402093",
    description: "Tumor Benigno De Conduto Auditivo Externo - Exérese",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30403014",
    description: "Cauterização De Membrana Timpânica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30403030",
    description: "Estapedectomia Ou Estapedotomia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30403049",
    description: "Exploração E Descompressão Parcial Do Nervo Facial Intratemporal",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30403057",
    description: "Fístula Perilinfática - Fechamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30403065",
    description: "Glomus Jugular - Ressecção",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30403073",
    description: "Glomus Timpânicus - Ressecção",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30403081",
    description: "Mastoidectomia Simples Ou Radical Modificada",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30403090",
    description: "Ouvido Congênito - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30403103",
    description: "Paracentese Do Tímpano - Miringotomia, Unilateral - Em Consultório",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "30403111",
    description: "Tímpano-Mastoidectomia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30403120",
    description: "Timpanoplastia Com Reconstrução Da Cadeia Ossicular",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30403138",
    description: "Timpanoplastia Tipo I - Miringoplastia - Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30403146",
    description: "Timpanotomia Exploradora - Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30403154",
    description: "Timpanotomia Para Tubo De Ventilação - Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30403162",
    description: "Paracentese Do Tímpano, Unilateral, Em Hospital - Anestesia Geral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30404010",
    description: "Doença De Meniere - Tratamento Cirúrgico - Descompressão Do Saco Endolinfático Ou Shunt",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30404029",
    description: "Enxerto Parcial Intratemporal Do Nervo Facial - Do Foramem Estilo-Mastóideo Ao Gânglio Geniculado",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30404037",
    description: "Enxerto Parcial Intratemporal Do Nervo Facial - Do Gânglio Geniculado Ao Meato Acústico Interno",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30404045",
    description: "Enxerto Total Do Nervo Facial Intratemporal",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30404053",
    description: "Exploração E Descompressão Total Do Nervo Facial (Transmastóideo, Translabiríntico, Fossa Média)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30404061",
    description: "Implante Coclear (Exceto A Prótese)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30404070",
    description: "Injeção De Drogas Intratimpânicas",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30404088",
    description: "Labirintectomia (Membranosa Ou Óssea) - Sem Audição",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30404096",
    description: "Neurectomia Vestibular Para Fossa Média Ou Posterior",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30404100",
    description: "Neurectomia Vestibular Translabiríntica - Sem Audição",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30404126",
    description: "Ressecção Do Osso Temporal",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30404134",
    description: "Tumor Do Nervo Acústico - Ressecção Via Translabiríntica Ou Fossa Média",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30404150",
    description: "Procedimento cirúrgico de implante coclear unlitareal (primeira implantação ou substituição)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30404169",
    description: "Substituição do imã do implante coclear unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30404177",
    description: "Cirurgia para prótese auditiva percutânea ancorada no osso unilateral (primeira implantação ou substituição)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30404185",
    description: "Neurotelemetria transoperatória do implante coclear - unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30501016",
    description: "Abscesso Ou Hematoma De Septo Nasal - Drenagem",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30501024",
    description: "Abscesso Ou Hematoma De Septo Nasal - Drenagem Sob Anestesia Geral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30501040",
    description: "Alongamento De Columela",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30501059",
    description: "Biópsia De Nariz",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30501067",
    description: "Corneto Inferior - Cauterização Linear - Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30501075",
    description: "Corneto Inferior - Infiltração Medicamentosa (Unilateral)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30501083",
    description: "Corpos Estranhos - Retirada Em Consultório (Nariz)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "30501091",
    description: "Corpos Estranhos - Retirada Sob Anestesia Geral / Hospital (Nariz)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30501113",
    description: "Epistaxe - Cauterização (Qualquer Técnica)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30501121",
    description: "Epistaxe - Cauterização Da Artéria Esfenopalatina Com Microscopia - Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30501130",
    description: "Epistaxe - Cauterização Das Artérias Etmoidais Com Microscopia - Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30501148",
    description: "Epistaxe - Ligadura Das Artérias Etmoidais - Acesso Transorbitário - Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30501156",
    description: "Epistaxe - Tamponamento  Antero-Posterior",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30501164",
    description: "Epistaxe - Tamponamento Anterior",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30501172",
    description: "Epistaxe - Tamponamento Antero-Posterior Sob Anestesia Geral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30501180",
    description: "Exérese De Tumor Com Abordagem Craniofacial Oncológica (Tempo Facial) Pirâmide Nasal",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "7"
  },
  {
    code: "30501199",
    description: "Exérese De Tumor Nasal Por Via Endoscopica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30501202",
    description: "Fechamento De Fístula Liquórica Transnasal",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30501210",
    description: "Fístula Liquórica - Tratamento Cirúrgico Endoscópico Intranasal",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30501229",
    description: "Fraturas Dos Ossos Nasais - Redução Cirúrgica E Gesso",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30501237",
    description: "Fraturas Dos Ossos Nasais - Redução Incruenta E Gesso",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30501245",
    description: "Imperfuração Coanal - Correção Cirúrgica Intranasal",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30501253",
    description: "Imperfuração Coanal - Correção Cirúrgica Transpalatina",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30501261",
    description: "Ozena - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30501270",
    description: "Perfuração Do Septo Nasal - Correção Cirúrgica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30501288",
    description: "Polipectomia - Unilateral (Nariz)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30501296",
    description: "Reconstrução De Unidade Anatômica Do Nariz - Por Estágio",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30501300",
    description: "Reconstrução Total De Nariz - Por Estágio",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30501318",
    description: "Ressecção De Tumores Malignos Transnasais",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30501326",
    description: "Rinectomia Parcial",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30501334",
    description: "Rinectomia Total",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30501342",
    description: "Rinoplastia Reparadora",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30501350",
    description: "Rinosseptoplastia Funcional",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30501369",
    description: "Septoplastia (Qualquer Técnica Sem Vídeo)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30501377",
    description: "Sinéquia Nasal - Ressecção Unilateral - Qualquer Técnica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30501385",
    description: "Tratamento Cirúrgico Da Atresia Narinária",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30501393",
    description: "Tratamento Cirúrgico De Deformidade Nasal Congênita",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30501407",
    description: "Tratamento Cirúrgico Do Rinofima",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30501415",
    description: "Tratamento Cirúrgico Reparador Do Nariz Em Sela",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30501423",
    description: "Tratamento De Deformidade Traumática Nasal",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30501431",
    description: "Tumor Intranasal - Exérese Por Rinotomia Lateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30501440",
    description: "Tumor Intranasal - Exérese Por Via Transnasal",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30501458",
    description: "Turbinectomia Ou Turbinoplastia - Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30501466",
    description: "Turbinoplastia Por Radiofrequência",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30501474",
    description: "Corpos Estranhos - Retirada Sob Anestesia Geral / Hospital (Nariz) - Por Videoendoscopia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30501482",
    description: "Epistaxe - Cauterização Da Artéria Esfenopalatina Com Microscopia - Unilateral Por Videoendoscopia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30501490",
    description: "Imperfuração Coanal - Correção Cirúrgica Intranasal Por Videoendoscopia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30501504",
    description: "Ozena - Tratamento Cirúrgico Por Videoendoscopia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30501512",
    description: "Perfuração Do Septo Nasal - Correção Cirúrgica Por Videoendoscopia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30501520",
    description: "Rinosseptoplastia Funcional Por Videoendoscopia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30501539",
    description: "Septoplastia Por Videoendoscopia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30502012",
    description: "Angiofibroma - Ressecção Transmaxilar E/Ou Transpalatina",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30502020",
    description: "Antrostomia Maxilar Intranasal",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30502039",
    description: "Artéria Maxilar Interna - Ligadura Transmaxilar",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30502047",
    description: "Cisto Naso-Alveolar E Globular - Exérese",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30502063",
    description: "Descompressão Transetmoidal Do Canal Óptico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30502071",
    description: "Etmoidectomia Externa",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30502080",
    description: "Etmoidectomia Intranasal",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30502098",
    description: "Exérese De Tumor Com Abordagem Craniofacial Oncológica Seios...(Tempo Facial)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "7"
  },
  {
    code: "30502101",
    description: "Exérese De Tumor De Seios Paranasais Por Via Endoscopica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30502110",
    description: "Fístula Oro-Antral - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30502128",
    description: "Fístula Oronasal - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30502136",
    description: "Maxilectomia Incluindo Exenteração De Órbita",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30502144",
    description: "Maxilectomia Parcial",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30502152",
    description: "Maxilectomia Total",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30502160",
    description: "Pólipo Antro-Coanal De Killiam - Exérese",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30502179",
    description: "Punção Maxilar Transmeática Ou Via Fossa Canina",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30502187",
    description: "Ressecção De Tumor Benigno",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30502195",
    description: "Biópsia De Seios Paranasais - Qualquer Via",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30502209",
    description: "Sinusectomia Maxilar - Via Endonasal",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30502217",
    description: "Sinusectomia Frontal Com Retalho Osteoplástico Ou Via Coronal",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30502225",
    description: "Sinusectomia Fronto-Etmoidal Por Via Externa",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30502233",
    description: "Sinusectomia Maxilar - Via Oral (Caldwell-Luc)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30502241",
    description: "Sinusectomia Transmaxilar (Ermiro De Lima)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30502250",
    description: "Sinusotomia Esfenoidal",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30502268",
    description: "Sinusotomia Frontal Intranasal",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30502276",
    description: "Sinusotomia Frontal Via Externa",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30502284",
    description: "Antrostomia Maxilar, Etmoidectomia Etc A Laser (Abertura De Todas As Cavidades Paranasais A Laser)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30502292",
    description: "Antrostomia Maxilar Intranasal Por Videoendoscopia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30502306",
    description: "Artéria Maxilar Interna - Ligadura Transmaxilar Por Videoendoscopia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30502314",
    description: "Etmoidectomia Intranasal Por Videoendoscopia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30502322",
    description: "Sinusectomia Maxilar - Via Endonasal Por Videoendoscopia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30502349",
    description: "Sinusotomia Esfenoidal Por Videoendoscopia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30502357",
    description: "Sinusotomia Frontal Intranasal Por Videoendoscopia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30502365",
    description: "Sinusotomia Frontal Intranasal Com Balão Por Videoendoscopia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30601010",
    description: "Correção De Deformidades Da Parede Torácica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30601029",
    description: "Costectomia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30601037",
    description: "Esternectomia Subtotal",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30601045",
    description: "Esternectomia Total",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30601053",
    description: "Fechamento De Pleurostomia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30601070",
    description: "Mobilização De Retalhos Musculares Ou Do Omento",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30601088",
    description: "Plumbagem Extrafascial",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30601096",
    description: "Reconstrução Da Parede Torácica (Com Ou Sem Prótese)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30601100",
    description: "Reconstrução Da Parede Torácica Com Retalhos Cutâneos",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30601118",
    description: "Reconstrução Da Parede Torácica Com Retalhos Musculares Ou Miocutâneos",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30601126",
    description: "Reconstrução Da Região Esternal Com Retalhos Musculares Bilaterais",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30601134",
    description: "Ressecção De Tumor Do Diafragma E Reconstrução (Qualquer Técnica)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30601142",
    description: "Retirada De Corpo Estranho Da Parede Torácica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30601150",
    description: "Toracectomia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30601169",
    description: "Toracoplastia (Qualquer Técnica)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30601177",
    description: "Toracotomia Com Biópsia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30601185",
    description: "Toracotomia Exploradora (Excluídos Os Procedimentos Intratorácicos)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30601193",
    description: "Toracotomia Para Procedimentos Ortopédicos Sobre A Coluna Vertebral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30601207",
    description: "Tração Esquelética Do Gradil Costo-Esternal (Traumatismo)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30601215",
    description: "Tratamento Cirúrgico De Fraturas Do Gradil Costal",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30601223",
    description: "Biópsia Cirúrgica De Costela Ou Esterno",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30601231",
    description: "Fratura Luxação De Esterno Ou Costela - Redução Incruenta",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "30601240",
    description: "Fratura Luxação De Esterno Ou Costela - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30601258",
    description: "Osteomielite De Costela Ou Esterno - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30601266",
    description: "Punção Biópsia De Costela Ou Esterno",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30601274",
    description: "Correção De Deformidades Da Parede Torácica Por Vídeo",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30601282",
    description: "Vídeo Para Procedimentos Sobre A Coluna Vertebral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30601290",
    description: "Ressutura De Parede Torácica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30601304",
    description: "Fratura De Costela Ou Esterno - Tratamento Conservador",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "30601312",
    description: "Osteomielite De Costela Ou Esterno - Tratamento Conservador",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "30602017",
    description: "Biópsia Incisional De Mama",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30602025",
    description: "Coleta De Fluxo Papilar De Mama",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "30602033",
    description: "Correção Cirúrgica Da Assimetria Mamária",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30602041",
    description: "Correção De Inversão Papilar - Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30602050",
    description: "Drenagem De Abscesso De Mama",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30602068",
    description: "Drenagem E/Ou Aspiração De Seroma",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30602076",
    description: "Exérese De Lesão Da Mama Por Marcação Estereotáxica Ou Roll",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30602084",
    description: "Exérese De Mama Supra-Numerária - Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30602092",
    description: "Exérese De Nódulo",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30602106",
    description: "Fistulectomia De Mama",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30602114",
    description: "Ginecomastia - Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30602122",
    description: "Correção Da Hipertrofia Mamária - Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30602130",
    description: "Linfadenectomia Axilar",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30602149",
    description: "Mastectomia Radical Ou Radical Modificada - Qualquer Técnica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30602157",
    description: "Mastectomia Simples",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30602165",
    description: "Mastectomia Subcutânea E Inclusão Da Prótese",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30602173",
    description: "Mastoplastia Em Mama Oposta Após Reconstrução Da Contralateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30602181",
    description: "Punção Ou Biópsia Percutânea De Agulha Fina - Por Nódulo (Máximo De 3 Nódulos Por Mama)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30602190",
    description: "Quadrantectomia E Linfadenectomia Axilar",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30602203",
    description: "Quadrantectomia - Ressecção Segmentar",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30602211",
    description: "Reconstrução Da Placa Aréolo Mamilar - Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30602238",
    description: "Reconstrução Mamária Com Retalho Muscular Ou Miocutâneo - Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30602246",
    description: "Reconstrução Mamária Com Retalhos Cutâneos Regionais",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30602254",
    description: "Reconstrução Parcial Da Mama Pós-Quadrantectomia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30602262",
    description: "Reconstrução Da Mama Com Prótese E/Ou Expansor",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30602289",
    description: "Ressecção Do Linfonodo Sentinela / Torácica Lateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30602297",
    description: "Ressecção Do Linfonodo Sentinela / Torácica Medial",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30602300",
    description: "Ressecção Dos Ductos Principais Da Mama - Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30602319",
    description: "Retirada Da Válvula Após Colocação De Expansor Permanente",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30602327",
    description: "Substituição De Prótese",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30602335",
    description: "Biópsia Percutânea Com Agulha Grossa, Em Consultório",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "30602343",
    description: "Linfadenectomia Por Incisão Extra-Axilar",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30602351",
    description: "Mamoplastia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30602360",
    description: "Mamoplastia feminina (com ou sem uso de implantes mamários) pós-bariátrica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30602378",
    description: "Mamoplastia masculina pós-bariátrica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30602386",
    description: "Adenomastectomia / mastectomia preservadora de pele, aréola e papila",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30602394",
    description: "Adenomastectomia com redução de excesso de pele",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30602408",
    description: "Capsulectomia - ressecção de cápsula da prótese unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30701015",
    description: "Abdominal Ou Hipogástrico - Transplantes Cutâneos",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30701023",
    description: "Antebraço  - Transplantes Cutâneos",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30701031",
    description: "Axilar - Transplantes Cutâneos",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30701040",
    description: "Couro Cabeludo - Transplantes Cutâneos",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30701058",
    description: "Deltopeitoral - Transplantes Cutâneos",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30701066",
    description: "Digitais (Da Face Volar E Látero-Cubital Dos Dedos Médio E Anular Da Mão) - Transplantes Cutâneos",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30701074",
    description: "Digital Do Hallux - Transplantes Cutâneos",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30701082",
    description: "Dorsal Do Pé - Transplantes Cutâneos",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30701090",
    description: "Escapular - Transplantes Cutâneos",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30701104",
    description: "Femoral - Transplantes Cutâneos",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30701112",
    description: "Fossa Poplítea - Transplantes Cutâneos",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30701120",
    description: "Inguino-Cural - Transplantes Cutâneos",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30701139",
    description: "Intercostal - Transplantes Cutâneos",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30701147",
    description: "Interdigital Da 1ª Comissura Dos Dedos Do Pé - Transplantes Cutâneos",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30701155",
    description: "Outros Transplantes Cutâneos",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30701163",
    description: "Paraescapular",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30701171",
    description: "Retroauricular",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30701180",
    description: "Temporal",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30701198",
    description: "Transplante Cutâneo Com Microanastomose",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30701201",
    description: "Transplante Cutâneo Sem Microanastomose, Ilha Neurovascular",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30701210",
    description: "Transplante Miocutâneo Com Microanastomose",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30702011",
    description: "Grande Dorsal (Latissimus Dorsi) - Transplantes Músculo-Cutâneos Com Microanastomoses Vasculares",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30702020",
    description: "Grande Glúteo (Gluteus Maximus)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30702038",
    description: "Outros Transplantes Músculo-Cutâneos",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30702046",
    description: "Reto Abdominal (Rectus Abdominis)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30702054",
    description: "Reto Interno (Gracilis) - Transplantes Músculo-Cutâneos Com Microanastomoses Vasculares",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30702062",
    description: "Serrato Maior (Serratus) - Transplantes Músculo-Cutâneos Com Microanastomoses Vasculares",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30702070",
    description: "Tensor Da Fascia Lata (Tensor Fascia Lata) - Transplantes Músculo-Cutâneos Com Microanastomoses Vasculares",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30702089",
    description: "Trapézio (Trapezius)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30703018",
    description: "Bíceps Femoral (Biceps Femoris)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30703026",
    description: "Extensor Comum Dos Dedos (Extensor Digitorum Longus)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30703034",
    description: "Extensor Próprio Do Dedo Gordo (Extensor Hallucis Longus)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30703042",
    description: "Flexor Curto Plantar (Flexor Digitorum Brevis)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30703050",
    description: "Grande Dorsal (Latissimus Dorsi) - Transplantes Musculares Com Microanastomoses Vasculares",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30703069",
    description: "Grande Peitoral (Pectoralis Major)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30703077",
    description: "Músculo Pédio (Extensor Digitorum Brevis)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30703085",
    description: "Os Músculos Latissimus Dorsi, Gracilis, Rectus Femoris, Tensor Fascia Lata, Flexor Digitorum Brevis, Quando Transplantados Com Sua Inervação E Praticada A Microneurorrafia Com Finalidade De Restaurar Função E Sensibilidade, Serão Considerados Retalho",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30703093",
    description: "Outros Transplantes Musculares",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30703107",
    description: "Primeiro Radial Externo (Extensor Carpi Radialis Longus)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30703115",
    description: "Reto Anterior (Rectus Femoris)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30703123",
    description: "Reto Interno (Gracilis) - Transplantes Musculares Com Microanastomoses Vasculares",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30703131",
    description: "Sartório (Sartorius)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30703140",
    description: "Semimembranoso (Semimembranosus)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30703158",
    description: "Semitendinoso (Semitendinosus)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30703166",
    description: "Serrato Maior (Serratus) - Transplantes Musculares Com Microanastomoses Vasculares",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30703174",
    description: "Supinador Longo (Brachioradialis)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30703182",
    description: "Tensor Da Fascia Lata (Tensor Fascia Lata) - Transplantes Musculares Com Microanastomoses Vasculares",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30704014",
    description: "Costela",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30704022",
    description: "Ilíaco",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30704030",
    description: "Osteocutâneo De Ilíaco",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30704049",
    description: "Osteocutâneos De Costela",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30704057",
    description: "Osteomusculocutâneo De Costela",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30704065",
    description: "Outros Transplantes Ósseos E Osteomusculocutâneos",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30704073",
    description: "Perônio Ou Fíbula",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30704081",
    description: "Transplante Ósseo Vascularizado (Microanastomose)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30705010",
    description: "Autotransplante De Dois Retalhos  Musculares Combinados, Isolados E Associados Entre Si, Ligados Por Um Único Pedículo",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "7"
  },
  {
    code: "30705029",
    description: "Autotransplante De Dois Retalhos Cutâneos Combinados, Isolados E Associados Entre Si, Ligados Por Um Único Pedículo Vascular",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "7"
  },
  {
    code: "30705037",
    description: "Autotransplante De Dois Retalhos,  Um  Cutâneo  Combinado A Um Muscular,  Isolados  E Associados Entre Si, Ligados Por Um Único Pedículo Vascular",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "7"
  },
  {
    code: "30705045",
    description: "Autotransplante De Dois Retalhos, Um Cutâneo Combinado A Retalho Osteomuscular, Isolados E Associados Entre Sí, Ligados Por Um Único Pedículo Vascular",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "7"
  },
  {
    code: "30705053",
    description: "Autotransplante De Epiplon",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "7"
  },
  {
    code: "30705061",
    description: "Autotransplante De Outros Retalhos,  Isolados  Entre  Si, E Associados Mediante Um Único Pedículo Vascular Comuns Aos Retalhos",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "7"
  },
  {
    code: "30705070",
    description: "Autotransplante De Três Retalhos, Um Cutâneo Separado, Combinado A Outros Dois Retalhos Musculares Isolados E Associados, Ligados Por Um Único Pedículo Vascular",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "7"
  },
  {
    code: "30705100",
    description: "Reimplante De Segmentos Distais Do Membro Superior, Com Ressecção Segmentar",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "7"
  },
  {
    code: "30706017",
    description: "Reimplante Do Membro Inferior Do Nível Médio Proximal Da Perna Até A Coxa",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30706025",
    description: "Reimplante Do Membro Inferior Do Pé Até O Terço Médio Da Perna",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30706033",
    description: "Reimplante Do Membro Superior, Do Nível Médio Do Antebraço Até O Ombro",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30707013",
    description: "Transplante Articular De Metatarsofalângica Para A Mão",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30707021",
    description: "Transplante De 2º Pododáctilo Para Mão",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30707030",
    description: "Transplante De Dedos Do Pé Para A Mão",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30707048",
    description: "Transplante Do 2º Pododáctilo Para O Polegar",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30707056",
    description: "Transplante Do Hallux Para Polegar",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30707064",
    description: "Transplante De Dois Pododáctilos Para A Mão",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30709016",
    description: "Instalação De Halo Craniano",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30709024",
    description: "Tração Cutânea",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30709032",
    description: "Tração Transesquelética (Por Membro)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30710014",
    description: "Retirada De Fios Ou Pinos Metálicos Transósseos",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30710022",
    description: "Retirada De Fios, Pinos, Parafusos Ou Hastes Metálicas Intra-Ósseas",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30710030",
    description: "Retirada De Placas",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30710049",
    description: "Retirada De Próteses De Substituição De Pequenas Articulações",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30710057",
    description: "Retirada De Fixadores Externos",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30710073",
    description: "Retirada de fixador externo circular",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30711010",
    description: "Imobilizações Não-Gessadas (Qualquer Segmento)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "30711029",
    description: "Imobilização De Membro Inferior",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "30711037",
    description: "Imobilização De Membro Superior",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "30712017",
    description: "Áxilo-Palmar Ou Pendente",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "30712025",
    description: "Bota Com Ou Sem Salto",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "30712033",
    description: "Colar",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "30712041",
    description: "Colete",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "30712050",
    description: "Cruro-Podálico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "30712068",
    description: "Dupla Abdução Ou Ducroquet",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "30712076",
    description: "Halo-Gesso",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "30712084",
    description: "Inguino-Maleolar",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "30712092",
    description: "Luva",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "30712106",
    description: "Minerva Ou Risser Para Escoliose",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "30712114",
    description: "Pelvipodálico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "30712122",
    description: "Spica-Gessada",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "30712130",
    description: "Tipo Velpeau",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "30712149",
    description: "Tóraco-Braquial",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "30713021",
    description: "Biópsia Óssea",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30713030",
    description: "Biópsias Percutânea Sinovial Ou De Tecidos Moles",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30713048",
    description: "Enxertos Em Outras Pseudartroses",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30713064",
    description: "Manipulação Articular Sob Anestesia Geral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30713072",
    description: "Retirada De Enxerto Ósseo",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30713137",
    description: "Punção Articular Diagnóstica Ou Terapêutica (Infiltração) - Orientada Ou Não Por Método De Imagem",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "30713145",
    description: "Punção Extra-Articular Diagnóstica Ou Terapêutica (Infiltração/Agulhamento Seco) - Orientada Ou Não Por Método De Imagem",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "30713153",
    description: "Artroscopia Para Diagnóstico Com Ou Sem Biópsia Sinovial",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30714010",
    description: "Corpo Estranho Intra-Articular - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30714028",
    description: "Corpo Estranho Intra-Ósseo - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30714036",
    description: "Corpo Estranho Intramuscular - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30715016",
    description: "Artrodese Da Coluna Com Instrumentação Por Segmento",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30715024",
    description: "Artrodese De Coluna Via Anterior Ou Póstero Lateral - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30715032",
    description: "Biópsia Da Coluna",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30715040",
    description: "Biópsia De Corpo Vertebral Com Agulha",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30715059",
    description: "Cirurgia De Coluna Por Via Endoscópica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "7"
  },
  {
    code: "30715067",
    description: "Cordotomia - Mielotomia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30715075",
    description: "Costela Cervical - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30715083",
    description: "Derivação Lombar Externa",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30715091",
    description: "Descompressão Medular E/Ou Cauda Equina",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30715105",
    description: "Dorso Curvo / Escoliose / Giba Costal - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30715113",
    description: "Espondilolistese - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30715121",
    description: "Fratura De Coluna Sem Gesso - Tratamento Conservador",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "30715130",
    description: "Fratura Do Cóccix - Redução Incruenta",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30715148",
    description: "Fratura Do Cóccix - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30715156",
    description: "Fratura E/Ou Luxação De Coluna Vertebral - Redução Incruenta",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30715164",
    description: "Fraturas Ou Fratura-Luxação De Coluna - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30715172",
    description: "Hemivértebra - Ressecção Via Anterior Ou Posterior - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30715180",
    description: "Hérnia De Disco Tóraco-Lombar - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30715199",
    description: "Laminectomia Ou Laminotomia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30715202",
    description: "Microcirurgia para tumores extra-intradurais",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30715210",
    description: "Osteomielite De Coluna - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30715229",
    description: "Osteotomia De Coluna Vertebral - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30715237",
    description: "Outras Afecções Da Coluna - Tratamento Incruento",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30715245",
    description: "Pseudartrose De Coluna - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30715253",
    description: "Punção Liquórica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30715261",
    description: "Retirada De Corpo Estranho - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30715270",
    description: "Retirada De Material De Síntese - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30715288",
    description: "Substituição De Corpo Vertebral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30715296",
    description: "Tração Cervical Transesquelética",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30715300",
    description: "Tratamento Cirúrgico Da Cifose Infantil",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "7"
  },
  {
    code: "30715318",
    description: "Tratamento Cirúrgico Da Lesão Traumática Raquimedular",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30715326",
    description: "Tratamento Cirúrgico Das Malformações Craniovertebrais",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30715334",
    description: "Tratamento Cirúrgico Do Disrafismo Espinhal",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30715342",
    description: "Tratamento Conservador Do Traumatismo Raquimedular (Por Dia)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "30715350",
    description: "Tratamento Microcirúrgico Das Lesões Intramedulares (Tumor, Malformações Arteriovenosas, Siringomielia, Parasitoses)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "7"
  },
  {
    code: "30715369",
    description: "Tratamento Microcirúrgico Do Canal Vertebral Estreito Por Segmento",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30715377",
    description: "Tratamento Pré-Natal Dos Disrafismos Espinhais",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30715385",
    description: "Tumor Ósseo Vertebral - Ressecção Com Substituição Com Ou Sem Instrumentação - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30715393",
    description: "Hérnia De Disco Cervical - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30715407",
    description: "Fratura De Coluna Com Gesso - Tratamento conservador",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30715423",
    description: "Radiculotomia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30715555",
    description: "Osteoplastia vertebral por vertebroplastia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30715563",
    description: "Osteoplastia vertebral por cifoplastia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30715571",
    description: "Discectomia percutânea mecânica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30715598",
    description: "Artroplastia discal de coluna vertebral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30715601",
    description: "Localização/intervenção estereotáxica de lesões/estruturas de coluna vertebral por neuronavegação com intervenção",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30717019",
    description: "Artrodese Ao Nível Do Ombro - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30717027",
    description: "Artroplastia Escápulo Umeral Com Implante - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30717035",
    description: "Artrotomia Glenoumeral - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30717043",
    description: "Biópsia Cirúrgica Da Cintura Escapular",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30717051",
    description: "Deformidade (Doença) Sprengel - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30717060",
    description: "Desarticulação Ao Nível Do Ombro - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30717078",
    description: "Escápula Em Ressalto - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30717086",
    description: "Fratura De Cintura Escapular - Tratamento Conservador",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "30717094",
    description: "Fraturas E/Ou Luxações E/Ou Avulsões - Redução Incruenta - Em Articulação Escápulo-Umeral E Cintura Escapular",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30717108",
    description: "Fraturas E/Ou Luxações E/Ou Avulsões - Tratamento Cirúrgico - Em Articulação Escápulo-Umeral E Cintura Escapular",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30717116",
    description: "Luxações Crônicas Inveteradas E Recidivantes - Tratamento Cirúrgico - Em Articulação Escápulo-Umeral E Cintura Escapular",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30717124",
    description: "Osteomielite Ao Nível Da Cintura Escapular - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30717132",
    description: "Pseudartroses E/Ou Osteotomias Da Cintura Escapular - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30717140",
    description: "Ressecção Parcial Ou Total De Clavícula - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30717159",
    description: "Revisão Cirúrgica De Prótese De Ombro",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30717167",
    description: "Transferências Musculares Ao Nível Do Ombro - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30718015",
    description: "Amputação Ao Nível Do Braço - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30718023",
    description: "Biópsia Cirúrgica Do Úmero",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30718031",
    description: "Fixador Externo Dinâmico Com Ou Sem Alongamento - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30718040",
    description: "Fratura (Incluindo Descolamento Epifisário) - Redução Incruenta",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30718058",
    description: "Fratura (Incluindo Descolamento Epifisário) - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30718066",
    description: "Fratura De Úmero - Tratamento Conservador",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "30718074",
    description: "Fraturas E Pseudartroses - Fixador Externo - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30718082",
    description: "Osteomielite De Úmero - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30718090",
    description: "Pseudartroses, Osteotomias, Alongamentos/Encurtamentos - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30718104",
    description: "Osteomielite De Úmero - Tratamento Incruento",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "30719011",
    description: "Artrodese - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30719020",
    description: "Artroplastia Com Implante - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30719038",
    description: "Artroplastias Sem Implante - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30719046",
    description: "Artrotomia De Cotovelo - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30719054",
    description: "Biópsia Cirúrgica De Cotovelo",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30719062",
    description: "Desarticulação Ao Nível Do Cotovelo - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30719070",
    description: "Fratura De Cotovelo - Tratamento Conservador",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "30719089",
    description: "Fraturas / Pseudartroses / Artroses / Com Fixador Externo Dinâmico - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30719097",
    description: "Fraturas E Ou Luxações - Redução Incruenta",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30719100",
    description: "Fraturas E Ou Luxações - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30719119",
    description: "Lesões Ligamentares - Redução Incruenta",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30719127",
    description: "Tendinites, Sinovites E Artrites - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30719135",
    description: "Artrodiastase - Tratamento Cirúrgico Com Fixador Externo",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30720010",
    description: "Abaixamento Miotendinoso No Antebraço",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30720028",
    description: "Alongamento Dos Ossos Do Antebraço Com Fixador Externo Dinâmico - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30720036",
    description: "Amputação Ao Nível Do Antebraço - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30720044",
    description: "Biópsia Cirúrgica Do Antebraço",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30720052",
    description: "Contratura Isquêmica De Volkmann - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30720060",
    description: "Correção De Deformidade Adquirida De Antebraço Com Fixador Externo",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30720079",
    description: "Encurtamento Segmentar Dos Ossos Do Antebraço Com Osteossíntese - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30720087",
    description: "Fratura Do Antebraço - Tratamento Conservador",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "30720095",
    description: "Fratura E/Ou Luxações (Incluindo Descolamento Epifisário Cotovelo-Punho) - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30720109",
    description: "Fratura E/Ou Luxações (Incluindo Descolamento Epifisário) - Redução Incruenta",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30720117",
    description: "Fratura Viciosamente Consolidada De Antebraço - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30720125",
    description: "Osteomielite Dos Ossos Do Antebraço - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30720133",
    description: "Pseudartroses E Ou Osteotomias - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30720141",
    description: "Ressecção Da Cabeça Do Rádio E/ Ou Da Extremidade Distal Ulna - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30720150",
    description: "Ressecção Do Processo Estilóide Do Rádio - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30720168",
    description: "Sinostose Rádio-Ulnar - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30720176",
    description: "Tratamento Cirúrgico De Fraturas Com Fixador Externo - Antebraço",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30721016",
    description: "Agenesia De Rádio (Centralização Da Ulna No Carpo)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30721024",
    description: "Alongamento Do Rádio/Ulna - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30721032",
    description: "Artrodese Entre Os Ossos Do Carpo",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30721040",
    description: "Artrodese - Fixador Externo",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30721059",
    description: "Artrodese Rádio-Cárpica Ou Do Punho",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30721067",
    description: "Artroplastia Do Punho (Com Implante) - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30721075",
    description: "Artroplastia Para Ossos Do Carpo (Com Implante) - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30721083",
    description: "Artrotomia - Tratamento Cirúrgico - Punho",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30721091",
    description: "Biópsia Cirúrgica De Punho",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30721105",
    description: "Coto De Amputação Punho E Antebraço - Revisão",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30721113",
    description: "Desarticulação Do Punho - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30721121",
    description: "Encurtamento Rádio/Ulnar",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30721130",
    description: "Fratura De Punho - Tratamento Conservador",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "30721148",
    description: "Fratura De Osso Do Carpo - Redução Cirúrgica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30721156",
    description: "Fratura Do Carpo - Redução Incruenta",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30721164",
    description: "Fraturas - Fixador Externo",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30721172",
    description: "Fraturas Do Carpo - Tratamento Conservador",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "30721180",
    description: "Fraturas E/Ou Luxações Do Punho - Redução Incruenta",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30721199",
    description: "Fraturas E/Ou Luxações Do Punho - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30721202",
    description: "Luxação Do Carpo - Redução Incruenta",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30721210",
    description: "Pseudartroses - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30721229",
    description: "Ressecção De Osso Do Carpo - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30721237",
    description: "Reparação Ligamentar Do Carpo",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30721245",
    description: "Sinovectomia De Punho - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30721253",
    description: "Transposição Do Rádio Para Ulna",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30722012",
    description: "Abscesso De Mão E Dedos - Tenossinovites / Espaços Palmares / Dorsais E Comissurais - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30722039",
    description: "Abscessos De Dedo (Drenagem) - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30722047",
    description: "Alongamento/Transporte Ósseo Com Fixador Externo",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30722055",
    description: "Alongamentos Tendinosos De Mão",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30722063",
    description: "Amputação Ao Nível Dos Metacarpianos - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30722071",
    description: "Amputação De Dedo (Cada) - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30722080",
    description: "Amputação Transmetacarpiana",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30722098",
    description: "Amputação Transmetacarpiana Com Transposição De Dedo",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30722101",
    description: "Aponevrose Palmar (Ressecção) - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30722110",
    description: "Artrodese Interfalangeana / Metacarpofalangeana -  Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30722128",
    description: "Artroplastia Com Implante Na Mão (Mf E If) Múltipla",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30722136",
    description: "Artroplastia Com Implante Na Mão (Mf Ou If)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30722144",
    description: "Artroplastia Interfalangeana / Metacarpofalangeana - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30722152",
    description: "Artrotomia Ao Nível Da Mão -  Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30722160",
    description: "Biópsia Cirúrgica Dos Ossos Da Mão",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30722179",
    description: "Bridas Congênitas - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30722209",
    description: "Capsulectomias Múltiplas Mf Ou If",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30722217",
    description: "Capsulectomias Única Mf E If",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30722225",
    description: "Centralização Da Ulna (Tratamento Da Mão Torta Radial)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30722233",
    description: "Contratura Isquêmica De Mão - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30722241",
    description: "Coto De Amputação Digital - Revisão",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30722250",
    description: "Dedo Colo De Cisne - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30722268",
    description: "Dedo Em Botoeira - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30722276",
    description: "Dedo Em Gatilho, Capsulotomia / Fasciotomia - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30722284",
    description: "Dedo Em Martelo - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30722292",
    description: "Dedo Em Martelo - Tratamento Conservador",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "30722306",
    description: "Enxerto Ósseo (Perda De Substância) - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30722314",
    description: "Exploração Cirúrgica De Tendão De Mão",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30722322",
    description: "Falangização",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30722330",
    description: "Fixador Externo Em Cirurgia Da Mão",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30722349",
    description: "Fratura De Falanges - Tratamento Conservador",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "30722357",
    description: "Fratura De Bennett - Redução Incruenta",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30722365",
    description: "Fratura De Bennett - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30722373",
    description: "Fratura De Osso Da Mão - Tratamento Conservador",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "30722381",
    description: "Fratura De Metacarpiano - Tratamento Conservador",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "30722390",
    description: "Fratura/Artrodese Com Fixador Externo",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30722403",
    description: "Fraturas De Falanges Ou Metacarpianos - Redução Incruenta",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30722411",
    description: "Fraturas De Falanges Ou Metacarpianos - Tratamento Cirúrgico Com Fixação",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30722420",
    description: "Fraturas E/Ou Luxações De Falanges (Interfalangeanas) - Redução Incruenta",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30722438",
    description: "Fraturas E/Ou Luxações De Falanges (Interfalangeanas) - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30722446",
    description: "Fraturas E/Ou Luxações De Metacarpianos - Redução Incruenta",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30722454",
    description: "Gigantismo Ao Nível Da Mão - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30722462",
    description: "Lesões Ligamentares Agudas Da Mão - Reparação Cirúrgica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30722470",
    description: "Lesões Ligamentares Crônicas Da Mão - Reparação Cirúrgica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30722489",
    description: "Ligamentoplastia Com Âncora",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30722497",
    description: "Luxação Metacarpofalangeana - Redução Incruenta",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30722500",
    description: "Luxação Metacarpofalangeana - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30722519",
    description: "Osteomielite Ao Nível Da Mão - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30722527",
    description: "Osteossíntese De Fratura De Falange E Metacarpeana Com Fixação Externa",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30722535",
    description: "Osteossíntese De Fratura De Falange E Metacarpeana Com Uso De Miniparafuso",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30722543",
    description: "Perda De Substância Da Mão (Reparação) - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30722551",
    description: "Plástica Ungueal",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30722560",
    description: "Policização Ou Transferência Digital",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30722578",
    description: "Polidactilia Articulada - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30722586",
    description: "Polidactilia Não Articulada - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30722594",
    description: "Prótese (Implante) Para Ossos Do Carpo",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30722608",
    description: "Pseudartrose Com Perda De Substâncias De Metacarpiano E Falanges",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30722616",
    description: "Pseudartrose Do Escafóide - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30722624",
    description: "Pseudartrose Dos Ossos Da Mão - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30722632",
    description: "Reconstrução Da Falange Com Retalho Homodigital",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30722640",
    description: "Reconstrução De Leito Ungueal",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30722659",
    description: "Reconstrução Do Polegar Com Retalho Ilhado Osteocutâneo Antebraquial",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30722667",
    description: "Reimplante De Dois Dedos Da Mão",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30722675",
    description: "Reimplante Do Membro Superior Nível Transmetacarpiano Até O Terço Distal Do Antebraço",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30722683",
    description: "Reimplante Do Polegar",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30722691",
    description: "Reparações Cutâneas Com Retalho Ilhado Antebraquial Invertido",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30722705",
    description: "Ressecção 1ª Fileira Dos Ossos Do Carpo",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30722713",
    description: "Ressecção De Cisto Sinovial",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30722721",
    description: "Retração Cicatricial De Mais De Um Dedo, Sem Comprometimento Tendinoso - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30722730",
    description: "Retração Cicatricial De Um Dedo Sem Comprometimento Tendinoso - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30722748",
    description: "Retração Cicatricial Dos Dedos Com Lesão Tendínea - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30722756",
    description: "Revascularização  Do  Polegar  Ou  Outro  Dedo",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30722764",
    description: "Roturas Do Aparelho Extensor De Dedo - Redução Incruenta",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30722772",
    description: "Roturas Tendino-Ligamentares Da Mão (Mais Que 1) - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30722780",
    description: "Sequestrectomias",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30722799",
    description: "Sindactilia De 2 Dígitos - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30722802",
    description: "Sindactilia Múltipla - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30722810",
    description: "Sinovectomia Da Mão (1 Articulação)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30722829",
    description: "Sinovectomia Da Mão (Múltiplas)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30722845",
    description: "Transposição De Dedo - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30722853",
    description: "Tratamento Cirúrgico Da Polidactilia Múltipla E/Ou Complexa",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30722861",
    description: "Tratamento Cirúrgico Da Sindactilia Múltipla Com Emprego De Expansor - Por Estágio",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30722870",
    description: "Tratamento Da Doença De Kiembuck Com Transplante Vascularizado",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30722888",
    description: "Tratamento Da Pseudoartrose Do Escafóide Com Transplante Ósseo Vascularizado E Fixação Com Micro Parafuso",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30722900",
    description: "Roturas Do Aparelho Extensor De Dedo - Tratamento Conservador",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "30723019",
    description: "Biópsia Cirúrgica De Cintura Pélvica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30723027",
    description: "Desarticulação Interílio Abdominal - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30723035",
    description: "Fratura Da Cintura Pélvica - Tratamento Conservador",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "30723043",
    description: "Fratura/Luxação Com Fixador Externo - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30723051",
    description: "Fraturas E/Ou Luxações Do Anel Pélvico (Com Uma Ou Mais Abordagens) - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30723060",
    description: "Fraturas E/Ou Luxações Do Anel Pélvico - Redução Incruenta",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30723078",
    description: "Osteomielite  Ao Nível Da Pelve - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30723086",
    description: "Osteotomias / Artrodeses - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30723116",
    description: "Fratura Ou Disjunção Ao Nível Da Pelve - Tratamento Conservador Com Gesso",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "30723124",
    description: "Fratura Ou Disjunção Ao Nível Da Pelve - Tratamento Conservador Sem Gesso",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "30724015",
    description: "Artrite Séptica  - Tratamento Cirúrgico - Articulação Coxo-Femoral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30724023",
    description: "Artrodese / Fratura De Acetábulo (Ligamentotaxia) Com Fixador Externo",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30724031",
    description: "Artrodese Coxo-Femoral Em Geral - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30724040",
    description: "Artrodiastase De Quadril",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30724058",
    description: "Artroplastia (Qualquer Técnica Ou Versão De Quadril) - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30724066",
    description: "Artroplastia De Quadril Infectada (Retirada Dos Componentes) - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30724074",
    description: "Artroplastia De Ressecção Do Quadril (Girdlestone) - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30724082",
    description: "Artroplastia Parcial Do Quadril (Tipo Thompson Ou Qualquer Técnica) - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30724090",
    description: "Artrotomia De Quadril Infectada (Incisão E Drenagem De Artrite Séptica) Sem Retirada De Componente - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30724104",
    description: "Artrotomia Coxo-Femoral - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30724112",
    description: "Biópsia Cirúrgica Coxo-Femoral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30724120",
    description: "Desarticulação Coxo-Femoral - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30724139",
    description: "Epifisiodese Com Abaixamento Do Grande Trocanter - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30724147",
    description: "Epifisiolistese Proximal De Fêmur (Fixação In Situ) - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30724155",
    description: "Fratura De Acetábulo (Com Uma Ou Mais Abordagens) - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30724163",
    description: "Fratura De Acetábulo - Redução Incruenta",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30724171",
    description: "Fratura E/Ou Luxação E/Ou Avulsão Coxo-Femoral - Redução Incruenta",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30724180",
    description: "Fratura E/Ou Luxação E/Ou Avulsão Coxo-Femoral - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30724198",
    description: "Luxação Congênita De Quadril (Redução Cirúrgica E Osteotomia) - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30724201",
    description: "Luxação Congênita De Quadril (Redução Cirúrgica Simples) - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30724210",
    description: "Luxação Congênita De Quadril (Redução Incruenta Com Ou Sem Tenotomia De Adutores)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30724228",
    description: "Osteotomia - Fixador Externo",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30724236",
    description: "Osteotomias  Ao  Nível  Do  Colo Ou  Região Trocanteriana (Sugioka, Martin, Bombelli Etc) - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30724244",
    description: "Osteotomias Supra-Acetabulares (Chiari, Pemberton, Dial, Etc) - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30724252",
    description: "Punção-Biópsia Coxo-Femoral-Artrocentese",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30724260",
    description: "Reconstrução De Quadril Com Fixador Externo",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30724279",
    description: "Revisão De Artroplastias De Quadril Com Retirada De Componentes E Implante De Prótese",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "7"
  },
  {
    code: "30724287",
    description: "Tratamento  De Necrose  Avascular  Por Foragem De Estaqueamento Associada À Necrose Microcirúrgica  Da Cabeça Femoral - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30725011",
    description: "Alongamento / Transporte Ósseo / Pseudoartrose Com Fixador Externo - Coxa/Fêmur",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30725020",
    description: "Alongamento De Fêmur - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30725038",
    description: "Amputação Ao Nível Da Coxa - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30725046",
    description: "Biópsia Cirúrgica De Fêmur",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30725054",
    description: "Correção De Deformidade Adquirida De Fêmur Com Fixador Externo",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30725062",
    description: "Descolamento Epifisário (Traumático Ou Não) - Redução Incruenta",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30725070",
    description: "Descolamento Epifisário (Traumático Ou Não) - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30725089",
    description: "Encurtamento De Fêmur - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30725097",
    description: "Epifisiodese (Por Segmento) - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30725100",
    description: "Fratura De Fêmur - Tratamento Conservador Com Gesso",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "30725119",
    description: "Fraturas De Fêmur - Redução Incruenta",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30725127",
    description: "Fraturas De Fêmur - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30725135",
    description: "Fraturas,  Pseudartroses,  Correção  De  Deformidades E  Alongamentos Com Fixador Externo Dinâmico - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30725143",
    description: "Osteomielite De Fêmur - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30725151",
    description: "Pseudartroses E/Ou Osteotomias - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30725160",
    description: "Tratamento Cirúrgico De Fraturas Com Fixador Externo - Coxa/Fêmur",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30725186",
    description: "Femur - descolamento epifisário dae extremidades superior - tratamento conservador sem gesso",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30725208",
    description: "Necrose asséptica da cabeça femoral - tratamento conservador",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30726018",
    description: "Artrite Séptica - Tratamento Cirúrgico - Joelho",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30726026",
    description: "Artrodese De Joelho - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30726034",
    description: "Artroplastia Total De Joelho Com Implantes - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30726042",
    description: "Artrotomia - Tratamento Cirúrgico - Joelho",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30726050",
    description: "Biópsia Cirúrgica De Joelho",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30726069",
    description: "Desarticulação De Joelho - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30726077",
    description: "Epifisites E Tendinites - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30726085",
    description: "Fratura De Joelho - Tratamento Conservador",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "30726093",
    description: "Fratura E/Ou Luxação De Patela (Inclusive Osteocondral) - Redução Incruenta",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30726107",
    description: "Fratura E/Ou Luxação De Patela - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30726115",
    description: "Fraturas E/Ou Luxações Ao Nível Do Joelho - Redução Incruenta",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30726123",
    description: "Fraturas E/Ou Luxações Ao Nível Do Joelho - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30726131",
    description: "Lesão Aguda De Ligamento Colateral, Associada A Ligamento Cruzado E Menisco - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30726140",
    description: "Lesões Agudas E/Ou Luxações De Meniscos (1 Ou Ambos) - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30726158",
    description: "Lesões Complexas De Joelho (Fratura Com Lesão Ligamentar E Meniscal) - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30726166",
    description: "Lesões Intrínsecas  De  Joelho  (Lesões  Condrais,  Osteocondrite Dissecante, Plica Patológica, Corpos Livres, Artrofitose) - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30726174",
    description: "Lesões Ligamentares Agudas - Tratamento Incruento",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30726182",
    description: "Lesões Ligamentares Agudas - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30726190",
    description: "Lesões Ligamentares Periféricas Crônicas - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30726204",
    description: "Liberação Lateral E Facectomias - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30726212",
    description: "Meniscorrafia - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30726220",
    description: "Osteotomias Ao Nível Do Joelho - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30726239",
    description: "Realinhamentos Do Aparelho Extensor - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30726247",
    description: "Reconstruções Ligamentares Do Pivot Central - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30726255",
    description: "Revisões De Artroplastia Total - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30726263",
    description: "Revisões De Realinhamentos Do Aparelho Extensor - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30726271",
    description: "Revisões De Reconstruções Intra-Articulares - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30726280",
    description: "Toalete Cirúrgica - Correção De Joelho Flexo - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30726298",
    description: "Transplantes Homólogos Ao Nível Do Joelho - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30726301",
    description: "Tratamento Cirúrgico De Luxações / Artrodese / Contraturas Com Fixador Externo",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30727014",
    description: "Alongamento / Transporte Ósseo / Pseudoartrose Com Fixador Externo - Perna",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30727022",
    description: "Alongamento Com Fixador Dinâmico - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30727030",
    description: "Alongamento Dos Ossos Da Perna - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30727049",
    description: "Amputação De Perna - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30727057",
    description: "Biópsia Cirúrgica De Tíbia Ou Fíbula",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30727065",
    description: "Correção De Deformidade Adquirida De Tíbia Com Fixador Externo",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30727073",
    description: "Correção De Deformidades Congênitas Na Perna Com Fixador Externo",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30727081",
    description: "Encurtamento Dos Ossos Da Perna - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30727090",
    description: "Epifisiodese De Tíbia/Fíbula - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30727103",
    description: "Fratura De Osso Da Perna - Tratamento Conservador",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "30727111",
    description: "Fraturas De Fíbula (Inclui O Descolamento Epifisário) - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30727120",
    description: "Fraturas De Fíbula (Inclui Descolamento Epifisário) - Redução Incruenta",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30727138",
    description: "Fraturas De Tíbia Associada Ou Não A Fíbula (Inclui Descolamento Epifisário) - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30727146",
    description: "Fraturas De Tíbia E Fíbula (Inclui Descolamento Epifisário) - Redução Incruenta",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30727154",
    description: "Osteomielite Dos Ossos Da Perna - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30727162",
    description: "Osteotomias E/Ou Pseudartroses - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30727170",
    description: "Transposição De Fíbula/Tíbia - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30727189",
    description: "Tratamento Cirúrgico De Fraturas De Tíbia Com Fixador Externo",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30728010",
    description: "Amputação Ao Nível Do Tornozelo - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30728029",
    description: "Artrite Ou Osteoartrite - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30728037",
    description: "Artrodese (Com Ou Sem Alongamento Simultâneo) Com Fixador Externo",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30728045",
    description: "Artrodese Ao Nível Do Tornozelo - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30728053",
    description: "Artroplastia De Tornozelo (Com Implante) - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30728061",
    description: "Artrorrise Do Tornozelo - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30728070",
    description: "Artrotomia De Tornozelo - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30728088",
    description: "Biópsia Cirúrgica Do Tornozelo",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30728096",
    description: "Fratura De Tornozelo - Tratamento Conservador",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "30728100",
    description: "Fraturas / Pseudartroses / Artroses Ao Nível Do Tornozelo Com Fixador Externo Dinâmico - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30728118",
    description: "Fraturas E/Ou Luxações Ao Nível Do Tornozelo - Redução Incruenta",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30728126",
    description: "Fraturas E/Ou Luxações Ao Nível Do Tornozelo - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30728134",
    description: "Lesões Ligamentares Agudas Ao Nível Do Tornozelo - Tratamento Incruento",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30728142",
    description: "Lesões Ligamentares Agudas Ao Nível Do Tornozelo - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30728150",
    description: "Lesões Ligamentares Crônicas Ao Nível Do Tornozelo - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30728169",
    description: "Osteocondrite De Tornozelo - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30728177",
    description: "Pseudartroses Ou Osteotomias Ao Nível Do Tornozelo - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30729017",
    description: "Amputação Ao Nível Do Pé - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30729025",
    description: "Amputação/Desarticulação De Pododáctilos (Por Segmento) - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30729033",
    description: "Artrite Ou Osteoartrite Dos Ossos Do Pé (Inclui Osteomielite) - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30729041",
    description: "Artrodese De Tarso E/Ou Médio Pé - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30729050",
    description: "Artrodese Metatarso - Falângica Ou Interfalângica - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30729068",
    description: "Biópsia Cirúrgica Dos Ossos Do Pé",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30729084",
    description: "Correção De Deformidades Do Pé Com Fixador Externo Dinâmico - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30729092",
    description: "Correção De Pé Torto Congênito Com Fixador Externo",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30729106",
    description: "Deformidade Dos Dedos - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30729114",
    description: "Exérese Ungueal",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30729122",
    description: "Fasciotomia Ou Ressecção De Fascia Plantar - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30729130",
    description: "Fratura De Osso Do Pé - Tratamento Conservador",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "30729149",
    description: "Fratura E/Ou Luxações Do Pé (Exceto Antepé) - Redução Incruenta",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30729157",
    description: "Fratura E/Ou Luxações Do Pé (Exceto Antepé) - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30729165",
    description: "Fraturas E/Ou Luxações Do Antepé - Redução Incruenta",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30729173",
    description: "Fraturas E/Ou Luxações Do Antepé - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30729181",
    description: "Hallux Valgus (Um Pé) - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30729190",
    description: "Osteotomia Ou Pseudartrose Do Tarso E Médio Pé - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30729203",
    description: "Osteotomia Ou Pseudartrose Dos Metatarsos/Falanges - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30729211",
    description: "Osteotomias / Fraturas Com Fixador Externo",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30729220",
    description: "Pé Plano/Pé Cavo/Coalisão Tarsal - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30729238",
    description: "Pé Torto Congênito (Um Pé) - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30729246",
    description: "Ressecção De Osso Do Pé - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30729254",
    description: "Retração Cicatricial Dos Dedos",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30729262",
    description: "Rotura Do Tendão De Aquiles - Tratamento Incruento",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30729270",
    description: "Rotura Do Tendão De Aquiles - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30729289",
    description: "Tratamento Cirúrgico Da Sindactilia Complexa E /Ou Múltipla",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30729297",
    description: "Tratamento Cirúrgico Da Sindactilia Simples",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30729300",
    description: "Tratamento Cirúrgico De Gigantismo",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30729319",
    description: "Tratamento Cirúrgico De Linfedema Ao Nível Do Pé",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30729327",
    description: "Tratamento Cirúrgico De Polidactilia Múltipla E/Ou Complexa",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30729335",
    description: "Tratamento Cirúrgico De Polidactilia Simples",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30729343",
    description: "Tratamento Cirúrgico Do Mal Perfurante Plantar",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30730015",
    description: "Alongamento",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30730023",
    description: "Biópsia De Músculo",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30730031",
    description: "Desbridamento Cirúrgico De Feridas Ou Extremidades",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30730040",
    description: "Desinserção Ou Miotomia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30730058",
    description: "Dissecção Muscular",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30730066",
    description: "Drenagem Cirúrgica Do Psoas",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30730074",
    description: "Fasciotomia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30730082",
    description: "Fasciotomia - Por Compartimento",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30730090",
    description: "Fasciotomias (Descompressivas)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30730104",
    description: "Fasciotomias Acima Do Punho",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30730112",
    description: "Miorrafias",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30730120",
    description: "Terapia Por Ondas De Choque Extracorpórea Em Partes Moles - Acompanhamento 1ª Aplicação",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "30730139",
    description: "Terapia Por Ondas De Choque Extracorpórea Em Partes Moles - Acompanhamento Reaplicações",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "30730155",
    description: "Transposição Muscular",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30730163",
    description: "Lesão Ligamentar Aguda - Tratamento Conservador",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "30731011",
    description: "Abertura De Bainha Tendinosa - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30731020",
    description: "Biópsias Cirúrgicas De Tendões, Bursas E Sinóvias",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30731038",
    description: "Bursectomia - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30731046",
    description: "Cisto Sinovial - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30731054",
    description: "Encurtamento De Tendão - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30731062",
    description: "Sinovectomia - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30731070",
    description: "Tenoartroplastia Para Ossos Do Carpo",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30731089",
    description: "Tenodese",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30731097",
    description: "Tenólise No Túnel Osteofibroso",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30731100",
    description: "Tenólise/Tendonese - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30731119",
    description: "Tenoplastia / Enxerto De Tendão - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30731127",
    description: "Tenoplastia De Tendão Em Outras Regiões",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30731135",
    description: "Tenorrafia Múltipla Em Outras Regiões",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30731143",
    description: "Tenorrafia No Túnel Osteofibroso - Mais De 2 Dígitos",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30731151",
    description: "Tenorrafia No Túnel Osteofibroso Até 2 Dígitos",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30731160",
    description: "Tenorrafia Única Em Outras Regiões",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30731178",
    description: "Tenossinovectomia De Mão Ou Punho",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30731186",
    description: "Tenossinovites Estenosantes - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30731194",
    description: "Tenossinovites Infecciosas - Drenagem",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30731208",
    description: "Tenotomia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30731216",
    description: "Transposição De Mais De 1 Tendão - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30731224",
    description: "Transposição Única De Tendão",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30731232",
    description: "Tumores De Tendão Ou Sinovial - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30731240",
    description: "Alongamento De Tendões - Tratamento Cruento",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30731259",
    description: "Rotura de tendão de aquiles - tratamento conservador",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30732018",
    description: "Curetagem Ou Ressecção Em Bloco De Tumor Com Reconstrução E Enxerto Vascularizado",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30732026",
    description: "Enxerto Ósseo",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30732034",
    description: "Ressecção Da Lesão Com Cimentação E Osteosíntese",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30732042",
    description: "Revisão de endoprótese",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "30732050",
    description: "Terapia Por Ondas De Choque Extracorpórea Em Partes Ósseas - Acompanhamento 1ª Aplicação",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "30732069",
    description: "Terapia Por Ondas De Choque Extracorpórea Em Partes Ósseas - Acompanhamento Reaplicações",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "30732085",
    description: "Tumor Ósseo (Ressecção Com Substituição)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30732093",
    description: "Tumor Ósseo (Ressecção E Artrodese)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30732107",
    description: "Tumor Ósseo (Ressecção E Cimento)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30732115",
    description: "Tumor Ósseo (Ressecção E Enxerto)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30732123",
    description: "Tumor Ósseo (Ressecção Segmentar)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30732131",
    description: "Tumor Ósseo (Ressecção Simples)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30733014",
    description: "Sinovectomia Total  - Procedimento Videoartroscópico De Joelho",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30733022",
    description: "Sinovectomia Parcial Ou Subtotal - Procedimento Videoartroscópico De Joelho",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30733030",
    description: "Condroplastia (Com Remoção De Corpos Livres) - Procedimento Videoartroscópico De Joelho",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30733049",
    description: "Osteocondroplastia - Estabilização, Ressecção E/Ou Plastia #  - Procedimento Videoartroscópico De Joelho",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30733057",
    description: "Meniscectomia - Um Menisco - Procedimento Videoartroscópico De Joelho",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30733065",
    description: "Reparo Ou Sutura De Um Menisco - Procedimento Videoartroscópico De Joelho",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30733073",
    description: "Reconstrução, Retencionamento Ou Reforço Do Ligamento Cruzado Anterior Ou Posterior #  - Procedimento Videoartroscópico De Joelho",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30733081",
    description: "Fratura Com Redução E/Ou Estabilização Da Superfície Articular - Um Compartimento #  - Procedimento Videoartroscópico De Joelho",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30733090",
    description: "Tratamento Cirúrgico Da Artrofibrose #  - Procedimento Videoartroscópico De Joelho",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30733103",
    description: "Instabilidade Femoro-Patelar, Release Lateral Da Patela, Retencionamento, Reforço Ou Reconstrução Do Ligamento Patelo-Femoral Medial #  - Procedimento Videoartroscópico De Joelho",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30734010",
    description: "Sinovectomia Total - Procedimento Videoartroscópico De Tornozelo",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30734029",
    description: "Sinovectomia Parcial Ou Subtotal - Procedimento Videoartroscópico De Tornozelo",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30734037",
    description: "Condroplastia (Com Remoção De Corpos Livres) - Procedimento Videoartroscópico De Tornozelo",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30734045",
    description: "Osteocondroplastia - Estabilização, Ressecção E Ou Plastia (Enxertia) # - Procedimento Videoartroscópico De Tornozelo",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30734053",
    description: "Reconstrução, Retencionamento Ou Reforço De Ligamento - Procedimento Videoartroscópico De Tornozelo",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30734061",
    description: "Fraturas - Redução E Estabilização De Cada Superfície - Procedimento Videoartroscópico De Tornozelo",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30735017",
    description: "Sinovectomia Total - Procedimento Videoartroscópico De Ombro",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30735025",
    description: "Sinovectomia Parcial Ou Subtotal  - Procedimento Videoartroscópico De Ombro",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30735033",
    description: "Acromioplastia - Procedimento Videoartroscópico De Ombro",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30735041",
    description: "Lesão Labral - Procedimento Videoartroscópico De Ombro",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30735050",
    description: "Luxação Gleno-Umeral - Procedimento Videoartroscópico De Ombro",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30735068",
    description: "Ruptura Do Manguito Rotador - Procedimento Videoartroscópico De Ombro",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30735076",
    description: "Instabilidade Multidirecional - Procedimento Videoartroscópico De Ombro",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30735084",
    description: "Ressecção Lateral Da Clavícula - Procedimento Videoartroscópico De Ombro",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30735092",
    description: "Tenotomia Da Porção Longa Do Bíceps - Procedimento Videoartroscópico De Ombro",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30736013",
    description: "Sinovectomia  Total - Procedimento Videoartroscópico De Cotovelo",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30736021",
    description: "Sinovectomia Parcial Ou Subtotal - Procedimento Videoartroscópico De Cotovelo",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30736030",
    description: "Condroplastia (Com Remoção De Corpos Livres) - Procedimento Videoartroscópico De Cotovelo",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30736048",
    description: "Osteocondroplastia - Estabilização, Ressecção E/Ou Plastia (Enxertia) # - Procedimento Videoartroscópico De Cotovelo",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30736056",
    description: "Reconstrução, Retencionamento Ou Reforço De Ligamento #  - Procedimento Videoartroscópico De Cotovelo",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30736064",
    description: "Fraturas: Redução E Estabilização Para Cada Superfície - Procedimento Videoartroscópico De Cotovelo",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30737010",
    description: "Sinovectomia Total - Procedimento Videoartroscópico De Punho E Túnel Do Carpo",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30737028",
    description: "Sinovectomia Parcial Ou Subtotal  - Procedimento Videoartroscópico De Punho E Túnel Do Carpo",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30737036",
    description: "Condroplastia (Com Remoção De Corpos Livres) - Procedimento Videoartroscópico De Punho E Túnel Do Carpo",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30737044",
    description: "Osteocondroplastia - Estabilização, Ressecção E/Ou Plastia (Enxertia) - Procedimento Videoartroscópico De Punho E Túnel Do Carpo",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30737052",
    description: "Reconstrução, Retencionamento Ou Reforço De Ligamento Ou Reparo De Cartilagem Triangular # - Procedimento Videoartroscópico De Punho E Túnel Do Carpo",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30737060",
    description: "Fraturas - Redução E Estabilização De Cada Superfície - Procedimento Videoartroscópico De Punho E Túnel Do Carpo",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30737079",
    description: "Túnel Do Carpo - Descompressão - Procedimento Videoartroscópico De Punho E Túnel Do Carpo",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30738016",
    description: "Sinovectomia Total - Procedimento Videoartroscópico De Coxofemoral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30738024",
    description: "Sinovectomia Parcial E/Ou Remoção De Corpos Livres - Procedimento Videoartroscópico De Coxofemoral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30738032",
    description: "Desbridamento Do Labrum Ou Ligamento Redondo Com Ou Sem Condroplastia - Procedimento Videoartroscópico De Coxofemoral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30738040",
    description: "Tratamento Do Impacto Femoro-Acetabular - Procedimento Videoartroscópico De Coxofemoral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "7"
  },
  {
    code: "30738059",
    description: "Condroplastia Com Sutura Labral - Procedimento Videoartroscópico De Coxofemoral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30801010",
    description: "Colocação De Órtese Traqueal, Traqueobrônquica Ou Brônquica, Por Via Endoscópica (Tubo De Silicone Ou Metálico)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30801028",
    description: "Colocação De Prótese Traqueal Ou Traqueobrônquica (Qualquer Via)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30801036",
    description: "Fechamento De Fístula Tráqueo-Cutânea",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30801044",
    description: "Punção Traqueal",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30801052",
    description: "Ressecção Carinal (Traqueobrônquica)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30801060",
    description: "Ressecção De Tumor Traqueal",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30801079",
    description: "Traqueoplastia (Qualquer Via)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30801087",
    description: "Traqueorrafia (Qualquer Via)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30801109",
    description: "Traqueostomia Com Colocação De Órtese Traqueal Ou Traqueobrônquica Por Via Cervical",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30801117",
    description: "Traqueostomia Mediastinal",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30801133",
    description: "Plastia De Traqueostoma",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30801141",
    description: "Traqueotomia Ou Fechamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30801150",
    description: "Troca De Prótese Tráqueo-Esofágica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30801168",
    description: "Ressecção De Tumor Traqueal Por Videotoracoscopia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30801176",
    description: "Traqueorrafia Por Videotoracoscopia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30801184",
    description: "Traqueostomia com retirada de corpo estranho",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30802016",
    description: "Broncoplastia E/Ou Arterioplastia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30802024",
    description: "Broncotomia E/Ou Broncorrafia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30802032",
    description: "Colocação De Molde Brônquico Por Toracotomia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30802040",
    description: "Broncoplastia E/Ou Arterioplastia Por Videotoracoscopia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30802059",
    description: "Broncotomia E/Ou Broncorrafia Por Videotoracoscopia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30803012",
    description: "Bulectomia Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30803020",
    description: "Cirurgia Redutora Do Volume Pulmonar Unilateral (Qualquer Técnica)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "7"
  },
  {
    code: "30803039",
    description: "Cisto Pulmonar Congênito - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30803047",
    description: "Correção De Fístula Bronco-Pleural (Qualquer Técnica)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30803055",
    description: "Drenagem Tubular Aberta De Cavidade Pulmonar",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30803063",
    description: "Embolectomia Pulmonar",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30803071",
    description: "Lobectomia Por Malformação Pulmonar",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30803080",
    description: "Lobectomia Pulmonar",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30803098",
    description: "Metastasectomia Pulmonar Unilateral (Qualquer Técnica)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30803101",
    description: "Pneumonectomia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30803110",
    description: "Pneumonectomia De Totalização",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30803128",
    description: "Pneumorrafia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30803136",
    description: "Pneumostomia (Cavernostomia) Com Costectomia E Estoma Cutâneo-Cavitário",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30803144",
    description: "Posicionamento De Agulhas Radiativas Por Toracotomia (Braquiterapia)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30803152",
    description: "Segmentectomia (Qualquer Técnica)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30803160",
    description: "Tromboendarterectomia Pulmonar",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30803179",
    description: "Bulectomia Unilateral Por Videotoracoscopia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30803187",
    description: "Cirurgia Redutora Do Volume Pulmonar Unilateral  Por Videotoracoscopia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "7"
  },
  {
    code: "30803195",
    description: "Correção De Fístula Bronco-Pleural Por Videotoracoscopia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30803209",
    description: "Drenagem Tubular Aberta De Cavidade Pulmonar Por Videotoracoscopia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30803217",
    description: "Lobectomia Pulmonar Por Videotoracoscopia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30803225",
    description: "Metastasectomia Pulmonar Unilateral Por Videotoracoscopia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30803233",
    description: "Segmentectomia Por Videotoracoscopia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30803241",
    description: "Biópsia Transcutânea De Pulmão Por Agulha",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30804019",
    description: "Biópsia Percutânea De Pleura Por Agulha",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30804027",
    description: "Descorticação Pulmonar",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30804035",
    description: "Pleurectomia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30804043",
    description: "Pleurodese (Qualquer Técnica)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30804051",
    description: "Pleuroscopia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30804060",
    description: "Pleurostomia (Aberta)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30804086",
    description: "Punção Pleural",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30804094",
    description: "Repleção De Cavidade Pleural Com Solução De Antibiótico Para Tratamento De Empiema",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30804108",
    description: "Ressecção De Tumor Da Pleura Localizado",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30804116",
    description: "Retirada De Dreno Tubular Torácico (Colocado Em Outro Serviço)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30804124",
    description: "Tenda Pleural",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30804132",
    description: "Toracostomia Com Drenagem Pleural Fechada",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30804140",
    description: "Tratamento Operatório Da Hemorragia Intrapleural",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30804159",
    description: "Descorticação Pulmonar Por Videotoracoscopia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30804167",
    description: "Pleurectomia Por Videotoracoscopia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30804175",
    description: "Pleurodese Por Video",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30804183",
    description: "Pleuroscopia Por Vídeo",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30804191",
    description: "Ressecção De Tumor Da Pleura Localizado Por Vídeo",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30804205",
    description: "Tenda Pleural Por Vídeo",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30804213",
    description: "Tratamento Operatório Da Hemorragia Intrapleural Por  Vídeo",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30805015",
    description: "Ressecção De Bócio Intratorácico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30805023",
    description: "Biópsia De Linfonodos Pré-Escalênicos Ou Do Confluente Venoso",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30805031",
    description: "Biópsia De Tumor Do Mediastino (Qualquer Via)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30805040",
    description: "Cisto Ou Duplicação Brônquica Ou Esôfagica - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30805074",
    description: "Ligadura De Artérias Brônquicas Por Toracotomia Para Controle De Hemoptise",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30805082",
    description: "Ligadura De Ducto-Torácico (Qualquer Via)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30805090",
    description: "Linfadenectomia Mediastinal",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30805104",
    description: "Mediastinoscopia, Via Cervical",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30805112",
    description: "Mediastinotomia (Via Paraesternal, Transesternal, Cervical)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30805120",
    description: "Mediastinotomia Extrapleural Por Via Posterior",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30805139",
    description: "Pericardiotomia Com Abertura Pleuro-Pericárdica (Qualquer Técnica)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30805147",
    description: "Ressecção De Tumor De Mediastino",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30805155",
    description: "Timectomia (Qualquer Via)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30805163",
    description: "Tratamento Da Mediastinite (Qualquer Via)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30805171",
    description: "Vagotomia Troncular Terapêutica Por Toracotomia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30805180",
    description: "Biópsia De Tumor Do Mediastino Por Vídeo",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30805198",
    description: "Cisto Ou Duplicação Brônquica Ou Esofágica – Tratamento Cirúrgico Por Vídeo",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30805201",
    description: "Ligadura De Artérias Brônquicas Para Controle De Hemoptise Por Vídeo",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30805210",
    description: "Ligadura De Ducto-Torácico Por Vídeo",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30805228",
    description: "Linfadenectomia Mediastinal Por Vídeo",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30805236",
    description: "Mediastinoscopia, Via Cervical Por Vídeo",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30805244",
    description: "Mediastinotomia Extrapleural Por Via Posterior Por Vídeo",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30805252",
    description: "Pericardiotomia Com Abertura Pleuro-Pericárdica Por Vídeo",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30805260",
    description: "Ressecção De Tumor De Mediastino Por Vídeo",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "7"
  },
  {
    code: "30805279",
    description: "Timectomia Por Vídeo",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30805287",
    description: "Tratamento Da Mediastinite Por Vídeo",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30805295",
    description: "Retirada De Corpo Estranho Do Mediastino",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30806011",
    description: "Abscesso Subfrênico - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30806020",
    description: "Eventração Diafragmática - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30806038",
    description: "Hérnia Diafragmática - Tratamento Cirúrgico (Qualquer Técnica)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30806046",
    description: "Implante De Marca-Passo Diafragmático Definitivo",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30806054",
    description: "Hérnia Diafragmática – Tratamento Cirúrgico Por Vídeo",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30901014",
    description: "Ampliação (Anel Valvar, Grandes Vasos, Átrio, Ventrículo)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30901022",
    description: "Canal Arterial Persistente - Correção Cirúrgica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30901030",
    description: "Coarctação Da Aorta - Correção Cirúrgica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30901049",
    description: "Confecção De Bandagem Da Artéria Pulmonar",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30901057",
    description: "Correção Cirúrgica Da Comunicação Interatrial",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30901065",
    description: "Correção Cirúrgica Da Comunicação Interventricular",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "7"
  },
  {
    code: "30901073",
    description: "Correção De Cardiopatia Congênita + Cirurgia Valvar",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "8"
  },
  {
    code: "30901081",
    description: "Correção De Cardiopatia Congênita + Revascularização Do Miocárdio",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "8"
  },
  {
    code: "30901090",
    description: "Redirecionamento Do Fluxo Sanguíneo (Com Anastomose Direta, Retalho, Tubo) - Em Defeitos Cardíacos Congenitos",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30901103",
    description: "Ressecção (Infundíbulo, Septo, Membranas, Bandas) - Em Defeitos Cardíacos Congenitos",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30901111",
    description: "Transposições (Vasos, Câmaras) - Em Defeitos Cardíacos Congenitos",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30902010",
    description: "Ampliação Do Anel Valvar",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30902029",
    description: "Cirurgia Multivalvar",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "8"
  },
  {
    code: "30902037",
    description: "Comissurotomia Valvar",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30902045",
    description: "Plastia Valvar",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30902053",
    description: "Troca Valvar",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "7"
  },
  {
    code: "30903017",
    description: "Aneurismectomia De Ve",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30903025",
    description: "Revascularização Do Miocárdio",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "7"
  },
  {
    code: "30903033",
    description: "Revascularização Do Miocárdio + Cirurgia Valvar",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "8"
  },
  {
    code: "30903041",
    description: "Ventriculectomia Parcial - Em Coronariopatias",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "7"
  },
  {
    code: "30904013",
    description: "Cárdio-Estimulação Transesofágica (Cete), Terapêutica Ou Diagnóstica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "30904021",
    description: "Implante De Desfibrilador Interno, Placas E Eletrodos",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30904064",
    description: "Implante De Estimulador Cardíaco Artificial Multissítio",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30904080",
    description: "Instalação De Marca-Passo Epimiocárdio Temporário",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30904099",
    description: "Implante De Marca-Passo Temporário À Beira Do Leito",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30904102",
    description: "Recolocação De Eletrodo / Gerador Com Ou Sem Troca De Unidades",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30904110",
    description: "Retirada Do Sistema (Não Aplicável Na Troca Do Gerador)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30904129",
    description: "Troca De Gerador",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30904137",
    description: "Implante De Marca-Passo Monocameral (Gerador + Eletrodo Atrial Ou Ventricular)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30904145",
    description: "Implante De Marca-Passo Bicameral (Gerador + Eletrodo Atrial E Ventricular)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30904153",
    description: "Remoção De Cabo-Eletrodo De Marcapasso E/Ou Cárdio-Desfibrilador Implantável Com Auxílio De Dilatador Mecânico, Laser Ou Radiofrequência",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30904161",
    description: "Implante de cardiodes! brilador multissítio – TRC-D (gerador e eletrodos)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "7"
  },
  {
    code: "30904170",
    description: "Implante de monitor de eventos (Looper implantável)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30905010",
    description: "Colocação De Balão Intra-Aórtico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30905028",
    description: "Colocação De Stent Na Aorta Sem Cec",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30905036",
    description: "Instalação Do Circuíto De Circulação Extracorpórea Convencional",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30905044",
    description: "Instalação Do Circuíto De Circulação Extracorpórea Em Crianças De Baixo Peso (10 Kg)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "7"
  },
  {
    code: "30905052",
    description: "Derivação Cavo-Atrial",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30905060",
    description: "Perfusionista - Em Procedimentos Cardíacos",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "30906016",
    description: "Aneurisma De Aorta Abdominal Infra-Renal",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "7"
  },
  {
    code: "30906024",
    description: "Aneurisma De Aorta Abdominal Supra-Renal",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "7"
  },
  {
    code: "30906032",
    description: "Aneurisma De Aorta-Torácica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "7"
  },
  {
    code: "30906040",
    description: "Aneurisma De Artérias Viscerais",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30906059",
    description: "Aneurisma De Axilar, Femoral, Poplítea",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30906067",
    description: "Aneurisma De Carótida, Subclávia, Ilíaca",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30906075",
    description: "Aneurismas - Outros",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30906083",
    description: "Aneurismas Torácicos Ou Tóraco-Abdominais",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "7"
  },
  {
    code: "30906113",
    description: "Angioplastia Transluminal Transoperatória - Por Artéria",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30906121",
    description: "Artéria Hipogástrica - Unilateral - Qualquer Técnica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30906130",
    description: "Artéria Mesentérica Inferior - Qualquer Técnica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30906148",
    description: "Artéria Mesentérica Superior - Qualquer Técnica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30906156",
    description: "Artéria Renal Bilateral Revascularização",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30906164",
    description: "Cateterismo Da Artéria Radial - Para Pam",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "30906172",
    description: "Correção Das Dissecções Da Aorta",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "7"
  },
  {
    code: "30906180",
    description: "Endarterectomia Aorto-Ilíaca",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30906199",
    description: "Endarterectomia Carotídea - Cada Segmento Arterial Tratado",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30906202",
    description: "Endarterectomia Ilíaco-Femoral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30906210",
    description: "Ligadura De Carótida Ou Ramos",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30906229",
    description: "Ponte Aorto-Bifemoral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30906237",
    description: "Ponte Aorto-Biilíaca",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30906245",
    description: "Ponte Aorto-Femoral - Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30906253",
    description: "Ponte Aorto-Ilíaca - Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30906261",
    description: "Ponte Axilo-Bifemoral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30906270",
    description: "Ponte Axilo-Femoral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30906288",
    description: "Ponte Distal",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30906296",
    description: "Ponte Fêmoro Poplítea Proximal",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30906300",
    description: "Ponte Fêmoro-Femoral Cruzada",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30906318",
    description: "Ponte Fêmoro-Femoral Ipsilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30906326",
    description: "Ponte Subclávio Bifemoral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "7"
  },
  {
    code: "30906334",
    description: "Ponte Subclávio Femoral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30906342",
    description: "Pontes Aorto-Cervicais Ou Endarterectomias Dos Troncos Supra-Aórticos",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30906350",
    description: "Pontes Transcervicais - Qualquer Tipo",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30906377",
    description: "Preparo De Veia Autóloga Para Remendos Vasculares",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30906385",
    description: "Arterioplastia Da Femoral Profunda (Profundoplastia)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30906393",
    description: "Reoperação De Aorta Abdominal",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "7"
  },
  {
    code: "30906407",
    description: "Retirada De Enxerto Infectado Em Posição Não Aórtica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30906415",
    description: "Revascularização Aorto-Femoral - Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30906423",
    description: "Revascularização Arterial De Membro Superior",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30906431",
    description: "Tratamento Cirúrgico Da Isquemia Cerebral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30906440",
    description: "Tratamento Cirúrgico De Síndrome Vértebro Basilar",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30906458",
    description: "Tratamento Cirúrgico De Tumor Carotídeo",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30906466",
    description: "Tronco Celíaco - Qualquer Técnica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30907012",
    description: "Cirurgia De Restauração Venosa Com Pontes Em Cavidades",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30907020",
    description: "Cirurgia De Restauração Venosa Com Pontes Nos Membros",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30907039",
    description: "Cura Cirúrgica Da Impotência Coeundi Venosa",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30907047",
    description: "Cura Cirúrgica De Hipertensão Portal - Qualquer Tipo",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30907063",
    description: "Escleroterapia De Veias - Por Sessão",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "30907071",
    description: "Fulguração De Telangiectasias (Por Grupo)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "30907080",
    description: "Implante De Filtro De Veia Cava",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30907098",
    description: "Interrupção Cirúrgica Veia Cava Inferior",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30907101",
    description: "Tratamento Cirúrgico De Varizes Com Lipodermatoesclerose Ou Úlcera (Um Membro)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30907110",
    description: "Trombectomia Venosa",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30907128",
    description: "Valvuloplastia Ou Interposição De Segmento Valvulado Venoso",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30907136",
    description: "Varizes - Tratamento Cirúrgico De Dois Membros",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30907144",
    description: "Varizes - Tratamento Cirúrgico De Um Membro",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30907152",
    description: "Varizes - Ressecção De Colaterais Com Anestesia Local Em Consultório / Ambulatório",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "30908019",
    description: "Fístula Aorto-Cava, Reno-Cava Ou Ílio-Ilíaca",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "7"
  },
  {
    code: "30908027",
    description: "Fístula Arteriovenosa - Com Enxerto",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30908035",
    description: "Fístula Arteriovenosa Cervical Ou Cefálica Extracraniana",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30908043",
    description: "Fístula Arteriovenosa Congênita - Reintervenção",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30908051",
    description: "Fístula Arteriovenosa Congênita - Correção Cirúrgica Radical",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "7"
  },
  {
    code: "30908060",
    description: "Fístula Arteriovenosa Congênita Para Redução De Fluxo",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30908078",
    description: "Fístula Arteriovenosa Direta",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30908086",
    description: "Fístula Arteriovenosa Dos Grandes Vasos Intratorácicos",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "7"
  },
  {
    code: "30908094",
    description: "Fístula Arteriovenosa Dos Membros",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30908108",
    description: "Tromboembolectomia De Fístula Arteriovenosa",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30910013",
    description: "Aneurisma Roto Ou Trombosado De Aorta Abdominal Abaixo Da Artéria Renal",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "7"
  },
  {
    code: "30910021",
    description: "Aneurismas Rotos Ou Trombosados - Outros",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30910030",
    description: "Aneurismas Rotos Ou Trombosados De Aorta Abdominal Acima Da Artéria Renal",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "7"
  },
  {
    code: "30910048",
    description: "Aneurismas Rotos Ou Trombosados De Artérias Viscerais",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "7"
  },
  {
    code: "30910056",
    description: "Aneurismas Rotos Ou Trombosados De Axilar, Femoral, Poplítea",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30910064",
    description: "Aneurismas Rotos Ou Trombosados De Carótida, Subclávia, Ilíaca",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "7"
  },
  {
    code: "30910072",
    description: "Aneurismas Rotos Ou Trombosados Torácicos Ou Tóraco-Abdominais",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "7"
  },
  {
    code: "30910080",
    description: "Embolectomia Ou Tromboembolectomia Arterial",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30910099",
    description: "Exploração Vascular Em Traumas De Outros Segmentos",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30910102",
    description: "Exploração Vascular Em Traumas Torácicos E Abdominais",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "7"
  },
  {
    code: "30910110",
    description: "Lesões Vasculares Cervicais E Cérvico-Torácicas",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30910129",
    description: "Lesões Vasculares De Membro Inferior Ou Superior - Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30910137",
    description: "Lesões Vasculares Intra-Abdominais",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30910145",
    description: "Lesões Vasculares Traumáticas Intratorácicas",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "7"
  },
  {
    code: "30911010",
    description: "Avaliação Da Viabilidade Miocárdica Por Cateter",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30911028",
    description: "Avaliação Fisiológica Da Gravidade De Obstruções (Cateter Ou Guia)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30911036",
    description: "Biópsia Endomiocárdica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30911044",
    description: "Cateterismo Cardíaco D E/Ou E Com  Ou  Sem  Cinecoronariografia / Cineangiografia  Com  Avaliação  De Reatividade Vascular Pulmonar Ou Teste De Sobrecarga Hemodinânica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30911052",
    description: "Cateterismo Cardíaco D E/Ou E Com Estudo Cineangiográfico E De Revascularização Cirúrgica Do Miocárdio",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30911060",
    description: "Cateterismo Cardíaco Direito Com Estudo Angiográfico Da Artéria Pulmonar",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30911079",
    description: "Cateterismo Cardíaco E E/Ou D Com Cineangiocoronariografia E Ventriculografia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30911087",
    description: "Cateterismo Cardíaco E E/Ou D Com Cineangiocoronariografia, Ventriculografia E Estudo Angiográfico  Da Aorta E/Ou Ramos Tóraco-Abdominais E/Ou Membros",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30911095",
    description: "Cateterismo E E Estudo Cineangiográfico Da Aorta E/Ou Seus Ramos",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30911109",
    description: "Cateterização Cardíaca E Por Via Transeptal",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30911125",
    description: "Estudo Hemodinâmico Das Cardiopatias Congênitas  Estruturalmente  Complexas (Menos: Cia, Civ, Pca, Co, Ao, Estenose Aórtica E Pulmonar Isoladas)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30911133",
    description: "Estudo Hemodinâmico De Cardiopatias Congênitas E/Ou Valvopatias  Com  Ou  Sem  Cinecoronariografia  Ou Oximetria",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30911141",
    description: "Estudo Ultrassonográfico Intravascular",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30911150",
    description: "Mapeamento De Feixes Anômalos E Focos Ectópicos Por Eletrofisiologia Intracavitária, Com Provas",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30911168",
    description: "Teste De Avaliação Do Limiar De Fibrilação Ventricular",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "30911176",
    description: "Mapeamento Eletrofisiológico Cardíaco Convencional",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "30912016",
    description: "Ablação De Circuito Arritmogênico Por Cateter De Radiofrequência",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30912024",
    description: "Angioplastia transluminal da aorta ou ramos ou da artéria pulmonar e ramos (por vaso)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30912032",
    description: "Angioplastia Transluminal Percutânea De Múltiplos Vasos, Com Implante De Stent",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30912040",
    description: "Angioplastia Transluminal Percutânea Por Balão (1 Vaso)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30912059",
    description: "Atriosseptostomia Por Balão",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30912067",
    description: "Atriosseptostomia Por Lâmina",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30912075",
    description: "Emboloterapia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30912083",
    description: "Colocação De Cateter Intracavitário Para Monitorização Hemodinâmica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30912091",
    description: "Implante De Prótese Intravascular Na Aorta/Pulmonar Ou Ramos Com Ou Sem Angioplastia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30912105",
    description: "Implante De Stent Coronário Com Ou Sem Angioplastia Por Balão Concomitante (1 Vaso)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30912113",
    description: "Infusão Seletiva Intravascular De Enzimas Trombolíticas",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30912121",
    description: "Oclusão Percutânea De Shunts Intracardíacos",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30912130",
    description: "Oclusão Percutânea De Fístula E/Ou Conexões Sistêmico Pulmonares",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30912148",
    description: "Oclusão Percutânea Do Canal Arterial",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30912156",
    description: "Punção Saco Pericárdico Com Introdução De Cateter Multipolar No Espaço Pericárdico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30912164",
    description: "Punção Transeptal Com Introdução De Cateter Multipolar Nas Camaras Esquerdas E/Ou Veias Pulmonares",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30912172",
    description: "Radiação Ou Antiproliferação Intracoronária",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30912180",
    description: "Recanalização Arterial No Iam - Angioplastia Primária - Com Implante De Stent Com Ou Sem Suporte Circulatório (Balão Intra-Órtico)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30912199",
    description: "Recanalização Mecânica Do Iam (Angioplastia Primária Com Balão)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30912202",
    description: "Redução Miocárdica Por Infusão Seletiva De Drogas",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30912210",
    description: "Retirada Percutânea De Corpos Estranhos Vasculares",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30912229",
    description: "Revascularização Transmiocárdica Percutânea",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30912237",
    description: "Tratamento Percutâneo Do Aneurisma/Dissecção Da Aorta",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30912245",
    description: "Valvoplastia Percutânea Por Via Arterial Ou Venosa",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30912253",
    description: "Valvoplastia Percutânea Por Via Transeptal",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30912261",
    description: "Angioplastia Transluminal Percutânea De Bifurcação E De Tronco Com Implante De Stent",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30912270",
    description: "Ateromectomia Rotacional, Direcional, Extracional Ou Uso De Laser Coronariano Com Ou Sem Angioplastia Por Balão, Com Ou Sem Implante De Stent",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30912288",
    description: "Procedimento Terapêutico Nas Cardiopatias Congênitas, Exceto Atriosseptostomia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30912296",
    description: "Implante transcateter de prótese valvar aórtica (TAVI)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "7"
  },
  {
    code: "30912300",
    description: "Oclusão do apêndice atrial esquerdo",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30912318",
    description: "Angioplastia transluminal percutânea por balão para tratamento de oclusão coronária crônica com ou sem stent",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30912326",
    description: "Reparo transcateter valvar mitral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "7"
  },
  {
    code: "30912334",
    description: "Implante Transcateter de Válcula Pulmonar (ITVP)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "7"
  },
  {
    code: "30913012",
    description: "Implante De Cateter Venoso Central Por Punção, Para Npp, Qt, Hemodepuração Ou Para Infusão De Soros/Drogas",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "30913020",
    description: "Instalação De Cateter Para Monitorização Hemodinâmica À Beira Do Leito (Swan-Ganz)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "30913047",
    description: "Instalação De Circuito Para Assistência Mecânica Circulatória Prolongada (Toracotomia)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30913055",
    description: "Manutenção De Circuito Para Assistência Mecânica Circulatória Prolongada - Período De 6 Horas",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "30913071",
    description: "Dissecção De Vaso Umbilical Com Colocação De Cateter",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "30913080",
    description: "Dissecção De Veia Em Rn Ou Lactente",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "30913098",
    description: "Dissecção De Veia Com Colocação Cateter Venoso",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "30913101",
    description: "Implante Cirúrgico De Cateter De Longa Permanência Para Npp, Qt Ou Para Hemodepuração",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30913128",
    description: "Retirada Cirúrgica De Cateter De Longa Permanência Para Npp, Qt Ou Para Hemodepuração",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "30913144",
    description: "Confecção De Fístula Av Para Hemodiálise",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30913152",
    description: "Retirada/Desativação  De Fístula Av Para Hemodiálise",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30914019",
    description: "Anastomose Linfovenosa",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30914027",
    description: "Doenca De Hodgkin - Estadiamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30914043",
    description: "Linfadenectomia Inguinal Ou Ilíaca",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30914051",
    description: "Linfadenectomia Cervical",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30914060",
    description: "Linfadenectomia Pélvica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30914078",
    description: "Linfadenectomia Retroperitoneal",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30914086",
    description: "Linfangioplastia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30914094",
    description: "Linfedema - Ressecção Total",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30914108",
    description: "Linfedema Genital - Ressecção",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30914116",
    description: "Marsupialização De Linfocele",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30914124",
    description: "Punção Biópsia Ganglionar",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "30914132",
    description: "Linfedema - Ressecção Parcial",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30914140",
    description: "Linfadenectomia Pélvica Laparoscópica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30914159",
    description: "Linfadenectomia Retroperitoneal Laparoscópica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "7"
  },
  {
    code: "30914167",
    description: "Marsupialização Laparoscópica De Linfocele",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30915015",
    description: "Correção Cirúrgica Das Arritmias",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30915023",
    description: "Drenagem Do Pericárdio",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30915031",
    description: "Pericardiocentese",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "30915040",
    description: "Pericardiotomia / Pericardiectomia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30915058",
    description: "Drenagem Do Pericárdio Por Vídeo",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30915066",
    description: "Pericardiotomia / Pericardiectomia Por Vídeo",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30916011",
    description: "Hipotermia Profunda Com Ou Sem Parada Circulatória Total",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30917018",
    description: "Biópsia Do Miocárdio",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "30917026",
    description: "Cardiomioplastia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "7"
  },
  {
    code: "30917034",
    description: "Cardiotomia (Ferimento, Corpo Estranho, Exploração)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30917042",
    description: "Retirada De Tumores Intracardíacos",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "30918014",
    description: "Estudo eletrofisiológiico cardíaco com ou sem sensibilização farmacológica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30918022",
    description: "Mapeamento de gatilhos ou substratos arritmogênicos por técnica eletrofisiológica com ou sem provas farmacológicas",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30918030",
    description: "Mapeamento eletroanatômico tridimensional",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30918049",
    description: "Avaliação do limiar de desfibrilação ventricular",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "30918057",
    description: "Punção saco pericárdico com introdução de cateter multipolar no espaço pericárdico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30918065",
    description: "Punção transeptal com introdução de cateter multipolar nas câmaras esquerdas e/ou veias pulmonares",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30918073",
    description: "Ablação percutânea por cateter para tratamento de arritmias cardíacas por energia de radiofrequência ou crioablação",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "30918081",
    description: "Ablação percutânea por cateter para tratamento de arritmias cardíacas complexas (Fibrilação Atrial, Taquicardia Ventricular com modificação de cicatriz, Taquicardias Atriais Macrorreentrantes com modificação de cicatriz) por energia de radiofrequência",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "7"
  },
  {
    code: "31001017",
    description: "Atresia De Esôfago Com Fístula Traqueal - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31001025",
    description: "Atresia De Esôfago Sem Fístula (Dupla Estomia) - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31001033",
    description: "Autotransplante Com Microcirurgia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "7"
  },
  {
    code: "31001041",
    description: "Esofagectomia Distal Com Toracotomia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "7"
  },
  {
    code: "31001050",
    description: "Esofagectomia Distal Sem Toracotomia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "7"
  },
  {
    code: "31001068",
    description: "Esofagoplastia (Coloplastia)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31001076",
    description: "Esofagoplastia (Gastroplastia)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31001084",
    description: "Estenose De Esôfago - Tratamento Cirúrgico Via Torácica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31001092",
    description: "Faringo-Laringo-Esofagectomia Total Com Ou Sem Toracotomia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "7"
  },
  {
    code: "31001106",
    description: "Fístula Tráqueo Esofágica - Tratamento Cirúrgico Via Cervical",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31001114",
    description: "Fístula Tráqueo Esofágica - Tratamento Cirúrgico Via Torácica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31001149",
    description: "Reintervenção Sobre A Transição Esôfago Gástrica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31001157",
    description: "Ressecção Do Esôfago Cervical E/Ou Torácico E Transplante Com Microcirurgia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "7"
  },
  {
    code: "31001165",
    description: "Substituição Esofágica - Cólon Ou Tubo Gástrico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31001173",
    description: "Tratamento Cirúrgico Das Varizes Esofágicas",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31001181",
    description: "Tratamento Cirúrgico Conservador Do Megaesofago",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31001190",
    description: "Tunelização Esofágica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31001203",
    description: "Esofagorrafia Cervical",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31001211",
    description: "Esofagorrafia Torácica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31001220",
    description: "Esofagostomia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31001238",
    description: "Tratamento Cirúrgico Do Divertículo Esofágico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31001246",
    description: "Tratamento Cirúrgico Do Divertículo Faringoesofágico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31001254",
    description: "Esofagectomia Subtotal Com Linfadenectomia Com Ou Sem Toracotomia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "7"
  },
  {
    code: "31001262",
    description: "Refluxo Gastroesofágico - Tratamento Cirúrgico (Hérnia De Hiato)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31001270",
    description: "Reconstrução Do Esôfago Cervical E Torácico Com Transplante Segmentar De Intestino",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "7"
  },
  {
    code: "31001289",
    description: "Reconstrução Do Esôfago Cervical Ou Torácico, Com Transplante De Intestino",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "7"
  },
  {
    code: "31001297",
    description: "Dissecção Do Esôfago Torácico (Qualquer Técnica)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31001300",
    description: "Esofagectomia Distal Com Ou Sem Toracotomia Por Videolaparoscopia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "8"
  },
  {
    code: "31001319",
    description: "Reintervenção Sobre A Transição Esôfago Gástrica Por Videolaparoscopia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "7"
  },
  {
    code: "31001327",
    description: "Tratamento Cirúrgico Das Varizes Esofágicas Por Videolaparoscopia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31001335",
    description: "Tratamento Cirúrgico Conservador Do Megaesofago Por Videolaparoscopia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31001343",
    description: "Esofagorrafia Torácica Por Videotoracoscopia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31001351",
    description: "Tratamento Cirúrgico Do Divertículo Esofágico Por Videotoracoscopia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31001360",
    description: "Refluxo Gastroesofágico - Tratamento Cirúrgico (Hérnia De Hiato) Por Videolaparoscopia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31002013",
    description: "Colocação De Banda Gástrica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31002021",
    description: "Conversão De Anastomose Gastrojejunal (Qualquer Técnica)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31002030",
    description: "Degastrogastrectomia Com Vagotomia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31002048",
    description: "Degastrogastrectomia Sem Vagotomia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31002056",
    description: "Gastrostomia Confecção / Fechamento",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31002064",
    description: "Gastrectomia Parcial Com Linfadenectomia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31002072",
    description: "Gastrectomia Parcial Com Vagotomia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31002080",
    description: "Gastrectomia Parcial Sem Vagotomia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31002099",
    description: "Gastrectomia Polar Superior Com Reconstrução Jejunal Com Toracotomia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31002102",
    description: "Gastrectomia Polar Superior Com Reconstrução Jejunal Sem Toracotomia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31002110",
    description: "Gastrectomia Total Com Linfadenectomia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31002129",
    description: "Gastrectomia Total Via Abdominal",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31002137",
    description: "Gastroenteroanastomose",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31002145",
    description: "Gastrorrafia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31002153",
    description: "Gastrotomia Com Sutura De Varizes",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31002161",
    description: "Gastrotomia Para Retirada De Ce Ou Lesão Isolada",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31002170",
    description: "Gastrotomia Para Qualquer Finalidade",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31002188",
    description: "Membrana Antral - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31002196",
    description: "Piloroplastia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31002218",
    description: "Gastroplastia Para Obesidade Mórbida - Qualquer Técnica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "7"
  },
  {
    code: "31002242",
    description: "Tratamento Cirúrgico Das Varizes Gástricas",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31002250",
    description: "Vagotomia Com Operação De Drenagem",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31002269",
    description: "Vagotomia Gástrica Proximal Ou Superseletiva Com Duodenoplastia (Operação De Drenagem)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31002277",
    description: "Vagotomia Superseletiva Ou Vagotomia Gástrica Proximal",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31002285",
    description: "Colocação De Banda Gástrica Por Videolaparoscopia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31002293",
    description: "Conversão De Anastomose Gastrojejunal Por Videolaparoscopia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31002307",
    description: "Gastrectomia Parcial Com Linfadenectomia Por Videolaparoscopia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31002315",
    description: "Gastrectomia Parcial Com Vagotomia Por Videolaparoscopia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31002323",
    description: "Gastrectomia Parcial Sem Vagotomia Por Videolaparoscopia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31002331",
    description: "Gastrectomia Total Com Linfadenectomia Por Videolaparoscopia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "7"
  },
  {
    code: "31002340",
    description: "Gastrectomia Total Via Abdominal Por Videolaparoscopia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "7"
  },
  {
    code: "31002358",
    description: "Gastroenteroanastomose Por Videolaparoscopia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31002366",
    description: "Gastrotomia Para Retirada De Ce Ou Lesão Isolada Por Videolaparoscopia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31002374",
    description: "Piloroplastia Por Videolaparoscopia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31002390",
    description: "Gastroplastia Para Obesidade Mórbida Por Videolaparoscopia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "7"
  },
  {
    code: "31002404",
    description: "Vagotomia Gástrica Proximal Ou Superseletiva Com Duodenoplastia (Operação De Drenagem) Por Videolaparoscopia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31002412",
    description: "Vagotomia Superseletiva Ou Vagotomia Gástrica Proximal Por Videolaparoscopia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31003010",
    description: "Amputação Abdômino-Perineal Do Reto (Completa)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31003028",
    description: "Amputação Do Reto Por Procidência",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31003036",
    description: "Anomalia Anorretal - Correção Via Sagital Posterior",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31003044",
    description: "Anomalia Anorretal - Tratamento Cirúrgico Via Abdômino-Perineal",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31003052",
    description: "Anomalia Anorretal - Tratamento Cirúrgico Via Perineal",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31003060",
    description: "Anorretomiomectomia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31003079",
    description: "Apendicectomia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31003087",
    description: "Apple-Peel - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31003095",
    description: "Atresia De Cólon - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31003109",
    description: "Atresia De Duodeno - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31003117",
    description: "Atresia Jejunal Distal Ou Ileal - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31003125",
    description: "Atresia Jejunal Proximal - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31003133",
    description: "Cirurgia De Abaixamento (Qualquer Técnica)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31003141",
    description: "Cirurgia De Acesso Posterior",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31003150",
    description: "Cisto Mesentérico - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31003168",
    description: "Colectomia Parcial Com Colostomia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31003176",
    description: "Colectomia Parcial Sem Colostomia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31003184",
    description: "Colectomia Total Com Íleo-Reto-Anastomose",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31003192",
    description: "Colectomia Total Com Ileostomia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31003206",
    description: "Colocação De Sonda Enteral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "31003214",
    description: "Colostomia Ou Enterostomia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31003230",
    description: "Colotomia E Colorrafia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31003249",
    description: "Distorção De Volvo Por Laparotomia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31003257",
    description: "Distorção De Volvo Por Via Endoscópica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "31003265",
    description: "Divertículo De Meckel - Exérese",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31003273",
    description: "Duplicação Do Tubo Digestivo - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31003281",
    description: "Enterectomia Segmentar",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31003290",
    description: "Entero-Anastomose  (Qualquer Segmento)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31003303",
    description: "Enterocolite Necrotizante - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31003311",
    description: "Enteropexia (Qualquer Segmento)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31003320",
    description: "Enterotomia E/Ou Enterorrafia De Qualquer Segmento (Por Sutura Ou Ressecção)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31003338",
    description: "Esporão Retal - Ressecção",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31003346",
    description: "Esvaziamento Pélvico Anterior Ou Posterior - Procedimento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31003354",
    description: "Esvaziamento Pélvico Total - Procedimento Cirurgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31003362",
    description: "Fecaloma - Remoção Manual",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "31003370",
    description: "Fechamento De Colostomia Ou Enterostomia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31003389",
    description: "Fixação Do Reto Por Via Abdominal",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31003397",
    description: "Íleo Meconial - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31003427",
    description: "Invaginação Intestinal - Ressecção",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31003435",
    description: "Invaginação Intestinal Sem Ressecção - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31003451",
    description: "Má-Rotação Intestinal - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31003460",
    description: "Megacólon Congênito - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31003478",
    description: "Membrana Duodenal - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31003486",
    description: "Pâncreas Anular - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31003494",
    description: "Perfuração Duodenal Ou Delgado - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31003508",
    description: "Piloromiotomia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31003516",
    description: "Procidência Do Reto - Redução Manual",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "31003524",
    description: "Proctocolectomia Total",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31003532",
    description: "Proctocolectomia Total Com Reservatório Ileal",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31003540",
    description: "Ressecção Total De Intestino Delgado",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31003559",
    description: "Retossigmoidectomia Abdominal",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31003567",
    description: "Tumor Anorretal - Ressecção Anorretal, Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31003575",
    description: "Amputação Abdômino-Perineal Do Reto (Completa) Por Videolaparoscopia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "7"
  },
  {
    code: "31003583",
    description: "Apendicectomia Por Videolaparoscopia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31003591",
    description: "Cirurgia De Abaixamento Por Videolaparoscopia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "7"
  },
  {
    code: "31003605",
    description: "Cisto Mesentérico - Tratamento Cirúrgico Por Videolaparoscopia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31003613",
    description: "Colectomia Parcial Com Colostomia Por Videolaparoscopia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "7"
  },
  {
    code: "31003621",
    description: "Colectomia Parcial Sem Colostomia Por Videolaparoscopia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31003630",
    description: "Colectomia Total Com Íleo-Reto-Anastomose Por Videolaparoscopia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "7"
  },
  {
    code: "31003648",
    description: "Colectomia Total Com Ileostomia Por Videolaparoscopia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "7"
  },
  {
    code: "31003656",
    description: "Distorção De Volvo Por Videolaparoscopia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31003664",
    description: "Divertículo De Meckel - Exérese Por Videolaparoscopia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31003672",
    description: "Enterectomia Segmentar Por Videolaparoscopia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31003680",
    description: "Entero-Anastomose (Qualque Segmento) Por Videolaparoscopia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31003699",
    description: "Enteropexia (Qualquer Segmento) Por Videolaparoscopia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31003702",
    description: "Esvaziamento Pélvico Anterior Ou Posterior Por Videolaparoscopia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31003710",
    description: "Esvaziamento Pélvico Total Por Videolaparoscopia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "7"
  },
  {
    code: "31003729",
    description: "Fixação Do Reto Por Via Abdominal Por Videolaparoscopia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31003737",
    description: "Megacólon Congênito - Tratamento Cirúrgico Por Videolaparoscopia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31003745",
    description: "Pâncreas Anular - Tratamento Cirúrgico Por Videolaparoscopia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31003753",
    description: "Perfuração Duodenal Ou Delgado - Tratamento Cirúrgico Por Videolaparoscopia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31003761",
    description: "Piloromiotomia Por Videolaparoscopia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31003770",
    description: "Proctocolectomia Total Com Reservatório Ileal Por Videolaparoscopia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "7"
  },
  {
    code: "31003788",
    description: "Proctocolectomia Total Por Videolaparoscopia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "7"
  },
  {
    code: "31003796",
    description: "Retossigmoidectomia Abdominal Por Videolaparoscopia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31004016",
    description: "Abscesso Anorretal - Drenagem",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "31004024",
    description: "Abscesso Isquio-Retal - Drenagem",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "31004032",
    description: "Cerclagem Anal",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31004040",
    description: "Corpo Estranho Do Reto - Retirada",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "31004059",
    description: "Criptectomia (Única Ou Múltipla)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "31004067",
    description: "Dilatação Digital Ou Instrumental Do Ânus E/Ou Do Reto",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "31004075",
    description: "Esfincteroplastia Anal (Qualquer Técnica)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "31004083",
    description: "Estenose Anal - Tratamento Cirúrgico (Qualquer Técnica)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "31004091",
    description: "Excisão De Plicoma",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "31004105",
    description: "Fissurectomia Com Ou Sem Esfincterotomia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "31004113",
    description: "Fístula Reto-Vaginal E Fístula Anal Em Ferradura - Tratamento Cirúrgico Via Perineal",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31004121",
    description: "Fistulectomia Anal Em Dois Tempos",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "31004130",
    description: "Fistulectomia Anal Em Ferradura",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "31004148",
    description: "Fistulectomia Anal Em Um Tempo",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "31004156",
    description: "Fistulectomia Anorretal Com Abaixamento Mucoso",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "31004164",
    description: "Fistulectomia Perineal",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "31004172",
    description: "Hemorróidas - Fotocoagulação Com Raio Infravermelho (Por Sessão)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "31004180",
    description: "Hemorróidas - Ligadura Elástica (Por Sessão)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "31004199",
    description: "Hemorróidas - Tratamento Esclerosante (Por Sessão)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "31004202",
    description: "Hemorroidectomia Aberta Ou Fechada, Com Ou Sem Esfincterotomia, Sem Grampeador",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31004210",
    description: "Laceração Anorretal - Tratamento Cirúrgico Por Via Perineal",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "31004229",
    description: "Lesão Anal - Eletrocauterização",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "31004237",
    description: "Papilectomia (Única Ou Múltipla)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "31004245",
    description: "Pólipo Retal - Ressecção Endoanal",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "31004253",
    description: "Prolapso Retal - Esclerose (Por Sessão)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "31004261",
    description: "Prolapso Retal - Tratamento Cirúrgico Perineal",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31004270",
    description: "Reconstituição De Esfincter Anal Por Plástica Muscular (Qualquer Técnica)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31004288",
    description: "Reconstrução Total Anoperineal",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31004300",
    description: "Tratamento Cirúrgico De Retocele (Colpoperineoplastia Posterior)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "31004318",
    description: "Trombose Hemorroidária - Exérese",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "31004326",
    description: "Prurido Anal - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "31004334",
    description: "Esfincterotomia  - Ânus",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "31004342",
    description: "Anopexia Mecânica Com Grampeador",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "31004350",
    description: "Desarterialização hemorroidária transanal com mucopexia guiada por doppler",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "31005012",
    description: "Abscesso Hepático - Drenagem Cirúrgica (Até 3 Fragmentos)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31005020",
    description: "Alcoolização Percutânea Dirigida De Tumor Hepático",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31005039",
    description: "Anastomose Biliodigestiva Intra-Hepática",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31005047",
    description: "Atresia De Vias Biliares - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31005063",
    description: "Biópsia Hepática Por Laparotomia (Até 3 Fragmentos)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31005071",
    description: "Biópsia Hepática Transparietal (Até 3 Fragmentos)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31005080",
    description: "Laparotomia Para Implantação Cirúrgica De Cateter Arterial Visceral Para Quimioterapia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31005098",
    description: "Cisto De Colédoco - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31005101",
    description: "Colecistectomia Com Colangiografia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31005110",
    description: "Colecistectomia Com Fístula Biliodigestiva",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31005128",
    description: "Colecistectomia Sem Colangiografia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31005136",
    description: "Colecistojejunostomia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31005144",
    description: "Colecistostomia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31005152",
    description: "Colédoco Ou Hepático-Jejunostomia (Qualquer Técnica)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31005160",
    description: "Colédoco Ou Hepaticoplastia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31005179",
    description: "Colédoco-Duodenostomia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31005187",
    description: "Coledocotomia Ou Coledocostomia Sem Colecistectomia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31005195",
    description: "Coledocoscopia Intra-Operatória",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31005209",
    description: "Derivação Porto Sistêmica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31005217",
    description: "Desconexão Ázigos - Portal Com Esplenectomia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31005225",
    description: "Desconexão Ázigos - Portal Sem Esplenectomia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31005233",
    description: "Desvascularização Hepática",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31005241",
    description: "Drenagem Biliar Trans-Hepática",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31005250",
    description: "Enucleação De Metástases Hepáticas",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31005268",
    description: "Enucleação De Metástases, Por Metástase",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31005276",
    description: "Hepatorrafia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31005284",
    description: "Hepatorrafia Complexa Com Lesão De Estruturas Vasculares Biliares",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31005292",
    description: "Lobectomia Hepática Direita",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31005306",
    description: "Lobectomia Hepática Esquerda",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31005314",
    description: "Papilotomia Transduodenal",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31005322",
    description: "Punção Hepática Para Drenagem De Abscessos",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31005330",
    description: "Radioablação / Termoablação De Tumores Hepáticos",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31005357",
    description: "Ressecção De Cisto Hepático Com Hepatectomia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31005365",
    description: "Ressecção De Cisto Hepático Sem Hepatectomia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31005373",
    description: "Ressecção De Tumor De Vesícula Ou Da Via Biliar Com Hepatectomia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31005381",
    description: "Ressecção De Tumor De Vesícula Ou Da Via Biliar Sem Hepatectomia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31005390",
    description: "Segmentectomia Hepática",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31005403",
    description: "Sequestrectomia Hepática",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31005420",
    description: "Tratamento Cirúrgico De Estenose Cicatricial Das Vias Biliares",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31005438",
    description: "Trissegmentectomias",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31005446",
    description: "Coledocotomia Ou Coledocostomia Com Colecistectomia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31005454",
    description: "Abscesso Hepático - Drenagem Cirúrgica Por Videolaparoscopia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31005462",
    description: "Alcoolização Percutânea Dirigida De Tumor Hepático Por Videolaparoscopia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31005470",
    description: "Colecistectomia Com Colangiografia Por Videolaparoscopia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31005489",
    description: "Colecistectomia Com Fístula Biliodigestiva Por Videolaparoscopia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31005497",
    description: "Colecistectomia Sem Colangiografia Por Videolaparoscopia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31005500",
    description: "Colecistojejunostomia Por Videolaparoscopia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31005519",
    description: "Colecistostomia Por Videolaparoscopia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31005527",
    description: "Colédoco Ou Hepático-Jejunostomia Por Videolaparoscopia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31005535",
    description: "Colédoco-Duodenostomia Por Videolaparoscopia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31005543",
    description: "Coledocotomia Ou Coledocostomia Com Colecistectomia Por Videolaparoscopia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31005551",
    description: "Coledocotomia Ou Coledocostomia Sem Colecistectomia Por Videolaparoscopia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31005560",
    description: "Desconexão Ázigos - Portal Com Esplenectomia Por Videolaparoscopia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "7"
  },
  {
    code: "31005578",
    description: "Desconexão Ázigos - Portal Sem Esplenectomia Por Videolaparoscopia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31005586",
    description: "Enucleação De Metástase Hepáticas Por Videolaparoscopia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31005594",
    description: "Hepatorrafia Complexa Com Lesão De Estruturas Vasculares Biliares Por Videolaparoscopia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "7"
  },
  {
    code: "31005608",
    description: "Hepatorrafia Por Videolaparoscopia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31005616",
    description: "Lobectomia Hepática Direita Por Videolaparoscopia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "7"
  },
  {
    code: "31005624",
    description: "Lobectomia Hepática Esquerda Por Videolaparoscopia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "7"
  },
  {
    code: "31005632",
    description: "Punção Hepática Para Drenagem De Abcessos Por Videolaparoscopia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31005640",
    description: "Radioablação / Termoablação De Tumores Hepáticos Por Videolaparoscopia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31005659",
    description: "Ressecção De Cisto Hepático Com Hepatectomia Por Videolaparoscopia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "7"
  },
  {
    code: "31005667",
    description: "Ressecção De Cisto Hepático Sem Hepatectomia Por Videolaparoscopia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31005675",
    description: "Biópsia Hepática Por Videolaparoscopia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31005683",
    description: "Biópsia Hepática Por Laparotomia (Acima De 3 Fragmentos)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31005691",
    description: "Biópsia Hepática Transparietal (Acima De 3 Fragmentos)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31006019",
    description: "Biópsia De Pâncreas Por Laparotomia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31006027",
    description: "Biópsia De Pâncreas Por Punção Dirigida",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31006035",
    description: "Enucleação De Tumores Pancreáticos",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31006043",
    description: "Hipoglicemia - Tratamento Cirúrgico (Pancreatotomia Parcial Ou Total)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31006051",
    description: "Pancreatectomia Corpo Caudal Com Preservação Do Baço",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31006060",
    description: "Pancreatectomia Parcial Ou Sequestrectomia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31006078",
    description: "Pancreato-Duodenectomia Com Linfadenectomia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "7"
  },
  {
    code: "31006086",
    description: "Pancreato-Enterostomia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31006094",
    description: "Pancreatorrafia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31006108",
    description: "Pseudocisto Pâncreas - Drenagem Externa (Qualquer Técnica)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31006116",
    description: "Pseudocisto Pâncreas - Drenagem Interna (Qualquer Técnica)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31006124",
    description: "Cisto Pancreático - Cistojejunoanastomose - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31006132",
    description: "Cisto Pancreático - Gastroanastomose - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31006159",
    description: "Biópsia De Pâncreas Por Videolaparoscopia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31006167",
    description: "Enucleação De Tumores Pancreáticos Por Videolaparoscopia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31006175",
    description: "Pseudocisto Pâncreas - Drenagem Externa Por Videolaparoscopia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31006183",
    description: "Pseudocisto Pâncreas - Drenagem Interna Por Videolaparoscopia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31007015",
    description: "Biópsia Esplênica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "31007023",
    description: "Esplenectomia Parcial",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31007031",
    description: "Esplenectomia Total",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31007040",
    description: "Esplenorrafia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31007058",
    description: "Esplenectomia Parcial Por Videolaparoscopia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31007066",
    description: "Esplenectomia Total Por Videolaparoscopia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31007074",
    description: "Esplenorrafia Por Videolaparoscopia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31008011",
    description: "Diálise Peritoneal Intermitente - Agudo Ou Crônico (Por Sessão)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "31008020",
    description: "Diálise Peritoneal Ambulatorial Contínua (Capd) 9 Dias - Treinamento",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "31008038",
    description: "Diálise Peritoneal Ambulatorial Contínua (Capd) Por Mês/Paciente",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "31008046",
    description: "Diálise Peritoneal Automática (Apd) - Tratamento (Agudo Ou Crônico)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "31008054",
    description: "Epiploplastia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31008062",
    description: "Implante De Cateter Peritoneal",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "31008070",
    description: "Instalação De Cateter Tenckhoff",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "31008097",
    description: "Retirada De Cateter Tenckhoff",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "31008100",
    description: "Epiploplastia Por Videolaparoscopia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31008119",
    description: "Diálise Peritoneal Automática Por Mês (Agudo Ou Crônico)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "31009018",
    description: "Abscesso Perineal - Drenagem Cirúrgica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "31009026",
    description: "Biópsia De Parede Abdominal",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "31009042",
    description: "Cisto Sacro-Coccígeo - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "31009050",
    description: "Diástase Dos Retos-Abdominais - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "31009069",
    description: "Hérnia Inguinal Encarcerada Em Rn Ou Lactente - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31009077",
    description: "Herniorrafia Com Ressecção Intestinal - Estrangulada",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31009085",
    description: "Herniorrafia Crural - Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31009093",
    description: "Herniorrafia Epigástrica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "31009107",
    description: "Herniorrafia Incisional",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31009115",
    description: "Herniorrafia Inguinal - Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "31009123",
    description: "Herniorrafia Inguinal No Rn Ou Lactente",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31009131",
    description: "Herniorrafia Lombar",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31009140",
    description: "Herniorrafia Recidivante",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31009158",
    description: "Herniorrafia Sem Ressecção Intestinal Encarcerada",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31009166",
    description: "Herniorrafia Umbilical",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "31009174",
    description: "Laparotomia Exploradora, Ou Para Biópsia, Ou Para Drenagem De Abscesso, Ou Para Liberação De Bridas Em Vigência De Oclusão",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31009204",
    description: "Neuroblastoma Abdominal - Exérese",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31009220",
    description: "Onfalocele/Gastrosquise Em 1 Tempo Ou Primeiro Tempo Ou Prótese - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31009239",
    description: "Onfalocele/Gastrosquise - Segundo Tempo - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31009247",
    description: "Paracentese Abdominal",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "31009255",
    description: "Reconstrução Da Parede Abdominal Com Retalho Muscular Ou Miocutâneo",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31009263",
    description: "Reparação De Outras Hérnias (Inclui Herniorrafia Muscular)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "31009271",
    description: "Ressecção De Cisto Ou Fístula De Úraco",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31009280",
    description: "Ressecção De Cisto Ou Fístula Ou Restos Do Ducto Onfalomesentérico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "31009298",
    description: "Ressutura Da Parede Abdominal (Por Deiscência Total Ou Evisceração)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31009301",
    description: "Teratoma Sacro-Coccígeo - Exérese",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31009310",
    description: "Herniorrafia Com Ressecção Intestinal - Estrangulada - Por Videolaparoscopia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31009328",
    description: "Herniorrafia Crural - Unilateral Por Videolaparoscopia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31009336",
    description: "Herniorrafia Inguinal - Unilateral Por Videolaparoscopia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31009344",
    description: "Herniorrafia Recidivante Por Videolaparoscopia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31009352",
    description: "Laparotomia Exploradora, Ou Para Biópsia, Ou Para Drenagem De Abscesso, Ou Para Liberação De Bridas Em Vigência De Oclusão Por Videolaparoscopia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31009360",
    description: "Herniorrafia Inguinal Em Criança - Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "31009379",
    description: "Terapia por pressão negativa para abdome",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31101011",
    description: "Abscesso Renal Ou Peri-Renal - Drenagem Cirúrgica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31101020",
    description: "Abscesso Renal Ou Peri-Renal - Drenagem Percutânea",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31101038",
    description: "Adrenalectomia Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31101046",
    description: "Angioplastia Renal Unilateral A Céu Aberto",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31101054",
    description: "Angioplastia Renal Unilateral Transluminal",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31101062",
    description: "Autotransplante Renal Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "8"
  },
  {
    code: "31101070",
    description: "Biópsia Renal Cirúrgica Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31101089",
    description: "Cisto Renal - Escleroterapia Percutânea - Por Cisto",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "31101097",
    description: "Endopielotomia Percutânea Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31101100",
    description: "Estenose De Junção Pieloureteral - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31101119",
    description: "Fístula Pielo-Cutânea - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31101127",
    description: "Lombotomia Exploradora",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31101135",
    description: "Marsupialização De Cistos Renais Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31101151",
    description: "Nefrectomia Parcial Com Ureterectomia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31101160",
    description: "Nefrectomia Parcial Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31101178",
    description: "Nefrectomia Parcial Unilateral Extracorpórea",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31101186",
    description: "Nefrectomia Radical Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31101194",
    description: "Nefrectomia Total Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31101208",
    description: "Nefro Ou Pieloenterocistostomia Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31101216",
    description: "Nefrolitotomia Anatrófica Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31101224",
    description: "Nefrolitotomia Percutânea Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31101232",
    description: "Nefrolitotomia Simples Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31101240",
    description: "Nefrolitotripsia Extracorpórea - 1ª Sessão",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31101259",
    description: "Nefrolitotripsia Extracorpórea - Reaplicações (Até 3 Meses)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31101275",
    description: "Nefrolitotripsia Percutânea Unilateral (Mec., E.H., Ou Us)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31101283",
    description: "Nefropexia Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31101291",
    description: "Nefrorrafia (Trauma) Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31101305",
    description: "Nefrostomia A Céu Aberto Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31101313",
    description: "Nefrostomia Percutânea Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31101321",
    description: "Nefroureterectomia Com Ressecção Vesical Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31101330",
    description: "Pielolitotomia Com Nefrolitotomia Anatrófica Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31101348",
    description: "Pielolitotomia Com Nefrolitotomia Simples Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31101356",
    description: "Pielolitotomia Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31101364",
    description: "Pieloplastia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31101372",
    description: "Pielostomia Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31101380",
    description: "Pielotomia Exploradora Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31101399",
    description: "Punção Aspirativa Renal Para Diagnóstico De Rejeição (Ato Médico)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "31101402",
    description: "Punção Biópsia Renal Percutânea",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "31101410",
    description: "Revascularização Renal - Qualquer Técnica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31101429",
    description: "Sinfisiotomia (Rim Em Ferradura)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31101437",
    description: "Transuretero Anastomose",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31101445",
    description: "Tratamento Cirúrgico Da Fístula Pielo-Intestinal",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31101453",
    description: "Tumor Renal - Enucleação Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31101461",
    description: "Tumor Wilms - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31101470",
    description: "Tumores Retro-Peritoneais  Malignos Unilaterais - Exérese",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31101488",
    description: "Adrenalectomia Laparoscópica Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "7"
  },
  {
    code: "31101496",
    description: "Marsupialização Laparoscópica De Cisto Renal Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31101500",
    description: "Biópsia Renal Laparoscópica Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31101518",
    description: "Nefropexia Laparoscópica Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31101526",
    description: "Pieloplastia Laparoscópica Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31101534",
    description: "Pielolitotomia Laparoscópica Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31101542",
    description: "Nefroureterectomia Com Ressecção Vesical Laparoscópica Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31101550",
    description: "Nefrectomia Radical Laparoscópica Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31101569",
    description: "Nefrectomia Parcial Laparoscópica Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31101577",
    description: "Nefrolitotripsia Percutânea Unilateral A Laser",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31101585",
    description: "Nefrectomia Total Unilateral Por Videolaparoscopia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31101593",
    description: "Cisto De Supra-Renal - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31102018",
    description: "Biópsia Cirúrgica De Ureter Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "31102026",
    description: "Biópsia Endoscópica De Ureter Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "31102034",
    description: "Cateterismo Ureteral Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "31102042",
    description: "Colocação Cirúrgica De Duplo J Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31102050",
    description: "Colocação Cistoscópica De Duplo J Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "31102069",
    description: "Colocação Nefroscópica De Duplo J Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31102077",
    description: "Colocação Ureteroscópica De Duplo J Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31102085",
    description: "Dilatação Endoscópica Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "31102093",
    description: "Duplicação Pieloureteral - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31102107",
    description: "Fístula Uretero-Cutânea Unilateral (Tratamento Cirúrgico)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31102115",
    description: "Fístula Uretero-Intestinal Unilateral (Tratamento Cirúrgico)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31102123",
    description: "Fístula Uretero-Vaginal Unilateral (Tratamento Cirúrgico)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31102131",
    description: "Meatotomia Endoscópica Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "31102174",
    description: "Reimplante Ureterointestinal Uni Ou Bilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31102182",
    description: "Reimplante Ureteral Por Via Extra Ou Intravesical Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31102204",
    description: "Reimplante Uretero-Vesical Unilateral - Via Combinada",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31102220",
    description: "Retirada Endoscópica De Cálculo De Ureter Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31102239",
    description: "Transureterostomia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31102247",
    description: "Ureterectomia Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31102255",
    description: "Ureterocele Unilateral - Ressecção A Céu Aberto",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31102263",
    description: "Ureteroceles - Tratamento Endoscópico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31102271",
    description: "Ureteroileocistostomia Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "7"
  },
  {
    code: "31102280",
    description: "Ureteroileostomia Cutânea Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31102298",
    description: "Ureterólise Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31102301",
    description: "Ureterolitotomia Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31102310",
    description: "Ureterolitotripsia Extracorpórea - 1ª Sessão",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31102328",
    description: "Ureterolitotripsia Extracorpórea - Reaplicações (Até 3 Meses)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31102344",
    description: "Ureteroplastia Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31102352",
    description: "Ureterorrenolitotomia Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31102360",
    description: "Ureterorrenolitotripsia Flexível A Laser Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31102379",
    description: "Ureterorrenolitotripsia Rígida Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31102409",
    description: "Ureterossigmoidoplastia Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31102417",
    description: "Ureterossigmoidostomia Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31102425",
    description: "Ureterostomia Cutânea Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31102433",
    description: "Ureterotomia Interna Percutânea Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31102441",
    description: "Ureterotomia Interna Ureteroscópica Flexível Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31102450",
    description: "Ureterotomia Interna Ureteroscópica Rígida Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31102468",
    description: "Ureteroureterocistoneostomia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31102476",
    description: "Ureteroureterostomia Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31102492",
    description: "Ureterolitotomia Laparoscópica Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31102506",
    description: "Ureterólise Laparoscópica Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31102514",
    description: "Ureteroureterostomia Laparoscópica Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31102522",
    description: "Ureteroplastia Laparoscópica Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31102530",
    description: "Correção Laparoscópica De Refluxo Vesico-Ureteral Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31102549",
    description: "Reimplante Uretero-Vesical Laparoscópico Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31102557",
    description: "Reimplante Ureterointestinal Laparoscópico Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31102565",
    description: "Ureterorrenolitotripsia Rígida Unilateral A Laser",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31102573",
    description: "Ureteroenterostomia Cutânea - Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31102581",
    description: "Ureterolitotripsia Transureteroscópica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31102590",
    description: "Refluxo Vésico-Ureteral - Tratamento Endoscópico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31103014",
    description: "Ampliação Vesical",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31103022",
    description: "Bexiga Psóica - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31103030",
    description: "Biópsia Endoscópica De Bexiga (Inclui Cistoscopia)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "31103049",
    description: "Biópsia Vesical A Céu Aberto",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "31103057",
    description: "Cálculo Vesical - Extração Endoscópica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31103065",
    description: "Cistectomia Parcial",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31103073",
    description: "Cistectomia Radical (Inclui Próstata Ou Útero)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31103081",
    description: "Cistectomia Total",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31103090",
    description: "Cistolitotomia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "31103103",
    description: "Cistolitotripsia Extracorpórea - 1ª Sessão",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31103111",
    description: "Cistolitotripsia Extracorpórea - Reaplicações (Até 3 Meses)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31103138",
    description: "Cistolitotripsia Percutânea (U.S., E.H., E.C.)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31103146",
    description: "Cistolitotripsia Transuretral (U.S., E.H., E.C.)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31103154",
    description: "Cistoplastia Redutora",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31103162",
    description: "Cistorrafia (Trauma)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31103170",
    description: "Cistostomia Cirúrgica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "31103189",
    description: "Cistostomia Com Procedimento Endoscópico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31103197",
    description: "Cistostomia Por Punção Com Trocater",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "31103200",
    description: "Colo De Divertículo - Ressecção Endoscópica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31103219",
    description: "Colo Vesical - Ressecção Endoscópica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31103227",
    description: "Corpo Estranho - Extração Cirúrgica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "31103235",
    description: "Corpo Estranho - Extração Endoscópica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "31103243",
    description: "Diverticulectomia Vesical",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31103251",
    description: "Enterocistoplastia (Ampliação Vesical)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31103260",
    description: "Extrofia Em Cloaca - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31103278",
    description: "Extrofia Vesical - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31103286",
    description: "Fístula Vésico-Cutânea - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31103294",
    description: "Fístula Vésico-Entérica - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31103308",
    description: "Fístula Vésico-Retal - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31103316",
    description: "Fístula Vésico-Uterina - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31103324",
    description: "Fístula Vésico-Vaginal - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31103332",
    description: "Incontinência Urinária - Sling Vaginal Ou Abdominal",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31103340",
    description: "Incontinência Urinária - Suspensão Endoscópica De Colo",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31103359",
    description: "Incontinência Urinária - Tratamento Cirúrgico Supra-Púbico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31103367",
    description: "Incontinência Urinária - Tratamento Endoscópico (Injeção)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31103375",
    description: "Incontinência Urinária Com Colpoplastia Anterior - Tratamento Cirúrgico (Com Ou Sem Uso De Prótese)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31103383",
    description: "Pólipos Vesicais - Ressecção Cirúrgica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31103391",
    description: "Pólipos Vesicais - Ressecção Endoscópica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "31103405",
    description: "Punção E Aspiração Vesical",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "31103413",
    description: "Reimplante Uretero-Vesical À Boari",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31103430",
    description: "Retenção Por Coágulo - Aspiração Vesical",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "31103448",
    description: "Tumor Vesical - Fotocoagulação A Laser",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31103456",
    description: "Tumor Vesical - Ressecção Endoscópica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31103464",
    description: "Vesicostomia Cutânea",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31103472",
    description: "Retirada Endoscópica De Duplo J",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "31103480",
    description: "Neobexiga Cutânea Continente",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "7"
  },
  {
    code: "31103499",
    description: "Neobexiga Retal Continente",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "7"
  },
  {
    code: "31103502",
    description: "Neobexiga Uretral Continente",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "7"
  },
  {
    code: "31103510",
    description: "Correção Laparoscópica De Incontinência Urinária",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31103529",
    description: "Cistectomia Parcial Laparoscópica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31103537",
    description: "Cistectomia Radical Laparoscópica (Inclui Próstata Ou Útero)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "7"
  },
  {
    code: "31103545",
    description: "Neobexiga Laparoscópica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "8"
  },
  {
    code: "31103553",
    description: "Diverticulectomia Vesical Laparoscópica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31103561",
    description: "Cistolitotripsia A Laser",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31103570",
    description: "Colo Vesical - Ressecção Cirúrgica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31103596",
    description: "Tratamento da hiperatividade vesical: injeção intravesical de toxina botulínica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31104010",
    description: "Abscesso Periuretral - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "31104029",
    description: "Biópsia Endoscópica De Uretra",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "31104037",
    description: "Corpo Estranho Ou Cálculo - Extração Cirúrgica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "31104045",
    description: "Corpo Estranho Ou Cálculo - Extração Endoscópica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "31104053",
    description: "Divertículo Uretral - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "31104061",
    description: "Eletrocoagulação Endoscópica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "31104070",
    description: "Esfincterotomia - Uretra",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "31104088",
    description: "Fístula Uretro-Cutânea - Correção Cirúrgica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31104096",
    description: "Fístula Uretro-Retal - Correção Cirúrgica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31104100",
    description: "Fístula Uretro-Vaginal - Correção Cirúrgica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31104118",
    description: "Incontinência Urinária Masculina - Tratamento Cirúrgico (Exclui Implante De Esfincter Artificial)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31104126",
    description: "Injeções Periuretrais (Incluindo Uretrocistocopia) Por Tratamento",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31104134",
    description: "Meatoplastia (Retalho Cutâneo)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31104142",
    description: "Meatotomia Uretral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "31104150",
    description: "Neouretra Proximal (Cistouretroplastia)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31104169",
    description: "Ressecção De Carúncula",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "31104177",
    description: "Ressecção De Válvula Uretral Posterior",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31104185",
    description: "Tumor Uretral - Excisão",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31104193",
    description: "Uretroplastia Anterior",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31104207",
    description: "Uretroplastia Posterior",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31104215",
    description: "Uretrostomia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "31104223",
    description: "Uretrotomia Interna",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "31104231",
    description: "Uretrotomia Interna Com Prótese Endouretral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31104240",
    description: "Uretrectomia Total",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31104258",
    description: "Ressecção De Corda Da Uretra",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "31104274",
    description: "Incontinência Urinária Masculina - Sling",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31104282",
    description: "Incontinência Urinária Masculina - Esfincter Artificial",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31201016",
    description: "Ablação Prostática A Laser",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31201024",
    description: "Abscesso De Próstata - Drenagem",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "31201032",
    description: "Biópsia Prostática - Até 8 Fragmentos",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "31201040",
    description: "Biópsia Prostática - Mais De 8 Fragmentos",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "31201059",
    description: "Eletrovaporização De Próstata",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31201067",
    description: "Hemorragia Da Loja Prostática - Evacuação E Irrigação",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "31201075",
    description: "Hemorragia Da Loja Prostática - Revisão Endoscópica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31201083",
    description: "Hipertrofia Prostática - Hipertermia Ou Termoterapia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "31201091",
    description: "Hipertrofia Prostática - Implante De Prótese",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31201105",
    description: "Hipertrofia Prostática - Tratamento Por Dilatação",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31201113",
    description: "Prostatavesiculectomia Radical",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31201121",
    description: "Prostatectomia A Céu Aberto",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31201130",
    description: "Ressecção Endoscópica Da Próstata",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31201148",
    description: "Prostatavesiculectomia Radical Laparoscópica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "7"
  },
  {
    code: "31201156",
    description: "Exérese Laparoscópica De Cisto De Vesícula Seminal Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31201164",
    description: "Hipertrofia Prostática - Tratamento Por Diatemia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "31202012",
    description: "Biópsia Escrotal",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "31202020",
    description: "Drenagem De Abscesso - Escroto",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "31202039",
    description: "Elefantíase Peno-Escrotal - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31202047",
    description: "Exérese De Cisto Escrotal",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "31202055",
    description: "Plástica Escrotal",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31202063",
    description: "Reconstrução Da Bolsa Escrotal Com Retalho Inguinal Pediculado - Por Estágio",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31202071",
    description: "Ressecção Parcial Da Bolsa Escrotal",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31203019",
    description: "Autotransplante De Um Testículo",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31203027",
    description: "Biópsia Unilateral De Testículo",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "31203035",
    description: "Escroto Agudo - Exploração Cirúrgica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31203043",
    description: "Hidrocele Unilateral - Correção Cirúrgica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "31203051",
    description: "Implante De Prótese Testicular Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "31203060",
    description: "Orquidopexia Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31203078",
    description: "Orquiectomia Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "31203086",
    description: "Punção Da Vaginal",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "31203094",
    description: "Reparação Plástica (Trauma)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31203108",
    description: "Torção De Testículo - Cura Cirúrgica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31203116",
    description: "Tumor De Testículo - Ressecção",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31203124",
    description: "Varicocele Unilateral - Correção Cirúrgica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "31203132",
    description: "Orquidopexia Laparoscópica Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31203140",
    description: "Orquiectomia Intra-Abdominal Laparoscópica Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31203159",
    description: "Correção Laparoscópica De Varicocele Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31204015",
    description: "Biópsia De Epidídimo",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "31204023",
    description: "Drenagem De Abscesso - Epidídimo",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "31204031",
    description: "Epididimectomia Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "31204040",
    description: "Epididimovasoplastia Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31204058",
    description: "Epididimovasoplastia Unilateral Microcirúrgica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31204066",
    description: "Exérese De Cisto Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "31205011",
    description: "Espermatocelectomia Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "31205020",
    description: "Exploração Cirúrgica Do Deferente Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "31205038",
    description: "Recanalização Dos Ductus Deferentes",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31205046",
    description: "Vasectomia Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "31205070",
    description: "Cirurgia Esterilizadora Masculina",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "31205089",
    description: "Vasostomia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "31206018",
    description: "Amputação Parcial",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "31206026",
    description: "Amputação Total",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31206034",
    description: "Biópsia Peniana",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "31206042",
    description: "Doença De Peyronie - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31206050",
    description: "Eletrocoagulação De Lesões Cutâneas",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "31206069",
    description: "Emasculação",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31206077",
    description: "Epispadia - Reconstrução Por Etapa",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31206085",
    description: "Epispadia Com Incontinência - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31206093",
    description: "Fratura De Pênis - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31206107",
    description: "Hipospadia - Por Estágio - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31206115",
    description: "Hipospadia Distal - Tratamento Em 1 Tempo - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31206123",
    description: "Hipospadia Proximal - Tratamento Em 1 Tempo - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31206131",
    description: "Implante De Prótese Inflável",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31206140",
    description: "Implante De Prótese Semi-Rígida (Exclui Próteses Infláveis)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31206158",
    description: "Neofaloplastia - Por Estágio",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31206166",
    description: "Neofaloplastia Com Retalho Inguinal Pediculado Com Reconstrução Uretral - Por Estágio",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31206174",
    description: "Parafimose - Redução Manual Ou Cirúrgica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "31206182",
    description: "Pênis Curvo Congênito - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31206190",
    description: "Plástica - Retalho Cutâneo À Distância",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31206204",
    description: "Plástica De Corpo Cavernoso",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31206212",
    description: "Plástica Do Freio Bálano-Prepucial",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "31206220",
    description: "Postectomia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "31206239",
    description: "Priapismo - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31206247",
    description: "Reconstrução De Pênis Com Enxerto - Plástica Total",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31206255",
    description: "Reimplante Do Pênis",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31206263",
    description: "Revascularização Peniana",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31301010",
    description: "Bartolinectomia Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "31301029",
    description: "Biópsia De Vulva",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "31301037",
    description: "Cauterização Química, Ou Eletrocauterização, Ou Criocauterização De Lesões Da Vulva (Por Grupo De Até 5 Lesões)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "31301045",
    description: "Clitorectomia (Parcial Ou Total)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "31301053",
    description: "Clitoroplastia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31301061",
    description: "Excisão Radical Local Da Vulva (Não Inclui A Linfadenectomia)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31301070",
    description: "Exérese De Glândula De Skene",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "31301088",
    description: "Exérese De Lesão Da Vulva E/Ou Do Períneo (Por Grupo De Até 5 Lesões)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31301096",
    description: "Hipertrofia Dos Pequenos Lábios - Correção Cirúrgica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "31301100",
    description: "Incisão E Drenagem Da Glândula De Bartholin Ou Skene",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "31301118",
    description: "Marsupialização Da Glândula De Bartholin",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "31301126",
    description: "Vulvectomia Ampliada (Não Inclui A Linfadenectomia)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31301134",
    description: "Vulvectomia Simples",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31302017",
    description: "Biópsia De Vagina",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "31302025",
    description: "Colpectomia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31302033",
    description: "Colpocleise (Lefort)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "31302041",
    description: "Colpoplastia Anterior",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "31302050",
    description: "Colpoplastia Posterior Com Perineorrafia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31302068",
    description: "Colporrafia Ou Colpoperineoplastia Incluindo Ressecção De Septo Ou Ressutura De Parede Vaginal",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31302076",
    description: "Colpotomia Ou Culdocentese",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "31302084",
    description: "Exérese De Cisto Vaginal",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "31302092",
    description: "Extração De Corpo Estranho Com Anestesia Geral Ou Bloqueio",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "31302106",
    description: "Fístula Ginecológica - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31302114",
    description: "Himenotomia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "31302122",
    description: "Neovagina (Cólon, Delgado, Tubo De Pele)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31302130",
    description: "Cauterização Química, Ou Eletrocauterização, Ou Criocauterização De Lesões Da Vagina (Por Grupo De Até 5 Lesões)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "31303013",
    description: "Aspiração Manual Intra-Uterina (Amiu)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "31303021",
    description: "Biópsia Do Colo Uterino",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "31303030",
    description: "Biópsia Do Endométrio",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "31303056",
    description: "Curetagem Ginecológica Semiótica E/Ou Terapêutica Com Ou Sem Dilatação De Colo Uterino",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "31303064",
    description: "Dilatação Do Colo Uterino",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "31303072",
    description: "Excisão De Pólipo Cervical",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "31303080",
    description: "Histerectomia Subtotal Com Ou Sem Anexectomia, Uni Ou Bilateral - Qualquer Via",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31303102",
    description: "Histerectomia Total - Qualquer Via",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31303110",
    description: "Histerectomia Total Ampliada - Qualquer Via - (Não Inclui A Linfadenectomia Pélvica)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31303129",
    description: "Histerectomia Total Com Anexectomia Uni Ou Bilateral - Qualquer Via",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31303137",
    description: "Metroplastia (Strassmann Ou Outra Técnica)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31303145",
    description: "Miomectomia Uterina",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31303153",
    description: "Traquelectomia - Amputação, Conização - (Com Ou Sem Cirurgia De Alta Frequência / Caf)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31303161",
    description: "Traquelectomia Radical (Não Inclui A Linfadenectomia)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31303170",
    description: "Histeroscopia Cirúrgica Com Biópsia E/Ou Curetagem Uterina, Lise De Sinéquias, Retirada De Corpo Estranho",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31303188",
    description: "Histeroscopia Com Ressectoscópio Para Miomectomia, Polipectomia, Metroplastia, Endometrectomia E Ressecção De Sinéquias",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31303196",
    description: "Cauterização Química, Ou Eletrocauterização, Ou Criocauterização De Lesões De Colo Uterino (Por Sessão)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "31303200",
    description: "Histerectomia Subtotal Laparoscópica Com Ou Sem Anexectomia, Uni Ou Bilateral - Via Alta",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31303218",
    description: "Histerectomia Total Laparoscópica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31303226",
    description: "Histerectomia Total Laparoscópica Ampliada",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "7"
  },
  {
    code: "31303234",
    description: "Histerectomia Total Laparoscópica Com Anexectomia Uni Ou Bilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31303242",
    description: "Metroplastia Laparoscópica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31303250",
    description: "Miomectomia Uterina Laparoscópica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31303269",
    description: "Implante de DIU não hormonal - inserção",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "31303285",
    description: "Histerectomia puerperal",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "31303293",
    description: "Implante de DIU hormonal - inserção",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "31303315",
    description: "Curetagem Uterina Pós-Parto",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "31303323",
    description: "Histerectomia Pós-Parto",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31304010",
    description: "Esterilização Tubária",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31304028",
    description: "Neossalpingostomia Distal",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31304036",
    description: "Recanalização Tubária (Qualquer Técnica), Uni Ou Bilateral (Com Microscópio Ou Lupa)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31304044",
    description: "Salpingectomia Uni Ou Bilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31304052",
    description: "Laqueadura Tubária Laparoscópica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31304060",
    description: "Neossalpingostomia Distal Laparoscópica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31304079",
    description: "Recanalização Tubária Laparoscópica Uni Ou Bilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31304087",
    description: "Salpingectomia Uni Ou Bilateral Laparoscópica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31305016",
    description: "Ooforectomia Uni Ou Bilateral Ou Ooforoplastia Uni Ou Bilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31305024",
    description: "Translocação De Ovários",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31305032",
    description: "Ooforectomia Laparoscópica Uni Ou Bilateral Ou Ooforoplastia Uni Ou Bilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31306012",
    description: "Correção De Defeito Lateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31306020",
    description: "Correção De Enterocele",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31306039",
    description: "Correção De Rotura Perineal De Iii  Grau  (Com Lesão  Do  Esfincter)  E  Reconstituição  Por  Plástica - Qualquer Técnica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31306047",
    description: "Perineorrafia (Não Obstétrica) E/Ou Episiotomia E/Ou Episiorrafia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "31306055",
    description: "Reconstrução Perineal Com Retalhos Miocutâneos",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31306063",
    description: "Ressecção De Tumor Do Septo Reto-Vaginal",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31306071",
    description: "Seio Urogenital - Plástica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31306080",
    description: "Retração Cicraticial Perineal",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31307019",
    description: "Câncer De Ovário (Debulking)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31307027",
    description: "Cirurgia (Via Alta  Ou  Baixa)  Do  Prolápso  De  Cúpula  Vaginal (Fixação  Sacral  Ou  No  Ligamento Sacro-Espinhoso) Qualquer Técnica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31307035",
    description: "Culdoplastia (Mac Call, Moschowicz, Etc.)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31307043",
    description: "Endometriose Peritonial - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31307051",
    description: "Epiploplastia Ou Aplicação De Membranas Antiaderentes",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31307060",
    description: "Laparoscopia Ginecológica Com Ou Sem Biópsia (Inclui A Cromotubagem)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31307078",
    description: "Liberação De Aderências Pélvicas Com Ou Sem Ressecção De Cistos Peritoniais Ou Salpingólise",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31307086",
    description: "Ligadura De Veia Ovariana",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31307094",
    description: "Ligamentopexia Pélvica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31307108",
    description: "Neurectomia Pré-Sacral Ou Do Nervo Gênito-Femoral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31307116",
    description: "Omentectomia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31307124",
    description: "Ressecção De Tumor De Parede Abdominal Pélvica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31307132",
    description: "Ressecção Ou Ligadura De Varizes Pélvicas",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31307140",
    description: "Secção De Ligamentos Útero-Sacros",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31307159",
    description: "Câncer De Ovário (Debulking) Laparoscópica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31307167",
    description: "Cirurgia Laparoscópica Do Prolapso De Cúpula Vaginal (Fixação Sacral Ou No Ligamento Sacro-Espinhoso)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31307175",
    description: "Culdoplastia Laparoscópica (Mac Call, Moschowicz, Etc)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31307183",
    description: "Endometriose Peritoneal - Tratamento Cirúrgico Via Laparoscópica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31307191",
    description: "Epiploplastia Ou Aplicação De Membranas Antiaderentes Via Laparoscópica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31307205",
    description: "Liberação Laparoscópica De Aderências Pélvicas Com Ou Sem Ressecção De Cistos Peritoneais Ou Salpingólise",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31307213",
    description: "Ligadura De Veia Ovariana Laparoscópica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31307221",
    description: "Ligamentopexia Pélvica Laparoscópica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31307230",
    description: "Neurectomia Laparoscópica Pré-Sacral Ou Do Nervo Gênito-Femoral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31307248",
    description: "Omentectomia Laparoscópica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31307256",
    description: "Ressecção Laparoscópica De Tumor De Parede Abdominal",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31307264",
    description: "Ressecção Ou Ligadura Laparoscópica De Varizes Pélvicas",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31307272",
    description: "Secção Laparoscópica De Ligamentos Útero-Sacros",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31307280",
    description: "Endometriose - tratamento cirúrgico via laparoscópica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "7"
  },
  {
    code: "31309011",
    description: "Amniorredução Ou Amnioinfusão",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "31309020",
    description: "Aspiração Manual Intra-Uterina (Amiu) Pós-Abortamento",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "31309038",
    description: "Assistência Ao Trabalho De Parto, Por Hora (Até O Limite De 6 Horas). Não Deverá Ser Considerado Se O Parto Ocorrer Na Primeira Hora Após O Início Da Assistência. Após A Primeira Hora, Além Da Assistência, Remunera-Se O Parto (Via Baixa Ou Cesariana)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "31309046",
    description: "Cerclagem Do Colo Uterino (Qualquer Técnica)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "31309054",
    description: "Cesariana",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31309062",
    description: "Curetagem Pós-Abortamento",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "31309089",
    description: "Gravidez  Ectópica - Cirurgia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31309097",
    description: "Maturação Cervical Para Indução De Abortamento Ou De Trabalho De Parto",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31309100",
    description: "Inversão Uterina Aguda - Redução Manual",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31309119",
    description: "Inversão Uterina - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31309127",
    description: "Parto (Via Vaginal)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31309135",
    description: "Parto Múltiplo (Cada Um Subsequente Ao Inicial/Final )",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31309143",
    description: "Punção escalpofetal para avaliação PH fetal",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "31309151",
    description: "Revisão Obstétrica De Parto Ocorrido Fora Do Hospital (Inclui Exame, Dequitação E Sutura De Lacerações Até De 2º Grau)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "31309178",
    description: "Versão Cefálica Externa",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "31309186",
    description: "Gravidez Ectópica - Cirurgia Laparoscópica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31309194",
    description: "Inversão Uterina - Tratamento Cirúrgico Laparoscópico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31309208",
    description: "Cesariana Com Histerectomia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31309216",
    description: "Cirurgia fetal guiada por ultrassonografia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31309224",
    description: "Cirurgia fetal endoscópica (guiada por ultrassonografia e fetoscópio)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31309232",
    description: "Intervenção do obstetra na cirurgia fetal a céu aberto",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31309240",
    description: "Cordocentese guiada por ultrassonografia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "31309259",
    description: "Amniodrenagem ou amnioinfusão guiadas por ultrassonografia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "31309283",
    description: "Cerclagem do colo uterino via abdominal",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31401015",
    description: "Biópsia Estereotáxica De Encéfalo",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31401023",
    description: "Cingulotomia Ou Capsulotomia Unilateral",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31401031",
    description: "Cirurgia Intracraniana Por Via Endoscópica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "7"
  },
  {
    code: "31401040",
    description: "Craniotomia Para Remoção De Corpo Estranho",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31401058",
    description: "Derivação Ventricular Externa",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31401066",
    description: "Drenagem Estereotáxica - Cistos, Hematomas Ou Abscessos",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31401074",
    description: "Hipofisectomia Por Qualquer Método",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31401082",
    description: "Implante De Cateter Intracraniano",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31401090",
    description: "Implante De Eletrodo Cerebral Profundo",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31401104",
    description: "Implante De Eletrodos Cerebral Ou Medular",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31401112",
    description: "Implante Estereotáxico De Cateter Para Braquiterapia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31401120",
    description: "Implante Intratecal De Bombas Para Infusão De Fármacos",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31401139",
    description: "Localização Estereotáxica De Corpo Estranho Intracraniano Com Remoção",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31401147",
    description: "Localização Estereotáxica De Lesões Intracranianas Com Remoção",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31401155",
    description: "Microcirurgia Para Tumores Intracranianos",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "7"
  },
  {
    code: "31401163",
    description: "Microcirurgia Por Via Transesfenoidal",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "7"
  },
  {
    code: "31401171",
    description: "Microcirurgia Vascular Intracraniana",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "7"
  },
  {
    code: "31401198",
    description: "Punção Subdural Ou Ventricular Transfontanela",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31401201",
    description: "Ressecção De Mucocele Frontal",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31401228",
    description: "Revisão De Sistema De Neuroestimulação",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31401236",
    description: "Sistema De Derivação Ventricular Interna Com Válvulas Ou Revisões",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31401244",
    description: "Terceiro Ventriculostomia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31401252",
    description: "Tratamento Cirúrgico Da Epilepsia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31401260",
    description: "Tratamento Cirúrgico Da Fístula Liquórica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31401279",
    description: "Tratamento Cirúrgico Da Meningoencefalocele",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31401287",
    description: "Tratamento Cirúrgico De Tumores Cerebrais Sem Microscopia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "7"
  },
  {
    code: "31401295",
    description: "Tratamento Cirúrgico Do Abscesso Encefálico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31401309",
    description: "Tratamento Cirúrgico Do Hematoma Intracraniano",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31401333",
    description: "Tratamento Pré-Natal Das Hidrocefalias E Cistos Cerebrais",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31401341",
    description: "Acesso Endoscópico Ao Tratamento Cirúrgico Dos Tumores Da Região Selar",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31401350",
    description: "Implantação De Halo Para Radiocirurgia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31401368",
    description: "Craniectomia Para Tumores Cerebelares",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31401376",
    description: "Craniotomia exploradora com ou sem biópsia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "31401384",
    description: "Traumatismo cranioencefálico - tratamento cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "31401392",
    description: "Trepanação Para Propedêutica Neurocirúrgica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "31401406",
    description: "Tumores Extracranianos - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31401414",
    description: "Localização/intervenção estereotáxica de lesões/estruturas de crânio por neuronavegação com intervenção",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31401422",
    description: "Tratamento radiocirúrgico cerebral ou medular",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "SP"
  },
  {
    code: "31402011",
    description: "Cordotomia-Mielotomias Por Radiofrequência",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31402020",
    description: "Lesão De Substância Gelatinosa Medular (Drez) Por Radiofrequência",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31402038",
    description: "Tampão Sanguíneo Peridural Para Tratamento De Cefaléia Após Punção (Não Indicada Na Profilaxia Da Cefaléia)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "31403018",
    description: "Biópsia De Nervo",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "31403026",
    description: "Bloqueio De Nervo Periférico - Nervos Periféricos",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "31403034",
    description: "Denervação Percutânea De Faceta Articular - Por Segmento",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31403042",
    description: "Enxerto De Nervo",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31403050",
    description: "Enxerto De Nervo Interfascicular, Pediculado (1º Estágio)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31403069",
    description: "Enxerto De Nervo Interfascicular, Pediculado (2º Estágio)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31403077",
    description: "Enxerto Interfascicular De Nervo Vascularizado",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31403085",
    description: "Enxerto Interfascicular",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31403093",
    description: "Enxerto Para Reparo De 2 Ou Mais Nervos",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31403107",
    description: "Excisão De Tumores De Nervos Periféricos Com Enxerto Interfascicular",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31403115",
    description: "Excisão De Tumores Dos Nervos Periféricos",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31403123",
    description: "Exploração Cirúrgica De Nervo (Neurólise Externa)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31403131",
    description: "Extirpação De Neuroma",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "31403140",
    description: "Implante De Gerador Para Neuroestimulação",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "31403158",
    description: "Lesão De Nervos Associada À Lesão Óssea - Tratamento Cirúrgico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31403166",
    description: "Lesão Estereotáxica De Estruturas Profundas Para Tratamento Da Dor Ou Movimento Anormal",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31403174",
    description: "Microcirurgia Do Plexo Braquial Com A Exploração, Neurólise E Enxertos Interfasciculares Para Reparo Das Lesões",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "7"
  },
  {
    code: "31403182",
    description: "Microcirurgia Do Plexo Braquial Com Exploração E Neurólise",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31403204",
    description: "Microneurólise Intraneural Ou Intrafascicular De Um Nervo",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31403212",
    description: "Microneurólise Intraneural Ou Intrafascicular De Dois Ou Mais Nervos",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31403220",
    description: "Microneurólise Múltiplas",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31403239",
    description: "Microneurólise Única",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31403255",
    description: "Microneurorrafia De Dedos Da Mão",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31403263",
    description: "Microneurorrafia Múltipla (Plexo Nervoso)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31403271",
    description: "Microneurorrafia Única",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31403280",
    description: "Neurólise Das Síndromes Compressivas",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31403298",
    description: "Neurotripsia (Cada Extremidade)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "31403301",
    description: "Reposição De Fármaco(S) Em Bombas Implantadas",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31403310",
    description: "Ressecção De Neuroma",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31403328",
    description: "Revisão De Sistema Implantados Para Infusão De Fármacos",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31403336",
    description: "Rizotomia Percutânea Por Segmento - Qualquer Método",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31403344",
    description: "Simpatectomia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31403352",
    description: "Transposição De Nervo",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "31403360",
    description: "Tratamento Microcirúrgico Das Neuropatias Compressivas (Tumoral, Inflamatório, Etc)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31403379",
    description: "Simpatectomia Por Videotoracoscopia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31403387",
    description: "Neurotomia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31404014",
    description: "Descompressão Vascular De Nervos Cranianos",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31404022",
    description: "Neurotomia Seletiva Do Trigêmio",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31404030",
    description: "Tratamento De Nevralgia Do Trigêmio Por Técnica Cirúrgica Percutânea - Qualquer Método (Quando Orientado Por Imagem, Cobrar Código Correspondente)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31405010",
    description: "Bloqueio Do Sistema Nervoso Autônomo",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "31405029",
    description: "Tratamento Cirúrgico De Lesão Do Sistema Nervoso Autônomo - Qualquer Método",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "31405037",
    description: "Tratamento Cirúrgico Da Síndrome Do Desfiladeiro Cérvico Torácico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31501010",
    description: "Transplante De Córnea",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31501028",
    description: "Retirada Para Transplante - Córnea",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "31506011",
    description: "Transplante Renal (Receptor)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "7"
  },
  {
    code: "31506038",
    description: "Nefrectomia Em Doador Vivo - Para Transplante",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31506046",
    description: "Nefrectomia Laparoscópica Em Doador Vivo - Para Transplante",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "31502016",
    description: "Transplante cardíaco (doador)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31502024",
    description: "Transplante cardíaco (receptor)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "8"
  },
  {
    code: "31503012",
    description: "Transplante cardiopulmonar (doador)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "8"
  },
  {
    code: "31503020",
    description: "Transplante cardiopulmonar (receptor)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "8"
  },
  {
    code: "31504019",
    description: "Transplante pulmonar (doador)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "8"
  },
  {
    code: "31504027",
    description: "Transplante pulmonar unilateral (receptor)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "8"
  },
  {
    code: "31505015",
    description: "Transplante hepático (receptor)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "8"
  },
  {
    code: "31505023",
    description: "Transplante hepático (doador)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "8"
  },
  {
    code: "31507018",
    description: "Transplante pancreático (receptor)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "7"
  },
  {
    code: "31507026",
    description: "Transplante pancreático (doador)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "31602010",
    description: "Analgesia Controlada Pelo Paciente - Por Dia Subsequente",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "31602029",
    description: "Analgesia Por Dia Subsequente. Acompanhamento De Analgesia Por Cateter Peridural",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "31602037",
    description: "Anestesia Geral Ou Condutiva Para Realização De Bloqueio Neurolítico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31602045",
    description: "Bloqueio Anestésico De Nervos Cranianos",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "31602053",
    description: "Bloqueio Anestésico De Plexo Celíaco",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "31602061",
    description: "Bloqueio Anestésico De Simpático Lombar",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "31602070",
    description: "Bloqueio Anestésico Simpático",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31602088",
    description: "Bloqueio De Articulação Têmporo-Mandibular",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "31602096",
    description: "Bloqueio De Gânglio Estrelado Com Anestésico Local",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "31602100",
    description: "Bloqueio De Gânglio Estrelado Com Neurolítico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31602118",
    description: "Bloqueio De Nervo Periférico - Bloqueios Anestésicos De Nervos E Estímulos Neurovasculares",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "31602126",
    description: "Bloqueio Facetário Para-Espinhoso",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31602134",
    description: "Bloqueio Neurolítico De Nervos Cranianos Ou Cérvico-Torácico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31602142",
    description: "Bloqueio Neurolítico Do Plexo Celíaco, Simpático Lombar Ou Torácico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31602150",
    description: "Bloqueio Neurolítico Peridural Ou Subaracnóideo",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "31602169",
    description: "Bloqueio Peridural Ou Subaracnóideo Com Corticóide",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "31602177",
    description: "Bloqueio Simpático Por Via Venosa",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "31602185",
    description: "Estimulação Elétrica Transcutânea",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "31602207",
    description: "Instalação De Bomba De Infusão Para Analgesia Em Dor Aguda Ou Crônica, Por Qualquer Via",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31602215",
    description: "Laser - Por Sessão",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "31602223",
    description: "Passagem De Catéter Peridural Ou Subaracnóideo Com Bloqueio De Prova",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "31602231",
    description: "Anestesia Para Endoscopia Diagnóstica",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31602240",
    description: "Anestesia Para Endoscopia Intervencionista",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31602258",
    description: "Anestesia Para Exames Radiológicos De Angiorradiologia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31602266",
    description: "Anestesia Para Exames De Ultrassonografia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "31602274",
    description: "Anestesia Para Exames De Tomografia Computadorizada",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "31602282",
    description: "Anestesia Para Exames De Ressonância Magnética",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31602290",
    description: "Anestesia Para Procedimentos De Radioterapia",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31602304",
    description: "Anestesia Para Exames Específicos, Teste Para Diagnóstico E Outros Procedimentos Diagnósticos",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "31602312",
    description: "Anestesia Para Procedimentos Clínicos Ambulatoriais E Hospitalares",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "1"
  },
  {
    code: "31602320",
    description: "Anestesia Para Procedimentos De Medicina Nuclear",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "31602339",
    description: "Bloqueio Anestésico De Plexos Nervosos (Lombossacro, Braquial, Cervical) Para Tratamento De Dor",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "31602347",
    description: "Anestesia realizada pelo anestesiologista em atos médicos que não tenham seus portes especialmente previstos ou para as situações de imperativo clínico",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "31603017",
    description: "Atendimento médico do plantonista em sala de recuperação pós-anestésica geral ou pediátrica, por paciente, por hora (até 6 horas)",
    chapter: "3",
    group: "Procedimentos Cirúrgicos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40101010",
    description: "Ecg Convencional De Até 12 Derivações",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40101029",
    description: "Ecg De Alta Resolução",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40101037",
    description: "Teste Ergométrico Computadorizado (Inclui Ecg Basal Convencional)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40101045",
    description: "Teste Ergométrico Convencional - 3 Ou Mais Derivações Simultâneas (Inclui Ecg Basal Convencional)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40101053",
    description: "Variabilidade Da Frequência Cardíaca",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "40101061",
    description: "Ergoespirometria Ou Teste Cardiopulmonar De Exercício Completo (Espirometria Forçada, Consumo De O2, Produção De Co2 E Derivados, Ecg, Oximetria)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40102017",
    description: "Bilimetria  gástrica ou esofágica de 24 horas",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40102025",
    description: "Manometria Computadorizada Anorretal",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40102033",
    description: "Manometria Computadorizada Anorretal Para Biofeedback - 1ª Sessão",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40102041",
    description: "Manometria Computadorizada Anorretal Para Biofeedback - Demais Sessões",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40102050",
    description: "Manometria Esofágica Computadorizada Com Teste Provocativo",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40102068",
    description: "Manometria Esofágica Computadorizada Sem Teste Provocativo",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40102076",
    description: "Manometria Esofágica Para Localização Dos Esfíncteres Pré-Ph-Metria",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40102084",
    description: "Ph-Metria Esofágica Computadorizada Com Um Canal",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40102092",
    description: "Ph-Metria Esofágica Computadorizada Com Dois Canais",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40102106",
    description: "Ph-Metria Esofágica Computadorizada Com Três Canais",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40102122",
    description: "pH-metria gástrica de 24 horas com quatro canais",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "40102130",
    description: "pH-metria esofágica de 24 horas com quatro canais",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "40103013",
    description: "Análise Computadorizada Da Voz",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40103021",
    description: "Análise computadorizada de papila e/ou fibras nervosas - monocular",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40103030",
    description: "Análise Computadorizada Do Segmento Anterior - Monocular",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40103048",
    description: "Audiometria (Tipo Von Bekesy)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40103056",
    description: "Potencial Evocado Estacionário (Steady State)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40103064",
    description: "Audiometria De Tronco Cerebral (Pea) Bera",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40103072",
    description: "Audiometria Tonal Limiar Com Testes De Discriminação",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40103080",
    description: "Audiometria Tonal Limiar Infantil Condicionada (Qualquer Técnica) - Peep-Show",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40103099",
    description: "Audiometria Vocal - Pesquisa De Limiar De Discriminação",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40103102",
    description: "Audiometria Vocal - Pesquisa De Limiar De Inteligibilidade",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40103110",
    description: "Audiometria Vocal Com Mensagem Competitiva (Ssi, Ssw)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40103129",
    description: "Avaliação Neurofisiológica  Da Função  Sexual (Inclui Eletroneuromiografia De Mmii, Rbc, Ncdp, Pegc)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40103137",
    description: "Campimetria Computadorizada - Monocular",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40103145",
    description: "Variação De Contingente Negativo (Pe/Tardio)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40103153",
    description: "Craniocorporografia",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40103161",
    description: "Decay Do Reflexo Estapédico",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40103170",
    description: "Eeg De Rotina",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40103188",
    description: "Eeg Intra-Operatório Para Monitorização Cirúrgica (Eeg/Io) - Por Hora De Monitorização",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40103196",
    description: "Eegq Quantitativo (Mapeamento Cerebral)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40103200",
    description: "Eletrencefalograma Especial: Terapia Intensiva, Morte Encefálica, Eeg Prolongado (Até 2 Horas)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40103234",
    description: "Eletrencefalograma Em Vigília, E Sono Espontâneo Ou Induzido",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40103242",
    description: "Eletro-Oculografia - Monocular",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40103250",
    description: "Eletro-Retinografia - Monocular",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40103269",
    description: "Eletrococleografia (Ecochg)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40103277",
    description: "Eletrocorticografia Intra-Operatória (Ecog) - Por Hora De Monitorização",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40103285",
    description: "Eletroglotografia",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40103307",
    description: "Eletroneuromiografia (Velocidade De Condução) Testes De Estímulos Para Paralisia Facial",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40103315",
    description: "Eletroneuromiografia De Mmii",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40103323",
    description: "Eletroneuromiografia De Mmss",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40103331",
    description: "Eletroneuromiografia De Mmss E Mmii",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40103358",
    description: "Eletroneuromiografia de segmento especial",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40103366",
    description: "Eletroneuromiografia Genitoperineal",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40103340",
    description: "Eletroneuromiografia de segmento complementar",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40103374",
    description: "Emg Com Registro De Movimento Involuntário (Teste Dinâmico De Escrita",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40103382",
    description: "Emg Para Monitoração De Quimodenervação (Por Sessão)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40103390",
    description: "Emg Quantitativa Ou Emg De Fibra Única",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40103404",
    description: "Espectrografia Vocal",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40103412",
    description: "Gustometria",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40103420",
    description: "Imitanciometria De Alta Frequência",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40103439",
    description: "Impedanciometria",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40103447",
    description: "Método De Proetz (Por Sessão)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40103455",
    description: "Otoemissões Acústicas Produto De Distorção",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40103463",
    description: "Otoemissões Evocadas Transientes",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40103480",
    description: "Pesquisa De Pares Cranianos Relacionados Com O Viii Par",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40103498",
    description: "Potencial Evocado Auditivo De Tronco Cerebral (Pea-Tc)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40103501",
    description: "Pesquisa Do Fenômeno De Tullio",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40103510",
    description: "Poligrafia De Recém-Nascido (Maior Ou Igual 2 Horas) (Pg/Rn)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40103528",
    description: "Polissonografia De Noite Inteira (Psg) (Inclui Polissonogramas)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40103536",
    description: "Polissonograma Com Eeg De Noite Inteira",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40103544",
    description: "Polissonograma Com Teste De Cpap Nasal",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40103552",
    description: "Posturografia",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40103560",
    description: "Potencial Evocado - P300",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40103579",
    description: "Potencial Evocado Auditivo De Média Latência (Pea-Ml) Bilateral",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40103587",
    description: "Potencial Somato-Sensitivo Para Localização Funcional Da Área Central (Monitorização Por Hora) Até 3 Horas",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40103595",
    description: "Potencial Evocado Gênito-Cortical (Pegc)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40103609",
    description: "Potencial Evocado Motor - Pem (Bilateral)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40103617",
    description: "Potencial Evocado Somato-Sensitivo - Membros Inferiores (Pess)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40103625",
    description: "Potencial Evocado Somato-Sensitivo - Membros Superiores (Pess)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40103633",
    description: "Potencial Evocado Visual (Pev)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40103641",
    description: "Provas De Função Tubária",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40103650",
    description: "Registro Do Nistagmo Pendular",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40103668",
    description: "Rinomanometria Computadorizada",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40103676",
    description: "Rinometria Acústica",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40103684",
    description: "Reflexo Cutâneo-Simpático",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40103714",
    description: "Teste De Estimulação Repetitiva (Um Ou Mais Músculos)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40103722",
    description: "Teste De Fístula Perilinfática Com Eletronistagmografia",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40103730",
    description: "Teste De Latências Múltiplas De Sono (Tlms) Diurno Pós Psg",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40103749",
    description: "Vectoeletronistagmografia - Computadorizada",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40103757",
    description: "Vídeo-Eletrencefalografia Contínua Não Invasiva - 12 Horas (Vídeo Eeg/Nt)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40103765",
    description: "Videonistagmografia Infravermelha",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40103781",
    description: "Audiometria Ocupacional Ou De Seleção",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "40103803",
    description: "Avaliação da função auditiva central",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "40103811",
    description: "Eletrodiagnóstico",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "40103820",
    description: "Pesquisa do nistagmo optocinético",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "40103870",
    description: "Potencial evocado do nervo trigêmeo",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "40103889",
    description: "Processamento Auditivo Central Infantil (De 3 A 7 Anos)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40103897",
    description: "Processamento Auditivo Central (A Partir Dos 7 Anos E Adulto)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40103910",
    description: "Vídeoeletroencefalograma contínua invasiva para avaliação de tratamento cirúrgico de epilepsia - a cada 12 horas",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40104010",
    description: "Avaliação Muscular Por Dinamometria Computadorizada (Isocinética) - Por Articulação",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40104028",
    description: "Cronaximetria",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40104036",
    description: "Curva  I/T - Medida De Latência De Nervo Periférico",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40104044",
    description: "Ergotonometria Músculo-Esquelético (Tetra, Paraparesia E Hemiparesia)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40104125",
    description: "Sistema Tridimensional De Avaliação Do Movimento Que Inclui Vídeo Acoplado À Plataforma Da Força E Eletromiografia",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40105016",
    description: "Determinação Das Pressões Respiratórias Máximas",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40105024",
    description: "Determinação Dos Volumes Pulmonares Por Diluição De Gases",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40105032",
    description: "Determinação Dos Volumes Pulmonares Por Pletismografia",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40105040",
    description: "Medida Da Difusão Do Monóxido De Carbono",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40105059",
    description: "Medida De Pico De Fluxo Expiratório",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40105067",
    description: "Medida Seriada Por 3 Semanas Do Pico De Fluxo Expiratório",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40105075",
    description: "Prova De Função Pulmonar Completa (Ou Espirometria)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40105083",
    description: "Resistência Das Vias Aéreas Por Oscilometria",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40105091",
    description: "Resistência Das Vias Aéreas Por Pletismografia",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40105113",
    description: "Regulação Ventilatória - 1) Medida De Ventilação E Do Padrão Ventilatório",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "40105121",
    description: "Regulação Ventilatória - 2) Determinação Da Pressão De Oclusão",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "40105130",
    description: "Regulação Ventilatória - 3) Resposta A Hipoxia E Hipercapnia",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "40105148",
    description: "Espirometria",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "40201015",
    description: "Amnioscopia",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40201023",
    description: "Anuscopia (Interna E Externa)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40201031",
    description: "Broncoscopia Com Biópsia Transbrônquica",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40201058",
    description: "Broncoscopia Com Ou Sem Aspirado Ou Lavado Brônquico Bilateral",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40201066",
    description: "Cistoscopia E/Ou Uretroscopia",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40201074",
    description: "Colangiopancreatografia Retrógrada Endoscópica",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40201082",
    description: "Colonoscopia (Inclui A Retossigmoidoscopia)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40201090",
    description: "Colonoscopia Com Magnificação",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40201104",
    description: "Ecoendoscopia Alta",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40201112",
    description: "Ecoendoscopia Baixa",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40201120",
    description: "Endoscopia Digestiva Alta",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40201139",
    description: "Endoscopia Digestiva Alta Com Magnificação",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40201147",
    description: "Enteroscopia",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40201155",
    description: "Histeroscopia Diagnóstica Com Biópsia",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40201163",
    description: "Laparoscopia",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40201171",
    description: "Retossigmoidoscopia Flexível",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40201180",
    description: "Retossigmoidoscopia Rígida",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40201198",
    description: "Vídeo-Endoscopia Do Esfíncter Velo-Palatino Com Ótica Flexível",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40201201",
    description: "Vídeo-Endoscopia Do Esfíncter Velo-Palatino Com Ótica Rígida",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "40201210",
    description: "Vídeo-Endoscopia Naso-Sinusal Com Ótica Flexível",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40201228",
    description: "Vídeo-Endoscopia Naso-Sinusal Com Ótica Rígida",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40201236",
    description: "Vídeo-Laringo-Estroboscopia Com Endoscópio Flexível",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40201244",
    description: "Vídeo-Laringo-Estroboscopia Com Endoscópio Rígido",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40201252",
    description: "Vídeo-Faringo-Laringoscopia Com Endoscópio Flexível",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40201260",
    description: "Vídeo-Faringo-Laringoscopia Com Endoscópio Rígido",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40201279",
    description: "Ureteroscopia Flexível Unilateral",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40201287",
    description: "Ureteroscopia Rígida Unilateral",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40201309",
    description: "Avaliação Endoscópica Da Deglutição (Fees)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40201317",
    description: "Medida De Pressão De Varizes De Esôfago Endoscópica",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40201325",
    description: "Videoquimografia Laríngea",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40201333",
    description: "Endoscopia Digestiva Alta Com Cromoscopia",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40201341",
    description: "Enteroscopia Do Intestino Delgado Com Cápsula Endoscópica",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40201350",
    description: "Colonoscopia com cromoscopia",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "54020103",
    description: "Enteroscopia por Cápsula Endoscópica (com OPME) - pacote",
    chapter: "5",
    group: "Outros",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "40202011",
    description: "Aritenoidectomia Microcirúrgica Endoscópica",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40202038",
    description: "Endoscopia Digestiva Alta Com Biópsia E/Ou Citologia",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40202046",
    description: "Biópsias Por Laparoscopia",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40202054",
    description: "Broncoscopia Com Biópsia Transbrônquica Com Acompanhamento Radioscópico",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40202062",
    description: "Cecostomia",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40202070",
    description: "Cistoenterostomia Com Colocação De Prótese Ou Dreno",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40202089",
    description: "Colagem De Fístula Por Via Endoscópica",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40202097",
    description: "Colocação De Cânula Sob Orientação Endoscópica",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40202100",
    description: "Colocação De Cateter Para Braquiterapia Endobrônquica",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40202119",
    description: "Colocação De Prótese Coledociana Por Via Endoscópica",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40202127",
    description: "Colocação De Prótese Traqueal Ou Brônquica",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40202135",
    description: "Colonoscopia Com Magnificação E Tatuagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40202143",
    description: "Descompressão Colônica Por Colonoscopia",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40202151",
    description: "Desobstrução Brônquica Com Laser Ou Eletrocautério",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40202160",
    description: "Desobstrução Brônquica Por Broncoaspiração",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40202178",
    description: "Dilatação De Estenose Laringo-Traqueo-Brônquica",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40202186",
    description: "Dilatação Instrumental Do Esôfago, Estômago Ou Duodeno",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40202194",
    description: "Dilatação Instrumental E Injeção De Substância Medicamentosa Por Endoscopia",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40202208",
    description: "Diverticulotomia - Aparelho Digestivo",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40202216",
    description: "Drenagem Cavitária Por Laparoscopia",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40202224",
    description: "Ecoendoscopia Com Cistoenterostomia",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40202232",
    description: "Ecoendoscopia Com Neurólise De Plexo Celíaco",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40202240",
    description: "Ecoendoscopia Com Punção Por Agulha",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40202259",
    description: "Esclerose De Varizes De Esôfago, Estômago Ou Duodeno",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40202267",
    description: "Estenostomia Endoscópica",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40202283",
    description: "Gastrostomia Endoscópica",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40202291",
    description: "Hemostasia Mecânica Do Esôfago, Estômago Ou Duodeno",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40202305",
    description: "Hemostasia Térmica Por Endoscopia",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40202313",
    description: "Hemostasias De Cólon",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40202330",
    description: "Injeção De Substância Medicamentosa Por Endoscopia",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40202348",
    description: "Introdução De Prótese No Esôfago",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40202356",
    description: "Jejunostomia Endoscópica",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40202364",
    description: "Laringoscopia Com Microscopia Para Exérese De Pólipo/Nódulo/Papiloma",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40202372",
    description: "Laringoscopia Com Retirada De Corpo Estranho De Laringe/Faringe (Tubo Flexível)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40202399",
    description: "Laringoscopia/Traqueoscopia Com Exérese De Pólipo/Nódulo/Papiloma",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40202410",
    description: "Laringoscopia/traqueoscopia com retirada de corpo estranho (tubo rígido)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "40202429",
    description: "Laringoscopia/Traqueoscopia Para Diagnóstico E Biópsia (Tubo Rígido)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40202437",
    description: "Laringoscopia/Traqueoscopia Para Diagnóstico E Biópsia Com Aparelho Flexível",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40202445",
    description: "Laringoscopia/Traqueoscopia Para Intubação Oro Ou Nasotraqueal",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40202453",
    description: "Ligadura Elástica Do Esôfago, Estômago Ou Duodeno",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40202470",
    description: "Mucosectomia",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40202488",
    description: "Nasofibrolaringoscopia Para Dignóstico E/Ou Biópsia",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "40202496",
    description: "Papilotomia Biópsia E/Ou Citologia Biliar E Pancreática",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40202500",
    description: "Papilotomia E Dilatação Biliar Ou Pancreática",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40202518",
    description: "Papilotomia Endoscópica (Para Retirada De Cálculos Coledocianos Ou Drenagem Biliar)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40202526",
    description: "Papilotomia, Dilatação E Colocação De Prótese Ou Dreno Biliar Ou Pancreático",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40202534",
    description: "Passagem De Sonda Naso-Enteral",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40202542",
    description: "Polipectomia De Cólon (Independente Do Número De Pólipos)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40202550",
    description: "Polipectomia Do Esôfago, Estômago Ou Duodeno (Independente Do Número De Pólipos)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40202569",
    description: "Retirada De Corpo Estranho Do Cólon",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40202577",
    description: "Retirada De Corpo Estranho Do Esôfago, Estômago Ou Duodeno",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40202585",
    description: "Retirada De Corpo Estranho No Brônquio Ou Brônquico",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40202593",
    description: "Retirada De Tumor Ou Papiloma Por Broncoscopia",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40202607",
    description: "Tamponamento De Varizes Do Esôfago E Estômago",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40202615",
    description: "Endoscopia Digestiva Alta Com Biópsia E Teste De Urease (Pesquisa Helicobacter Pylori)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40202623",
    description: "Traqueostomia Por Punção Percutânea",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40202631",
    description: "Tratamento Endoscópico De Hemoptise",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40202640",
    description: "Uretrotomia Endoscópica",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40202666",
    description: "Colonoscopia Com Biópsia E/Ou Citologia",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40202674",
    description: "Colonoscopia Com Dilatação Segmentar",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40202682",
    description: "Retossigmoidoscopia Flexível Com Polipectomia",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40202690",
    description: "Retossigmoidoscopia Flexível Com Biópsia E/Ou Citologia",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40202704",
    description: "Colonoscopia Com Estenostomia",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40202712",
    description: "Colonoscopia Com Mucosectomia",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40202720",
    description: "Retossigmoidoscopia Rígida Com Biópsia E/Ou Citologia",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40202739",
    description: "Retossigmoidoscopia Rígida Com Polipectomia",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40202747",
    description: "Endoscopia Digestiva Alta Com Cromoscopia E Biópsia E/Ou Citologia",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40202755",
    description: "Colonoscopia Com Tratamento De Fístula",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40202763",
    description: "Laringoscopia/Traqueoscopia Com Laser Para Exérese De Papiloma/Tumor",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40202780",
    description: "Biópsia endoscópica por órgão",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40202795",
    description: "Ecobroncoscopia com punção aspirativa com agulha fina",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40301010",
    description: "3-Metil Histidina, Pesquisa E/Ou Dosagem No Soro",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40301028",
    description: "5-Nucleotidase - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40301036",
    description: "Acetaminofen - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40301044",
    description: "Acetilcolinesterase, Em Eritrócitos - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40301052",
    description: "Acetona, Pesquisa E/Ou Dosagem No Soro",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40301060",
    description: "Ácido Ascórbico (Vitamina C) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40301079",
    description: "Ácido Beta Hidroxi Butírico - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40301087",
    description: "Ácido Fólico, Pesquisa E/Ou Dosagem Nos Eritrócitos",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40301095",
    description: "Ácido Glioxílico - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40301109",
    description: "Ácido Láctico (Lactato) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40301117",
    description: "Ácido Orótico - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40301125",
    description: "Ácido Oxálico - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40301133",
    description: "Ácido Pirúvico - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40301141",
    description: "Ácido Siálico - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40301150",
    description: "Ácido Úrico - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40301168",
    description: "Ácido Valpróico - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40301176",
    description: "Ácidos Biliares - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40301184",
    description: "Ácidos Graxos Livres - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40301192",
    description: "Ácidos Orgânicos (Perfil Quantitativo)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40301206",
    description: "Acilcarnitinas (Perfil Qualitativo)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40301214",
    description: "Acilcarnitinas (Perfil Quantitativo)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40301222",
    description: "Albumina - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40301230",
    description: "Aldolase - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40301249",
    description: "Alfa-1-Antitripsina, Pesquisa E/Ou Dosagem No Soro",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40301257",
    description: "Alfa-1-Glicoproteína Ácida - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40301265",
    description: "Alfa-2-Macroglobulina - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40301273",
    description: "Alumínio, Pesquisa E/Ou Dosagem No Soro",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40301281",
    description: "Amilase - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40301290",
    description: "Aminoácidos, Fracionamento E Quantificação",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40301303",
    description: "Amiodarona - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40301311",
    description: "Amitriptilina, Nortriptilina (Cada) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40301320",
    description: "Amônia - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40301338",
    description: "Anfetaminas, Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40301346",
    description: "Antibióticos, Pesquisa E/Ou Dosagem No Soro, Cada",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40301354",
    description: "Apolipoproteína A (Apo A) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40301362",
    description: "Apolipoproteína B (Apo B) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40301370",
    description: "Barbitúricos, Antidepressivos Tricíclicos (Cada) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40301389",
    description: "Beta-Glicuronidase - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40301397",
    description: "Bilirrubinas (Direta, Indireta E Total) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40301400",
    description: "Cálcio - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40301419",
    description: "Cálcio Iônico - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40301427",
    description: "Capacidade De Fixação De Ferro - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40301435",
    description: "Carbamazepina - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40301443",
    description: "Carnitina Livre - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40301451",
    description: "Carnitina Total E Frações - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40301460",
    description: "Caroteno - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40301478",
    description: "Ceruloplasmina - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40301486",
    description: "Ciclosporina, Methotrexate - Cada - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40301494",
    description: "Clearance De Ácido Úrico",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40301508",
    description: "Clearance De Creatinina",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40301516",
    description: "Clearance De Fosfato",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40301524",
    description: "Clearance De Uréia",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40301532",
    description: "Clearance Osmolar",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40301540",
    description: "Clomipramina - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40301559",
    description: "Cloro - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40301567",
    description: "Cobre - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40301575",
    description: "Cocaína, Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40301583",
    description: "Colesterol (Hdl) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40301591",
    description: "Colesterol (Ldl) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40301605",
    description: "Colesterol Total - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40301613",
    description: "Cotinina - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40301621",
    description: "Creatina - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40301630",
    description: "Creatinina - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40301648",
    description: "Creatino Fosfoquinase Total (Ck) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40301656",
    description: "Creatino Fosfoquinase - Fração Mb - Massa - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40301664",
    description: "Creatino Fosfoquinase - Fração Mb - Atividade - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40301672",
    description: "Cromatografia De Aminoácidos (Perfil Qualitatitivo) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40301680",
    description: "Curva Glicêmica (4 Dosagens) Via Oral Ou Endovenosa",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40301699",
    description: "Desidrogenase Alfa-Hidroxibutírica - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40301702",
    description: "Desidrogenase Glutâmica - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40301710",
    description: "Desidrogenase Isocítrica - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40301729",
    description: "Desidrogenase Láctica - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40301737",
    description: "Desidrogenase Láctica - Isoenzimas Fracionadas - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40301745",
    description: "Benzodiazepínicos E Similares (Cada) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40301753",
    description: "Digitoxina Ou Digoxina - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40301761",
    description: "Eletroferese De Proteínas",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40301770",
    description: "Eletroforese De Glicoproteínas",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40301788",
    description: "Eletroforese De Lipoproteínas",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40301796",
    description: "Enolase - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40301800",
    description: "Etossuximida - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40301818",
    description: "Fenilalanina, Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40301826",
    description: "Fenitoína - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40301834",
    description: "Fenobarbital - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40301842",
    description: "Ferro Sérico - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40301850",
    description: "Formaldeído - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40301869",
    description: "Fosfatase Ácida Fração Prostática - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40301877",
    description: "Fosfatase Ácida Total - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40301885",
    description: "Fosfatase Alcalina - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40301893",
    description: "Fosfatase Alcalina Com Fracionamento De Isoenzimas - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40301907",
    description: "Fosfatase Alcalina Fração Óssea - Elisa - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40301915",
    description: "Fosfatase Alcalina Termo-Estável - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40301923",
    description: "Fosfolipídios - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40301931",
    description: "Fósforo - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40301940",
    description: "Fósforo, Prova De Reabsorção Tubular",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40301958",
    description: "Frutosaminas (Proteínas Glicosiladas) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40301966",
    description: "Frutose - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40301974",
    description: "Galactose - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40301982",
    description: "Galactose 1-Fosfatouridil Transferase, Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40301990",
    description: "Gama-Glutamil Transferase - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40302016",
    description: "Gasometria (Ph, Pco2, Sa, O2, Excesso Base) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40302024",
    description: "Gasometria + Hb + Ht + Na +  K + Cl + Ca + Glicose + Lactato (Quando Efetuado No Gasômetro) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40302032",
    description: "Glicemia Após Sobrecarga Com Dextrosol Ou Glicose - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40302040",
    description: "Glicose - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40302059",
    description: "Glicose-6-Fosfato Deidrogenase (G6Fd) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40302067",
    description: "Haptoglobina - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40302075",
    description: "Hemoglobina Glicada (A1 Total) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40302083",
    description: "Hemoglobina Plasmática Livre - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40302091",
    description: "Hexosaminidase A - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40302105",
    description: "Hidroxiprolina - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40302113",
    description: "Homocisteína - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40302121",
    description: "Imipramina - Desipramina - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40302130",
    description: "Amilase Ou Alfa-Amilase, Isoenzimas - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40302148",
    description: "Isomerase Fosfohexose - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40302156",
    description: "Isoniazida - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40302164",
    description: "Lactose, Teste De Tolerância",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40302172",
    description: "Leucino Aminopeptidase - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40302180",
    description: "Lidocaina - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40302199",
    description: "Lipase - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40302202",
    description: "Lipase Lipoprotéica - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40302210",
    description: "Lipoproteína (A) - Lp (A) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40302229",
    description: "Lítio - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40302237",
    description: "Magnésio - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40302245",
    description: "Mioglobina, Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40302253",
    description: "Nitrogênio Amoniacal - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40302261",
    description: "Nitrogênio Total - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40302270",
    description: "Osmolalidade - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40302288",
    description: "Oxcarbazepina, Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40302296",
    description: "Piruvato Quinase - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40302300",
    description: "Porfirinas Quantitativas (Cada) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40302318",
    description: "Potássio - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40302326",
    description: "Pré-Albumina - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40302334",
    description: "Primidona - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40302342",
    description: "Procainamida - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40302350",
    description: "Propanolol - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40302369",
    description: "Proteína Ligadora Do Retinol - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40302377",
    description: "Proteínas Totais - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40302385",
    description: "Proteínas Totais Albumina E Globulina - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40302393",
    description: "Quinidina - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40302407",
    description: "Reserva Alcalina (Bicarbonato) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40302415",
    description: "Sacarose, Teste De Tolerância",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40302423",
    description: "Sódio - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40302431",
    description: "Succinil Acetona - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40302440",
    description: "Sulfonamidas Livre E Acetilada (% De Acetilação) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40302458",
    description: "Tacrolimus - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40302466",
    description: "Tálio, Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40302474",
    description: "Teofilina - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40302482",
    description: "Teste De Tolerância A Insulina Ou Hipoglicemiantes Orais (Até 6 Dosagens)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40302490",
    description: "Tirosina - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40302504",
    description: "Transaminase Oxalacética (Amino Transferase Aspartato) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40302512",
    description: "Transaminase Pirúvica (Amino Transferase De Alanina) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40302520",
    description: "Transferrina - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40302539",
    description: "Triazolam - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40302547",
    description: "Triglicerídeos - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40302555",
    description: "Trimipramina - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40302563",
    description: "Tripsina Imuno Reativa (Irt) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40302571",
    description: "Troponina - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40302580",
    description: "Uréia - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40302598",
    description: "Urobilinogênio - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40302601",
    description: "Vitamina A, Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40302610",
    description: "Vitamina E - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40302628",
    description: "Xilose, Teste De Absorção À",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40302636",
    description: "Lipídios Totais - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40302644",
    description: "Maltose, Teste De Tolerância",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40302652",
    description: "Mucopolissacaridose, Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40302660",
    description: "Mucoproteínas - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40302679",
    description: "Ocitocinase, Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40302687",
    description: "Procalcitonina - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40302695",
    description: "Colesterol (Vldl) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40302709",
    description: "Teste Oral De Tolerância À Glicose - 2 Dosagens",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40302717",
    description: "Eletroforese De Proteínas De Alta Resolução",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40302725",
    description: "Imunofixação - Cada Fração",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40302733",
    description: "Hemoglobina Glicada (Fração A1C) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40302741",
    description: "Lamotrigina - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40302750",
    description: "Perfil Lipídico / Lipidograma (Lípidios Totais, Colesterol, Triglicerídios E Eletroforese Lipoproteínas) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40302768",
    description: "Papp-A - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40302776",
    description: "Peptídeo Natriurético Bnp/Probnp - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40302784",
    description: "Vitamina B1, Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40302792",
    description: "Vitamina B2, Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40302806",
    description: "Vitamina B3, Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40302814",
    description: "Vitamina B6, Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40302822",
    description: "Vitamina D2, Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40302830",
    description: "Vitamina D 25 Hidroxi, Pesquisa E/Ou Dosagem (Vitamina D3)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40302849",
    description: "Vitamina K,- Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40302881",
    description: "Ácido Micofenólico, dosagem soro",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40302890",
    description: "Ácidos graxos cadeia longa",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40302903",
    description: "Ácidos Graxos Cadeia Muito Longa",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40302962",
    description: "Cistatina C",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40302946",
    description: "Bilirrubina transcutânea [labo]",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40303012",
    description: "Alfa -1-Antitripsina, (Fezes) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40303020",
    description: "Anal Swab, Pesquisa De Oxiúrus",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40303039",
    description: "Coprológico Funcional (Caracteres, Ph, Digestibilidade, Amônia, Ácidos Orgânicos E Interpretação)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40303047",
    description: "Eosinófilos, Pesquisa Nas Fezes",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40303055",
    description: "Gordura Fecal, Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40303063",
    description: "Hematoxilina Férrica, Pesquisa De Protozoários Nas Fezes",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40303071",
    description: "Identificação De Helmintos,  Exame De Fragmentos - Nas Fezes",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40303080",
    description: "Larvas (Fezes), Pesquisa",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40303098",
    description: "Leucócitos E Hemácias, Pesquisa Nas Fezes",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40303101",
    description: "Leveduras, Pesquisa Nas Fezes",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40303110",
    description: "Parasitológico - Nas Fezes",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40303128",
    description: "Parasitológico, Colheita Múltipla Com Fornecimento Do Líquido Conservante Nas Fezes",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40303136",
    description: "Sangue Oculto, Pesquisa Nas Fezes",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40303144",
    description: "Shistossoma, Pesquisa Ovos Em Fragmentos Mucosa Após Biópsia Retal",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40303152",
    description: "Substâncias Redutoras Nas Fezes - Pesquisa",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40303160",
    description: "Tripsina, Prova De (Digestão Da Gelatina)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40303179",
    description: "Esteatócrito, Triagem Para Gordura Fecal",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40303187",
    description: "Estercobilinogênio Fecal, Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40303195",
    description: "Gordura Fecal, Pesquisa De",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40303250",
    description: "Sangue oculto nas fezes, pesquisa imunológica",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40303268",
    description: "Oograma Nas Fezes",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40303284",
    description: "Elastase pancreática fecal",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40303330",
    description: "Dosagem fecal de calprotectina",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40304019",
    description: "Anticoagulante Lúpico, Pesquisa",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40304027",
    description: "Anticorpo Anti A E B, Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40304035",
    description: "Anticorpos Antiplaquetários, Citometria De Fluxo",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40304043",
    description: "Anticorpos Irregulares - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40304051",
    description: "Anticorpos Irregulares, Pesquisa (Meio Salino A Temperatura Ambiente E 37º E Teste Indireto De Coombs)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40304060",
    description: "Antitrombina Iii, Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40304078",
    description: "Ativador Tissular De Plasminogênio (Tpa) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40304086",
    description: "Cd... (Antígeno De Dif. Celular, Cada Determinação) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40304094",
    description: "Citoquímica Para Classificar Leucemia: Esterase, Fosfatase Leucocitária, Pas, Peroxidase Ou Sb,  Etc - Cada",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40304108",
    description: "Coombs Direto",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40304116",
    description: "Enzimas  Eritrocitárias,  (Adenilatoquinase,  Desidrogenase Láctica,  Fosfofructoquinase,  Fosfoglicerato Quinase, Gliceraldeído, 3  - Fosfato   Desidrogenase, Glicose  Fosfato Isomerase,  Glicose 6 - Fosfato Desidrogenase, Glutation Peroxidase, Glut",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40304132",
    description: "Falcização, Teste De",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40304140",
    description: "Fator 4 Plaquetário, Dosagens",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40304159",
    description: "Fator Ii, Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40304167",
    description: "Fator Ix, Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40304175",
    description: "Fator V, Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40304183",
    description: "Fator Viii, Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40304191",
    description: "Fator Viii, Dosagem Do Antígeno (Von Willebrand)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40304205",
    description: "Fator Viii, Dosagem Do Inibidor",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40304213",
    description: "Fator X, Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40304221",
    description: "Fator Xi, Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40304230",
    description: "Fator Xii, Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40304248",
    description: "Fator Xiii, Pesquisa",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40304256",
    description: "Fenotipagem Do Sistema Rh-Hr (Anti Rho(D) + Anti Rh(C) + Anti Rh(E)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40304264",
    description: "Fibrinogênio, Teste Funcional, Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40304272",
    description: "Filária, Pesquisa",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40304280",
    description: "Grupo Abo, Classificação Reversa - Determinação",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40304299",
    description: "Grupo Sanguíneo Abo, E Fator Rho (Inclui Du) - Determinação",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40304302",
    description: "Ham, Teste De (Hemólise Ácida)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40304310",
    description: "Heinz, Corpúsculos, Pesquisa",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40304329",
    description: "Hemácias Fetais, Pesquisa",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40304337",
    description: "Hematócrito, Determinação Do",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40304345",
    description: "Hemoglobina, Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40304353",
    description: "Hemoglobina (Eletroforese) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40304361",
    description: "Hemograma Com Contagem De Plaquetas Ou Frações (Eritrograma, Leucograma, Plaquetas)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40304370",
    description: "Hemossedimentação, (Vhs) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40304388",
    description: "Hemossiderina (Siderócitos), Sangue Ou Urina - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40304396",
    description: "Heparina, Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40304400",
    description: "Inibidor Do Tpa (Pai) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40304418",
    description: "Leucócitos, Contagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40304434",
    description: "Meta-Hemoglobina, Determinação Da",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40304450",
    description: "Plaquetas, Teste De Agregação (Por Agente Agregante), Cada",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40304469",
    description: "Plasminogênio, Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40304477",
    description: "Plasmódio, Pesquisa",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40304485",
    description: "Medula Óssea, Aspiração Para Mielograma Ou Microbiológico",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40304493",
    description: "Produtos De Degradação Da Fibrina, Qualitativo - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40304507",
    description: "Proteína C - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40304515",
    description: "Proteína S, Teste Funcional",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40304523",
    description: "Protoporfirina Eritrocitária Livre - Zinco - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40304531",
    description: "Prova Do Laço",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40304540",
    description: "Resistência Globular, Curva De",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40304558",
    description: "Reticulócitos, Contagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40304566",
    description: "Retração Do Coágulo - Pesquisa",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40304574",
    description: "Ristocetina, Co-Fator, Teste Funcional, Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40304582",
    description: "Tempo De Coagulação - Determinação",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40304590",
    description: "Tempo De Protrombina - Determinação",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40304604",
    description: "Tempo De Reptilase - Determinação",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40304612",
    description: "Tempo De Sangramento De Ivy - Deteminação",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40304620",
    description: "Tempo De Trombina - Determinação",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40304639",
    description: "Tempo De Tromboplastina Parcial Ativada - Determinação",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40304647",
    description: "Tripanossoma, Pesquisa",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40304655",
    description: "Tromboelastograma  - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40304663",
    description: "Alfa-2Antiplasmina, Teste Funcional",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40304671",
    description: "Anticorpo Antimieloperoxidase, Mpo - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40304680",
    description: "Fator Vii - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40304698",
    description: "Fator Xiii, Dosagem, Teste Funcional",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40304701",
    description: "Imunofenotipagem Para Doença Residual Mínima (*)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40304710",
    description: "Imunofenotipagem Para Hemoglobinúria Paroxistica Noturna (*)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40304728",
    description: "Imunofenotipagem Para Leucemias Agudas Ou Sindrome Mielodisplásica (*)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40304736",
    description: "Imunofenotipagem Para Linfoma Não Hodgkin / Sindrome Linfoproliferativa Crônica (*)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40304744",
    description: "Imunofenotipagem Para Perfil Imune (*)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40304752",
    description: "Fator Ix, Dosagem Do Inibidor",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40304760",
    description: "Inibidor Dos Fatores Da Hemostasia, Triagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40304779",
    description: "Produtos De Degradação Da Fibrina, Quantitativo - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40304787",
    description: "Proteína S Livre, Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40304809",
    description: "Consumo De Protrombina - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40304817",
    description: "Enzimas Eritrocitárias, Rastreio Para Deficiência",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40304825",
    description: "Esplenograma (Citologia)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40304833",
    description: "Hemoglobina Instabilidade A 37 Graus C - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40304841",
    description: "Hemoglobina, Solubilidade (Hbs E Hbd) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40304850",
    description: "Hemoglobinopatia - Triagem (El.Hb., Hemoglob. Fetal. Reticulócitos, Corpos De H, T. Falcização Hemácias, Resist. Osmótica, Termo Estabilidade)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40304868",
    description: "Estreptozima - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40304876",
    description: "Sulfo-Hemoglobina, Determinação Da",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40304884",
    description: "Coombs Indireto",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40304892",
    description: "Mielograma",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40304906",
    description: "Dímero D - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40304914",
    description: "Tempo De Sangramento (Duke) - Determinação",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40304922",
    description: "Coagulograma (Ts, Tc, Prova Do Laço, Retração Do Coágulo, Contagem De Plaquetas, Tempo De Protombina, Tempo De Tromboplastina, Parcial Ativado) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40304930",
    description: "Baço, Exame De Esfregaço De Aspirado",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40304949",
    description: "Linfonodo, Exame De Esfregaço De Aspirado",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40304973",
    description: "Alfa talassemia anal molecular sangue",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40304957",
    description: "Adenograma (Inclui Hemograma)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40305015",
    description: "1,25-Dihidroxi Vitamina D - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40305040",
    description: "17-Cetogênicos (17-Cgs) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40305058",
    description: "17-Cetogênicos Cromatografia - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40305066",
    description: "17-Cetosteróides (17-Cts) - Cromatografia - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40305074",
    description: "17-Cetosteróides Relação Alfa/Beta - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40305082",
    description: "17-Cetosteróides Totais (17-Cts) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40305090",
    description: "17-hidroxipregnenolona - pesquisa e/ou dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40305112",
    description: "Ácido 5 hidróxi indol acético, dosagem na urina",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40305120",
    description: "Ácido homo vanílico - pesquisa e/ou dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40305163",
    description: "AMP cíclico - pesquisa e/ou dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40305210",
    description: "Cortisol livre - pesquisa e/ou dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40305228",
    description: "Curva Glicêmica (6 Dosagens) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40305236",
    description: "Curva Insulínica  (6 Dosagens) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40305279",
    description: "Dosagem De Receptor De Progesterona Ou De Estrogênio",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40305287",
    description: "Enzima Conversora Da Angiotensina (Eca) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40305295",
    description: "Eritropoietina - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40305341",
    description: "Gad-Ab-Antidescarboxilase Do Ácido - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40305368",
    description: "Glucagon, Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40305384",
    description: "Hormônio Antidiurético (Vasopressina) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40305406",
    description: "Igf Bp3 (Proteína Ligadora Dos Fatores De Crescimento Insulin-Like) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40305422",
    description: "Leptina - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40305449",
    description: "N-Telopeptídeo - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40305465",
    description: "Paratormônio - Pth Ou Fração (Cada) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40305490",
    description: "Piridinolina - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40305503",
    description: "Pregnandiol - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40305511",
    description: "Pregnantriol - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40305546",
    description: "Prova Do Lh-Rh, Dosagem Do Fsh Sem Fornecimento De Medicamento (Cada)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40305554",
    description: "Prova Do Lh-Rh, Dosagem Do Lh Sem Fornecimento De Medicamento (Cada)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40305562",
    description: "Prova Do Trh-Hpr, Dosagem Do Hpr Sem Fornecimento Do Material (Cada)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40305570",
    description: "Prova Do Trh-Tsh, Dosagem Do Tsh Sem Fornecimento Do Material (Cada)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40305589",
    description: "Prova Para Diabete Insípido (Restrição Hídrica  Nacl 3% Vasopressina)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40305597",
    description: "Estrogênios Totais (Fenolesteróides) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40305600",
    description: "Iodo Protéico (Pbi) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40305619",
    description: "Lactogênico Placentário Hormônio - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40305627",
    description: "Provas De Função Tireoideana (T3, T4, Índices E Tsh)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40305635",
    description: "Somatotrófico Coriônico (Hcs Ou Phl) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40305740",
    description: "11-Desoxicorticosterona - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40305759",
    description: "Hormônio Gonodotrofico Corionico Qualitativo (Hcg-Beta-Hcg) - Pesquisa",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40305767",
    description: "Hormônio Gonodotrofico Corionico Quantitativo (Hcg-Beta-Hcg) - Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40305775",
    description: "Macroprolactina - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40305783",
    description: "17-Hidroxicorticosteróides (17-Ohs) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40306011",
    description: "Adenovírus, Igg - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40306020",
    description: "Adenovírus, Igm - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40306046",
    description: "Anticandida - Igg E Igm (Cada) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40306054",
    description: "Anti-Actina - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40306062",
    description: "Anti-Dna - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40306070",
    description: "Anti-Jo1 - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40306089",
    description: "Anti-La/Ssb - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40306097",
    description: "Anti-Lkm-1 - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40306100",
    description: "Anti-Rnp - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40306119",
    description: "Anti-Ro/Ssa - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40306127",
    description: "Anti-Sm - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40306135",
    description: "Anticardiolipina - Iga - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40306143",
    description: "Anticardiolipina - Igg - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40306151",
    description: "Anticardiolipina - Igm - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40306160",
    description: "Anticentrômero - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40306178",
    description: "Anticorpo Anti-Dnase B - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40306186",
    description: "Anticorpo Anti-Hormônio Do Crescimento - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40306194",
    description: "Anticorpo Antivírus Da Hepatite E (Total) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40306208",
    description: "Anticorpos Anti-Ilhota De Langherans - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40306216",
    description: "Anticorpos Anti-Influenza A,  Igg - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40306224",
    description: "Anticorpos Anti-Influenza A,  Igm - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40306232",
    description: "Anticorpos Anti-Influenza B, Igg - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40306240",
    description: "Anticorpos Anti-Influenza B, Igm - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40306259",
    description: "Anticorpos Antiendomisio - Igg, Igm, Iga (Cada) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40306267",
    description: "Anticorpos Naturais - Isoaglutininas, Pesquisas",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40306275",
    description: "Anticorpos Naturais - Isoaglutininas, Titulagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40306283",
    description: "Anticortex Supra-Renal - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40306291",
    description: "Antiescleroderma (Scl 70) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40306305",
    description: "Antigliadina (Glúten) - Iga - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40306313",
    description: "Antigliadina (Glúten) - Igg - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40306321",
    description: "Antigliadina (Glúten) - Igm - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40306330",
    description: "Antimembrana Basal - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40306348",
    description: "Antimicrossomal - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40306356",
    description: "Antimitocondria - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40306364",
    description: "Antimitocondria, M2 - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40306372",
    description: "Antimúsculo Cardíaco - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40306380",
    description: "Antimúsculo Estriado - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40306399",
    description: "Antimúsculo Liso - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40306402",
    description: "Antineutrófilos (Anca)  C - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40306410",
    description: "Antineutrófilos (Anca)  P - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40306429",
    description: "Antiparietal - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40306437",
    description: "Antiperoxidase Tireoideana - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40306445",
    description: "Aslo - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40306453",
    description: "Aspergilus, Reação Sorológica",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40306461",
    description: "Avidez De Igg Para Toxoplasmose, Citomegalia, Rubéloa, Eb E Outros, Cada - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40306470",
    description: "Beta-2-Microglobulina - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40306488",
    description: "Biotinidase Atividade Da, Qualitativo - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40306496",
    description: "Blastomicose, Reação Sorológica",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40306500",
    description: "Brucela - Igg - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40306518",
    description: "Brucela - Igm - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40306526",
    description: "Brucela, Prova Rápida",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40306534",
    description: "C1Q - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40306542",
    description: "C3 Proativador - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40306550",
    description: "C3A (Fator B) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40306569",
    description: "Ca 50 - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40306577",
    description: "Ca-242 - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40306585",
    description: "Ca-27-29 - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40306593",
    description: "Caxumba, Igg - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40306607",
    description: "Caxumba, Igm - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40306615",
    description: "Chagas Igg - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40306623",
    description: "Chagas Igm - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40306631",
    description: "Chlamydia - Igg - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40306640",
    description: "Chlamydia - Igm - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40306658",
    description: "Cisticercose, Ac - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40306666",
    description: "Citomegalovírus Igg - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40306674",
    description: "Citomegalovírus Igm - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40306682",
    description: "Clostridium Difficile, Toxina A - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40306690",
    description: "Complemento C2 - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40306704",
    description: "Complemento C3 - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40306712",
    description: "Complemento C4 - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40306720",
    description: "Complemento C5 - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40306739",
    description: "Complemento Ch-100 - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40306747",
    description: "Complemento Ch-50 - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40306755",
    description: "Crio-Aglutinina, Globulina, Dosagem, Cada",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40306763",
    description: "Crio-Aglutinina, Globulina, Pesquisa, Cada",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40306771",
    description: "Cross Match (Prova Cruzada De Histocompatibilidade Para Transplante Renal)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40306780",
    description: "Cultura Ou Estimulação Dos Linfócitos In Vitro Por Concanavalina, Pha Ou Pokweed",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40306798",
    description: "Dengue - Igg E Igm (Cada) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40306801",
    description: "Echovírus (Painel) Sorologia Para",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40306810",
    description: "Equinococose (Hidatidose), Reação Sorológica",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40306828",
    description: "Equinococose, Idr - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40306836",
    description: "Esporotricose, Reação Sorológica",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40306844",
    description: "Esporotriquina, Idr - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40306852",
    description: "Fator Antinúcleo, (Fan) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40306860",
    description: "Fator Reumatóide, Quantitativo - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40306879",
    description: "Filaria Sorologia - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40306887",
    description: "Genotipagem Do Sistema Hla",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40306895",
    description: "Giardia, Reação Sorológica",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40306909",
    description: "Helicobacter Pylori - Iga - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40306917",
    description: "Helicobacter Pylori - Igg - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40306925",
    description: "Helicobacter Pylori - Igm - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40306933",
    description: "Hepatite A - Hav - Igg - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40306941",
    description: "Hepatite A - Hav - Igm - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40306950",
    description: "Hepatite B - Hbcac - Igg (Anti-Core Igg Ou Acoreg) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40306968",
    description: "Hepatite B - Hbcac - Igm (Anti-Core Igm Ou Acorem) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40306976",
    description: "Hepatite B - Hbeac (Anti Hbe) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40306984",
    description: "Hepatite B - Hbeag (Antígeno E) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40306992",
    description: "Hepatite B - Hbsac (Anti-Antígeno De Superfície) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40307018",
    description: "Hepatite B - Hbsag (Au, Antígeno Austrália) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40307026",
    description: "Hepatite C - Anti-Hcv - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40307034",
    description: "Hepatite C - Anti-Hcv - Igm - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40307042",
    description: "Hepatite C - Imunoblot - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40307050",
    description: "Hepatite Delta, Anticorpo Igg - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40307069",
    description: "Hepatite Delta, Anticorpo Igm - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40307077",
    description: "Hepatite Delta, Antígeno - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40307085",
    description: "Herpes Simples - Igg - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40307093",
    description: "Herpes Simples - Igm - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40307107",
    description: "Herpes Zoster - Igg - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40307115",
    description: "Herpes Zoster - Igm - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40307123",
    description: "Hipersensibilidade Retardada (Intradermo Reação Ider ) Candidina, Caxumba, Estreptoquinase-Dornase, Ppd, Tricofitina, Vírus Vacinal, Outro(S), Cada",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40307131",
    description: "Histamina, Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40307140",
    description: "Histona - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40307158",
    description: "Histoplasmose, Reação Sorológica",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40307166",
    description: "Hiv - Antígeno P24 - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40307174",
    description: "Hiv1 Ou Hiv2, Pesquisa De Anticorpos",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40307182",
    description: "Hiv1+ Hiv2, (Determinação Conjunta), Pesquisa De Anticorpos",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40307190",
    description: "Hla-Dr - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40307204",
    description: "Hla-Dr+Dq - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40307212",
    description: "Htlv1 Ou Htlv2 Pesquisa De Anticorpo (Cada)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40307220",
    description: "Iga - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40307239",
    description: "Iga Na Saliva - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40307247",
    description: "Igd - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40307255",
    description: "Ige, Grupo Específico, Cada - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40307263",
    description: "Ige, Por Alérgeno (Cada) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40307271",
    description: "Ige, Total - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40307280",
    description: "Igg - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40307298",
    description: "Igg, Subclasses 1,2,3,4 (Cada) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40307301",
    description: "Igm - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40307310",
    description: "Imunocomplexos Circulantes - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40307328",
    description: "Imunocomplexos Circulantes, Com Células Raji - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40307336",
    description: "Imunoeletroforese (Estudo Da Gamopatia) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40307344",
    description: "Inibidor De C1 Esterase - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40307352",
    description: "Isospora, Pesquisa De Antígeno - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40307360",
    description: "Ito (Cancro Mole), Ider - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40307379",
    description: "Kveim (Sarcoidose), Ider - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40307387",
    description: "Legionella - Igg E Igm (Cada) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40307395",
    description: "Leishmaniose - Igg E Igm (Cada) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40307409",
    description: "Leptospirose - Igg - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40307417",
    description: "Leptospirose - Igm - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40307425",
    description: "Leptospirose, Aglutinação - Pesquisa",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40307433",
    description: "Linfócitos T Helper Contagem De (If Com Okt-4) (Cd-4+) Citometria De Fluxo",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40307441",
    description: "Linfócitos T Supressores Contagem De (If Com Okt-8) (D-8) Citometria De Fluxo",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40307450",
    description: "Listeriose, Reação Sorológica",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40307468",
    description: "Lyme - Igg - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40307476",
    description: "Lyme - Igm - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40307484",
    description: "Malária - Igg - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40307492",
    description: "Malária - Igm - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40307506",
    description: "Mantoux, Ider",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40307514",
    description: "Mca (Antígeno Cárcino-Mamário) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40307522",
    description: "Micoplasma Pneumoniae - Igg - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40307530",
    description: "Micoplasma Pneumoniae - Igm - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40307565",
    description: "Mononucleose - Epstein Barr - Igg - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40307573",
    description: "Mononucleose, Anti-Vca (Ebv) Igg - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40307581",
    description: "Mononucleose, Anti-Vca (Ebv) Igm - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40307590",
    description: "Montenegro, Ider",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40307603",
    description: "Outros Testes Bioquímicos Para Determinação Do Risco Fetal (Cada)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40307611",
    description: "Parvovírus - Igg, Igm (Cada) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40307620",
    description: "Peptídio Intestinal Vasoativo, Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40307638",
    description: "Ppd (Tuberculina), Ider",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40307654",
    description: "Proteína C, Teste Imunológico",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40307662",
    description: "Proteína Eosinofílica Catiônica (Ecp) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40307689",
    description: "Reação Sorológica Para Coxsackie, Neutralização Igg",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40307697",
    description: "Rubéola - Igg - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40307700",
    description: "Rubéola - Igm - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40307719",
    description: "Schistosomose - Igg - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40307727",
    description: "Schistosomose - Igm - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40307735",
    description: "Sífilis - Fta-Abs-Igg - Pesquisa",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40307743",
    description: "Sífilis - Fta-Abs-Igm - Pesquisa",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40307751",
    description: "Sífilis - Tpha - Pesquisa",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40307760",
    description: "Sífilis - Vdrl",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40307778",
    description: "Teste De Inibição Da Migração Dos Linfócitos (Para Cada Antígeno)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40307786",
    description: "Teste Respiratório Para H. Pylori",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40307794",
    description: "Toxocara Cannis - Igg - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40307808",
    description: "Toxocara Cannis - Igm - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40307816",
    description: "Toxoplasmina, Ider",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40307824",
    description: "Toxoplasmose Igg - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40307832",
    description: "Toxoplasmose Igm - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40307840",
    description: "Urease, Teste Rápido Para Helicobacter Pylori",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40307859",
    description: "Vírus Sincicial Respiratório - Elisa - Igg - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40307867",
    description: "Waaler-Rose (Fator Reumatóide) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40307875",
    description: "Western Blot (Anticorpos Anti-Hiv) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40307883",
    description: "Western Blot (Anticorpos Anti-Htvi Ou Htlvii) (Cada) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40307891",
    description: "Widal, Reação De",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40307905",
    description: "Alérgenos - Perfil Antigênico (Painel C/36 Antígenos) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40307913",
    description: "Anti-Dmp - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40307921",
    description: "Anti-Hialuronidase, Determinação Da",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40307930",
    description: "Antidesoxiribonuclease B, Neutralização Quantitativa - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40307948",
    description: "Antifígado (Glomérulo, Tub. Renal Corte Rim De Rato), Ifi - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40307956",
    description: "Antígenos Metílicos Solúveis Do Bcg (1 Aplicação)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40307964",
    description: "Chagas, Hemoaglutinação",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40307972",
    description: "Chagas (Machado Guerreiro)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40307999",
    description: "Complemento C3, C4 - Turbid. Ou Nefolométrico C3A - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40308014",
    description: "Crioglobulinas, Caracterização - Imunoeletroforese",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40308022",
    description: "Dncb - Teste De Contato",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40308030",
    description: "Fator Reumatóide, Teste Do Látex (Qualitativo) - Pesquisa",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40308049",
    description: "Frei (Linfogranuloma Venéreo), Ider - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40308065",
    description: "Gonococo - Hemaglutinação (Ha)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40308081",
    description: "Hidatidose (Equinococose) Idi Dupla - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40308090",
    description: "Nbt Estimulado",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40308120",
    description: "Sarampo - Anticorpos Igg - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40308138",
    description: "Sarampo - Anticorpos Igm - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40308154",
    description: "Toxoplasmose - Iga - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40308162",
    description: "Varicela, Igg - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40308170",
    description: "Varicela, Igm - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40308197",
    description: "Vírus Sincicial Respiratório - Pesquisa Direta",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40308200",
    description: "Weil Felix (Ricketsiose), Reação De Aglutinação",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40308219",
    description: "Anticorpo Anti Saccharamyces - Asca - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40308235",
    description: "Her-2 - Dosagem Do Receptor",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40308243",
    description: "Poliomelite Sorologia",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40308251",
    description: "Proteína Amiloide A - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40308278",
    description: "Schistosomose, Pesquisa",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40308286",
    description: "Sífilis Anticorpo Total - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40308294",
    description: "Sífilis Igm - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40308308",
    description: "Amebíase, Igg - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40308316",
    description: "Amebíase, Igm - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40308324",
    description: "Gonococo - Igg - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40308332",
    description: "Gonococo - Igm - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40308340",
    description: "Mononucleose, Sorologia Para (Monoteste Ou Paul-Bunnel), Cada",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40308359",
    description: "Psitacose - Igg - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40308367",
    description: "Psitacose - Igm - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40308375",
    description: "Psitacose - Iga - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40308383",
    description: "Proteína C Reativa, Qualitativa - Pesquisa",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40308391",
    description: "Proteína C Reativa, Quantitativa - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40308405",
    description: "Aslo, Quantitativo - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40308413",
    description: "Paracoccidioidomicose, Anticorpos Totais / Igg - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40308421",
    description: "Ameba, Pesquisa",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40308456",
    description: "Anti Citosol Hepático",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40308480",
    description: "Anti HU (ANNA1), dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40308529",
    description: "Anticorpos Antipneumococos",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40308553",
    description: "Anti Transglutaminase Tecidual - Iga",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40308561",
    description: "Anti Transglutaminase Tecidual - Igg",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40308570",
    description: "Anti YO (PCA1), dosagem sangue",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40308588",
    description: "Anti YO (PCA1), dosagem líquor",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40308650",
    description: "Anticorpos Anti Fator Intrinseco",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40308804",
    description: "Anticorpos Anti Peptídeo Cíclico Citrulinado - Igg",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40308812",
    description: "Anticorpos Anti Pm1",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40308820",
    description: "Anticorpos Anti Reticulina",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40308898",
    description: "Anticorpos Beta 2 Glicoproteina I  - Igg/Igm/Iga",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40308901",
    description: "Acetilcolina, Anticorpos Bloqueador Receptor",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40309010",
    description: "Adenosina De Aminase (Ada) - Pesquisa E/Ou Dosagem Em Líquidos Orgânicos",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40309029",
    description: "Bioquímica Icr (Proteínas + Pandy + Glicose + Cloro) - Pesquisa E/Ou Dosagem Em Líquidos Orgânicos",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40309037",
    description: "Células, Contagem Total E Específica - Pesquisa E/Ou Dosagem Em Líquidos Orgânicos",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40309045",
    description: "Células, Pesquisa De Células Neoplásicas (Citologia Oncótica) - Pesquisa E/Ou Dosagem Em Líquidos Orgânicos",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40309053",
    description: "Criptococose, Cândida, Aspérgilus (Látex) - Pesquisa E/Ou Dosagem Em Líquidos Orgânicos",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40309061",
    description: "Eletroforese De Proteínas No Líquor, Com Concentração - Pesquisa E/Ou Dosagem Em Líquidos Orgânicos",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40309070",
    description: "H. Influenzae, S. Pneumonieae, N. Meningitidis A, B E C W135 (Cada) - Pesquisa E/Ou Dosagem Em Líquidos Orgânicos",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40309088",
    description: "Haemophilus Influenzae - Pesquisa De Anticorpos (Cada)- Pesquisa E/Ou Dosagem Em Líquidos Orgânicos",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40309096",
    description: "Índice De Imunoprodução (Eletrof. E Igg Em Soro E Líquor) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40309100",
    description: "Lcr Ambulatorial Rotina (Aspectos Cor + Índice De Cor + Contagem Global E  Específica  De Leucócitos E  Hemácias + Citologia  Oncótica + Proteína + Glicose + Cloro + Eletroforese  Com  Concentração + Igg + Reações Para Neurocisticercose (2) + Reações",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40309118",
    description: "Lcr Hospitalar Neurologia (Aspectos Cor + Índices De Cor + Contagem Global E Específica De  Leucócitos E Hemácias + Proteína + Glicose + Cloro + Reações Para Neurocisticercose (2) + Reações Para  Neurolues (2) + Bacterioscopia + Cultura + Látex Para",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40309126",
    description: "Lcr Pronto Socorro (Aspectos Cor + Índice  De Cor + Contagem  Global  E  Específica  De  Leucócitos  E Hemácias + Proteína + Glicose + Cloro + Lactato + Bacterioscopia + Cultura + Látex Para Bactérias)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40309134",
    description: "Pesquisa De Bandas Oligoclonais Por Isofocalização - Pesquisa E/Ou Dosagem Em Líquidos Orgânicos",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40309142",
    description: "Proteína Mielina Básica, Anticorpo Anti - Pesquisa E/Ou Dosagem Em Líquidos Orgânicos",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40309150",
    description: "Punção Cisternal Subocciptal Com Manometria Para Coleta De Líquido Cefalorraqueano",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40309169",
    description: "Punção Lombar Com Manometria Para Coleta De Líquido Cefalorraqueano",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40309177",
    description: "Nonne-Apple Reação",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40309185",
    description: "Takata-Ara, Reação",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40309215",
    description: "Líquor Cisticercose Western Blot",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40309266",
    description: "Aminoácidos No Líquido Cefalorraquidiano",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40309304",
    description: "Anticorpo Antiespermatozóide - Pesquisa E/Ou Dosagem Em Líquidos Orgânicos",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40309312",
    description: "Espermograma (Caracteres Físicos, Ph, Fludificação, Motilidade, Vitalidade, Contagem E Morfologia)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40309320",
    description: "Espermograma E Teste De Penetração In Vitro, Velocidade Penetração Vertical, Colocação  Vital, Teste De Revitalização",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40309401",
    description: "Clements, Teste",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40309410",
    description: "Espectrofotometria De Líquido Amniótico",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40309428",
    description: "Fosfolipídios (Relação Lecitina/Esfingomielina) - Pesquisa E/Ou Dosagem Em Líquidos Orgânicos",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40309436",
    description: "Maturidade Pulmonar Fetal - - Pesquisa E/Ou Dosagem Em Líquidos Orgânicos",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40309444",
    description: "Rotina Do Líquido Amniótico-Amniograma (Citológico Espectrofotometria, Creatinina E Teste De Clements)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40309509",
    description: "Cristais Com Luz Polarizada - Pesquisa E/Ou Dosagem Em Líquidos Orgânicos",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40309517",
    description: "Ragócitos, Pesquisa",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40309525",
    description: "Rotina Líquido Sinovial - Caracteres Físicos, Citologia, Proteínas, Ácido Úrico, Látex P/ F.R., Bact.",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40310019",
    description: "A Fresco, Exame",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40310035",
    description: "Antibiograma P/ Bacilos Álcool-Resistentes - Drogas De 2 Linhas",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40310043",
    description: "Antígenos Fúngicos, Pesquisa",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40310051",
    description: "B.A.A.R. (Ziehl Ou Fluorescência, Pesquisa Direta E Após Homogeneização) - Pesquisa",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40310060",
    description: "Bacterioscopia (Gram, Ziehl, Albert  Etc), Por Lâmina",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40310078",
    description: "Chlamydia, Cultura",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40310086",
    description: "Cólera - Identificação (Sorotipagem Incluída)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40310094",
    description: "Corpúsculos De Donovani, Pesquisa Direta De",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40310108",
    description: "Criptococo (Tinta Da China), Pesquisa De",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40310116",
    description: "Criptosporidium, Pesquisa",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40310124",
    description: "Cultura Bacteriana (Em Diversos Materiais Biológicos)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40310132",
    description: "Cultura Para Bactérias Anaeróbicas",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40310140",
    description: "Cultura Para Fungos",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40310159",
    description: "Cultura Para Mycobacterium",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40310167",
    description: "Cultura Quantitativa De Secreções Pulmonares, Quando Necessitar Tratamento Prévio C/ N.C.A.",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40310175",
    description: "Cultura, Fezes: Salmonela, Shigellae E Esc. Coli Enteropatogênicas, Enteroinvasora (Sorol. Incluída) + Campylobacter Sp. + E. Coli Entero-Hemorrágica",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40310183",
    description: "Cultura, Fezes: Salmonella, Shigella E Escherichia Coli Enteropatogênicas (Sorologia Incluída)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40310191",
    description: "Cultura, Herpesvírus Ou Outro",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40310205",
    description: "Cultura, Micoplasma Ou Ureaplasma",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40310213",
    description: "Cultura, Urina Com Contagem De Colônias",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40310221",
    description: "Estreptococos - A, Teste Rápido",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40310230",
    description: "Fungos, Pesquisa De (A Fresco Lactofenol, Tinta Da China)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40310248",
    description: "Hemocultura (Por Amostra)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40310256",
    description: "Hemocultura Automatizada (Por Amostra)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40310264",
    description: "Hemocultura Para Bactérias Anaeróbias (Por Amostra)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40310272",
    description: "Hemophilus (Bordetella) Pertussis - Pesquisa",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40310280",
    description: "Hansen, Pesquisa De (Por Material)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40310299",
    description: "Leptospira (Campo Escuro Após Concentração) Pesquisa",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40310302",
    description: "Microorganismos - Teste De Sensibilidade A Drogas Mic, Por Droga Testada",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40310310",
    description: "Paracoccidioides, Pesquisa De",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40310329",
    description: "Pneumocysti Carinii, Pesquisa Por Coloração Especial",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40310337",
    description: "Rotavírus, Pesquisa, Elisa",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40310345",
    description: "Treponema (Campo Escuro) - Pesquisa",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40310353",
    description: "Vacina Autógena",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40310361",
    description: "Citomegalovírus - Shell Vial - Pesquisa",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40310370",
    description: "Microsporídia, Pesquisa Nas Fezes",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40310388",
    description: "Sarcoptes Scabei, Pesquisa",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40314537",
    description: "Chlamydia - PCR, amplificação de DNA",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40310400",
    description: "Cultura Automatizada - Microbiologia",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40310418",
    description: "Antibiograma (Teste De Sensibilidade E Antibióticos E Quimioterápicos), Por Bactéria - Não Automatizado",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40310426",
    description: "Antibiograma Automatizado",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40310434",
    description: "Leishmania, Pesquisa",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40310442",
    description: "Chlamydia Pneumoniae, Painel",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40310515",
    description: "Pesquisa De Antígenos Bacterianos",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40310523",
    description: "Pesquisa De Antígenos Entamoeba Histolytica",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40310566",
    description: "Teste De Sensibilidade Mycobacterium Cepas De Bactérias",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40310558",
    description: "Streptococcus B hemol cultura qualquer material",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40310582",
    description: "Yersinia Enterocolitica",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40310590",
    description: "Antígenos bacterianos / vários materiais",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40310604",
    description: "Antifungigrama",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40310620",
    description: "Cultura, para agentes multirresistentes, vários materiais",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40310647",
    description: "Cultura quantitativa queimados (pele)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40314669",
    description: "Teste para Detecção do Vírus Monkeypox (MPXV)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40310671",
    description: "Cultura Em Leite Materno",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40310728",
    description: "Fungos morfologia/bioquímica",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40310736",
    description: "Identificação de bactérias por método sorológico/bioquímico",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40311015",
    description: "Ácido Cítrico - Pesquisa E/Ou Dosagem Na Urina",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40311023",
    description: "Ácido Homogentísico - Pesquisa E/Ou Dosagem Na Urina",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40311031",
    description: "Alcaptonúria  - Pesquisa E/Ou Dosagem Na Urina",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40311040",
    description: "Cálculos Urinários - Análise",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40311058",
    description: "Catecolaminas Fracionadas - Dopamina, Epinefrina, Norepinefrina (Cada) - Pesquisa E/Ou Dosagem Na Urina",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40311066",
    description: "Cistinúria, Pesquisa",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40311074",
    description: "Coproporfirina Iii - Pesquisa E/Ou Dosagem Na Urina",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40311082",
    description: "Corpos Cetônicos, Pesquisa - Na Urina",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40311090",
    description: "Cromatografia De Açúcares - Na Urina",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40311104",
    description: "Dismorfismo Eritrocitário, Pesquisa (Contraste De Fase) - Na Urina",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40311112",
    description: "Erros Inatos Do Metabolismo Baterias De Testes Químicos De Triagem Em Urina (Mínimo De 6 Testes)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40311120",
    description: "Frutosúria, Pesquisa",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40311139",
    description: "Galactosúria, Pesquisa",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40311147",
    description: "Lipóides, Pesquisa - Na Urina",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40311155",
    description: "Melanina, Pesquisa - Na Urina",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40311163",
    description: "Metanefrinas Urinárias, Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40311171",
    description: "Microalbuminúria",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40311180",
    description: "Pesquisa Ou Dosagem De Um Componente Urinário",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40311198",
    description: "Porfobilinogênio, Pesquisa - Na Urina",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40311201",
    description: "Proteínas De Bence Jones, Pesquisa - Na Urina",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40311210",
    description: "Rotina De Urina (Caracteres Físicos, Elementos Anormais E Sedimentoscopia)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40311228",
    description: "Uroporfirinas, Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40311236",
    description: "2,5-Hexanodiona, Dosagem Na Urina",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40311244",
    description: "Cistina - Pesquisa E/Ou Dosagem Na Urina",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40311252",
    description: "Porfobilinogênio - Na Urina",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40311260",
    description: "Acidez Titulável - Pesquisa E/Ou Dosagem Na Urina",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40311279",
    description: "Bartituratos - Pesquisa E/Ou Dosagem Na Urina",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40311287",
    description: "Beta Mercapto-Lactato-Disulfidúria,Pesquisa - Na Urina",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40311295",
    description: "Contagem Sedimentar De Addis",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40311309",
    description: "Eletroforese De Proteínas Urinárias, Com Concentração",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40311317",
    description: "Fenilcetonúria, Pesquisa",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40311325",
    description: "Histidina, Pesquisa - Na Urina",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40311333",
    description: "Inclusão Citomegálica, Pesquisa De Células Com - Na Urina",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40311341",
    description: "Mioglobina, Pesquisa - Na Urina",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40311350",
    description: "Osmolalidade, Determinação - Na Urina",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40311368",
    description: "Prova De Concentração (Fishberg Ou Volhard) - Na Urina",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40311376",
    description: "Prova De Diluição - Na Urina",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40311384",
    description: "Sobrecarga De Água, Prova - Na Urina",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40311392",
    description: "Tirosinose, Pesquisa - Na Urina",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40311430",
    description: "Hemoglobina Livre Na Urina (Amostra Isolada)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40311457",
    description: "Pesquisa De Espermatozóide Na Urina",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40311465",
    description: "Substâncias redutoras, pesquisa (urina)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40311473",
    description: "Teste De Concentração Urinária Após Ddavp",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40311481",
    description: "Urina, Pesquisa Antígeno Para Legionella",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40311503",
    description: "Pesquisa De Sulfatídeos E Material Metacromático Na Urina",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40312011",
    description: "Cristalização Do Muco Cervical, Pequisa",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40312020",
    description: "Cromatina Sexual, Pesquisa",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40312046",
    description: "Iontoforese Para A Coleta De Suor, Com Dosagem De Cloro",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40312054",
    description: "Muco-Nasal, Pesquisa De Eosinófilos E Mastócitos",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40312062",
    description: "Perfil  Metabólico  Para  Litíase  Renal: Sangue (Ca, P, Au, Cr) Urina: (Ca, Au, P, Citr, Pesq. Cistina) Amp-Cíclico",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40312070",
    description: "Gastroacidograma - Secreção Basal Para 60' E 4 Amostras Após O Estímulo (Fornecimento De Material Inclusive Tubagem), Teste",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40312089",
    description: "Hollander (Inclusive Tubagem), Teste",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40312097",
    description: "Pancreozima - Secretina No Suco Duodenal, Teste",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40312100",
    description: "Rotina Da Biles A, B, C E Do Suco Duodenal (Caracteres Físicos E Microscópicos Inclusive Tubagem)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40312119",
    description: "Tubagem Duodenal",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40312127",
    description: "Perfil Reumatológico (Ácido Úrico, Eletroforese De Proteínas, Fan, Vhs, Prova Do Látex P/F. R, W. Rose)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40312135",
    description: "Ph - Tornassol - Pesquisa",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40312143",
    description: "Prova Atividade De Febre Reumática (Aslo, Eletroforese De Proteínas, Muco-Proteínas E Proteína C Reativa)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40312151",
    description: "Provas De Função Hepática (Bilirrubinas, Eletroforese De Proteínas, Fa, Tgo, Tgp E Gama-Pgt)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40312160",
    description: "Teste Do Pezinho Básico (Tsh Neonatal + Fenilalanina + Eletroforese De Hb Para Triagem De Hemopatias)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40312178",
    description: "Teste Do Pezinho Ampliado (Tsh Neonatal + 17 Oh Progesterona + Fenilalanina + Tripsina Imuno-Reativa + Eletroforese De Hb Para Triagem De Hemopatias)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40312194",
    description: "Coleta de escarro induzida",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40312224",
    description: "Espectrometria De Massa Em Tandem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40312232",
    description: "Identificação De Verme",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40312240",
    description: "Isolamento de microorganismos especiais",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40312267",
    description: "Líquido Pleural Citológico",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40323935",
    description: "Bartonella, anticorpos IgG",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40323943",
    description: "Bartonella, anticorpos IgM",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40313018",
    description: "Ácido Delta Aminolevulínico (Para Chumbo Inorgânico) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40313026",
    description: "Ácido Delta Aminolevulínico Desidratase (Para Chumbo Inorgânico) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40313034",
    description: "Ácido Fenilglioxílico (Para Estireno) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40313042",
    description: "Ácido Hipúrico (Para Tolueno) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40313050",
    description: "Ácido Mandélico (Para Estireno) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40313069",
    description: "Ácido Metilhipúrico (Para Xilenos) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40313077",
    description: "Ácido Salicílico - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40313085",
    description: "Azida Sódica, Teste Da (Para Deissulfeto De Carbono)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40313093",
    description: "Carboxihemoglobina (Para Monóxido De Carbono  Diclorometano) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40313107",
    description: "Chumbo - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40313115",
    description: "Colinesterase (Para Carbamatos  Organofosforados) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40313123",
    description: "Coproporfirinas (Para Chumbo Inorgânico) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40313131",
    description: "Dialdeído Malônico - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40313140",
    description: "Etanol - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40313158",
    description: "Fenol (Para Benzeno, Fenol) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40313166",
    description: "Flúor (Para Fluoretos) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40313174",
    description: "Formaldeído - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40313182",
    description: "Meta-Hemoglobina (Para Anilina Nitrobenzeno) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40313190",
    description: "Metais Al, As, Cd, Cr, Mn, Hg, Ni, Zn, Co, Outro (S) Absorção Atômica (Cada) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40313204",
    description: "Metanol - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40313212",
    description: "P-Aminofenol (Para Anilina) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40313220",
    description: "P-Nitrofenol (Para Nitrobenzeno) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40313239",
    description: "Protoporfirinas Livres (Para Chumbo Inorgânico) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40313247",
    description: "Protoporfirinas Zn (Para Chumbo Inorgânico) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40313255",
    description: "Selênio, Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40313263",
    description: "Sulfatos Orgânicos Ou Inorgânicos, Pesquisa (Cada)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40313271",
    description: "Tiocianato (Para Cianetos  Nitrilas Alifáticas) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40313280",
    description: "Triclorocompostos Totais (Para Tetracloroetileno, Tricloroetano, Tricloroetileno) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40313298",
    description: "Ácido Acético - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40313301",
    description: "Ácido Metil Malônico - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40313310",
    description: "Cromo - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40313328",
    description: "Zinco - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40313336",
    description: "Salicilatos, Pesquisa",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40313344",
    description: "Metil Etil Cetona - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40314014",
    description: "Apolipoproteína E, Genotipagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40314022",
    description: "Citomegalovírus - Qualitativo, Por Pcr - Pesquisa",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40314030",
    description: "Citomegalovírus - Quantitativo, Por Pcr - Pesquisa",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40314049",
    description: "Cromossomo Philadelfia - Pesquisa",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40314057",
    description: "Fator V De Leiden Por Pcr - Pesquisa",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40314065",
    description: "Fibrose Cística, Pesquisa De Uma Mutação",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40314073",
    description: "Hepatite B (Qualitativo) Pcr - Pesquisa",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40314081",
    description: "Hepatite B (Quantitativo) Pcr - Pesquisa",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40314090",
    description: "Hepatite C (Qualitativo) Por Pcr - Pesquisa",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40314103",
    description: "Hepatite C (Quantitativo) Por Pcr - Pesquisa",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40314111",
    description: "Hepatite C - Genotipagem - Pesquisa",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40314120",
    description: "Hiv - Carga Viral Pcr - Pesquisa",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40314138",
    description: "Hiv - Qualitativo Por Pcr - Pesquisa",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40314146",
    description: "Hiv, Genotipagem - Pesquisa",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40314154",
    description: "Hpv (Vírus Do Papiloma Humano) + Subtipagem Quando Necessário Pcr - Pesquisa",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40314162",
    description: "Htlv I / Ii Por Pcr (Cada) - Pesquisa",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40314170",
    description: "Mycobactéria Pcr - Pesquisa",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40314189",
    description: "Parvovírus Por Pcr - Pesquisa",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40314197",
    description: "Proteína S Total + Livre, Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40314200",
    description: "Rubéola Por Pcr - Pesquisa",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40314219",
    description: "Sífilis Por Pcr - Pesquisa",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40314227",
    description: "Toxoplasmose Por Pcr - Pesquisa",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40314235",
    description: "X Frágil Por Pcr - Pesquisa",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40314243",
    description: "Chlamydia Por Biologia Molecular - Pesquisa",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40314251",
    description: "Citogenética De Medula Óssea",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40314260",
    description: "Amplificação De Material Por Biologia Molecular (Outros Agentes)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40314278",
    description: "Pesquisa De Outros Agentes Por Pcr",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40314286",
    description: "Pesquisa De Mutação De Alelo Específico Por Pcr",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40314294",
    description: "Resistência A Agentes Antivirais Por Biologia Molecular (Cada Droga) - Pesquisa",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40314308",
    description: "Quantificação De Outros Agentes Por Pcr",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40314359",
    description: "Epstein Barr Vírus Por Pcr",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40314413",
    description: "Hepatite C Quantitativo Por Tma",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40314421",
    description: "HPV, genotipagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40314430",
    description: "HLA B27, fenotipagem /genotipagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40314448",
    description: "Hpv Oncoproteínas Virais E6/E7, Pesquisa",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40314480",
    description: "Análise de quimerismo pós transplante (STR), cada",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40314502",
    description: "Hiv Amplificação Do Dna (Pcr)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40314545",
    description: "Mycobactéria amplificação de DNA (PCR)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40314561",
    description: "Vírus Zika - Por PCR",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40314570",
    description: "Identificação multiplex por PCR painel com até 25 agentes",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40314588",
    description: "Identificação multiplex por PCR painel com 26 a 40 agentes",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40314596",
    description: "Quantificação de TRECs e KRECs",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40314618",
    description: "Coronavírus Covid-19, pesquisa por método molecular",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40314626",
    description: "PCR em tempo real para vírus influenza A e B",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40316017",
    description: "17-Alfa-Hidroxiprogesterona - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40316025",
    description: "3 Alfa Androstonediol Glucoronídeo (3Alfdadiol) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40316033",
    description: "Ácido Vanilmandélico (Vma) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40316041",
    description: "Adrenocorticotrófico, Hormônio (Acth) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40316050",
    description: "Aldosterona - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40316068",
    description: "Alfa-Fetoproteína - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40316076",
    description: "Androstenediona - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40316084",
    description: "Anticorpo Anti-Receptor De Tsh (Trab) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40316092",
    description: "Anticorpos Antiinsulina - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40316106",
    description: "Anticorpos Antitireóide (Tireoglobulina) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40316114",
    description: "Antígeno Austrália (Hbsag) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40316122",
    description: "Antígeno Carcinoembriogênico (Cea) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40316130",
    description: "Antígeno Específico Prostático Livre (Psa Livre) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40316149",
    description: "Antígeno Específico Prostático Total (Psa) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40316157",
    description: "Anti-Tpo - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40316165",
    description: "Calcitonina - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40316173",
    description: "Catecolaminas - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40316181",
    description: "Composto S (11-Desoxicortisol) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40316190",
    description: "Cortisol - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40316203",
    description: "Crescimento, Hormônio Do (Hgh) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40316211",
    description: "Dehidroepiandrosterona (Dhea) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40316220",
    description: "Dehidrotestosterona (Dht) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40316238",
    description: "Drogas (Imunossupressora, Anticonvulsivante, Digitálico, Etc.) Cada - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40316246",
    description: "Estradiol - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40316254",
    description: "Estriol - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40316262",
    description: "Estrona - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40316270",
    description: "Ferritina - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40316289",
    description: "Folículo Estimulante, Hormônio (Fsh) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40316297",
    description: "Gastrina - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40316300",
    description: "Globulina De Ligação De Hormônios Sexuais (Shbg) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40316319",
    description: "Globulina Transportadora Da Tiroxina (Tbg) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40316327",
    description: "Gonadotrófico Coriônico, Hormônio (Hcg) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40316335",
    description: "Hormônio Luteinizante (Lh) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40316343",
    description: "Imunoglobulina (Ige) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40316351",
    description: "Índice De Tiroxina Livre (Itl) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40316360",
    description: "Insulina - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40316378",
    description: "Marcadores Tumorais (Ca 19.9, Ca 125, Ca 72-4, Ca 15-3, Etc.) Cada - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40316386",
    description: "Osteocalcina - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40316394",
    description: "Peptídeo C - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40316408",
    description: "Progesterona - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40316416",
    description: "Prolactina - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40316424",
    description: "Pth - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40316432",
    description: "Renina - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40316440",
    description: "Somatomedina C (Igf1) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40316459",
    description: "Sulfato De Dehidroepiandrosterona (S-Dhea) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40316467",
    description: "T3 Livre - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40316475",
    description: "T3 Retenção - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40316483",
    description: "T3 Reverso - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40316491",
    description: "T4 Livre - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40316505",
    description: "Testosterona Livre - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40316513",
    description: "Testosterona Total - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40316521",
    description: "Tireoestimulante, Hormônio (Tsh) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40316530",
    description: "Tireoglobulina - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40316548",
    description: "Tiroxina (T4) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40316556",
    description: "Triiodotironina (T3) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40316564",
    description: "Vasopressina (Adh) - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40316572",
    description: "Vitamina B12 - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40316599",
    description: "Amp Cíclico Nefrogênico Na Urina (24H)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40316602",
    description: "AMP cíclico nefrogênico na urina (amostra isolada)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40316637",
    description: "Angiotensina Ii",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40316661",
    description: "Aquaporina 4 (AQP4)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40316734",
    description: "Curva Glicêmica (7 Dosagens) Via Oral Ou Endovenosa Ou Potencializada",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40316769",
    description: "Deoxicorticosterona, dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40316785",
    description: "Dosagem de ácido hipúrico em urina",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40316831",
    description: "Glicose após estímulo/glucagon",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40316866",
    description: "Gonadotrofina Coriônica - Hemaglutinação Ou Látex",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40316874",
    description: "HGH estímulo com exercício e clonidina, HGH",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40316912",
    description: "Ica 512",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40316955",
    description: "Insulina Livre",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40316963",
    description: "Insulina Total E Livre",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40317013",
    description: "Monitorização De Glicose 1 Dia",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40317021",
    description: "Monitorização De Glicose 2 Dias",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40317030",
    description: "Monitorização De Glicose 3 Dias",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40317056",
    description: "Pregnenolona, Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40317064",
    description: "Pró-Insulina",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40317080",
    description: "Prova De Sobrecarga De Glicose Para Insulina",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40317129",
    description: "Teste com ACTH para dosagem de DHEA",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40317137",
    description: "Teste Com Cálcio Para Dosar Calcitonina",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40317145",
    description: "Teste Com Cortrosina Para 17 Alfa Hidroxiprogesterona",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40317153",
    description: "Teste Com Estímulo Para Renina Após Captopril",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40317161",
    description: "Teste De Estímulo Com Cortrosina Para11 Desoxicortisol",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40317170",
    description: "Teste de estímulo com TRH para dosagem de GH",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40317188",
    description: "Teste de estímulo do GH pela insulina (4 dosagens de GH)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40317196",
    description: "Teste de estímulo do GH pelo exercício (cada dosagem de GH)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40317200",
    description: "Teste de estímulo do GH pelo glucagon (4 dosagens de GH)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40317226",
    description: "Teste de supressão do GH pela sobrecarga de glicose (cada dosagem de GH)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40317250",
    description: "Curva insulínica e glicêmica clássica",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40317269",
    description: "Curva insulínica e glicêmica (2 dosagens)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40317277",
    description: "Curva insulínica e glicêmica (3 dosagens)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40317285",
    description: "Curva insulínica e glicêmica (4 dosagens)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40317293",
    description: "Curva insulínica e glicêmica (5 dosagens)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40317374",
    description: "Cortisol ritmo (2 dosagens)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40317390",
    description: "Curva insulínica e glicêmica (6 dosagens)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40317404",
    description: "Metanefrinas Urinária Após Clonidina",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40317412",
    description: "Paratomônio, proteína relacionada, dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40317420",
    description: "Proteína ligadora do hormônio de crescimento (HGH), dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40317439",
    description: "Restrição Hídrica, Teste",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40317471",
    description: "Prova funcional de estímulo da prolactina após TRH sem fornecimento do medicamento (por dosagem)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40319024",
    description: "Atividade De Protease Fator Von Willebrand",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40319032",
    description: "Cadeia Kappa Leve Livre",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40319040",
    description: "Cadeia Kappa-Lambda Leve Livre",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40319067",
    description: "Coenzima Q10",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40319091",
    description: "Fator X Ativado",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40319113",
    description: "Hemácias, Contagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40319121",
    description: "Hemácias, Tempo De Sobrevida Das",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40319130",
    description: "Hemoglobina Fetal, Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40319148",
    description: "Hemólise",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40319199",
    description: "Neutrófilos, pesquisa de",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40319172",
    description: "Microesferócitos, Pesquisa De",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40319229",
    description: "Pesquisa Hemoglobina H",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40319253",
    description: "Prova funcional DDAVP - Von Willebrand (1hora)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40319261",
    description: "Prova funcional DDAVP - Von Willebrand (4horas)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40319270",
    description: "Tempo De Lise De Euglobulina",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40319288",
    description: "Teste Cruzado De Grupos Sanguíneos",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40319296",
    description: "Teste De Estímulo Ddaqvp Para Dosagem De Cortisol E Acth",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40319300",
    description: "Viscosidade Plasmática Ou Sanguínea",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40319318",
    description: "Análise De Multímeros Para Pacientes Com Doença De Von Willebrand",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40319326",
    description: "Protrombina, Pesquisa De Mutação",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40319334",
    description: "Cd 52 Marcador Isolado",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40319369",
    description: "CD3, imunofenotipagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40319377",
    description: "CD34, imunofenotipagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40319385",
    description: "Ciclina D1, imunofenotipagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40319393",
    description: "Adesividade Plaquetária",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40319407",
    description: "Tempo de coagulação ativado (TCA)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40319415",
    description: "Teste de viabilidade celular, citometria de fluxo, outros materiais",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40319431",
    description: "Cross Match Plaquetário",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40319440",
    description: "Fator Ii, Dosagem Do Inibidor",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40319458",
    description: "Fator Vii, Dosagem Do Inibidor",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40319466",
    description: "Fibrinogênio quantitativo, nefelometria",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40319474",
    description: "Hemoglobinopatias, neonatal, sangue periférico",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40321010",
    description: "Colesterol Esterificado",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40321029",
    description: "Deficiência Da Mcad",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40321096",
    description: "Dosagem De Ferro Em Tecido Hepático",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40321231",
    description: "Índice De Saturação De Ferro",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40321142",
    description: "Efexor, dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40321207",
    description: "Homocistina, pesquisa de",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40321223",
    description: "Imipenem, dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40321282",
    description: "Interleucina 6",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40321312",
    description: "Itraconazol",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40321347",
    description: "Levetiracetam, Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40321380",
    description: "Marcadores Cardíacos Diagnósticos",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40321410",
    description: "Neurontin",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40321460",
    description: "Paroxetina, dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40321509",
    description: "Porfirinas fracionadas plasmáticas",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40321517",
    description: "Prozac, dosagem (sangue)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40321533",
    description: "Resistência A Proteína C Ativada",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40321550",
    description: "Serotonina (Sangue)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40321568",
    description: "Sirolimus, Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40321614",
    description: "Topiramato, Dosagem (Sangue)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40321681",
    description: "Vigabatrina, dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40321690",
    description: "Cefalexina dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40321703",
    description: "Ceftriaxona dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40321711",
    description: "Clindamicina, dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40321720",
    description: "Clobazam dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40321738",
    description: "Clonazepan, dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40321754",
    description: "Clozapina, dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40321762",
    description: "Colinesterase com inibição de Dibucaina",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40321770",
    description: "Disopiramida, dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40321789",
    description: "Dissulfiram, dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40321797",
    description: "Doxepina, dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40321800",
    description: "Flunitrazepam, dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40321819",
    description: "Fluoxetina, dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40321827",
    description: "Galactocerebrosidase, dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40321916",
    description: "Lorazepam, dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40321967",
    description: "Manganes sérico, dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40321975",
    description: "Maprotilina, dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40321983",
    description: "Midazolam, dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40322025",
    description: "Pirimetamina, dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40322050",
    description: "Sulfametoxazol, dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40322084",
    description: "Swelling test",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40322114",
    description: "Vancomicina, dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40322157",
    description: "Ácido fitânico",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40322165",
    description: "Ácido hialuronico",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40322173",
    description: "Iduronato-2 Sulfatase, Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40322181",
    description: "N-Acetilgalactosaminidase, dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40322190",
    description: "N-Acetilglicosaminidase, Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40322220",
    description: "Pentaclorofenol, dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40322246",
    description: "Receptor solúvel de transferrina",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40322270",
    description: "Ácido cítrico (Citrato), dosagem sangue",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40322289",
    description: "Ácido cítrico (Citrato), dosagem esperma",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40322300",
    description: "Curva glicêmica clássica (5 dosagens)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40322319",
    description: "Everolimus, dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40322351",
    description: "10,11 Epóxido carbamazepinam, soro",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40322360",
    description: "Alfa Fetoproteína L3, Líquor",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40322378",
    description: "Albumina, líquor",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40322386",
    description: "Alfa-Galactosidade, Dosagem Plásmatica",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40322394",
    description: "Alfa L-iduronase, plasma",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40322408",
    description: "Bicarbonato Na Urina, Amostra Isolada",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40322416",
    description: "Carnitina, dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40322432",
    description: "Cobre eritrocitário, dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40322467",
    description: "Índice de ácido úrico/creatinina",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40322475",
    description: "Índice de cálcio/creatinina",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40322483",
    description: "Índice de proteína/creatinina",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40322491",
    description: "Tripsina, dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40322505",
    description: "Zinco eritrocitário, dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40322564",
    description: "Amiloidose - Ttr",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40322572",
    description: "Determinação da razão dos níveis séricos in vitro da tirosina-quinase-1 semelhante a fms solúvel (sFlt-1): fator de crescimento placentário (PlGF) por eletroquimioluminescência",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40322580",
    description: "Teicoplanin",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40323030",
    description: "Acetilcolina, Anticorpos Ligador Receptor",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40323048",
    description: "Acetilcolina, Anticorpos Modulador Receptor",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40323110",
    description: "Antígenos de aspergillus galactomannan",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40323129",
    description: "Antígenos Inalatórios Anticorpos",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40323153",
    description: "C4d fragmento",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40323404",
    description: "Hepatite E - Igm/Igg",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40323471",
    description: "HLA locus C",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40323480",
    description: "Imunofenotipagem T E B",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40323510",
    description: "Lyme para Western Blot",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40323552",
    description: "Neuropatia Motora, Painel",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40323595",
    description: "Pesquisa De Adenovirus",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40323609",
    description: "Pesquisa De Antígenos De Giardia Lamblia",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40323650",
    description: "Pesquisa Para Gardnerella",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40323676",
    description: "Pesquisa  Rápida para Influenza A e B",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40323684",
    description: "Pesquisa Rápida Vírus Sincicial Respiratório",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40323757",
    description: "Rubéola, Iha Para",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40323820",
    description: "Tetano, sorologia para",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40323889",
    description: "ZAP-70",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40323897",
    description: "Anticorpos Antidifteria",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40323900",
    description: "Anticorpos Antitétano",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40323978",
    description: "Cadeias leves livres Kappa/Lambda em urina, dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40323919",
    description: "Teste Rápido Para Detecção De Hiv Em Gestante",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40323986",
    description: "Calprotectina, detecção nas fezes",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40324044",
    description: "Coxsackie A9, anticorpos IgM",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40324052",
    description: "Coxsackie B1-6, anticorpos IgM",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40324060",
    description: "Epstein BARR vírus antígeno precoce, anticorpos",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40324079",
    description: "HIV1/2, anticorpos (teste rápido)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40324125",
    description: "Proteinase 3, anticorpo",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40324176",
    description: "Chikungunya, anticorpos (IgG e IgM)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40324192",
    description: "Antígeno NS1 do vírus da Dengue, pesquisa",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40324265",
    description: "Cadeias leves livres Kappa/Lambda, dosagem, sangue",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40324338",
    description: "Glicoproteína Beta 2, anticorpos, IgG",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40324346",
    description: "Glicoproteína Beta 2, anticorpos, IgM",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40324362",
    description: "Hepatite E - Anticorpos Igg",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40324370",
    description: "Hepatite E - anticorpos, IgM",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40324389",
    description: "HLA-DQ, teste de histocompatibilidade de alta resolução, sangue total",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40324559",
    description: "DENGUE, anticorpos  IgG, soro (teste rápido)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40324567",
    description: "DENGUE, anticorpos  IgM, soro (teste rápido)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40324591",
    description: "Vírus Zika IgG",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40324605",
    description: "Vírus Zika IgM",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40324613",
    description: "Febre amarela - IgG",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40324621",
    description: "Febre amarela - IgM",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40324630",
    description: "Febre amarela, pesquisa por PCR",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40324648",
    description: "Ensaio para dosagem da liberação de interferon gama",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40324656",
    description: "Anticorpo anti-NMDAR",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40324664",
    description: "Anticorpo anti-MOG",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40324672",
    description: "Anticorpo anti-AMPAR, dosagem sangue",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40324680",
    description: "Anticorpos anti-GABAR",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40324699",
    description: "Anticorpos anti-LGI1, dosagem sangue",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40324702",
    description: "Anticorpos anti-CASPR2",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40324729",
    description: "Anticorpos anti tiroquinase músculo específico (anti-MUSK), dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40324737",
    description: "Anticorpo anti-VGKC, dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40324770",
    description: "Sorologia Sars Covid (IgG, IgM ou IgA) por par",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40324788",
    description: "SARS-CoV-2 (Coronavírus COVID-19), pesquisa de anticorpos IgA, IgG ou IgM, isolada por classe de imunoglobulina",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40324796",
    description: "SARS-CoV-2 (Coronavírus COVID-19), pesquisa de anticorpos totais (IgA, IgG, IgM)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40325024",
    description: "Teste SARS-COV-2 (Coronavírus COVID-19), teste rápido para detecção de antígeno por POCT",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40325040",
    description: "Mycobacterium leprae (bacilo de hansen), IgM, anticorpos (teste rápido)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40401014",
    description: "Transfusão (Ato Médico Ambulatorial Ou Hospitalar)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40401022",
    description: "Transfusão (Ato Médico De Acompanhamento)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40401030",
    description: "Exsanguíneo  transfusão",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40401049",
    description: "Transfusão fetal intra-uterina",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "40401057",
    description: "Aférese para paciente ABO incompatível",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "40402010",
    description: "Material Descartável (Kit) E Soluções Para Utilização De Processadora Automática De Sangue / Auto Transfusão Intra-Operatória",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40402029",
    description: "Material Descartável (Kit) E Soluções Para Utilização De Processadora Automática De Sangue/Aférese",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40402037",
    description: "Sangria Terapêutica",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40402045",
    description: "Unidade De Concentrado De Hemácias",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40402053",
    description: "Unidade De Concentrado De Hemácias Lavadas",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40402061",
    description: "Unidade De Concentrado De Plaquetas Por Aférese",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40402070",
    description: "Unidade De Concentrado De Plaquetas Randômicas",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40402088",
    description: "Unidade De Crioprecipitado De Fator Anti-Hemofílico",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40402096",
    description: "Unidade De Plasma",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40402100",
    description: "Unidade De Sangue Total",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40402118",
    description: "Deleucotização De Unidade De Concentrado De Hemácias - Por Unidade",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40402126",
    description: "Deleucotização De Unidade De Concentrado De Plaquetas - Até 6 Unidades",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40402134",
    description: "Irradiação De Componentes Hemoterápicos",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40402142",
    description: "Deleucotização De Unidade De Concentrado De Plaquetas - Entre 7 E 12 Unidades",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40402150",
    description: "Unidade De Concentrado De Granulócitos",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40402169",
    description: "Unidade De Concentrado De Plaquetas (Dupla Centrifugação)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40402185",
    description: "Operação de processadora automática de sangue em aférese",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40402193",
    description: "Operação De Processadora Automática De Sangue EmAutotranfusão Intra-operatória",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "40402207",
    description: "Depleção de plasma em Transplante de Células-Tronco Homopoéticas alogênicos com incompatibilidade ABO menor",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40402215",
    description: "Sedimentação de hemácias em Transplante de Células-Tronco Hematopoéticas (TCTH) alogênicos com incompatibilidade ABO maior",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40403017",
    description: "Acompanhamento  Hospitalar/Dia  Do  Transplante   De  Medula   Óssea  Por Médico  Hematologista  E/Ou Hemoterapeuta",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "40403025",
    description: "Anticorpos Eritrocitários Naturais E Imunes - Titulagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "40403033",
    description: "Aplicação De Medula Óssea Ou Células Tronco",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "40403041",
    description: "Coleta De Células Tronco De Sangue De Cordão Umbilical Para Transplante De Medula Óssea",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "40403050",
    description: "Coleta De Células Tronco Por Processadora Automática Para Transplante De Medula Óssea",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "40403068",
    description: "Coleta De Biópsia De Medula Óssea Por Agulha",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "40403076",
    description: "Coleta De Medula Óssea Para Transplante",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "40403084",
    description: "Determinação De Células Cd34, Cd45 Positivas - Citômetro De Fluxo",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "40403092",
    description: "Determinação De Conteúdo De Dna - Citômetro De Fluxo",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "40403106",
    description: "Eletroforese De Hemoglobina Por Componente Hemoterápico",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "40403122",
    description: "Exsanguíneo  Transfusão",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "40403130",
    description: "Fenotipagem De Outros Sistemas Eritrocitários - Por Fenótipo",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "40403149",
    description: "Fenotipagem De Outros Sistemas Eritrocitários - Por Fenótipo - Gel Teste",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "40403157",
    description: "Fenotipagem Do Sistema Rh-Hr (D, C, E, C E C) Gel Teste",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "40403165",
    description: "Fenotipagem Do Sistema Rh-Hr (D, C, E, C, E)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "40403173",
    description: "Grupo Sanguíneo Abo E Rh - Pesquisa",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "40403181",
    description: "Grupo Sanguíneo Abo E Rh - Gel Teste - Pesquisa",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "40403190",
    description: "Identificação De Anticorpos Séricos Irregulares Antieritrocitários - Método De Eluição",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "40403203",
    description: "Identificação De Anticorpos Séricos Irregulares Antieritrocitários - Painel De Hemácias Enzimático",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "40403211",
    description: "Identificação De Anticorpos Séricos Irregulares Antieritrocitários Com Painel De Hemácias",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "40403220",
    description: "Identificação De Anticorpos Séricos Irregulares Antieritrocitários Com Painel De Hemácias Tratadas Por Enzimas",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "40403238",
    description: "Identificação De Anticorpos Séricos Irregulares Antieritrocitários Com Painel De Hemácias - Gel Liss",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "40403246",
    description: "Imunofenotipagem De Subpopulações Linfocitárias - Citômetro De Fluxo",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "40403254",
    description: "Imunofenotipagem Para Classificação De Leucemias - Citômetro De Fluxo",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "40403262",
    description: "Nat/Hcv Por Componente Hemoterápico - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "40403289",
    description: "Nat/Hiv Por Componente Hemoterápico - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "40403300",
    description: "Operação De Processadora Automática De Sangue Em Aférese",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "40403327",
    description: "Pesquisa De Anticorpos Séricos Antieritrocitários, Anti-A E/Ou Anti-B - Gel Teste",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "40403335",
    description: "Pesquisa De Anticorpos Séricos Antieritrocitários, Anti-A E/Ou Anti-B",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "40403343",
    description: "Pesquisa De Anticorpos Séricos Irregulares Antieritrocitários",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "40403351",
    description: "Pesquisa De Anticorpos Séricos Irregulares Antieritrocitários - Gel Teste",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "40403360",
    description: "Pesquisa De Anticorpos Séricos Irregulares Antieritrocitários - Método De Eluição",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "40403378",
    description: "Pesquisa De Anticorpos Séricos Irregulares Antieritrocitários A Frio",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "40403386",
    description: "Pesquisa De Hemoglobina S Por Componente Hemoterápico - Gel Teste",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "40403408",
    description: "Prova De Compatibilidade Pré-Transfusional Completa",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "40403416",
    description: "Prova De Compatibilidade Pré-Transfusional Completa - Gel Teste",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "40403424",
    description: "S. Anti-Htlv-I + Htlv-Ii (Determinação Conjunta) Por Componente Hemoterápico",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "40403440",
    description: "S. Chagas Eie Por Componente Hemoterápico - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "40403467",
    description: "S. Hepatite B Anti-Hbc Por Componente Hemoterápico - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "40403483",
    description: "S. Hepatite C Anti-Hcv Por Componente Hemoterápico - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "40403505",
    description: "S. Hiv Eie Por Componente Hemoterápico - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "40403521",
    description: "S. Malária Ifi Por Componente Hemoterápico - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "40403548",
    description: "S. Sífilis Eie Por Componente Hemoterápico - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "40403564",
    description: "S. Sífilis Fta - Abs Por Componente Hemoterápico - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "40403580",
    description: "S. Sífilis Ha Por Componente Hemoterápico - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "40403602",
    description: "S. Sífilis Vdrl Por Componente Hemoterápico - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "40403629",
    description: "S. Chagas Ha Por Componente Hemoterápico - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "40403645",
    description: "S. Chagas Ifi Por Componente Hemoterápico - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "40403661",
    description: "S. Hepatite B (Hbsag) Rie Ou Eie Por Componente Hemoterápico - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "40403688",
    description: "Teste De Coombs Direto",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "40403696",
    description: "Teste De Coombs Direto - Gel Teste",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "40403700",
    description: "Teste De Coombs Direto - Mono Específico (Igg, Iga, C3, C3D, Poliv. - Agh) - Gel Teste",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "40403718",
    description: "Teste De Coombs Indireto - Mono Específico (Igg, Iga, C3, C3D, Poliv. - Agh) - Gel Teste",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "40403726",
    description: "Tmo - Congelamento De Medula Óssea Ou Células Tronco Periféricas",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "40403734",
    description: "Tmo - Cultura De Linfócitos Doador E Receptor",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "40403742",
    description: "Tmo - Descongelamento De Medula Óssea Ou Células Tronco",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "40403750",
    description: "Tmo - Determinação De Hla   Transplantes De Medula Óssea - Loci Dr E Dq (Alta Resolução)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "40403769",
    description: "Tmo - Determinação De Hla Para Transplantes De Medula Óssea - Loci A E B",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "40403777",
    description: "Tmo - Determinação De Hla Para Transplantes De Medula Óssea - Loci Dr E Dq (Baixa Resolução)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "40403785",
    description: "Tmo - Determinação De Unidades Formadoras De Colônias",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "40403793",
    description: "Tmo - Determinação De Viabilidade De Medula Óssea",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "40403807",
    description: "Tmo - Manutenção De Congelamento De Medula Óssea Ou Células Tronco (Até 2 Anos)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "40403815",
    description: "Tmo - Preparo De Medula Óssea Ou Células Tronco Periféricas Para Congelamento",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "40403823",
    description: "Tmo - Preparo E Filtração De Medula Óssea Ou Células Tronco Na Coleta",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "40403831",
    description: "Tmo - Tratamento In Vitro De Medula Óssea Ou Células Tronco Por Anticorpos Monoclonais (Purging)(4)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "40403840",
    description: "Transaminase Pirúvica - Tgp Ou Alt Por Componente Hemoterápico - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "40403866",
    description: "Transfusão Fetal Intra-Uterina",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "40403874",
    description: "Detecção De Consumo De Oxigênio  (O2) Por Unidade De Concentrado De Plaquetas (Por Unidade De Concentrado De Plaquetas De Doador Múltiplo)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "40403882",
    description: "Detecção De Consumo De Oxigênio (O2) Por Unidade De Concentrado De Plaquetas (Por Unidade De Concentrado De Plaquetas Por Aférese)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "40403890",
    description: "Nat/Hbv - Por Componente Hemoterápico - Pesquisa E/Ou Dosagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "40403912",
    description: "Estimulação E Mobilização De Células Cd34 Positivas",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40403920",
    description: "Determinação Do Fator Rh (D), Incluindo Prova Para D-Fraco No Sangue Do Receptor",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40403939",
    description: "Doação Autóloga Com Recuperação Intra-Operatória",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "40403947",
    description: "Doação Autóloga Peri-Operatória Por Hemodiluição Normovolêmica",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40403955",
    description: "Doação Autóloga Pré-Operatória",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40403963",
    description: "Exames Imunohematológicos Em Recém-Nascidos: Tipificação Abo E Rh, Pesquisa De D Fraco Rh(D) E Prova Da Antiglobulina Direta",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "40403971",
    description: "Imuno-Hematológicos: Tipificação Abo, Incluindo Tipagem Reversa E Determinação Do Fator Rh (D), Incluindo Prova Para D-Fraco E Pesquisa E Identificação De Anticorpos Séricos Irregulares Antieritrocitários",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "40403980",
    description: "Investigação Da Presença De Anti-A Ou Anti-B, Em Soro Ou Plasma De Neonato, Com Métodos Que Incluam Uma Fase Antiglobulínica",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "40403998",
    description: "Tipificação Abo, Incluindo Tipagem Reversa No Sangue Do Receptor (Sem Tipagem Reversa Até 4 Meses De Idade)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "40404013",
    description: "Tmo - Prova Cruzada Para Histocompatibilidade De Transplante De Medula Óssea",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "40404030",
    description: "Antigenemia Para Diagnóstico De Cmv Pós Transplante",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40404048",
    description: "Avaliação Quimerismo - Vntr - Doador - Pré Transplante",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40404056",
    description: "Avaliação Quimerismo - Vntr - Paciente - Pré Transplante",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40404064",
    description: "Avaliação Quimerismo Por Str - Paciente - Pós Transplante",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40404072",
    description: "Coleta De Linfócitos De Sangue Periférico Por Aférese Para Tratamento De Recidivas Pós Tcth Alogênico",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40404080",
    description: "Controle Microbiológico Da Medula Óssea No Tcth Alogênico",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40404099",
    description: "Controle Microbiológico Das Células Tronco Periféricas No Tcth Alogênico",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40404102",
    description: "Depleção De Plasma Em Tcth Alogênicos Com Incompatibilidade Abo Menor",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "40404110",
    description: "Pcr Em Tempo Real Para Diagnóstico De Adenovírus",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40404129",
    description: "Pcr Em Tempo Real Para Diagnóstico De Ebv - Pós Transplante",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40404137",
    description: "Pcr Em Tempo Real Para Diagnóstico De Herpes Virus 6 - Pos Transplante",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40404145",
    description: "Pcr Em Tempo Real Para Diagnóstico De Herpes Virus 8 - Pos Transplante",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40404153",
    description: "Pcr Em Tempo Real Para Os Vírus Para Influenza E Influenza",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40404161",
    description: "Pcr Em Tempo Real Para Vírus Respiratório Sincicial",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40404170",
    description: "Quantificação De Cd14 Da Coleta De Células Tronco Periféricas Para Tcth Alogênico",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "40404188",
    description: "Quantificação De Cd19 Da Coleta De Células Tronco Periféricas Para Tcth Alogênico",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "40404196",
    description: "Quantificação De Cd3  Da Coleta De Células Tronco Periféricas Para Tcth Alogênico",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40404200",
    description: "Quantificação De Cd3  Da Coleta De Linfócitos Para Tratamento De Recidivas Pós Tcth Alogênico",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40404218",
    description: "Quantificação De Cd4 Da Coleta De Células Tronco Periféricas Para Tcth Alogênico",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40404226",
    description: "Quantificação De Cd8 Da Coleta De Células Tronco Periféricas Para Tcth Alogênico",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40404234",
    description: "Quantificação De Leucócitos Totais Da Coleta De Células Tronco Periféricas Para Tcth Alogênico",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40404242",
    description: "Quantificação De Leucócitos Totais Da Medula Óssea No Tcth Alogênico",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40404250",
    description: "Sedimentação De Hemácias Em Tcth Alogênicos Com Incompatibilidade Abo Maior",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "40404269",
    description: "Viabilidade Celular Dos Linfócitos Periféricos Por Citometria De Fluxo Para Tratamento Das Recidivas Pós Tcth Alogênico",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40404277",
    description: "Viabilidade Celular Da Medula Óssea Por Citometria De Fluxo Após O Descongelamento",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40404285",
    description: "Viabilidade Celular Das Células Tronco Periféricas Por Citometria De Fluxo Após O Descongelamento",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40404404",
    description: "Fenotipagem do sistema RH-HR (D, C, E, C, E) e Kell",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "40404552",
    description: "Controle bacteriológico para concentrado de plaquetas",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40404560",
    description: "Pesquisa de anticorpos séricos irregulares antieritrocitários - método de eluição - gel teste",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40404579",
    description: "Identificação de anticorpos anti-eritrocitários a frio em gel",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "40501019",
    description: "Cariótipo Com Bandas De Pele, Tumor E Demais Tecidos",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40501027",
    description: "Cariótipo Com Pesquisa De Troca De Cromátides Irmãs",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40501035",
    description: "Cariótipo Com Técnicas De Alta Resolução",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40501043",
    description: "Cariótipo De Medula (Técnicas Com Bandas)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40501051",
    description: "Cariótipo De Sangue (Técnicas Com Bandas)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40501060",
    description: "Cariótipo De Sangue Obtido Por Cordocentese Pré-Natal",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40501078",
    description: "Cariótipo De Sangue-Pesquisa De Marcadores Tumorais",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40501086",
    description: "Cariótipo De Sangue-Pesquisa De Sítio Frágil X",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40501094",
    description: "Cariótipo Em Vilosidades Coriônicas (Cultivo De Trofoblastos)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40501108",
    description: "Cariótipo Para Pesquisa De Instabilidade Cromossômica",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40501116",
    description: "Cromatina X Ou Y",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40501124",
    description: "Cultura De Material De Aborto E Obtenção De Cariótipo",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40501132",
    description: "Cultura De Tecido Para Ensaio Enzimático E/Ou Extração De Dna",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40501140",
    description: "Diagnóstico Genético Pré-Implantação Por Fish, Por Sonda",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40501159",
    description: "Fish Em Metáfase Ou Núcleo Interfásico, Por Sonda",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40501167",
    description: "Fish Pré-Natal, Por Sonda",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40501175",
    description: "Líquido Amniótico, Cariótipo Com Bandas",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40501183",
    description: "Líquido Amniótico, Vilosidades Coriônicas, Subcultura Para Dosagens Bioquímicas E/Ou Moleculares (Adicional)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40501191",
    description: "Subcultura De Pele Para Dosagens Bioquímicas E/Ou Moleculares (Adicional)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40501205",
    description: "Estudo De Alterações Cromossômicas Em Leucemias Por Fish (Fluorescence In Situ Hybridization)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40501213",
    description: "Pesquisa De Translocação Pml/Rar-A",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40501221",
    description: "Cariótipo De Sangue (Técnicas Com Bandas) - Análise De 50 Células Para Detecção De Mosaicismo",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40501230",
    description: "Cultura de fibroblastos (pele)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40501248",
    description: "HER2 FISH para amplificação gênica em tumor de mama",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40501264",
    description: "Translocação PML/RARA t(15;17) FISH em medula óssea",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40501256",
    description: "HER2 CISH para amplificação gênica em tumor de mama",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40501272",
    description: "Translocação PML/RARA t(15;17) FISH em sangue periférico",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40502015",
    description: "Marcadores Bioquímicos Extras, Além De Bhcg, Afp E Papp-A, Para Avaliação Do Risco Fetal, Por Marcador, Por Amostra",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40502040",
    description: "Baterias De Testes Químicos De Triagem Em Urina Para Erros Inatos Do Metabolismo (Mínimo De Seis Testes)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40502058",
    description: "Determinação Do Risco Fetal, Com Elaboração De Laudo",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40502066",
    description: "Dosagem quantitativa de ácidos orgânicos, carnitina, perfil de acilcarnitina, ácidos graxos de cadeia",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40502074",
    description: "Dosagem Quantitativa De Aminoácidos Para O Diagnóstico De Erros Inatos Do Metabolismo (Perfil De Aminoácidos Numa Amostra)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40502082",
    description: "Dosagem Quantitativa De Metabólitos Na Urina E/Ou Sangue Para O Diagnóstico De Erros Inatos Do Metabolismo (Cada)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40502090",
    description: "Eletroforese Ou Cromatografia (Papel Ou Camada Delgada) Para Identificação De Aminoácidos Ou Glicídios Ou Oligossacarídios Ou Sialoligossacarídios Glicosaminoglicanos Ou Outros Compostos Para Detecção De Erros Inatos Do Metabolismo (Cada)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40502104",
    description: "Ensaios Enzimáticos Em Células Cultivadas Para Diagnóstico De Eim, Incluindo Preparo Do Material, Dosagem De Proteína E Enzima De Referência (Cada)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40502112",
    description: "Ensaios Enzimáticos Em Leucócitos, Eritrócitos Ou Tecidos Para Diagnóstico De Eim, Incluindo Preparo Do Material, Dosagem De Proteína E Enzima De Referência (Cada)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40502120",
    description: "Ensaios Enzimáticos No Plasma Para Diagnóstico De Eim, Incluindo Enzima De Referência (Cada)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40502139",
    description: "Teste Duplo - 1 Trimestre (Papp-A+Beta-Hcg) Ou Outros 2 Em Soro Ou Líquido Aminiótico Com Elaboração De Laudo Contendo Cálculo De Risco Para Anomalias Fetais",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40502147",
    description: "Teste Duplo - 2 Trimestre (Afp+Beta-Hcg) Ou Outros 2 Em Soro Ou Líquido Aminiótico Com Elaboração De Laudo Contendo Cálculo De Risco Para Anomalias Fetais",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40502155",
    description: "Teste Triplo (Afp+Beta-Hcg+Estriol) Ou Outros 3 Em Soro Ou Líquido Aminiótico Com Elaboração De Laudo Contendo Cálculo De Risco Para Anomalias Fetais",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40502163",
    description: "Testes Químicos De Triagem Em Urina Para Erros Inatos Do Metabolismo (Cada)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40502171",
    description: "Dosagem Quantitativa De Carnitina E Perfil De Acilcarnitina, Para O Diagnóstico De Erros Inatos Do Metabolismo",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40502180",
    description: "Dosagem Quantitativa De Ácidos Graxos De Cadeia Muito Longa  Para O Diagnóstico De Eim",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40502198",
    description: "Dosagem Quantitativa De Metabólitos Por Cromatografia / Espectrometria De Massa  (Cg/Ms Ou Hplc/Ms ) Para O Diagnóstico De Eim",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40502201",
    description: "Dosagem Quantitativa De Metabólitos Por Espectrometria De Massa Ou Espectrometria De Massa Em Tandem (Ms Ou Ms/Ms) Para O Diagnóstico De Eim",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40502210",
    description: "Terapia De Reposição Enzimática Por Infusão Endovenosa, Por Procedimento",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40502228",
    description: "Rastreamento Neonatal Para O Diagnósitco De Eim E Outras Doenças",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40502236",
    description: "Dosagem Quantitativa De Ácidos Orgânicos Para O Diagnóstico De Erros Inatos Do Metabolismo (Perfil De Ácidos Orgânicos Numa Amostra)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40502244",
    description: "Defeitos congênitos da glicolização - Focalização isoelétrica da transferrina",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40503011",
    description: "Análise De Dna Com Enzimas De Restrição Por Enzima Utilizada, Por Amostra",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40503020",
    description: "Análise De Dna Fetal Por Enzima De Restrição, Por Enzima Utilizada, Por Amostra (Adicional Nos Exames Em Que Já Foi Feito O Pcr 4.05.03.06-2 E Depende Da Enzima Para Estabelecer O Diagnóstico)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40503038",
    description: "Análise De Dna Fetal Por Sonda Ou Pcr Por Locus, Por Amostra",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40503046",
    description: "Análise De Dna Pela Técnica Multiplex Por Locus Extra, Por Amostra",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40503054",
    description: "Análise De Dna Pela Técnica Multiplex Por Locus, Por Amostra",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40503062",
    description: "Análise De Dna Por Sonda, Ou Pcr Por Locus, Por Amostra",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40503070",
    description: "Diagnóstico Genético Pré-Implantação Por Dna, Por Sonda De Fish Ou Por Primer De Pcr, Por Amostra",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40503089",
    description: "Extração De Dna (Osso), Por Amostra",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40503097",
    description: "Extração De Dna (Sangue, Urina, Líquido Aminiótico, Vilo Trofoblástico Etc.), Por Amostra",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40503100",
    description: "Identificação De Mutação Por Sequenciamento Do Dna, Por 100 Pares De Base Sequenciadas, Por Amostra",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40503119",
    description: "Processamento De Qualquer Tipo De Amostra Biológica Para Estabilização Do Ácido Nucléico, Por Amostra",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40503127",
    description: "Extração, Purificação E Quantificação De Ácido Nucléico De Qualquer Tipo De Amostra Biológica, Por Amostra",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40503135",
    description: "Transcrição Reversa De Rna, Por Amostra",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40503143",
    description: "Amplificação Do Material Genético (Por Pcr, Pcr Em Tempo Real, Lcr, Rt-Pcr Ou Outras Técnicas), Por Primer Utilizado, Por Amostra",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40503151",
    description: "Análise De Dna Por Mlpa, Por Sonda De Dna Utilizada, Por Amostra",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40503160",
    description: "Análise De Dna Pela Técnica De Southern Blot, Por Sonda Utilizada, Por Amostra",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40503178",
    description: "Produção De Dot/Slot-Blot, Por Blot, Por Amostra",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40503186",
    description: "Separação Do Material Genético Por Eletroforese Capilar Ou Em Gel (Agarose, Acrilamida), Por Gel Utilizado, Por Amostra",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40503194",
    description: "Rastreamento De Exon Mutado (Por Gradiente De Desnaturação Ou Conformação De Polimorfismo De Fita Simples Ou Rnase Ou Clivagem Química Ou Outras Técnicas) Para Identificação De Fragmento Mutado, Por Fragmento Analisado, Por Amostra",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40503208",
    description: "Coloração De Gel E Fotodocumentação Da Análise Molecular, Por Amostra",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40503216",
    description: "Interpretação E Elaboração Do Laudo Da Análise Genética, Por Amostra",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40503224",
    description: "Análise De Expressão Gênica Por Locus, Por Amostra, Por Cgh Array, Snp Array Ou Outras Técnicas",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40503232",
    description: "Detecção Pré-Natal Ou Pós-Natal De Alterações Cromossômicas Submicroscópicas Reconhecidamente Causadoras De Síndrome De Genes Contíguos, Por Fish, Qpcr Ou Outra Técnica, Por Locus, Por Amostra",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40503240",
    description: "Rastreamento Pré-Natal Ou Pós-Natal De Todo O Genoma Para  Identificar Alterações Cromossômicas Submicroscópicas Por Cgh-Array Ou Snp-Array Ou Outras Técnicas, Por Clone Ou Oligo Utilizado, Por Amostra",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40503259",
    description: "Validação Pré-Natal Ou Pós-Natal De Alteração Cromossômica Submicroscópica Detectada No Rastreamento Genômico, Por Fish Ou Qpcr Ou Outra Técnica, Por Locus, Por Amostra",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40503267",
    description: "Translocação AML1-ETO t(8,21) por PCR",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40503275",
    description: "Análise da mutação IgVH-cadeia pesada da imunoglobulina",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40503283",
    description: "CCR-5, pesquisa de mutação por PCR",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40503313",
    description: "Cromossomo Y, microdeleções por PCR",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40503348",
    description: "Distrofia miotônica, análise por DNA",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40503372",
    description: "JAK2 (gene), detecção das mutações por PCR",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40503380",
    description: "CCND1 e IGH (genes), hibridização in situ por fluore",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40503399",
    description: "Hemofilia A, análise do DNA",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40503402",
    description: "Hemofilia B, análise do DNA",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40503429",
    description: "Hormônio de crescimento, estudo do gene receptor",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40503437",
    description: "Hormônio de crescimento, estudo molecular do gene",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40503445",
    description: "Neoplasia endócrina múltipla, tipo 1, sangue total",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40503453",
    description: "Hemocromatose, análise por PCR",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40503461",
    description: "Prader-Willi/Angelman, síndrome, diagnóstico",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40503470",
    description: "PROP1, estudo molecular do gene, sangue total",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40503488",
    description: "PTPN11, estudo molecular do gene, sangue total",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40503496",
    description: "Rearranjo 8q24 fish (medula óssea)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40503500",
    description: "Rearranjo 8q24 fish (sangue)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40503518",
    description: "Rearranjo BCL6 3q27 (NHL) fish",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40503542",
    description: "Rearranjo gênico quantitativo BCR/ABL por PCR",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40503577",
    description: "SHOX, estudo molecular do gene, sangue total",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40503593",
    description: "C kit análise mutacional",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40503607",
    description: "CYP21, estudo molecular do gene, sangue",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40503631",
    description: "Detecção de mutações no gene MSH6",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40503640",
    description: "FLT3 pesquisa de mutações por PCR (cada)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40503674",
    description: "Mucolipidosis tipo 4 análise da mutação",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40503682",
    description: "FLT3 pesquisa de mutações por eletroforese capilar (cada)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40503690",
    description: "Distrofia muscular (Duchenne), por PCR",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40503712",
    description: "Pesquisa dea mutação 35delg da conexina",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40503739",
    description: "Atrofia dentato-rubro-palido-luysiana, DRPLA, sangue total",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40503747",
    description: "Detecção de Niemann Pick tipo Cc",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40503755",
    description: "Detecção/tipagem herpes vírus 1/2 líquor",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40503763",
    description: "EGFR, pesquisa de mutação",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40503771",
    description: "K-RAS, pesquisa de mutação",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40503780",
    description: "BRAF, pesquisa de mutação",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40503798",
    description: "NRAS  PCR ou sequenciamento de Sanger  para mutações nos éxons 2,  3 e 4 do gene, no tumor",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40503810",
    description: "Sequenciamento Completo do Exoma",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40503828",
    description: "Rearranjo PML/RARA  t(15;17) RQ-PCR (Quantitativo em tempo real)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40503836",
    description: "Mutação familial específica - PCR do loccus identificado",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40503844",
    description: "Mutação familial específica - Sequenciamento de Sanger do loccus identificado",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40503860",
    description: "Captura/Amplificação e subsequente sequenciamento de regiões genômicas DE ATÉ 20 KILOBASES DE DNA TUMORAL PARA ANÁLISE DE MUTAÇÕES SOMÁTICAS por qualquer técnica de sequenciamento (Sanger ou qualquer forma de sequenciamento de nova geração – NGS)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40503879",
    description: "Captura/Amplificação e subsequente sequenciamento de regiões genômicas DE 20 KILOBASES A 1 MEGABASE DE DNA TUMORAL PARA ANÁLISE DE MUTAÇÕES SOMÁTICAS por qualquer técnica de sequenciamento (Sanger ou qualquer forma de sequenciamento de nova geração – NGS)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40503887",
    description: "Captura/Amplificação e subsequente sequenciamento de regiões genômicas DE 1 MEGABASE A 30 MEGABASES DE DNA TUMORAL PARA ANÁLISE DE MUTAÇÕES SOMÁTICAS por qualquer técnica de sequenciamento (Sanger ou qualquer forma de sequenciamento de nova geração – NGS) (valoração a ser definida)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40503895",
    description: "Captura/Amplificação e subsequente sequenciamento de regiões genômicas DE MAIS DE 30 MEGABASES DE DNA TUMORAL PARA ANÁLISE DE MUTAÇÕES SOMÁTICAS por qualquer técnica de sequenciamento (Sanger ou qualquer forma de sequenciamento de nova geração – NGS); INCLUI EXOMA TUMORAL",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40503909",
    description: "Quantificação  de  proteína  beta  amilóide-42,  no  líquido  cefalorraquidiano  (LCR)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40503917",
    description: "Quantificação de carga viral HIV-1 (HIV RNA) no líquido cefalorraquidiano (LCR)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40503925",
    description: "Quantificação  de  proteína  Tau-fosforilada,  no  líquido  cefalorraquidiano  (LCR)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40503933",
    description: "Quantificação de proteína Tau-Total, no líquido cefalorraquidiano (LCR)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40503941",
    description: "Detecção  de  anticorpo  IgG  anti-HTLV-1/2  no  líquido  cefalorraquidiano  (LCR)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40503950",
    description: "Painel multiplex infeccioso no líquor - painel com até 25 agentes",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "54050301",
    description: "Sequenciamento de BRCA1, BRCA2 e TP53 NGS COM CNV",
    chapter: "5",
    group: "Outros",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40601013",
    description: "Procedimento Diagnóstico Peroperatório Sem Deslocamento Do Patologista",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40601021",
    description: "Procedimento Diagnóstico Peroperatório - Peça Adicional Ou Margem Cirúrgica",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40601030",
    description: "Procedimento Diagnóstico Peroperatório Com Deslocamento Do Patologista",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40601048",
    description: "Necrópsia De Adulto/Criança E Natimorto Com Suspeita De Anomalia Genética",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40601056",
    description: "Necrópsia De Embrião/Feto Até 500 Gramas",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40601064",
    description: "Microscopia Eletrônica",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40601072",
    description: "Ato De Coleta De Paaf De Órgãos Ou Estruturas Superficiais Sem Deslocamento Do Patologista",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40601080",
    description: "Ato De Coleta De Paaf De Órgãos Ou Estruturas Profundas Sem Deslocamento Do Patologista",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40601099",
    description: "Ato De Coleta De Paaf De Órgãos Ou Estruturas Superficiais Com Deslocamento Do Patologista",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40601102",
    description: "Ato De Coleta De Paaf De Órgãos Ou Estruturas Profundas Com Deslocamento Do Patologista",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40601110",
    description: "Procedimento Diagnóstico Em Biópsia Simples Imprint E Cell Block",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40601129",
    description: "Procedimento Diagnóstico Citopatológico Oncótico De Líquidos E Raspados Cutâneos",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40601137",
    description: "Procedimento Diagnóstico Em Citopatologia Cérvico-Vaginal Oncótica",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40601145",
    description: "Procedimento Diagnóstico Em Citologia Hormonal Seriado",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40601153",
    description: "Procedimento Diagnóstico Em Revisão De Lâminas Ou Cortes Histológicos Seriados",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40601161",
    description: "Procedimento Diagnóstico Em Citologia Hormonal Isolada",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40601170",
    description: "Procedimento Diagnóstico Em Painel De Imunoistoquímica (Duas A Cinco Reações)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40601188",
    description: "Procedimento Diagnóstico Em Reação Imunoistoquímica Isolada",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40601196",
    description: "Procedimento Diagnóstico Em Fragmentos Múltiplos De Biópsias De Mesmo Órgão Ou Topografia, Acondicionados Em Um Mesmo Frasco",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40601200",
    description: "Procedimento Diagnóstico Em Peça Anatômica Ou Cirúrgica Simples",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40601218",
    description: "Procedimento Diagnóstico Em Peça Cirúrgica Ou Anatômica Complexa",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40601226",
    description: "Procedimento Diagnóstico Em Grupos De Linfonodos, Estruturas Vizinhas E Margens De Peças Anatômicas Simples Ou Complexas (Por Margem) - Máximo De Três Margens",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40601234",
    description: "Procedimento Diagnóstico Em Amputação De Membros - Sem Causa Oncológica",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40601242",
    description: "Procedimento Diagnóstico Em Amputação De Membros - Causa Oncológica",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40601250",
    description: "Procedimento Diagnóstico Em Lâminas De Paaf Até 5",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40601269",
    description: "Coloração Especial Por Coloração",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40601277",
    description: "Procedimento Diagnóstico Em Imunofluorescência",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40601285",
    description: "Procedimento Diagnóstico Em Painel De Hibridização In Situ",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40601293",
    description: "Procedimento Diagnóstico Por Captura Híbrida",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40601307",
    description: "Procedimento Diagnóstico Em Citometria De Fluxo (Por Monoclonal Pesquisado)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40601315",
    description: "Procedimento Diagnóstico Em Citometria De Imagens",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40601323",
    description: "Procedimento Diagnóstico Citopatológico Em Meio Líquido",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40601331",
    description: "Citológico anatomia patológica, qualquer material",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40601340",
    description: "Citológico Em Líquido Ascítico",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40601358",
    description: "Citológico Em Líquido Pericárdio",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40601366",
    description: "Citológico Em Líquido Sinovial",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40601374",
    description: "Citológico Em Outros Materiais",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40601382",
    description: "Dna Citometria Fluxo Parafina - Outros Materiais",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40601390",
    description: "Imprint De Gânglio",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40601404",
    description: "Imprint De Medula Óssea",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40601439",
    description: "Instabilidade De Microssatélites (Msi), Detecção Por Pcr, Bloco De Parafina",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40602010",
    description: "PD-L1    Detecção por técnicas imunohistoquímicas",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40701018",
    description: "Angiografia Radioisotópica",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40701026",
    description: "Cintilografia Com Hemácias Marcadas",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40701034",
    description: "Cintilografia Do Miocárdio Com Duplo Isótopo (Perfusão + Viabilidade)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40701042",
    description: "Cintilografia Do Miocárdio Com Fdg-18 F, Em Câmara Híbrida",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40701050",
    description: "Cintilografia Do Miocárdio Necrose (Infarto Agudo)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40701069",
    description: "Cintilografia Do Miocárdio Perfusão - Repouso",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40701077",
    description: "Cintilografia Sincronizada Das Câmaras Cardíacas - Esforço",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40701085",
    description: "Cintilografia Sincronizada Das Câmaras Cardíacas - Repouso",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40701093",
    description: "Fluxo Sanguíneo Das Extremidades",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40701107",
    description: "Quantificação De Shunt Da Direita Para A Esquerda",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40701115",
    description: "Quantificação De Shunt Periférico",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40701123",
    description: "Venografia Radioisotópica",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40701131",
    description: "Cintilografia Do Miocárdio Perfusão - Estresse Farmacológico",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40701140",
    description: "Cintilografia Do Miocárdio Perfusão - Estresse Físico",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40701158",
    description: "Cintilografia de perfusão do miocárido, associada à Dobutamina",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40702014",
    description: "Cintilografia Das Glândulas Salivares Com Ou Sem Estímulo",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40702022",
    description: "Cintilografia Do Fígado E Do Baço",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40702030",
    description: "Cintilografia Do Fígado E Vias Biliares",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40702049",
    description: "Cintilografia Para Detecção De Hemorragia Digestória Ativa",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40702057",
    description: "Cintilografia Para Detecção De Hemorragia Digestória Não Ativa",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40702065",
    description: "Cintilografia Para Determinação Do Tempo De Esvaziamento Gástrico",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40702073",
    description: "Cintilografia Para Estudo De Trânsito Esofágico (Líquidos)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40702081",
    description: "Cintilografia Para Estudo De Trânsito Esofágico (Semi-Sólidos)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40702090",
    description: "Cintilografia Para Pesquisa De Divertículo De Meckel",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40702103",
    description: "Cintilografia Para Pesquisa De Refluxo Gastro-Esofágico",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40702111",
    description: "Fluxo Sanguíneo Hepático (Qualitativo E Quantitativo)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40702120",
    description: "Absorção De Gorduras",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40702138",
    description: "Perdas Proteicas",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40702146",
    description: "Cintilografia, receptores da Somatostatina com lutécio - 177",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40703010",
    description: "Cintilografia Da Tireóide E/Ou Captação (Iodo - 123)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40703029",
    description: "Cintilografia Da Tireóide E/Ou Captação (Iodo - 131)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40703037",
    description: "Cintilografia Da Tireóide E/Ou Captação (Tecnécio - 99M Tc)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40703045",
    description: "Cintilografia Das Paratireóides",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40703053",
    description: "Cintilografia De Corpo Inteiro Para Pesquisa De Metástases (Pci)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40703061",
    description: "Teste De Estímulo Com Tsh Recombinante",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40703070",
    description: "Teste De Supressão Da Tireóide Com T3",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40703088",
    description: "Teste Do Perclorato",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40703096",
    description: "Cintilografia de corpo inteiro com metaiodobenzilguandina - iodo-123",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40703100",
    description: "Cintilografia de corpo inteiro com MIBI marcada com tecnécio - 99m",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40704017",
    description: "Cintilografia Renal Dinâmica",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40704025",
    description: "Cintilografia Renal Dinâmica Com Diurético",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40704033",
    description: "Cintilografia Renal Estática (Quantitativa Ou Qualitativa)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40704041",
    description: "Cintilografia Testicular (Escrotal)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40704050",
    description: "Cistocintilografia Direta",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40704068",
    description: "Cistocintilografia Indireta",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40704076",
    description: "Determinação Da Filtração Glomerular",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40704084",
    description: "Determinação Do Fluxo Plasmático Renal",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40704092",
    description: "Renograma",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40705013",
    description: "Cintilografia Do Sistema Retículo-Endotelial (Medula Óssea)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40705021",
    description: "Demonstração Do Sequestro De Hemácias Pelo Baço",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40705030",
    description: "Determinação Da Sobrevida De Hemácias",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40705048",
    description: "Determinação Do Volume Eritrocitário",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40705056",
    description: "Determinação Do Volume Plasmático",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40705064",
    description: "Teste De Absorção De Vitamina B12 Com Cobalto - 57 (Teste De Schilling)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40706010",
    description: "Cintilografia Óssea (Corpo Total)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40706028",
    description: "Fluxo Sanguíneo Ósseo",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40707016",
    description: "Cintilografia Cerebral",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40707024",
    description: "Cintilografia Cerebral Com Fdg-18 F, Em Câmara Hibrída",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40707032",
    description: "Cintilografia De Perfusão Cerebral",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40707040",
    description: "Cisternocintilografia",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40707059",
    description: "Cisternocintilografia Para Pesquisa De Fístula Liquórica",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40707067",
    description: "Fluxo Sanguíneo Cerebral",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40707075",
    description: "Mielocintilografia",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40707083",
    description: "Ventrículo-Cintilografia",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40707091",
    description: "Cintilografia de perfusão cerebral para avaliação de transportadores de dopamina",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40708012",
    description: "Cintilografia Com Análogo De Somatostatina",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40708020",
    description: "Cintilografia Com Gálio-67",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40708039",
    description: "Cintilografia Com Leucócitos Marcados",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40708047",
    description: "Cintilografia Com Mibg (Metaiodobenzilguanidina)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40708055",
    description: "Cintilografia De Corpo Total Com Fdg-18 F, Em Câmara Híbrida",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40708063",
    description: "Cintilografia De Mama (Bilateral)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40708071",
    description: "Demarcação Radioisotópica De Lesões Tumorais",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40708080",
    description: "Detecção Intraoperatória Radioguiada De Lesões Tumorais",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40708098",
    description: "Detecção Intraoperatória Radioguiada De Linfonodo Sentinela",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40708101",
    description: "Linfocintilografia",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40708110",
    description: "Quantificação Da Captação Pulmonar Com Gálio-67",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40708128",
    description: "Pet Dedicado Oncológico",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40708136",
    description: "PET CT neurológico com FDG",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40708144",
    description: "Revisão de PET-CT por procedimento",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40708152",
    description: "Laudo evolutivo de PET-CT por procedimento",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40709019",
    description: "Cintilografia Para Detecção De Aspiração Pulmonar",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40709027",
    description: "Cintilografia Pulmonar (Inalação)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40709035",
    description: "Cintilografia Pulmonar (Perfusão)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40710017",
    description: "Sessão Médica Para Planejamento Técnico De Radioisotopoterapia",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40710025",
    description: "Tratamento Com Metaiodobenzilguanidina (Mibg)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40710033",
    description: "Tratamento Da Policitemia Vera",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40710041",
    description: "Tratamento De Câncer Da Tireóide",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40710050",
    description: "Tratamento De Hipertireoidismo-Bócio Nodular Tóxico (Graves)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40710068",
    description: "Tratamento De Hipertireoidismo-Bócio Nodular Tóxico (Plummer)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40710076",
    description: "Tratamento De Metástases Ósseas (Estrôncio-90)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40710084",
    description: "Tratamento De Metástases Ósseas (Samário-153)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40710092",
    description: "Tratamento De Tumores Neuroendócrinos",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40710114",
    description: "Tratamento de metástases ósseas com isótopos alfa emissor - planejamento e 1º dia de tratamento",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40710122",
    description: "Tratamento de metástases ósseas com isótopos alfa emissor - por dia de atendimento (até o início do próximo ciclo - intervalo de 4 a 8 semanas)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40711013",
    description: "Dacriocintilografia",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40711021",
    description: "Imunocintilografia (Anticorpos Monoclonais)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40801012",
    description: "Rx - Crânio - 2 Incidências",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40801020",
    description: "Rx - Crânio - 3 Incidências",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40801039",
    description: "Rx - Crânio - 4 Incidências",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40801047",
    description: "Rx - Orelha, Mastóides Ou Rochedos - Bilateral",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40801055",
    description: "Rx - Órbitas - Bilateral",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40801063",
    description: "Rx - Seios Da Face",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40801071",
    description: "Rx - Sela Túrcica",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40801080",
    description: "Rx - Maxilar Inferior",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40801098",
    description: "Rx - Ossos Da Face",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40801101",
    description: "Rx - Arcos Zigomáticos Ou Malar Ou Apófises Estilóides",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40801110",
    description: "Rx - Articulação Temporomandibular - Bilateral",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40801128",
    description: "Rx - Adenóides Ou Cavum",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40801136",
    description: "Rx - Panorâmica De Mandíbula (Ortopantomografia)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40801144",
    description: "Rx - Teleperfil Em Cefalostato - Sem Traçado",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40801152",
    description: "Rx - Teleperfil Em Cefalostato - Com Traçado",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40801160",
    description: "Rx - Arcada Dentária (Por Arcada)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40801179",
    description: "Rx - Radiografia Peri-Apical",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40801187",
    description: "Rx - Radiografia Oclusal",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40801195",
    description: "Rx - Planigrafia Linear De Crânio Ou Sela Túrcica Ou Face Ou Mastóide",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40801209",
    description: "Rx - Incidência Adicional De Crânio Ou Face",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40802019",
    description: "Rx - Coluna Cervical - 3 Incidências",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40802027",
    description: "Rx - Coluna Cervical - 5 Incidências",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40802035",
    description: "Rx - Coluna Dorsal - 2 Incidências",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40802043",
    description: "Rx - Coluna Dorsal - 4 Incidências",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40802051",
    description: "Rx - Coluna Lombo-Sacra - 3 Incidências",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40802060",
    description: "Rx - Coluna Lombo-Sacra - 5 Incidências",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40802078",
    description: "Rx - Sacro-Coccix",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40802086",
    description: "Rx - Coluna Dorso-Lombar Para Escoliose",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40802094",
    description: "Rx - Coluna Total Para Escoliose (Telespondilografia)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40802108",
    description: "Rx - Planigrafia De Coluna Vertebral (Dois Planos)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40802116",
    description: "Rx - Incidência Adicional De Coluna",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40803015",
    description: "Rx - Esterno",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40803023",
    description: "Rx - Articulação Esternoclavicular",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40803031",
    description: "Rx - Costelas - Por Hemitórax",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40803040",
    description: "Rx - Clavícula",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40803058",
    description: "Rx - Omoplata Ou Escápula",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40803066",
    description: "Rx - Articulação Acromioclavicular",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40803074",
    description: "Rx - Articulação Escapuloumeral (Ombro)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40803082",
    description: "Rx - Braço",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40803090",
    description: "Rx - Cotovelo",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40803104",
    description: "Rx - Antebraço",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40803112",
    description: "Rx - Punho",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40803120",
    description: "Rx - Mão Ou Quirodáctilo",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40803139",
    description: "Rx - Mãos E Punhos Para Idade Óssea",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40803147",
    description: "Rx - Incidência Adicional De Membro Superior",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40804011",
    description: "Rx - Bacia",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40804020",
    description: "Rx - Articulações Sacroilíacas",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40804038",
    description: "Rx - Articulação Coxofemoral (Quadril)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40804046",
    description: "Rx - Coxa",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40804054",
    description: "Rx - Joelho",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40804062",
    description: "Rx - Patela",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40804070",
    description: "Rx - Perna",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40804089",
    description: "Rx - Articulação Tibiotársica (Tornozelo)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40804097",
    description: "Rx - Pé Ou Pododáctilo",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40804100",
    description: "Rx - Calcâneo",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40804119",
    description: "Rx - Escanometria",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40804127",
    description: "Rx - Panorâmica Dos Membros Inferiores",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40804135",
    description: "Rx - Incidência Adicional De Membro Inferior",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40805018",
    description: "Rx - Tórax - 1 Incidência",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40805026",
    description: "Rx - Tórax - 2 Incidências",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40805034",
    description: "Rx - Tórax - 3 Incidências",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40805042",
    description: "Rx - Tórax - 4 Incidências",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40805050",
    description: "Rx - Coração E Vasos Da Base",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40805069",
    description: "Rx - Planigrafia De Tórax, Mediastino Ou Laringe",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40805077",
    description: "Rx - Laringe Ou Hipofaringe Ou Pescoço (Partes Moles)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40805085",
    description: "Rx - Abreugrafia 100 Mm",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40805093",
    description: "Rx - Abreugrafia 35 Ou 70 Mm",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40806014",
    description: "Rx - Deglutograma",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40806022",
    description: "Rx - Videodeglutograma",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40806030",
    description: "Rx - Esôfago",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40806049",
    description: "Rx - Estômago E Duodeno",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40806057",
    description: "Rx - Esôfago - Hiato - Estômago E Duodeno",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40806065",
    description: "Rx - Trânsito E Morfologia Do Delgado",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40806073",
    description: "Rx - Estudo Do Delgado Com Duplo Contraste",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40806081",
    description: "Rx - Clister Ou Enema Opaco (Duplo Contraste)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40806090",
    description: "Rx - Defecograma",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40806103",
    description: "Rx - Colangiografia Intra-Operatória",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40806111",
    description: "Rx - Colangiografia Pós-Operatória (Pelo Dreno)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40806120",
    description: "Rx - Colangiografia Pré-Operatória",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40806138",
    description: "Rx - Colangiografia Venosa",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40806154",
    description: "Rx - Colecistograma Oral",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40806162",
    description: "Rx - Colecistograma Oral Com Prova Motora",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40806170",
    description: "Rx - Duodenografia Hipotônica",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40806200",
    description: "Rx - Videodefecograma",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40807010",
    description: "Rx - Urografia Venosa Com Bexiga Pré E Pós-Miccional",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40807029",
    description: "Rx - Pielografia Ascendente",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40807037",
    description: "Rx - Urografia Venosa Minutada 1-2-3",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40807045",
    description: "Rx - Urografia Venosa Com Nefrotomografia",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40807053",
    description: "Rx - Uretrocistografia De Adulto",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40807061",
    description: "Rx - Uretrocistografia De Criança (Até 12 Anos)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40807070",
    description: "Rx - Tomografia Renal Sem Contraste",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40807088",
    description: "RX - Pênis",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40808017",
    description: "Rx - Abdome Simples",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40808025",
    description: "Rx - Abdome Agudo",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40808033",
    description: "Mamografia Convencional Bilateral",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40808041",
    description: "Mamografia Digital Bilateral",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40808050",
    description: "Rx - Ampliação Ou Magnificação De Lesão Mamária",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40808114",
    description: "Rx - Esqueleto (Incidências Básicas De: Crânio, Coluna, Bacia E Membros)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40808122",
    description: "Densitometria Óssea (Um Segmento)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40808130",
    description: "Densitometria Óssea - Rotina: Coluna E Fêmur (Ou Dois Segmentos)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40808149",
    description: "Densitometria Óssea - Corpo Inteiro (Avaliação De Massa Óssea Ou De Composição Corporal)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40808157",
    description: "Rx - Avaliação De Fraturas Vertebrais Por Dxa",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40808165",
    description: "Planigrafia De Osso",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40808173",
    description: "Xeromamografia",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40808190",
    description: "Marcação Pré-Cirúrgica Por Nódulo - Máximo De 3 Nódulos Por Mama, Por Estereotaxia (Não Inclui Exame De Imagem)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40808203",
    description: "Marcação pré-cirúrgica por nódulo - máximo de 3 nódulos por mama, por US (não inclui exame de imagem)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40808211",
    description: "Marcação Pré-Cirúrgica Por Nódulo - Máximo De 3 Nódulos Por Mama, Por Rm (Não Inclui Exame De Imagem)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40808220",
    description: "Punção Ou Biópsia Mamária Percutânea Por Agulha Fina Orientada Por Estereotaxia (Não Inclui O Exame De Base)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40808238",
    description: "Punção Ou Biópsia Mamária Percutânea Por Agulha Fina Orientada Por Us (Não Inclui O Exame De Base)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40808246",
    description: "Punção Ou Biópsia Mamária Percutânea Por Agulha Fina Orientada Por Tc (Não Inclui O Exame De Base)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40808254",
    description: "Biópsia Percutânea De Fragmento Mamário Por Agulha Grossa (Core Biopsy) Orientada Por Estereotaxia (Não Inclui O Exame De Imagem)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40808262",
    description: "Biópsia Percutânea De Fragmento Mamário Por Agulha Grossa (Core Biopsy) Orientada Por Us (Não Inclui O Exame De Imagem)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40808270",
    description: "Biópsia Percutânea De Fragmento Mamário Por Agulha Grossa (Core Biopsy) Orientada Por Rm (Não Inclui O Exame De Imagem)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40808289",
    description: "Mamotomia Por Estereotaxia (Não Inclui O Exame De Imagem)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40808297",
    description: "Mamotomia Por Us (Não Inclui O Exame De Imagem)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40808300",
    description: "Mamotomia Por Rm (Não Inclui O Exame De Imagem)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40808319",
    description: "Colocação de clipe(s) pré QT neoadjuvante em axila - cada lado (não inclui o exame de base)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40808327",
    description: "Colocação de clipe(s) pré QT neoadjuvante em mam - cada lado (não inclui o exame de base)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40808335",
    description: "Revisão de Mamografia por procedimento",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40808343",
    description: "Revisão de densitometria óssea por procedimento",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40808351",
    description: "Revisão de Raio X por procedimento",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40808360",
    description: "Laudo Evolutivo de Mamografia por procedimento",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40808378",
    description: "Laudo Evolutivo de Densitometria Óssea por procedimento",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40808386",
    description: "Laudo Evolutivo de Raio X por procedimento",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40809021",
    description: "Sialografia (Por Glândula)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40809030",
    description: "Histerossalpingografia",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40809048",
    description: "Artrografia Ou Pneumoartrografia",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40809056",
    description: "Fistulografia",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40809064",
    description: "Colangiografia Transcutânea",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40809072",
    description: "Colangiopancreatografia Retrógrada",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40809080",
    description: "Dacriocistografia",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40809102",
    description: "Drenagem Percutânea Orientada Por Rx (Acrescentar O Exame De Base)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40809129",
    description: "Broncografia Unilateral",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40809137",
    description: "Pneumoperitônio (Rx)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40809153",
    description: "Punção Biópsia/Aspirativa De Órgão Ou Estrutura Superficial Orientada Por Rx (Não Inclui O Exame De Base)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40809161",
    description: "Punção Biópsia/Aspirativa De Órgão Ou Estrutura Superficial Orientada Por Us (Não Inclui O Exame De Base)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40809170",
    description: "Punção Biópsia/Aspirativa De Órgão Ou Estrutura Superficial Orientada Por Tc (Não Inclui O Exame De Base)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40809188",
    description: "Punção Biópsia/Aspirativa De Órgão Ou Estrutura Superficial Orientada Por Rm (Não Inclui O Exame De Base)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40809196",
    description: "Punção biópsia/aspirativa de órgão ou estrutura profunda orientada por RM (não inclui o exame de base)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40809200",
    description: "Punção biópsia/aspirativa de órgão ou estrutura profunda orientada por RX (não inclui o exame de base)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40809218",
    description: "Punção biópsia/aspirativa de órgão ou estrutura profunda orientada por TC (não inclui o exame de base)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40809226",
    description: "Punção biópsia/aspirativa de órgão ou estrutura profunda orientada por US (não inclui o exame de base)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40810011",
    description: "Mielografia Segmentar (Por Segmento)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40810020",
    description: "Teste De Oclusão De Artéria Carótida Ou Vertebral",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40810038",
    description: "Colheita Seletiva De Sangue Para Dosagem Hormonal",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40810046",
    description: "Avaliação Hemodinâmica Por Cateterismo (Aferimento De Pressão Ou Fluxo Arterial Ou Venoso)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40811018",
    description: "Radioscopia Diagnóstica",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40811026",
    description: "Radioscopia Para Acompanhamento De Procedimento Cirúrgico (Por Hora Ou Fração)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40812014",
    description: "Aortografia Abdominal Por Punção Translombar",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40812022",
    description: "Angiografia Por Punção",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40812030",
    description: "Angiografia Por Cateterismo Não Seletivo De Grande Vaso",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40812049",
    description: "Angiografia Por Cateterismo Seletivo De Ramo Primário - Por Vaso",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40812057",
    description: "Angiografia Por Cateterismo Superseletivo De Ramo Secundário Ou Distal - Por Vaso",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40812065",
    description: "Angiografia Transoperatória De Posicionamento",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40812073",
    description: "Angiografia Pós-Operatória De Controle",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40812081",
    description: "Flebografia Por Punção Venosa Unilateral",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40812090",
    description: "Flebografia Retrógrada Por Cateterismo - Unilateral",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40812103",
    description: "Portografia Trans-Hepática",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40812111",
    description: "Esplenoportografia Percutânea",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40812120",
    description: "Linfangioadenografia Unilateral",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40812138",
    description: "Cavernosografia",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40812146",
    description: "Fármaco-Cavernosografia (Dinâmica)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40812162",
    description: "Cone beam CT ou Tomografia Computadorizada em “Feixe Cônico” intra operatória",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40813010",
    description: "Ablação Percutânea De Tumor Torácico (Qualquer Método)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "40813029",
    description: "Ablação Percutânea De Tumor Hepático (Qualquer Método) - Metodo Intervencionista/Terapêutico Por Imagem",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "40813037",
    description: "Ablação Percutânea De Tumor Ósseo (Qualquer Método)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "40813045",
    description: "Ablação Percutânea De Tumor (Qualquer Método)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "40813053",
    description: "Alcoolização Percutânea De Angioma",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "40813061",
    description: "Angioplastia De Ramo Intracraniano",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "40813070",
    description: "Angioplastia De Tronco Supra-Aórtico",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "40813088",
    description: "Angioplastia De Aorta Para Tratamento De Coarctação",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "40813100",
    description: "Angioplastia De Artéria Visceral - Por Vaso",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "40813118",
    description: "Angioplastia Arterial Ou Venosa De Anastomose Vascular De Fígado Transplantado",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "40813126",
    description: "Angioplastia Renal Para Tratamento De Hipertensão Renovascular Ou Outra Condição",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "40813134",
    description: "Angioplastia Arterial Ou Venosa De Anastomose Vascular De Rim Transplantado",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "40813142",
    description: "Angioplastia De Ramos Hipogástricos Para Tratamento De Impotência",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "40813150",
    description: "Angioplastia De Tronco Venoso",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "40813169",
    description: "Angioplastia Venosa Para Tratamento De Síndrome De Budd-Chiari",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "40813177",
    description: "Angioplastia Transluminal Percutânea",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "40813185",
    description: "Angioplastia Transluminal Percutânea Para Tratamento De Obstrução Arterial",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "40813193",
    description: "Colocação De Stent Em Ramo Intracraniano",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "40813207",
    description: "Colocação De Stent Em Tronco Supra-Aórtico",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "40813215",
    description: "Colocação De Stent Aórtico",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "40813223",
    description: "Colocação De Stent Para Tratamento De Síndrome De Vci",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "40813231",
    description: "Colocação De Cateter Venoso Central Ou Portocath",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "40813240",
    description: "Colocação De Filtro De Vci Para Prevenção De Tep",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "40813258",
    description: "Colocação De Stent Em Artéria Visceral - Por Vaso",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "40813266",
    description: "Colocação De Stent Para Tratamento De Obstrução Arterial Ou Venosa",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "40813274",
    description: "Colocação De Stent Revestido (Stent-Graft) Para Tratamento De Aneurisma Periférico",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "40813282",
    description: "Colocação De Stent Revestido (Stent-Graft) Para Tratamento De Fístula Arteriovenosa",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "40813290",
    description: "Colocação De Stent Em Estenose Vascular De Enxerto Transplantado",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "40813304",
    description: "Colocação De Stent Em Traquéia Ou Brônquio",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "40813312",
    description: "Colocação De Stent Esofagiano, Duodenal Ou Colônico",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "40813320",
    description: "Colocação De Stent Biliar",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "40813339",
    description: "Colocação De Stent Renal",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "40813347",
    description: "Colocação Percutânea De Cateter Pielovesical",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "40813355",
    description: "Colocação Percutânea De Stent Vascular",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "40813363",
    description: "Coluna Vertebral: Infiltração Foraminal Ou Facetária Ou Articular",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "40813371",
    description: "Dilatação Percutânea De Estenose Biliar Cicatricial",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "40813380",
    description: "Dilatação Percutânea De Estenose De Conduto Urinário",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "40813398",
    description: "Dilatação Percutânea De Estenose De Ducto Pancreático",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "40813401",
    description: "Aterectomia Percutânea Orientada Por Rx",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "40813410",
    description: "Drenagem Percutânea De Coleção Pleural",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "40813428",
    description: "Drenagem Percutânea De Pneumotórax",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "40813436",
    description: "Drenagem De Abscesso Pulmonar Ou Mediastinal",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "40813444",
    description: "Drenagem Mediastinal Orientada Por Rx Ou Tc",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "40813452",
    description: "Drenagem Percutânea De Coleção Infectada Abdominal",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "40813460",
    description: "Drenagem Percutânea De Abscesso Hepático Ou Pancreático",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "40813479",
    description: "Drenagem Percutânea De Cisto Hepático Ou Pancreático",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "40813487",
    description: "Drenagem Percutânea De Via Biliar",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "40813495",
    description: "Drenagem Percutânea De Cisto Renal",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "40813509",
    description: "Drenagem Percutânea De Abscesso Renal",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "40813517",
    description: "Drenagem Percutânea De Coleção Infectada Profunda",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "40813525",
    description: "Drenagem Percutânea De Abscesso Retroperitoneal Ou Pélvico",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "40813533",
    description: "Drenagem Percutânea Não Especificada",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "40813541",
    description: "Embolização De Aneurisma Cerebral Por Oclusão Sacular - Por Vaso",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "40813550",
    description: "Embolização De Aneurisma Cerebral Por Oclusão Vascular - Por Vaso",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "40813568",
    description: "Embolização De Malformação Arteriovenosa Cerebral Ou Medular - Por Vaso",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "40813576",
    description: "Embolização De Fístula Arteriovenosa Em Cabeça, Pescoço Ou Coluna - Por Vaso",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "6"
  },
  {
    code: "40813584",
    description: "Embolização Para Tratamento De Epistaxe",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "40813592",
    description: "Embolização De Aneurisma Ou Pseudoaneurisma Visceral",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "40813606",
    description: "Embolização Brônquica Para Tratamento De Hemoptise",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "40813614",
    description: "Embolização Pulmonar Para Tratamento De Fístula Arteriovenosa Ou Outra Situação",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "40813622",
    description: "Embolização De Varizes Esofagianas Ou Gástricas",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "40813630",
    description: "Embolização De Hemorragia Digestiva",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "40813649",
    description: "Embolização De Ramo Portal",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "40813657",
    description: "Embolização Esplênica Para Tratamento De Hiperesplenismo Ou Outra Situação",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "40813665",
    description: "Embolização Arterial Para Tratamento De Priapismo",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "40813673",
    description: "Embolização Para Tratamento De Impotência",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "40813681",
    description: "Embolização De Ramos Hipogástricos Para Tratamento De Sangramento Ginecológico",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "40813690",
    description: "Embolização Seletiva De Fístula Ou Aneurisma Renal Para Tratamento De Hematúria",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "40813703",
    description: "Embolização De Artéria Renal Para Nefrectomia",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "40813711",
    description: "Embolização De Fístula Arteriovenosa Não Especificada Acima - Por Vaso",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "40813720",
    description: "Embolização De Malformação Vascular - Por Vaso",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "40813738",
    description: "Embolização De Pseudoaneurisma - Por Vaso",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "40813746",
    description: "Embolização De Artéria Uterina Para Tratamento De Mioma Ou Outras Situações",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "40813754",
    description: "Embolização De Veia Espermática Para Tratamento De Varicocele",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "40813762",
    description: "Embolização De Veias Ovarianas Para Tratamento De Varicocele",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "40813770",
    description: "Embolização Definitiva Não Especificada Acima - Por Vaso",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "40813789",
    description: "Embolização De Tumor De Cabeça E Pescoço",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "40813797",
    description: "Embolização De Tumor Do Aparelho Digestivo",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "40813800",
    description: "Embolização De Tumor Ósseo Ou De Partes Moles",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "40813819",
    description: "Embolização De Tumor Não Especificado",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "40813827",
    description: "Traqueotomia Percutânea Orientada Por Rx Ou Tc",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "40813835",
    description: "Gastrostomia Percutânea Orientada Por Rx Ou Tc",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "2"
  },
  {
    code: "40813843",
    description: "Colecistostomia Percutânea Orientada Por Rx, Us Ou Tc",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "40813851",
    description: "Esclerose Percutânea De Cisto Pancreático",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "40813860",
    description: "Celostomia Percutânea Orientada Por Rx Ou Tc",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "40813878",
    description: "Nefrostomia Percutânea Orientada Por Rx, Us, Tc Ou Rm",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "40813886",
    description: "Pielografia Percutânea Orientada Por Rx, Us, Tc Ou Rm",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "40813894",
    description: "Exérese Percutânea De Tumor Benigno Orientada Por Rx, Us, Tc Ou Rm",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "40813908",
    description: "Quimioterapia Por Cateter De Tumor De Cabeça E Pescoço",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "40813916",
    description: "Quimioembolização Para Tratamento De Tumor Hepático",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "40813924",
    description: "Quimioterapia Por Cateter Intra-Arterial",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "40813932",
    description: "Tips - Anastomose Porto-Cava Percutânea Para Tratamento De Hipertensão Portal",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "7"
  },
  {
    code: "40813940",
    description: "Implante De Endoprótese Em Aneurisma De Aorta Abdominal Ou Torácica Com Stent Revestido (Stent-Graft)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "40813959",
    description: "Implante De Endoprótese Em Dissecção De Aorta Abdominal Ou Torácica Com Stent Revestido (Stent-Graft)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "40813967",
    description: "Tratamento De Pseudoaneurisma Por Compressão Com Us-Doppler",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "40813975",
    description: "Tratamento Do Vasoespasmo Pós-Trauma",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "40813983",
    description: "Trombectomia Mecânica Para Tratamento De Tep",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "40813991",
    description: "Trombectomia Mecânica Venosa",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "40814017",
    description: "Trombectomia Medicamentosa Para Tratamento De Tep",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "40814025",
    description: "Trombólise Medicamentosa Arterial Ou Venosa - Por Vaso",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "40814033",
    description: "Trombólise Medicamentosa Arterial Ou Venosa Para Tratamento De Isquemia Mesentérica",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "40814041",
    description: "Trombólise Medicamentosa Em Troncos Supra-Aórticos E Intracranianos",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "40814050",
    description: "Repermeabilização Tubária Para Tratamento De Infertilidade",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "40814068",
    description: "Retirada Percutânea De Cálculos Biliares Orientada Por Rx, Us Ou Tc",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "40814076",
    description: "Retirada Percutânea De Cálculos Renais Orientada Por Rx, Us Ou Tc",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "40814084",
    description: "Retirada Percutânea De Corpo Estranho Intravascular",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "40814092",
    description: "Osteoplastia Ou Discectomia Percutânea (Vertebroplastia E Outras)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "40814106",
    description: "Discografia",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "40814114",
    description: "Litotripsia Mecânica De Cálculos Renais Orientada Por Rx Ou Us",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "4"
  },
  {
    code: "40814122",
    description: "Trituração De Calcificação Tendínea Orientada Por Rx Ou Us",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "40814130",
    description: "Sinusografia (Abscessografia)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "40814149",
    description: "Paracentese Orientada Por Rx Ou Us",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "40814157",
    description: "Manipulação De Drenos Pós-Drenagem (Orientada Por Rx, Tc, Us Ou Rm)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "40814165",
    description: "Esclerose Percutânea De Nódulos Benignos Dirigida Por Rx, Us, Tc Ou Rm",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "3"
  },
  {
    code: "40814181",
    description: "Ablação percutânea de tumor renal (qualquer método)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "40814190",
    description: "Embolização das artérias prostáticas, por vaso",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "40814211",
    description: "Radioembolização hepática",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "5"
  },
  {
    code: "40814220",
    description: "Trombectomia no acidente vascular cerebral AVC isquêmico agudo",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "7"
  },
  {
    code: "40901017",
    description: "Us - Globo Ocular - Bilateral",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40901025",
    description: "Us - Globo Ocular Com Doppler Colorido - Bilateral",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40901033",
    description: "Us - Glândulas Salivares (Todas)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40901041",
    description: "Us - Torácico Extracardíaco",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40901050",
    description: "Ecodopplercardiograma Com Contraste Intracavitário",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40901068",
    description: "Ecodopplercardiograma Com Contraste Para Perfusão Miocárdica - Em Repouso",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40901076",
    description: "Ecodopplercardiograma Com Estresse Farmacológico",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40901084",
    description: "Ecodopplercardiograma Fetal Com Mapeamento De Fluxo Em Cores - Por Feto",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40901092",
    description: "Ecodopplercardiograma Transesofágico (Inclui Transtorácico)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40901106",
    description: "Ecodopplercardiograma Transtorácico",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40901114",
    description: "Us - Mamas",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40901122",
    description: "Us - Abdome Total (Abdome Superior, Rins, Bexiga, Aorta, Veia Cava Inferior E Adrenais)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40901130",
    description: "Us - Abdome Superior (Fígado, Vias Biliares, Vesícula, Pâncreas E Baço)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40901149",
    description: "Us - Retroperitônio (Grandes Vasos Ou Adrenais)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40901173",
    description: "Us - Abdome Inferior Masculino (Bexiga, Próstata E Vesículas Seminais)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40901181",
    description: "Us - Abdome Inferior Feminino (Bexiga, Útero, Ovário E Anexos)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40901190",
    description: "Us - Dermatológico - Pele E Subcutâneo",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40901203",
    description: "Us - Órgãos Superficiais (Tireóide Ou Escroto Ou Pênis Ou Crânio)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40901211",
    description: "Us - Estruturas Superficiais (Cervical Ou Axilas Ou Músculo Ou Tendão)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40901220",
    description: "Us - Articular (Por Articulação)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40901238",
    description: "Us - Obstétrica",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40901246",
    description: "Us - Obstétrica Com Doppler Colorido",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40901254",
    description: "Us - Obstétrica Com Translucência Nucal",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40901262",
    description: "Us - Obstétrica Morfológica",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40901270",
    description: "Us - Obstétrica Gestação Múltipla: Cada Feto",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40901289",
    description: "Us - Obstétrica Gestação Múltipla Com Doppler Colorido: Cada Feto",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40901297",
    description: "Us - Obstétrica 1º Trimestre (Endovaginal)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40901300",
    description: "Us - Transvaginal (Útero, Ovário, Anexos E Vagina)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40901319",
    description: "Us - Transvaginal Para Controle De Ovulação (3 Ou Mais Exames)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40901327",
    description: "Us - Histerossonografia",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40901335",
    description: "Us - Próstata Transretal (Não Inclui Abdome Inferior Masculino)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40901351",
    description: "Doppler Colorido Transfontanela",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40901360",
    description: "Doppler Colorido De Vasos Cervicais Arteriais Bilateral (Carótidas E Vertebrais)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40901378",
    description: "Doppler Colorido De Vasos Cervicais Venosos Bilateral (Subclávias E Jugulares)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40901386",
    description: "Doppler Colorido De Órgão Ou Estrutura Isolada",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40901394",
    description: "Doppler Colorido De Aorta E Artérias Renais",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40901408",
    description: "Doppler Colorido De Aorta E Ilíacas",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40901416",
    description: "Doppler Colorido De Artérias Viscerais (Mesentéricas Superior E Inferior E Tronco Celíaco)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40901424",
    description: "Doppler Colorido De Hemangioma",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40901432",
    description: "Doppler Colorido De Veia Cava Superior Ou Inferior",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40901440",
    description: "Doppler Colorido Peniano Com Fármaco-Indução",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40901459",
    description: "Doppler Colorido Arterial De Membro Superior - Unilateral",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40901467",
    description: "Doppler Colorido Venoso De Membro Superior - Unilateral",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40901475",
    description: "Doppler Colorido Arterial De Membro Inferior - Unilateral",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40901483",
    description: "Doppler Colorido Venoso De Membro Inferior - Unilateral",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40901491",
    description: "Us - Tridimensional - Acrescentar Ao Exame De Base",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40901505",
    description: "Us - Obstétrica: Perfil Biofísico Fetal",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40901513",
    description: "Doppler Colorido De Artérias Penianas (Sem Fármaco Indução)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40901521",
    description: "Ultrassonografia Biomicroscópica - Monocular",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40901530",
    description: "Ultrassonografia Diagnóstica - Monocular",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40901556",
    description: "Ecocardiografia fetal gestação múltipla",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40901602",
    description: "Doppler Transcraniano",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40901610",
    description: "Us - Crânio Para Criança",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40901629",
    description: "Us - Ecodopplercardiograma Com Análise Do Sincronismo Cardíaco",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40901637",
    description: "US - Ecocardiograma com Doppler convencional - artérias e carótidas",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40901670",
    description: "US - Prova de Boyden",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40901696",
    description: "Us - Ecodopplercardiograma Com Estresse Físico",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40901700",
    description: "Ecodopplercardiograma Sob Estresse Físico Ou Farmacológico Com Contraste",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40901718",
    description: "Ecodopplercardiograma Para Ajuste De Marca-Passo",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40901734",
    description: "Us - Peça Cirúgica",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40901742",
    description: "Us - Transretal Radial",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40901750",
    description: "Us - Próstata (Via Abdominal)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40901769",
    description: "Us - Aparelho Urinário (Rins, Ureteres E Bexiga)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40901785",
    description: "Ecocardiograma transesofágico tridimensional",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40901793",
    description: "Elastografia Hepática Ultrassônica",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40901815",
    description: "US – Órgão ou estrutura isolada com contraste microbolhas",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40901823",
    description: "US – Vascular com contraste microbolhas",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40901858",
    description: "US – Pesquisa de Endometriose",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40902013",
    description: "Us - Obstétrica: Com Amniocentese",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40902021",
    description: "Us - Obstétrica 1º Trimestre Com Punção: Biópsia Ou Aspirativa",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40902030",
    description: "Us - Próstata Transretal Com Biópsia - Até 8 Fragmentos",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40902048",
    description: "Us - Próstata Transretal Com Biópsia - Mais De 8 Fragmentos",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40902056",
    description: "Us - Intra-Operatório",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40902064",
    description: "Doppler Colorido Intra-Operatório",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40902072",
    description: "Ecodopplercardiograma Transoperatório (Transesofágico Ou Epicárdico) (1ª Hora)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40902080",
    description: "Ecodopplercardiograma Transoperatório (Transesofágico Ou Epicárdico) - Por Hora Suplementar",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40902110",
    description: "Drenagem Percutânea Orientada Por Us (Acrescentar O Exame De Base)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40902129",
    description: "Redução De Invaginação Intestinal Por Enema, Orientada Por Us (Acrescentar O Exame De Base)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40902137",
    description: "Monitorização Por Doppler Transcraniano",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40902145",
    description: "Ecodopplercardiograma Intracardíaco",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "40903010",
    description: "Laudo Evolutivo de Ultrassonografia por procedimento",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41001010",
    description: "Tc - Crânio Ou Sela Túrcica Ou Órbitas",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41001028",
    description: "Tc - Mastóides Ou Orelhas",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41001036",
    description: "Tc - Face Ou Seios Da Face",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41001044",
    description: "Tc - Articulações Temporomandibulares",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41001052",
    description: "Tc - Dental (Dentascan)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41001060",
    description: "Tc - Pescoço (Partes Moles, Laringe, Tireóide, Faringe E Glândulas Salivares)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41001079",
    description: "Tc - Tórax",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41001087",
    description: "Tc - Coração - Para Avaliação Do Escore De Cálcio Coronariano",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41001095",
    description: "Tc - Abdome Total (Abdome Superior, Pelve E Retroperitônio)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41001109",
    description: "Tc - Abdome Superior",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41001117",
    description: "Tc - Pelve Ou Bacia",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41001125",
    description: "Tc - Coluna Cervical Ou Dorsal Ou Lombo-Sacra (Até 3 Segmentos)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41001133",
    description: "Tc - Coluna - Segmento Adicional",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41001141",
    description: "Tc - Articulação (Esternoclavicular Ou Ombro Ou Cotovelo Ou Punho Ou Sacroilíacas Ou Coxofemoral Ou Joelho Ou Tornozelo) - Unilateral",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41001150",
    description: "Tc - Segmento Apendicular (Braço Ou Antebraço Ou Mão Ou Coxa Ou Perna Ou Pé) - Unilateral",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41001176",
    description: "Angiotomografia De Aorta Torácica",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41001184",
    description: "Angiotomografia De Aorta Abdominal",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41001192",
    description: "Tc - Escanometria Digital",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41001206",
    description: "Tc - Reconstrução Tridimensional De Qualquer Órgão Ou Estrutura - Acrescentar Ao Exame De Base",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41001214",
    description: "Endoscopia Virtual De Qualquer Órgão Ou Estrutura Por Tc - Acrescentar Ao Exame De Base",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41001222",
    description: "Tc Para Pet Dedicado Oncológico",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41001230",
    description: "Tc - Angiotomografia Coronariana",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41001265",
    description: "TC - Colonoscopia virtual (colonografia)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41001273",
    description: "Tc - Mandíbula",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41001281",
    description: "Tc - Maxilar",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41001320",
    description: "TC - Tomossíntese digital mamária",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41001338",
    description: "TC - Radiocirurgia esterotáxica",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41001370",
    description: "Angiotomografia Arterial De Crânio",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41001362",
    description: "TC de vias urinárias (urotomografia)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41001389",
    description: "Angiotomografia Venosa De Crânio",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41001397",
    description: "Angiotomografia Arterial De Pescoço",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41001400",
    description: "Angiotomografia Venosa De Pescoço",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41001419",
    description: "Angiotomografia Arterial De Tórax",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41001427",
    description: "Angiotomografia Venosa De Tórax",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41001435",
    description: "Angiotomografia Arterial De Abdome Superior",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41001443",
    description: "Angiotomografia Venosa De Abdome Superior",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41001451",
    description: "Angiotomografia Arterial De Pelve",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41001460",
    description: "Angiotomografia Venosa De Pelve",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41001478",
    description: "Angiotomografia Arterial De Membro Inferior",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41001486",
    description: "Angiotomografia Venosa De Membro Inferior",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41001494",
    description: "Angiotomografia Arterial De Membro Superior",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41001508",
    description: "Angiotomografia Venosa De Membro Superior",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41001516",
    description: "Angiotomografia Arterial Pulmonar",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41001524",
    description: "Angiotomografia Venosa Pulmonar",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41001532",
    description: "TC para planejamento oncológico",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41002016",
    description: "Tomomielografia (Até 3 Segmentos) - Acrescentar A Tc Da Coluna E Incluir A Punção",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41002032",
    description: "Drenagem Percutânea Orientada Por Tc (Acrescentar O Exame De Base)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41002040",
    description: "Tc - Punção Para Introdução De Contraste (Acrescentar O Exame De Base)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41002059",
    description: "Artro-Tc",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41003012",
    description: "Revisão de Tomografia Computadorizada por procedimento",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41003020",
    description: "Laudo Evolutivo de Tomografia Computadorizada por procedimento",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41101014",
    description: "Rm - Crânio (Encéfalo)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41101022",
    description: "Rm - Sela Túrcica (Hipófise)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41101030",
    description: "Rm - Base Do Crânio",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41101049",
    description: "Estudo Funcional (Mapeamento Cortical Por Rm)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41101057",
    description: "Perfusão Cerebral Por Rm",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41101065",
    description: "Espectroscopia Por Rm",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41101073",
    description: "Rm - Órbita Bilateral",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41101081",
    description: "Rm - Ossos Temporais Bilateral",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41101090",
    description: "Rm - Face (Inclui Seios Da Face)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41101103",
    description: "Rm - Articulação Temporomandibular (Bilateral)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41101111",
    description: "Rm - Pescoço (Nasofaringe, Orofaringe, Laringe, Traquéia, Tireóide, Paratireóide)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41101120",
    description: "Rm - Tórax (Mediastino, Pulmão, Parede Torácica)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41101138",
    description: "Rm - Coração - Morfológico E Funcional",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41101146",
    description: "Rm - Coração - Morfológico E Funcional + Perfusão + Estresse",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41101154",
    description: "Rm - Coração - Morfológico E Funcional + Perfusão + Viabilidade Miocárdica",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41101170",
    description: "Rm - Abdome Superior (Fígado, Pâncreas, Baço, Rins, Supra-Renais, Retroperitônio)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41101189",
    description: "Rm - Pelve (Não Inclui Articulações Coxofemorais)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41101197",
    description: "Rm - Fetal",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41101200",
    description: "Rm - Pênis",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41101219",
    description: "Rm - Bolsa Escrotal",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41101227",
    description: "Rm - Coluna Cervical Ou Dorsal Ou Lombar",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41101235",
    description: "Rm - Fluxo Liquórico (Como Complementar)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41101243",
    description: "Rm - Plexo Braquial (Desfiladeiro Torácico) Ou Lombossacral (Não Inclui Coluna Cervical Ou Lombar)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41101251",
    description: "Rm - Membro Superior Unilateral (Não Inclui Mão E Articulações)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41101260",
    description: "Rm - Mão (Não Inclui Punho)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41101278",
    description: "Rm - Bacia (Articulações Sacroilíacas)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41101286",
    description: "Rm - Coxa (Unilateral)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41101294",
    description: "Rm - Perna (Unilateral)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41101308",
    description: "Rm - Pé (Antepé) - Não Inclui Tornozelo",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41101316",
    description: "Rm - Articular (Por Articulação)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41101332",
    description: "Angio-Rm De Aorta Torácica",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41101340",
    description: "Angio-Rm De Aorta Abdominal",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41101359",
    description: "Hidro-Rm (Colângio-Rm Ou Uro-Rm Ou Mielo-Rm Ou Sialo-Rm Ou Cistografia Por Rm)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41101375",
    description: "Endoscopia Virtual Por Rm - Acrescentar Ao Exame De Base",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41101383",
    description: "Rm - Reconstrução Tridimensional - Acrescentar Ao Exame De Base",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41101480",
    description: "Rm - Mama (Bilateral)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41101499",
    description: "Angio-Rm Arterial Pulmonar",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41101502",
    description: "Angio-Rm Venosa Pulmonar",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41101510",
    description: "Angio-Rm Arterial De Abdome Superior",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41101529",
    description: "Angio-Rm Venosa De Abdome Superior",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41101537",
    description: "Angio-Rm Arterial De Crânio",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41101545",
    description: "Angio-Rm Venosa De Crânio",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41101553",
    description: "Angio-Rm Arterial De Membro Inferior (Unilateral)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41101561",
    description: "Angio-Rm Venosa De Membro Inferior (Unilateral)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41101570",
    description: "Angio-Rm Arterial De Membro Superior (Unilateral)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41101588",
    description: "Angio-Rm Venosa De Membro Superior (Unilateral)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41101596",
    description: "Angio-Rm Arterial De Pelve",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41101600",
    description: "Angio-Rm Venosa De Pelve",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41101618",
    description: "Angio-Rm Arterial De Pescoço",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41101626",
    description: "Angio-Rm Venosa De Pescoço",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41101634",
    description: "Rm - Endorretal",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41101642",
    description: "Rm - Endovaginal",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41101669",
    description: "RM para planejamento oncológico",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41102010",
    description: "Artro-Rm (Incluir A Punção Articular) - Por Articulação",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41103017",
    description: "Revisão da Ressonância Magnética por procedimento",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41103025",
    description: "Laudo Evolutivo de Ressonância Magnética por procedimento",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41103998",
    description: "Em relação aos códigos 4.11.03.017 e 4.11.03.025: 1) Será considerado o momento em que se realizou a revisão/laudo evolutivo, e não a quantidade de exames anteriores no histórico do beneficiário. 2) A revisão de laudo será autorizada quando houver emissão de um novo laudo de mesmo exame, alterando o anterior, sendo remunerado x1 (independente de quantos exames anteriores forem abordados na avaliação). 3) O laudo evolutivo será autorizado quando houver emissão de laudo de exame que compile os achados em comparação com exames anteriores, independente de quantos sejam vistos na formação da avaliação. Quando o laudo original for evolutivo não caberá lançamento de outro laudo.",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: ""
  },
  {
    code: "41203011",
    description: "Betaterapia (Placa De Estrôncio) - Por Campo",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41203020",
    description: "Radiocirurgia (Rtc) - Nível 1, Lesão Única E/Ou Um Isocentro - Por Tratamento",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41203038",
    description: "Radiocirurgia (Rtc) - Nível 2, Duas Lesões E/Ou Dois A Quatro Isocentros - Por Tratamento",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41203046",
    description: "Radiocirurgia (Rtc) - Nível 3, Três Lesões E/Ou De Mais De Quatro Isocentros - Por Tratamento",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41203054",
    description: "Radioterapia  Com Modulação Da Intensidade Do Feixe (Imrt) - Por Tratamento",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41203062",
    description: "Radioterapia Conformada Tridimensional (Rct-3D)  Com Acelerador Linear - Por Tratamento",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41203070",
    description: "Radioterapia Convencional De Megavoltagem Com Acelerador Linear Com Fótons E Elétrons - Por Campo",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41203089",
    description: "Radioterapia Convencional De Megavoltagem Com Acelerador Linear Só Com Fótons - Por Campo",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41203097",
    description: "Radioterapia Convencional De Megavoltagem Com Unidade De Telecobalto - Por Campo",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41203100",
    description: "Radioterapia De Corpo Inteiro - Por Tratamento",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41203119",
    description: "Radioterapia De Meio Corpo (Hbi) - Por Dia De Tratamento",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41203127",
    description: "Radioterapia De Pele Total (Tsi) - Por Tratamento",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41203135",
    description: "Radioterapia Estereotática - 1º Dia De Tratamento",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41203143",
    description: "Radioterapia Estereotática - Por Dia Subsequente",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41203151",
    description: "Radioterapia Externa De Ortovoltagem (Roentgenterapia) - Por Campo",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41203160",
    description: "Radioterapia Intra-Operatória (Iort) - Por Tratamento",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41203178",
    description: "Radioterapia Rotatória Com Acelerador Linear Com Fótons E Elétrons - Por Volume Tratado E Por Dia",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41203186",
    description: "Radioterapia Rotatória Com Acelerador Linear Só Com Fótons - Por Volume Tratado E Por Dia",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41203194",
    description: "Radioterapia Rotatória Com Unidade De Cobalto - Por Volume Tratado E Por Dia",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41203208",
    description: "Sangues E Derivados (Por Unidade)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41204018",
    description: "Colimação Individual - 1 Por Incidência Planejada",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41204026",
    description: "Filme De Verificação (Cheque-Filme) - 1 Por Incidência Planejada/Semana - Filme A Parte",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41204034",
    description: "Planejamento De Tratamento Computadorizado - 1 Por Volume Tratado",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41204042",
    description: "Planejamento De Tratamento Computadorizado Tridimensional - 1 Por Volume Tratado",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41204050",
    description: "Planejamento De Tratamento Simples (Não Computadorizado) - 1 Por Volume Tratado",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41204069",
    description: "Simulação De Tratamento Complexa (Com Tomografia E Com Contraste) - 1 Por Volume Tratado",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41204077",
    description: "Simulação De Tratamento Intermediária (Com Tomografia) - 1 Por Volume Tratado",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41204085",
    description: "Simulação De Tratamento Simples (Sem Tomografia Computadorizada) - 1 Por Volume Tratado",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41204093",
    description: "Sistemas De Imobilização - Cabeça (Máscaras) Ou Membros - 1 Por Tratamento",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41204107",
    description: "Sistemas De Imobilização - Tórax, Abdome Ou Pélvis - 1 Por Tratamento",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41205014",
    description: "Braquiterapia Endoluminal De Alta Taxa De Dose (Batd) - Por Inserção",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41205022",
    description: "Braquiterapia Endoluminal De Baixa Taxa De Dose (Bbtd) - Por Inserção",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41205030",
    description: "Braquiterapia Intersticial De Alta Taxa De Dose (Batd) - Por Inserção",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41205049",
    description: "Braquiterapia Intersticial De Baixa Taxa De Dose (Bbtd) - Com Césio - Por Inserção",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41205057",
    description: "Braquiterapia Intersticial De Baixa Taxa De Dose (Bbtd) Permanente De Próstata - Por Tratamento",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41205065",
    description: "Braquiterapia Intersticial De Baixa Taxa De Dose (Bbtd) Com Ouro, Irídio Ou Iodo - Por Tratamento",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41205073",
    description: "Braquiterapia Intracavitária De Alta Taxa De Dose (Batd) - Por Inserção",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41205081",
    description: "Braquiterapia Intracavitária De Baixa Taxa De Dose (Bbtd) Com Césio - Por Inserção",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41205090",
    description: "Braquiterapia Oftálmica De Baixa Taxa De Dose (Bbtd) - Por Inserção",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41205103",
    description: "Braquiterapia Por Moldagem Ou Contato De Baixa Taxa De Dose (Bbtd) Com Césio - Por Inserção",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41205111",
    description: "Braquiterapia Por Moldagem Ou Contato De Baixa Taxa De Dose (Bbtd) Com Ouro, Irídio Ou Iodo - Por Tratamento",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41205120",
    description: "Braquiterapia Por Moldagem Ou Contato, De Alta Taxa De Dose (Batd) - Por Inserção",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41206010",
    description: "Filme De Verificação (Cheque-Filme) De Braquiterapia - 2 Por Inserção - Filme À Parte",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41206029",
    description: "Colocação Ou Retirada Da Placa Oftálmica - 1 Colocação E 1 Retirada Por Tratamento",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41206037",
    description: "Colocação Ou Retirada Dos Cateteres - 1 Colocação E 1 Retirada Por Inserção",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41206045",
    description: "Planejamento Computadorizado De Braquiterapia - 1 Por Inserção",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41206053",
    description: "Planejamento Computadorizado Tridimensional De Braquiterapia - 1 Por Inserção",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41206061",
    description: "Planejamento Não-Computadorizado De Braquiterapia - 1 Por Inserção",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41206070",
    description: "Simulação De Braquiterapia - 1 Por Inserção",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41301013",
    description: "Angiofluoresceinografia - Monocular",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41301021",
    description: "Angiografia Com Indocianina Verde - Monocular",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41301030",
    description: "Avaliação Órbito-Palpebral-Exoftalmometria - Binocular",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41301048",
    description: "Bioimpedanciometria (Ambulatorial) Exame",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41301056",
    description: "Biópsia Do Vilo Corial",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41301064",
    description: "Calorimetria Indireta (Ambulatorial) Exame",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41301072",
    description: "Campimetria Manual - Monocular",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41301080",
    description: "Ceratoscopia Computadorizada - Monocular",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41301099",
    description: "Coleta De Material Cérvico-Vaginal",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41301102",
    description: "Colposcopia (Cérvice Uterina E Vagina)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41301110",
    description: "Cordocentese",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41301129",
    description: "Curva Tensional Diária - Binocular",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41301137",
    description: "Dermatoscopia (Por Lesão)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41301145",
    description: "Ereção Fármaco-Induzida",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41301153",
    description: "Estéreo-Foto De Papila - Monocular",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41301161",
    description: "Estesiometria (Por Membro)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41301170",
    description: "Avaliação De Vias Lacrimais (Teste De Schirmer) - Monocular",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41301188",
    description: "Exame A Fresco Do Conteúdo Vaginal E Cervical",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41301200",
    description: "Exame De Motilidade Ocular (Teste Ortóptico) - Binocular",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41301218",
    description: "Exame Micológico - Cultura E Identificação De Colônia",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41301226",
    description: "Exame Micológico Direto (Por Local)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41301234",
    description: "Fotodermatoscopia (Por Lesão)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41301242",
    description: "Gonioscopia - Binocular",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41301250",
    description: "Mapeamento De Retina (Oftalmoscopia Indireta) - Monocular",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41301269",
    description: "Microscopia Especular De Córnea - Monocular",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41301277",
    description: "Oftalmodinamometria - Monocular",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41301285",
    description: "Peniscopia (Inclui Bolsa Escrotal)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41301307",
    description: "Potencial De Acuidade Visual - Monocular",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41301315",
    description: "Retinografia (Só Honorário) Monocular",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41301323",
    description: "Tonometria - Binocular",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41301331",
    description: "Tricograma",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41301340",
    description: "Urodinâmica Completa",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41301358",
    description: "Urofluxometria",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41301366",
    description: "Visão Subnormal - Monocular",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41301374",
    description: "Vulvoscopia (Vulva E Períneo)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41301382",
    description: "Capilaroscopia Periungueal",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41301390",
    description: "Coleta De Raspado Dérmico Em Lesões E Sítios Específicos Para Baciloscopia (Por Sítio)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41301404",
    description: "Avaliação Da Função Muscular Por Movimento Manual (Por Membro)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41301412",
    description: "Calorimetria Direta",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41301420",
    description: "Biomicroscopia De Fundo",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41301439",
    description: "Fundoscopia Sob Medríases - Binocular",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41301463",
    description: "Triagem auditiva neonatal/infantil",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41301471",
    description: "Teste Do Reflexo Vermelho Em Recém Nato (Teste Do Olhinho)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41301528",
    description: "Cauterização de alta frequência em sistema genital e reprodutor feminino",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "0"
  },
  {
    code: "41301536",
    description: "Colposcopia Anal",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41301544",
    description: "Colposcopia Por Vídeo",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41301552",
    description: "Vulvoscopia Por Vídeo",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41301994",
    description: "1 - Quando um procedimento oftalmológico monocular for realizado bilateralmente, remunera-se o custo operacional em 100% do valor previsto .nesta Classificação para um lado, e em 70% para o outro. Este critério não se aplica aos portes do procedimento.",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: ""
  },
  {
    code: "41401018",
    description: "Avaliação Da Função Muscular (Por Movimento) Com Equipamento Informatizado (Isocinético)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41401026",
    description: "Avaliação Da Função Muscular (Por Movimento) Com Equipamento Mecânico (Dinamometria/Módulos De Cargas)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41401042",
    description: "Prova De Auto-Rotação Cefálica",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41401050",
    description: "Prova De Lombard",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41401069",
    description: "Provas Imuno-Alérgicas Para Bactérias (Por Antígeno)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41401077",
    description: "Provas Imuno-Alérgicas Para Fungos (Por Antígeno)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41401085",
    description: "Teste Da Histamina (Duas Áreas Testadas)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41401093",
    description: "Teste De Adaptação Patológica (Tone Decay Test)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41401107",
    description: "Teste De Broncoprovocação",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41401115",
    description: "Teste De Caminhada De 6 Minutos",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41401123",
    description: "Teste De Desempenho Anaeróbico Em Laboratório (T. De Wingate)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41401131",
    description: "Teste De Equilíbrio Peritoneal (Pet)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41401140",
    description: "Teste De Exercício Dos 4 Segundos",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41401158",
    description: "Teste De Exercício Em Ergômetro   Com  Determinação  Do Lactato Sanguíneo",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41401166",
    description: "Teste De Exercício Em Ergômetro Com   Realização  De Gasometria Arterial",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41401174",
    description: "Teste De Exercício Em Ergômetro Com  Monitorização  Da Frequência Cardíaca",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41401182",
    description: "Teste De Exercício Em Ergômetro Com  Monitorização  Do Eletrocardiograma",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41401190",
    description: "Teste De Exercício Em Ergômetro Com Medida De Gases Expirados (Teste Cardiopulmonar De Exercício) Com Qualquer Ergômetro",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41401204",
    description: "Teste De Exercício Em Ergômetro Com Medida De Gases Expirados E Eletrocardiograma",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41401212",
    description: "Teste De Glicerol (Com Audiometria Tonal Limiar Pré E Pós)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41401220",
    description: "Teste De Glicerol (Com Eletrococleografia Pré E Pós)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41401239",
    description: "Teste De Hilger Para Paralisia Facial",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41401247",
    description: "Teste De Huhner",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41401255",
    description: "Teste De Mitsuda",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41401263",
    description: "Teste De Prótese Auditiva",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41401271",
    description: "Teste De Sensibilidade De Contraste Ou De Cores - Monocular",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41401280",
    description: "Teste De Sisi",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41401298",
    description: "Teste Para Broncoespasmo De Exercício",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41401301",
    description: "Teste Provocativo Para Glaucoma - Binocular",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41401310",
    description: "Testes Aeróbicos Em Campo Com Determinação Do Lactato Sanguíneo",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41401328",
    description: "Testes Aeróbicos Em Campo Com Medida De Gases Expirados",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41401336",
    description: "Testes Aeróbicos Em Campo Com Telemetria Da Frequência Cardíaca",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41401344",
    description: "Testes Anaeróbicos Em Campo Com Determinação Do Lactato Sanguíneo",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41401352",
    description: "Testes Anaeróbicos Em Campo Sem Determinação Do Lactato Sanguíneo",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41401360",
    description: "Testes Cutâneo-Alérgicos Para Alérgenos Da Poeira",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41401379",
    description: "Testes Cutâneo-Alérgicos Para Alimentos",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41401387",
    description: "Testes Cutâneo-Alérgicos Para Fungos",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41401395",
    description: "Testes Cutâneo-Alérgicos Para Insetos Hematófagos",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41401409",
    description: "Testes Cutâneo-Alérgicos Para Pólens",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41401417",
    description: "Testes De Aptidão Em Laboratório (Agilidade, Equilíbrio, Tempo De Reação E Coordenação)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41401425",
    description: "Testes De Contato - Até 30 Substâncias",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41401433",
    description: "Testes De Contato - Por Substância, Acima De 30",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41401441",
    description: "Testes De Contato Por Fotossensibilização - Até 30 Substâncias",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41401450",
    description: "Testes De Contato Por Fotossensibilização - Por Substância, Acima De 30",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41401468",
    description: "Testes Do Desenvolvimento (Escala De Denver E Outras)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41401476",
    description: "Testes Vestibulares, Com Prova Calórica, Com Eletronistagmografia",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41401484",
    description: "Testes Vestibulares, Com Prova Calórica, Sem Eletronistagmografia",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41401492",
    description: "Testes Vestibulares, Com Vecto-Eletronistagmografia",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41401514",
    description: "Oximetria Não Invasiva",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41401522",
    description: "Teste Cutâneo-Alérgicos Para Látex",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41401530",
    description: "Teste Cutâneo-Alérgicos Epitelis De Animais",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41401549",
    description: "Teste De Monitorização Contínua Da Glicose (Tmcg)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41401557",
    description: "Repertorização",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41401573",
    description: "Estudo Cito-Alergológico (Eca)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41401581",
    description: "Teste De Heald",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41401620",
    description: "Teste Sensibilidade Ao Sal",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41401654",
    description: "Teste De Fluxo Salivar",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41401662",
    description: "Teste De Estimulação Muscúlo-Esquelética In Vitro (Mínimo Seis)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41401670",
    description: "Teste De Fibronectina Fetal - Indicador Bioquímico Para Parto Prematuro",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41401719",
    description: "Teste Rápido Para Detecção Da Pamg-1 Para Diagnóstico De Ruptura De Membranas Fetais",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41401727",
    description: "Ganho funcional com implante coclear unilateral",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41401735",
    description: "Ganho funcional com estimulação bimodal (aas + implante coclear)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41401743",
    description: "Teste de integridade do implante coclear unilateral",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41401999",
    description: "1 - Extratos alergênicos, quando utilizados em teste cutâneo-alérgicos e de contato, devem ser valorados separadamente.",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: ""
  },
  {
    code: "41501012",
    description: "Biometria ultrassonica - monocular",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41501020",
    description: "Cavernosometria",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41501047",
    description: "Dopplermetria dos cordões espermáticos",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41501063",
    description: "Investigação ultrassônica com registro gráfico (qualquer área)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41501071",
    description: "Investigação ultrassônica com teste de stress e com registro gráfico",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41501080",
    description: "Investigação ultrassônica com teste de stress e sem registro gráfico",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41501098",
    description: "Investigação ultrassônica com teste de stress em esteira e com registro gráfico",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41501101",
    description: "Investigação ultrassônica sem registro gráfico (qualquer área)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41501128",
    description: "Paquimetria Ultrassônica - Monocular",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41501136",
    description: "Termometria Cutânea (Por Lateralidade: Pescoço, Membros, Bolsa Escrotal, Por Território Peniano)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41501144",
    description: "Tomografia De Coerência Óptica - Monocular",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41501179",
    description: "Fotopletismografia (Venosa Ou Arterial) Por Lateralidade Ou Segmento",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41501187",
    description: "Medida De Pressão Segmentar (Nos Quatro Segmentos)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41501195",
    description: "Pletismografia (Qualquer Tipo) Por Lateralidade Ou Território",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41501209",
    description: "Medida De Pressão Hepática",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41501225",
    description: "Oximetria arterial, perfil",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41501233",
    description: "Oximetria venosa, perfil",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41501241",
    description: "Perfil De Pressão Uretral",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41501268",
    description: "Pressão arterial peniana",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
  {
    code: "41501314",
    description: "Angiografia de grande angular (AGA)",
    chapter: "4",
    group: "Exames e Diagnósticos",
    requiresAuth: false,
    cbos: "-"
  },
];

// Função de busca por código
export function findTUSSByCode(code: string): TUSSProcedure | undefined {
  const normalizedCode = code.replace(/\./g, '');
  return tussProcedures.find(p => p.code === normalizedCode || p.code === code);
}

// Função de busca por descrição (case insensitive, com normalização de acentos)
export function searchTUSS(query: string, limit: number = 50): TUSSProcedure[] {
  const normalizedQuery = query.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  return tussProcedures
    .filter(p => {
      const normalizedDesc = p.description.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      return normalizedDesc.includes(normalizedQuery) || p.code.includes(query);
    })
    .slice(0, limit);
}

// Função para obter procedimentos por capítulo
export function getTUSSByChapter(chapter: string): TUSSProcedure[] {
  return tussProcedures.filter(p => p.chapter === chapter);
}

// Função para obter procedimentos por grupo
export function getTUSSByGroup(group: string): TUSSProcedure[] {
  return tussProcedures.filter(p => p.group === group);
}

// Estatísticas da base
export const tussStats = {
  total: 4901,
  consultas: tussProcedures.filter(p => p.group === 'Consultas').length,
  procedimentosClinicos: tussProcedures.filter(p => p.group === 'Procedimentos Clínicos').length,
  procedimentosCirurgicos: tussProcedures.filter(p => p.group === 'Procedimentos Cirúrgicos').length,
  exames: tussProcedures.filter(p => p.group === 'Exames e Diagnósticos').length,
};

// Grupos disponíveis
export const tussGroups = [
  'Consultas',
  'Procedimentos Clínicos',
  'Procedimentos Cirúrgicos',
  'Exames e Diagnósticos',
  'Outros'
];
