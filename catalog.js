const ASSET_VERSION = '2026-03-24-6';
const DATA_FILES = {
  jobs: 'data/jobs.json',
  taxonomy: 'data/taxonomy.json'
};
const URL_PARAMS = new URLSearchParams(window.location.search);

const UI = {
  en: {
    locale: 'en-US',
    nav: {
      home: 'Home',
      catalog: 'Job Catalog',
      news: 'AI News',
      articles: 'Articles',
      faq: 'FAQ'
    },
    hero: {
      kicker: 'Filtered Catalog',
      title: 'Cards for your current search and filters',
      lead: 'This page shows the job cards that match what you selected in job classification and AI classification.'
    },
    results: {
      kicker: 'Matching jobs',
      title: 'Results',
      summary: (count) => `${count} role${count === 1 ? '' : 's'} matched your current filters.`,
      pageTitle: (count) => `${count} Matching Jobs | Will My Job Be Replaced by AI?`
    },
    actions: {
      backHome: 'Back to home',
      editFilters: 'Edit filters on home',
      openDetails: 'View full profile',
      closeDetails: 'Close job details'
    },
    chips: {
      search: 'Search',
      all: 'All jobs'
    },
    controls: {
      major: '1st classification (major)',
      mid: '2nd classification (mid)',
      sub: '3rd classification (sub)',
      risk: 'Replacement risk',
      role: 'AI impact',
      degree: 'Degree need',
      sort: 'Sort by'
    },
    filters: {
      risk: {
        low: 'Low risk',
        medium: 'Medium risk',
        high: 'High risk'
      },
      role: {
        replace: 'Mostly replaceable',
        hybrid: 'Mixed: replace + enhance',
        enhance: 'Mostly enhanced'
      },
      degree: {
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
    loading: 'Loading results...',
    loadError: 'Could not load the job dataset. If you opened this file directly, use the deployed website or run a local web server. If this is the live site, make sure the job and taxonomy data files are committed and deployed.',
    noResults: 'No roles matched this combination. Go back to the home filters and broaden the search.'
  },
  ko: {
    locale: 'ko-KR',
    nav: {
      home: '홈',
      catalog: '직업 카탈로그',
      news: 'AI 뉴스',
      articles: '아티클',
      faq: 'FAQ'
    },
    hero: {
      kicker: '필터 결과',
      title: '현재 검색과 필터에 맞는 직업 카드',
      lead: '홈의 직업 분류와 AI 분류에서 선택한 조건에 맞는 직업 카드만 이 페이지에 보여줍니다.'
    },
    results: {
      kicker: '일치하는 직업',
      title: '결과',
      summary: (count) => `현재 필터와 일치하는 직업은 ${count}개입니다.`,
      pageTitle: (count) => `${count}개 결과 | 내 직업은 AI로 대체될까?`
    },
    actions: {
      backHome: '홈으로 돌아가기',
      editFilters: '홈에서 필터 수정',
      openDetails: '상세 프로필 보기',
      closeDetails: '직무 상세 닫기'
    },
    chips: {
      search: '검색',
      all: '전체 직업'
    },
    controls: {
      major: '1차 분류 (대항목)',
      mid: '2차 분류 (하위카테고리)',
      sub: '3차 분류 (세부카테고리)',
      risk: 'Replacement Risk',
      role: 'AI 영향',
      degree: '학위 필요 여부',
      sort: '정렬 기준'
    },
    filters: {
      risk: {
        low: '낮은 위험',
        medium: '중간 위험',
        high: '높은 위험'
      },
      role: {
        replace: '주로 대체 가능',
        hybrid: '혼합형: 대체 + 강화',
        enhance: '주로 강화'
      },
      degree: {
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
    loading: '결과를 불러오는 중입니다...',
    loadError: '직업 데이터셋을 불러오지 못했습니다. 로컬 파일을 직접 열었다면 배포된 사이트로 접속하거나 로컬 웹서버로 실행해 주세요. 라이브 사이트라면 직업 데이터와 taxonomy 데이터 파일이 커밋되고 배포되었는지 확인해 주세요.',
    noResults: '이 조합과 일치하는 직업이 없습니다. 홈으로 돌아가 필터를 더 넓혀 보세요.'
  },
  es: {
    locale: 'es-ES',
    nav: {
      home: 'Inicio',
      catalog: 'Catalogo',
      news: 'Noticias IA',
      articles: 'Articulos',
      faq: 'FAQ'
    },
    hero: {
      kicker: 'Catalogo filtrado',
      title: 'Tarjetas para tu busqueda y filtros actuales',
      lead: 'Esta pagina muestra solo las tarjetas de trabajo que coinciden con lo que elegiste en clasificacion laboral y clasificacion de IA.'
    },
    results: {
      kicker: 'Trabajos coincidentes',
      title: 'Resultados',
      summary: (count) => `${count} puesto${count === 1 ? '' : 's'} coincide${count === 1 ? '' : 'n'} con tus filtros actuales.`,
      pageTitle: (count) => `${count} resultados | La IA reemplazara mi trabajo?`
    },
    actions: {
      backHome: 'Volver al inicio',
      editFilters: 'Editar filtros en inicio',
      openDetails: 'Ver perfil completo',
      closeDetails: 'Cerrar detalles del puesto'
    },
    chips: {
      search: 'Busqueda',
      all: 'Todos los trabajos'
    },
    controls: {
      major: '1ra clasificacion (mayor)',
      mid: '2da clasificacion (media)',
      sub: '3ra clasificacion (subnivel)',
      risk: 'Replacement Risk',
      role: 'Impacto de IA',
      degree: 'Necesidad de titulo',
      sort: 'Ordenar por'
    },
    filters: {
      risk: {
        low: 'Riesgo bajo',
        medium: 'Riesgo medio',
        high: 'Riesgo alto'
      },
      role: {
        replace: 'Mayormente reemplazable',
        hybrid: 'Mixto: reemplazo + mejora',
        enhance: 'Mayormente potenciado'
      },
      degree: {
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
    loading: 'Cargando resultados...',
    loadError: 'No se pudo cargar el conjunto de trabajos. Si abriste el archivo directamente, usa el sitio desplegado o ejecuta un servidor web local. Si es el sitio en produccion, confirma que los archivos de trabajos y taxonomia esten versionados y desplegados.',
    noResults: 'Ningun puesto coincide con esta combinacion. Vuelve a inicio y amplia los filtros.'
  }
};

const state = {
  lang: detectLanguage(),
  query: readTextParam('search'),
  major: readSelectionParam('major'),
  mid: readSelectionParam('mid'),
  sub: readSelectionParam('sub'),
  risk: readSelectionParam('risk', ['all', 'low', 'medium', 'high']),
  aiRole: readSelectionParam('role', ['all', 'replace', 'hybrid', 'enhance']),
  degree: readSelectionParam('degree', ['all', 'required', 'preferred', 'optional']),
  sort: readSelectionParam('sort', ['riskDesc', 'riskAsc', 'title'], 'riskDesc'),
  jobs: [],
  taxonomyIndex: createEmptyTaxonomyIndex(),
  isReady: false,
  loadError: false,
  activeJobId: null,
  lastFocusedCard: null
};

const elements = {
  navBrandLink: document.getElementById('navBrandLink'),
  navHomeLink: document.getElementById('navHomeLink'),
  navCatalogLink: document.getElementById('navCatalogLink'),
  navNewsLink: document.getElementById('navNewsLink'),
  navArticlesLink: document.getElementById('navArticlesLink'),
  navFaqLink: document.getElementById('navFaqLink'),
  catalogBackLink: document.getElementById('catalogBackLink'),
  catalogHeroKicker: document.getElementById('catalogHeroKicker'),
  catalogHeroTitle: document.getElementById('catalogHeroTitle'),
  catalogHeroLead: document.getElementById('catalogHeroLead'),
  catalogSummary: document.getElementById('catalogSummary'),
  catalogActiveFilters: document.getElementById('catalogActiveFilters'),
  resultsKicker: document.getElementById('resultsKicker'),
  resultsTitle: document.getElementById('resultsTitle'),
  catalogEditLink: document.getElementById('catalogEditLink'),
  jobGrid: document.getElementById('jobGrid'),
  jobModal: document.getElementById('jobModal'),
  jobModalTitle: document.getElementById('jobModalTitle'),
  jobModalBody: document.getElementById('jobModalBody'),
  jobModalClose: document.getElementById('jobModalClose')
};

attachEvents();
render();
init();

async function init() {
  const [taxonomyResult, jobsResult] = await Promise.allSettled([
    fetchJSON(DATA_FILES.taxonomy),
    fetchJSON(DATA_FILES.jobs)
  ]);

  if (taxonomyResult.status === 'fulfilled' && jobsResult.status === 'fulfilled') {
    state.taxonomyIndex = buildTaxonomyIndex(taxonomyResult.value);
    state.jobs = jobsResult.value;
    state.isReady = true;
  } else {
    console.error('Failed to load catalog data', {
      taxonomyError: taxonomyResult.status === 'rejected' ? taxonomyResult.reason : null,
      jobsError: jobsResult.status === 'rejected' ? jobsResult.reason : null
    });
    state.loadError = true;
  }

  render();
}

function attachEvents() {
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

  document.documentElement.lang = state.lang;
  hydrateChrome(copy);
  hydrateModalCopy(copy);

  if (state.loadError) {
    document.title = copy.results.pageTitle(0);
    elements.catalogSummary.textContent = copy.loadError;
    elements.catalogActiveFilters.innerHTML = renderMessageChip(copy.loadError);
    elements.jobGrid.innerHTML = `<div class="empty-state">${escapeHtml(copy.loadError)}</div>`;
    return;
  }

  if (!state.isReady) {
    document.title = copy.results.pageTitle(0);
    elements.catalogSummary.textContent = copy.loading;
    elements.catalogActiveFilters.innerHTML = renderMessageChip(copy.loading);
    elements.jobGrid.innerHTML = `<div class="empty-state">${escapeHtml(copy.loading)}</div>`;
    return;
  }

  const filteredJobs = sortJobs(filterJobs());

  document.title = copy.results.pageTitle(filteredJobs.length);
  elements.catalogSummary.textContent = copy.results.summary(filteredJobs.length);
  elements.catalogActiveFilters.innerHTML = renderActiveFilters(copy);

  if (filteredJobs.length === 0) {
    elements.jobGrid.innerHTML = `<div class="empty-state">${escapeHtml(copy.noResults)}</div>`;
    return;
  }

  elements.jobGrid.innerHTML = filteredJobs.map((job) => renderCard(job, copy)).join('');
}

function hydrateChrome(copy) {
  elements.navBrandLink.textContent = 'Will My Job Be Replaced by AI?';
  elements.navHomeLink.textContent = copy.nav.home;
  elements.navCatalogLink.textContent = copy.nav.catalog;
  elements.navNewsLink.textContent = copy.nav.news;
  elements.navArticlesLink.textContent = copy.nav.articles;
  elements.navFaqLink.textContent = copy.nav.faq;
  elements.catalogBackLink.textContent = copy.actions.backHome;
  elements.catalogHeroKicker.textContent = copy.hero.kicker;
  elements.catalogHeroTitle.textContent = copy.hero.title;
  elements.catalogHeroLead.textContent = copy.hero.lead;
  elements.resultsKicker.textContent = copy.results.kicker;
  elements.resultsTitle.textContent = copy.results.title;
  elements.catalogEditLink.textContent = copy.actions.editFilters;
}

function hydrateModalCopy(copy) {
  elements.jobModalClose.setAttribute('aria-label', copy.actions.closeDetails);
}

function renderActiveFilters(copy) {
  const chips = [];

  if (state.query) {
    chips.push({ label: `${copy.chips.search}: ${state.query}`, strong: true });
  }

  const majorLabel = getSelectionLabel('major', state.major);
  const midLabel = getSelectionLabel('mid', state.mid);
  const subLabel = getSelectionLabel('sub', state.sub);

  if (majorLabel) {
    chips.push({ label: `${copy.controls.major}: ${majorLabel}` });
  }

  if (midLabel) {
    chips.push({ label: `${copy.controls.mid}: ${midLabel}` });
  }

  if (subLabel) {
    chips.push({ label: `${copy.controls.sub}: ${subLabel}` });
  }

  if (state.risk !== 'all') {
    chips.push({ label: `${copy.controls.risk}: ${copy.filters.risk[state.risk]}` });
  }

  if (state.aiRole !== 'all') {
    chips.push({ label: `${copy.controls.role}: ${copy.filters.role[state.aiRole]}` });
  }

  if (state.degree !== 'all') {
    chips.push({ label: `${copy.controls.degree}: ${copy.filters.degree[state.degree]}` });
  }

  if (state.sort !== 'riskDesc') {
    chips.push({ label: `${copy.controls.sort}: ${copy.filters.sort[state.sort]}` });
  }

  if (chips.length === 0) {
    chips.push({ label: copy.chips.all, strong: true });
  }

  return chips.map((chip) => {
    return `<span class="meta-pill filter-chip${chip.strong ? ' filter-chip-strong' : ''}">${escapeHtml(chip.label)}</span>`;
  }).join('');
}

function renderMessageChip(message) {
  return `<span class="meta-pill filter-chip">${escapeHtml(message)}</span>`;
}

function getSelectionLabel(level, value) {
  if (!value || value === 'all') {
    return '';
  }

  if (level === 'major') {
    return getLocalizedLabel(state.taxonomyIndex.majors.get(value)?.labels, value);
  }

  if (level === 'mid') {
    return getLocalizedLabel(state.taxonomyIndex.mids.get(value)?.labels, value);
  }

  return getLocalizedLabel(state.taxonomyIndex.subs.get(value)?.labels, value);
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
      return getLocalizedJobContent(left).title.localeCompare(
        getLocalizedJobContent(right).title,
        UI[state.lang].locale
      );
    }

    return right.automationRisk - left.automationRisk;
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
  const safeItems = Array.isArray(items) ? items : [];

  return `<ul>${safeItems.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`;
}

function renderPillList(items) {
  const safeItems = Array.isArray(items) ? items : [];
  return safeItems.map((item) => `<span class="service-pill">${escapeHtml(item)}</span>`).join('');
}

function renderReferences(items) {
  if (!items || items.length === 0) {
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
  const requested = URL_PARAMS.get('lang')?.trim().toLowerCase();

  if (requested && UI[requested]) {
    return requested;
  }

  const locale = navigator.language.toLowerCase();

  if (locale.startsWith('ko')) {
    return 'ko';
  }

  if (locale.startsWith('es')) {
    return 'es';
  }

  return 'en';
}

function readTextParam(name) {
  return URL_PARAMS.get(name)?.trim().toLowerCase() || '';
}

function readSelectionParam(name, allowedValues = null, fallback = 'all') {
  const value = URL_PARAMS.get(name)?.trim();

  if (!value) {
    return fallback;
  }

  if (allowedValues && !allowedValues.includes(value)) {
    return fallback;
  }

  return value;
}
