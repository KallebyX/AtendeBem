// Base de dados de Medicamentos completa
// Total de medicamentos: 931
// Fontes: RENAME 2024 (Relação Nacional de Medicamentos Essenciais) + Lista RS 2025

export interface Medication {
  name: string;
  concentration: string;
  form: string;
  component: string;
  atc: string;
  source: string;
}

export const medications: Medication[] = [
  {
    name: "ácido ursodesoxicólico",
    concentration: "150 mg",
    form: "comprimido",
    component: "Especializado",
    atc: "A05AA02",
    source: "RENAME 2024"
  },
  {
    name: "alfa-agalsidase",
    concentration: "1 mg/mL",
    form: "solução",
    component: "Especializado",
    atc: "A16AB03",
    source: "RENAME 2024"
  },
  {
    name: "alfa-alglicosidade",
    concentration: "50 mg",
    form: "",
    component: "Especializado",
    atc: "A16AB07",
    source: "RENAME 2024"
  },
  {
    name: "alfacerliponase",
    concentration: "30 mg/mL",
    form: "solução",
    component: "Especializado",
    atc: "A16AB17",
    source: "RENAME 2024"
  },
  {
    name: "alfaelosulfase",
    concentration: "5 mg",
    form: "solução",
    component: "Especializado",
    atc: "A16AB12",
    source: "RENAME 2024"
  },
  {
    name: "alfavestronidase",
    concentration: "2 mg/mL",
    form: "solução",
    component: "Especializado",
    atc: "A16AB18",
    source: "RENAME 2024"
  },
  {
    name: "beta-agalsidase",
    concentration: "35 mg",
    form: "",
    component: "Especializado",
    atc: "A16AB04",
    source: "RENAME 2024"
  },
  {
    name: "biotina",
    concentration: "2,5 mg",
    form: "cápsula",
    component: "Especializado",
    atc: "A11HA05",
    source: "RENAME 2024"
  },
  {
    name: "calcitriol",
    concentration: "0,25 mcg",
    form: "cápsula",
    component: "Especializado",
    atc: "A11CC04",
    source: "RENAME 2024"
  },
  {
    name: "carbonato de cálcio",
    concentration: "500 mg",
    form: "comprimido",
    component: "Básico",
    atc: "A12AA04",
    source: "RENAME 2024"
  },
  {
    name: "carvão vegetal ativado",
    concentration: "",
    form: "suspensão",
    component: "Básico",
    atc: "A07BA01",
    source: "RENAME 2024"
  },
  {
    name: "cloridrato de",
    concentration: "500 mg",
    form: "comprimido",
    component: "Básico",
    atc: "A10BA02",
    source: "RENAME 2024"
  },
  {
    name: "metformina",
    concentration: "850 mg",
    form: "comprimido",
    component: "Básico",
    atc: "A10BA02",
    source: "RENAME 2024"
  },
  {
    name: "ondansetrona",
    concentration: "8 mg",
    form: "comprimido",
    component: "Básico",
    atc: "A04AA01",
    source: "RENAME 2024"
  },
  {
    name: "cloridrato de piridoxina",
    concentration: "50 mg",
    form: "comprimido",
    component: "Básico",
    atc: "A11HA02",
    source: "RENAME 2024"
  },
  {
    name: "cloridrato de tiamina",
    concentration: "300 mg",
    form: "comprimido",
    component: "Básico",
    atc: "A11DA01",
    source: "RENAME 2024"
  },
  {
    name: "dicloridrato de trientina",
    concentration: "250 mg",
    form: "cápsula",
    component: "Especializado",
    atc: "A16AX12",
    source: "RENAME 2024"
  },
  {
    name: "fosfato de cálcio",
    concentration: "1661,616 mg",
    form: "",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "comprimido",
    concentration: "",
    form: "comprimido",
    component: "Básico",
    atc: "A11CC05",
    source: "RENAME 2024"
  },
  {
    name: "tribásico + colecalciferol",
    concentration: "400 UI",
    form: "",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "galsulfase",
    concentration: "5 mg",
    form: "solução",
    component: "Especializado",
    atc: "A16AB08",
    source: "RENAME 2024"
  },
  {
    name: "glibenclamida",
    concentration: "5 mg",
    form: "comprimido",
    component: "Básico",
    atc: "A10BB01",
    source: "RENAME 2024"
  },
  {
    name: "gliclazida",
    concentration: "",
    form: "comprimido",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "hidróxido de alumínio",
    concentration: "300 mg",
    form: "comprimido",
    component: "Básico",
    atc: "A02AB01",
    source: "RENAME 2024"
  },
  {
    name: "idursulfase",
    concentration: "2 mg/mL",
    form: "solução",
    component: "Especializado",
    atc: "A16AB09",
    source: "RENAME 2024"
  },
  {
    name: "insulina análoga de",
    concentration: "300 UI/mL",
    form: "solução",
    component: "Especializado",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "ação prolongada",
    concentration: "100 UI/mL",
    form: "solução",
    component: "Especializado",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "insulina humana NPH",
    concentration: "100 UI/mL",
    form: "injetável",
    component: "Básico",
    atc: "A10AC01",
    source: "RENAME 2024"
  },
  {
    name: "lactulose",
    concentration: "667 mg/mL",
    form: "xarope",
    component: "Básico",
    atc: "A06AD11",
    source: "RENAME 2024"
  },
  {
    name: "laronidase",
    concentration: "0,58 mg/mL",
    form: "solução",
    component: "Especializado",
    atc: "A16AB05",
    source: "RENAME 2024"
  },
  {
    name: "miglustate",
    concentration: "100 mg",
    form: "cápsula",
    component: "Especializado",
    atc: "A16AX06",
    source: "RENAME 2024"
  },
  {
    name: "nistatina",
    concentration: "100.000 UI/mL",
    form: "suspensão",
    component: "Básico",
    atc: "A07AA02",
    source: "RENAME 2024"
  },
  {
    name: "nitrato de miconazol",
    concentration: "2%",
    form: "gel",
    component: "Básico",
    atc: "A01AB09",
    source: "RENAME 2024"
  },
  {
    name: "palmitato de retinol",
    concentration: "150.000 UI/mL",
    form: "solução",
    component: "Básico",
    atc: "A11CA01",
    source: "RENAME 2024"
  },
  {
    name: "anidra, cloreto de potássio,",
    concentration: "",
    form: "solução",
    component: "Básico",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "sulfato de atropina",
    concentration: "0,25 mg/mL",
    form: "solução",
    component: "Básico",
    atc: "A03BA01",
    source: "RENAME 2024"
  },
  {
    name: "sulfato de zinco",
    concentration: "10 mg",
    form: "comprimido",
    component: "Básico",
    atc: "A12CB01",
    source: "RENAME 2024"
  },
  {
    name: "acetato de sódio",
    concentration: "",
    form: "solução",
    component: "Básico",
    atc: "B05XA08",
    source: "RENAME 2024"
  },
  {
    name: "ácido acetilsalicílico",
    concentration: "100 mg",
    form: "comprimido",
    component: "Básico",
    atc: "B01AC06",
    source: "RENAME 2024"
  },
  {
    name: "ácido tranexâmico",
    concentration: "250 mg",
    form: "comprimido",
    component: "Estratégico",
    atc: "B02AA02",
    source: "RENAME 2024"
  },
  {
    name: "alfaepoetina",
    concentration: "2.000 UI",
    form: "solução",
    component: "Especializado",
    atc: "B03XA01",
    source: "RENAME 2024"
  },
  {
    name: "alfaepoetina",
    concentration: "10.000 UI",
    form: "solução",
    component: "Especializado",
    atc: "B03XA01",
    source: "RENAME 2024"
  },
  {
    name: "bicarbonato de sódio",
    concentration: "",
    form: "solução",
    component: "Básico",
    atc: "B05XA02",
    source: "RENAME 2024"
  },
  {
    name: "cianocobalamina",
    concentration: "500 mcg/mL",
    form: "solução",
    component: "Básico",
    atc: "B03BA01",
    source: "RENAME 2024"
  },
  {
    name: "cloreto de potássio",
    concentration: "",
    form: "solução",
    component: "Básico",
    atc: "B05XA01",
    source: "RENAME 2024"
  },
  {
    name: "cloreto de sódio",
    concentration: "",
    form: "solução",
    component: "Básico",
    atc: "B05XA03",
    source: "RENAME 2024"
  },
  {
    name: "complexo",
    concentration: "500 UI",
    form: "solução",
    component: "Estratégico",
    atc: "B02BD01",
    source: "RENAME 2024"
  },
  {
    name: "protrombínico humano",
    concentration: "600 UI",
    form: "solução",
    component: "Estratégico",
    atc: "B02BD01",
    source: "RENAME 2024"
  },
  {
    name: "protrombínico",
    concentration: "1.000UI",
    form: "solução",
    component: "Estratégico",
    atc: "B02BD03",
    source: "RENAME 2024"
  },
  {
    name: "fator IX de coagulação",
    concentration: "250 UI",
    form: "solução",
    component: "Estratégico",
    atc: "B02BD04",
    source: "RENAME 2024"
  },
  {
    name: "fator IX de coagulação",
    concentration: "1.000 UI",
    form: "solução",
    component: "Estratégico",
    atc: "B02BD04",
    source: "RENAME 2024"
  },
  {
    name: "fator VII de coagulação",
    concentration: "2 mg",
    form: "solução",
    component: "Estratégico",
    atc: "B02BD05",
    source: "RENAME 2024"
  },
  {
    name: "fator VIII de coagulação",
    concentration: "500 UI",
    form: "solução",
    component: "Estratégico",
    atc: "B02BD02",
    source: "RENAME 2024"
  },
  {
    name: "contendo fator de von",
    concentration: "500 UI",
    form: "solução",
    component: "Estratégico",
    atc: "B02BD06",
    source: "RENAME 2024"
  },
  {
    name: "fator XIII de coagulação",
    concentration: "250 UI",
    form: "solução",
    component: "Estratégico",
    atc: "B02BD07",
    source: "RENAME 2024"
  },
  {
    name: "ferripolimaltose",
    concentration: "10 mg/mL",
    form: "xarope",
    component: "Básico",
    atc: "B03AB05",
    source: "RENAME 2024"
  },
  {
    name: "fibrinogênio",
    concentration: "1g",
    form: "solução",
    component: "Estratégico",
    atc: "B02BB01",
    source: "RENAME 2024"
  },
  {
    name: "monobásico + fosfato",
    concentration: "",
    form: "solução",
    component: "Básico",
    atc: "B05XA06",
    source: "RENAME 2024"
  },
  {
    name: "heparina sódica",
    concentration: "5.000 UI",
    form: "solução",
    component: "Básico",
    atc: "B01AB01",
    source: "RENAME 2024"
  },
  {
    name: "iloprosta",
    concentration: "10 mcg/mL",
    form: "solução",
    component: "Especializado",
    atc: "B01AC11",
    source: "RENAME 2024"
  },
  {
    name: "solução ringer + lactato",
    concentration: "",
    form: "solução",
    component: "Básico",
    atc: "B05BB01",
    source: "RENAME 2024"
  },
  {
    name: "xarope",
    concentration: "",
    form: "xarope",
    component: "Básico",
    atc: "B03AA07",
    source: "RENAME 2024"
  },
  {
    name: "sulfato ferroso",
    concentration: "",
    form: "solução",
    component: "Básico",
    atc: "B03AA07",
    source: "RENAME 2024"
  },
  {
    name: "ácido nicotínico",
    concentration: "500 mg",
    form: "",
    component: "Especializado",
    atc: "C10AD02",
    source: "RENAME 2024"
  },
  {
    name: "bezafibrato",
    concentration: "",
    form: "comprimido",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "captopril",
    concentration: "25 mg",
    form: "comprimido",
    component: "Básico",
    atc: "C09AA01",
    source: "RENAME 2024"
  },
  {
    name: "ciprofibrato",
    concentration: "100 mg",
    form: "comprimido",
    component: "Especializado",
    atc: "C10AB08",
    source: "RENAME 2024"
  },
  {
    name: "cloridrato de dobutamina",
    concentration: "12,5 mg/mL",
    form: "solução",
    component: "Básico",
    atc: "C01CA07",
    source: "RENAME 2024"
  },
  {
    name: "cloridrato de dopamina",
    concentration: "5 mg/mL",
    form: "solução",
    component: "Básico",
    atc: "C01CA04",
    source: "RENAME 2024"
  },
  {
    name: "cloridrato de verapamil",
    concentration: "2,5 mg/mL",
    form: "solução",
    component: "Básico",
    atc: "C08DA01",
    source: "RENAME 2024"
  },
  {
    name: "dinitrato de isossorbida",
    concentration: "5 mg",
    form: "comprimido",
    component: "Básico",
    atc: "C01DA08",
    source: "RENAME 2024"
  },
  {
    name: "epinefrina",
    concentration: "1 mg/mL",
    form: "solução",
    component: "Básico",
    atc: "C01CA03",
    source: "RENAME 2024"
  },
  {
    name: "etofibrato",
    concentration: "500 mg",
    form: "cápsula",
    component: "Especializado",
    atc: "C10AB09",
    source: "RENAME 2024"
  },
  {
    name: "fenofibrato",
    concentration: "",
    form: "cápsula",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "losartana potássica",
    concentration: "50 mg",
    form: "comprimido",
    component: "Básico",
    atc: "C09CA01",
    source: "RENAME 2024"
  },
  {
    name: "maleato de enalapril",
    concentration: "10 mg",
    form: "comprimido",
    component: "Básico",
    atc: "C09AA02",
    source: "RENAME 2024"
  },
  {
    name: "metildopa",
    concentration: "250 mg",
    form: "comprimido",
    component: "Básico",
    atc: "C02AB01",
    source: "RENAME 2024"
  },
  {
    name: "pentoxifilina",
    concentration: "400 mg",
    form: "",
    component: "Estratégico",
    atc: "C04AD03",
    source: "RENAME 2024"
  },
  {
    name: "pravastatina sódica",
    concentration: "20 mg",
    form: "comprimido",
    component: "Especializado",
    atc: "C10AA03",
    source: "RENAME 2024"
  },
  {
    name: "sinvastatina",
    concentration: "20 mg",
    form: "comprimido",
    component: "Básico",
    atc: "C10AA01",
    source: "RENAME 2024"
  },
  {
    name: "succinato de metoprolol",
    concentration: "50 mg",
    form: "",
    component: "Básico",
    atc: "C07AB02",
    source: "RENAME 2024"
  },
  {
    name: "tartarato de metoprolol",
    concentration: "100 mg",
    form: "comprimido",
    component: "Básico",
    atc: "C07AB02",
    source: "RENAME 2024"
  },
  {
    name: "acetato de hidrocortisona",
    concentration: "10 mg/g",
    form: "creme",
    component: "Básico",
    atc: "D07AA02",
    source: "RENAME 2024"
  },
  {
    name: "aciclovir",
    concentration: "50 mg/g",
    form: "creme",
    component: "Básico",
    atc: "D06BB03",
    source: "RENAME 2024"
  },
  {
    name: "ácido salicílico (FN)",
    concentration: "50 mg/g",
    form: "pomada",
    component: "Básico",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "alcatrão mineral (FN)",
    concentration: "10 mg/g",
    form: "pomada",
    component: "Básico",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "calcipotriol",
    concentration: "50 mcg/g",
    form: "pomada",
    component: "Especializado",
    atc: "D05AX02",
    source: "RENAME 2024"
  },
  {
    name: "cetoconazol",
    concentration: "20 mg/mL",
    form: "",
    component: "Básico",
    atc: "D01AC08",
    source: "RENAME 2024"
  },
  {
    name: "cloridrato de lidocaína",
    concentration: "20 mg/g",
    form: "gel",
    component: "Básico",
    atc: "D04AB01",
    source: "RENAME 2024"
  },
  {
    name: "dexametasona",
    concentration: "1 mg/g",
    form: "creme",
    component: "Básico",
    atc: "D07AB19",
    source: "RENAME 2024"
  },
  {
    name: "digliconato de clorexidina",
    concentration: "2%",
    form: "solução",
    component: "Básico",
    atc: "D08AC02",
    source: "RENAME 2024"
  },
  {
    name: "imiquimode",
    concentration: "50 mg/g",
    form: "creme",
    component: "Básico",
    atc: "D06BB10",
    source: "RENAME 2024"
  },
  {
    name: "podofilina (FN)",
    concentration: "",
    form: "solução",
    component: "Básico",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "podofilotoxina",
    concentration: "1,5 mg/g",
    form: "creme",
    component: "Básico",
    atc: "D06BB04",
    source: "RENAME 2024"
  },
  {
    name: "sulfadiazina de prata",
    concentration: "10 mg/g",
    form: "creme",
    component: "Básico",
    atc: "D06BA01",
    source: "RENAME 2024"
  },
  {
    name: "medroxiprogesterona +",
    concentration: "",
    form: "injetável",
    component: "Básico",
    atc: "G03AA17",
    source: "RENAME 2024"
  },
  {
    name: "acetato de ciproterona",
    concentration: "50 mg",
    form: "comprimido",
    component: "Especializado",
    atc: "G03HA01",
    source: "RENAME 2024"
  },
  {
    name: "algestona acetofenida +",
    concentration: "150 mg/mL",
    form: "",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "solução injetável",
    concentration: "",
    form: "solução",
    component: "Básico",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "cabergolina",
    concentration: "0,5 mg",
    form: "comprimido",
    component: "Especializado",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "citrato de sildenafila",
    concentration: "25 mg",
    form: "comprimido",
    component: "Especializado",
    atc: "G04BE03",
    source: "RENAME 2024"
  },
  {
    name: "cloridrato de raloxifeno",
    concentration: "60 mg",
    form: "comprimido",
    component: "Especializado",
    atc: "G03XC01",
    source: "RENAME 2024"
  },
  {
    name: "estrogênios conjugados",
    concentration: "0,3 mg",
    form: "comprimido",
    component: "Básico",
    atc: "G03CA57",
    source: "RENAME 2024"
  },
  {
    name: "finasterida",
    concentration: "5 mg",
    form: "comprimido",
    component: "Básico",
    atc: "G04CB01",
    source: "RENAME 2024"
  },
  {
    name: "metronidazol",
    concentration: "100 mg/g",
    form: "gel",
    component: "Básico",
    atc: "G01AF01",
    source: "RENAME 2024"
  },
  {
    name: "noretisterona",
    concentration: "0,35 mg",
    form: "comprimido",
    component: "Básico",
    atc: "G03AC01",
    source: "RENAME 2024"
  },
  {
    name: "+ fosfato dissódico de",
    concentration: "3 mg/mL",
    form: "injetável",
    component: "Básico",
    atc: "H02AB01",
    source: "RENAME 2024"
  },
  {
    name: "acetato de lanreotida",
    concentration: "120 mg",
    form: "",
    component: "Especializado",
    atc: "H01CB03",
    source: "RENAME 2024"
  },
  {
    name: "acetato de octreotida",
    concentration: "",
    form: "suspensão",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "calcitonina",
    concentration: "200 UI/dose",
    form: "solução",
    component: "Especializado",
    atc: "H05BA01",
    source: "RENAME 2024"
  },
  {
    name: "dexametasona",
    concentration: "0,1 mg/mL",
    form: "",
    component: "Básico",
    atc: "H02AB02",
    source: "RENAME 2024"
  },
  {
    name: "fosfato sódico de",
    concentration: "1 mg/mL",
    form: "solução",
    component: "Básico",
    atc: "H02AB06",
    source: "RENAME 2024"
  },
  {
    name: "prednisolona",
    concentration: "3 mg/mL",
    form: "solução",
    component: "Básico",
    atc: "H02AB06",
    source: "RENAME 2024"
  },
  {
    name: "iodo + iodeto de potássio",
    concentration: "20 mg/mL",
    form: "solução",
    component: "Básico",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "levotiroxina sódica",
    concentration: "37,5 mcg",
    form: "comprimido",
    component: "Básico",
    atc: "H03AA01",
    source: "RENAME 2024"
  },
  {
    name: "paricalcitol",
    concentration: "5 mcg/mL",
    form: "solução",
    component: "Especializado",
    atc: "H05BX02",
    source: "RENAME 2024"
  },
  {
    name: "propiltiouracila",
    concentration: "100 mg",
    form: "comprimido",
    component: "Básico",
    atc: "H03BA02",
    source: "RENAME 2024"
  },
  {
    name: "aciclovir",
    concentration: "",
    form: "solução",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "amoxicilina",
    concentration: "500 mg",
    form: "cápsula",
    component: "Básico",
    atc: "J01CA04",
    source: "RENAME 2024"
  },
  {
    name: "amoxicilina +",
    concentration: "50 mg/mL",
    form: "suspensão",
    component: "Básico",
    atc: "J01CR02",
    source: "RENAME 2024"
  },
  {
    name: "potássio",
    concentration: "500 mg",
    form: "comprimido",
    component: "Básico",
    atc: "J01CR02",
    source: "RENAME 2024"
  },
  {
    name: "anfotericina B",
    concentration: "",
    form: "suspensão",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "(complexo lipídico)",
    concentration: "",
    form: "injetável",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "(desoxicolato)",
    concentration: "",
    form: "injetável",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "(lipossomal)",
    concentration: "",
    form: "injetável",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "anidulafungina",
    concentration: "100 mg",
    form: "",
    component: "Estratégico",
    atc: "J02AX06",
    source: "RENAME 2024"
  },
  {
    name: "azitromicina",
    concentration: "250 mg",
    form: "comprimido",
    component: "Estratégico",
    atc: "J01FA10",
    source: "RENAME 2024"
  },
  {
    name: "pó para",
    concentration: "",
    form: "pó",
    component: "Básico",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "suspensão oral",
    concentration: "",
    form: "suspensão",
    component: "Estratégico",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "bedaquilina",
    concentration: "100 mg",
    form: "comprimido",
    component: "Estratégico",
    atc: "J04AK05",
    source: "RENAME 2024"
  },
  {
    name: "benzilpenicilina",
    concentration: "",
    form: "injetável",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "suspensão",
    concentration: "",
    form: "suspensão",
    component: "Básico",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "injetável",
    concentration: "",
    form: "injetável",
    component: "Estratégico",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "potássica",
    concentration: "",
    form: "injetável",
    component: "Estratégico",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "capreomicina",
    concentration: "1g",
    form: "",
    component: "Estratégico",
    atc: "J04AB30",
    source: "RENAME 2024"
  },
  {
    name: "cefalexina",
    concentration: "500 mg",
    form: "comprimido",
    component: "Básico",
    atc: "J01DB01",
    source: "RENAME 2024"
  },
  {
    name: "cefotaxima sódica",
    concentration: "500 mg",
    form: "",
    component: "Básico",
    atc: "J01DD01",
    source: "RENAME 2024"
  },
  {
    name: "ceftriaxona",
    concentration: "500 mg",
    form: "",
    component: "Básico",
    atc: "J01DD04",
    source: "RENAME 2024"
  },
  {
    name: "claritromicina",
    concentration: "500 mg",
    form: "cápsula",
    component: "Básico",
    atc: "J01FA09",
    source: "RENAME 2024"
  },
  {
    name: "cloranfenicol",
    concentration: "250 mg",
    form: "comprimido",
    component: "Básico",
    atc: "J01BA01",
    source: "RENAME 2024"
  },
  {
    name: "cloridrato de",
    concentration: "150 mg",
    form: "cápsula",
    component: "Básico",
    atc: "J01FF01",
    source: "RENAME 2024"
  },
  {
    name: "clindamicina",
    concentration: "300 mg",
    form: "cápsula",
    component: "Básico",
    atc: "J01FF01",
    source: "RENAME 2024"
  },
  {
    name: "sódio",
    concentration: "",
    form: "solução",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "darunavir",
    concentration: "150 mg",
    form: "comprimido",
    component: "Estratégico",
    atc: "J05AE10",
    source: "RENAME 2024"
  },
  {
    name: "delamanida",
    concentration: "50 mg",
    form: "comprimido",
    component: "Estratégico",
    atc: "J04AK06",
    source: "RENAME 2024"
  },
  {
    name: "dolutegravir sódico",
    concentration: "50 mg",
    form: "comprimido",
    component: "Estratégico",
    atc: "J05AJ03",
    source: "RENAME 2024"
  },
  {
    name: "efavirenz",
    concentration: "200 mg",
    form: "cápsula",
    component: "Estratégico",
    atc: "J05AG03",
    source: "RENAME 2024"
  },
  {
    name: "grazoprevir",
    concentration: "50 mg",
    form: "comprimido",
    component: "Estratégico",
    atc: "J05AP54",
    source: "RENAME 2024"
  },
  {
    name: "enfuvirtida",
    concentration: "90 mg/mL",
    form: "",
    component: "Estratégico",
    atc: "J05AX07",
    source: "RENAME 2024"
  },
  {
    name: "espiramicina",
    concentration: "500.000 UI",
    form: "comprimido",
    component: "Estratégico",
    atc: "J01FA02",
    source: "RENAME 2024"
  },
  {
    name: "estolato de",
    concentration: "500 mg",
    form: "comprimido",
    component: "",
    atc: "J01FA01",
    source: "RENAME 2024"
  },
  {
    name: "etionamida",
    concentration: "250 mg",
    form: "comprimido",
    component: "Estratégico",
    atc: "J04AD03",
    source: "RENAME 2024"
  },
  {
    name: "fenoximetilpenicili-",
    concentration: "",
    form: "solução",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "fosamprenavir",
    concentration: "50 mg/mL",
    form: "suspensão",
    component: "Estratégico",
    atc: "J05AE07",
    source: "RENAME 2024"
  },
  {
    name: "de tenofovir",
    concentration: "300 mg",
    form: "comprimido",
    component: "Estratégico",
    atc: "J05AF07",
    source: "RENAME 2024"
  },
  {
    name: "desoproxila +",
    concentration: "300 mg",
    form: "comprimido",
    component: "Estratégico",
    atc: "J05AR11",
    source: "RENAME 2024"
  },
  {
    name: "de tenofovir",
    concentration: "25 mg",
    form: "comprimido",
    component: "Estratégico",
    atc: "J05AF13",
    source: "RENAME 2024"
  },
  {
    name: "imunoglobulina",
    concentration: "2,5 g",
    form: "solução",
    component: "Especializado",
    atc: "J06BA02",
    source: "RENAME 2024"
  },
  {
    name: "humana",
    concentration: "",
    form: "solução",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "humana anti-",
    concentration: "500 UI",
    form: "solução",
    component: "Estratégico",
    atc: "J06BB04",
    source: "RENAME 2024"
  },
  {
    name: "humana antivaricela",
    concentration: "125 UI",
    form: "solução",
    component: "Estratégico",
    atc: "J06BB03",
    source: "RENAME 2024"
  },
  {
    name: "linezolida",
    concentration: "",
    form: "solução",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "lopinavir + ritonavir",
    concentration: "80 mg/mL",
    form: "solução",
    component: "Estratégico",
    atc: "J05AR10",
    source: "RENAME 2024"
  },
  {
    name: "maraviroque",
    concentration: "150 mg",
    form: "comprimido",
    component: "Estratégico",
    atc: "J05AX09",
    source: "RENAME 2024"
  },
  {
    name: "ofloxacino",
    concentration: "400 mg",
    form: "comprimido",
    component: "Estratégico",
    atc: "J01MA01",
    source: "RENAME 2024"
  },
  {
    name: "palivizumabe",
    concentration: "100 mg/mL",
    form: "solução",
    component: "Estratégico",
    atc: "J06BD01",
    source: "RENAME 2024"
  },
  {
    name: "pretomanida",
    concentration: "200 mg",
    form: "comprimido",
    component: "Estratégico",
    atc: "J04AK08",
    source: "RENAME 2024"
  },
  {
    name: "ribavirina",
    concentration: "250 mg",
    form: "cápsula",
    component: "Estratégico",
    atc: "J05AP01",
    source: "RENAME 2024"
  },
  {
    name: "rifabutina",
    concentration: "150 mg",
    form: "cápsula",
    component: "Estratégico",
    atc: "J04AB04",
    source: "RENAME 2024"
  },
  {
    name: "rifampicina +",
    concentration: "300 mg",
    form: "comprimido",
    component: "Estratégico",
    atc: "J04AM02",
    source: "RENAME 2024"
  },
  {
    name: "isoniazida +",
    concentration: "75 mg",
    form: "",
    component: "Estratégico",
    atc: "J04AM05",
    source: "RENAME 2024"
  },
  {
    name: "pirazinamida",
    concentration: "",
    form: "comprimido",
    component: "Estratégico",
    atc: "J04AM06",
    source: "RENAME 2024"
  },
  {
    name: "rifapentina",
    concentration: "150 mg",
    form: "comprimido",
    component: "Estratégico",
    atc: "J04AB05",
    source: "RENAME 2024"
  },
  {
    name: "ritonavir",
    concentration: "100 mg",
    form: "comprimido",
    component: "Estratégico",
    atc: "J05AE03",
    source: "RENAME 2024"
  },
  {
    name: "sofosbuvir",
    concentration: "400 mg",
    form: "comprimido",
    component: "Estratégico",
    atc: "J05AP08",
    source: "RENAME 2024"
  },
  {
    name: "velpatasvir +",
    concentration: "400 mg",
    form: "comprimido",
    component: "Estratégico",
    atc: "J05AP56",
    source: "RENAME 2024"
  },
  {
    name: "(Loxosceles,",
    concentration: "",
    form: "solução",
    component: "Estratégico",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "(pentavalente)",
    concentration: "5 mg",
    form: "",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "soro antibotrópico",
    concentration: "5 mg",
    form: "",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "(pentavalente) e",
    concentration: "",
    form: "solução",
    component: "Estratégico",
    atc: "J06AA03",
    source: "RENAME 2024"
  },
  {
    name: "anticrotálico",
    concentration: "1,5 mg",
    form: "",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "UI de toxinabutolínica tipo A e",
    concentration: "",
    form: "solução",
    component: "Estratégico",
    atc: "J06AA04",
    source: "RENAME 2024"
  },
  {
    name: "soro anticrotálico",
    concentration: "",
    form: "solução",
    component: "Estratégico",
    atc: "J06AA03",
    source: "RENAME 2024"
  },
  {
    name: "soro antidiftérico",
    concentration: "",
    form: "solução",
    component: "Estratégico",
    atc: "J06AA01",
    source: "RENAME 2024"
  },
  {
    name: "DMM (Dose Mínima Mortal) de",
    concentration: "",
    form: "solução",
    component: "Estratégico",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "soro antilonômico",
    concentration: "",
    form: "solução",
    component: "Estratégico",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "de veneno de aranhas das",
    concentration: "",
    form: "solução",
    component: "Estratégico",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "soro antirrábico",
    concentration: "",
    form: "solução",
    component: "Estratégico",
    atc: "J06AA06",
    source: "RENAME 2024"
  },
  {
    name: "soro antitetânico",
    concentration: "",
    form: "solução",
    component: "Estratégico",
    atc: "J06AA02",
    source: "RENAME 2024"
  },
  {
    name: "sulfadiazina",
    concentration: "500 mg",
    form: "comprimido",
    component: "Estratégico",
    atc: "J01EC02",
    source: "RENAME 2024"
  },
  {
    name: "sulfato de",
    concentration: "",
    form: "solução",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "estreptomicina",
    concentration: "",
    form: "injetável",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "Isavuconazônio",
    concentration: "",
    form: "pó",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "terizidona",
    concentration: "250 mg",
    form: "cápsula",
    component: "Estratégico",
    atc: "J04AK03",
    source: "RENAME 2024"
  },
  {
    name: "tobramicina",
    concentration: "300 mg",
    form: "solução",
    component: "Especializado",
    atc: "J01GB01",
    source: "RENAME 2024"
  },
  {
    name: "difteria, tétano e",
    concentration: "",
    form: "suspensão",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "pertussis (acelular)",
    concentration: "",
    form: "injetável",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "vacina BCG",
    concentration: "",
    form: "suspensão",
    component: "Estratégico",
    atc: "J07AN01",
    source: "RENAME 2024"
  },
  {
    name: "vacina febre",
    concentration: "",
    form: "solução",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "amarela (atenuada)",
    concentration: "",
    form: "injetável",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "vacina hepatite B",
    concentration: "",
    form: "suspensão",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "(recombinante)",
    concentration: "",
    form: "injetável",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "trivalente",
    concentration: "",
    form: "suspensão",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "(fragmentada,",
    concentration: "",
    form: "injetável",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "meningocócica",
    concentration: "",
    form: "solução",
    component: "Estratégico",
    atc: "J07AH08",
    source: "RENAME 2024"
  },
  {
    name: "vacina",
    concentration: "",
    form: "pó",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "meningocócica C",
    concentration: "",
    form: "suspensão",
    component: "Estratégico",
    atc: "J07AH07",
    source: "RENAME 2024"
  },
  {
    name: "(conjugada)",
    concentration: "",
    form: "injetável",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "papilomavírus",
    concentration: "",
    form: "suspensão",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "humano 6, 11, 16 e",
    concentration: "",
    form: "injetável",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "pneumocócica",
    concentration: "",
    form: "suspensão",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "humano G1P [8]",
    concentration: "",
    form: "suspensão",
    component: "Estratégico",
    atc: "J07BH01",
    source: "RENAME 2024"
  },
  {
    name: "vacina sarampo,",
    concentration: "",
    form: "solução",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "caxumba, rubéola",
    concentration: "",
    form: "injetável",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "vacina varicela",
    concentration: "",
    form: "solução",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "(atenuada)",
    concentration: "",
    form: "injetável",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "voriconazol",
    concentration: "",
    form: "pó",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "zanamivir",
    concentration: "5 mg",
    form: "",
    component: "Estratégico",
    atc: "J05AH01",
    source: "RENAME 2024"
  },
  {
    name: "zidovudina",
    concentration: "10 mg/mL",
    form: "solução",
    component: "Estratégico",
    atc: "J05AF01",
    source: "RENAME 2024"
  },
  {
    name: "acetato de",
    concentration: "20 mg",
    form: "solução",
    component: "Especializado",
    atc: "L03AX13",
    source: "RENAME 2024"
  },
  {
    name: "glatirâmer",
    concentration: "40 mg",
    form: "solução",
    component: "Especializado",
    atc: "L03AX13",
    source: "RENAME 2024"
  },
  {
    name: "acetato de",
    concentration: "3,6 mg",
    form: "",
    component: "Especializado",
    atc: "L02AE03",
    source: "RENAME 2024"
  },
  {
    name: "gosserrelina",
    concentration: "10,8 mg",
    form: "",
    component: "Especializado",
    atc: "L02AE03",
    source: "RENAME 2024"
  },
  {
    name: "adalimumabe",
    concentration: "40 mg",
    form: "solução",
    component: "Especializado",
    atc: "L04AB04",
    source: "RENAME 2024"
  },
  {
    name: "alentuzumabe",
    concentration: "10 mg/mL",
    form: "",
    component: "Especializado",
    atc: "L04AG06",
    source: "RENAME 2024"
  },
  {
    name: "alfainterferona 2b",
    concentration: "000.000 UI",
    form: "solução",
    component: "Especializado",
    atc: "L03AB05",
    source: "RENAME 2024"
  },
  {
    name: "pó para solução injetável",
    concentration: "",
    form: "solução",
    component: "Estratégico",
    atc: "L03AB10",
    source: "RENAME 2024"
  },
  {
    name: "azatioprina",
    concentration: "50 mg",
    form: "comprimido",
    component: "Especializado",
    atc: "L04AX01",
    source: "RENAME 2024"
  },
  {
    name: "betainterferona 1a",
    concentration: "30 mcg",
    form: "solução",
    component: "Especializado",
    atc: "L03AB07",
    source: "RENAME 2024"
  },
  {
    name: "betainterferona 1b",
    concentration: "300 mcg",
    form: "solução",
    component: "Especializado",
    atc: "L03AB08",
    source: "RENAME 2024"
  },
  {
    name: "ciclofosfamida",
    concentration: "50 mg",
    form: "",
    component: "Especializado",
    atc: "L01AA01",
    source: "RENAME 2024"
  },
  {
    name: "ciclosporina",
    concentration: "100 mg",
    form: "cápsula",
    component: "Especializado",
    atc: "L04AD01",
    source: "RENAME 2024"
  },
  {
    name: "cladribina",
    concentration: "10 mg",
    form: "comprimido",
    component: "Especializado",
    atc: "L04AA40",
    source: "RENAME 2024"
  },
  {
    name: "eculizumabe",
    concentration: "10 mg/mL",
    form: "",
    component: "Especializado",
    atc: "L04AJ01",
    source: "RENAME 2024"
  },
  {
    name: "triptorrelina",
    concentration: "",
    form: "injetável",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "everolimo",
    concentration: "0,75 mg",
    form: "comprimido",
    component: "Especializado",
    atc: "L04AH02",
    source: "RENAME 2024"
  },
  {
    name: "filgrastim",
    concentration: "300 mcg",
    form: "solução",
    component: "Especializado",
    atc: "L03AA02",
    source: "RENAME 2024"
  },
  {
    name: "fumarato de",
    concentration: "120 mg",
    form: "cápsula",
    component: "Especializado",
    atc: "L04AX07",
    source: "RENAME 2024"
  },
  {
    name: "dimetila",
    concentration: "240 mg",
    form: "cápsula",
    component: "Especializado",
    atc: "L04AX07",
    source: "RENAME 2024"
  },
  {
    name: "golimumabe",
    concentration: "50 mg",
    form: "solução",
    component: "Especializado",
    atc: "L04AB06",
    source: "RENAME 2024"
  },
  {
    name: "infliximabe",
    concentration: "100 mg",
    form: "solução",
    component: "Especializado",
    atc: "L04AB02",
    source: "RENAME 2024"
  },
  {
    name: "leflunomida",
    concentration: "20 mg",
    form: "comprimido",
    component: "Especializado",
    atc: "L04AK01",
    source: "RENAME 2024"
  },
  {
    name: "micofenolato de",
    concentration: "180 mg",
    form: "comprimido",
    component: "Especializado",
    atc: "L04AA06",
    source: "RENAME 2024"
  },
  {
    name: "sódio",
    concentration: "360 mg",
    form: "comprimido",
    component: "Especializado",
    atc: "L04AA06",
    source: "RENAME 2024"
  },
  {
    name: "natalizumabe",
    concentration: "20 mg/mL",
    form: "solução",
    component: "Especializado",
    atc: "L04AG03",
    source: "RENAME 2024"
  },
  {
    name: "ravulizumabe",
    concentration: "100 mg/mL",
    form: "",
    component: "Especializado",
    atc: "L04AJ02",
    source: "RENAME 2024"
  },
  {
    name: "risanquizumabe",
    concentration: "75 mg",
    form: "solução",
    component: "Especializado",
    atc: "L04AC18",
    source: "RENAME 2024"
  },
  {
    name: "rituximabe",
    concentration: "10 mg/mL",
    form: "",
    component: "Especializado",
    atc: "L01FA01",
    source: "RENAME 2024"
  },
  {
    name: "secuquinumabe",
    concentration: "150 mg/mL",
    form: "solução",
    component: "Especializado",
    atc: "L04AC10",
    source: "RENAME 2024"
  },
  {
    name: "talidomida",
    concentration: "100 mg",
    form: "comprimido",
    component: "Estratégico",
    atc: "L04AX02",
    source: "RENAME 2024"
  },
  {
    name: "teriflunomida",
    concentration: "14 mg",
    form: "comprimido",
    component: "Especializado",
    atc: "L04AK02",
    source: "RENAME 2024"
  },
  {
    name: "tocilizumabe",
    concentration: "20 mg/mL",
    form: "solução",
    component: "Especializado",
    atc: "L04AC07",
    source: "RENAME 2024"
  },
  {
    name: "tofacitinibe",
    concentration: "5 mg",
    form: "comprimido",
    component: "Especializado",
    atc: "L04AF01",
    source: "RENAME 2024"
  },
  {
    name: "triptorrelina",
    concentration: "3,75 mg",
    form: "",
    component: "Especializado",
    atc: "L02AE04",
    source: "RENAME 2024"
  },
  {
    name: "upadacitinibe",
    concentration: "15 mg",
    form: "",
    component: "Especializado",
    atc: "L04AF03",
    source: "RENAME 2024"
  },
  {
    name: "vedolizumabe",
    concentration: "300 mg",
    form: "solução",
    component: "Especializado",
    atc: "L04AG05",
    source: "RENAME 2024"
  },
  {
    name: "ácido zoledrônico",
    concentration: "5 mg",
    form: "solução",
    component: "Especializado",
    atc: "M05BA08",
    source: "RENAME 2024"
  },
  {
    name: "burosumabe",
    concentration: "20 mg/mL",
    form: "solução",
    component: "Especializado",
    atc: "M05BX05",
    source: "RENAME 2024"
  },
  {
    name: "ibuprofeno",
    concentration: "600 mg",
    form: "cápsula",
    component: "Básico",
    atc: "M01AE01",
    source: "RENAME 2024"
  },
  {
    name: "nusinersena",
    concentration: "2,4 mg/mL",
    form: "solução",
    component: "Especializado",
    atc: "M09AX07",
    source: "RENAME 2024"
  },
  {
    name: "pamidronato dissódico",
    concentration: "60 mg",
    form: "solução",
    component: "Especializado",
    atc: "M05BA03",
    source: "RENAME 2024"
  },
  {
    name: "penicilamina",
    concentration: "250 mg",
    form: "cápsula",
    component: "Especializado",
    atc: "M01CC01",
    source: "RENAME 2024"
  },
  {
    name: "risdiplam",
    concentration: "0,75 mg/mL",
    form: "solução",
    component: "Especializado",
    atc: "M09AX10",
    source: "RENAME 2024"
  },
  {
    name: "risedronato sódico",
    concentration: "35 mg",
    form: "comprimido",
    component: "Especializado",
    atc: "M05BA07",
    source: "RENAME 2024"
  },
  {
    name: "romosozumabe",
    concentration: "90 mg/mL",
    form: "solução",
    component: "Especializado",
    atc: "M05BX06",
    source: "RENAME 2024"
  },
  {
    name: "ácido acetilsalicílico",
    concentration: "500 mg",
    form: "comprimido",
    component: "Básico",
    atc: "N02BA01",
    source: "RENAME 2024"
  },
  {
    name: "brometo de piridostigmina",
    concentration: "60 mg",
    form: "comprimido",
    component: "Especializado",
    atc: "N07AA02",
    source: "RENAME 2024"
  },
  {
    name: "bromidrato de galantamina",
    concentration: "16 mg",
    form: "cápsula",
    component: "Especializado",
    atc: "N06DA04",
    source: "RENAME 2024"
  },
  {
    name: "carbamazepina",
    concentration: "400 mg",
    form: "comprimido",
    component: "Básico",
    atc: "N03AF01",
    source: "RENAME 2024"
  },
  {
    name: "carbonato de lítio",
    concentration: "300 mg",
    form: "comprimido",
    component: "Básico",
    atc: "N05AN01",
    source: "RENAME 2024"
  },
  {
    name: "clonazepam",
    concentration: "2,5 mg/mL",
    form: "solução",
    component: "Básico",
    atc: "N03AE01",
    source: "RENAME 2024"
  },
  {
    name: "cloridrato de amantadina",
    concentration: "100 mg",
    form: "comprimido",
    component: "Especializado",
    atc: "N04BB01",
    source: "RENAME 2024"
  },
  {
    name: "cloridrato de bupropiona",
    concentration: "150 mg",
    form: "comprimido",
    component: "Estratégico",
    atc: "N06AX12",
    source: "RENAME 2024"
  },
  {
    name: "cloridrato de lidocaína",
    concentration: "100 mg/mL",
    form: "solução",
    component: "Básico",
    atc: "N01BB02",
    source: "RENAME 2024"
  },
  {
    name: "cloridrato de lidocaína +",
    concentration: "50 mg/mL",
    form: "",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "glicose",
    concentration: "5%",
    form: "",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "cloridrato de lidocaína +",
    concentration: "2%",
    form: "",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "hemitartarato de epinefrina",
    concentration: "12,5 mcg/mL",
    form: "",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "cloridrato de memantina",
    concentration: "10 mg",
    form: "comprimido",
    component: "Especializado",
    atc: "N06DX01",
    source: "RENAME 2024"
  },
  {
    name: "cloridrato de metadona",
    concentration: "10 mg",
    form: "comprimido",
    component: "Especializado",
    atc: "N07BC02",
    source: "RENAME 2024"
  },
  {
    name: "cloridrato de prilocaína +",
    concentration: "30 mg/mL",
    form: "",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "felipressina",
    concentration: "0,03 UI/mL",
    form: "",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "cloridrato de selegilina",
    concentration: "5 mg",
    form: "comprimido",
    component: "Especializado",
    atc: "N04BD01",
    source: "RENAME 2024"
  },
  {
    name: "cloridrato de triexifenidil",
    concentration: "5 mg",
    form: "comprimido",
    component: "Especializado",
    atc: "N04AA01",
    source: "RENAME 2024"
  },
  {
    name: "diazepam",
    concentration: "5 mg",
    form: "comprimido",
    component: "Básico",
    atc: "N05BA01",
    source: "RENAME 2024"
  },
  {
    name: "dicloridrato de pramipexol",
    concentration: "0,25 mg",
    form: "comprimido",
    component: "Especializado",
    atc: "N04BC05",
    source: "RENAME 2024"
  },
  {
    name: "dipirona",
    concentration: "500 mg/mL",
    form: "solução",
    component: "Básico",
    atc: "N02BB02",
    source: "RENAME 2024"
  },
  {
    name: "entacapona",
    concentration: "200 mg",
    form: "comprimido",
    component: "Especializado",
    atc: "N04BX02",
    source: "RENAME 2024"
  },
  {
    name: "etossuximida",
    concentration: "50 mg/mL",
    form: "xarope",
    component: "Especializado",
    atc: "N03AD01",
    source: "RENAME 2024"
  },
  {
    name: "fenitoína",
    concentration: "20 mg/mL",
    form: "suspensão",
    component: "Básico",
    atc: "N03AB02",
    source: "RENAME 2024"
  },
  {
    name: "fenobarbital",
    concentration: "100 mg",
    form: "comprimido",
    component: "Básico",
    atc: "N03AA02",
    source: "RENAME 2024"
  },
  {
    name: "haloperidol",
    concentration: "50 mg/mL",
    form: "solução",
    component: "Básico",
    atc: "N05AD01",
    source: "RENAME 2024"
  },
  {
    name: "lactato de biperideno",
    concentration: "5 mg/mL",
    form: "solução",
    component: "Básico",
    atc: "N04AA02",
    source: "RENAME 2024"
  },
  {
    name: "lamotrigina",
    concentration: "50 mg",
    form: "comprimido",
    component: "Especializado",
    atc: "N03AX09",
    source: "RENAME 2024"
  },
  {
    name: "levetiracetam",
    concentration: "100 mg/mL",
    form: "solução",
    component: "Especializado",
    atc: "N03AX14",
    source: "RENAME 2024"
  },
  {
    name: "levodopa + benserazida",
    concentration: "100 mg",
    form: "comprimido",
    component: "Básico",
    atc: "N04BA02",
    source: "RENAME 2024"
  },
  {
    name: "mesilato de rasagilina",
    concentration: "1 mg",
    form: "comprimido",
    component: "Especializado",
    atc: "N04BD02",
    source: "RENAME 2024"
  },
  {
    name: "midazolam",
    concentration: "2 mg/mL",
    form: "solução",
    component: "Básico",
    atc: "N05CD08",
    source: "RENAME 2024"
  },
  {
    name: "nicotina",
    concentration: "21 mg",
    form: "",
    component: "Estratégico",
    atc: "N07BA01",
    source: "RENAME 2024"
  },
  {
    name: "riluzol",
    concentration: "50 mg",
    form: "comprimido",
    component: "Especializado",
    atc: "N07XX02",
    source: "RENAME 2024"
  },
  {
    name: "rivastigmina",
    concentration: "6 mg",
    form: "cápsula",
    component: "Especializado",
    atc: "N06DA03",
    source: "RENAME 2024"
  },
  {
    name: "sulfato de morfina",
    concentration: "30 mg",
    form: "comprimido",
    component: "Especializado",
    atc: "N02AA01",
    source: "RENAME 2024"
  },
  {
    name: "tafamidis",
    concentration: "61 mg",
    form: "cápsula",
    component: "Especializado",
    atc: "N07XX08",
    source: "RENAME 2024"
  },
  {
    name: "tafamidis meglumina",
    concentration: "20 mg",
    form: "cápsula",
    component: "Especializado",
    atc: "N07XX08",
    source: "RENAME 2024"
  },
  {
    name: "topiramato",
    concentration: "50 mg",
    form: "comprimido",
    component: "Especializado",
    atc: "N03AX11",
    source: "RENAME 2024"
  },
  {
    name: "vigabatrina",
    concentration: "500 mg",
    form: "comprimido",
    component: "Especializado",
    atc: "N03AG04",
    source: "RENAME 2024"
  },
  {
    name: "antimoniato de meglumina 300 mg/mL",
    concentration: "300 mg/mL",
    form: "solução",
    component: "Estratégico",
    atc: "P01CB01",
    source: "RENAME 2024"
  },
  {
    name: "arteméter + lumefantrina",
    concentration: "20 mg",
    form: "comprimido",
    component: "Estratégico",
    atc: "P01BF01",
    source: "RENAME 2024"
  },
  {
    name: "artesunato",
    concentration: "60 mg/mL",
    form: "solução",
    component: "Estratégico",
    atc: "P01BE03",
    source: "RENAME 2024"
  },
  {
    name: "benzoilmetronidazol",
    concentration: "40 mg/mL",
    form: "suspensão",
    component: "Básico",
    atc: "P01AB01",
    source: "RENAME 2024"
  },
  {
    name: "difosfato de cloroquina",
    concentration: "150 mg",
    form: "comprimido",
    component: "Especializado",
    atc: "P01BA01",
    source: "RENAME 2024"
  },
  {
    name: "isetionato de pentamidina",
    concentration: "300 mg",
    form: "solução",
    component: "Estratégico",
    atc: "P01CX01",
    source: "RENAME 2024"
  },
  {
    name: "ivermectina",
    concentration: "6 mg",
    form: "comprimido",
    component: "Básico",
    atc: "P02CF01",
    source: "RENAME 2024"
  },
  {
    name: "nifurtimox",
    concentration: "120 mg",
    form: "comprimido",
    component: "Estratégico",
    atc: "P01CC01",
    source: "RENAME 2024"
  },
  {
    name: "oxamniquina",
    concentration: "50 mg/mL",
    form: "suspensão",
    component: "Estratégico",
    atc: "P02BA02",
    source: "RENAME 2024"
  },
  {
    name: "pirimetamina",
    concentration: "25 mg",
    form: "comprimido",
    component: "Estratégico",
    atc: "P01BD01",
    source: "RENAME 2024"
  },
  {
    name: "praziquantel",
    concentration: "600 mg",
    form: "comprimido",
    component: "Estratégico",
    atc: "P02BA01",
    source: "RENAME 2024"
  },
  {
    name: "alfadornase",
    concentration: "1 mg/mL",
    form: "solução",
    component: "Especializado",
    atc: "R05CB13",
    source: "RENAME 2024"
  },
  {
    name: "monoidratado +",
    concentration: "2,5 mcg",
    form: "solução",
    component: "Especializado",
    atc: "R03AL06",
    source: "RENAME 2024"
  },
  {
    name: "+ trifenatato de",
    concentration: "62,5 mcg",
    form: "pó",
    component: "Especializado",
    atc: "R03AL03",
    source: "RENAME 2024"
  },
  {
    name: "bromidrato de fenoterol",
    concentration: "100 mcg/dose",
    form: "solução",
    component: "Especializado",
    atc: "R03AC04",
    source: "RENAME 2024"
  },
  {
    name: "cloreto de sódio",
    concentration: "9 mg/mL",
    form: "solução",
    component: "Básico",
    atc: "R01AX10",
    source: "RENAME 2024"
  },
  {
    name: "cloridrato de",
    concentration: "25 mg",
    form: "comprimido",
    component: "Básico",
    atc: "R06AD02",
    source: "RENAME 2024"
  },
  {
    name: "prometazina",
    concentration: "25 mg/mL",
    form: "solução",
    component: "Básico",
    atc: "R06AD02",
    source: "RENAME 2024"
  },
  {
    name: "dipropionato de",
    concentration: "",
    form: "suspensão",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "elexacaftor/tezacaftor/",
    concentration: "75 mg",
    form: "",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "ivacaftor + ivacaftor",
    concentration: "100 mg",
    form: "",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "fumarato de formoterol",
    concentration: "6 mcg",
    form: "pó",
    component: "Especializado",
    atc: "R03AK07",
    source: "RENAME 2024"
  },
  {
    name: "+ budesonida",
    concentration: "12 mcg",
    form: "cápsula",
    component: "Especializado",
    atc: "R03AK07",
    source: "RENAME 2024"
  },
  {
    name: "ivacaftor",
    concentration: "150 mg",
    form: "comprimido",
    component: "Especializado",
    atc: "R07AX02",
    source: "RENAME 2024"
  },
  {
    name: "mepolizumabe",
    concentration: "100 mg",
    form: "solução",
    component: "Especializado",
    atc: "R03DX09",
    source: "RENAME 2024"
  },
  {
    name: "sulfato de salbutamol",
    concentration: "5 mg/mL",
    form: "solução",
    component: "Básico",
    atc: "R03AC02",
    source: "RENAME 2024"
  },
  {
    name: "xinafoato de salmeterol",
    concentration: "50 mcg",
    form: "pó",
    component: "Especializado",
    atc: "R03AC12",
    source: "RENAME 2024"
  },
  {
    name: "bimatoprosta",
    concentration: "0,3 mg/mL",
    form: "solução",
    component: "Especializado",
    atc: "S01EE03",
    source: "RENAME 2024"
  },
  {
    name: "brinzolamida",
    concentration: "10 mg/mL",
    form: "suspensão",
    component: "Especializado",
    atc: "S01EC04",
    source: "RENAME 2024"
  },
  {
    name: "cloridrato de tetraciclina",
    concentration: "5 mg/g",
    form: "pomada",
    component: "Básico",
    atc: "S01AA09",
    source: "RENAME 2024"
  },
  {
    name: "latanoprosta",
    concentration: "0,05 mg/mL",
    form: "solução",
    component: "Especializado",
    atc: "S01EE01",
    source: "RENAME 2024"
  },
  {
    name: "maleato de timolol",
    concentration: "5 mg/mL",
    form: "solução",
    component: "Básico",
    atc: "S01ED01",
    source: "RENAME 2024"
  },
  {
    name: "mg/mL + 0,250 mg/mL",
    concentration: "0,250 mg/mL",
    form: "solução",
    component: "Básico",
    atc: "S02AA11",
    source: "RENAME 2024"
  },
  {
    name: "tartarato de brimonidina",
    concentration: "2 mg/mL",
    form: "solução",
    component: "Especializado",
    atc: "S01EA05",
    source: "RENAME 2024"
  },
  {
    name: "travoprosta",
    concentration: "0,04 mg/mL",
    form: "solução",
    component: "Especializado",
    atc: "S01EE04",
    source: "RENAME 2024"
  },
  {
    name: "ácido folínico",
    concentration: "15 mg",
    form: "comprimido",
    component: "",
    atc: "V03AF03",
    source: "RENAME 2024"
  },
  {
    name: "cloridrato de hidroxocoba-",
    concentration: "",
    form: "solução",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "lamina",
    concentration: "",
    form: "injetável",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "cloridrato de naloxona",
    concentration: "0,4 mg/mL",
    form: "solução",
    component: "Básico",
    atc: "V03AB15",
    source: "RENAME 2024"
  },
  {
    name: "cloridrato de protamina",
    concentration: "10 mg/mL",
    form: "solução",
    component: "Básico",
    atc: "V03AB14",
    source: "RENAME 2024"
  },
  {
    name: "cloridrato de sevelâmer",
    concentration: "800 mg",
    form: "comprimido",
    component: "Especializado",
    atc: "V03AE02",
    source: "RENAME 2024"
  },
  {
    name: "deferasirox",
    concentration: "250 mg",
    form: "",
    component: "Especializado",
    atc: "V03AC03",
    source: "RENAME 2024"
  },
  {
    name: "deferiprona",
    concentration: "500 mg",
    form: "comprimido",
    component: "Especializado",
    atc: "V03AC02",
    source: "RENAME 2024"
  },
  {
    name: "flumazenil",
    concentration: "0,1 mg/mL",
    form: "solução",
    component: "Básico",
    atc: "V03AB25",
    source: "RENAME 2024"
  },
  {
    name: "folinato de cálcio",
    concentration: "15 mg",
    form: "comprimido",
    component: "",
    atc: "V03AF03",
    source: "RENAME 2024"
  },
  {
    name: "gel lubrificante",
    concentration: "",
    form: "gel",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "glicose",
    concentration: "100 mg/mL",
    form: "solução",
    component: "Básico",
    atc: "V06DC01",
    source: "RENAME 2024"
  },
  {
    name: "glutaral",
    concentration: "",
    form: "solução",
    component: "Básico",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "mesilato de",
    concentration: "",
    form: "solução",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "desferroxamina",
    concentration: "",
    form: "injetável",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "micronutrientes",
    concentration: "",
    form: "pó",
    component: "Estratégico",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "cafeoilquínico expressos em ácido",
    concentration: "",
    form: "cápsula",
    component: "Básico",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "scolymus L.)",
    concentration: "48 mg",
    form: "",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "aroeira (Schinus",
    concentration: "1,932 mg",
    form: "gel",
    component: "Básico",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "hidroxiantracênicos expressos em",
    concentration: "",
    form: "cápsula",
    component: "Básico",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "(Rhamnus purshiana)",
    concentration: "30 mg",
    form: "",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "cápsula",
    concentration: "",
    form: "cápsula",
    component: "Básico",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "espinheira-santa",
    concentration: "90 mg",
    form: "",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "Monteverdia ilicifolia",
    concentration: "90 mg",
    form: "",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "hortelã (Mentha x",
    concentration: "440 mg",
    form: "",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "plantago (Plantago",
    concentration: "",
    form: "granulado",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "salgueiro (Salix alba L.)",
    concentration: "240 mg",
    form: "",
    component: "Básico",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "tomentosa (Willd. ex",
    concentration: "",
    form: "comprimido",
    component: "Básico",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "medroxiprogesterona +",
    concentration: "25 mg",
    form: "injetável",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "acetazolamida",
    concentration: "250 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "amoxicilina + clavulanato de",
    concentration: "50 mg/mL",
    form: "suspensão",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "benzilpenicilina potássica",
    concentration: "000.000 UI",
    form: "solução",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "benzilpenicilina procaína +",
    concentration: "",
    form: "suspensão",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "benzilpenicilina potássica",
    concentration: "",
    form: "injetável",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "budesonida",
    concentration: "50 mcg",
    form: "",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "carbonato de cálcio",
    concentration: "",
    form: "comprimido",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "mg de cálcio elementar) +",
    concentration: "",
    form: "comprimido",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "purshiana)",
    concentration: "30 mg",
    form: "",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "cloridrato de lidocaína + glicose",
    concentration: "",
    form: "solução",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "cloridrato de metoclopramida",
    concentration: "5 mg/mL",
    form: "solução",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "cloridrato de pilocarpina",
    concentration: "20 mg/mL",
    form: "solução",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "cloridrato de piridoxina",
    concentration: "40 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "dipropionato de",
    concentration: "200 mcg/dose",
    form: "solução",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "beclometasona",
    concentration: "250 mcg/dose",
    form: "solução",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "expressos em pirogalol (dose",
    concentration: "",
    form: "cápsula",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "Monteverdia ilicifolia (Mart. ex",
    concentration: "90 mg",
    form: "",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "Reissek) Biral )",
    concentration: "",
    form: "suspensão",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "estolato de eritromicina",
    concentration: "500 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "estriol",
    concentration: "1 mg/g",
    form: "creme",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "etinilestradiol + levonorgestrel",
    concentration: "0,03 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "ferripolimaltose",
    concentration: "100 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "fluconazol",
    concentration: "10 mg/mL",
    form: "suspensão",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "fosfato de cálcio tribásico +",
    concentration: "1661,616 mg",
    form: "",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "colecalciferol",
    concentration: "400 UI",
    form: "",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "monobásico + fosfato de",
    concentration: "",
    form: "solução",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "guaco (Mikania glomerata",
    concentration: "5 mg",
    form: "",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "hemitartarato de norepinefrina",
    concentration: "2 mg/mL",
    form: "solução",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "hortelã (Mentha x piperita L.)",
    concentration: "256 mg",
    form: "cápsula",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "insulina humana regular",
    concentration: "100 UI/mL",
    form: "solução",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "(L.) Merr.)",
    concentration: "120 mg",
    form: "",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "maleato de dexclorfeniramina",
    concentration: "0,4 mg/mL",
    form: "solução",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "metilsulfato de pralidoxima",
    concentration: "200 mg",
    form: "solução",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "metronidazol",
    concentration: "250 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "pasta de óxido de zinco (FN)",
    concentration: "250 mg/g",
    form: "",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "rifampicina",
    concentration: "300 mg",
    form: "cápsula",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "sais para reidratação oral",
    concentration: "",
    form: "solução",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "solução ringer + lactato",
    concentration: "0,3 mg",
    form: "solução",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "succinato sódico de",
    concentration: "100 mg",
    form: "solução",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "hidrocortisona",
    concentration: "500 mg",
    form: "solução",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "sulfametoxazol + trimetoprima",
    concentration: "80 mg/mL",
    form: "solução",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "sulfato de magnésio",
    concentration: "10%",
    form: "solução",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "+ sulfato de neomicina +",
    concentration: "10.000 UI/mL",
    form: "",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "fluocinolona acetonida +",
    concentration: "0,250 mg/mL",
    form: "",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "tomentosa (Willd. ex Roem. &",
    concentration: "",
    form: "comprimido",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "ácido paraminossalicílico",
    concentration: "4g",
    form: "granulado",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "albendazol",
    concentration: "400 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "alfapeginterferona 2a",
    concentration: "180 mcg",
    form: "solução",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "alfapeginterferona 2b",
    concentration: "",
    form: "solução",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "anfotericina B (desoxicolato)",
    concentration: "50 mg",
    form: "solução",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "anfotericina B (lipossomal)",
    concentration: "50 mg",
    form: "solução",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "antimoniato de meglumina",
    concentration: "300 mg/mL",
    form: "solução",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "artemeter + lumefantrina",
    concentration: "20 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "azitromicina",
    concentration: "40 mg/mL",
    form: "suspensão",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "benzilpenicilina benzatina",
    concentration: "200.000 UI",
    form: "",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "citrato de dietilcarbamazina",
    concentration: "50 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "cloranfenicol",
    concentration: "25 mg/mL",
    form: "suspensão",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "cloridrato de doxiciclina",
    concentration: "100 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "cloridrato de etambutol",
    concentration: "400 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "cloridrato de minociclina",
    concentration: "100 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "cloridrato de moxifloxacino",
    concentration: "400 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "complexo protrombínico",
    concentration: "500 UI",
    form: "solução",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "humano",
    concentration: "600 UI",
    form: "solução",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "dicloridrato de sapropterina",
    concentration: "100 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "enfuvirtida",
    concentration: "",
    form: "solução",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "recombinante",
    concentration: "1.000 UI",
    form: "solução",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "flucitosina",
    concentration: "500 mg",
    form: "cápsula",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "fluconazol",
    concentration: "2 mg/mL",
    form: "solução",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "fosfato de oseltamivir",
    concentration: "45 mg",
    form: "cápsula",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "fostensavir trometamol",
    concentration: "600 mg",
    form: "",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "desoproxila + lamivudina +",
    concentration: "300 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "glecaprevir + pibrentasvir",
    concentration: "100 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "imunoglobulina antitetânica",
    concentration: "250 UI/mL",
    form: "solução",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "itraconazol",
    concentration: "100 mg",
    form: "cápsula",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "ledipasvir + sofosbuvir",
    concentration: "90 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "micronutrientes",
    concentration: "0,5 mg",
    form: "pó",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "nirmatrelvir + ritonavir",
    concentration: "150 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "palivizumabe",
    concentration: "",
    form: "solução",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "pirazinamida",
    concentration: "30 mg/mL",
    form: "suspensão",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "rifampicina*",
    concentration: "150 mg",
    form: "cápsula",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "rifampicina + isoniazida",
    concentration: "75 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "pirazinamida + cloridrato de",
    concentration: "",
    form: "comprimido",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "rifapentina + isoniazida",
    concentration: "300 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "sofosbuvir + velpatasvir",
    concentration: "400 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "(Loxosceles, Phoneutria",
    concentration: "",
    form: "solução",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "neutralizam, no mínimo, 5 mg",
    concentration: "5 mg",
    form: "solução",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "soro antibotulínico AB",
    concentration: "375 UI",
    form: "",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "(bivalente)",
    concentration: "275 UI",
    form: "",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "soro antielapídico (bivalente)",
    concentration: "",
    form: "solução",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "soro antiescorpiônico",
    concentration: "",
    form: "solução",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "Necrosante) de veneno de ara-",
    concentration: "",
    form: "solução",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "succinato de tafenoquina",
    concentration: "150 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "sulfato de amicacina",
    concentration: "250 mg/mL",
    form: "solução",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "sulfato de atazanavir",
    concentration: "300 mg",
    form: "cápsula",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "sulfato de estreptomicina",
    concentration: "1g",
    form: "solução",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "sulfato de Isavuconazônio",
    concentration: "",
    form: "pó",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "tétano e pertussis (acelular)",
    concentration: "",
    form: "injetável",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "B (recombinante) e",
    concentration: "",
    form: "injetável",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "vacina cólera (inativada)",
    concentration: "",
    form: "suspensão",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "vacina meningocócica C",
    concentration: "",
    form: "suspensão",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "humano 6, 11, 16 e 18",
    concentration: "",
    form: "injetável",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "vacina varicela (atenuada)",
    concentration: "",
    form: "solução",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "zidovudina + lamivudina",
    concentration: "300 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "desmopressina",
    concentration: "0,1 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "acetato de",
    concentration: "",
    form: "injetável",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "glatirâmer",
    concentration: "",
    form: "solução",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "lanreotida",
    concentration: "",
    form: "solução",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "octreotida",
    concentration: "",
    form: "pó",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "solução para",
    concentration: "",
    form: "solução",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "ácido zoledrônico",
    concentration: "0,05 mg/mL",
    form: "",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "solução",
    concentration: "",
    form: "solução",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "alfaepoetina",
    concentration: "",
    form: "solução",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "alfataliglicerase",
    concentration: "",
    form: "solução",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "alfavelaglicerase",
    concentration: "",
    form: "solução",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "(6.000.000 UI)",
    concentration: "000.000 UI",
    form: "injetável",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "betainterferona 1a",
    concentration: "000.000 UI",
    form: "injetável",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "(12.000.000 UI)",
    concentration: "000.000 UI",
    form: "injetável",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "betainterferona 1b",
    concentration: "",
    form: "solução",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "(0,03%)",
    concentration: "0,03%",
    form: "",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "umeclidínio +",
    concentration: "62,5 mcg",
    form: "",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "pó inalatório",
    concentration: "",
    form: "pó",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "bromidrato de",
    concentration: "",
    form: "solução",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "fenoterol",
    concentration: "",
    form: "aerossol",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "budesonida",
    concentration: "200 mcg",
    form: "aerossol",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "calcipotriol",
    concentration: "",
    form: "pomada",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "certolizumabe pegol",
    concentration: "200 mg",
    form: "",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "ciclosporina",
    concentration: "10 mg",
    form: "cápsula",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "ciclosporina",
    concentration: "25 mg",
    form: "cápsula",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "ciclosporina",
    concentration: "50 mg",
    form: "cápsula",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "ciclosporina",
    concentration: "100 mg/mL",
    form: "solução",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "cloridrato de",
    concentration: "5 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "donepezila",
    concentration: "10 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "cloridrato de",
    concentration: "",
    form: "solução",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "cloridrato de",
    concentration: "10 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "(1.000.000 UI)",
    concentration: "000.000 UI",
    form: "",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "(2.000.000 UI)",
    concentration: "000.000 UI",
    form: "",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "danazol",
    concentration: "100 mg",
    form: "cápsula",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "danazol",
    concentration: "200 mg",
    form: "cápsula",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "dicloridrato de",
    concentration: "",
    form: "comprimido",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "mg/37,5 mg +",
    concentration: "37,5 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "elexacaftor/",
    concentration: "75 mg",
    form: "",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "+ ivacaftor",
    concentration: "100 mg",
    form: "",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "mg/75 mg + 150",
    concentration: "75 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "etanercepte",
    concentration: "25 mg",
    form: "",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "etanercepte",
    concentration: "50 mg",
    form: "",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "everolimo",
    concentration: "0,5 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "everolimo",
    concentration: "1 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "fosfato de codeína",
    concentration: "60 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "dimetila",
    concentration: "",
    form: "cápsula",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "imiglucerase",
    concentration: "",
    form: "solução",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "imunoglobulina",
    concentration: "",
    form: "solução",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "insulina análoga de",
    concentration: "",
    form: "injetável",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "ação prolongada",
    concentration: "",
    form: "solução",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "ação rápida",
    concentration: "",
    form: "injetável",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "(0,005%)",
    concentration: "0,005%",
    form: "",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "metotrexato",
    concentration: "25 mg/mL",
    form: "",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "metotrexato",
    concentration: "2,5 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "omalizumabe",
    concentration: "",
    form: "injetável",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "onasemnogeno",
    concentration: "",
    form: "suspensão",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "abeparvoveque",
    concentration: "",
    form: "injetável",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "pamoato de",
    concentration: "",
    form: "injetável",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "pasireotida",
    concentration: "",
    form: "pó",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "propionato de",
    concentration: "0,5 mg/g",
    form: "creme",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "clobetasol",
    concentration: "0,5 mg/g",
    form: "solução",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "sacarato de",
    concentration: "",
    form: "solução",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "hidróxido férrico",
    concentration: "",
    form: "injetável",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "somatropina",
    concentration: "4 UI",
    form: "solução",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "somatropina",
    concentration: "24 UI",
    form: "solução",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "sulfassalazina",
    concentration: "500 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "tartarato de",
    concentration: "",
    form: "solução",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "(0,004%)",
    concentration: "0,004%",
    form: "",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "hipoclorito de sódio",
    concentration: "10 mg/mL",
    form: "solução",
    component: "Básico",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "hipoclorito de sódio",
    concentration: "25 mg/mL",
    form: "solução",
    component: "Estratégico",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "ácido zoledrônico 0,05 mg/",
    concentration: "0,05 mg",
    form: "",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "mL solução para infusão",
    concentration: "",
    form: "solução",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "alfa-agalsidase 1 mg/mL",
    concentration: "1 mg/mL",
    form: "",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "alfacerliponase 30 mg/mL",
    concentration: "30 mg/mL",
    form: "",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "solução para infusão",
    concentration: "",
    form: "solução",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "alfaepoetina 1.000 UI pó",
    concentration: "1.000 UI",
    form: "pó",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "para solução injetável",
    concentration: "",
    form: "solução",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "alfaepoetina 1.000 UI",
    concentration: "1.000 UI",
    form: "",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "alfaepoetina 10.000 UI pó",
    concentration: "10.000 UI",
    form: "pó",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "alfaepoetina 10.000 UI",
    concentration: "10.000 UI",
    form: "",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "alfaepoetina 2.000 UI pó",
    concentration: "2.000 UI",
    form: "pó",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "alfaepoetina 2.000 UI",
    concentration: "2.000 UI",
    form: "",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "alfaepoetina 3.000 UI pó",
    concentration: "3.000 UI",
    form: "pó",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "alfaepoetina 3.000 UI",
    concentration: "3.000 UI",
    form: "",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "alfaepoetina 4.000 UI pó",
    concentration: "4.000 UI",
    form: "pó",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "alfaepoetina 4.000 UI",
    concentration: "4.000 UI",
    form: "",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "beta-agalsidase 35 mg pó",
    concentration: "35 mg",
    form: "pó",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "ciclosporina 100 mg cápsula",
    concentration: "100 mg",
    form: "cápsula",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "ciclosporina 100 mg/mL",
    concentration: "100 mg/mL",
    form: "",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "solução oral",
    concentration: "",
    form: "solução",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "ciclosporina 25 mg cápsula",
    concentration: "25 mg",
    form: "cápsula",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "ciclosporina 50 mg cápsula",
    concentration: "50 mg",
    form: "cápsula",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "citrato de sildenafila 20 mg",
    concentration: "20 mg",
    form: "",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "comprimido e bosentana",
    concentration: "",
    form: "comprimido",
    component: "Especializado",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "cladribina 10 mg",
    concentration: "10 mg",
    form: "",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "mg (2.000.000 UI) pó para",
    concentration: "000.000 UI",
    form: "pó",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "solução para infusão ou",
    concentration: "",
    form: "solução",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "mg (1.000.000 UI) pó para",
    concentration: "000.000 UI",
    form: "pó",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "Tezacaftor 50 mg/Ivacaftor",
    concentration: "50 mg",
    form: "",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "Tezacaftor 25 mg/Ivacaftor",
    concentration: "25 mg",
    form: "",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "injetável de liberação",
    concentration: "",
    form: "injetável",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "hidroxiureia 100 mg",
    concentration: "100 mg",
    form: "",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "hidroxiureia 500 mg cápsula",
    concentration: "500 mg",
    form: "cápsula",
    component: "Especializado",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "mepolizumabe 100 mg/mL",
    concentration: "100 mg/mL",
    form: "",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "mepolizumabe 40 mg/0,4 mL",
    concentration: "40 mg",
    form: "",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "omalizumabe 150 mg/mL",
    concentration: "150 mg/mL",
    form: "",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "gv/mL suspensão para",
    concentration: "",
    form: "suspensão",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "solução para diluição para",
    concentration: "",
    form: "solução",
    component: "Especializado",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "risdiplam 0,75 mg/mL pó",
    concentration: "0,75 mg/mL",
    form: "pó",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "para solução oral",
    concentration: "",
    form: "solução",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "rituximabe 10 mg/mL",
    concentration: "10 mg/mL",
    form: "",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "rivastigmina 1,5 mg cápsula",
    concentration: "1,5 mg",
    form: "cápsula",
    component: "Especializado",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "rivastigmina 18 mg adesivo",
    concentration: "18 mg",
    form: "",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "rivastigmina 3 mg cápsula",
    concentration: "3 mg",
    form: "cápsula",
    component: "Especializado",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "rivastigmina 4,5 mg cápsula",
    concentration: "4,5 mg",
    form: "cápsula",
    component: "Especializado",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "rivastigmina 6 mg cápsula",
    concentration: "6 mg",
    form: "cápsula",
    component: "Especializado",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "rivastigmina 9 mg adesivo",
    concentration: "9 mg",
    form: "",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "romosozumabe 90 mg/mL",
    concentration: "90 mg/mL",
    form: "",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "tafamidis 61 mg cápsula",
    concentration: "61 mg",
    form: "cápsula",
    component: "Especializado",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "ustequinumabe 130 mg",
    concentration: "130 mg",
    form: "",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "ustequinumabe 45 mg/0,5",
    concentration: "45 mg",
    form: "",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "mL solução injetável",
    concentration: "",
    form: "solução",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "estradiol (25 mg + 5 mg) e algestona",
    concentration: "25 mg",
    form: "",
    component: "Básico",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "de estradiol 10 mg/mL",
    concentration: "10 mg/mL",
    form: "",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "ferripolimaltose 50 mg/",
    concentration: "50 mg",
    form: "",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "mL solução oral",
    concentration: "",
    form: "solução",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "ferripolimaltose 100 mg",
    concentration: "100 mg",
    form: "",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "comprimido mastigável",
    concentration: "",
    form: "comprimido",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "ferripolimaltose 10 mg/",
    concentration: "10 mg",
    form: "",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "mL xarope",
    concentration: "",
    form: "xarope",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "hidróxido de alumínio 60",
    concentration: "60 mg/mL",
    form: "suspensão",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "mg/mL suspensão oral",
    concentration: "",
    form: "suspensão",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "pó liofilizado para solução",
    concentration: "",
    form: "solução",
    component: "Estratégico",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "darunavir 800 mg,",
    concentration: "800 mg",
    form: "",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "dolutegravir sódico 50 mg",
    concentration: "50 mg",
    form: "",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "+ lamivudina 300 mg,",
    concentration: "300 mg",
    form: "",
    component: "Estratégico",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "dolutegravir sódico 5 mg,",
    concentration: "5 mg",
    form: "",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "comprimidos dispersíveis",
    concentration: "",
    form: "comprimido",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "nirmatrelvir 150 mg +",
    concentration: "150 mg",
    form: "",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "ritonavir 100 mg",
    concentration: "100 mg",
    form: "",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "pretomanida 200 mg",
    concentration: "200 mg",
    form: "",
    component: "Estratégico",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "raltegravir potássico",
    concentration: "",
    form: "granulado",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "rifapentina 300 mg +",
    concentration: "300 mg",
    form: "",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "Isoniazida 300 mg",
    concentration: "300 mg",
    form: "",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "cápsula dura, 100 mg",
    concentration: "100 mg",
    form: "cápsula",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "injetável, 200 mg",
    concentration: "200 mg",
    form: "injetável",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "voriconazol 200 mg,",
    concentration: "200 mg",
    form: "",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "voriconazol 200 mg, pó",
    concentration: "200 mg",
    form: "pó",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "liófilizado para injetável",
    concentration: "",
    form: "injetável",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "mg/mL solução",
    concentration: "",
    form: "solução",
    component: "Especializado",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "mcg/mL solução",
    concentration: "",
    form: "solução",
    component: "Especializado",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "mcg cápsula",
    concentration: "",
    form: "cápsula",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "cloridrato de",
    concentration: "300 mg",
    form: "solução",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "clindamicina 300 mg",
    concentration: "300 mg",
    form: "comprimido",
    component: "Estratégico",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "cápsula",
    concentration: "300 mg/mL",
    form: "cápsula",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "dicloridrato de quinina",
    concentration: "300 mg",
    form: "solução",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "injetável",
    concentration: "300 mg",
    form: "solução",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "fosfato de clindamicina",
    concentration: "300 mg",
    form: "solução",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "injetável",
    concentration: "300 mg/mL",
    form: "solução",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "rifampicina 20 mg/mL",
    concentration: "20 mg/mL",
    form: "",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "(2%) suspensão oral",
    concentration: "2%",
    form: "suspensão",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "mL, sulfato de quinina comprimido 500 mg e dicloridrato",
    concentration: "500 mg",
    form: "comprimido",
    component: "Estratégico",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "para solução",
    concentration: "",
    form: "solução",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "olamina 25 mg",
    concentration: "25 mg",
    form: "",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "olamina 50 mg",
    concentration: "50 mg",
    form: "",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "mL solução",
    concentration: "",
    form: "solução",
    component: "",
    atc: "",
    source: "RENAME 2024"
  },
  {
    name: "Cabergolina",
    concentration: "0,5 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Lanreotida",
    concentration: "60 mg",
    form: "injetável",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Lanreotida",
    concentration: "90 mg",
    form: "injetável",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Lanreotida",
    concentration: "120 mg",
    form: "injetável",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Octreotida",
    concentration: "0,1 mg/ml",
    form: "injetável",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Octreotida LAR",
    concentration: "10 mg/ml",
    form: "injetável",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Octreotida LAR",
    concentration: "20 mg/ml",
    form: "injetável",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Octreotida LAR",
    concentration: "30 mg/ml",
    form: "injetável",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Alfaepoetina",
    concentration: "1.000 UI",
    form: "injetável",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Alfaepoetina",
    concentration: "2.000 UI",
    form: "injetável",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Alfaepoetina",
    concentration: "3.000 UI",
    form: "injetável",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Alfaepoetina",
    concentration: "4.000 UI",
    form: "injetável",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Alfaepoetina",
    concentration: "10.000 UI",
    form: "injetável",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Hidróxido férrico",
    concentration: "100 mg",
    form: "injetável",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Ciclofosfamida",
    concentration: "50 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Ciclosporina",
    concentration: "25 mg",
    form: "cápsula",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Ciclosporina",
    concentration: "50 mg",
    form: "cápsula",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Ciclosporina",
    concentration: "100 mg",
    form: "cápsula",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Ciclosporina",
    concentration: "100 mg/ml",
    form: "solução",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Imunoglobulina Humana",
    concentration: "1,0 g",
    form: "injetável",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Imunoglobulina Humana",
    concentration: "2,5 g",
    form: "injetável",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Imunoglobulina Humana",
    concentration: "5,0 g",
    form: "injetável",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Danazol",
    concentration: "100 mg",
    form: "cápsula",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Danazol",
    concentration: "200 mg",
    form: "cápsula",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Abatacepte",
    concentration: "250 mg",
    form: "injetável",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Adalimumabe",
    concentration: "40 mg",
    form: "injetável",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Etanercepte",
    concentration: "25 mg",
    form: "injetável",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Etanercepte",
    concentration: "50 mg",
    form: "injetável",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Infliximabe",
    concentration: "10 mg/ml",
    form: "injetável",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Leflunomida",
    concentration: "20 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Metotrexato",
    concentration: "2,5 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Metotrexato",
    concentration: "25 mg/ml",
    form: "injetável",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Naproxeno",
    concentration: "250 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Naproxeno",
    concentration: "500 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Sulfassalazina",
    concentration: "500 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Tocilizumabe",
    concentration: "20 mg/ml",
    form: "injetável",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Ciclosporina",
    concentration: "100 mg/mL",
    form: "solução",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Golimumabe",
    concentration: "50 mg",
    form: "injetável",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Infliximabe",
    concentration: "10 mg/mL",
    form: "injetável",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Secuquinumabe",
    concentration: "150 mg/ml",
    form: "solução",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Tofacitinibe",
    concentration: "5 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Abatacepte",
    concentration: "125 mg",
    form: "injetável",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Azatioprina",
    concentration: "50 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Baricitinibe",
    concentration: "2 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Baricitinibe",
    concentration: "4 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Certolizumabe pegol",
    concentration: "200 mg/ml",
    form: "injetável",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Hidroxicloroquina",
    concentration: "400 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Metotrexato",
    concentration: "25 mg/mL",
    form: "injetável",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Rituximabe",
    concentration: "500 mg",
    form: "injetável",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Upadacitinibe",
    concentration: "5 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Nusinersena",
    concentration: "2,4 mg/ml",
    form: "injetável",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Risdiplam",
    concentration: "0,75 mg/ml",
    form: "solução",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Budesonida",
    concentration: "200 mcg",
    form: "cápsula",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Budesonida",
    concentration: "400 mcg",
    form: "cápsula",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Fenoterol",
    concentration: "100 mcg",
    form: "aerossol",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Formoterol",
    concentration: "12 mcg",
    form: "cápsula",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Formoterol",
    concentration: "6mcg",
    form: "cápsula",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Salmeterol",
    concentration: "50 mcg",
    form: "aerossol",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Ácido Ursodesoxicólico",
    concentration: "50 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Ácido Ursodesoxicólico",
    concentration: "150 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Ácido Ursodesoxicólico",
    concentration: "300 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Risperidona",
    concentration: "1 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Risperidona",
    concentration: "2 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Risperidona",
    concentration: "3 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Risperidona",
    concentration: "1 mg/ml",
    form: "solução",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Biotina",
    concentration: "2,5 mg",
    form: "cápsula",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Somatropina",
    concentration: "4 UI",
    form: "injetável",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Somatropina",
    concentration: "12 UI",
    form: "injetável",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Somatropina",
    concentration: "16 UI",
    form: "injetável",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Desmopressina",
    concentration: "0,1 mg/ml",
    form: "",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Desmopressina",
    concentration: "0,1 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Desmopressina",
    concentration: "0,2 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Insulina Determir",
    concentration: "100 UI/ml",
    form: "",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Insulina Glargina",
    concentration: "100 UI/ml",
    form: "",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Dapaglifozina",
    concentration: "10mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Ácido nicotínico",
    concentration: "500 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Atorvastatina",
    concentration: "10 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Atorvastatina",
    concentration: "20 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Atorvastatina",
    concentration: "40 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Atorvastatina",
    concentration: "80 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Ciprofibrato",
    concentration: "100 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Fenofibrato",
    concentration: "200 mg",
    form: "cápsula",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Fenofibrato",
    concentration: "250 mg",
    form: "cápsula",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Genfibrozila",
    concentration: "600 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Genfibrozila",
    concentration: "900 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Pravastatina",
    concentration: "20 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Calcitriol",
    concentration: "0,25 mcg",
    form: "cápsula",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Cinacalcete",
    concentration: "30 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Cinacalcete",
    concentration: "60 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Desferroxamina",
    concentration: "500 mg",
    form: "injetável",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Paricalcitol",
    concentration: "5,0 mcg",
    form: "injetável",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Sevelâmer",
    concentration: "800 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Donepezila",
    concentration: "5 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Donepezila",
    concentration: "10 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Galantamina",
    concentration: "8 mg",
    form: "cápsula",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Galantamina",
    concentration: "16 mg",
    form: "cápsula",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Galantamina",
    concentration: "24 mg",
    form: "cápsula",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Memantina",
    concentration: "10 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Rivastigmina",
    concentration: "1,5 mg",
    form: "cápsula",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Rivastigmina",
    concentration: "2,0 mg/mL",
    form: "solução",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Rivastigmina",
    concentration: "3 mg",
    form: "cápsula",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Rivastigmina",
    concentration: "4,5 mg",
    form: "cápsula",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Rivastigmina",
    concentration: "6 mg",
    form: "cápsula",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Rivastigmina",
    concentration: "9 mg",
    form: "",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Rivastigmina",
    concentration: "18 mg",
    form: "",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Certolizumabe pegol",
    concentration: "200 mg",
    form: "",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Mesalazina",
    concentration: "500 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Mesalazina",
    concentration: "800 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Metilprednisolona",
    concentration: "500 mg",
    form: "injetável",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Alfagalsidade",
    concentration: "1 mg/ml",
    form: "injetável",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Miglustate",
    concentration: "100 mg",
    form: "cápsula",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Ácido zoledrônico",
    concentration: "5mg",
    form: "",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Calcitonina",
    concentration: "200 UI/dose",
    form: "spray",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Risedronato",
    concentration: "35 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Amantadina",
    concentration: "100 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Bromocriptina",
    concentration: "2,5 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Clozapina",
    concentration: "25 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Clozapina",
    concentration: "100 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Entacapona",
    concentration: "200 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Pramipexol",
    concentration: "0,125 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Pramipexol",
    concentration: "0,25 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Pramipexol",
    concentration: "1 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Rasagilina",
    concentration: "1 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Selegilina",
    concentration: "5 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Triexifenidil",
    concentration: "5 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Penicilamina",
    concentration: "250 mg",
    form: "cápsula",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Trientina",
    concentration: "250 mg",
    form: "cápsula",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Dapsona",
    concentration: "100 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Hidroxiureia",
    concentration: "100 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Hidroxiureia",
    concentration: "500 mg",
    form: "cápsula",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Filgrastim",
    concentration: "300 mcg",
    form: "injetável",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Codeína",
    concentration: "3 mg/ml",
    form: "solução",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Codeína",
    concentration: "30 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Codeína",
    concentration: "30 mg/ml",
    form: "",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Gabapentina",
    concentration: "300 mg",
    form: "cápsula",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Gabapentina",
    concentration: "400 mg",
    form: "cápsula",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Metadona",
    concentration: "5 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Metadona",
    concentration: "10 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Metadona",
    concentration: "10 mg/ml",
    form: "injetável",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Morfina",
    concentration: "10 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Morfina",
    concentration: "10 mg/ml",
    form: "",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Morfina",
    concentration: "30 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Morfina de liberação controlada",
    concentration: "100 mg",
    form: "cápsula",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Morfina de liberação controlada",
    concentration: "30 mg",
    form: "cápsula",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Gosserrelina",
    concentration: "3,60 mg",
    form: "injetável",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Gosserrelina",
    concentration: "10,80 mg",
    form: "injetável",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Leuprorrelina",
    concentration: "3,75 mg",
    form: "injetável",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Leuprorrelina",
    concentration: "11,25 mg",
    form: "injetável",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Triptorrelina",
    concentration: "3,75 mg",
    form: "injetável",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Triptorrelina",
    concentration: "11,25 mg",
    form: "injetável",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Clobazam",
    concentration: "10 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Clobazam",
    concentration: "20 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Clonazepam",
    concentration: "0,5 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Clonazepam",
    concentration: "2 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Etossuximida",
    concentration: "50 mg/ml",
    form: "",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Lamotrigina",
    concentration: "25 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Lamotrigina",
    concentration: "50 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Lamotrigina",
    concentration: "100 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Levetiracetam",
    concentration: "250mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Levetiracetam",
    concentration: "500 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Levetiracetam",
    concentration: "750mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Levetiracetam",
    concentration: "1000 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Levetiracetam",
    concentration: "100mg/ml",
    form: "solução",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Primidona",
    concentration: "100 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Primidona",
    concentration: "250 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Topiramato",
    concentration: "25 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Topiramato",
    concentration: "50 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Topiramato",
    concentration: "100 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Vigabatrina",
    concentration: "500 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Riluzol",
    concentration: "50 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Cladribina",
    concentration: "10mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Fingolimode",
    concentration: "0,5 mg",
    form: "cápsula",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Fumarato de dimetila",
    concentration: "120 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Fumarato de dimetila",
    concentration: "240 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Glatirâmer",
    concentration: "40 mg",
    form: "injetável",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Natalizumabe",
    concentration: "300 mg",
    form: "",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Teriflunomida",
    concentration: "14 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Sildenafila",
    concentration: "25 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Sildenafila",
    concentration: "50 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Olanzapina",
    concentration: "5 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Olanzapina",
    concentration: "10 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Quetiapina",
    concentration: "25 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Quetiapina",
    concentration: "100 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Quetiapina",
    concentration: "200 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Quetiapina",
    concentration: "300 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Ziprasidona",
    concentration: "40 mg",
    form: "cápsula",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Ziprasidona",
    concentration: "80 mg",
    form: "cápsula",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Dapagliflozina",
    concentration: "10 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Alfadornase",
    concentration: "1 mg/ml",
    form: "solução",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Elexacaftor",
    concentration: "50 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Elexacaftor",
    concentration: "100 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Ivacaftor",
    concentration: "150 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Pancreatina",
    concentration: "10.000 UI",
    form: "cápsula",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Pancreatina",
    concentration: "25.000 UI",
    form: "cápsula",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Tobramicina",
    concentration: "300 mg",
    form: "solução",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Dieta Infantil em pó de aminoácidos",
    concentration: "100%",
    form: "pó",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Fórmula Infantil em pó de aminoácidos",
    concentration: "100%",
    form: "pó",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Módulo de Carboidrato",
    concentration: "100%",
    form: "pó",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Acetazolamida",
    concentration: "250 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Bimatoprosta solução oftálmica a",
    concentration: "0,03%",
    form: "solução",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Brimonidina solução oftálmica a",
    concentration: "0,2%",
    form: "solução",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Brinzolamida suspensão oftálmica a",
    concentration: "1%",
    form: "suspensão",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Dorzolamida solução oftálmica a",
    concentration: "2%",
    form: "solução",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Latanoprosta solução oftálmica a",
    concentration: "0,005%",
    form: "solução",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Pilocarpina solução oftálmica a",
    concentration: "2%",
    form: "solução",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Timolol solução oftálmica a",
    concentration: "0,5%",
    form: "solução",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Travoprosta solução oftálmica a",
    concentration: "0,004%",
    form: "solução",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Eculizumabe",
    concentration: "10 mg/mL",
    form: "solução",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Ambrisentana",
    concentration: "5 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Ambrisentana",
    concentration: "10 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Bosentana",
    concentration: "62,5 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Bosentana",
    concentration: "125 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Iloprosta",
    concentration: "10 mcg/ml",
    form: "solução",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Sildenafila",
    concentration: "20 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Selexipague",
    concentration: "200 mcg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Selexipague",
    concentration: "400 mcg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Selexipague",
    concentration: "600 mcg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Selexipague",
    concentration: "800 mcg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Selexipague",
    concentration: "1.000 mcg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Selexipague",
    concentration: "1.200 mcg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Selexipague",
    concentration: "1.400 mcg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Selexipague",
    concentration: "1.600 mcg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Acitretina",
    concentration: "10 mg",
    form: "cápsula",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Acitretina",
    concentration: "25 mg",
    form: "cápsula",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Everolimo",
    concentration: "0,5 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Everolimo",
    concentration: "0,75 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Everolimo",
    concentration: "1,0 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Micofenolato de mofetila",
    concentration: "500 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Micofenolato de sodio",
    concentration: "180 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Micofenolato de sodio",
    concentration: "360 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Tacrolimo",
    concentration: "1 mg",
    form: "cápsula",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Tacrolimo",
    concentration: "5 mg",
    form: "cápsula",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Micofenolato de sódio",
    concentration: "180 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Micofenolato de sódio",
    concentration: "360 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Sirolimo",
    concentration: "1 mg",
    form: "",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Sirolimo",
    concentration: "2 mg",
    form: "",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Everolimo",
    concentration: "1 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Ácido Ursodesoxicolíco",
    concentration: "150 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Everolimo",
    concentration: "0,50 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Micofenolato de Mofetila",
    concentration: "500 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Micofenolato de Sódio",
    concentration: "180 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Sacubitril",
    concentration: "24 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Sacubitril",
    concentration: "49 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Sacubitril",
    concentration: "97 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Isotretinoina",
    concentration: "10 mg",
    form: "cápsula",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Isotretinoina",
    concentration: "20 mg",
    form: "cápsula",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Piridostigmina",
    concentration: "60 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Isoconazol",
    concentration: "10 mg/g",
    form: "creme",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Laronidase",
    concentration: "0,58 mg/ml",
    form: "injetável",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Idursulfase alfa",
    concentration: "2 mg/ml",
    form: "injetável",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Alfaelosulfase",
    concentration: "1 mg/ml",
    form: "solução",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Galsulfase",
    concentration: "1 mg/ml",
    form: "solução",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Alfavestronidase",
    concentration: "10 mg",
    form: "solução",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Ácido zoledrônico",
    concentration: "0,05 mg/ml",
    form: "",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Pamidronato dissódico",
    concentration: "60 mg",
    form: "injetável",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Raloxifeno",
    concentration: "60 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Romosozumabe",
    concentration: "90 mg/ml",
    form: "solução",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Tafamidis meglumina",
    concentration: "20 mg",
    form: "cápsula",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Clopidogrel",
    concentration: "75 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Ticlopidina",
    concentration: "250 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Enoxaparina sódica",
    concentration: "40mg",
    form: "solução",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Enoxaparina sódica",
    concentration: "60mg",
    form: "solução",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Ganciclovir",
    concentration: "250 mg",
    form: "cápsula",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Ganciclovir",
    concentration: "500 mg",
    form: "injetável",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Calcipotriol",
    concentration: "50 mcg/g",
    form: "pomada",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Clobetasol",
    concentration: "0,5 mg/g",
    form: "solução",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Risanquizumabe",
    concentration: "75 mg",
    form: "solução",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Ustequinumabe",
    concentration: "45 mg",
    form: "solução",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Leuprorrelina",
    concentration: "45 mg",
    form: "injetável",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Triptorrelina",
    concentration: "22,5 mg",
    form: "injetável",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Eltrombopague",
    concentration: "25 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Eltrombopague",
    concentration: "50 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Imunoglobulina humana",
    concentration: "1,0 g",
    form: "injetável",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Imunoglobulina humana",
    concentration: "2,5 g",
    form: "injetável",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Imunoglobulina humana",
    concentration: "5,0 g",
    form: "injetável",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Burosumabe",
    concentration: "10 mg/ml",
    form: "injetável",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Burosumabe",
    concentration: "20 mg/ml",
    form: "injetável",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Burosumabe",
    concentration: "30 mg/ml",
    form: "injetável",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Mesalazina",
    concentration: "1 g",
    form: "",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Mesalazina",
    concentration: "1000 mg",
    form: "",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Mesalazina",
    concentration: "2 g",
    form: "",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Mesalazina",
    concentration: "250 mg",
    form: "",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Vedolizumabe",
    concentration: "300 mg",
    form: "injetável",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Eltrombopague olamina",
    concentration: "25 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Eltrombopague olamina",
    concentration: "50 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Ciproterona",
    concentration: "50 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Deferasirox",
    concentration: "125 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Deferasirox",
    concentration: "250 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Deferasirox",
    concentration: "500 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Deferiprona",
    concentration: "500 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Metilfenidato",
    concentration: "10 mg",
    form: "comprimido",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
  {
    name: "Amoxicilina",
    concentration: "500 mg",
    form: "",
    component: "",
    atc: "",
    source: "Lista RS 2025"
  },
];

// Função de busca por nome (case insensitive)
export function searchMedications(query: string): Medication[] {
  const normalizedQuery = query.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  return medications.filter(m => {
    const normalizedName = m.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    return normalizedName.includes(normalizedQuery);
  });
}

// Função para obter medicamentos por forma farmacêutica
export function getMedicationsByForm(form: string): Medication[] {
  return medications.filter(m => m.form.toLowerCase() === form.toLowerCase());
}

// Função para obter medicamentos por componente
export function getMedicationsByComponent(component: string): Medication[] {
  return medications.filter(m => m.component === component);
}

// Formas farmacêuticas disponíveis
export const medicationForms = [
  'comprimido',
  'cápsula',
  'solução',
  'injetável',
  'suspensão',
  'pomada',
  'creme',
  'gel',
  'xarope',
  'gotas',
  'aerossol',
  'spray',
  'pó',
  'granulado'
];

// Componentes disponíveis
export const medicationComponents = [
  'Básico',
  'Especializado',
  'Estratégico'
];
