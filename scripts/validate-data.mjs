import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const rootDir = process.cwd();
const jobsPath = path.join(rootDir, 'data', 'jobs.json');
const taxonomyPath = path.join(rootDir, 'data', 'taxonomy.json');

const jobs = readJson(jobsPath);
const taxonomy = readJson(taxonomyPath);

const taxonomyIndex = buildTaxonomyIndex(taxonomy);
const errors = [];

validateUniqueJobIds(jobs, errors);
validateTaxonomy(taxonomy, errors);
validateJobs(jobs, taxonomyIndex, errors);

const profiledDetailIds = new Set(jobs.map((job) => job.classification.detailId));
const totalDetailIds = taxonomyIndex.details.size;
const coverage = totalDetailIds === 0 ? 0 : Math.round((profiledDetailIds.size / totalDetailIds) * 100);

if (errors.length > 0) {
  console.error(`Data validation failed with ${errors.length} issue(s):`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(`Validation passed.`);
console.log(`Profiled jobs: ${jobs.length}`);
console.log(`Taxonomy detail nodes: ${totalDetailIds}`);
console.log(`Coverage: ${coverage}%`);

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function buildTaxonomyIndex(taxonomyData) {
  const index = {
    majors: new Map(),
    mids: new Map(),
    subs: new Map(),
    details: new Map()
  };

  for (const major of taxonomyData.majors || []) {
    index.majors.set(major.id, major);

    for (const mid of major.mids || []) {
      index.mids.set(mid.id, { ...mid, parentId: major.id });

      for (const sub of mid.subs || []) {
        index.subs.set(sub.id, { ...sub, parentId: mid.id, majorId: major.id });

        for (const detail of sub.details || []) {
          index.details.set(detail.id, {
            ...detail,
            parentId: sub.id,
            midId: mid.id,
            majorId: major.id
          });
        }
      }
    }
  }

  return index;
}

function validateTaxonomy(taxonomyData, errorsList) {
  const seen = new Set();

  for (const major of taxonomyData.majors || []) {
    validateLabels(`major:${major.id}`, major.labels, errorsList);
    checkDuplicate(`major:${major.id}`, seen, errorsList);

    for (const mid of major.mids || []) {
      validateLabels(`mid:${mid.id}`, mid.labels, errorsList);
      checkDuplicate(`mid:${mid.id}`, seen, errorsList);

      for (const sub of mid.subs || []) {
        validateLabels(`sub:${sub.id}`, sub.labels, errorsList);
        checkDuplicate(`sub:${sub.id}`, seen, errorsList);

        for (const detail of sub.details || []) {
          validateLabels(`detail:${detail.id}`, detail.labels, errorsList);
          checkDuplicate(`detail:${detail.id}`, seen, errorsList);
        }
      }
    }
  }
}

function validateUniqueJobIds(jobsData, errorsList) {
  const ids = new Set();

  for (const job of jobsData) {
    if (ids.has(job.id)) {
      errorsList.push(`Duplicate job id "${job.id}"`);
      continue;
    }

    ids.add(job.id);
  }
}

function validateJobs(jobsData, taxonomyIndexData, errorsList) {
  for (const job of jobsData) {
    validateEnum(`job:${job.id}.aiRole`, job.aiRole, ['replace', 'hybrid', 'enhance'], errorsList);
    validateNumber(`job:${job.id}.automationRisk`, job.automationRisk, errorsList);
    validateEnum(`job:${job.id}.degree.status`, job.degree?.status, ['required', 'preferred', 'optional'], errorsList);
    validateEnum(`job:${job.id}.degree.level`, job.degree?.level, ['none', 'bachelor', 'master', 'doctorate'], errorsList);

    if (job.currentReplacementUrl != null) {
      validateUrl(`job:${job.id}.currentReplacementUrl`, job.currentReplacementUrl, errorsList);
    }

    validateClassification(job, taxonomyIndexData, errorsList);
    validateLocalizedContent(job, errorsList);
    validateEvidence(job, errorsList);
    validateMarketSignals(job, errorsList);
  }
}

function validateClassification(job, taxonomyIndexData, errorsList) {
  const { majorId, midId, subId, detailId } = job.classification || {};
  const major = taxonomyIndexData.majors.get(majorId);
  const mid = taxonomyIndexData.mids.get(midId);
  const sub = taxonomyIndexData.subs.get(subId);
  const detail = taxonomyIndexData.details.get(detailId);

  if (!major) {
    errorsList.push(`job:${job.id} references missing majorId "${majorId}"`);
  }

  if (!mid) {
    errorsList.push(`job:${job.id} references missing midId "${midId}"`);
  }

  if (!sub) {
    errorsList.push(`job:${job.id} references missing subId "${subId}"`);
  }

  if (!detail) {
    errorsList.push(`job:${job.id} references missing detailId "${detailId}"`);
  }

  if (mid && mid.parentId !== majorId) {
    errorsList.push(`job:${job.id} has midId "${midId}" outside majorId "${majorId}"`);
  }

  if (sub && sub.parentId !== midId) {
    errorsList.push(`job:${job.id} has subId "${subId}" outside midId "${midId}"`);
  }

  if (detail && detail.parentId !== subId) {
    errorsList.push(`job:${job.id} has detailId "${detailId}" outside subId "${subId}"`);
  }
}

function validateLocalizedContent(job, errorsList) {
  for (const locale of ['en', 'ko', 'es']) {
    const content = job.content?.[locale];

    if (!content) {
      errorsList.push(`job:${job.id} is missing content locale "${locale}"`);
      continue;
    }

    validateString(`job:${job.id}.content.${locale}.title`, content.title, errorsList);
    validateString(`job:${job.id}.content.${locale}.summary`, content.summary, errorsList);
    validateStringArray(`job:${job.id}.content.${locale}.tasks`, content.tasks, errorsList);
    validateStringArray(`job:${job.id}.content.${locale}.skills`, content.skills, errorsList);
    validateStringArray(`job:${job.id}.content.${locale}.path`, content.path, errorsList);
    validateStringArray(`job:${job.id}.content.${locale}.educationPathways`, content.educationPathways, errorsList);
    validateString(`job:${job.id}.content.${locale}.degreeNote`, content.degreeNote, errorsList);
    validateString(`job:${job.id}.content.${locale}.aiNow`, content.aiNow, errorsList);
    validateString(`job:${job.id}.content.${locale}.aiFuture`, content.aiFuture, errorsList);
    validateStringArray(`job:${job.id}.content.${locale}.services`, content.services, errorsList);
  }
}

function validateEvidence(job, errorsList) {
  const evidence = job.aiEvidence;

  if (!evidence) {
    errorsList.push(`job:${job.id} is missing aiEvidence`);
    return;
  }

  for (const locale of ['en', 'ko', 'es']) {
    validateString(`job:${job.id}.aiEvidence.rationale.${locale}`, evidence.rationale?.[locale], errorsList);
    validateStringArray(`job:${job.id}.aiEvidence.automatableNow.${locale}`, evidence.automatableNow?.[locale], errorsList);
    validateStringArray(`job:${job.id}.aiEvidence.humanEdge.${locale}`, evidence.humanEdge?.[locale], errorsList);
  }

  if (!Array.isArray(evidence.references) || evidence.references.length === 0) {
    errorsList.push(`job:${job.id}.aiEvidence.references should contain at least one evidence link`);
    return;
  }

  evidence.references.forEach((reference, index) => {
    validateString(`job:${job.id}.aiEvidence.references[${index}].name`, reference.name, errorsList);
    validateUrl(`job:${job.id}.aiEvidence.references[${index}].url`, reference.url, errorsList);
  });
}

function validateMarketSignals(job, errorsList) {
  const marketSignals = job.marketSignals;

  if (!marketSignals) {
    errorsList.push(`job:${job.id} is missing marketSignals`);
    return;
  }

  validateEnum(`job:${job.id}.marketSignals.salaryRange.currency`, marketSignals.salaryRange?.currency, ['USD'], errorsList);
  validateEnum(`job:${job.id}.marketSignals.salaryRange.period`, marketSignals.salaryRange?.period, ['year'], errorsList);
  validateString(`job:${job.id}.marketSignals.salaryRange.scope`, marketSignals.salaryRange?.scope, errorsList);
  validatePositiveNumber(`job:${job.id}.marketSignals.salaryRange.min`, marketSignals.salaryRange?.min, errorsList);
  validatePositiveNumber(`job:${job.id}.marketSignals.salaryRange.max`, marketSignals.salaryRange?.max, errorsList);

  if (typeof marketSignals.salaryRange?.min === 'number' && typeof marketSignals.salaryRange?.max === 'number' && marketSignals.salaryRange.min >= marketSignals.salaryRange.max) {
    errorsList.push(`job:${job.id}.marketSignals.salaryRange should have min lower than max`);
  }

  validateEnum(`job:${job.id}.marketSignals.hiringDemand.level`, marketSignals.hiringDemand?.level, ['high', 'medium', 'low'], errorsList);

  for (const locale of ['en', 'ko', 'es']) {
    validateString(`job:${job.id}.marketSignals.hiringDemand.note.${locale}`, marketSignals.hiringDemand?.note?.[locale], errorsList);
  }
}

function validateLabels(labelPath, labels, errorsList) {
  for (const locale of ['en', 'ko', 'es']) {
    validateString(`${labelPath}.labels.${locale}`, labels?.[locale], errorsList);
  }
}

function validateNumber(label, value, errorsList) {
  if (typeof value !== 'number' || Number.isNaN(value) || value < 0 || value > 100) {
    errorsList.push(`${label} should be a number from 0 to 100`);
  }
}

function validateString(label, value, errorsList) {
  if (typeof value !== 'string' || value.trim().length === 0) {
    errorsList.push(`${label} should be a non-empty string`);
  }
}

function validatePositiveNumber(label, value, errorsList) {
  if (typeof value !== 'number' || Number.isNaN(value) || value <= 0) {
    errorsList.push(`${label} should be a positive number`);
  }
}

function validateStringArray(label, value, errorsList) {
  if (!Array.isArray(value) || value.length === 0) {
    errorsList.push(`${label} should be a non-empty string array`);
    return;
  }

  value.forEach((item, index) => validateString(`${label}[${index}]`, item, errorsList));
}

function validateEnum(label, value, expected, errorsList) {
  if (!expected.includes(value)) {
    errorsList.push(`${label} should be one of: ${expected.join(', ')}`);
  }
}

function validateUrl(label, value, errorsList) {
  try {
    const url = new URL(value);

    if (!['http:', 'https:'].includes(url.protocol)) {
      errorsList.push(`${label} should use http or https`);
    }
  } catch {
    errorsList.push(`${label} should be a valid URL`);
  }
}

function checkDuplicate(key, seen, errorsList) {
  if (seen.has(key)) {
    errorsList.push(`Duplicate taxonomy key "${key}"`);
    return;
  }

  seen.add(key);
}
