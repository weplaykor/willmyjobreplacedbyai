const ASSET_VERSION = '2026-03-23-3';

const DATA_FILES = {
  jobs: 'data/jobs.json',
  taxonomy: 'data/taxonomy.json',
  news: 'data/news.json',
  articles: 'data/articles.json'
};

const UI = {
  en: {
    locale: 'en-US',
    brandSubtitle: 'World Job Intelligence for an AI-shaped Labor Market',
    heroEyebrow: 'Job replacement map for the next decade',
    heroTitle: 'Will My Job Replaced by AI?',
    heroLead: 'This service helps answer whether AI will replace jobs in each role. Explore job replacement risk by occupation, AI replacing jobs impact, and where AI may replace job tasks versus strengthen people.',
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
      search: 'Search job replacement',
      searchPlaceholder: 'Try nurse, software developer, translator, customer support...',
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
      summary: (count) => `${count} role${count === 1 ? '' : 's'} matched your filters.`,
      coverage: (profiled, total) => `${profiled} fully profiled role${profiled === 1 ? '' : 's'} live out of ${total} detail roles.`
    },
    actions: {
      openDetails: 'View full profile',
      closeDetails: 'Close job details'
    },
    editorial: {
      news: {
        kicker: 'Recent News',
        title: 'AI service releases to watch',
        lead: 'Track official launches and deployment stories that signal where AI may automate work next.',
        more: 'View all news',
        empty: 'News tracker is loading.'
      },
      articles: {
        kicker: 'Job Article',
        title: 'Deep articles for search and strategy',
        lead: 'Use essay-style articles to target high-intent search queries and bigger questions about human value after AI.',
        featured: 'Featured article',
        read: 'Read featured article',
        more: 'Browse article library',
        empty: 'Article library is loading.'
      }
    },
    details: {
      tasks: 'What the job does',
      skills: 'Skills to build',
      path: 'How to reach it',
      degree: 'Degree signal',
      salaryRange: 'Salary range',
      hiringDemand: 'Hiring demand',
      educationPathways: 'Education pathways',
      aiNow: 'AI now',
      aiFuture: 'What changes next',
      currentReplacement: 'Current AI replacement',
      services: 'AI services',
      taxonomy: 'Path',
      rationale: 'Why this risk level',
      automatableNow: 'Tasks AI can already take',
      humanEdge: 'Human edge that remains',
      references: 'Evidence links'
    },
    market: {
      salaryScope: 'Illustrative U.S. annual base pay range.',
      perYear: 'per year',
      demandLevels: {
        high: 'High demand',
        medium: 'Steady demand',
        low: 'Selective demand'
      }
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
    loading: 'Loading job intelligence...',
    loadError: 'Could not load the job dataset. If you opened this file directly, use the deployed website or run a local web server. If this is the live site, make sure the job and taxonomy data files are committed and deployed.',
    noResults: 'No roles matched this combination. Try clearing a filter or using a broader keyword.'
  },
  ko: {
    locale: 'ko-KR',
    brandSubtitle: 'AI 시대 노동시장을 위한 세계 직업 인텔리전스',
    heroEyebrow: '직업 대체 지도를 위한 10년 로드맵',
    heroTitle: 'Will My Job Replaced by AI?',
    heroLead: '이 서비스는 직종별 AI 대체 위험도를 보여주는 지도입니다. AI가 직업을 대체할지, 어떤 직무에서 AI가 일 일부를 대체하는지, 그리고 어떤 일은 사람이 더 중요해지는지를 한 번에 확인할 수 있습니다.',
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
      search: '직업 대체 검색',
      searchPlaceholder: '간호사, 교사, 번역가, 고객지원 등 입력',
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
      summary: (count) => `필터와 일치하는 직무는 ${count}개입니다.`,
      coverage: (profiled, total) => `현재 공개 프로필은 ${profiled}개이며, 전체 detail 직업 노드는 총 ${total}개입니다.`
    },
    actions: {
      openDetails: '상세 프로필 보기',
      closeDetails: '직무 상세 닫기'
    },
    editorial: {
      news: {
        kicker: 'Recent News',
        title: '주목할 AI 서비스 출시 뉴스',
        lead: '어떤 일이 다음으로 자동화될지 보여주는 공식 출시와 실제 도입 사례를 추적합니다.',
        more: '뉴스 전체 보기',
        empty: '뉴스 트래커를 불러오는 중입니다.'
      },
      articles: {
        kicker: 'Job Article',
        title: '검색과 전략을 위한 심층 아티클',
        lead: '검색 수요가 높은 질문과 AI 이후 인간의 역할 같은 깊은 주제를 다루는 글을 모읍니다.',
        featured: '대표 아티클',
        read: '대표 아티클 읽기',
        more: '아티클 라이브러리 보기',
        empty: '아티클 라이브러리를 불러오는 중입니다.'
      }
    },
    details: {
      tasks: '직무 내용',
      skills: '필요 역량',
      path: '진입 방법',
      degree: '학위 요구',
      salaryRange: '급여 범위',
      hiringDemand: '채용 수요',
      educationPathways: '교육 경로',
      aiNow: '현재의 AI',
      aiFuture: '앞으로의 변화',
      currentReplacement: '현재 AI 대체 서비스',
      services: '관련 AI 서비스',
      taxonomy: '경로',
      rationale: '이 위험도로 본 이유',
      automatableNow: 'AI가 이미 처리할 수 있는 일',
      humanEdge: '여전히 사람에게 남는 핵심',
      references: '근거 링크'
    },
    market: {
      salaryScope: '미국 기준 예시 연봉 범위입니다.',
      perYear: '연봉',
      demandLevels: {
        high: '수요 높음',
        medium: '수요 보통',
        low: '수요 선별적'
      }
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
    loading: '직업 인텔리전스를 불러오는 중입니다...',
    loadError: '직업 데이터셋을 불러오지 못했습니다. 로컬 파일을 직접 열었다면 배포된 사이트로 접속하거나 로컬 웹서버로 실행해 주세요. 라이브 사이트라면 직업 데이터와 taxonomy 데이터 파일이 커밋되고 배포되었는지 확인해 주세요.',
    noResults: '이 조합과 일치하는 직무가 없습니다. 필터를 줄이거나 더 넓은 검색어를 사용해 보세요.'
  },
  es: {
    locale: 'es-ES',
    brandSubtitle: 'Inteligencia laboral mundial para un mercado definido por la IA',
    heroEyebrow: 'Mapa profesional para la proxima decada',
    heroTitle: 'Will My Job Replaced by AI?',
    heroLead: 'Este servicio muestra la evolucion del reemplazo por IA por ocupacion. Busca si la IA esta reemplazando trabajos hoy y compara el riesgo de reemplazo, AI replacing jobs, y en que roles la IA mejora a la fuerza laboral.',
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
      summary: (count) => `${count} puesto${count === 1 ? '' : 's'} coincide${count === 1 ? '' : 'n'} con tus filtros.`,
      coverage: (profiled, total) => `${profiled} perfil${profiled === 1 ? '' : 'es'} completo${profiled === 1 ? '' : 's'} publicado${profiled === 1 ? '' : 's'} de ${total} roles detail.`
    },
    actions: {
      openDetails: 'Ver perfil completo',
      closeDetails: 'Cerrar detalles del puesto'
    },
    editorial: {
      news: {
        kicker: 'Recent News',
        title: 'Lanzamientos de IA para seguir',
        lead: 'Sigue anuncios oficiales y casos de despliegue que senalan donde la IA puede automatizar trabajo despues.',
        more: 'Ver todas las noticias',
        empty: 'Cargando seguimiento de noticias.'
      },
      articles: {
        kicker: 'Job Article',
        title: 'Articulos profundos para SEO y estrategia',
        lead: 'Usa ensayos para captar busquedas de alta intencion y preguntas mas profundas sobre el valor humano despues de la IA.',
        featured: 'Articulo destacado',
        read: 'Leer articulo destacado',
        more: 'Explorar biblioteca de articulos',
        empty: 'Cargando biblioteca de articulos.'
      }
    },
    details: {
      tasks: 'Que hace el trabajo',
      skills: 'Habilidades clave',
      path: 'Como llegar',
      degree: 'Requisito de titulo',
      salaryRange: 'Rango salarial',
      hiringDemand: 'Demanda de contratacion',
      educationPathways: 'Rutas educativas',
      aiNow: 'IA hoy',
      aiFuture: 'Lo que cambia despues',
      currentReplacement: 'Reemplazo actual con IA',
      services: 'Servicios de IA',
      taxonomy: 'Ruta',
      rationale: 'Por que este nivel de riesgo',
      automatableNow: 'Tareas que la IA ya puede tomar',
      humanEdge: 'Ventaja humana que permanece',
      references: 'Enlaces de evidencia'
    },
    market: {
      salaryScope: 'Rango salarial anual ilustrativo del mercado de EE. UU.',
      perYear: 'al ano',
      demandLevels: {
        high: 'Demanda alta',
        medium: 'Demanda estable',
        low: 'Demanda selectiva'
      }
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
    loading: 'Cargando inteligencia laboral...',
    loadError: 'No se pudo cargar el conjunto de trabajos. Si abriste el archivo directamente, usa el sitio desplegado o ejecuta un servidor web local. Si es el sitio en produccion, confirma que los archivos de trabajos y taxonomia esten versionados y desplegados.',
    noResults: 'Ningun puesto coincide con esta combinacion. Prueba limpiando un filtro o usando una palabra mas amplia.'
  }
};

const state = {
  lang: detectLanguage(),
  query: getQueryParam(),
  major: 'all',
  mid: 'all',
  sub: 'all',
  risk: 'all',
  aiRole: 'all',
  degree: 'all',
  sort: 'riskDesc',
  jobs: [],
  news: [],
  articles: [],
  taxonomyIndex: createEmptyTaxonomyIndex(),
  isReady: false,
  loadError: false,
  activeJobId: null,
  lastFocusedCard: null
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
  newsKicker: document.getElementById('newsKicker'),
  newsTitle: document.getElementById('newsTitle'),
  newsLead: document.getElementById('newsLead'),
  newsPreviewList: document.getElementById('newsPreviewList'),
  newsMoreLink: document.getElementById('newsMoreLink'),
  articleKicker: document.getElementById('articleKicker'),
  articleTitle: document.getElementById('articleTitle'),
  articleLead: document.getElementById('articleLead'),
  articlePreview: document.getElementById('articlePreview'),
  articleReadLink: document.getElementById('articleReadLink'),
  articleMoreLink: document.getElementById('articleMoreLink'),
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
  languageSwitch: document.getElementById('languageSwitch'),
  jobModal: document.getElementById('jobModal'),
  jobModalTitle: document.getElementById('jobModalTitle'),
  jobModalBody: document.getElementById('jobModalBody'),
  jobModalClose: document.getElementById('jobModalClose')
};

attachEvents();
render();
init();

async function init() {
  const [taxonomyResult, jobsResult, newsResult, articlesResult] = await Promise.allSettled([
    fetchJSON(DATA_FILES.taxonomy),
    fetchJSON(DATA_FILES.jobs),
    fetchJSON(DATA_FILES.news),
    fetchJSON(DATA_FILES.articles)
  ]);

  if (taxonomyResult.status === 'fulfilled' && jobsResult.status === 'fulfilled') {
    state.taxonomyIndex = buildTaxonomyIndex(taxonomyResult.value);
    state.jobs = jobsResult.value;
    state.isReady = true;
  } else {
    console.error('Failed to load required site data', {
      taxonomyError: taxonomyResult.status === 'rejected' ? taxonomyResult.reason : null,
      jobsError: jobsResult.status === 'rejected' ? jobsResult.reason : null
    });
    state.loadError = true;
  }

  if (newsResult.status === 'fulfilled') {
    state.news = sortByPublishedAt(newsResult.value);
  } else {
    console.error('Failed to load news feed', newsResult.reason);
  }

  if (articlesResult.status === 'fulfilled') {
    state.articles = sortByPublishedAt(articlesResult.value);
  } else {
    console.error('Failed to load article library', articlesResult.reason);
  }

  render();
}

function attachEvents() {
  elements.searchInput.addEventListener('input', (event) => {
    state.query = event.target.value.trim().toLowerCase();
    closeJobModal();
    render();
  });

  elements.majorSelect.addEventListener('change', (event) => {
    state.major = event.target.value;
    state.mid = 'all';
    state.sub = 'all';
    closeJobModal();
    render();
  });

  elements.midSelect.addEventListener('change', (event) => {
    state.mid = event.target.value;
    state.sub = 'all';
    closeJobModal();
    render();
  });

  elements.subSelect.addEventListener('change', (event) => {
    state.sub = event.target.value;
    closeJobModal();
    render();
  });

  elements.riskSelect.addEventListener('change', (event) => {
    state.risk = event.target.value;
    closeJobModal();
    render();
  });

  elements.roleSelect.addEventListener('change', (event) => {
    state.aiRole = event.target.value;
    closeJobModal();
    render();
  });

  elements.degreeSelect.addEventListener('change', (event) => {
    state.degree = event.target.value;
    closeJobModal();
    render();
  });

  elements.sortSelect.addEventListener('change', (event) => {
    state.sort = event.target.value;
    closeJobModal();
    render();
  });

  elements.languageSwitch.addEventListener('click', (event) => {
    const button = event.target.closest('[data-lang]');

    if (!button) {
      return;
    }

    state.lang = button.dataset.lang;
    closeJobModal();
    render();
  });

  elements.jobGrid.addEventListener('click', (event) => {
    const card = event.target.closest('.job-card[data-job-id]');

    if (!card || !elements.jobGrid.contains(card)) {
      return;
    }

    openJobModal(card.dataset.jobId);
  });

  elements.jobGrid.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') {
      return;
    }

    const card = event.target.closest('.job-card[data-job-id]');

    if (!card || !elements.jobGrid.contains(card)) {
      return;
    }

    event.preventDefault();
    openJobModal(card.dataset.jobId);
  });

  elements.jobModalClose.addEventListener('click', () => {
    closeJobModal();
  });

  elements.jobModal.addEventListener('click', (event) => {
    if (event.target === elements.jobModal) {
      closeJobModal();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeJobModal();
    }
  });
}

function render() {
  const copy = UI[state.lang];
  const filteredJobs = state.isReady ? sortJobs(filterJobs()) : [];
  const stats = summarize(filteredJobs);
  const selectedJobStillExists = state.jobs.some((job) => job.id === state.activeJobId);

  if (state.activeJobId && !selectedJobStillExists) {
    closeJobModal();
  }

  document.documentElement.lang = state.lang;
  hydrateChrome(copy);
  hydrateEditorial(copy);
  hydrateFilters(copy);
  hydrateStats(copy, stats);
  hydrateInsights(copy, stats, filteredJobs.length);
  renderLanguageButtons();
  hydrateModalCopy(copy);

  if (state.loadError) {
    elements.resultsSummary.textContent = copy.loadError;
    elements.jobGrid.innerHTML = `<div class="empty-state">${escapeHtml(copy.loadError)}</div>`;
    return;
  }

  if (!state.isReady) {
    elements.resultsSummary.textContent = copy.loading;
    elements.jobGrid.innerHTML = `<div class="empty-state">${escapeHtml(copy.loading)}</div>`;
    return;
  }

  hydrateResults(copy, filteredJobs);
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
  elements.searchInput.value = state.query;
}

function hydrateEditorial(copy) {
  elements.newsKicker.textContent = copy.editorial.news.kicker;
  elements.newsTitle.textContent = copy.editorial.news.title;
  elements.newsLead.textContent = copy.editorial.news.lead;
  elements.newsMoreLink.textContent = copy.editorial.news.more;
  elements.newsMoreLink.href = 'news.html';

  elements.articleKicker.textContent = copy.editorial.articles.kicker;
  elements.articleTitle.textContent = copy.editorial.articles.title;
  elements.articleLead.textContent = copy.editorial.articles.lead;
  elements.articleMoreLink.textContent = copy.editorial.articles.more;
  elements.articleMoreLink.href = 'articles.html';

  if (state.news.length === 0) {
    elements.newsPreviewList.innerHTML = `<p class="editorial-empty">${escapeHtml(copy.editorial.news.empty)}</p>`;
  } else {
    elements.newsPreviewList.innerHTML = state.news.slice(0, 4).map((item) => renderNewsPreviewCard(item, copy)).join('');
  }

  if (state.articles.length === 0) {
    elements.articlePreview.innerHTML = `<p class="editorial-empty">${escapeHtml(copy.editorial.articles.empty)}</p>`;
    elements.articleReadLink.textContent = copy.editorial.articles.read;
    elements.articleReadLink.href = 'articles.html';
    return;
  }

  const featuredArticle = state.articles[0];
  elements.articlePreview.innerHTML = renderArticlePreviewCard(featuredArticle, copy);
  elements.articleReadLink.textContent = copy.editorial.articles.read;
  elements.articleReadLink.href = `articles.html#${escapeAttribute(featuredArticle.id)}`;
}

function hydrateModalCopy(copy) {
  elements.jobModalClose.setAttribute('aria-label', copy.actions.closeDetails);
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
          <span>${escapeHtml(copy.riskBands[band])}</span>
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
      <strong>${escapeHtml(item.title)}</strong>
      <p class="detail-copy">${escapeHtml(item.body)}</p>
    </div>
  `).join('');
}

function hydrateResults(copy, jobs) {
  elements.resultsSummary.textContent = `${copy.results.summary(jobs.length)} ${copy.results.coverage(state.jobs.length, state.taxonomyIndex.details.size)}`;

  if (jobs.length === 0) {
    elements.jobGrid.innerHTML = `<div class="empty-state">${escapeHtml(copy.noResults)}</div>`;
    return;
  }

  elements.jobGrid.innerHTML = jobs.map((job) => renderCard(job, copy)).join('');
}

function openJobModal(jobId) {
  const copy = UI[state.lang];
  const job = state.jobs.find((item) => item.id === jobId);

  if (!job) {
    return;
  }

  state.activeJobId = jobId;
  state.lastFocusedCard = Array.from(elements.jobGrid.querySelectorAll('.job-card[data-job-id]')).find((card) => card.dataset.jobId === jobId) || null;
  elements.jobModalBody.innerHTML = renderJobDetails(job, copy);
  elements.jobModalTitle.textContent = getLocalizedJobContent(job).title;
  elements.jobModal.classList.add('is-open');
  elements.jobModal.setAttribute('aria-hidden', 'false');
  elements.jobModalClose.setAttribute('aria-label', copy.actions.closeDetails);
  document.body.classList.add('no-scroll');
  elements.jobModalClose.focus();
}

function closeJobModal() {
  if (!state.activeJobId) {
    return;
  }

  state.activeJobId = null;
  elements.jobModal.classList.remove('is-open');
  elements.jobModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('no-scroll');
  elements.jobModalBody.innerHTML = '';
  elements.jobModalTitle.textContent = '';

  if (state.lastFocusedCard) {
    state.lastFocusedCard.focus();
    state.lastFocusedCard = null;
  }
}

function renderCard(job, copy) {
  const localized = getLocalizedJobContent(job);
  const classification = getClassificationLabels(job.classification);
  const band = getRiskBand(job.automationRisk);
  const roleLabel = copy.roles[job.aiRole];
  const taxonomyPath = [
    classification.major,
    classification.mid,
    classification.sub,
    classification.detail
  ].filter(Boolean).join(' / ');

  return `
    <article
      class="job-card"
      role="button"
      tabindex="0"
      data-job-id="${escapeAttribute(job.id)}"
      aria-label="${escapeAttribute(`${copy.actions.openDetails}: ${localized.title}`)}"
    >
      <div class="card-top">
        <div>
          <div class="card-tags">
            <span class="tag neutral">${escapeHtml(classification.major)}</span>
            <span class="tag ${job.aiRole}">${escapeHtml(roleLabel)}</span>
          </div>
          <h3 class="job-title">${escapeHtml(localized.title)}</h3>
          <p class="job-summary">${escapeHtml(localized.summary)}</p>
          <p class="classification-path">${escapeHtml(copy.details.taxonomy)}: ${escapeHtml(taxonomyPath)}</p>
        </div>
        <div>
          <p class="risk-number">${job.automationRisk}</p>
          <span class="meter-label">${escapeHtml(copy.riskBands[band])}</span>
        </div>
      </div>

      <div class="meter-track" aria-hidden="true">
        <div class="meter-fill ${band}" style="width: ${job.automationRisk}%"></div>
      </div>

      <p class="job-open-label">${escapeHtml(copy.actions.openDetails)} →</p>
    </article>
  `;
}

function renderJobDetails(job, copy) {
  const localized = getLocalizedJobContent(job);
  const evidence = getLocalizedEvidence(job);
  const classification = getClassificationLabels(job.classification);
  const band = getRiskBand(job.automationRisk);
  const roleLabel = copy.roles[job.aiRole];
  const degreeStatusLabel = copy.education.statuses[job.degree.status] || job.degree.status;
  const degreeLevelLabel = copy.education.levels[job.degree.level] || job.degree.level;
  const hiringDemandLevelLabel = copy.market.demandLevels[job.marketSignals?.hiringDemand?.level] || job.marketSignals?.hiringDemand?.level || '';
  const hiringDemandNote = getLocalizedContent(job.marketSignals?.hiringDemand?.note);
  const salaryRangeLabel = formatSalaryRange(job.marketSignals?.salaryRange, copy);
  const taxonomyPath = [
    classification.major,
    classification.mid,
    classification.sub,
    classification.detail
  ].filter(Boolean).join(' / ');
  const currentReplacementMarkup = job.currentReplacementUrl
    ? `<a class="service-link" href="${escapeAttribute(job.currentReplacementUrl)}" target="_blank" rel="noreferrer noopener">${escapeHtml(job.currentReplacementUrl)}</a>`
    : '<span class="service-link service-link-none">none</span>';

  return `
    <article class="job-card job-card-modal">
      <div class="card-top">
        <div>
          <div class="card-tags">
            <span class="tag neutral">${escapeHtml(classification.major)}</span>
            <span class="tag ${job.aiRole}">${escapeHtml(roleLabel)}</span>
          </div>
          <h3 class="job-title">${escapeHtml(localized.title)}</h3>
          <p class="job-summary">${escapeHtml(localized.summary)}</p>
          <p class="classification-path">${escapeHtml(copy.details.taxonomy)}: ${escapeHtml(taxonomyPath)}</p>
        </div>
        <div>
          <p class="risk-number">${job.automationRisk}</p>
          <span class="meter-label">${escapeHtml(copy.riskBands[band])}</span>
        </div>
      </div>

      <div class="meter-track" aria-hidden="true">
        <div class="meter-fill ${band}" style="width: ${job.automationRisk}%"></div>
      </div>

      <div class="detail-lists">
        <section class="detail-block">
          <h3>${escapeHtml(copy.details.tasks)}</h3>
          ${renderStringList(localized.tasks)}
        </section>
        <section class="detail-block">
          <h3>${escapeHtml(copy.details.skills)}</h3>
          ${renderStringList(localized.skills)}
        </section>
        <section class="detail-block">
          <h3>${escapeHtml(copy.details.path)}</h3>
          ${renderStringList(localized.path)}
        </section>
      </div>

      <div class="detail-lists">
        <section class="detail-block">
          <h3>${escapeHtml(copy.details.aiNow)}</h3>
          <p class="detail-copy">${escapeHtml(localized.aiNow)}</p>
        </section>
        <section class="detail-block">
          <h3>${escapeHtml(copy.details.aiFuture)}</h3>
          <p class="detail-copy">${escapeHtml(localized.aiFuture)}</p>
        </section>
      </div>

      <div class="detail-lists">
        <section class="detail-block">
          <h3>${escapeHtml(copy.details.degree)}</h3>
          <div class="detail-copy">
            <div class="service-list">
              <span class="service-pill">${escapeHtml(degreeStatusLabel)}</span>
              <span class="service-pill">${escapeHtml(degreeLevelLabel)}</span>
            </div>
            <p>${escapeHtml(localized.degreeNote)}</p>
          </div>
        </section>

        <section class="detail-block">
          <h3>${escapeHtml(copy.details.salaryRange)}</h3>
          <div class="detail-copy">
            <div class="service-list">
              <span class="service-pill">${escapeHtml(salaryRangeLabel)}</span>
            </div>
            <p>${escapeHtml(copy.market.salaryScope)}</p>
          </div>
        </section>

        <section class="detail-block">
          <h3>${escapeHtml(copy.details.hiringDemand)}</h3>
          <div class="detail-copy">
            <div class="service-list">
              <span class="service-pill">${escapeHtml(hiringDemandLevelLabel)}</span>
            </div>
            <p>${escapeHtml(hiringDemandNote)}</p>
          </div>
        </section>
      </div>

      <div class="detail-lists">
        <section class="detail-block">
          <h3>${escapeHtml(copy.details.educationPathways)}</h3>
          ${renderStringList(localized.educationPathways || [])}
        </section>

        <section class="detail-block">
          <h3>${escapeHtml(copy.details.currentReplacement)}</h3>
          <p class="detail-copy">${currentReplacementMarkup}</p>
        </section>

        <section class="detail-block">
          <h3>${escapeHtml(copy.details.services)}</h3>
          <div class="service-list">
            ${renderPillList(localized.services)}
          </div>
        </section>
      </div>

      <div class="detail-lists">
        <section class="detail-block">
          <h3>${escapeHtml(copy.details.rationale)}</h3>
          <p class="detail-copy">${escapeHtml(evidence.rationale)}</p>
        </section>
        <section class="detail-block">
          <h3>${escapeHtml(copy.details.automatableNow)}</h3>
          ${renderStringList(evidence.automatableNow)}
        </section>
        <section class="detail-block">
          <h3>${escapeHtml(copy.details.humanEdge)}</h3>
          ${renderStringList(evidence.humanEdge)}
        </section>
      </div>

      <div class="detail-lists">
        <section class="detail-block">
          <h3>${escapeHtml(copy.details.references)}</h3>
          <div class="reference-list">
            ${renderReferences(job.aiEvidence.references || [])}
          </div>
        </section>
      </div>
    </article>
  `;
}

function renderNewsPreviewCard(item, copy) {
  const headline = item.url
    ? `<a class="news-preview-title" href="${escapeAttribute(item.url)}" target="_blank" rel="noreferrer noopener">${escapeHtml(item.title)}</a>`
    : `<span class="news-preview-title">${escapeHtml(item.title)}</span>`;

  return `
    <article class="news-preview-item">
      <div class="news-preview-meta">
        <span>${escapeHtml(formatContentDate(item.publishedAt, copy.locale))}</span>
        <span>${escapeHtml(item.source)}</span>
      </div>
      ${headline}
      <p class="news-preview-summary">${escapeHtml(item.summary)}</p>
    </article>
  `;
}

function renderArticlePreviewCard(article, copy) {
  return `
    <div class="article-preview-card">
      <div class="news-preview-meta">
        <span>${escapeHtml(copy.editorial.articles.featured)}</span>
        <span>${escapeHtml(formatContentDate(article.publishedAt, copy.locale))}</span>
        <span>${escapeHtml(article.readTime)}</span>
      </div>
      <h3 class="article-preview-title">${escapeHtml(article.title)}</h3>
      <p class="article-preview-hook">${escapeHtml(article.hook)}</p>
      <p class="article-preview-summary">${escapeHtml(article.excerpt)}</p>
      <div class="keyword-list">
        ${article.keywords.slice(0, 4).map((keyword) => `<span class="keyword-chip">${escapeHtml(keyword)}</span>`).join('')}
      </div>
    </div>
  `;
}

function renderLanguageButtons() {
  elements.languageSwitch.querySelectorAll('[data-lang]').forEach((button) => {
    button.setAttribute('aria-pressed', String(button.dataset.lang === state.lang));
  });
}

function setOptions(select, options, selectedValue) {
  select.innerHTML = options.map(([value, label]) => `
    <option value="${escapeAttribute(value)}" ${value === selectedValue ? 'selected' : ''}>${escapeHtml(label)}</option>
  `).join('');
}

function filterJobs() {
  return state.jobs.filter((job) => {
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
      const leftTitle = getLocalizedJobContent(left).title;
      const rightTitle = getLocalizedJobContent(right).title;

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

function getClassificationOptions(copy, level) {
  const options = new Map();

  state.jobs.forEach((job) => {
    const classification = getClassificationLabels(job.classification);
    const matchesMajor = state.major === 'all' || job.classification.majorId === state.major;
    const matchesMid = state.mid === 'all' || job.classification.midId === state.mid;

    if (level === 'major') {
      options.set(job.classification.majorId, classification.major);
      return;
    }

    if (level === 'mid' && matchesMajor) {
      options.set(job.classification.midId, classification.mid);
      return;
    }

    if (level === 'sub' && matchesMajor && matchesMid) {
      options.set(job.classification.subId, classification.sub);
    }
  });

  return Array.from(options.entries()).sort((left, right) => {
    return left[1].localeCompare(right[1], copy.locale);
  });
}

function getClassificationLabels(classification) {
  const major = state.taxonomyIndex.majors.get(classification.majorId);
  const mid = state.taxonomyIndex.mids.get(classification.midId);
  const sub = state.taxonomyIndex.subs.get(classification.subId);
  const detail = state.taxonomyIndex.details.get(classification.detailId);

  return {
    major: getLocalizedLabel(major?.labels, classification.majorId),
    mid: getLocalizedLabel(mid?.labels, classification.midId),
    sub: getLocalizedLabel(sub?.labels, classification.subId),
    detail: getLocalizedLabel(detail?.labels, classification.detailId)
  };
}

function getLocalizedJobContent(job) {
  return job.content[state.lang] || job.content.en;
}

function getLocalizedEvidence(job) {
  return {
    rationale: getLocalizedContent(job.aiEvidence?.rationale),
    automatableNow: getLocalizedArray(job.aiEvidence?.automatableNow),
    humanEdge: getLocalizedArray(job.aiEvidence?.humanEdge)
  };
}

function formatSalaryRange(range, copy) {
  if (!range || typeof range.min !== 'number' || typeof range.max !== 'number') {
    return 'none';
  }

  const formatter = new Intl.NumberFormat(copy.locale, {
    style: 'currency',
    currency: range.currency || 'USD',
    maximumFractionDigits: 0
  });

  return `${formatter.format(range.min)} - ${formatter.format(range.max)} ${copy.market.perYear}`;
}

function searchText(job) {
  const localized = Object.values(job.content);
  const classification = getClassificationLabels(job.classification);
  const evidence = job.aiEvidence || {};
  const demandNotes = Object.values(job.marketSignals?.hiringDemand?.note || {});
  const rationale = Object.values(evidence.rationale || {});
  const automatableNow = flattenLocalizedLists(evidence.automatableNow);
  const humanEdge = flattenLocalizedLists(evidence.humanEdge);
  const references = (evidence.references || []).flatMap((item) => [item.name, item.url]);

  return localized.map((content) => {
    return [
      content.title,
      content.summary,
      ...content.tasks,
      ...content.skills,
      ...content.path,
      ...(content.educationPathways || []),
      content.degreeNote,
      content.aiNow,
      content.aiFuture,
      ...content.services
    ].join(' ');
  }).concat([
    classification.major,
    classification.mid,
    classification.sub,
    classification.detail,
    job.currentReplacementUrl || 'none',
    job.degree.status,
    job.degree.level,
    job.marketSignals?.salaryRange?.currency || '',
    String(job.marketSignals?.salaryRange?.min || ''),
    String(job.marketSignals?.salaryRange?.max || ''),
    job.marketSignals?.salaryRange?.scope || '',
    job.marketSignals?.hiringDemand?.level || '',
    ...demandNotes,
    ...rationale,
    ...automatableNow,
    ...humanEdge,
    ...references
  ]).join(' ').toLowerCase();
}

function createEmptyTaxonomyIndex() {
  return {
    majors: new Map(),
    mids: new Map(),
    subs: new Map(),
    details: new Map()
  };
}

function buildTaxonomyIndex(taxonomy) {
  const index = createEmptyTaxonomyIndex();

  (taxonomy.majors || []).forEach((major) => {
    index.majors.set(major.id, major);

    (major.mids || []).forEach((mid) => {
      index.mids.set(mid.id, mid);

      (mid.subs || []).forEach((sub) => {
        index.subs.set(sub.id, sub);

        (sub.details || []).forEach((detail) => {
          index.details.set(detail.id, detail);
        });
      });
    });
  });

  return index;
}

function renderStringList(items) {
  return `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`;
}

function renderPillList(items) {
  return items.map((item) => `<span class="service-pill">${escapeHtml(item)}</span>`).join('');
}

function renderReferences(items) {
  if (items.length === 0) {
    return '<span class="service-link service-link-none">none</span>';
  }

  return items.map((item) => {
    return `<a class="service-link" href="${escapeAttribute(item.url)}" target="_blank" rel="noreferrer noopener">${escapeHtml(item.name)}</a>`;
  }).join('');
}

function getLocalizedLabel(labels, fallback) {
  return labels?.[state.lang] || labels?.en || fallback;
}

function getLocalizedContent(value) {
  return value?.[state.lang] || value?.en || '';
}

function getLocalizedArray(value) {
  return value?.[state.lang] || value?.en || [];
}

function flattenLocalizedLists(value) {
  return Object.values(value || {}).flatMap((list) => list);
}

function sortByPublishedAt(items) {
  return [...items].sort((left, right) => {
    return new Date(right.publishedAt).getTime() - new Date(left.publishedAt).getTime();
  });
}

function formatContentDate(dateString, locale) {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(new Date(dateString));
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

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function escapeAttribute(value) {
  return escapeHtml(value);
}

async function fetchJSON(path) {
  const assetPath = path.includes('?') ? `${path}&v=${ASSET_VERSION}` : `${path}?v=${ASSET_VERSION}`;
  const response = await fetch(assetPath, { cache: 'no-store' });

  if (!response.ok) {
    throw new Error(`Failed to load ${assetPath}: ${response.status}`);
  }

  return response.json();
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

function getQueryParam() {
  return new URLSearchParams(window.location.search).get('search')?.trim().toLowerCase() || '';
}
