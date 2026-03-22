const UI = {
  en: {
    locale: 'en-US',
    brandSubtitle: 'World Job Intelligence for an AI-shaped Labor Market',
    heroEyebrow: 'Career map for the next decade',
    heroTitle: 'Will My Job Replaced by AI?',
    heroLead: 'This service provides multi-layer job intelligence to measure the risk of future jobs. It consists of risk meter, core skills, learning paths, etc to measure whether AI is more likely to automate the work or make the worker stronger in the future.',
    stats: {
      jobs: 'jobs in view',
      highRisk: 'high risk jobs',
      lowRisk: 'low risk jobs'
    },
    filterGroups: {
      jobKicker: 'Job Classification',
      jobTitle: 'Search by occupation hierarchy',
      aiKicker: 'AI Classification',
      aiTitle: 'Filter by replacement and education signals'
    },
    controls: {
      search: 'Search job',
      searchPlaceholder: 'Try nurse, teacher, translator, support...',
      major: '1st classification (major)',
      mid: '2nd classification (mid)',
      sub: '3rd classification (sub)',
      risk: 'Replacement risk',
      role: 'AI impact',
      degree: 'Degree need',
      sort: 'Sort by'
    },
    filters: {
      major: {
        all: 'All major groups'
      },
      mid: {
        all: 'All mid groups'
      },
      sub: {
        all: 'All sub groups'
      },
      risk: {
        all: 'All risk levels',
        low: 'Low risk',
        medium: 'Medium risk',
        high: 'High risk'
      },
      role: {
        all: 'All AI impacts',
        replace: 'Mostly replaceable',
        hybrid: 'Mixed: replace + enhance',
        enhance: 'Mostly enhanced'
      },
      degree: {
        all: 'All degree paths',
        required: 'Degree usually required',
        preferred: 'Degree often preferred',
        optional: 'Degree not usually needed'
      },
      sort: {
        riskDesc: 'Highest risk first',
        riskAsc: 'Lowest risk first',
        title: 'Alphabetical'
      }
    },
    riskBands: {
      low: 'Low risk',
      medium: 'Medium risk',
      high: 'High risk'
    },
    roles: {
      replace: 'Replace-first',
      hybrid: 'Hybrid impact',
      enhance: 'Enhance-first'
    },
    categories: {
      operations: 'Operations',
      support: 'Support',
      care: 'Care',
      trades: 'Skilled trades',
      design: 'Design',
      engineering: 'Engineering',
      education: 'Education',
      language: 'Language services'
    },
    insights: {
      kicker: 'Portfolio view',
      title: 'See where the exposure sits.',
      lead: 'High-risk work is usually repetitive, digital, and rule-based. Low-risk work tends to rely on trust, physical judgment, and live context.',
      guideKicker: 'Interpret the meter',
      guideTitle: 'What the signals mean',
      guideItems: [
        { title: 'Low risk', body: 'Hands-on judgment, human trust, and variable environments slow down full automation.' },
        { title: 'Medium risk', body: 'Parts of the workflow can be automated, but people still own edge cases, accountability, or relationship work.' },
        { title: 'High risk', body: 'Standardized digital output, repetitive rules, and structured data make replacement more likely.' }
      ]
    },
    results: {
      kicker: 'Job profiles',
      title: 'Scan the current catalog',
      summary: (count) => `${count} role${count === 1 ? '' : 's'} matched your filters.`
    },
    details: {
      tasks: 'What the job does',
      skills: 'Skills to build',
      path: 'How to reach it',
      degree: 'Degree signal',
      aiNow: 'AI now',
      aiFuture: 'What changes next',
      currentReplacement: 'Current AI replacement',
      services: 'AI services'
    },
    education: {
      statuses: {
        required: 'Usually required',
        preferred: 'Often preferred',
        optional: 'Not usually required'
      },
      levels: {
        none: 'No university degree',
        bachelor: 'Bachelor',
        master: 'Master',
        doctorate: 'Doctorate'
      }
    },
    noResults: 'No roles matched this combination. Try clearing a filter or using a broader keyword.',
    roadmap: {
      kicker: 'To scale this product',
      title: 'What turns this into a real global service',
      lead: 'The frontend is ready for a larger pipeline. These are the next product layers needed to cover jobs across countries and languages.',
      steps: [
        { title: 'Job taxonomy ingestion', body: 'Map global roles to systems like ISCO, ESCO, or O*NET so the catalog can cover real job families rather than manual entries.' },
        { title: 'Evidence-backed scoring', body: 'Version each risk score with source dates, exposed tasks, and analyst rationale instead of a single unexplained number.' },
        { title: 'Regional opportunity data', body: 'Add salary ranges, hiring demand, education pathways, and country-level language variants so the advice becomes actionable.' }
      ]
    }
  },
  ko: {
    locale: 'ko-KR',
    brandSubtitle: 'AI 시대 노동시장을 위한 세계 직업 인텔리전스',
    heroEyebrow: '다음 10년을 위한 커리어 지도',
    heroTitle: 'Will My Job Replaced by AI?',
    heroLead: '이 서비스는 미래 직업의 위험도를 측정하기 위한 다층적 직업 인텔리전스를 제공합니다. 위험도 계량기, 핵심 역량, 학습 경로 등을 통해 AI가 미래에 일을 자동화할 가능성이 큰지, 아니면 사람을 더 강하게 만들 가능성이 큰지를 보여줍니다.',
    stats: {
      jobs: '현재 표시된 직무',
      highRisk: '고위험 직무',
      lowRisk: '저위험 직무'
    },
    filterGroups: {
      jobKicker: '직업 분류',
      jobTitle: '직업 체계로 찾기',
      aiKicker: 'AI 분류',
      aiTitle: '대체 위험과 학위 신호로 좁히기'
    },
    controls: {
      search: '직업 검색',
      searchPlaceholder: '간호사, 교사, 번역가, 고객지원...',
      major: '1차 분류 (대항목)',
      mid: '2차 분류 (하위카테고리)',
      sub: '3차 분류 (세부카테고리)',
      risk: 'Replacement Risk',
      role: 'AI 영향',
      degree: '학위 필요 여부',
      sort: '정렬 기준'
    },
    filters: {
      major: {
        all: '모든 대항목'
      },
      mid: {
        all: '모든 하위카테고리'
      },
      sub: {
        all: '모든 세부카테고리'
      },
      risk: {
        all: '모든 위험 수준',
        low: '낮은 위험',
        medium: '중간 위험',
        high: '높은 위험'
      },
      role: {
        all: '모든 AI 영향',
        replace: '주로 대체 가능',
        hybrid: '혼합형: 대체 + 강화',
        enhance: '주로 강화'
      },
      degree: {
        all: '모든 학위 경로',
        required: '학위가 대체로 필수',
        preferred: '학위를 자주 선호',
        optional: '학위가 보통 불필요'
      },
      sort: {
        riskDesc: '위험도 높은 순',
        riskAsc: '위험도 낮은 순',
        title: '가나다순'
      }
    },
    riskBands: {
      low: '낮은 위험',
      medium: '중간 위험',
      high: '높은 위험'
    },
    roles: {
      replace: '대체 중심',
      hybrid: '혼합 영향',
      enhance: '강화 중심'
    },
    categories: {
      operations: '운영',
      support: '고객지원',
      care: '돌봄',
      trades: '기술직',
      design: '디자인',
      engineering: '엔지니어링',
      education: '교육',
      language: '언어 서비스'
    },
    insights: {
      kicker: '포트폴리오 보기',
      title: '어디에 노출이 집중되는지 확인하세요.',
      lead: '고위험 업무는 반복적이고 디지털 기반이며 규칙이 안정적일 때 많습니다. 저위험 업무는 신뢰, 현장 판단, 실시간 맥락에 더 의존합니다.',
      guideKicker: '위험도 해석',
      guideTitle: '신호가 의미하는 것',
      guideItems: [
        { title: '낮은 위험', body: '현장 판단, 인간 신뢰, 변화가 많은 환경은 완전 자동화를 어렵게 만듭니다.' },
        { title: '중간 위험', body: '업무 일부는 자동화되지만, 예외 처리, 책임, 관계 형성은 여전히 사람이 맡습니다.' },
        { title: '높은 위험', body: '표준화된 디지털 산출물, 반복 규칙, 구조화된 데이터는 대체 가능성을 높입니다.' }
      ]
    },
    results: {
      kicker: '직무 프로필',
      title: '현재 카탈로그 탐색',
      summary: (count) => `필터와 일치하는 직무는 ${count}개입니다.`
    },
    details: {
      tasks: '직무 내용',
      skills: '필요 역량',
      path: '진입 방법',
      degree: '학위 요구',
      aiNow: '현재의 AI',
      aiFuture: '앞으로의 변화',
      currentReplacement: '현재 AI 대체 서비스',
      services: '관련 AI 서비스'
    },
    education: {
      statuses: {
        required: '대체로 필수',
        preferred: '자주 선호',
        optional: '보통 불필요'
      },
      levels: {
        none: '학위 불필요',
        bachelor: '학사',
        master: '석사',
        doctorate: '박사'
      }
    },
    noResults: '이 조합과 일치하는 직무가 없습니다. 필터를 줄이거나 더 넓은 검색어를 사용해 보세요.',
    roadmap: {
      kicker: '제품 확장 방향',
      title: '이 서비스를 글로벌 플랫폼으로 키우려면',
      lead: '프런트엔드는 더 큰 데이터 파이프라인을 받을 준비가 되어 있습니다. 전 세계 직업을 다루려면 다음 단계가 필요합니다.',
      steps: [
        { title: '직업 분류 체계 연결', body: 'ISCO, ESCO, O*NET 같은 체계에 글로벌 직업을 매핑해 수작업 입력이 아닌 실제 직군 단위로 확장합니다.' },
        { title: '근거 기반 점수화', body: '설명 없는 단일 숫자 대신, 위험 점수마다 기준 날짜, 노출 업무, 분석 근거를 버전으로 관리합니다.' },
        { title: '지역별 기회 데이터', body: '급여, 채용 수요, 교육 경로, 국가별 언어 변형을 붙여서 실질적인 진로 조언으로 전환합니다.' }
      ]
    }
  },
  es: {
    locale: 'es-ES',
    brandSubtitle: 'Inteligencia laboral mundial para un mercado definido por la IA',
    heroEyebrow: 'Mapa profesional para la proxima decada',
    heroTitle: 'Will My Job Replaced by AI?',
    heroLead: 'Este servicio ofrece inteligencia laboral multinivel para medir el riesgo de los trabajos del futuro. Incluye medidor de riesgo, habilidades clave, rutas de aprendizaje y otros elementos para mostrar si la IA tiene mas probabilidad de automatizar el trabajo o de fortalecer a la persona en el futuro.',
    stats: {
      jobs: 'puestos visibles',
      highRisk: 'trabajos de alto riesgo',
      lowRisk: 'trabajos de bajo riesgo'
    },
    filterGroups: {
      jobKicker: 'Clasificacion laboral',
      jobTitle: 'Buscar por jerarquia ocupacional',
      aiKicker: 'Clasificacion de IA',
      aiTitle: 'Filtrar por reemplazo y senales educativas'
    },
    controls: {
      search: 'Buscar empleos',
      searchPlaceholder: 'Prueba enfermero, profesor, traductor, soporte...',
      major: '1ra clasificacion (mayor)',
      mid: '2da clasificacion (media)',
      sub: '3ra clasificacion (subnivel)',
      risk: 'Replacement Risk',
      role: 'Impacto de IA',
      degree: 'Necesidad de titulo',
      sort: 'Ordenar por'
    },
    filters: {
      major: {
        all: 'Todos los grupos mayores'
      },
      mid: {
        all: 'Todos los grupos medios'
      },
      sub: {
        all: 'Todos los subgrupos'
      },
      risk: {
        all: 'Todos los niveles',
        low: 'Riesgo bajo',
        medium: 'Riesgo medio',
        high: 'Riesgo alto'
      },
      role: {
        all: 'Todos los impactos',
        replace: 'Mayormente reemplazable',
        hybrid: 'Mixto: reemplazo + mejora',
        enhance: 'Mayormente potenciado'
      },
      degree: {
        all: 'Todas las rutas educativas',
        required: 'Titulo normalmente obligatorio',
        preferred: 'Titulo frecuentemente preferido',
        optional: 'Titulo normalmente no requerido'
      },
      sort: {
        riskDesc: 'Mayor riesgo primero',
        riskAsc: 'Menor riesgo primero',
        title: 'Alfabetico'
      }
    },
    riskBands: {
      low: 'Riesgo bajo',
      medium: 'Riesgo medio',
      high: 'Riesgo alto'
    },
    roles: {
      replace: 'Primero reemplazo',
      hybrid: 'Impacto mixto',
      enhance: 'Primero mejora'
    },
    categories: {
      operations: 'Operaciones',
      support: 'Soporte',
      care: 'Cuidado',
      trades: 'Oficios tecnicos',
      design: 'Diseno',
      engineering: 'Ingenieria',
      education: 'Educacion',
      language: 'Servicios linguisticos'
    },
    insights: {
      kicker: 'Vista del portafolio',
      title: 'Mira donde esta la exposicion.',
      lead: 'El trabajo de alto riesgo suele ser repetitivo, digital y basado en reglas. El trabajo de bajo riesgo depende mas de confianza, criterio fisico y contexto en vivo.',
      guideKicker: 'Como leer el medidor',
      guideTitle: 'Que significan las senales',
      guideItems: [
        { title: 'Riesgo bajo', body: 'El juicio practico, la confianza humana y los entornos variables frenan la automatizacion total.' },
        { title: 'Riesgo medio', body: 'Parte del flujo puede automatizarse, pero las personas conservan casos limite, responsabilidad o trabajo relacional.' },
        { title: 'Riesgo alto', body: 'La salida digital estandarizada, las reglas repetitivas y los datos estructurados facilitan el reemplazo.' }
      ]
    },
    results: {
      kicker: 'Perfiles laborales',
      title: 'Explora el catalogo actual',
      summary: (count) => `${count} puesto${count === 1 ? '' : 's'} coincide${count === 1 ? '' : 'n'} con tus filtros.`
    },
    details: {
      tasks: 'Que hace el trabajo',
      skills: 'Habilidades clave',
      path: 'Como llegar',
      degree: 'Requisito de titulo',
      aiNow: 'IA hoy',
      aiFuture: 'Lo que cambia despues',
      currentReplacement: 'Reemplazo actual con IA',
      services: 'Servicios de IA'
    },
    education: {
      statuses: {
        required: 'Normalmente obligatorio',
        preferred: 'Frecuentemente preferido',
        optional: 'Normalmente no requerido'
      },
      levels: {
        none: 'Sin titulo universitario',
        bachelor: 'Licenciatura',
        master: 'Maestria',
        doctorate: 'Doctorado'
      }
    },
    noResults: 'Ningun puesto coincide con esta combinacion. Prueba limpiando un filtro o usando una palabra mas amplia.',
    roadmap: {
      kicker: 'Para escalar el producto',
      title: 'Lo que lo convierte en un servicio global real',
      lead: 'El frontend ya esta listo para una canalizacion de datos mas grande. Estas son las capas que faltan para cubrir trabajos en muchos paises e idiomas.',
      steps: [
        { title: 'Ingestion de taxonomias laborales', body: 'Relaciona los roles globales con sistemas como ISCO, ESCO u O*NET para cubrir familias reales de empleo en vez de entradas manuales.' },
        { title: 'Puntuacion con evidencia', body: 'Versiona cada puntuacion de riesgo con fechas, tareas expuestas y razonamiento analitico en lugar de un numero aislado.' },
        { title: 'Datos regionales de oportunidad', body: 'Agrega salarios, demanda de contratacion, rutas educativas y variantes locales del idioma para volver accionable el consejo.' }
      ]
    }
  }
};

const JOBS = [
  {
    id: 'data-entry-clerk',
    category: 'operations',
    automationRisk: 88,
    aiRole: 'replace',
    classification: {
      majorId: 'clerical',
      midId: 'clerical-support',
      subId: 'data-entry',
      labels: {
        en: {
          major: 'Clerical Occupations',
          mid: 'Administrative Support',
          sub: 'Data Entry Clerks'
        },
        ko: {
          major: '사무 종사자',
          mid: '사무 지원 종사자',
          sub: '자료 입력 사무원'
        },
        es: {
          major: 'Ocupaciones administrativas',
          mid: 'Apoyo administrativo',
          sub: 'Personal de entrada de datos'
        }
      }
    },
    currentReplacementUrl: 'https://cloud.google.com/document-ai-workbench',
    degree: {
      status: 'optional',
      level: 'none'
    },
    content: {
      en: {
        title: 'Data Entry Clerk',
        summary: 'Moves structured information between forms, databases, and spreadsheets.',
        tasks: [
          'Capture records with speed and accuracy.',
          'Validate fields and flag exceptions.',
          'Keep digital logs organized and current.'
        ],
        skills: ['Attention to detail', 'Spreadsheet fluency', 'Basic database tools', 'Quality checking'],
        path: [
          'Build typing speed and spreadsheet accuracy.',
          'Practice cleaning and validating messy datasets.',
          'Learn how operations teams handle exceptions.'
        ],
        degreeNote: 'Most employers care more about speed, accuracy, and basic office skills than a university degree. A high school credential or short certificate is usually enough.',
        aiNow: 'OCR, document AI, and workflow bots already automate large parts of routine entry.',
        aiFuture: 'The role is likely to shrink toward exception review, audit trails, and sensitive records.',
        services: ['Document AI', 'RPA workflow bots', 'Spreadsheet copilots']
      },
      ko: {
        title: '데이터 입력 사무원',
        summary: '양식, 데이터베이스, 스프레드시트 사이에서 구조화된 정보를 옮기는 업무입니다.',
        tasks: [
          '기록을 빠르고 정확하게 입력합니다.',
          '필드를 검증하고 예외를 표시합니다.',
          '디지털 로그를 체계적으로 유지합니다.'
        ],
        skills: ['세심함', '스프레드시트 활용', '기초 데이터베이스 도구', '품질 점검'],
        path: [
          '타이핑 속도와 스프레드시트 정확도를 높입니다.',
          '정리되지 않은 데이터를 정제하고 검증하는 연습을 합니다.',
          '운영팀의 예외 처리 흐름을 배웁니다.'
        ],
        degreeNote: '대학 학위보다 정확성, 속도, 기본 사무 역량을 더 보는 경우가 많습니다. 보통 고등학교 졸업이나 짧은 직무 교육이면 충분합니다.',
        aiNow: 'OCR, 문서 AI, 워크플로 자동화가 반복 입력 업무의 큰 부분을 이미 처리합니다.',
        aiFuture: '앞으로는 예외 검토, 감사 기록, 민감 정보 처리 중심으로 역할이 축소될 가능성이 큽니다.',
        services: ['문서 AI', 'RPA 워크플로 봇', '스프레드시트 코파일럿']
      },
      es: {
        title: 'Auxiliar de entrada de datos',
        summary: 'Traslada informacion estructurada entre formularios, bases de datos y hojas de calculo.',
        tasks: [
          'Registrar datos con rapidez y precision.',
          'Validar campos y marcar excepciones.',
          'Mantener registros digitales ordenados.'
        ],
        skills: ['Atencion al detalle', 'Manejo de hojas de calculo', 'Herramientas basicas de base de datos', 'Control de calidad'],
        path: [
          'Mejora la velocidad de teclado y la exactitud en hojas de calculo.',
          'Practica limpieza y validacion de datos desordenados.',
          'Aprende como un equipo operativo gestiona excepciones.'
        ],
        degreeNote: 'La mayoria de empleadores valora mas la velocidad, la precision y las habilidades administrativas basicas que un titulo universitario. Suele bastar con secundaria o un certificado corto.',
        aiNow: 'El OCR, la IA documental y los bots de flujo ya automatizan buena parte del trabajo repetitivo.',
        aiFuture: 'El puesto probablemente se reduzca a revision de excepciones, auditoria y manejo de datos sensibles.',
        services: ['IA documental', 'Bots RPA', 'Copilotos de hojas de calculo']
      }
    }
  },
  {
    id: 'customer-support-specialist',
    category: 'support',
    automationRisk: 72,
    aiRole: 'hybrid',
    classification: {
      majorId: 'service',
      midId: 'customer-service',
      subId: 'customer-support',
      labels: {
        en: {
          major: 'Service Occupations',
          mid: 'Customer Service',
          sub: 'Customer Support Specialists'
        },
        ko: {
          major: '서비스 종사자',
          mid: '고객 서비스 종사자',
          sub: '고객 지원 전문가'
        },
        es: {
          major: 'Ocupaciones de servicios',
          mid: 'Atencion al cliente',
          sub: 'Especialistas en soporte al cliente'
        }
      }
    },
    currentReplacementUrl: 'https://fin.ai',
    degree: {
      status: 'optional',
      level: 'none'
    },
    content: {
      en: {
        title: 'Customer Support Specialist',
        summary: 'Helps users solve issues across chat, email, and service workflows.',
        tasks: [
          'Answer product and account questions.',
          'Resolve complaints and escalate edge cases.',
          'Document patterns that improve service operations.'
        ],
        skills: ['Clear writing', 'Empathy', 'Product knowledge', 'Troubleshooting'],
        path: [
          'Practice structured communication and ticket handling.',
          'Learn a support platform and common escalation flows.',
          'Study the product well enough to solve routine issues fast.'
        ],
        degreeNote: 'Many support teams hire from skill-based backgrounds without a degree. A degree can help in enterprise or specialized support, but it is not usually the gate.',
        aiNow: 'AI agents can already deflect repetitive tickets, summarize conversations, and draft responses.',
        aiFuture: 'Human agents will keep complex complaints, sensitive situations, and loyalty-building interactions.',
        services: ['AI chat agents', 'Conversation summarizers', 'Knowledge base copilots']
      },
      ko: {
        title: '고객 지원 전문가',
        summary: '채팅, 이메일, 서비스 워크플로 전반에서 사용자의 문제 해결을 돕습니다.',
        tasks: [
          '제품과 계정 관련 질문에 답합니다.',
          '불만을 해결하고 복잡한 사례는 상위 단계로 넘깁니다.',
          '반복 패턴을 기록해 운영 개선에 반영합니다.'
        ],
        skills: ['명확한 글쓰기', '공감 능력', '제품 이해', '문제 해결'],
        path: [
          '구조화된 커뮤니케이션과 티켓 처리 방식을 연습합니다.',
          '지원 플랫폼과 에스컬레이션 흐름을 익힙니다.',
          '반복 문의를 빠르게 해결할 만큼 제품을 깊이 이해합니다.'
        ],
        degreeNote: '많은 고객지원 팀은 학위 없이도 실무 역량 중심으로 채용합니다. 기업용이나 전문 지원에서는 학위가 도움이 될 수 있지만 보통 핵심 입장권은 아닙니다.',
        aiNow: 'AI 에이전트는 반복 문의 응답, 대화 요약, 초안 작성까지 이미 수행할 수 있습니다.',
        aiFuture: '복잡한 불만, 민감한 상황, 충성도를 높이는 상호작용은 사람이 계속 맡을 가능성이 큽니다.',
        services: ['AI 챗 에이전트', '대화 요약 도구', '지식베이스 코파일럿']
      },
      es: {
        title: 'Especialista en soporte al cliente',
        summary: 'Ayuda a usuarios a resolver problemas por chat, correo y flujos de servicio.',
        tasks: [
          'Responder preguntas sobre producto y cuenta.',
          'Resolver reclamaciones y escalar casos complejos.',
          'Documentar patrones para mejorar la operacion.'
        ],
        skills: ['Escritura clara', 'Empatia', 'Conocimiento del producto', 'Resolucion de problemas'],
        path: [
          'Practica comunicacion estructurada y manejo de tickets.',
          'Aprende una plataforma de soporte y sus escalaciones comunes.',
          'Estudia el producto hasta poder resolver incidencias rutinarias con rapidez.'
        ],
        degreeNote: 'Muchos equipos de soporte contratan por habilidades practicas sin exigir titulo. El titulo puede ayudar en soporte empresarial o especializado, pero normalmente no es la barrera principal.',
        aiNow: 'Los agentes de IA ya pueden desviar tickets repetitivos, resumir conversaciones y redactar respuestas.',
        aiFuture: 'Las personas seguiran siendo fuertes en reclamaciones complejas, situaciones sensibles e interacciones de confianza.',
        services: ['Agentes de chat con IA', 'Resumidores de conversaciones', 'Copilotos de base de conocimiento']
      }
    }
  },
  {
    id: 'registered-nurse',
    category: 'care',
    automationRisk: 24,
    aiRole: 'enhance',
    classification: {
      majorId: 'professional',
      midId: 'healthcare',
      subId: 'nursing',
      labels: {
        en: {
          major: 'Professional Occupations',
          mid: 'Healthcare Professionals',
          sub: 'Registered Nurses'
        },
        ko: {
          major: '전문가 및 관련 종사자',
          mid: '보건·의료 관련 전문직',
          sub: '간호사'
        },
        es: {
          major: 'Ocupaciones profesionales',
          mid: 'Profesionales de salud',
          sub: 'Enfermeros registrados'
        }
      }
    },
    currentReplacementUrl: null,
    degree: {
      status: 'required',
      level: 'bachelor'
    },
    content: {
      en: {
        title: 'Registered Nurse',
        summary: 'Delivers clinical care, monitoring, and patient advocacy in live settings.',
        tasks: [
          'Assess patient condition and respond in real time.',
          'Administer treatment and coordinate with care teams.',
          'Educate patients and families through stressful moments.'
        ],
        skills: ['Clinical judgment', 'Empathy', 'Care coordination', 'Attention under pressure'],
        path: [
          'Complete accredited nursing education and licensing.',
          'Train in clinical placements with direct patient care.',
          'Build specialization in areas such as ICU, pediatrics, or community care.'
        ],
        degreeNote: 'This role usually requires formal nursing education plus licensure. In many markets, a bachelor-level nursing degree is the dominant expectation for registered nurse hiring.',
        aiNow: 'AI can help with documentation, triage support, and pattern detection, but not the full bedside role.',
        aiFuture: 'The job will likely become more data-assisted, while human trust, dexterity, and accountability stay central.',
        services: ['Clinical documentation copilots', 'Triage support AI', 'Monitoring alert systems']
      },
      ko: {
        title: '간호사',
        summary: '실제 진료 환경에서 환자 돌봄, 모니터링, 옹호 역할을 수행합니다.',
        tasks: [
          '환자 상태를 평가하고 실시간으로 대응합니다.',
          '처치를 수행하고 의료진과 협업합니다.',
          '불안한 상황에서 환자와 가족을 교육하고 지원합니다.'
        ],
        skills: ['임상 판단력', '공감 능력', '돌봄 조율', '압박 상황 집중력'],
        path: [
          '공인 간호 교육과 면허 과정을 마칩니다.',
          '실습 현장에서 직접 환자 돌봄 경험을 쌓습니다.',
          '중환자실, 소아, 지역사회 돌봄 등 전문 분야를 키웁니다.'
        ],
        degreeNote: '이 직무는 보통 정식 간호 교육과 면허가 필요합니다. 많은 시장에서 등록 간호사 채용의 기본 기대 수준은 학사급 간호 학위입니다.',
        aiNow: 'AI는 문서 작성, 초기 분류, 패턴 탐지를 도울 수 있지만 병상 옆 역할 전체를 대체하진 못합니다.',
        aiFuture: '이 직무는 더 많은 데이터 지원을 받겠지만 인간의 신뢰, 손기술, 책임은 여전히 핵심입니다.',
        services: ['임상 문서 코파일럿', '트리아지 지원 AI', '모니터링 알림 시스템']
      },
      es: {
        title: 'Enfermero registrado',
        summary: 'Ofrece atencion clinica, seguimiento y defensa del paciente en entornos reales.',
        tasks: [
          'Evaluar la condicion del paciente y responder en tiempo real.',
          'Administrar tratamiento y coordinarse con el equipo medico.',
          'Guiar a pacientes y familias en momentos de estres.'
        ],
        skills: ['Criterio clinico', 'Empatia', 'Coordinacion asistencial', 'Atencion bajo presion'],
        path: [
          'Completa la formacion acreditada y la licencia de enfermeria.',
          'Entrena en practicas clinicas con atencion directa.',
          'Desarrolla una especializacion como UCI, pediatria o salud comunitaria.'
        ],
        degreeNote: 'Este rol suele requerir formacion formal en enfermeria y licencia profesional. En muchos mercados, la expectativa dominante para contratar enfermeria registrada es un grado de nivel licenciatura.',
        aiNow: 'La IA ayuda con documentacion, apoyo al triaje y deteccion de patrones, pero no sustituye el rol junto al paciente.',
        aiFuture: 'El trabajo sera mas asistido por datos, mientras la confianza humana, la destreza y la responsabilidad seguiran siendo centrales.',
        services: ['Copilotos de documentacion clinica', 'IA de apoyo al triaje', 'Sistemas de alertas de monitoreo']
      }
    }
  },
  {
    id: 'electrician',
    category: 'trades',
    automationRisk: 19,
    aiRole: 'enhance',
    classification: {
      majorId: 'craft',
      midId: 'electrical-trades',
      subId: 'electricians',
      labels: {
        en: {
          major: 'Craft and Trade Occupations',
          mid: 'Electrical Trades',
          sub: 'Electricians'
        },
        ko: {
          major: '기능원 및 관련 기능 종사자',
          mid: '전기 기능직',
          sub: '전기 기술자'
        },
        es: {
          major: 'Oficios tecnicos',
          mid: 'Oficios electricos',
          sub: 'Electricistas'
        }
      }
    },
    currentReplacementUrl: null,
    degree: {
      status: 'optional',
      level: 'none'
    },
    content: {
      en: {
        title: 'Electrician',
        summary: 'Installs, repairs, and inspects electrical systems in unpredictable physical environments.',
        tasks: [
          'Read plans and diagnose faults on site.',
          'Install wiring, panels, and safety systems.',
          'Work around codes, hazards, and changing field conditions.'
        ],
        skills: ['Physical dexterity', 'Safety discipline', 'Code knowledge', 'Fault diagnosis'],
        path: [
          'Start with trade school or an apprenticeship.',
          'Log supervised field hours and pass licensing exams.',
          'Develop specialty areas such as residential, industrial, or solar systems.'
        ],
        degreeNote: 'University study is usually not the main route here. Apprenticeship hours, trade training, safety discipline, and licensing matter more than a four-year degree.',
        aiNow: 'AI can assist with quoting, documentation, diagnostics, and visual inspection support.',
        aiFuture: 'Robotics may automate narrow tasks, but full replacement is difficult because sites are messy and variable.',
        services: ['Visual inspection AI', 'Quote generation tools', 'Diagnostic assistants']
      },
      ko: {
        title: '전기 기술자',
        summary: '예측하기 어려운 현장 환경에서 전기 시스템을 설치, 수리, 점검합니다.',
        tasks: [
          '도면을 읽고 현장에서 고장을 진단합니다.',
          '배선, 패널, 안전 시스템을 설치합니다.',
          '법규, 위험 요소, 변화하는 현장 조건에 대응합니다.'
        ],
        skills: ['손기술', '안전 의식', '전기 규정 지식', '고장 진단'],
        path: [
          '직업학교나 도제 과정을 시작합니다.',
          '감독 아래 현장 시간을 채우고 자격 시험을 통과합니다.',
          '주거용, 산업용, 태양광 등 전문 분야를 키웁니다.'
        ],
        degreeNote: '이 분야는 보통 대학보다 도제 과정, 직업훈련, 안전 역량, 자격증이 더 중요합니다. 4년제 학위가 핵심 진입 조건은 아닙니다.',
        aiNow: 'AI는 견적, 문서 작업, 진단, 시각 점검 보조에 도움이 됩니다.',
        aiFuture: '로봇이 일부 좁은 작업은 자동화할 수 있지만, 현장이 복잡하고 변수가 많아 완전 대체는 어렵습니다.',
        services: ['시각 점검 AI', '견적 생성 도구', '진단 보조 시스템']
      },
      es: {
        title: 'Electricista',
        summary: 'Instala, repara e inspecciona sistemas electricos en entornos fisicos variables.',
        tasks: [
          'Leer planos y diagnosticar fallas en terreno.',
          'Instalar cableado, paneles y sistemas de seguridad.',
          'Trabajar con normativa, riesgos y condiciones cambiantes.'
        ],
        skills: ['Destreza fisica', 'Disciplina de seguridad', 'Conocimiento normativo', 'Diagnostico de fallas'],
        path: [
          'Empieza con escuela tecnica o aprendizaje.',
          'Acumula horas supervisadas y aprueba licencias.',
          'Desarrolla especialidades como residencial, industrial o solar.'
        ],
        degreeNote: 'La universidad no suele ser la via principal. Importan mas las horas de aprendizaje, la formacion tecnica, la seguridad y la licencia que un titulo de cuatro anos.',
        aiNow: 'La IA puede ayudar en presupuestos, documentacion, diagnostico y apoyo a inspeccion visual.',
        aiFuture: 'La robotica automatizara tareas puntuales, pero el reemplazo total es dificil por la variabilidad del entorno.',
        services: ['IA de inspeccion visual', 'Herramientas de presupuestos', 'Asistentes de diagnostico']
      }
    }
  },
  {
    id: 'ux-designer',
    category: 'design',
    automationRisk: 48,
    aiRole: 'enhance',
    classification: {
      majorId: 'professional',
      midId: 'design-media',
      subId: 'ux-designers',
      labels: {
        en: {
          major: 'Professional Occupations',
          mid: 'Design and Media',
          sub: 'UX Designers'
        },
        ko: {
          major: '전문가 및 관련 종사자',
          mid: '디자인·미디어 관련 전문직',
          sub: 'UX 디자이너'
        },
        es: {
          major: 'Ocupaciones profesionales',
          mid: 'Diseno y medios',
          sub: 'Disenadores UX'
        }
      }
    },
    currentReplacementUrl: 'https://uizard.io/ai-design/',
    degree: {
      status: 'preferred',
      level: 'bachelor'
    },
    content: {
      en: {
        title: 'UX Designer',
        summary: 'Shapes digital products so users can understand, trust, and complete tasks.',
        tasks: [
          'Research user pain points and behavior patterns.',
          'Design flows, wireframes, and interface logic.',
          'Test concepts and refine decisions with product teams.'
        ],
        skills: ['Systems thinking', 'User research', 'Interface design', 'Communication'],
        path: [
          'Study design fundamentals and human-centered methods.',
          'Build portfolio projects that show research to execution.',
          'Learn product collaboration, prototyping, and accessibility.'
        ],
        degreeNote: 'Many employers still prefer a bachelor-level background in design, HCI, psychology, or a related field. A strong portfolio can offset that requirement in parts of the market.',
        aiNow: 'AI can generate mockups, summarize research, and speed up content or interface exploration.',
        aiFuture: 'Commodity screen production gets easier, while differentiated strategy, research, and taste matter more.',
        services: ['Wireframe generators', 'Research summarizers', 'UI copy copilots']
      },
      ko: {
        title: 'UX 디자이너',
        summary: '사용자가 디지털 제품을 이해하고 신뢰하며 목적을 달성하도록 경험을 설계합니다.',
        tasks: [
          '사용자 문제와 행동 패턴을 조사합니다.',
          '흐름, 와이어프레임, 인터페이스 논리를 설계합니다.',
          '아이디어를 테스트하고 제품팀과 함께 개선합니다.'
        ],
        skills: ['시스템 사고', '사용자 조사', '인터페이스 설계', '커뮤니케이션'],
        path: [
          '디자인 기본기와 인간 중심 방법론을 배웁니다.',
          '리서치부터 실행까지 보여주는 포트폴리오를 만듭니다.',
          '제품 협업, 프로토타이핑, 접근성을 익힙니다.'
        ],
        degreeNote: '많은 고용주는 디자인, HCI, 심리학 등 관련 분야의 학사 배경을 선호합니다. 다만 강한 포트폴리오가 있으면 일부 시장에서는 이를 대체할 수 있습니다.',
        aiNow: 'AI는 목업 생성, 리서치 요약, 콘텐츠와 인터페이스 탐색 속도를 높여 줍니다.',
        aiFuture: '평범한 화면 제작은 쉬워지지만, 차별화된 전략, 리서치, 감각의 가치가 더 커집니다.',
        services: ['와이어프레임 생성기', '리서치 요약 도구', 'UI 카피 코파일럿']
      },
      es: {
        title: 'Disenador UX',
        summary: 'Da forma a productos digitales para que las personas entiendan, confien y completen tareas.',
        tasks: [
          'Investigar dolores del usuario y patrones de comportamiento.',
          'Disenar flujos, wireframes y logica de interfaz.',
          'Probar conceptos y refinarlos con el equipo de producto.'
        ],
        skills: ['Pensamiento sistemico', 'Investigacion de usuarios', 'Diseno de interfaces', 'Comunicacion'],
        path: [
          'Estudia fundamentos de diseno y metodos centrados en personas.',
          'Construye proyectos de portafolio que muestren investigacion y ejecucion.',
          'Aprende colaboracion con producto, prototipado y accesibilidad.'
        ],
        degreeNote: 'Muchas empresas aun prefieren formacion universitaria de nivel licenciatura en diseno, HCI, psicologia o un campo relacionado. Un portafolio fuerte puede compensarlo en parte del mercado.',
        aiNow: 'La IA genera bocetos, resume investigacion y acelera la exploracion de contenido o pantallas.',
        aiFuture: 'La produccion visual basica sera mas facil, mientras la estrategia, la investigacion y el criterio destacaran mas.',
        services: ['Generadores de wireframes', 'Resumidores de investigacion', 'Copilotos de copy UI']
      }
    }
  },
  {
    id: 'software-developer',
    category: 'engineering',
    automationRisk: 43,
    aiRole: 'enhance',
    classification: {
      majorId: 'professional',
      midId: 'ict',
      subId: 'software-developers',
      labels: {
        en: {
          major: 'Professional Occupations',
          mid: 'ICT Professionals',
          sub: 'Software Developers'
        },
        ko: {
          major: '전문가 및 관련 종사자',
          mid: '정보통신 관련 전문직',
          sub: '소프트웨어 개발자'
        },
        es: {
          major: 'Ocupaciones profesionales',
          mid: 'Profesionales TIC',
          sub: 'Desarrolladores de software'
        }
      }
    },
    currentReplacementUrl: 'https://github.com/features/copilot',
    degree: {
      status: 'preferred',
      level: 'bachelor'
    },
    content: {
      en: {
        title: 'Software Developer',
        summary: 'Builds, maintains, and improves digital systems across changing requirements.',
        tasks: [
          'Design application logic and integrate systems.',
          'Write, review, and debug code.',
          'Translate business goals into reliable software behavior.'
        ],
        skills: ['Programming fundamentals', 'System design', 'Debugging', 'Product reasoning'],
        path: [
          'Learn one language deeply and build real projects.',
          'Understand data structures, APIs, testing, and version control.',
          'Practice shipping features while keeping systems maintainable.'
        ],
        degreeNote: 'A bachelor-level degree is still common in hiring pipelines, especially at larger companies. But many teams now accept strong project work, open-source proof, or real shipping experience instead.',
        aiNow: 'Coding copilots accelerate boilerplate, test generation, and refactoring support.',
        aiFuture: 'Routine implementation will compress, but architecture, validation, product judgment, and integration remain human-heavy.',
        services: ['Code copilots', 'Test generators', 'Static analysis AI']
      },
      ko: {
        title: '소프트웨어 개발자',
        summary: '변화하는 요구사항 속에서 디지털 시스템을 구축, 유지, 개선합니다.',
        tasks: [
          '애플리케이션 로직을 설계하고 시스템을 연동합니다.',
          '코드를 작성, 리뷰, 디버깅합니다.',
          '비즈니스 목표를 안정적인 소프트웨어 동작으로 바꿉니다.'
        ],
        skills: ['프로그래밍 기초', '시스템 설계', '디버깅', '제품 사고'],
        path: [
          '한 언어를 깊이 배우고 실제 프로젝트를 만듭니다.',
          '자료구조, API, 테스트, 버전 관리를 이해합니다.',
          '유지보수성을 지키면서 기능을 출시하는 연습을 합니다.'
        ],
        degreeNote: '대기업 채용 파이프라인에서는 여전히 학사 학위가 흔합니다. 하지만 강한 프로젝트, 오픈소스 기여, 실제 서비스 경험으로 학위 요구를 넘는 팀도 많아지고 있습니다.',
        aiNow: '코딩 코파일럿은 반복 코드, 테스트 생성, 리팩터링 지원 속도를 높여 줍니다.',
        aiFuture: '단순 구현은 줄어들겠지만 아키텍처, 검증, 제품 판단, 통합은 여전히 사람 비중이 높습니다.',
        services: ['코드 코파일럿', '테스트 생성기', '정적 분석 AI']
      },
      es: {
        title: 'Desarrollador de software',
        summary: 'Construye, mantiene y mejora sistemas digitales ante requisitos cambiantes.',
        tasks: [
          'Disenar logica de aplicaciones e integrar sistemas.',
          'Escribir, revisar y depurar codigo.',
          'Traducir objetivos de negocio en software confiable.'
        ],
        skills: ['Fundamentos de programacion', 'Diseno de sistemas', 'Depuracion', 'Razonamiento de producto'],
        path: [
          'Aprende bien un lenguaje y crea proyectos reales.',
          'Domina estructuras de datos, APIs, pruebas y control de versiones.',
          'Practica entregar funciones sin deteriorar la mantenibilidad.'
        ],
        degreeNote: 'El titulo de licenciatura sigue siendo comun en muchos procesos de contratacion, sobre todo en empresas grandes. Aun asi, muchos equipos aceptan proyectos solidos, codigo abierto o experiencia real como sustituto.',
        aiNow: 'Los copilotos de codigo aceleran boilerplate, generacion de pruebas y apoyo al refactor.',
        aiFuture: 'La implementacion rutinaria se comprimira, pero arquitectura, validacion, criterio de producto e integracion seguiran pesando mucho.',
        services: ['Copilotos de codigo', 'Generadores de pruebas', 'IA de analisis estatico']
      }
    }
  },
  {
    id: 'secondary-school-teacher',
    category: 'education',
    automationRisk: 28,
    aiRole: 'enhance',
    classification: {
      majorId: 'professional',
      midId: 'education',
      subId: 'secondary-teachers',
      labels: {
        en: {
          major: 'Professional Occupations',
          mid: 'Education Professionals',
          sub: 'Secondary School Teachers'
        },
        ko: {
          major: '전문가 및 관련 종사자',
          mid: '교육 관련 전문직',
          sub: '중등 교사'
        },
        es: {
          major: 'Ocupaciones profesionales',
          mid: 'Profesionales de educacion',
          sub: 'Profesores de secundaria'
        }
      }
    },
    currentReplacementUrl: null,
    degree: {
      status: 'required',
      level: 'bachelor'
    },
    content: {
      en: {
        title: 'Secondary School Teacher',
        summary: 'Guides learning, classroom culture, and student development over time.',
        tasks: [
          'Explain concepts and adapt lessons to student needs.',
          'Assess progress and give feedback.',
          'Build motivation, discipline, and social trust in the classroom.'
        ],
        skills: ['Instructional design', 'Communication', 'Classroom management', 'Subject mastery'],
        path: [
          'Complete teacher education and certification requirements.',
          'Develop subject depth and supervised teaching practice.',
          'Learn assessment design, student support, and curriculum planning.'
        ],
        degreeNote: 'A bachelor-level degree plus teacher certification is usually the minimum in most school systems. Some regions and promotion tracks later favor a master-level qualification as well.',
        aiNow: 'AI can draft lesson materials, personalize exercises, and reduce admin work.',
        aiFuture: 'Teachers will increasingly orchestrate AI tools, but trust, motivation, and live teaching remain difficult to automate.',
        services: ['Lesson planning AI', 'Adaptive learning systems', 'Feedback assistants']
      },
      ko: {
        title: '중등 교사',
        summary: '시간을 두고 학습, 교실 문화, 학생 성장을 이끄는 역할입니다.',
        tasks: [
          '개념을 설명하고 학생 수준에 맞게 수업을 조정합니다.',
          '성장을 평가하고 피드백을 제공합니다.',
          '교실에서 동기, 규율, 신뢰를 형성합니다.'
        ],
        skills: ['수업 설계', '커뮤니케이션', '학급 운영', '교과 전문성'],
        path: [
          '교원 양성과 자격 요건을 마칩니다.',
          '교과 심화와 수업 실습을 쌓습니다.',
          '평가 설계, 학생 지원, 교육과정 기획을 배웁니다.'
        ],
        degreeNote: '대부분의 학교 체계에서 학사 학위와 교원 자격은 보통 최소 조건입니다. 일부 지역이나 승진 경로에서는 이후 석사 수준을 더 선호하기도 합니다.',
        aiNow: 'AI는 수업 자료 작성, 연습 문제 개인화, 행정 업무 경감에 도움을 줍니다.',
        aiFuture: '교사는 점점 더 AI 도구를 조율하게 되지만 신뢰 형성, 동기 부여, 실시간 수업은 자동화가 어렵습니다.',
        services: ['수업 계획 AI', '적응형 학습 시스템', '피드백 보조 도구']
      },
      es: {
        title: 'Profesor de secundaria',
        summary: 'Guia el aprendizaje, la cultura del aula y el desarrollo del estudiante a lo largo del tiempo.',
        tasks: [
          'Explicar conceptos y adaptar clases a distintas necesidades.',
          'Evaluar avances y dar retroalimentacion.',
          'Construir motivacion, disciplina y confianza en el aula.'
        ],
        skills: ['Diseno instruccional', 'Comunicacion', 'Gestion de aula', 'Dominio de la materia'],
        path: [
          'Completa la formacion docente y la certificacion requerida.',
          'Profundiza en la materia y en la practica supervisada.',
          'Aprende evaluacion, apoyo estudiantil y planificacion curricular.'
        ],
        degreeNote: 'En la mayoria de sistemas escolares, la base es una licenciatura junto con la certificacion docente. Algunas regiones y trayectorias de promocion tambien valoran una maestria mas adelante.',
        aiNow: 'La IA puede redactar materiales, personalizar ejercicios y reducir carga administrativa.',
        aiFuture: 'Los docentes coordinaran cada vez mas herramientas de IA, pero la confianza, la motivacion y la ensenanza en vivo siguen siendo dificiles de automatizar.',
        services: ['IA para planificar clases', 'Sistemas de aprendizaje adaptativo', 'Asistentes de retroalimentacion']
      }
    }
  },
  {
    id: 'translator',
    category: 'language',
    automationRisk: 77,
    aiRole: 'hybrid',
    classification: {
      majorId: 'professional',
      midId: 'culture-language',
      subId: 'translators',
      labels: {
        en: {
          major: 'Professional Occupations',
          mid: 'Language and Culture Specialists',
          sub: 'Translators'
        },
        ko: {
          major: '전문가 및 관련 종사자',
          mid: '언어·문화 관련 전문직',
          sub: '번역가'
        },
        es: {
          major: 'Ocupaciones profesionales',
          mid: 'Especialistas en idioma y cultura',
          sub: 'Traductores'
        }
      }
    },
    currentReplacementUrl: 'https://www.deepl.com/en/translator',
    degree: {
      status: 'preferred',
      level: 'bachelor'
    },
    content: {
      en: {
        title: 'Translator',
        summary: 'Converts meaning between languages for documents, products, and communication.',
        tasks: [
          'Translate text while preserving tone, intent, and context.',
          'Localize terminology for markets or industries.',
          'Review nuance, quality, and cultural fit.'
        ],
        skills: ['Language mastery', 'Cultural nuance', 'Editing', 'Domain knowledge'],
        path: [
          'Build advanced fluency in at least two languages.',
          'Practice domain-specific translation in legal, technical, or marketing fields.',
          'Develop editing judgment and localization workflow skills.'
        ],
        degreeNote: 'For general translation, a bachelor-level language or translation degree is often preferred rather than strictly required. In specialized or high-stakes work, formal credentials matter more.',
        aiNow: 'Machine translation and large language models already handle first drafts and many routine requests.',
        aiFuture: 'Volume shifts toward post-editing, localization strategy, and high-stakes nuance where mistakes are expensive.',
        services: ['Machine translation', 'Localization QA tools', 'Terminology assistants']
      },
      ko: {
        title: '번역가',
        summary: '문서, 제품, 커뮤니케이션에서 언어 간 의미를 옮기는 역할입니다.',
        tasks: [
          '톤, 의도, 맥락을 살려 번역합니다.',
          '시장과 산업에 맞게 용어를 현지화합니다.',
          '뉘앙스, 품질, 문화적 적합성을 검토합니다.'
        ],
        skills: ['언어 숙련도', '문화적 감각', '편집 능력', '도메인 지식'],
        path: [
          '최소 두 개 언어에서 높은 수준의 유창성을 갖춥니다.',
          '법률, 기술, 마케팅 등 분야별 번역을 연습합니다.',
          '편집 판단력과 로컬라이제이션 워크플로 역량을 키웁니다.'
        ],
        degreeNote: '일반 번역은 보통 언어 또는 번역 관련 학사 학위를 선호하지만 엄격한 필수 조건은 아닙니다. 다만 전문 분야나 실수 비용이 큰 번역에서는 공식 자격의 중요성이 커집니다.',
        aiNow: '기계 번역과 대형 언어 모델은 초안 작성과 반복적인 요청 처리에 이미 널리 쓰입니다.',
        aiFuture: '앞으로는 포스트에디팅, 현지화 전략, 실수 비용이 큰 고난도 작업 비중이 높아질 것입니다.',
        services: ['기계 번역', '로컬라이제이션 QA 도구', '용어 관리 보조']
      },
      es: {
        title: 'Traductor',
        summary: 'Convierte significado entre idiomas para documentos, productos y comunicacion.',
        tasks: [
          'Traducir textos preservando tono, intencion y contexto.',
          'Localizar terminologia para mercados o industrias.',
          'Revisar matices, calidad y ajuste cultural.'
        ],
        skills: ['Dominio de idiomas', 'Matiz cultural', 'Edicion', 'Conocimiento del sector'],
        path: [
          'Desarrolla fluidez avanzada en al menos dos idiomas.',
          'Practica traduccion especializada en campos legales, tecnicos o de marketing.',
          'Fortalece criterio editorial y manejo de flujos de localizacion.'
        ],
        degreeNote: 'Para traduccion general, una licenciatura en idiomas o traduccion suele ser preferida mas que estrictamente obligatoria. En trabajos especializados o de alto riesgo, las credenciales formales pesan mas.',
        aiNow: 'La traduccion automatica y los grandes modelos de lenguaje ya cubren borradores y muchas solicitudes rutinarias.',
        aiFuture: 'El volumen se movera hacia posedicion, estrategia de localizacion y trabajos de alto riesgo donde el error cuesta caro.',
        services: ['Traduccion automatica', 'Herramientas QA de localizacion', 'Asistentes terminologicos']
      }
    }
  }
];

const state = {
  lang: detectLanguage(),
  query: '',
  major: 'all',
  mid: 'all',
  sub: 'all',
  risk: 'all',
  aiRole: 'all',
  degree: 'all',
  sort: 'riskDesc'
};

const elements = {
  brandSubtitle: document.getElementById('brandSubtitle'),
  heroEyebrow: document.getElementById('heroEyebrow'),
  heroTitle: document.getElementById('heroTitle'),
  heroLead: document.getElementById('heroLead'),
  statJobsValue: document.getElementById('statJobsValue'),
  statJobsLabel: document.getElementById('statJobsLabel'),
  statRiskValue: document.getElementById('statRiskValue'),
  statRiskLabel: document.getElementById('statRiskLabel'),
  statLowRiskValue: document.getElementById('statLowRiskValue'),
  statLowRiskLabel: document.getElementById('statLowRiskLabel'),
  jobFilterKicker: document.getElementById('jobFilterKicker'),
  jobFilterTitle: document.getElementById('jobFilterTitle'),
  aiFilterKicker: document.getElementById('aiFilterKicker'),
  aiFilterTitle: document.getElementById('aiFilterTitle'),
  searchLabel: document.getElementById('searchLabel'),
  searchInput: document.getElementById('searchInput'),
  majorLabel: document.getElementById('majorLabel'),
  majorSelect: document.getElementById('majorSelect'),
  midLabel: document.getElementById('midLabel'),
  midSelect: document.getElementById('midSelect'),
  subLabel: document.getElementById('subLabel'),
  subSelect: document.getElementById('subSelect'),
  riskLabel: document.getElementById('riskLabel'),
  riskSelect: document.getElementById('riskSelect'),
  roleLabel: document.getElementById('roleLabel'),
  roleSelect: document.getElementById('roleSelect'),
  degreeLabel: document.getElementById('degreeLabel'),
  degreeSelect: document.getElementById('degreeSelect'),
  sortLabel: document.getElementById('sortLabel'),
  sortSelect: document.getElementById('sortSelect'),
  insightKicker: document.getElementById('insightKicker'),
  insightTitle: document.getElementById('insightTitle'),
  insightLead: document.getElementById('insightLead'),
  riskBars: document.getElementById('riskBars'),
  guideKicker: document.getElementById('guideKicker'),
  guideTitle: document.getElementById('guideTitle'),
  guideList: document.getElementById('guideList'),
  resultsKicker: document.getElementById('resultsKicker'),
  resultsTitle: document.getElementById('resultsTitle'),
  resultsSummary: document.getElementById('resultsSummary'),
  jobGrid: document.getElementById('jobGrid'),
  roadmapKicker: document.getElementById('roadmapKicker'),
  roadmapTitle: document.getElementById('roadmapTitle'),
  roadmapLead: document.getElementById('roadmapLead'),
  roadmapGrid: document.getElementById('roadmapGrid'),
  languageSwitch: document.getElementById('languageSwitch')
};

attachEvents();
render();

function attachEvents() {
  elements.searchInput.addEventListener('input', (event) => {
    state.query = event.target.value.trim().toLowerCase();
    render();
  });

  elements.majorSelect.addEventListener('change', (event) => {
    state.major = event.target.value;
    state.mid = 'all';
    state.sub = 'all';
    render();
  });

  elements.midSelect.addEventListener('change', (event) => {
    state.mid = event.target.value;
    state.sub = 'all';
    render();
  });

  elements.subSelect.addEventListener('change', (event) => {
    state.sub = event.target.value;
    render();
  });

  elements.riskSelect.addEventListener('change', (event) => {
    state.risk = event.target.value;
    render();
  });

  elements.roleSelect.addEventListener('change', (event) => {
    state.aiRole = event.target.value;
    render();
  });

  elements.degreeSelect.addEventListener('change', (event) => {
    state.degree = event.target.value;
    render();
  });

  elements.sortSelect.addEventListener('change', (event) => {
    state.sort = event.target.value;
    render();
  });

  elements.languageSwitch.addEventListener('click', (event) => {
    const button = event.target.closest('[data-lang]');

    if (!button) {
      return;
    }

    state.lang = button.dataset.lang;
    render();
  });
}

function render() {
  const copy = UI[state.lang];
  const filteredJobs = sortJobs(filterJobs());
  const stats = summarize(filteredJobs);

  document.documentElement.lang = state.lang;
  hydrateChrome(copy);
  hydrateFilters(copy);
  hydrateStats(copy, stats);
  hydrateInsights(copy, stats, filteredJobs.length);
  hydrateResults(copy, filteredJobs);
  hydrateRoadmap(copy);
  renderLanguageButtons();
}

function hydrateChrome(copy) {
  elements.brandSubtitle.textContent = copy.brandSubtitle;
  elements.heroEyebrow.textContent = copy.heroEyebrow;
  elements.heroTitle.textContent = copy.heroTitle;
  elements.heroLead.textContent = copy.heroLead;
  elements.jobFilterKicker.textContent = copy.filterGroups.jobKicker;
  elements.jobFilterTitle.textContent = copy.filterGroups.jobTitle;
  elements.aiFilterKicker.textContent = copy.filterGroups.aiKicker;
  elements.aiFilterTitle.textContent = copy.filterGroups.aiTitle;
  elements.searchLabel.textContent = copy.controls.search;
  elements.searchInput.placeholder = copy.controls.searchPlaceholder;
  elements.majorLabel.textContent = copy.controls.major;
  elements.midLabel.textContent = copy.controls.mid;
  elements.subLabel.textContent = copy.controls.sub;
  elements.riskLabel.textContent = copy.controls.risk;
  elements.roleLabel.textContent = copy.controls.role;
  elements.degreeLabel.textContent = copy.controls.degree;
  elements.sortLabel.textContent = copy.controls.sort;
  elements.resultsKicker.textContent = copy.results.kicker;
  elements.resultsTitle.textContent = copy.results.title;
  elements.insightKicker.textContent = copy.insights.kicker;
  elements.insightTitle.textContent = copy.insights.title;
  elements.insightLead.textContent = copy.insights.lead;
  elements.guideKicker.textContent = copy.insights.guideKicker;
  elements.guideTitle.textContent = copy.insights.guideTitle;
  elements.roadmapKicker.textContent = copy.roadmap.kicker;
  elements.roadmapTitle.textContent = copy.roadmap.title;
  elements.roadmapLead.textContent = copy.roadmap.lead;
}

function hydrateFilters(copy) {
  setOptions(elements.majorSelect, [
    ['all', copy.filters.major.all],
    ...getClassificationOptions(copy, 'major')
  ], state.major);

  setOptions(elements.midSelect, [
    ['all', copy.filters.mid.all],
    ...getClassificationOptions(copy, 'mid')
  ], state.mid);

  setOptions(elements.subSelect, [
    ['all', copy.filters.sub.all],
    ...getClassificationOptions(copy, 'sub')
  ], state.sub);

  setOptions(elements.riskSelect, [
    ['all', copy.filters.risk.all],
    ['low', copy.filters.risk.low],
    ['medium', copy.filters.risk.medium],
    ['high', copy.filters.risk.high]
  ], state.risk);

  setOptions(elements.roleSelect, [
    ['all', copy.filters.role.all],
    ['replace', copy.filters.role.replace],
    ['hybrid', copy.filters.role.hybrid],
    ['enhance', copy.filters.role.enhance]
  ], state.aiRole);

  setOptions(elements.degreeSelect, [
    ['all', copy.filters.degree.all],
    ['required', copy.filters.degree.required],
    ['preferred', copy.filters.degree.preferred],
    ['optional', copy.filters.degree.optional]
  ], state.degree);

  setOptions(elements.sortSelect, [
    ['riskDesc', copy.filters.sort.riskDesc],
    ['riskAsc', copy.filters.sort.riskAsc],
    ['title', copy.filters.sort.title]
  ], state.sort);
}

function hydrateStats(copy, stats) {
  elements.statJobsValue.textContent = formatDashboardNumber(stats.count);
  elements.statJobsLabel.textContent = copy.stats.jobs;
  elements.statRiskValue.textContent = `${formatDashboardNumber(stats.highRiskShare)}%`;
  elements.statRiskLabel.textContent = copy.stats.highRisk;
  elements.statLowRiskValue.textContent = `${formatDashboardNumber(stats.lowRiskShare)}%`;
  elements.statLowRiskLabel.textContent = copy.stats.lowRisk;
}

function hydrateInsights(copy, stats, totalCount) {
  const total = totalCount || 1;
  const bars = [
    ['low', stats.low],
    ['medium', stats.medium],
    ['high', stats.high]
  ];

  elements.riskBars.innerHTML = bars.map(([band, count]) => {
    const percentage = Math.round((count / total) * 100);

    return `
      <div class="risk-row">
        <div class="risk-row-header">
          <span>${copy.riskBands[band]}</span>
          <span>${percentage}%</span>
        </div>
        <div class="risk-row-track">
          <div class="risk-row-fill ${band}" style="width: ${percentage}%"></div>
        </div>
      </div>
    `;
  }).join('');

  elements.guideList.innerHTML = copy.insights.guideItems.map((item) => `
    <div class="guide-item">
      <strong>${item.title}</strong>
      <p class="detail-copy">${item.body}</p>
    </div>
  `).join('');
}

function hydrateResults(copy, jobs) {
  elements.resultsSummary.textContent = copy.results.summary(jobs.length);

  if (jobs.length === 0) {
    elements.jobGrid.innerHTML = `<div class="empty-state">${copy.noResults}</div>`;
    return;
  }

  elements.jobGrid.innerHTML = jobs.map((job) => renderCard(job, copy)).join('');
}

function hydrateRoadmap(copy) {
  elements.roadmapGrid.innerHTML = copy.roadmap.steps.map((step) => `
    <div class="roadmap-step">
      <strong>${step.title}</strong>
      <p>${step.body}</p>
    </div>
  `).join('');
}

function renderCard(job, copy) {
  const localized = job.content[state.lang] || job.content.en;
  const classification = getClassificationLabels(job);
  const band = getRiskBand(job.automationRisk);
  const roleLabel = copy.roles[job.aiRole];
  const degreeStatusLabel = copy.education.statuses[job.degree.status];
  const degreeLevelLabel = copy.education.levels[job.degree.level];
  const currentReplacementMarkup = job.currentReplacementUrl
    ? `<a class="service-link" href="${job.currentReplacementUrl}" target="_blank" rel="noreferrer">${job.currentReplacementUrl}</a>`
    : '<span class="service-link service-link-none">none</span>';

  return `
    <article class="job-card">
      <div class="card-top">
        <div>
          <div class="card-tags">
            <span class="tag neutral">${classification.major}</span>
            <span class="tag ${job.aiRole}">${roleLabel}</span>
          </div>
          <h3 class="job-title">${localized.title}</h3>
          <p class="job-summary">${localized.summary}</p>
          <p class="classification-path">${classification.major} / ${classification.mid} / ${classification.sub}</p>
        </div>
        <div>
          <p class="risk-number">${job.automationRisk}</p>
          <span class="meter-label">${copy.riskBands[band]}</span>
        </div>
      </div>

      <div class="meter-track" aria-hidden="true">
        <div class="meter-fill ${band}" style="width: ${job.automationRisk}%"></div>
      </div>

      <div class="detail-lists">
        <section class="detail-block">
          <h3>${copy.details.tasks}</h3>
          <ul>${localized.tasks.map((item) => `<li>${item}</li>`).join('')}</ul>
        </section>
        <section class="detail-block">
          <h3>${copy.details.skills}</h3>
          <ul>${localized.skills.map((item) => `<li>${item}</li>`).join('')}</ul>
        </section>
        <section class="detail-block">
          <h3>${copy.details.path}</h3>
          <ul>${localized.path.map((item) => `<li>${item}</li>`).join('')}</ul>
        </section>
      </div>

      <div class="detail-lists">
        <section class="detail-block">
          <h3>${copy.details.aiNow}</h3>
          <p class="detail-copy">${localized.aiNow}</p>
        </section>
        <section class="detail-block">
          <h3>${copy.details.aiFuture}</h3>
          <p class="detail-copy">${localized.aiFuture}</p>
        </section>
      </div>

      <div class="detail-lists">
        <section class="detail-block">
          <h3>${copy.details.degree}</h3>
          <div class="detail-copy">
            <div class="service-list">
              <span class="service-pill">${degreeStatusLabel}</span>
              <span class="service-pill">${degreeLevelLabel}</span>
            </div>
            <p>${localized.degreeNote}</p>
          </div>
        </section>

        <section class="detail-block">
          <h3>${copy.details.currentReplacement}</h3>
          <p class="detail-copy">${currentReplacementMarkup}</p>
        </section>

        <section class="detail-block">
          <h3>${copy.details.services}</h3>
          <div class="service-list">
            ${localized.services.map((item) => `<span class="service-pill">${item}</span>`).join('')}
          </div>
        </section>
      </div>
    </article>
  `;
}

function renderLanguageButtons() {
  elements.languageSwitch.querySelectorAll('[data-lang]').forEach((button) => {
    button.setAttribute('aria-pressed', String(button.dataset.lang === state.lang));
  });
}

function setOptions(select, options, selectedValue) {
  select.innerHTML = options.map(([value, label]) => `
    <option value="${value}" ${value === selectedValue ? 'selected' : ''}>${label}</option>
  `).join('');
}

function getClassificationLabels(job) {
  return job.classification.labels[state.lang] || job.classification.labels.en;
}

function getClassificationOptions(copy, level) {
  const options = new Map();

  JOBS.forEach((job) => {
    const labels = getClassificationLabels(job);
    const matchesMajor = state.major === 'all' || job.classification.majorId === state.major;
    const matchesMid = state.mid === 'all' || job.classification.midId === state.mid;

    if (level === 'major') {
      options.set(job.classification.majorId, labels.major);
      return;
    }

    if (level === 'mid' && matchesMajor) {
      options.set(job.classification.midId, labels.mid);
      return;
    }

    if (level === 'sub' && matchesMajor && matchesMid) {
      options.set(job.classification.subId, labels.sub);
    }
  });

  return Array.from(options.entries()).sort((left, right) => {
    return left[1].localeCompare(right[1], copy.locale);
  });
}

function filterJobs() {
  return JOBS.filter((job) => {
    const riskBand = getRiskBand(job.automationRisk);
    const matchesMajor = state.major === 'all' || state.major === job.classification.majorId;
    const matchesMid = state.mid === 'all' || state.mid === job.classification.midId;
    const matchesSub = state.sub === 'all' || state.sub === job.classification.subId;
    const matchesRisk = state.risk === 'all' || state.risk === riskBand;
    const matchesRole = state.aiRole === 'all' || state.aiRole === job.aiRole;
    const matchesDegree = state.degree === 'all' || state.degree === job.degree.status;
    const matchesQuery = state.query.length === 0 || searchText(job).includes(state.query);

    return matchesMajor && matchesMid && matchesSub && matchesRisk && matchesRole && matchesDegree && matchesQuery;
  });
}

function sortJobs(jobs) {
  return [...jobs].sort((left, right) => {
    if (state.sort === 'riskAsc') {
      return left.automationRisk - right.automationRisk;
    }

    if (state.sort === 'title') {
      const leftTitle = (left.content[state.lang] || left.content.en).title;
      const rightTitle = (right.content[state.lang] || right.content.en).title;

      return leftTitle.localeCompare(rightTitle, UI[state.lang].locale);
    }

    return right.automationRisk - left.automationRisk;
  });
}

function summarize(jobs) {
  const summary = {
    count: jobs.length,
    highRiskShare: 0,
    lowRiskShare: 0,
    low: 0,
    medium: 0,
    high: 0
  };

  if (jobs.length === 0) {
    return summary;
  }

  jobs.forEach((job) => {
    const band = getRiskBand(job.automationRisk);
    summary[band] += 1;

    if (band === 'high') {
      summary.highRiskShare += 1;
    }

    if (band === 'low') {
      summary.lowRiskShare += 1;
    }
  });

  summary.highRiskShare = Math.round((summary.highRiskShare / jobs.length) * 100);
  summary.lowRiskShare = Math.round((summary.lowRiskShare / jobs.length) * 100);

  return summary;
}

function formatDashboardNumber(value) {
  const rounded = Math.round(value);

  if (rounded >= 100) {
    return String(rounded);
  }

  return String(rounded).padStart(2, '0');
}

function getRiskBand(score) {
  if (score >= 65) {
    return 'high';
  }

  if (score >= 35) {
    return 'medium';
  }

  return 'low';
}

function searchText(job) {
  const classificationText = Object.values(job.classification.labels).map((labels) => {
    return [labels.major, labels.mid, labels.sub].join(' ');
  });

  return Object.values(job.content).map((content) => {
    return [
      content.title,
      content.summary,
      ...content.tasks,
      ...content.skills,
      ...content.path,
      content.degreeNote,
      content.aiNow,
      content.aiFuture,
      job.currentReplacementUrl || 'none',
      ...content.services,
      job.degree.status,
      job.degree.level
    ].join(' ');
  }).concat(classificationText).join(' ').toLowerCase();
}

function detectLanguage() {
  const locale = navigator.language.toLowerCase();

  if (locale.startsWith('ko')) {
    return 'ko';
  }

  if (locale.startsWith('es')) {
    return 'es';
  }

  return 'en';
}
