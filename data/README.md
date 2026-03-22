# Data Workflow

This site now separates three concerns:

1. `ksco-taxonomy.json`
   - The occupation hierarchy.
   - Structure: `major -> mid -> sub -> detail`.
   - This is where KSCO-aligned occupation names and ids live.

2. `jobs.json`
   - The profiled jobs that are visible in the public UI.
   - Each job references one taxonomy detail node and carries multilingual content, degree data, AI risk, and evidence fields.

3. `job-profile-template.json`
   - The authoring template for new job profiles.
   - Use this as the starter shape whenever a new profiled job is added.

## Why the site still shows 8 jobs

The current public site only renders entries that exist in `jobs.json`.

That means:
- the taxonomy can grow first
- the public cards only grow when full job profiles are added

This is the right order for scale. It lets the project ingest a large occupation hierarchy before every role has AI evidence and multilingual copy.

## Bulk expansion workflow

1. Expand `ksco-taxonomy.json`
   - Add more KSCO-aligned majors, mids, subs, and detail nodes.
   - Keep ids stable. The ids become the linking keys for profiled jobs.

2. Generate profile stubs
   - Run:

```bash
node scripts/generate-profile-stubs.mjs --write
```

   - This writes `data/generated-job-stubs.json` for taxonomy detail nodes that do not yet have a job profile.

3. Convert selected stubs into real profiles
   - Copy the needed objects into `jobs.json`.
   - Replace placeholders using `job-profile-template.json` as the content standard.

4. Validate the dataset
   - Run:

```bash
node scripts/validate-data.mjs
```

   - This checks:
     - unique job ids
     - taxonomy references
     - required multilingual fields
     - AI evidence completeness
     - evidence URLs

5. Deploy
   - Commit and push to `main`.
   - GitHub Pages redeploys the static files.

## Recommended growth order

For a real public catalog, the fastest path is:

1. Fill the taxonomy first.
2. Add lightweight baseline profiles for many jobs.
3. Enrich high-traffic jobs with stronger AI evidence and links.
4. Later split each profiled job into its own SEO page.

## Source direction

For KSCO hierarchy expansion, use official Statistics Korea references as the authority for major and lower-level occupation naming.

Useful official references:
- Statistics Korea library entry for the 2020 Korean Standard Classification of Occupations:
  - [https://lib1.kostat.go.kr/search/detail/CATEDZ000000090833](https://lib1.kostat.go.kr/search/detail/CATEDZ000000090833)
- Statistics Korea library entry for the 2008 KSCO index:
  - [https://mlib1.kostat.go.kr/search/detail/CAT000000068493](https://mlib1.kostat.go.kr/search/detail/CAT000000068493)

## Current limitation

The current taxonomy file is KSCO-aligned but still only contains the branches needed for the first 8 sample roles.
The next real content step is to add more detail nodes to `ksco-taxonomy.json`, then generate and fill profile stubs in batches.
