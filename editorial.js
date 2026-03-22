const ASSET_VERSION = '2026-03-23-2';
const NEWS_PAGE_SIZE = 30;

const DATA_FILES = {
  news: 'data/news.json',
  articles: 'data/articles.json'
};

document.addEventListener('DOMContentLoaded', initEditorialPages);

async function initEditorialPages() {
  const page = document.body.dataset.page;

  if (page === 'news') {
    await renderNewsPage();
    return;
  }

  if (page === 'articles') {
    await renderArticlesPage();
  }
}

async function renderNewsPage() {
  const newsFeed = document.getElementById('newsFeed');
  const newsSummary = document.getElementById('newsSummary');
  const newsPagination = document.getElementById('newsPagination');

  try {
    const news = sortByPublishedAt(await fetchJSON(DATA_FILES.news));
    const totalItems = news.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / NEWS_PAGE_SIZE));
    const currentPage = clampPage(Number.parseInt(new URLSearchParams(window.location.search).get('page') || '1', 10), totalPages);
    const pageStart = (currentPage - 1) * NEWS_PAGE_SIZE;
    const pageItems = news.slice(pageStart, pageStart + NEWS_PAGE_SIZE);
    const startItem = totalItems === 0 ? 0 : pageStart + 1;
    const endItem = totalItems === 0 ? 0 : pageStart + pageItems.length;

    newsSummary.textContent = `Showing ${startItem}-${endItem} of ${totalItems} news items. Page ${currentPage} of ${totalPages}.`;
    newsFeed.innerHTML = pageItems.length === 0
      ? '<div class="empty-state">No news items are available yet.</div>'
      : pageItems.map(renderNewsFeedItem).join('');
    newsPagination.innerHTML = renderPagination(currentPage, totalPages, 'news.html');

    const params = new URLSearchParams(window.location.search);
    if (String(currentPage) !== (params.get('page') || '1')) {
      params.set('page', String(currentPage));
      window.history.replaceState({}, '', `news.html?${params.toString()}`);
    }
  } catch (error) {
    console.error('Failed to render news page', error);
    newsSummary.textContent = 'The news tracker could not be loaded.';
    newsFeed.innerHTML = '<div class="empty-state">Could not load the news tracker. Confirm that data/news.json is deployed.</div>';
  }
}

async function renderArticlesPage() {
  const articleToc = document.getElementById('articleToc');
  const articleIndex = document.getElementById('articleIndex');

  try {
    const articles = sortByPublishedAt(await fetchJSON(DATA_FILES.articles));
    articleToc.innerHTML = articles.map((article) => `
      <a class="toc-link" href="#${escapeAttribute(article.id)}">
        <span>${escapeHtml(article.title)}</span>
        <span>${escapeHtml(article.readTime)}</span>
      </a>
    `).join('');
    articleIndex.innerHTML = articles.map(renderArticlePageItem).join('');
    injectArticleSchema(articles);
  } catch (error) {
    console.error('Failed to render article page', error);
    articleToc.innerHTML = '<div class="empty-state">Could not load the article library.</div>';
    articleIndex.innerHTML = '<div class="empty-state">Could not load the article library. Confirm that data/articles.json is deployed.</div>';
  }
}

function renderNewsFeedItem(item) {
  const sourceLink = item.url
    ? `<a class="news-source-link" href="${escapeAttribute(item.url)}" target="_blank" rel="noreferrer noopener">Open source</a>`
    : '';

  return `
    <article class="news-feed-item">
      <div class="news-feed-meta">
        <span class="meta-pill">${escapeHtml(item.source)}</span>
        <span class="meta-pill">${escapeHtml(item.category)}</span>
        <span class="news-date">${escapeHtml(formatDate(item.publishedAt))}</span>
      </div>
      <h2>${escapeHtml(item.title)}</h2>
      <p class="section-copy">${escapeHtml(item.summary)}</p>
      <p class="news-impact">${escapeHtml(item.impact)}</p>
      <div class="keyword-list">
        <span class="keyword-chip keyword-chip-strong">${escapeHtml(item.serviceName)}</span>
        ${item.jobSignals.map((signal) => `<span class="keyword-chip">${escapeHtml(signal)}</span>`).join('')}
      </div>
      <div class="section-actions">
        ${sourceLink}
      </div>
    </article>
  `;
}

function renderArticlePageItem(article) {
  return `
    <article class="article-longform" id="${escapeAttribute(article.id)}">
      <div class="article-longform-header">
        <div class="news-feed-meta">
          <span class="meta-pill">${escapeHtml(formatDate(article.publishedAt))}</span>
          <span class="meta-pill">${escapeHtml(article.readTime)}</span>
        </div>
        <h2>${escapeHtml(article.title)}</h2>
        <p class="article-preview-hook">${escapeHtml(article.hook)}</p>
        <p class="section-copy">${escapeHtml(article.excerpt)}</p>
        <div class="keyword-list">
          ${article.keywords.map((keyword) => `<span class="keyword-chip">${escapeHtml(keyword)}</span>`).join('')}
        </div>
      </div>
      ${article.sections.map((section) => `
        <section class="article-section">
          <h3>${escapeHtml(section.heading)}</h3>
          ${section.paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('')}
        </section>
      `).join('')}
    </article>
  `;
}

function renderPagination(currentPage, totalPages, basePath) {
  if (totalPages <= 1) {
    return '';
  }

  const links = [];

  if (currentPage > 1) {
    links.push(`<a class="pagination-link" href="${basePath}?page=${currentPage - 1}">Previous</a>`);
  }

  for (let page = 1; page <= totalPages; page += 1) {
    links.push(`
      <a class="pagination-link ${page === currentPage ? 'is-active' : ''}" href="${basePath}?page=${page}" ${page === currentPage ? 'aria-current="page"' : ''}>
        ${page}
      </a>
    `);
  }

  if (currentPage < totalPages) {
    links.push(`<a class="pagination-link" href="${basePath}?page=${currentPage + 1}">Next</a>`);
  }

  return links.join('');
}

function injectArticleSchema(articles) {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': articles.map((article) => ({
      '@type': 'Article',
      headline: article.title,
      datePublished: article.publishedAt,
      dateModified: article.publishedAt,
      author: {
        '@type': 'Organization',
        name: 'Weplay Inc. 종이비행기국가대표팀 위플레이'
      },
      publisher: {
        '@type': 'Organization',
        name: 'Weplay Inc. 종이비행기국가대표팀 위플레이'
      },
      mainEntityOfPage: `https://www.willmyjobreplacedbyai.com/articles.html#${article.id}`,
      keywords: article.keywords.join(', '),
      description: article.excerpt
    }))
  };
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(schema);
  document.head.append(script);
}

async function fetchJSON(path) {
  const assetPath = `${path}?v=${ASSET_VERSION}`;
  const response = await fetch(assetPath, { cache: 'no-store' });

  if (!response.ok) {
    throw new Error(`Failed to load ${assetPath}: ${response.status}`);
  }

  return response.json();
}

function sortByPublishedAt(items) {
  return [...items].sort((left, right) => {
    return new Date(right.publishedAt).getTime() - new Date(left.publishedAt).getTime();
  });
}

function clampPage(value, totalPages) {
  if (!Number.isFinite(value) || value < 1) {
    return 1;
  }

  return Math.min(value, totalPages);
}

function formatDate(dateString) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(dateString));
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
