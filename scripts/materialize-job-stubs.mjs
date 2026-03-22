import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const jobsPath = path.join(rootDir, 'data', 'jobs.json');
const stubsPath = path.join(rootDir, 'data', 'generated-job-stubs.json');
const taxonomyPath = path.join(rootDir, 'data', 'ksco-taxonomy.json');

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function flattenDetailIds(taxonomyData) {
  return (taxonomyData.majors || []).flatMap((major) =>
    (major.mids || []).flatMap((mid) =>
      (mid.subs || []).flatMap((sub) => (sub.details || []).map((detail) => detail.id))
    )
  );
}

function materializeProfile(stub, config) {
  const titles = {
    en: stub.content.en.title,
    ko: stub.content.ko.title,
    es: stub.content.es.title
  };
  const family = FAMILY_BUILDERS[config.family];

  if (!family) {
    throw new Error(`Missing family builder for ${config.family}`);
  }

  const generated = family(titles, config);

  return {
    id: stub.id,
    category: config.category,
    automationRisk: config.automationRisk,
    aiRole: config.aiRole,
    classification: stub.classification,
    currentReplacementUrl: config.currentReplacementUrl,
    marketSignals: buildMarketSignals(config, stub.classification),
    degree: {
      status: config.degreeStatus,
      level: config.degreeLevel
    },
    aiEvidence: {
      rationale: generated.rationale,
      automatableNow: generated.automatableNow,
      humanEdge: generated.humanEdge,
      references: config.references
    },
    content: {
      en: {
        title: titles.en,
        summary: generated.summary.en,
        tasks: generated.tasks.en,
        skills: generated.skills.en,
        path: generated.path.en,
        educationPathways: buildEducationPathways('en', config, stub.classification),
        degreeNote: buildDegreeNote('en', config),
        aiNow: generated.aiNow.en,
        aiFuture: generated.aiFuture.en,
        services: generated.services.en
      },
      ko: {
        title: titles.ko,
        summary: generated.summary.ko,
        tasks: generated.tasks.ko,
        skills: generated.skills.ko,
        path: generated.path.ko,
        educationPathways: buildEducationPathways('ko', config, stub.classification),
        degreeNote: buildDegreeNote('ko', config),
        aiNow: generated.aiNow.ko,
        aiFuture: generated.aiFuture.ko,
        services: generated.services.ko
      },
      es: {
        title: titles.es,
        summary: generated.summary.es,
        tasks: generated.tasks.es,
        skills: generated.skills.es,
        path: generated.path.es,
        educationPathways: buildEducationPathways('es', config, stub.classification),
        degreeNote: buildDegreeNote('es', config),
        aiNow: generated.aiNow.es,
        aiFuture: generated.aiFuture.es,
        services: generated.services.es
      }
    }
  };
}

function buildDegreeNote(locale, config) {
  const degreeFamilyAliases = {
    management: 'management',
    care: 'healthcare',
    design: 'creative',
    engineering: 'technical',
    education: 'education',
    language: 'language',
    business: 'business',
    operations: 'clerical',
    support: 'service',
    service: 'service',
    security: 'service',
    sales: 'sales',
    agriculture: 'agriculture',
    trades: 'trades',
    logistics: 'machine',
    manufacturing: 'machine',
    labor: 'labor'
  };

  const levelLabels = {
    en: {
      none: 'no university degree',
      bachelor: 'a bachelor-level qualification',
      master: 'a master-level qualification',
      doctorate: 'a doctorate-level qualification'
    },
    ko: {
      none: '대학 학위',
      bachelor: '학사 수준 학위',
      master: '석사 수준 학위',
      doctorate: '박사 수준 학위'
    },
    es: {
      none: 'un titulo universitario',
      bachelor: 'una titulacion de nivel licenciatura',
      master: 'una titulacion de nivel maestria',
      doctorate: 'una titulacion de nivel doctorado'
    }
  };

  const marketFocus = {
    en: {
      management: 'employers usually weigh delivery record, business judgment, and leadership evidence heavily',
      healthcare: 'formal education, licensing, and supervised practice matter more than portfolio alone',
      creative: 'portfolio strength and shipped work can offset formal study in parts of the market',
      technical: 'project proof and system ownership can offset some formal requirements outside the most selective hiring tracks',
      education: 'certification, subject depth, and classroom experience are usually part of the hiring gate',
      language: 'domain expertise and editorial quality can matter as much as formal language study',
      business: 'credentials help, but employers still screen hard for judgment, compliance awareness, and execution',
      clerical: 'practical accuracy, reliability, and software fluency matter more than campus prestige',
      service: 'hands-on skill, service judgment, safety, and experience often matter more than university study',
      sales: 'results, trust, and pipeline performance often matter more than formal education',
      agriculture: 'field experience, safety, and equipment knowledge usually outweigh university study',
      trades: 'apprenticeship, licensing, and field hours matter more than a four-year degree',
      machine: 'safety discipline, shift reliability, and equipment familiarity matter more than university study',
      labor: 'reliability, stamina, safety, and site readiness matter more than formal degrees'
    },
    ko: {
      management: '고용주는 학력보다 성과 기록, 비즈니스 판단, 리더십 경험을 함께 봅니다',
      healthcare: '정규 교육, 면허, 감독하 실습이 포트폴리오보다 훨씬 중요합니다',
      creative: '시장의 일부에서는 강한 포트폴리오와 실제 산출물이 학위를 어느 정도 보완할 수 있습니다',
      technical: '가장 엄격한 채용 라인을 제외하면 프로젝트 증거와 시스템 운영 경험이 학력 일부를 보완할 수 있습니다',
      education: '교원 자격, 교과 전문성, 수업 경험이 보통 채용의 핵심 조건입니다',
      language: '형식적인 언어 전공 못지않게 도메인 지식과 편집 품질이 중요합니다',
      business: '학위와 자격은 도움이 되지만, 실제로는 판단력과 규정 이해, 실행력이 강하게 평가됩니다',
      clerical: '학교 이름보다 정확성, 신뢰성, 소프트웨어 숙련도가 더 중요하게 평가됩니다',
      service: '현장 서비스 역량, 판단, 안전, 경험이 대학 학위보다 더 중요할 때가 많습니다',
      sales: '대학보다 실적, 신뢰 형성, 파이프라인 운영 능력이 더 중요하게 평가되는 경우가 많습니다',
      agriculture: '현장 경험, 안전, 장비 이해가 대학 학위보다 더 중요합니다',
      trades: '도제, 자격증, 현장 시간이 4년제 학위보다 훨씬 중요합니다',
      machine: '안전 의식, 근무 신뢰도, 장비 숙련도가 대학 학위보다 더 중요합니다',
      labor: '신뢰성, 체력, 안전 의식, 현장 적응력이 학위보다 더 중요합니다'
    },
    es: {
      management: 'las empresas suelen valorar mucho el historial de entrega, el criterio de negocio y la evidencia de liderazgo',
      healthcare: 'la formacion formal, la licencia y la practica supervisada pesan mas que un portafolio',
      creative: 'un portafolio fuerte y trabajo publicado pueden compensar parte del estudio formal en algunas partes del mercado',
      technical: 'la prueba de proyectos y la responsabilidad sobre sistemas pueden compensar parte de la formacion formal fuera de los filtros mas selectivos',
      education: 'la certificacion, el dominio de la materia y la experiencia docente suelen formar parte del filtro de contratacion',
      language: 'la experiencia de dominio y la calidad editorial pueden pesar tanto como el estudio formal del idioma',
      business: 'las credenciales ayudan, pero las empresas siguen evaluando con fuerza el criterio, el cumplimiento y la ejecucion',
      clerical: 'la precision practica, la fiabilidad y la soltura con software suelen importar mas que el prestigio academico',
      service: 'la habilidad practica, el criterio de servicio, la seguridad y la experiencia suelen pesar mas que la universidad',
      sales: 'los resultados, la confianza y el rendimiento comercial suelen pesar mas que la educacion formal',
      agriculture: 'la experiencia de campo, la seguridad y el conocimiento de equipos suelen pesar mas que la universidad',
      trades: 'el aprendizaje, la licencia y las horas de campo pesan mas que un titulo de cuatro anos',
      machine: 'la disciplina de seguridad, la fiabilidad en turnos y la familiaridad con equipos pesan mas que la universidad',
      labor: 'la fiabilidad, la resistencia, la seguridad y la preparacion para el sitio pesan mas que los titulos formales'
    }
  };

  const focusKey = degreeFamilyAliases[config.degreeFamily];
  const familyFocus = marketFocus[locale][focusKey || 'business'];

  if (locale === 'en') {
    if (config.degreeStatus === 'required') {
      return `This role is usually degree-gated in the market. ${capitalize(levelLabels.en[config.degreeLevel])} is the common baseline, and ${familyFocus}.`;
    }

    if (config.degreeStatus === 'preferred') {
      return `Employers often prefer ${levelLabels.en[config.degreeLevel]}, but ${familyFocus}.`;
    }

    return `This role is not usually degree-gated. In practice, ${familyFocus}.`;
  }

  if (locale === 'ko') {
    if (config.degreeStatus === 'required') {
      return `이 직무는 시장에서 보통 학위 기준이 있는 편입니다. 일반적으로 ${levelLabels.ko[config.degreeLevel]}가 기본선으로 여겨지며, ${familyFocus}.`;
    }

    if (config.degreeStatus === 'preferred') {
      return `고용주는 ${levelLabels.ko[config.degreeLevel]}를 자주 선호하지만, 실제로는 ${familyFocus}.`;
    }

    return `이 직무는 보통 학위가 핵심 입장권은 아닙니다. 실제 시장에서는 ${familyFocus}.`;
  }

  if (config.degreeStatus === 'required') {
    return `Este rol suele estar filtrado por titulacion en el mercado. ${capitalize(levelLabels.es[config.degreeLevel])} es la base comun, y ${familyFocus}.`;
  }

  if (config.degreeStatus === 'preferred') {
    return `Las empresas suelen preferir ${levelLabels.es[config.degreeLevel]}, pero en la practica ${familyFocus}.`;
  }

  return `Este rol no suele estar bloqueado por un titulo universitario. En la practica, ${familyFocus}.`;
}

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function getCareerFamilyKey(config, classification) {
  if (config.degreeFamily === 'care' && classification?.majorId === 'service') {
    return 'careSupport';
  }

  const map = {
    management: 'management',
    care: 'healthcare',
    design: 'creative',
    engineering: 'technical',
    education: 'education',
    language: 'language',
    business: 'business',
    operations: 'clerical',
    support: 'support',
    service: 'service',
    security: 'security',
    sales: 'sales',
    agriculture: 'agriculture',
    trades: 'trades',
    logistics: 'machine',
    manufacturing: 'machine',
    labor: 'labor'
  };

  return map[config.degreeFamily] || 'business';
}

function buildMarketSignals(config, classification) {
  const familyKey = getCareerFamilyKey(config, classification);
  const salaryBases = {
    management: [72000, 120000],
    healthcare: [45000, 85000],
    careSupport: [32000, 46000],
    creative: [55000, 90000],
    technical: [80000, 125000],
    education: [42000, 70000],
    language: [40000, 70000],
    business: [55000, 95000],
    clerical: [38000, 62000],
    support: [36000, 56000],
    service: [32000, 50000],
    security: [38000, 62000],
    sales: [45000, 85000],
    agriculture: [35000, 60000],
    trades: [50000, 80000],
    machine: [42000, 68000],
    labor: [34000, 52000]
  };
  const degreeAdjustments = {
    optional: {
      none: [0, 0],
      bachelor: [5000, 10000],
      master: [10000, 18000],
      doctorate: [18000, 30000]
    },
    preferred: {
      none: [0, 0],
      bachelor: [10000, 20000],
      master: [15000, 25000],
      doctorate: [25000, 40000]
    },
    required: {
      none: [0, 0],
      bachelor: [25000, 45000],
      master: [40000, 65000],
      doctorate: [70000, 95000]
    }
  };
  const demandLevels = {
    management: 'medium',
    healthcare: 'high',
    careSupport: 'high',
    creative: 'medium',
    technical: 'high',
    education: 'medium',
    language: 'low',
    business: 'medium',
    clerical: 'medium',
    support: 'medium',
    service: 'medium',
    security: 'medium',
    sales: 'high',
    agriculture: 'medium',
    trades: 'high',
    machine: 'medium',
    labor: 'medium'
  };
  const demandNotes = {
    en: {
      management: 'Demand holds where employers need people to coordinate teams, vendors, budgets, and changing priorities.',
      healthcare: 'Demand stays strong because licensed care delivery, safety, and patient responsibility still require people in the loop.',
      careSupport: 'Demand stays strong in aging care and in-person support, even though pay remains tighter than licensed clinical roles.',
      creative: 'Demand is selective: AI compresses commodity output, but teams still hire for taste, direction, and client-facing execution.',
      technical: 'Demand remains strong for builders who can ship systems, own reliability, and work around changing technical stacks.',
      education: 'Demand remains steady because teaching still depends on classroom control, human explanation, and parent-facing accountability.',
      language: 'Demand is selective because routine translation and content conversion are being compressed by AI tools.',
      business: 'Demand stays steady where employers need analysis, coordination, and compliance judgment tied to business outcomes.',
      clerical: 'Demand is steady but vulnerable: openings exist, yet routine digital workflows face strong automation pressure.',
      support: 'Demand remains active for escalation, retention, and complex case handling even as routine support is automated.',
      service: 'Demand stays active in live service environments, but routine front-desk and order-taking work is under pressure.',
      security: 'Demand remains steady where physical presence, incident response, and duty coverage matter.',
      sales: 'Demand stays strong for people who can build trust, handle objections, and convert pipeline into revenue.',
      agriculture: 'Demand stays steady where field work, equipment handling, and site conditions still require humans.',
      trades: 'Demand remains strong because licensed field work and on-site problem solving are hard to automate fully.',
      machine: 'Demand stays steady in production and logistics, but the most repetitive machine-centered roles face automation pressure first.',
      labor: 'Demand stays active for site-ready workers, though repetitive and highly structured environments are more exposed to automation.'
    },
    ko: {
      management: '팀, 협력사, 예산, 바뀌는 우선순위를 함께 조율할 사람이 필요한 곳에서는 수요가 유지됩니다.',
      healthcare: '면허 기반 돌봄, 안전, 환자 책임이 여전히 사람에게 남아 있어 수요가 강하게 유지됩니다.',
      careSupport: '고령화 돌봄과 대면 지원 수요는 강하지만, 면허형 임상 직무보다 보상 수준은 낮은 편입니다.',
      creative: '수요는 선별적입니다. AI가 범용 산출물을 압축하지만, 취향, 방향성, 클라이언트 대응 실행력은 계속 필요합니다.',
      technical: '실제 시스템을 만들고 안정성을 책임질 수 있는 인력에 대한 수요는 강하게 유지됩니다.',
      education: '수업 운영, 인간적 설명, 학부모 대응 책임이 남아 있어 교육 수요는 비교적 안정적입니다.',
      language: '반복 번역과 단순 콘텐츠 변환은 AI가 압축하고 있어 수요가 더 선별적으로 움직입니다.',
      business: '비즈니스 성과와 연결된 분석, 조율, 규정 판단이 필요한 곳에서는 수요가 유지됩니다.',
      clerical: '채용은 존재하지만, 반복적인 디지털 워크플로는 자동화 압력이 강해 취약성이 큽니다.',
      support: '단순 문의는 자동화되더라도 에스컬레이션, 유지, 복합 사례 처리를 위한 수요는 남습니다.',
      service: '현장 서비스 수요는 유지되지만, 프런트데스크와 주문 처리처럼 반복적인 업무는 압박을 받습니다.',
      security: '현장 상주, 사고 대응, 근무 커버가 필요한 곳에서는 수요가 비교적 안정적입니다.',
      sales: '신뢰 형성, 반론 대응, 매출 전환을 해낼 수 있는 사람에 대한 수요는 강합니다.',
      agriculture: '현장 작업, 장비 운용, 농장 상황 대응이 필요해 수요는 비교적 안정적으로 유지됩니다.',
      trades: '면허가 필요한 현장 작업과 현장 문제 해결은 완전 자동화가 어려워 수요가 강합니다.',
      machine: '생산과 물류 수요는 유지되지만, 가장 반복적인 장비 중심 역할부터 자동화 압박을 받습니다.',
      labor: '현장 투입 가능한 인력 수요는 남지만, 반복적이고 구조화된 환경일수록 자동화 노출이 커집니다.'
    },
    es: {
      management: 'La demanda se mantiene donde las empresas necesitan coordinar equipos, proveedores, presupuesto y prioridades cambiantes.',
      healthcare: 'La demanda sigue fuerte porque la atencion con licencia, la seguridad y la responsabilidad sobre pacientes aun requieren personas.',
      careSupport: 'La demanda sigue fuerte en cuidado presencial y apoyo a personas mayores, aunque el salario es menor que en roles clinicos con licencia.',
      creative: 'La demanda es selectiva: la IA comprime la produccion generica, pero sigue habiendo contratacion para criterio, direccion y ejecucion con clientes.',
      technical: 'La demanda sigue fuerte para quienes construyen sistemas reales, cuidan la fiabilidad y trabajan con stacks cambiantes.',
      education: 'La demanda se mantiene porque la ensenanza todavia depende del control del aula, la explicacion humana y la responsabilidad frente a familias.',
      language: 'La demanda es selectiva porque la traduccion rutinaria y la conversion de contenido estan siendo comprimidas por la IA.',
      business: 'La demanda se mantiene donde se necesitan analisis, coordinacion y criterio de cumplimiento ligados a resultados de negocio.',
      clerical: 'La demanda es estable pero vulnerable: hay vacantes, aunque los flujos digitales rutinarios enfrentan fuerte presion de automatizacion.',
      support: 'La demanda sigue activa para escalaciones, retencion y casos complejos aunque el soporte rutinario se automatiza.',
      service: 'La demanda sigue activa en servicios presenciales, pero el trabajo rutinario de recepcion y toma de pedidos esta bajo presion.',
      security: 'La demanda se mantiene donde importan la presencia fisica, la respuesta a incidentes y la cobertura de turnos.',
      sales: 'La demanda sigue fuerte para quienes generan confianza, manejan objeciones y convierten el pipeline en ingresos.',
      agriculture: 'La demanda se mantiene donde el trabajo de campo, el manejo de equipos y las condiciones del sitio siguen requiriendo personas.',
      trades: 'La demanda sigue fuerte porque el trabajo de campo con licencia y la resolucion de problemas en sitio son dificiles de automatizar por completo.',
      machine: 'La demanda se mantiene en produccion y logistica, pero los roles mas repetitivos alrededor de maquinaria sienten primero la presion de automatizacion.',
      labor: 'La demanda sigue activa para trabajadores listos para sitio, aunque los entornos repetitivos y muy estructurados estan mas expuestos a la automatizacion.'
    }
  };
  const baseRange = salaryBases[familyKey] || salaryBases.business;
  const adjustment = degreeAdjustments[config.degreeStatus]?.[config.degreeLevel] || [0, 0];

  return {
    salaryRange: {
      currency: 'USD',
      period: 'year',
      scope: 'illustrative-us-annual-base',
      min: baseRange[0] + adjustment[0],
      max: baseRange[1] + adjustment[1]
    },
    hiringDemand: {
      level: demandLevels[familyKey] || 'medium',
      note: {
        en: demandNotes.en[familyKey] || demandNotes.en.business,
        ko: demandNotes.ko[familyKey] || demandNotes.ko.business,
        es: demandNotes.es[familyKey] || demandNotes.es.business
      }
    }
  };
}

function buildEducationPathways(locale, config, classification) {
  const familyKey = getCareerFamilyKey(config, classification);
  const levelLabels = {
    en: {
      none: 'no university degree',
      bachelor: 'a bachelor-level route',
      master: 'a master-level route',
      doctorate: 'a doctorate-level route'
    },
    ko: {
      none: '대학 학위 없이도 가능한 경로',
      bachelor: '학사 중심 경로',
      master: '석사 중심 경로',
      doctorate: '박사 중심 경로'
    },
    es: {
      none: 'una ruta sin titulo universitario',
      bachelor: 'una ruta de licenciatura',
      master: 'una ruta de maestria',
      doctorate: 'una ruta de doctorado'
    }
  };
  const practiceFocus = {
    en: {
      management: 'budgeting, reporting, workflow design, and stakeholder leadership on real projects',
      healthcare: 'clinical routines, documentation, safety rules, and supervised care practice',
      careSupport: 'care routines, shift discipline, safety habits, and live support experience',
      creative: 'portfolio work, critique, client revisions, and tool fluency',
      technical: 'real systems, debugging depth, version control, and shipped project proof',
      education: 'classroom practice, tutoring, curriculum work, and student communication',
      language: 'domain knowledge, editing quality, bilingual samples, and terminology control',
      business: 'analysis, spreadsheets, compliance awareness, and cross-functional project work',
      clerical: 'office software, records accuracy, documentation discipline, and workflow consistency',
      support: 'ticketing, de-escalation, product knowledge, and system hygiene',
      service: 'live customer service, reliability, point-of-service judgment, and shift readiness',
      security: 'observation, incident reporting, safety procedure, and certification where needed',
      sales: 'pipeline management, objection handling, CRM use, and quota discipline',
      agriculture: 'field safety, equipment routines, seasonality, and crop or livestock basics',
      trades: 'apprenticeship practice, vocational training, licensing prep, and supervised field hours',
      machine: 'equipment safety, SOP discipline, monitoring, and shift consistency',
      labor: 'site safety, stamina, punctuality, and consistency under physical demand'
    },
    ko: {
      management: '예산, 리포팅, 워크플로 설계, 이해관계자 리더십을 실제 프로젝트에서',
      healthcare: '임상 루틴, 문서화, 안전 규칙, 감독하 돌봄 실습을',
      careSupport: '돌봄 루틴, 교대 근무 규율, 안전 습관, 대면 지원 경험을',
      creative: '포트폴리오 작업, 피드백 반영, 클라이언트 수정 대응, 툴 숙련을',
      technical: '실제 시스템 구축, 디버깅 깊이, 버전 관리, 배포 경험을',
      education: '수업 실습, 튜터링, 커리큘럼 작업, 학생 커뮤니케이션을',
      language: '도메인 지식, 편집 품질, 이중언어 샘플, 용어 통제를',
      business: '분석, 스프레드시트, 규정 이해, 협업 프로젝트 경험을',
      clerical: '오피스 소프트웨어, 기록 정확성, 문서 규율, 워크플로 일관성을',
      support: '티켓 처리, 디에스컬레이션, 제품 이해, 시스템 위생을',
      service: '대면 서비스, 근무 신뢰성, 현장 판단, 교대 준비를',
      security: '관찰, 사고 보고, 안전 절차, 필요한 자격을',
      sales: '파이프라인 관리, 반론 대응, CRM 사용, 목표 관리 능력을',
      agriculture: '현장 안전, 장비 루틴, 계절성 이해, 작물·축산 기초를',
      trades: '도제 실습, 직업훈련, 자격 준비, 감독하 현장 시간을',
      machine: '장비 안전, 표준 작업 규율, 모니터링, 교대 일관성을',
      labor: '현장 안전, 체력, 시간 준수, 물리적 강도 아래의 일관성을'
    },
    es: {
      management: 'presupuesto, reportes, diseno de flujo y liderazgo con actores reales en proyectos',
      healthcare: 'rutinas clinicas, documentacion, normas de seguridad y practica supervisada',
      careSupport: 'rutinas de cuidado, disciplina de turnos, habitos de seguridad y apoyo presencial',
      creative: 'portafolio, critica, revisiones con clientes y dominio de herramientas',
      technical: 'sistemas reales, depuracion, control de versiones y proyectos publicados',
      education: 'practica de aula, tutoria, trabajo curricular y comunicacion con estudiantes',
      language: 'conocimiento de dominio, calidad editorial, muestras bilingues y control terminologico',
      business: 'analisis, hojas de calculo, cumplimiento y proyectos interfuncionales',
      clerical: 'software de oficina, precision en registros, disciplina documental y consistencia operativa',
      support: 'ticketing, desescalada, conocimiento del producto e higiene del sistema',
      service: 'servicio en vivo, fiabilidad, criterio en el punto de servicio y preparacion por turno',
      security: 'observacion, reportes de incidentes, procedimiento de seguridad y certificacion cuando aplique',
      sales: 'gestion de pipeline, manejo de objeciones, uso de CRM y disciplina comercial',
      agriculture: 'seguridad de campo, rutinas de equipos, estacionalidad y bases de cultivo o ganado',
      trades: 'aprendizaje, formacion tecnica, preparacion para licencia y horas supervisadas',
      machine: 'seguridad de equipos, disciplina SOP, monitoreo y consistencia por turno',
      labor: 'seguridad en sitio, resistencia, puntualidad y consistencia bajo demanda fisica'
    }
  };
  const proofFocus = {
    en: {
      management: 'ownership of outcomes, escalations, and team coordination',
      healthcare: 'licenses, supervised hours, and patient-safe execution',
      careSupport: 'reliability for shifts, caregiving references, and safe human support',
      creative: 'taste, shipped work, and revision-ready execution',
      technical: 'delivered systems, reliability, and problem-solving under change',
      education: 'subject credibility, classroom trust, and instruction quality',
      language: 'quality control, nuance, and domain accuracy',
      business: 'judgment, execution, and business-facing reliability',
      clerical: 'accuracy, consistency, and trust with records or workflows',
      support: 'complex case handling, retention, and calm escalation',
      service: 'live service judgment, reliability, and customer trust',
      security: 'responsible presence, incident handling, and compliance',
      sales: 'trust, quota progress, and repeatable conversion',
      agriculture: 'field readiness, safe routines, and equipment confidence',
      trades: 'field hours, licensing, and jobsite-ready problem solving',
      machine: 'safe machine handling, shift reliability, and process control',
      labor: 'site readiness, safety, and reliable execution under pressure'
    },
    ko: {
      management: '성과 책임, 에스컬레이션 대응, 팀 조율 능력',
      healthcare: '면허, 감독 시간, 환자 안전 실행력',
      careSupport: '교대 신뢰성, 돌봄 추천서, 안전한 대면 지원 능력',
      creative: '취향, 실제 산출물, 수정 대응 실행력',
      technical: '배포된 시스템, 안정성, 변화 대응 문제 해결력',
      education: '교과 신뢰도, 교실 신뢰, 수업 품질',
      language: '품질 관리, 뉘앙스, 도메인 정확성',
      business: '판단력, 실행력, 비즈니스 대응 신뢰성',
      clerical: '정확성, 일관성, 기록·워크플로 신뢰성',
      support: '복합 사례 처리, 유지, 차분한 에스컬레이션 대응',
      service: '현장 서비스 판단, 근무 신뢰성, 고객 신뢰',
      security: '책임 있는 상주, 사고 대응, 규정 준수',
      sales: '신뢰 형성, 목표 달성 흐름, 반복 가능한 전환 능력',
      agriculture: '현장 준비도, 안전 루틴, 장비 자신감',
      trades: '현장 시간, 자격, 공사 현장 문제 해결력',
      machine: '안전한 장비 운용, 교대 신뢰성, 공정 통제',
      labor: '현장 투입 준비, 안전, 압박 속의 안정적 실행'
    },
    es: {
      management: 'propiedad sobre resultados, escalaciones y coordinacion de equipos',
      healthcare: 'licencias, horas supervisadas y ejecucion segura para pacientes',
      careSupport: 'fiabilidad para turnos, referencias de cuidado y apoyo humano seguro',
      creative: 'criterio, trabajo publicado y ejecucion lista para revisiones',
      technical: 'sistemas entregados, fiabilidad y resolucion de problemas bajo cambio',
      education: 'credibilidad de materia, confianza de aula y calidad de instruccion',
      language: 'control de calidad, matiz y precision de dominio',
      business: 'criterio, ejecucion y fiabilidad frente al negocio',
      clerical: 'precision, consistencia y confianza con registros o flujos',
      support: 'manejo de casos complejos, retencion y escalacion calmada',
      service: 'criterio de servicio en vivo, fiabilidad y confianza del cliente',
      security: 'presencia responsable, respuesta a incidentes y cumplimiento',
      sales: 'confianza, avance de cuota y conversion repetible',
      agriculture: 'preparacion de campo, rutinas seguras y confianza con equipos',
      trades: 'horas de campo, licencia y resolucion de problemas en obra',
      machine: 'manejo seguro de maquinaria, fiabilidad por turno y control de proceso',
      labor: 'preparacion de sitio, seguridad y ejecucion fiable bajo presion'
    }
  };
  const entryStep = buildEducationEntryStep(locale, config, levelLabels[locale][config.degreeLevel]);

  if (locale === 'en') {
    return [
      entryStep,
      `Build ${practiceFocus.en[familyKey] || practiceFocus.en.business}.`,
      `Collect proof of ${proofFocus.en[familyKey] || proofFocus.en.business}.`
    ];
  }

  if (locale === 'ko') {
    return [
      entryStep,
      `${practiceFocus.ko[familyKey] || practiceFocus.ko.business} 실제 환경에서 익히세요.`,
      `${proofFocus.ko[familyKey] || proofFocus.ko.business}를 보여 주는 경력, 자격, 추천서를 만드세요.`
    ];
  }

  return [
    entryStep,
    `Desarrolla ${practiceFocus.es[familyKey] || practiceFocus.es.business}.`,
    `Reune evidencia de ${proofFocus.es[familyKey] || proofFocus.es.business} con proyectos, horas de campo o referencias.`
  ];
}

function buildEducationEntryStep(locale, config, levelLabel) {
  if (locale === 'en') {
    if (config.degreeStatus === 'required') {
      return `Start with ${levelLabel} or equivalent accredited training because this market usually screens for credentials first.`;
    }

    if (config.degreeStatus === 'preferred') {
      return `Use ${levelLabel} as a strong signal, but combine it with certificates, internships, or adjacent training if you need a faster route.`;
    }

    return 'Start with a certificate, apprenticeship, bootcamp, or entry role instead of assuming a four-year degree is mandatory.';
  }

  if (locale === 'ko') {
    if (config.degreeStatus === 'required') {
      return `이 시장은 보통 자격부터 보기 때문에 ${levelLabel} 또는 이에 준하는 공인 교육부터 시작하세요.`;
    }

    if (config.degreeStatus === 'preferred') {
      return `${levelLabel}가 강한 신호가 되지만, 더 빠른 경로가 필요하면 자격증, 인턴십, 인접 전공을 함께 활용하세요.`;
    }

    return '4년제 학위를 전제로 두기보다 자격증, 도제, 부트캠프, 입문 직무부터 시작하세요.';
  }

  if (config.degreeStatus === 'required') {
    return `Empieza con ${levelLabel} o formacion acreditada equivalente porque este mercado suele filtrar primero por credenciales.`;
  }

  if (config.degreeStatus === 'preferred') {
    return `Usa ${levelLabel} como una senal fuerte, pero combinala con certificados, practicas o estudio adyacente si necesitas una ruta mas rapida.`;
  }

  return 'Empieza con certificado, aprendizaje, bootcamp o un rol de entrada en lugar de asumir que hace falta una carrera de cuatro anos.';
}

function enrichExistingJob(job, config) {
  return {
    ...job,
    marketSignals: buildMarketSignals(config, job.classification),
    content: {
      ...job.content,
      en: {
        ...job.content.en,
        educationPathways: buildEducationPathways('en', config, job.classification)
      },
      ko: {
        ...job.content.ko,
        educationPathways: buildEducationPathways('ko', config, job.classification)
      },
      es: {
        ...job.content.es,
        educationPathways: buildEducationPathways('es', config, job.classification)
      }
    }
  };
}

function deriveConfigFromJob(job) {
  return {
    category: job.category,
    degreeFamily: job.category,
    automationRisk: job.automationRisk,
    aiRole: job.aiRole,
    degreeStatus: job.degree?.status,
    degreeLevel: job.degree?.level,
    currentReplacementUrl: job.currentReplacementUrl,
    references: job.aiEvidence?.references || []
  };
}

function buildFamily(titles, config, copy) {
  return {
    summary: {
      en: copy.summary.en(titles.en),
      ko: copy.summary.ko(titles.ko),
      es: copy.summary.es(titles.es)
    },
    tasks: copy.tasks,
    skills: copy.skills,
    path: copy.path,
    aiNow: copy.aiNow,
    aiFuture: copy.aiFuture,
    rationale: copy.rationale,
    automatableNow: copy.automatableNow,
    humanEdge: copy.humanEdge,
    services: copy.services
  };
}

const FAMILY_BUILDERS = {
  management: (titles, config) => buildFamily(titles, config, {
    summary: {
      en: (title) => `${title} coordinates priorities, resources, and performance decisions so teams can hit business goals consistently.`,
      ko: (title) => `${title}는 팀이 비즈니스 목표를 안정적으로 달성하도록 우선순위, 자원, 성과 결정을 조율합니다.`,
      es: (title) => `${title} coordina prioridades, recursos y decisiones de rendimiento para que los equipos cumplan objetivos de negocio con consistencia.`
    },
    tasks: {
      en: [
        'Set priorities and translate goals into execution plans.',
        'Coordinate teams, budget, vendors, and escalation paths.',
        'Review KPIs and intervene when quality, cost, or speed drifts.'
      ],
      ko: [
        '우선순위를 정하고 목표를 실행 계획으로 바꿉니다.',
        '팀, 예산, 협력사, 에스컬레이션 흐름을 조율합니다.',
        'KPI를 검토하고 품질, 비용, 속도가 흔들릴 때 개입합니다.'
      ],
      es: [
        'Definir prioridades y convertir objetivos en planes de ejecucion.',
        'Coordinar equipos, presupuesto, proveedores y escalaciones.',
        'Revisar KPI e intervenir cuando calidad, coste o velocidad se desajustan.'
      ]
    },
    skills: {
      en: ['Decision-making', 'Stakeholder communication', 'Planning', 'Performance analysis'],
      ko: ['의사결정', '이해관계자 커뮤니케이션', '기획력', '성과 분석'],
      es: ['Toma de decisiones', 'Comunicacion con stakeholders', 'Planificacion', 'Analisis de rendimiento']
    },
    path: {
      en: [
        'Build ownership experience through projects, teams, or process improvement work.',
        'Learn reporting, budgeting, forecasting, and workflow design.',
        'Show that you can improve outcomes, not just maintain routines.'
      ],
      ko: [
        '프로젝트, 팀, 프로세스 개선 업무를 통해 책임 경험을 쌓습니다.',
        '리포팅, 예산, 예측, 워크플로 설계를 익힙니다.',
        '유지뿐 아니라 성과를 개선할 수 있다는 증거를 만듭니다.'
      ],
      es: [
        'Construye experiencia de responsabilidad mediante proyectos, equipos o mejora de procesos.',
        'Aprende reporting, presupuesto, proyeccion y diseno de flujos.',
        'Demuestra que puedes mejorar resultados, no solo mantener rutinas.'
      ]
    },
    aiNow: {
      en: 'AI already helps with reporting, meeting summaries, planning drafts, and scenario analysis.',
      ko: 'AI는 이미 리포팅, 회의 요약, 계획 초안, 시나리오 분석을 돕고 있습니다.',
      es: 'La IA ya ayuda con reportes, resúmenes de reuniones, borradores de planes y analisis de escenarios.'
    },
    aiFuture: {
      en: 'Routine planning work will compress, but tradeoff calls, accountability, and people leadership stay human-heavy.',
      ko: '반복적인 기획 업무는 줄어들겠지만, 트레이드오프 판단과 책임, 사람 관리의 비중은 여전히 높습니다.',
      es: 'El trabajo rutinario de planificacion se comprimira, pero las decisiones de compromiso, la responsabilidad y el liderazgo seguiran siendo muy humanos.'
    },
    rationale: {
      en: 'Managerial work includes structured reporting and planning that AI can accelerate, but the role still owns judgment across conflicting priorities.',
      ko: '관리 업무에는 AI가 빠르게 만들 수 있는 보고와 계획이 많지만, 상충하는 우선순위 사이의 판단은 여전히 사람이 맡습니다.',
      es: 'La gestion incluye reportes y planificacion estructurada que la IA acelera, pero el rol sigue siendo responsable del juicio entre prioridades en conflicto.'
    },
    automatableNow: {
      en: [
        'Summarizing dashboards, meetings, and status updates.',
        'Drafting plans, memos, and performance reviews.',
        'Surfacing trends, bottlenecks, and forecast scenarios.'
      ],
      ko: [
        '대시보드, 회의, 상태 업데이트를 요약하는 일.',
        '계획안, 메모, 성과 리뷰 초안을 만드는 일.',
        '추세, 병목, 예측 시나리오를 뽑아내는 일.'
      ],
      es: [
        'Resumir paneles, reuniones y actualizaciones de estado.',
        'Redactar planes, notas y evaluaciones de rendimiento.',
        'Detectar tendencias, cuellos de botella y escenarios.'
      ]
    },
    humanEdge: {
      en: [
        'Resolving tradeoffs between cost, speed, quality, and morale.',
        'Owning accountability when priorities conflict.',
        'Aligning people who do not share the same incentives.'
      ],
      ko: [
        '비용, 속도, 품질, 팀 분위기 사이의 절충을 판단하는 일.',
        '우선순위가 충돌할 때 책임을 지는 일.',
        '이해관계가 다른 사람들을 정렬하는 일.'
      ],
      es: [
        'Resolver compensaciones entre coste, velocidad, calidad y moral.',
        'Asumir responsabilidad cuando las prioridades chocan.',
        'Alinear personas con incentivos distintos.'
      ]
    },
    services: {
      en: ['Business copilots', 'Meeting summarizers', 'Forecasting assistants'],
      ko: ['비즈니스 코파일럿', '회의 요약 도구', '예측 보조 도구'],
      es: ['Copilotos de negocio', 'Resumidores de reuniones', 'Asistentes de proyeccion']
    }
  }),
  healthcare: (titles, config) => buildFamily(titles, config, {
    summary: {
      en: (title) => `${title} delivers regulated care or clinical support in settings where safety, trust, and live judgment matter.`,
      ko: (title) => `${title}는 안전, 신뢰, 실시간 판단이 중요한 환경에서 규제된 돌봄 또는 임상 지원을 제공합니다.`,
      es: (title) => `${title} ofrece atencion regulada o apoyo clinico en contextos donde importan la seguridad, la confianza y el juicio en vivo.`
    },
    tasks: {
      en: [
        'Assess needs and follow clinical or treatment protocols.',
        'Deliver care, guidance, or treatment steps accurately.',
        'Document outcomes and coordinate with patients or care teams.'
      ],
      ko: [
        '상태를 평가하고 임상 또는 치료 프로토콜을 따릅니다.',
        '돌봄, 안내, 치료 단계를 정확하게 수행합니다.',
        '결과를 기록하고 환자나 팀과 협업합니다.'
      ],
      es: [
        'Evaluar necesidades y seguir protocolos clinicos o terapeuticos.',
        'Prestar atencion, guia o tratamiento con precision.',
        'Documentar resultados y coordinar con pacientes o equipos.'
      ]
    },
    skills: {
      en: ['Clinical judgment', 'Patient communication', 'Safety discipline', 'Documentation accuracy'],
      ko: ['임상 판단력', '환자 커뮤니케이션', '안전 의식', '정확한 기록'],
      es: ['Juicio clinico', 'Comunicacion con pacientes', 'Disciplina de seguridad', 'Precision documental']
    },
    path: {
      en: [
        'Complete accredited education and supervised practical training.',
        'Meet licensing or registration requirements in the target market.',
        'Build confidence in patient communication, safety, and follow-through.'
      ],
      ko: [
        '공인 교육과 감독하 실습 과정을 마칩니다.',
        '목표 시장의 면허나 등록 요건을 충족합니다.',
        '환자 소통, 안전, 실행력을 꾸준히 훈련합니다.'
      ],
      es: [
        'Completa formacion acreditada y practica supervisada.',
        'Cumple requisitos de licencia o registro en tu mercado.',
        'Desarrolla seguridad en comunicacion con pacientes, seguridad y seguimiento.'
      ]
    },
    aiNow: {
      en: 'AI already supports documentation, screening, scheduling, and pattern detection around clinical work.',
      ko: 'AI는 이미 임상 업무 주변의 문서화, 선별, 일정 관리, 패턴 탐지를 돕고 있습니다.',
      es: 'La IA ya apoya documentacion, cribado, agenda y deteccion de patrones alrededor del trabajo clinico.'
    },
    aiFuture: {
      en: 'These roles will become more data-assisted, but full replacement remains difficult because care is live, regulated, and trust-based.',
      ko: '이 역할은 더 많은 데이터 지원을 받게 되겠지만, 돌봄은 실시간이고 규제되며 신뢰 기반이라 완전 대체는 어렵습니다.',
      es: 'Estos roles seran mas asistidos por datos, pero el reemplazo total sigue siendo dificil porque el cuidado es en vivo, regulado y basado en confianza.'
    },
    rationale: {
      en: 'Clinical support has digital admin layers that AI can help with, but the human role remains strong because errors, safety, and trust carry high stakes.',
      ko: '임상 지원에는 AI가 도울 수 있는 디지털 행정 층이 있지만, 오류·안전·신뢰의 비용이 커서 사람 역할이 강하게 남습니다.',
      es: 'El soporte clinico tiene capas administrativas digitales que la IA puede ayudar a gestionar, pero el rol humano sigue fuerte porque el error, la seguridad y la confianza tienen mucho peso.'
    },
    automatableNow: {
      en: [
        'Drafting documentation and summarizing visits.',
        'Suggesting routine screening or follow-up prompts.',
        'Tracking schedules, records, and structured patient data.'
      ],
      ko: [
        '문서 초안 작성과 방문 기록 요약.',
        '기본 선별이나 추적 질문 제안.',
        '일정, 기록, 구조화된 환자 데이터 추적.'
      ],
      es: [
        'Redactar documentacion y resumir visitas.',
        'Sugerir cribados rutinarios o preguntas de seguimiento.',
        'Seguir agendas, registros y datos estructurados.'
      ]
    },
    humanEdge: {
      en: [
        'Handling live patients with changing needs.',
        'Owning safety decisions and bedside trust.',
        'Recognizing nuance that does not fit structured input.'
      ],
      ko: [
        '상태가 변하는 실제 환자를 다루는 일.',
        '안전 판단과 현장 신뢰를 책임지는 일.',
        '구조화된 입력에 담기지 않는 미묘한 신호를 읽는 일.'
      ],
      es: [
        'Atender pacientes reales con necesidades cambiantes.',
        'Asumir decisiones de seguridad y confianza directa.',
        'Detectar matices que no encajan en datos estructurados.'
      ]
    },
    services: {
      en: ['Clinical copilots', 'Scheduling assistants', 'Screening support AI'],
      ko: ['임상 코파일럿', '일정 보조 도구', '선별 지원 AI'],
      es: ['Copilotos clinicos', 'Asistentes de agenda', 'IA de apoyo al cribado']
    }
  }),
  creative: (titles, config) => buildFamily(titles, config, {
    summary: {
      en: (title) => `${title} turns briefs into visual, product, or media outputs that people can understand, use, or respond to.`,
      ko: (title) => `${title}는 사람들이 이해하고 사용하거나 반응할 수 있도록 기획을 시각, 제품, 미디어 결과물로 바꿉니다.`,
      es: (title) => `${title} convierte briefs en salidas visuales, de producto o de medios que las personas pueden entender, usar o apreciar.`
    },
    tasks: {
      en: [
        'Interpret briefs and turn constraints into concepts or assets.',
        'Create drafts, variants, and polished production outputs.',
        'Revise work with feedback from clients, editors, or product teams.'
      ],
      ko: [
        '브리프를 해석하고 제약 조건을 콘셉트나 산출물로 바꿉니다.',
        '초안, 변형안, 완성도 높은 결과물을 만듭니다.',
        '클라이언트, 편집자, 제품팀의 피드백으로 작업을 다듬습니다.'
      ],
      es: [
        'Interpretar briefs y convertir restricciones en conceptos o activos.',
        'Crear borradores, variantes y resultados listos para produccion.',
        'Revisar el trabajo con feedback de clientes, editores o equipos.'
      ]
    },
    skills: {
      en: ['Visual judgment', 'Tool fluency', 'Iteration', 'Communication'],
      ko: ['시각적 판단', '도구 숙련도', '반복 개선', '커뮤니케이션'],
      es: ['Criterio visual', 'Soltura con herramientas', 'Iteracion', 'Comunicacion']
    },
    path: {
      en: [
        'Study fundamentals and build a portfolio that shows finished work.',
        'Learn the production tools used in the target field.',
        'Practice feedback loops, deadlines, and real client constraints.'
      ],
      ko: [
        '기본기를 배우고 완성 결과물이 담긴 포트폴리오를 만듭니다.',
        '목표 분야에서 쓰는 제작 도구를 익힙니다.',
        '피드백 반복, 마감, 실제 고객 제약을 경험합니다.'
      ],
      es: [
        'Estudia fundamentos y construye un portafolio con trabajo terminado.',
        'Aprende las herramientas de produccion del campo objetivo.',
        'Practica ciclos de feedback, plazos y restricciones reales.'
      ]
    },
    aiNow: {
      en: 'AI already helps with ideation, first drafts, asset variation, cleanup, and faster production workflows.',
      ko: 'AI는 이미 아이디어 발산, 초안 생성, 자산 변형, 정리, 빠른 제작 워크플로를 돕고 있습니다.',
      es: 'La IA ya ayuda con ideacion, primeros borradores, variaciones de activos, limpieza y flujos de produccion mas rapidos.'
    },
    aiFuture: {
      en: 'Commodity production will compress further, while taste, direction, and problem framing become more valuable.',
      ko: '평준화된 제작 업무는 더 줄어들고, 감각, 방향 설정, 문제 정의의 가치가 더 커질 것입니다.',
      es: 'La produccion comoditizada se comprimira aun mas, mientras el gusto, la direccion y el planteamiento del problema ganan valor.'
    },
    rationale: {
      en: 'Creative work has many digital steps AI can accelerate, but differentiated judgment and brand fit still separate strong human work from average output.',
      ko: '창작 업무에는 AI가 빠르게 할 수 있는 디지털 단계가 많지만, 차별화된 판단과 브랜드 적합성은 여전히 사람이 만듭니다.',
      es: 'El trabajo creativo tiene muchos pasos digitales que la IA acelera, pero el juicio diferenciado y el encaje con la marca siguen marcando la diferencia.'
    },
    automatableNow: {
      en: [
        'Generating drafts, mockups, variations, and edits.',
        'Cleaning files, resizing assets, and summarizing feedback.',
        'Producing standard assets for repetitive briefs.'
      ],
      ko: [
        '초안, 목업, 변형안, 편집본 생성.',
        '파일 정리, 자산 리사이즈, 피드백 요약.',
        '반복 브리프용 표준 자산 제작.'
      ],
      es: [
        'Generar borradores, mockups, variantes y ediciones.',
        'Limpiar archivos, redimensionar activos y resumir feedback.',
        'Producir activos estandar para briefs repetitivos.'
      ]
    },
    humanEdge: {
      en: [
        'Setting direction instead of only generating options.',
        'Balancing brand, audience, and context.',
        'Choosing what feels original, usable, and credible.'
      ],
      ko: [
        '선택지만 만드는 것이 아니라 방향을 정하는 일.',
        '브랜드, 대상, 맥락을 함께 균형 잡는 일.',
        '무엇이 새롭고 쓸 만하며 신뢰할 만한지 고르는 일.'
      ],
      es: [
        'Marcar direccion en lugar de solo generar opciones.',
        'Equilibrar marca, audiencia y contexto.',
        'Elegir lo que se siente original, util y creible.'
      ]
    },
    services: {
      en: ['Generative design tools', 'Editing copilots', 'Asset variation AI'],
      ko: ['생성형 디자인 도구', '편집 코파일럿', '자산 변형 AI'],
      es: ['Herramientas generativas', 'Copilotos de edicion', 'IA de variacion de activos']
    }
  }),
  technical: (titles, config) => buildFamily(titles, config, {
    summary: {
      en: (title) => `${title} works on digital systems, automation, or analysis where reliability, speed, and technical judgment all matter.`,
      ko: (title) => `${title}는 신뢰성, 속도, 기술적 판단이 모두 중요한 디지털 시스템, 자동화, 분석 업무를 담당합니다.`,
      es: (title) => `${title} trabaja sobre sistemas digitales, automatizacion o analisis donde importan la fiabilidad, la velocidad y el criterio tecnico.`
    },
    tasks: {
      en: [
        'Analyze systems, data, or workflows for weaknesses and opportunities.',
        'Build, test, automate, or monitor technical processes.',
        'Document findings and turn complex signals into clear next steps.'
      ],
      ko: [
        '시스템, 데이터, 워크플로의 약점과 기회를 분석합니다.',
        '기술 프로세스를 구축, 테스트, 자동화, 모니터링합니다.',
        '결과를 기록하고 복잡한 신호를 다음 행동으로 번역합니다.'
      ],
      es: [
        'Analizar sistemas, datos o flujos para detectar debilidades y oportunidades.',
        'Construir, probar, automatizar o monitorizar procesos tecnicos.',
        'Documentar hallazgos y convertir senales complejas en acciones claras.'
      ]
    },
    skills: {
      en: ['Analytical thinking', 'Tool fluency', 'Debugging', 'Documentation'],
      ko: ['분석적 사고', '도구 숙련도', '디버깅', '문서화'],
      es: ['Pensamiento analitico', 'Soltura con herramientas', 'Depuracion', 'Documentacion']
    },
    path: {
      en: [
        'Build real projects that show systems, tooling, and problem-solving ability.',
        'Learn the stack, data flow, or security concepts used in the target role.',
        'Practice shipping work that remains reliable after change and scale.'
      ],
      ko: [
        '시스템, 도구, 문제 해결 능력을 보여주는 실제 프로젝트를 만듭니다.',
        '목표 역할에 필요한 스택, 데이터 흐름, 보안 개념을 배웁니다.',
        '변화와 규모가 커져도 버티는 결과물을 만드는 연습을 합니다.'
      ],
      es: [
        'Construye proyectos reales que demuestren sistemas, herramientas y resolucion de problemas.',
        'Aprende el stack, el flujo de datos o los conceptos de seguridad del rol objetivo.',
        'Practica entregar trabajo que siga siendo fiable al cambiar o escalar.'
      ]
    },
    aiNow: {
      en: 'AI already helps with code generation, query drafting, documentation, anomaly detection, and faster analysis loops.',
      ko: 'AI는 이미 코드 생성, 쿼리 초안, 문서화, 이상 탐지, 빠른 분석 반복을 돕고 있습니다.',
      es: 'La IA ya ayuda con generacion de codigo, borradores de consultas, documentacion, deteccion de anomalias y ciclos de analisis mas rapidos.'
    },
    aiFuture: {
      en: 'Routine implementation and analysis will compress further, but validation, architecture, and technical ownership remain human-heavy.',
      ko: '반복 구현과 분석은 더 줄어들겠지만, 검증, 아키텍처, 기술적 책임은 여전히 사람 비중이 높습니다.',
      es: 'La implementacion y el analisis rutinarios se comprimiran aun mas, pero la validacion, la arquitectura y la responsabilidad tecnica seguiran siendo muy humanas.'
    },
    rationale: {
      en: 'These roles have many digital steps that AI can accelerate, but the hard part is still deciding what is correct, safe, and production-ready.',
      ko: '이 직무에는 AI가 가속할 수 있는 디지털 단계가 많지만, 진짜 어려운 부분은 무엇이 맞고 안전하며 운영 가능한지 결정하는 일입니다.',
      es: 'Estos roles tienen muchos pasos digitales que la IA acelera, pero la parte dificil sigue siendo decidir que es correcto, seguro y apto para produccion.'
    },
    automatableNow: {
      en: [
        'Generating drafts, scripts, tests, and investigation starting points.',
        'Summarizing logs, dashboards, and documentation.',
        'Spotting patterns faster inside structured data and code.'
      ],
      ko: [
        '초안, 스크립트, 테스트, 조사 시작점을 만드는 일.',
        '로그, 대시보드, 문서를 요약하는 일.',
        '구조화된 데이터와 코드에서 패턴을 더 빨리 찾는 일.'
      ],
      es: [
        'Generar borradores, scripts, pruebas y puntos de partida para investigar.',
        'Resumir logs, paneles y documentacion.',
        'Detectar patrones mas rapido dentro de datos estructurados y codigo.'
      ]
    },
    humanEdge: {
      en: [
        'Validating whether outputs are correct under real constraints.',
        'Choosing architecture, priorities, and acceptable risk.',
        'Owning incidents, edge cases, and long-term maintainability.'
      ],
      ko: [
        '실제 제약 속에서 결과가 맞는지 검증하는 일.',
        '아키텍처, 우선순위, 허용 가능한 위험을 정하는 일.',
        '장애, 예외, 장기 유지보수 책임을 지는 일.'
      ],
      es: [
        'Validar si la salida es correcta bajo restricciones reales.',
        'Elegir arquitectura, prioridades y riesgo aceptable.',
        'Asumir incidentes, casos limite y mantenibilidad a largo plazo.'
      ]
    },
    services: {
      en: ['Code copilots', 'Monitoring assistants', 'Analysis copilots'],
      ko: ['코드 코파일럿', '모니터링 보조 도구', '분석 코파일럿'],
      es: ['Copilotos de codigo', 'Asistentes de monitoreo', 'Copilotos de analisis']
    }
  }),
  education: (titles, config) => buildFamily(titles, config, {
    summary: {
      en: (title) => `${title} guides learning, feedback, and development over time in a live educational setting.`,
      ko: (title) => `${title}는 실제 교육 환경에서 시간에 걸쳐 학습, 피드백, 성장을 이끕니다.`,
      es: (title) => `${title} guia el aprendizaje, la retroalimentacion y el desarrollo a lo largo del tiempo en un entorno educativo real.`
    },
    tasks: {
      en: [
        'Plan instruction and adapt explanations to learner needs.',
        'Assess progress and give feedback that changes outcomes.',
        'Maintain motivation, structure, and trust in the learning environment.'
      ],
      ko: [
        '수업을 설계하고 학습자 수준에 맞게 설명을 조정합니다.',
        '성장을 평가하고 결과를 바꾸는 피드백을 제공합니다.',
        '학습 환경에서 동기, 구조, 신뢰를 유지합니다.'
      ],
      es: [
        'Planificar instruccion y adaptar explicaciones a las necesidades del alumnado.',
        'Evaluar progreso y dar feedback que cambie resultados.',
        'Mantener motivacion, estructura y confianza en el entorno de aprendizaje.'
      ]
    },
    skills: {
      en: ['Instructional design', 'Communication', 'Assessment', 'Subject expertise'],
      ko: ['수업 설계', '커뮤니케이션', '평가', '교과 전문성'],
      es: ['Diseno instruccional', 'Comunicacion', 'Evaluacion', 'Dominio de la materia']
    },
    path: {
      en: [
        'Build subject depth and formal teaching practice.',
        'Learn assessment design, learner support, and class management.',
        'Show that you can explain hard concepts clearly and consistently.'
      ],
      ko: [
        '교과 전문성과 정식 수업 실습을 쌓습니다.',
        '평가 설계, 학습자 지원, 수업 운영을 배웁니다.',
        '어려운 개념을 명확하고 꾸준하게 설명할 수 있음을 보여줍니다.'
      ],
      es: [
        'Desarrolla profundidad en la materia y practica docente formal.',
        'Aprende evaluacion, apoyo al alumnado y gestion de aula.',
        'Demuestra que puedes explicar conceptos dificiles con claridad y constancia.'
      ]
    },
    aiNow: {
      en: 'AI already helps with lesson drafts, practice materials, feedback support, and admin reduction.',
      ko: 'AI는 이미 수업 초안, 연습 자료, 피드백 지원, 행정 부담 감소를 돕고 있습니다.',
      es: 'La IA ya ayuda con borradores de clases, materiales de practica, apoyo al feedback y reduccion de tareas administrativas.'
    },
    aiFuture: {
      en: 'Instruction will become more AI-assisted, but live teaching, motivation, and trust remain difficult to automate well.',
      ko: '수업은 더 많은 AI 지원을 받게 되겠지만, 실시간 교육, 동기 부여, 신뢰 형성은 자동화가 어렵습니다.',
      es: 'La ensenanza sera mas asistida por IA, pero la docencia en vivo, la motivacion y la confianza siguen siendo dificiles de automatizar bien.'
    },
    rationale: {
      en: 'Education has digital prep work AI can absorb, but the role still depends on real-time adaptation and human relationships.',
      ko: '교육에는 AI가 흡수할 수 있는 디지털 준비 업무가 많지만, 실제 역할은 실시간 조정과 인간 관계에 크게 의존합니다.',
      es: 'La educacion tiene trabajo preparatorio digital que la IA puede absorber, pero el rol sigue dependiendo de la adaptacion en tiempo real y de las relaciones humanas.'
    },
    automatableNow: {
      en: [
        'Drafting lesson materials and differentiated exercises.',
        'Summarizing learner performance and feedback patterns.',
        'Generating rubrics, quizzes, and baseline practice.'
      ],
      ko: [
        '수업 자료와 수준별 연습 문제 초안 작성.',
        '학습자 성과와 피드백 패턴 요약.',
        '루브릭, 퀴즈, 기본 연습 자료 생성.'
      ],
      es: [
        'Redactar materiales de clase y ejercicios diferenciados.',
        'Resumir rendimiento y patrones de retroalimentacion.',
        'Generar rubricas, pruebas y practica base.'
      ]
    },
    humanEdge: {
      en: [
        'Reading learner confusion and adjusting live.',
        'Building trust, discipline, and motivation over time.',
        'Handling sensitive support and classroom dynamics.'
      ],
      ko: [
        '학습자의 혼란을 읽고 실시간으로 조정하는 일.',
        '시간에 걸쳐 신뢰, 규율, 동기를 만드는 일.',
        '민감한 지원과 수업 분위기를 다루는 일.'
      ],
      es: [
        'Leer la confusion del alumnado y ajustar en vivo.',
        'Construir confianza, disciplina y motivacion con el tiempo.',
        'Gestionar apoyos sensibles y dinamicas del aula.'
      ]
    },
    services: {
      en: ['Lesson planning AI', 'Assessment assistants', 'Adaptive tutoring tools'],
      ko: ['수업 계획 AI', '평가 보조 도구', '적응형 튜터링 도구'],
      es: ['IA para planificar clases', 'Asistentes de evaluacion', 'Herramientas de tutoria adaptativa']
    }
  }),
  languageContent: (titles, config) => buildFamily(titles, config, {
    summary: {
      en: (title) => `${title} helps meaning travel across languages, formats, or channels while keeping tone and context intact.`,
      ko: (title) => `${title}는 톤과 맥락을 유지하면서 의미가 언어, 형식, 채널을 넘어 전달되도록 돕습니다.`,
      es: (title) => `${title} ayuda a que el significado viaje entre idiomas, formatos o canales sin perder tono ni contexto.`
    },
    tasks: {
      en: [
        'Adapt wording, structure, or terminology for the audience.',
        'Review nuance, consistency, and contextual fit.',
        'Coordinate revisions when meaning, voice, or intent shifts.'
      ],
      ko: [
        '대상에 맞게 표현, 구조, 용어를 조정합니다.',
        '뉘앙스, 일관성, 맥락 적합성을 검토합니다.',
        '의미, 목소리, 의도가 바뀔 때 수정 방향을 조율합니다.'
      ],
      es: [
        'Adaptar redaccion, estructura o terminologia a la audiencia.',
        'Revisar matiz, consistencia y ajuste contextual.',
        'Coordinar revisiones cuando cambian significado, voz o intencion.'
      ]
    },
    skills: {
      en: ['Writing', 'Editing', 'Context awareness', 'Research'],
      ko: ['글쓰기', '편집', '맥락 이해', '리서치'],
      es: ['Redaccion', 'Edicion', 'Conciencia contextual', 'Investigacion']
    },
    path: {
      en: [
        'Build strong language or content portfolios with real output.',
        'Study domain terminology and audience expectations.',
        'Practice revision judgment, not only first-draft speed.'
      ],
      ko: [
        '실제 산출물이 담긴 언어 또는 콘텐츠 포트폴리오를 만듭니다.',
        '도메인 용어와 대상 독자의 기대를 공부합니다.',
        '초안 속도보다 수정 판단력을 함께 훈련합니다.'
      ],
      es: [
        'Construye portafolios de idioma o contenido con salidas reales.',
        'Estudia terminologia del dominio y expectativas de la audiencia.',
        'Practica criterio de revision, no solo velocidad de borrador.'
      ]
    },
    aiNow: {
      en: 'AI already helps with first drafts, tone variants, localization support, and faster editing loops.',
      ko: 'AI는 이미 초안, 톤 변형, 현지화 지원, 빠른 편집 반복을 돕고 있습니다.',
      es: 'La IA ya ayuda con primeros borradores, variantes de tono, apoyo a localizacion y ciclos de edicion mas rapidos.'
    },
    aiFuture: {
      en: 'Routine content conversion will compress, while nuance, strategy, and high-stakes meaning work stay more human-driven.',
      ko: '일상적인 콘텐츠 변환은 더 줄어들겠지만, 뉘앙스, 전략, 고위험 의미 작업은 더 인간 중심으로 남습니다.',
      es: 'La conversion rutinaria de contenido se comprimira, mientras el matiz, la estrategia y el trabajo de significado de alto impacto seguiran mas humanos.'
    },
    rationale: {
      en: 'Language and content work is highly digital, so AI can do more of the first pass, but judgment still matters when tone or intent is expensive to get wrong.',
      ko: '언어·콘텐츠 업무는 매우 디지털이어서 AI가 1차 작업을 더 많이 할 수 있지만, 톤과 의도를 잘못 잡았을 때 비용이 큰 경우에는 판단이 여전히 중요합니다.',
      es: 'El trabajo de idioma y contenido es muy digital, asi que la IA puede hacer mas del primer paso, pero el criterio sigue importando cuando es costoso fallar en tono o intencion.'
    },
    automatableNow: {
      en: [
        'Creating first drafts, summaries, and terminology suggestions.',
        'Checking consistency across large volumes of text.',
        'Producing fast variants for different audiences or channels.'
      ],
      ko: [
        '초안, 요약, 용어 제안 생성.',
        '대량 텍스트의 일관성 점검.',
        '다른 대상과 채널용 빠른 변형 생성.'
      ],
      es: [
        'Crear primeros borradores, resúmenes y sugerencias terminologicas.',
        'Comprobar consistencia en grandes volúmenes de texto.',
        'Producir variantes rápidas para distintas audiencias o canales.'
      ]
    },
    humanEdge: {
      en: [
        'Protecting tone, context, and cultural fit.',
        'Deciding when the source itself is ambiguous or risky.',
        'Making meaning work under real brand or relationship constraints.'
      ],
      ko: [
        '톤, 맥락, 문화적 적합성을 지키는 일.',
        '원문 자체가 애매하거나 위험할 때 판단하는 일.',
        '브랜드와 관계 제약 속에서 의미를 설계하는 일.'
      ],
      es: [
        'Proteger tono, contexto y adecuacion cultural.',
        'Decidir cuando la fuente es ambigua o riesgosa.',
        'Hacer que el significado funcione bajo restricciones reales de marca o relacion.'
      ]
    },
    services: {
      en: ['Translation AI', 'Content copilots', 'Editorial assistants'],
      ko: ['번역 AI', '콘텐츠 코파일럿', '편집 보조 도구'],
      es: ['IA de traduccion', 'Copilotos de contenido', 'Asistentes editoriales']
    }
  }),
  professionalServices: (titles, config) => buildFamily(titles, config, {
    summary: {
      en: (title) => `${title} interprets rules, records, or people needs to support decisions where mistakes can be costly.`,
      ko: (title) => `${title}는 실수가 비쌀 수 있는 의사결정을 지원하기 위해 규정, 기록, 사람의 필요를 해석합니다.`,
      es: (title) => `${title} interpreta normas, registros o necesidades de personas para apoyar decisiones donde el error puede salir caro.`
    },
    tasks: {
      en: [
        'Review records, documents, or cases against policy and risk.',
        'Advise stakeholders on compliant next steps.',
        'Maintain documentation and follow-through for sensitive decisions.'
      ],
      ko: [
        '기록, 문서, 사례를 정책과 위험 기준으로 검토합니다.',
        '이해관계자에게 규정에 맞는 다음 행동을 조언합니다.',
        '민감한 결정에 필요한 문서와 후속 조치를 유지합니다.'
      ],
      es: [
        'Revisar registros, documentos o casos frente a politica y riesgo.',
        'Asesorar a stakeholders sobre siguientes pasos conformes.',
        'Mantener documentacion y seguimiento para decisiones sensibles.'
      ]
    },
    skills: {
      en: ['Analytical judgment', 'Documentation', 'Policy awareness', 'Stakeholder communication'],
      ko: ['분석 판단력', '문서화', '규정 이해', '이해관계자 커뮤니케이션'],
      es: ['Juicio analitico', 'Documentacion', 'Conciencia normativa', 'Comunicacion con stakeholders']
    },
    path: {
      en: [
        'Build domain knowledge through formal study, internships, or case work.',
        'Learn how records, policy, and compliance interact in real workflows.',
        'Practice judgment on edge cases, not just routine paperwork.'
      ],
      ko: [
        '정규 학습, 인턴십, 사례 업무를 통해 도메인 지식을 쌓습니다.',
        '실제 워크플로에서 기록, 정책, 규정이 어떻게 연결되는지 배웁니다.',
        '반복 서류 업무뿐 아니라 예외 상황의 판단도 훈련합니다.'
      ],
      es: [
        'Construye conocimiento de dominio mediante estudio formal, practicas o casos.',
        'Aprende como interactuan registros, politica y cumplimiento en flujos reales.',
        'Practica criterio en casos limite, no solo papeleo rutinario.'
      ]
    },
    aiNow: {
      en: 'AI already helps with document review, summarization, drafting, and faster policy search.',
      ko: 'AI는 이미 문서 검토, 요약, 초안 작성, 빠른 규정 검색을 돕고 있습니다.',
      es: 'La IA ya ayuda con revision documental, resúmenes, borradores y busqueda rapida de politicas.'
    },
    aiFuture: {
      en: 'More routine analysis will compress, but responsibility, negotiation, and high-stakes judgment stay human-led.',
      ko: '더 많은 반복 분석이 줄어들겠지만, 책임, 협상, 고위험 판단은 여전히 사람이 주도합니다.',
      es: 'Mas analisis rutinario se comprimira, pero la responsabilidad, la negociacion y el juicio de alto impacto seguiran siendo humanos.'
    },
    rationale: {
      en: 'These roles contain structured documentation work, but the final decision often carries legal, financial, or people risk that still needs human ownership.',
      ko: '이 역할에는 구조화된 문서 작업이 많지만, 최종 판단에는 법률·재무·사람 관련 위험이 따르므로 여전히 사람의 책임이 필요합니다.',
      es: 'Estos roles contienen trabajo documental estructurado, pero la decision final suele arrastrar riesgo legal, financiero o humano que aun necesita propiedad humana.'
    },
    automatableNow: {
      en: [
        'Searching policy, summarizing files, and drafting standard documents.',
        'Flagging missing information or inconsistent records.',
        'Producing first-pass analysis from structured inputs.'
      ],
      ko: [
        '정책 검색, 파일 요약, 표준 문서 초안 작성.',
        '누락 정보나 불일치 기록 표시.',
        '구조화된 입력에서 1차 분석 생성.'
      ],
      es: [
        'Buscar politica, resumir expedientes y redactar documentos estandar.',
        'Marcar informacion faltante o registros inconsistentes.',
        'Producir analisis inicial desde entradas estructuradas.'
      ]
    },
    humanEdge: {
      en: [
        'Owning consequences when a judgment call goes wrong.',
        'Interpreting nuance that sits outside clean templates.',
        'Handling trust, conflict, and negotiation with real people.'
      ],
      ko: [
        '판단이 틀렸을 때 결과를 책임지는 일.',
        '깨끗한 템플릿 밖의 미묘한 상황을 해석하는 일.',
        '실제 사람과의 신뢰, 갈등, 협상을 다루는 일.'
      ],
      es: [
        'Asumir consecuencias cuando falla un juicio.',
        'Interpretar matices fuera de plantillas limpias.',
        'Gestionar confianza, conflicto y negociacion con personas reales.'
      ]
    },
    services: {
      en: ['Document review AI', 'Policy search assistants', 'Drafting copilots'],
      ko: ['문서 검토 AI', '정책 검색 보조 도구', '초안 코파일럿'],
      es: ['IA de revision documental', 'Asistentes de busqueda normativa', 'Copilotos de redaccion']
    }
  }),
  clerical: (titles, config) => buildFamily(titles, config, {
    summary: {
      en: (title) => `${title} keeps routine business records, requests, or administrative flows moving on time and in the right format.`,
      ko: (title) => `${title}는 반복적인 비즈니스 기록, 요청, 행정 흐름이 제때 올바른 형식으로 처리되도록 관리합니다.`,
      es: (title) => `${title} mantiene en movimiento registros, solicitudes o flujos administrativos rutinarios a tiempo y en el formato correcto.`
    },
    tasks: {
      en: [
        'Update systems, files, and structured records accurately.',
        'Handle repetitive requests, scheduling, or document routing.',
        'Flag missing information and follow standard procedures.'
      ],
      ko: [
        '시스템, 파일, 구조화된 기록을 정확하게 업데이트합니다.',
        '반복 요청, 일정, 문서 전달을 처리합니다.',
        '누락 정보를 표시하고 표준 절차를 따릅니다.'
      ],
      es: [
        'Actualizar sistemas, archivos y registros estructurados con precision.',
        'Gestionar solicitudes repetitivas, agenda o circulacion documental.',
        'Detectar informacion faltante y seguir procedimientos estandar.'
      ]
    },
    skills: {
      en: ['Attention to detail', 'Process consistency', 'Office software', 'Coordination'],
      ko: ['세부 정확성', '프로세스 일관성', '사무 소프트웨어', '조율 능력'],
      es: ['Atencion al detalle', 'Consistencia de procesos', 'Software de oficina', 'Coordinacion']
    },
    path: {
      en: [
        'Learn common office tools, records handling, and process discipline.',
        'Practice accuracy, turnaround time, and exception handling.',
        'Build trust by showing reliability on repetitive workflows.'
      ],
      ko: [
        '기본 사무 도구, 기록 처리, 프로세스 규율을 익힙니다.',
        '정확성, 처리 속도, 예외 대응을 연습합니다.',
        '반복 워크플로에서 신뢰를 쌓는 것이 중요합니다.'
      ],
      es: [
        'Aprende herramientas de oficina, manejo de registros y disciplina de proceso.',
        'Practica precision, tiempo de respuesta y manejo de excepciones.',
        'Construye confianza mostrando fiabilidad en flujos repetitivos.'
      ]
    },
    aiNow: {
      en: 'AI already handles a growing share of structured entry, scheduling, summarization, and document flow.',
      ko: 'AI는 이미 구조화된 입력, 일정 관리, 요약, 문서 흐름의 큰 부분을 처리하고 있습니다.',
      es: 'La IA ya maneja una parte creciente de entrada estructurada, agenda, resumen y flujo documental.'
    },
    aiFuture: {
      en: 'These roles will shrink toward exceptions, oversight, and higher-touch coordination as routine steps automate further.',
      ko: '이 역할은 반복 단계가 더 자동화되면서 예외 처리, 감독, 더 높은 접점의 조율 쪽으로 줄어들 가능성이 큽니다.',
      es: 'Estos roles tenderan a reducirse hacia excepciones, supervision y coordinacion de mayor contacto a medida que se automaticen mas pasos.'
    },
    rationale: {
      en: 'Clerical work is highly digital and rules-based, which makes a large share of the workflow visible to automation today.',
      ko: '사무 업무는 매우 디지털이고 규칙 기반이어서 워크플로의 큰 부분이 이미 자동화에 노출돼 있습니다.',
      es: 'El trabajo administrativo es muy digital y basado en reglas, lo que hace visible a la automatizacion una gran parte del flujo hoy mismo.'
    },
    automatableNow: {
      en: [
        'Data entry, routing, scheduling, and standard email drafting.',
        'Document extraction and basic record validation.',
        'Following routine rules inside structured workflows.'
      ],
      ko: [
        '데이터 입력, 전달, 일정 관리, 표준 이메일 초안 작성.',
        '문서 추출과 기본 기록 검증.',
        '구조화된 워크플로의 반복 규칙 수행.'
      ],
      es: [
        'Entrada de datos, enrutamiento, agenda y borradores de correo estandar.',
        'Extraccion documental y validacion basica de registros.',
        'Seguir reglas rutinarias dentro de flujos estructurados.'
      ]
    },
    humanEdge: {
      en: [
        'Handling exceptions, ambiguous requests, and sensitive situations.',
        'Cleaning up broken workflows when the system fails.',
        'Coordinating across people who operate outside the template.'
      ],
      ko: [
        '예외, 애매한 요청, 민감한 상황을 다루는 일.',
        '시스템이 실패했을 때 흐름을 복구하는 일.',
        '템플릿 밖에서 움직이는 사람들을 조율하는 일.'
      ],
      es: [
        'Gestionar excepciones, solicitudes ambiguas y situaciones sensibles.',
        'Arreglar flujos rotos cuando falla el sistema.',
        'Coordinar personas que operan fuera de la plantilla.'
      ]
    },
    services: {
      en: ['Document AI', 'Workflow automation', 'Admin copilots'],
      ko: ['문서 AI', '워크플로 자동화', '행정 코파일럿'],
      es: ['IA documental', 'Automatizacion de flujos', 'Copilotos administrativos']
    }
  }),
  customerSupport: (titles, config) => buildFamily(titles, config, {
    summary: {
      en: (title) => `${title} handles repetitive customer questions and routes issues across support conversations and service workflows.`,
      ko: (title) => `${title}는 반복적인 고객 질문을 처리하고 지원 대화와 서비스 워크플로 전반에서 이슈를 분류합니다.`,
      es: (title) => `${title} gestiona preguntas repetitivas de clientes y enruta incidencias entre conversaciones de soporte y flujos de servicio.`
    },
    tasks: {
      en: [
        'Answer routine questions across chat, phone, or inbox channels.',
        'Escalate sensitive or complex cases to the right team.',
        'Keep notes, tags, and outcomes current in support systems.'
      ],
      ko: [
        '채팅, 전화, 인박스 등에서 반복 문의에 답합니다.',
        '민감하거나 복잡한 사례를 적절한 팀으로 넘깁니다.',
        '지원 시스템의 메모, 태그, 결과를 최신으로 유지합니다.'
      ],
      es: [
        'Responder preguntas rutinarias por chat, telefono o bandejas.',
        'Escalar casos sensibles o complejos al equipo correcto.',
        'Mantener al dia notas, etiquetas y resultados en sistemas de soporte.'
      ]
    },
    skills: {
      en: ['Clear communication', 'Empathy', 'Troubleshooting', 'Ticket discipline'],
      ko: ['명확한 소통', '공감 능력', '문제 해결', '티켓 처리 규율'],
      es: ['Comunicacion clara', 'Empatia', 'Resolucion de problemas', 'Disciplina de tickets']
    },
    path: {
      en: [
        'Practice service communication and common escalation flows.',
        'Learn the tools used for chat, CRM, or ticket operations.',
        'Build reliability in handling high-volume repetitive requests.'
      ],
      ko: [
        '서비스 커뮤니케이션과 기본 에스컬레이션 흐름을 연습합니다.',
        '채팅, CRM, 티켓 운영 도구를 익힙니다.',
        '반복 문의를 대량으로 처리하는 신뢰를 쌓습니다.'
      ],
      es: [
        'Practica comunicacion de servicio y escalaciones comunes.',
        'Aprende las herramientas usadas para chat, CRM o tickets.',
        'Construye fiabilidad en el manejo de alto volumen repetitivo.'
      ]
    },
    aiNow: {
      en: 'AI already handles FAQ, summaries, first responses, and ticket routing at scale.',
      ko: 'AI는 이미 FAQ, 요약, 1차 답변, 티켓 분류를 대규모로 처리합니다.',
      es: 'La IA ya maneja FAQ, resúmenes, primeras respuestas y enrutamiento de tickets a escala.'
    },
    aiFuture: {
      en: 'The routine layer will automate further, leaving people more of the exceptions and sensitive interactions.',
      ko: '반복 층은 더 자동화되고 사람은 예외와 민감한 상호작용을 더 많이 맡게 될 것입니다.',
      es: 'La capa rutinaria se automatizara aun mas, dejando a las personas mas excepciones e interacciones sensibles.'
    },
    rationale: {
      en: 'Customer support is highly text-based and repetitive, so AI can absorb a large share of first-line volume.',
      ko: '고객지원은 텍스트 기반 반복 업무가 많아서 AI가 1차 처리량의 큰 부분을 흡수할 수 있습니다.',
      es: 'El soporte es muy textual y repetitivo, por lo que la IA puede absorber gran parte del volumen de primera linea.'
    },
    automatableNow: {
      en: [
        'FAQ responses and standard policy explanations.',
        'Conversation summaries and next-step suggestions.',
        'Classifying, tagging, and routing repetitive tickets.'
      ],
      ko: [
        'FAQ 응답과 기본 정책 설명.',
        '대화 요약과 다음 단계 제안.',
        '반복 티켓 분류, 태깅, 전달.'
      ],
      es: [
        'Respuestas FAQ y explicaciones de politica estandar.',
        'Resúmenes de conversaciones y sugerencias de siguiente paso.',
        'Clasificar, etiquetar y enrutar tickets repetitivos.'
      ]
    },
    humanEdge: {
      en: [
        'Handling emotionally charged calls or complaints.',
        'Owning exceptions that do not fit policy templates.',
        'Protecting trust when the brand is at risk.'
      ],
      ko: [
        '감정적으로 격한 문의나 불만을 다루는 일.',
        '정책 템플릿에 맞지 않는 예외를 책임지는 일.',
        '브랜드가 위험할 때 신뢰를 지키는 일.'
      ],
      es: [
        'Gestionar llamadas o quejas emocionalmente intensas.',
        'Asumir excepciones que no encajan en plantillas de politica.',
        'Proteger la confianza cuando la marca esta en riesgo.'
      ]
    },
    services: {
      en: ['AI chat agents', 'Conversation summarizers', 'Ticket-routing AI'],
      ko: ['AI 채팅 에이전트', '대화 요약 도구', '티켓 분류 AI'],
      es: ['Agentes de chat con IA', 'Resumidores de conversaciones', 'IA de enrutamiento']
    }
  }),
  hospitality: (titles, config) => buildFamily(titles, config, {
    summary: {
      en: (title) => `${title} delivers live guest or passenger service where timing, safety, and composure matter in real time.`,
      ko: (title) => `${title}는 타이밍, 안전, 침착함이 실시간으로 중요한 환경에서 고객 또는 승객 서비스를 제공합니다.`,
      es: (title) => `${title} presta servicio en vivo a huespedes o pasajeros donde importan el tiempo, la seguridad y la compostura en tiempo real.`
    },
    tasks: {
      en: [
        'Greet, guide, and support people during live service moments.',
        'Coordinate requests, timing, and procedures under pressure.',
        'Resolve issues while protecting safety and service quality.'
      ],
      ko: [
        '실시간 서비스 상황에서 고객을 맞이하고 안내하며 지원합니다.',
        '압박 속에서 요청, 시간, 절차를 조율합니다.',
        '안전과 서비스 품질을 지키며 문제를 해결합니다.'
      ],
      es: [
        'Recibir, guiar y apoyar a personas en momentos de servicio en vivo.',
        'Coordinar solicitudes, tiempos y procedimientos bajo presion.',
        'Resolver problemas protegiendo seguridad y calidad del servicio.'
      ]
    },
    skills: {
      en: ['Composure', 'Service judgment', 'Communication', 'Procedure discipline'],
      ko: ['침착함', '서비스 판단', '커뮤니케이션', '절차 준수'],
      es: ['Compostura', 'Criterio de servicio', 'Comunicacion', 'Disciplina procedimental']
    },
    path: {
      en: [
        'Build strong customer-facing experience in live environments.',
        'Learn safety, service, and escalation procedures.',
        'Show reliability when volume, stress, or exceptions spike.'
      ],
      ko: [
        '실시간 현장 서비스 경험을 쌓습니다.',
        '안전, 서비스, 에스컬레이션 절차를 익힙니다.',
        '물량, 스트레스, 예외가 늘어날 때도 신뢰를 보여줘야 합니다.'
      ],
      es: [
        'Construye experiencia fuerte de cara al cliente en entornos en vivo.',
        'Aprende procedimientos de seguridad, servicio y escalacion.',
        'Demuestra fiabilidad cuando suben volumen, estres o excepciones.'
      ]
    },
    aiNow: {
      en: 'AI can help with checklists, summaries, guest messaging, and back-office coordination around service work.',
      ko: 'AI는 체크리스트, 요약, 고객 메시지, 서비스 업무 주변의 백오피스 조율을 도울 수 있습니다.',
      es: 'La IA puede ayudar con checklists, resúmenes, mensajeria a huespedes y coordinacion administrativa alrededor del servicio.'
    },
    aiFuture: {
      en: 'More prep and admin work will automate, but live service and safety interactions stay hard to replace.',
      ko: '준비와 행정 업무는 더 자동화되겠지만, 실시간 서비스와 안전 상호작용은 대체가 어렵습니다.',
      es: 'Mas trabajo previo y administrativo se automatizara, pero el servicio en vivo y las interacciones de seguridad siguen siendo dificiles de reemplazar.'
    },
    rationale: {
      en: 'These roles include some structured coordination, but the core value still happens live with people, safety, and unpredictable requests.',
      ko: '이 역할에는 구조화된 조율이 일부 있지만, 핵심 가치는 여전히 사람, 안전, 예측 불가능한 요청이 있는 현장에서 나옵니다.',
      es: 'Estos roles incluyen cierta coordinacion estructurada, pero el valor central sigue ocurriendo en vivo con personas, seguridad y peticiones imprevisibles.'
    },
    automatableNow: {
      en: [
        'Standard guest messaging and information lookup.',
        'Checklist completion and schedule coordination.',
        'Basic incident summaries and handoff notes.'
      ],
      ko: [
        '표준 고객 메시지와 정보 조회.',
        '체크리스트 처리와 일정 조율.',
        '기본 사고 요약과 인수인계 메모.'
      ],
      es: [
        'Mensajeria estandar a huespedes y consulta de informacion.',
        'Cumplimiento de checklists y coordinacion de agenda.',
        'Resúmenes basicos de incidentes y notas de relevo.'
      ]
    },
    humanEdge: {
      en: [
        'Reading the room and adjusting service live.',
        'Handling stress, emotion, and unexpected safety situations.',
        'Protecting trust in visible public interactions.'
      ],
      ko: [
        '현장 분위기를 읽고 서비스를 실시간으로 조정하는 일.',
        '스트레스, 감정, 예기치 못한 안전 상황을 다루는 일.',
        '눈에 보이는 대면 상호작용에서 신뢰를 지키는 일.'
      ],
      es: [
        'Leer el ambiente y ajustar el servicio en vivo.',
        'Gestionar estres, emocion y situaciones de seguridad inesperadas.',
        'Proteger la confianza en interacciones publicas visibles.'
      ]
    },
    services: {
      en: ['Guest messaging AI', 'Scheduling assistants', 'Service workflow copilots'],
      ko: ['고객 메시지 AI', '일정 보조 도구', '서비스 워크플로 코파일럿'],
      es: ['IA de mensajeria al huesped', 'Asistentes de agenda', 'Copilotos de servicio']
    }
  }),
  handsOnService: (titles, config) => buildFamily(titles, config, {
    summary: {
      en: (title) => `${title} delivers hands-on service, care, or site support in settings where physical presence still matters.`,
      ko: (title) => `${title}는 물리적 현장 대응이 중요한 환경에서 손으로 직접 서비스, 돌봄, 현장 지원을 제공합니다.`,
      es: (title) => `${title} presta servicio, cuidado o apoyo presencial en entornos donde la presencia fisica sigue importando.`
    },
    tasks: {
      en: [
        'Prepare, deliver, or monitor service work directly in person.',
        'Maintain hygiene, safety, or procedure standards during the shift.',
        'Adjust to live requests, pace changes, and physical conditions.'
      ],
      ko: [
        '현장에서 직접 서비스 업무를 준비하고 제공하거나 모니터링합니다.',
        '근무 중 위생, 안전, 절차 기준을 유지합니다.',
        '실시간 요청, 속도 변화, 물리적 조건에 맞춰 조정합니다.'
      ],
      es: [
        'Preparar, prestar o supervisar servicio directamente en persona.',
        'Mantener higiene, seguridad o estandares procedimentales durante el turno.',
        'Adaptarse a solicitudes en vivo, cambios de ritmo y condiciones fisicas.'
      ]
    },
    skills: {
      en: ['Hands-on execution', 'Service awareness', 'Stamina', 'Safety discipline'],
      ko: ['현장 실행력', '서비스 감각', '체력', '안전 의식'],
      es: ['Ejecucion manual', 'Sensibilidad de servicio', 'Resistencia', 'Disciplina de seguridad']
    },
    path: {
      en: [
        'Build practical experience and confidence in live service settings.',
        'Learn hygiene, safety, or client handling standards.',
        'Show consistency, pace control, and calm under pressure.'
      ],
      ko: [
        '실제 서비스 환경에서 실무 경험과 자신감을 쌓습니다.',
        '위생, 안전, 고객 대응 기준을 익힙니다.',
        '일관성, 속도 조절, 압박 속 침착함을 보여줘야 합니다.'
      ],
      es: [
        'Construye experiencia practica y confianza en entornos de servicio real.',
        'Aprende estandares de higiene, seguridad o atencion al cliente.',
        'Demuestra constancia, control del ritmo y calma bajo presion.'
      ]
    },
    aiNow: {
      en: 'AI mostly helps around scheduling, inventory, scripts, and admin support rather than replacing the physical core of the work.',
      ko: 'AI는 주로 일정, 재고, 스크립트, 행정 지원을 돕고 있으며, 물리적인 핵심 업무 자체를 대체하진 않습니다.',
      es: 'La IA ayuda sobre todo con agenda, inventario, guiones y apoyo administrativo, mas que reemplazar el nucleo fisico del trabajo.'
    },
    aiFuture: {
      en: 'These roles will gain more AI support around prep and coordination, but in-person execution stays central.',
      ko: '이 직무는 준비와 조율에서 더 많은 AI 지원을 받겠지만, 대면 실행은 여전히 핵심입니다.',
      es: 'Estos roles ganaran mas apoyo de IA en preparacion y coordinacion, pero la ejecucion presencial seguira siendo central.'
    },
    rationale: {
      en: 'The work includes some repeatable prep steps, but much of the value still happens through physical presence, timing, and human interaction.',
      ko: '이 업무에는 반복 가능한 준비 단계가 일부 있지만, 가치의 큰 부분은 여전히 물리적 현장 대응과 타이밍, 인간 상호작용에서 나옵니다.',
      es: 'El trabajo incluye pasos repetibles de preparacion, pero gran parte del valor sigue ocurriendo mediante presencia fisica, timing e interaccion humana.'
    },
    automatableNow: {
      en: [
        'Schedules, prep lists, stock checks, and scripted guidance.',
        'Basic vision support for quality or safety checks.',
        'Administrative follow-up after service delivery.'
      ],
      ko: [
        '일정, 준비 리스트, 재고 점검, 스크립트 가이드.',
        '품질이나 안전 점검을 위한 기본 시각 지원.',
        '서비스 후속 행정 업무.'
      ],
      es: [
        'Agendas, listas de preparacion, control de stock y guias guionizadas.',
        'Apoyo visual basico para calidad o seguridad.',
        'Seguimiento administrativo despues del servicio.'
      ]
    },
    humanEdge: {
      en: [
        'Handling unpredictable people, timing, and physical environments.',
        'Providing trust, comfort, or calm in person.',
        'Adapting hands-on work when the situation changes quickly.'
      ],
      ko: [
        '예측하기 어려운 사람, 타이밍, 물리적 환경을 다루는 일.',
        '직접 신뢰, 편안함, 안정을 제공하는 일.',
        '상황이 빨리 바뀔 때 손으로 하는 작업을 조정하는 일.'
      ],
      es: [
        'Gestionar personas, tiempos y entornos fisicos impredecibles.',
        'Aportar confianza, comodidad o calma en persona.',
        'Adaptar el trabajo manual cuando la situacion cambia rapido.'
      ]
    },
    services: {
      en: ['Scheduling AI', 'Inventory assistants', 'Service prep copilots'],
      ko: ['일정 AI', '재고 보조 도구', '서비스 준비 코파일럿'],
      es: ['IA de agenda', 'Asistentes de inventario', 'Copilotos de preparacion']
    }
  }),
  salesCommerce: (titles, config) => buildFamily(titles, config, {
    summary: {
      en: (title) => `${title} matches offers to customer needs and moves conversations toward a transaction or commercial result.`,
      ko: (title) => `${title}는 제안과 고객 요구를 맞추고 대화를 거래나 상업적 결과로 이끕니다.`,
      es: (title) => `${title} conecta ofertas con necesidades del cliente y lleva las conversaciones hacia una transaccion o resultado comercial.`
    },
    tasks: {
      en: [
        'Qualify needs and explain options clearly.',
        'Follow up through pipeline steps until the decision moves.',
        'Maintain records, proposals, and post-sale coordination.'
      ],
      ko: [
        '요구를 파악하고 선택지를 명확하게 설명합니다.',
        '결정이 움직일 때까지 파이프라인 단계를 추적합니다.',
        '기록, 제안서, 판매 후 조율을 유지합니다.'
      ],
      es: [
        'Detectar necesidades y explicar opciones con claridad.',
        'Hacer seguimiento del pipeline hasta que avance la decision.',
        'Mantener registros, propuestas y coordinacion posventa.'
      ]
    },
    skills: {
      en: ['Communication', 'Persuasion', 'Product knowledge', 'Follow-through'],
      ko: ['커뮤니케이션', '설득력', '제품 이해', '후속 실행력'],
      es: ['Comunicacion', 'Persuasion', 'Conocimiento del producto', 'Seguimiento']
    },
    path: {
      en: [
        'Build confidence in customer communication and objections handling.',
        'Learn CRM discipline, proposal writing, and negotiation basics.',
        'Show that you can keep a pipeline moving consistently.'
      ],
      ko: [
        '고객 소통과 이의 대응 역량을 키웁니다.',
        'CRM 규율, 제안서 작성, 기본 협상을 익힙니다.',
        '파이프라인을 꾸준히 움직일 수 있다는 증거를 만듭니다.'
      ],
      es: [
        'Construye confianza en comunicacion con clientes y manejo de objeciones.',
        'Aprende disciplina CRM, redaccion de propuestas y negociacion basica.',
        'Demuestra que puedes mover un pipeline con constancia.'
      ]
    },
    aiNow: {
      en: 'AI already helps with lead research, outreach drafts, proposal support, and follow-up prioritization.',
      ko: 'AI는 이미 리드 조사, 아웃리치 초안, 제안서 지원, 후속 우선순위 결정을 돕고 있습니다.',
      es: 'La IA ya ayuda con investigacion de leads, borradores de outreach, apoyo a propuestas y priorizacion de seguimiento.'
    },
    aiFuture: {
      en: 'More pipeline admin will automate, but trust-building, negotiation, and closing judgment remain human-heavy.',
      ko: '파이프라인 행정은 더 자동화되겠지만, 신뢰 형성, 협상, 클로징 판단은 여전히 사람 비중이 높습니다.',
      es: 'Mas administracion del pipeline se automatizara, pero la construccion de confianza, la negociacion y el cierre seguiran siendo muy humanos.'
    },
    rationale: {
      en: 'Sales work has structured CRM and messaging layers that AI can speed up, but real deals still depend on trust and timing with people.',
      ko: '영업에는 AI가 빠르게 만들 수 있는 CRM과 메시징 층이 있지만, 실제 계약은 여전히 사람과의 신뢰와 타이밍에 달려 있습니다.',
      es: 'El trabajo comercial tiene capas de CRM y mensajeria que la IA puede acelerar, pero los acuerdos reales siguen dependiendo de confianza y timing con personas.'
    },
    automatableNow: {
      en: [
        'Lead research, message drafts, and follow-up reminders.',
        'Proposal scaffolding and CRM updates.',
        'Scoring opportunities from structured pipeline data.'
      ],
      ko: [
        '리드 조사, 메시지 초안, 후속 알림.',
        '제안서 뼈대와 CRM 업데이트.',
        '구조화된 파이프라인 데이터에서 기회 점수화.'
      ],
      es: [
        'Investigacion de leads, borradores de mensajes y recordatorios.',
        'Estructura de propuestas y actualizaciones CRM.',
        'Calificar oportunidades con datos estructurados.'
      ]
    },
    humanEdge: {
      en: [
        'Reading trust, hesitation, and intent in live conversations.',
        'Negotiating price, timing, and risk with real stakes.',
        'Closing deals where relationships matter over time.'
      ],
      ko: [
        '실시간 대화에서 신뢰, 망설임, 의도를 읽는 일.',
        '실제 이해관계가 걸린 가격, 타이밍, 위험을 협상하는 일.',
        '관계가 중요한 거래를 장기적으로 성사시키는 일.'
      ],
      es: [
        'Leer confianza, duda e intencion en conversaciones reales.',
        'Negociar precio, tiempo y riesgo con impacto real.',
        'Cerrar acuerdos donde la relacion importa con el tiempo.'
      ]
    },
    services: {
      en: ['Lead generation AI', 'Proposal copilots', 'CRM assistants'],
      ko: ['리드 생성 AI', '제안서 코파일럿', 'CRM 보조 도구'],
      es: ['IA de generacion de leads', 'Copilotos de propuestas', 'Asistentes CRM']
    }
  }),
  agriculture: (titles, config) => buildFamily(titles, config, {
    summary: {
      en: (title) => `${title} manages production work in outdoor or livestock environments where weather, biology, and timing drive the job.`,
      ko: (title) => `${title}는 날씨, 생물학, 타이밍이 큰 영향을 주는 야외 또는 축산 환경에서 생산 작업을 관리합니다.`,
      es: (title) => `${title} gestiona trabajo productivo en entornos agricolas o ganaderos donde el clima, la biologia y el tiempo mandan.`
    },
    tasks: {
      en: [
        'Monitor crops, animals, equipment, and seasonal conditions.',
        'Adjust feeding, treatment, planting, or harvest decisions.',
        'Keep production moving despite variable weather and field constraints.'
      ],
      ko: [
        '작물, 가축, 장비, 계절 조건을 점검합니다.',
        '급이, 처치, 파종, 수확 결정을 조정합니다.',
        '변동하는 날씨와 현장 제약 속에서도 생산을 유지합니다.'
      ],
      es: [
        'Monitorizar cultivos, animales, equipos y condiciones estacionales.',
        'Ajustar decisiones de alimentacion, tratamiento, siembra o cosecha.',
        'Mantener la produccion pese al clima variable y las restricciones del campo.'
      ]
    },
    skills: {
      en: ['Field judgment', 'Equipment use', 'Safety', 'Operational resilience'],
      ko: ['현장 판단', '장비 활용', '안전', '운영 회복력'],
      es: ['Juicio de campo', 'Uso de equipos', 'Seguridad', 'Resiliencia operativa']
    },
    path: {
      en: [
        'Build practical field experience across seasons and operating cycles.',
        'Learn equipment, safety, maintenance, and output tracking.',
        'Develop judgment around timing, weather, and risk.'
      ],
      ko: [
        '계절과 운영 주기를 거치며 현장 경험을 쌓습니다.',
        '장비, 안전, 정비, 생산 추적을 익힙니다.',
        '시기, 날씨, 위험에 대한 판단을 키웁니다.'
      ],
      es: [
        'Construye experiencia de campo a traves de estaciones y ciclos productivos.',
        'Aprende equipos, seguridad, mantenimiento y control de produccion.',
        'Desarrolla criterio sobre tiempo, clima y riesgo.'
      ]
    },
    aiNow: {
      en: 'AI already supports sensing, forecasting, route planning, and production optimization around agricultural work.',
      ko: 'AI는 이미 농업 작업 주변의 감지, 예측, 경로 계획, 생산 최적화를 돕고 있습니다.',
      es: 'La IA ya apoya sensorizacion, prediccion, planificacion y optimizacion productiva alrededor del trabajo agricola.'
    },
    aiFuture: {
      en: 'More sensing and machinery automation will arrive, but local judgment under variable field conditions remains important.',
      ko: '더 많은 센싱과 기계 자동화가 오겠지만, 변동하는 현장 조건 속의 지역 판단은 여전히 중요합니다.',
      es: 'Llegara mas sensorizacion y automatizacion de maquinaria, pero el juicio local bajo condiciones variables de campo sigue importando.'
    },
    rationale: {
      en: 'Agricultural work is getting more data-driven, but biological variability and changing field conditions slow full automation.',
      ko: '농업은 점점 더 데이터 기반이 되지만, 생물학적 변동성과 바뀌는 현장 조건이 완전 자동화를 늦춥니다.',
      es: 'El trabajo agricola es cada vez mas orientado a datos, pero la variabilidad biologica y las condiciones cambiantes frenan la automatizacion total.'
    },
    automatableNow: {
      en: [
        'Monitoring, sensing, and forecast-based recommendations.',
        'Route and coverage optimization for repetitive field work.',
        'Recordkeeping around input use, output, and maintenance.'
      ],
      ko: [
        '모니터링, 센싱, 예측 기반 추천.',
        '반복 현장 작업의 경로·범위 최적화.',
        '투입재, 생산량, 정비 기록 관리.'
      ],
      es: [
        'Monitorizacion, sensorizacion y recomendaciones basadas en prediccion.',
        'Optimizacion de rutas y cobertura para trabajo repetitivo.',
        'Registro de insumos, produccion y mantenimiento.'
      ]
    },
    humanEdge: {
      en: [
        'Adapting when biology or weather breaks the model.',
        'Working around terrain, timing, and equipment reality.',
        'Making local decisions where conditions change hour by hour.'
      ],
      ko: [
        '생물이나 날씨가 모델을 벗어날 때 대응하는 일.',
        '지형, 시기, 장비 현실에 맞춰 움직이는 일.',
        '상황이 시간 단위로 바뀌는 현장에서 지역 판단을 하는 일.'
      ],
      es: [
        'Adaptarse cuando la biologia o el clima rompen el modelo.',
        'Trabajar segun terreno, tiempo y realidad del equipo.',
        'Tomar decisiones locales cuando las condiciones cambian hora a hora.'
      ]
    },
    services: {
      en: ['Precision ag AI', 'Sensing systems', 'Forecasting assistants'],
      ko: ['정밀농업 AI', '센싱 시스템', '예측 보조 도구'],
      es: ['IA de agricultura de precision', 'Sistemas de sensorizacion', 'Asistentes de prediccion']
    }
  }),
  skilledTrade: (titles, config) => buildFamily(titles, config, {
    summary: {
      en: (title) => `${title} installs, repairs, fabricates, or diagnoses physical systems in environments that remain messy and variable.`,
      ko: (title) => `${title}는 여전히 복잡하고 변수가 많은 현장에서 물리적 시스템을 설치, 수리, 제작, 진단합니다.`,
      es: (title) => `${title} instala, repara, fabrica o diagnostica sistemas fisicos en entornos que siguen siendo variables y complejos.`
    },
    tasks: {
      en: [
        'Inspect equipment or structures and diagnose faults on site.',
        'Install, repair, test, or fabricate components safely.',
        'Work around codes, hazards, tools, and changing field conditions.'
      ],
      ko: [
        '현장에서 장비나 구조물을 점검하고 고장을 진단합니다.',
        '부품을 안전하게 설치, 수리, 시험, 제작합니다.',
        '법규, 위험, 공구, 변화하는 현장 조건에 맞춰 일합니다.'
      ],
      es: [
        'Inspeccionar equipos o estructuras y diagnosticar fallas en terreno.',
        'Instalar, reparar, probar o fabricar componentes con seguridad.',
        'Trabajar con normativa, riesgos, herramientas y condiciones cambiantes.'
      ]
    },
    skills: {
      en: ['Hands-on precision', 'Safety discipline', 'Fault diagnosis', 'Tool fluency'],
      ko: ['손기술', '안전 의식', '고장 진단', '도구 숙련도'],
      es: ['Precision manual', 'Disciplina de seguridad', 'Diagnostico de fallas', 'Soltura con herramientas']
    },
    path: {
      en: [
        'Build practical hours through apprenticeships, shop work, or supervised field roles.',
        'Learn codes, diagnostics, safety, and maintenance routines.',
        'Earn licenses or trade credentials where the market expects them.'
      ],
      ko: [
        '도제, 작업장, 감독하 현장 역할을 통해 실무 시간을 쌓습니다.',
        '법규, 진단, 안전, 정비 루틴을 익힙니다.',
        '시장 요구가 있는 경우 자격증이나 기능 자격을 취득합니다.'
      ],
      es: [
        'Construye horas practicas mediante aprendizaje, taller o trabajo supervisado.',
        'Aprende normativa, diagnostico, seguridad y rutinas de mantenimiento.',
        'Obtén licencias o credenciales tecnicas donde el mercado las espere.'
      ]
    },
    aiNow: {
      en: 'AI already helps with quoting, diagnostics, documentation, and faster lookup around trade work.',
      ko: 'AI는 이미 견적, 진단, 문서화, 빠른 정보 조회를 통해 기술직 업무를 보조합니다.',
      es: 'La IA ya ayuda con presupuestos, diagnostico, documentacion y consulta rapida alrededor del trabajo tecnico.'
    },
    aiFuture: {
      en: 'Narrow tasks may automate further, but full replacement remains difficult because the physical environment keeps changing.',
      ko: '좁은 작업은 더 자동화될 수 있지만, 물리적 환경이 계속 바뀌기 때문에 완전 대체는 어렵습니다.',
      es: 'Las tareas estrechas pueden automatizarse mas, pero el reemplazo total sigue siendo dificil porque el entorno fisico cambia constantemente.'
    },
    rationale: {
      en: 'Trade work gains AI around diagnostics and admin, but the core value still depends on dexterity, site judgment, and safety.',
      ko: '기술직은 진단과 행정에서 AI 도움을 더 받지만, 핵심 가치는 여전히 손기술, 현장 판단, 안전에 달려 있습니다.',
      es: 'El oficio gana IA en diagnostico y administracion, pero el valor central sigue dependiendo de destreza, criterio de sitio y seguridad.'
    },
    automatableNow: {
      en: [
        'Quotes, parts lookup, documentation, and procedure checklists.',
        'Pattern detection from images, logs, or sensor data.',
        'Drafting work summaries and maintenance notes.'
      ],
      ko: [
        '견적, 부품 조회, 문서화, 절차 체크리스트.',
        '이미지, 로그, 센서 데이터에서 패턴 감지.',
        '작업 요약과 정비 메모 초안 작성.'
      ],
      es: [
        'Presupuestos, busqueda de piezas, documentacion y checklists.',
        'Deteccion de patrones en imagenes, logs o sensores.',
        'Redaccion de resúmenes de trabajo y notas de mantenimiento.'
      ]
    },
    humanEdge: {
      en: [
        'Adapting work safely when conditions do not match the plan.',
        'Using hands, tools, and judgment in tight physical spaces.',
        'Owning sign-off and accountability for field quality.'
      ],
      ko: [
        '상황이 계획과 다를 때도 안전하게 대응하는 일.',
        '좁고 복잡한 현장에서 손, 도구, 판단을 함께 쓰는 일.',
        '현장 품질에 대한 최종 책임을 지는 일.'
      ],
      es: [
        'Adaptar el trabajo con seguridad cuando las condiciones no coinciden con el plan.',
        'Usar manos, herramientas y criterio en espacios fisicos complejos.',
        'Asumir firma y responsabilidad por la calidad en terreno.'
      ]
    },
    services: {
      en: ['Diagnostic assistants', 'Field-service AI', 'Quote automation tools'],
      ko: ['진단 보조 도구', '현장 서비스 AI', '견적 자동화 도구'],
      es: ['Asistentes de diagnostico', 'IA de servicio en campo', 'Herramientas de presupuesto']
    }
  }),
  machineTransport: (titles, config) => buildFamily(titles, config, {
    summary: {
      en: (title) => `${title} operates vehicles or equipment under safety, routing, and throughput constraints that make the workflow measurable and automatable in parts.`,
      ko: (title) => `${title}는 안전, 경로, 처리량 제약 속에서 차량이나 장비를 조작하며, 그만큼 업무의 일부가 측정되고 자동화되기 쉽습니다.`,
      es: (title) => `${title} opera vehiculos o equipos bajo restricciones de seguridad, ruta y productividad, lo que vuelve partes del flujo medibles y automatizables.`
    },
    tasks: {
      en: [
        'Operate equipment or vehicles within safety rules and throughput targets.',
        'Monitor routes, loads, machine status, or line conditions.',
        'Respond to stoppages, hazards, or exceptions during the shift.'
      ],
      ko: [
        '안전 규칙과 처리 목표 안에서 장비나 차량을 조작합니다.',
        '경로, 적재, 기계 상태, 라인 조건을 모니터링합니다.',
        '근무 중 중단, 위험, 예외 상황에 대응합니다.'
      ],
      es: [
        'Operar equipos o vehiculos dentro de reglas de seguridad y objetivos de rendimiento.',
        'Monitorizar rutas, cargas, estado de maquinas o condiciones de linea.',
        'Responder a paradas, riesgos o excepciones durante el turno.'
      ]
    },
    skills: {
      en: ['Safety discipline', 'Situational awareness', 'Equipment handling', 'Process consistency'],
      ko: ['안전 의식', '상황 인지', '장비 조작', '프로세스 일관성'],
      es: ['Disciplina de seguridad', 'Conciencia situacional', 'Manejo de equipos', 'Consistencia de proceso']
    },
    path: {
      en: [
        'Train on equipment, safety rules, and workplace procedures.',
        'Build reliable shift performance and incident awareness.',
        'Develop confidence in handling exceptions without creating risk.'
      ],
      ko: [
        '장비, 안전 규칙, 현장 절차 교육을 받습니다.',
        '신뢰할 수 있는 교대 성과와 사고 인지 역량을 쌓습니다.',
        '위험을 키우지 않고 예외를 처리하는 자신감을 키웁니다.'
      ],
      es: [
        'Formate en equipos, reglas de seguridad y procedimientos del lugar.',
        'Construye rendimiento fiable por turno y conciencia de incidentes.',
        'Desarrolla confianza para manejar excepciones sin generar mas riesgo.'
      ]
    },
    aiNow: {
      en: 'AI already helps with routing, camera detection, predictive maintenance, and optimization around machine and transport work.',
      ko: 'AI는 이미 기계·운송 업무 주변에서 경로, 카메라 감지, 예지 정비, 최적화를 돕고 있습니다.',
      es: 'La IA ya ayuda con ruteo, deteccion por camara, mantenimiento predictivo y optimizacion alrededor del trabajo de maquinas y transporte.'
    },
    aiFuture: {
      en: 'Automation pressure is stronger here than in many physical jobs because the environment is measurable, though safety exceptions still matter.',
      ko: '이 영역은 환경이 측정 가능해 다른 물리 직무보다 자동화 압력이 더 강하지만, 안전 예외는 여전히 중요합니다.',
      es: 'La presion de automatizacion es mas fuerte aqui que en muchos trabajos fisicos porque el entorno es medible, aunque las excepciones de seguridad siguen importando.'
    },
    rationale: {
      en: 'Vehicle and machine work often runs through structured routes, lines, or safety rules, which makes it more exposed than open-ended field work.',
      ko: '차량·기계 작업은 구조화된 경로, 라인, 안전 규칙을 따르는 경우가 많아 개방형 현장 작업보다 더 자동화에 노출됩니다.',
      es: 'El trabajo de vehiculos y maquinas suele pasar por rutas, lineas o reglas estructuradas, lo que lo expone mas que el trabajo de campo abierto.'
    },
    automatableNow: {
      en: [
        'Routing, scheduling, and throughput optimization.',
        'Monitoring cameras, sensors, and equipment alerts.',
        'Logging repetitive machine or transport events.'
      ],
      ko: [
        '경로, 일정, 처리량 최적화.',
        '카메라, 센서, 장비 경고 모니터링.',
        '반복적인 기계·운송 이벤트 기록.'
      ],
      es: [
        'Optimizacion de rutas, agenda y rendimiento.',
        'Monitorizar camaras, sensores y alertas de equipos.',
        'Registrar eventos repetitivos de maquina o transporte.'
      ]
    },
    humanEdge: {
      en: [
        'Handling edge cases where safety conditions break the model.',
        'Taking responsibility when physical risk rises suddenly.',
        'Working around imperfect infrastructure and mixed environments.'
      ],
      ko: [
        '안전 조건이 모델을 벗어나는 예외를 처리하는 일.',
        '물리적 위험이 갑자기 높아질 때 책임을 지는 일.',
        '완벽하지 않은 인프라와 혼합 환경에서 일하는 일.'
      ],
      es: [
        'Gestionar casos limite donde la seguridad rompe el modelo.',
        'Asumir responsabilidad cuando el riesgo fisico sube de golpe.',
        'Trabajar con infraestructura imperfecta y entornos mixtos.'
      ]
    },
    services: {
      en: ['Routing AI', 'Predictive maintenance', 'Machine monitoring tools'],
      ko: ['경로 최적화 AI', '예지 정비', '기계 모니터링 도구'],
      es: ['IA de ruteo', 'Mantenimiento predictivo', 'Herramientas de monitoreo']
    }
  }),
  labor: (titles, config) => buildFamily(titles, config, {
    summary: {
      en: (title) => `${title} provides physical support work across sites, facilities, warehousing, or delivery operations where execution speed matters.`,
      ko: (title) => `${title}는 속도가 중요한 현장, 시설, 창고, 배송 운영에서 물리적 지원 업무를 수행합니다.`,
      es: (title) => `${title} presta trabajo fisico de apoyo en sitios, instalaciones, almacenes o reparto donde importa la velocidad de ejecucion.`
    },
    tasks: {
      en: [
        'Move, clean, stage, or deliver materials and spaces safely.',
        'Follow shift instructions, timing, and site procedures.',
        'Respond to physical workload changes and basic exception handling.'
      ],
      ko: [
        '자재나 공간을 안전하게 이동, 청소, 적치, 배송합니다.',
        '교대 지시, 시간, 현장 절차를 따릅니다.',
        '물리적 작업량 변화와 기본 예외 상황에 대응합니다.'
      ],
      es: [
        'Mover, limpiar, preparar o entregar materiales y espacios con seguridad.',
        'Seguir instrucciones de turno, tiempo y procedimientos del sitio.',
        'Responder a cambios de carga fisica y manejo basico de excepciones.'
      ]
    },
    skills: {
      en: ['Reliability', 'Physical stamina', 'Safety awareness', 'Task discipline'],
      ko: ['신뢰성', '체력', '안전 의식', '작업 규율'],
      es: ['Fiabilidad', 'Resistencia fisica', 'Conciencia de seguridad', 'Disciplina de tarea']
    },
    path: {
      en: [
        'Build dependable shift habits and site safety discipline.',
        'Learn equipment basics, handling rules, and workflow timing.',
        'Show consistency under pressure and variable physical demand.'
      ],
      ko: [
        '신뢰할 수 있는 근무 습관과 현장 안전 규율을 만듭니다.',
        '장비 기초, 취급 규칙, 작업 타이밍을 익힙니다.',
        '압박과 변동하는 체력 수요 속에서도 일관성을 보여줍니다.'
      ],
      es: [
        'Construye habitos de turno fiables y disciplina de seguridad.',
        'Aprende bases de equipos, normas de manejo y tiempos del flujo.',
        'Demuestra constancia bajo presion y demanda fisica variable.'
      ]
    },
    aiNow: {
      en: 'AI and robotics already support planning, routing, monitoring, and narrow repetitive tasks around this work.',
      ko: 'AI와 로봇은 이미 이 업무 주변의 계획, 경로, 모니터링, 좁은 반복 작업을 지원합니다.',
      es: 'La IA y la robotica ya apoyan planificacion, ruteo, monitoreo y tareas repetitivas estrechas alrededor de este trabajo.'
    },
    aiFuture: {
      en: 'Automation pressure will rise where environments become more structured, though mixed human environments still slow full replacement.',
      ko: '환경이 더 구조화될수록 자동화 압력이 커지겠지만, 사람이 섞여 있는 복합 환경은 완전 대체를 늦춥니다.',
      es: 'La presion de automatizacion crecera donde los entornos sean mas estructurados, aunque los contextos humanos mixtos frenan el reemplazo total.'
    },
    rationale: {
      en: 'These jobs contain repetitive physical steps that are visible to machines, but full replacement depends on how controlled the environment becomes.',
      ko: '이 직무에는 기계가 보기 쉬운 반복 물리 단계가 많지만, 완전 대체는 환경이 얼마나 통제되느냐에 달려 있습니다.',
      es: 'Estos trabajos contienen pasos fisicos repetitivos visibles para las maquinas, pero el reemplazo total depende de cuan controlado se vuelva el entorno.'
    },
    automatableNow: {
      en: [
        'Routing, staging, and monitoring repetitive movement.',
        'Basic cleaning, picking, or handling in controlled spaces.',
        'Tracking completion, timing, and facility status.'
      ],
      ko: [
        '반복 이동의 경로, 적치, 모니터링.',
        '통제된 공간에서의 기본 청소, 피킹, 취급.',
        '완료 여부, 시간, 시설 상태 추적.'
      ],
      es: [
        'Ruteo, preparacion y monitoreo de movimientos repetitivos.',
        'Limpieza, picking o manejo basico en espacios controlados.',
        'Seguimiento de cumplimiento, tiempos y estado de instalaciones.'
      ]
    },
    humanEdge: {
      en: [
        'Working around mixed traffic, unsafe terrain, or changing layouts.',
        'Handling unusual loads and unpredictable site requests.',
        'Recovering quickly when the plan breaks in the real world.'
      ],
      ko: [
        '혼합 동선, 위험한 지형, 바뀌는 배치 속에서 일하는 일.',
        '비정형 물량과 예기치 않은 현장 요청을 처리하는 일.',
        '현실에서 계획이 깨졌을 때 빠르게 복구하는 일.'
      ],
      es: [
        'Trabajar con trafico mixto, terreno inseguro o layouts cambiantes.',
        'Gestionar cargas inusuales y peticiones imprevisibles del sitio.',
        'Recuperarse rapido cuando el plan se rompe en el mundo real.'
      ]
    },
    services: {
      en: ['Routing assistants', 'Warehouse robotics', 'Facility monitoring AI'],
      ko: ['경로 보조 도구', '창고 로봇', '시설 모니터링 AI'],
      es: ['Asistentes de ruteo', 'Robotica de almacen', 'IA de monitoreo']
    }
  })
};

function createRoleConfigs() {
  const URLS = {
    microsoftCopilot: 'https://www.microsoft.com/en-us/microsoft-365/copilot',
    notionAI: 'https://www.notion.so/product/ai',
    dragonCopilot: 'https://www.microsoft.com/en-us/microsoft-cloud/healthcare/dragon-copilot',
    nuanceHealthcare: 'https://www.nuance.com/healthcare.html',
    canvaMagicDesign: 'https://www.canva.com/magic-design/',
    adobeFirefly: 'https://www.adobe.com/products/firefly.html',
    githubCopilot: 'https://github.com/features/copilot',
    amazonQ: 'https://aws.amazon.com/q/developer/',
    magicschool: 'https://www.magicschool.ai/',
    khanmigo: 'https://www.khanacademy.org/khan-labs',
    deepl: 'https://www.deepl.com/translator',
    smartcat: 'https://www.smartcat.com/ai-translator/',
    chatgpt: 'https://openai.com/chatgpt/overview/',
    googleGeminiWorkspace: 'https://workspace.google.com/products/gemini/',
    intercomFin: 'https://fin.ai',
    zendeskAI: 'https://www.zendesk.com/ai/',
    salesforceAI: 'https://www.salesforce.com/artificial-intelligence/',
    hubspotAI: 'https://www.hubspot.com/artificial-intelligence',
    johnDeereAutonomy: 'https://www.deere.com/en/autonomous-tractor/',
    johnDeerePrecision: 'https://www.deere.com/en/technology-products/precision-ag-technology/',
    serviceTitanAI: 'https://www.servicetitan.com/ai',
    electricAI: 'https://electricai.app/',
    waymo: 'https://waymo.com/',
    samsaraAI: 'https://www.samsara.com/platform/artificial-intelligence',
    symbotic: 'https://www.symbotic.com/',
    locus: 'https://locusrobotics.com/'
  };

  const refs = {
    management: [
      { name: 'Microsoft 365 Copilot', url: URLS.microsoftCopilot },
      { name: 'Notion AI', url: URLS.notionAI }
    ],
    healthcare: [
      { name: 'Microsoft Dragon Copilot', url: URLS.dragonCopilot },
      { name: 'Nuance Healthcare', url: URLS.nuanceHealthcare }
    ],
    creative: [
      { name: 'Canva Magic Design', url: URLS.canvaMagicDesign },
      { name: 'Adobe Firefly', url: URLS.adobeFirefly }
    ],
    technical: [
      { name: 'GitHub Copilot', url: URLS.githubCopilot },
      { name: 'Amazon Q Developer', url: URLS.amazonQ }
    ],
    education: [
      { name: 'MagicSchool AI', url: URLS.magicschool },
      { name: 'Khanmigo', url: URLS.khanmigo }
    ],
    language: [
      { name: 'DeepL Translator', url: URLS.deepl },
      { name: 'Smartcat AI Translator', url: URLS.smartcat }
    ],
    professional: [
      { name: 'Microsoft 365 Copilot', url: URLS.microsoftCopilot },
      { name: 'ChatGPT', url: URLS.chatgpt }
    ],
    clerical: [
      { name: 'Google Workspace Gemini', url: URLS.googleGeminiWorkspace },
      { name: 'Microsoft 365 Copilot', url: URLS.microsoftCopilot }
    ],
    customerSupport: [
      { name: 'Intercom Fin', url: URLS.intercomFin },
      { name: 'Zendesk AI', url: URLS.zendeskAI }
    ],
    hospitality: [
      { name: 'Salesforce AI', url: URLS.salesforceAI },
      { name: 'Microsoft 365 Copilot', url: URLS.microsoftCopilot }
    ],
    handsOnService: [
      { name: 'ChatGPT', url: URLS.chatgpt },
      { name: 'Microsoft 365 Copilot', url: URLS.microsoftCopilot }
    ],
    sales: [
      { name: 'HubSpot AI', url: URLS.hubspotAI },
      { name: 'Salesforce AI', url: URLS.salesforceAI }
    ],
    agriculture: [
      { name: 'John Deere Autonomous Tractor', url: URLS.johnDeereAutonomy },
      { name: 'John Deere Precision Ag', url: URLS.johnDeerePrecision }
    ],
    skilledTrade: [
      { name: 'ServiceTitan AI', url: URLS.serviceTitanAI },
      { name: 'Electric AI', url: URLS.electricAI }
    ],
    machine: [
      { name: 'Waymo', url: URLS.waymo },
      { name: 'Samsara AI', url: URLS.samsaraAI }
    ],
    labor: [
      { name: 'Symbotic', url: URLS.symbotic },
      { name: 'Locus Robotics', url: URLS.locus }
    ]
  };

  return {
    'operations-manager': role('management', 'management', 47, 'hybrid', 'preferred', 'bachelor', null, refs.management),
    'product-manager': role('management', 'management', 44, 'hybrid', 'preferred', 'bachelor', null, refs.management),
    'finance-manager': role('management', 'management', 46, 'hybrid', 'preferred', 'bachelor', null, refs.management),
    'retail-manager': role('management', 'management', 52, 'hybrid', 'optional', 'none', null, refs.management),
    'marketing-manager': role('management', 'management', 61, 'hybrid', 'preferred', 'bachelor', null, refs.management),
    'pharmacist': role('healthcare', 'care', 26, 'enhance', 'required', 'bachelor', null, refs.healthcare),
    'physical-therapist': role('healthcare', 'care', 19, 'enhance', 'required', 'bachelor', null, refs.healthcare),
    'dental-hygienist': role('healthcare', 'care', 24, 'enhance', 'preferred', 'bachelor', null, refs.healthcare),
    'graphic-designer': role('creative', 'design', 66, 'hybrid', 'preferred', 'bachelor', URLS.canvaMagicDesign, refs.creative),
    'industrial-designer': role('creative', 'design', 48, 'enhance', 'preferred', 'bachelor', null, refs.creative),
    'video-editor': role('creative', 'design', 69, 'hybrid', 'preferred', 'bachelor', URLS.adobeFirefly, refs.creative),
    'qa-engineer': role('technical', 'engineering', 58, 'hybrid', 'preferred', 'bachelor', URLS.githubCopilot, refs.technical),
    'devops-engineer': role('technical', 'engineering', 39, 'enhance', 'preferred', 'bachelor', URLS.githubCopilot, refs.technical),
    'data-analyst': role('technical', 'engineering', 63, 'hybrid', 'preferred', 'bachelor', null, refs.technical),
    'cybersecurity-analyst': role('technical', 'engineering', 34, 'enhance', 'preferred', 'bachelor', null, refs.technical),
    'ai-research-engineer': role('technical', 'engineering', 18, 'enhance', 'required', 'master', null, refs.technical),
    'elementary-school-teacher': role('education', 'education', 24, 'enhance', 'required', 'bachelor', null, refs.education),
    'university-lecturer': role('education', 'education', 29, 'enhance', 'required', 'master', null, refs.education),
    'interpreter': role('languageContent', 'language', 67, 'hybrid', 'preferred', 'bachelor', null, refs.language),
    'content-strategist': role('languageContent', 'language', 56, 'hybrid', 'preferred', 'bachelor', null, refs.language),
    'accountant': role('professionalServices', 'business', 62, 'hybrid', 'preferred', 'bachelor', null, refs.professional),
    'lawyer': role('professionalServices', 'business', 19, 'enhance', 'required', 'bachelor', null, refs.professional),
    'hr-specialist': role('professionalServices', 'business', 55, 'hybrid', 'preferred', 'bachelor', null, refs.professional),
    'bookkeeping-clerk': role('clerical', 'operations', 79, 'replace', 'optional', 'none', null, refs.clerical),
    'payroll-clerk': role('clerical', 'operations', 77, 'replace', 'optional', 'none', null, refs.clerical),
    'administrative-assistant': role('clerical', 'operations', 74, 'hybrid', 'optional', 'none', null, refs.clerical),
    'receptionist': role('clerical', 'operations', 76, 'replace', 'optional', 'none', null, refs.clerical),
    'call-center-agent': role('customerSupport', 'support', 81, 'hybrid', 'optional', 'none', URLS.intercomFin, refs.customerSupport),
    'hotel-receptionist': role('hospitality', 'service', 62, 'hybrid', 'optional', 'none', null, refs.hospitality),
    'flight-attendant': role('hospitality', 'service', 27, 'enhance', 'optional', 'none', null, refs.hospitality),
    'barista': role('handsOnService', 'service', 24, 'enhance', 'optional', 'none', null, refs.handsOnService),
    'cook': role('handsOnService', 'service', 29, 'enhance', 'optional', 'none', null, refs.handsOnService),
    'hairdresser': role('handsOnService', 'service', 18, 'enhance', 'optional', 'none', null, refs.handsOnService),
    'caregiver': role('handsOnService', 'care', 22, 'enhance', 'optional', 'none', null, refs.handsOnService),
    'security-guard': role('handsOnService', 'security', 33, 'enhance', 'optional', 'none', null, refs.handsOnService),
    'retail-salesperson': role('salesCommerce', 'sales', 57, 'hybrid', 'optional', 'none', null, refs.sales),
    'real-estate-agent': role('salesCommerce', 'sales', 51, 'hybrid', 'optional', 'none', null, refs.sales),
    'insurance-sales-agent': role('salesCommerce', 'sales', 63, 'hybrid', 'optional', 'none', null, refs.sales),
    'ecommerce-merchandiser': role('salesCommerce', 'sales', 68, 'hybrid', 'preferred', 'bachelor', null, refs.sales),
    'crop-farmer': role('agriculture', 'agriculture', 31, 'enhance', 'optional', 'none', null, refs.agriculture),
    'livestock-farmer': role('agriculture', 'agriculture', 27, 'enhance', 'optional', 'none', null, refs.agriculture),
    'hvac-technician': role('skilledTrade', 'trades', 25, 'enhance', 'optional', 'none', null, refs.skilledTrade),
    'plumber': role('skilledTrade', 'trades', 21, 'enhance', 'optional', 'none', null, refs.skilledTrade),
    'carpenter': role('skilledTrade', 'trades', 18, 'enhance', 'optional', 'none', null, refs.skilledTrade),
    'welder': role('skilledTrade', 'trades', 28, 'enhance', 'optional', 'none', null, refs.skilledTrade),
    'automotive-technician': role('skilledTrade', 'trades', 34, 'enhance', 'optional', 'none', null, refs.skilledTrade),
    'truck-driver': role('machineTransport', 'logistics', 71, 'hybrid', 'optional', 'none', null, refs.machine),
    'forklift-operator': role('machineTransport', 'logistics', 68, 'hybrid', 'optional', 'none', null, refs.machine),
    'cnc-machine-operator': role('machineTransport', 'manufacturing', 76, 'replace', 'optional', 'none', null, refs.machine),
    'packaging-machine-operator': role('machineTransport', 'manufacturing', 83, 'replace', 'optional', 'none', null, refs.machine),
    'cleaner': role('labor', 'labor', 66, 'replace', 'optional', 'none', null, refs.labor),
    'warehouse-laborer': role('labor', 'labor', 64, 'hybrid', 'optional', 'none', null, refs.labor),
    'construction-laborer': role('labor', 'labor', 26, 'enhance', 'optional', 'none', null, refs.labor),
    'delivery-rider': role('labor', 'labor', 59, 'hybrid', 'optional', 'none', null, refs.labor)
  };
}

function role(family, degreeFamily, automationRisk, aiRole, degreeStatus, degreeLevel, currentReplacementUrl, references) {
  return {
    family,
    category: degreeFamily,
    degreeFamily,
    automationRisk,
    aiRole,
    degreeStatus,
    degreeLevel,
    currentReplacementUrl,
    references
  };
}

main();

function main() {
  const existingJobs = readJson(jobsPath);
  const stubs = readJson(stubsPath);
  const taxonomy = readJson(taxonomyPath);
  const roleConfigs = createRoleConfigs();
  const detailOrder = flattenDetailIds(taxonomy);
  const enrichedExistingJobs = existingJobs.map((job) => {
    const config = roleConfigs[job.id] || deriveConfigFromJob(job);

    return enrichExistingJob(job, config);
  });
  const existingIds = new Set(enrichedExistingJobs.map((job) => job.id));

  const generatedJobs = stubs
    .filter((stub) => !existingIds.has(stub.id))
    .map((stub) => {
      const config = roleConfigs[stub.id];

      if (!config) {
        throw new Error(`Missing role config for ${stub.id}`);
      }

      return materializeProfile(stub, config);
    });

  const mergedJobs = [...enrichedExistingJobs, ...generatedJobs].sort((left, right) => {
    return detailOrder.indexOf(left.id) - detailOrder.indexOf(right.id);
  });

  fs.writeFileSync(jobsPath, `${JSON.stringify(mergedJobs, null, 2)}\n`);
  fs.writeFileSync(stubsPath, '[]\n');

  console.log(`Wrote ${mergedJobs.length} profiled jobs.`);
  console.log(`Materialized ${generatedJobs.length} jobs from stubs.`);
}
