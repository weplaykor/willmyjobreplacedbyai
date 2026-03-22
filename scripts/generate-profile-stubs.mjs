import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const rootDir = process.cwd();
const jobsPath = path.join(rootDir, 'data', 'jobs.json');
const taxonomyPath = path.join(rootDir, 'data', 'ksco-taxonomy.json');
const templatePath = path.join(rootDir, 'data', 'job-profile-template.json');

const jobs = JSON.parse(fs.readFileSync(jobsPath, 'utf8'));
const taxonomy = JSON.parse(fs.readFileSync(taxonomyPath, 'utf8'));
const template = JSON.parse(fs.readFileSync(templatePath, 'utf8'));
const profiledIds = new Set(jobs.map((job) => job.classification.detailId));

const stubs = [];

for (const major of taxonomy.majors || []) {
  for (const mid of major.mids || []) {
    for (const sub of mid.subs || []) {
      for (const detail of sub.details || []) {
        if (profiledIds.has(detail.id)) {
          continue;
        }

        stubs.push(buildStub(template, major, mid, sub, detail));
      }
    }
  }
}

if (process.argv.includes('--write')) {
  const outputPath = path.join(rootDir, 'data', 'generated-job-stubs.json');
  fs.writeFileSync(outputPath, `${JSON.stringify(stubs, null, 2)}\n`);
  console.log(`Wrote ${stubs.length} stub(s) to ${outputPath}`);
} else {
  console.log(JSON.stringify(stubs, null, 2));
}

function buildStub(templateData, major, mid, sub, detail) {
  const stub = structuredClone(templateData);

  stub.id = detail.id;
  stub.category = 'replace-with-product-category';
  stub.classification.majorId = major.id;
  stub.classification.midId = mid.id;
  stub.classification.subId = sub.id;
  stub.classification.detailId = detail.id;
  stub.content.en.title = detail.labels.en;
  stub.content.ko.title = detail.labels.ko;
  stub.content.es.title = detail.labels.es;

  return stub;
}
