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

## Public profile count

The public site only renders entries that exist in `jobs.json`.

Right now:
- the taxonomy has `62` KSCO-aligned detail roles
- `jobs.json` also has `62` fully profiled public roles
- `generated-job-stubs.json` is empty because every current taxonomy detail node has been materialized into a live profile

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

3. Convert stubs into real profiles
   - Run:

```bash
node scripts/materialize-job-stubs.mjs
```

   - This materializes any pending stubs into public profiles inside `jobs.json` and clears `generated-job-stubs.json`.

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

Current snapshot:
- `62` KSCO-aligned detail nodes in taxonomy
- `62` fully profiled public jobs in `jobs.json`
- `0` generated stubs waiting for conversion

The next real content step is no longer coverage. It is quality refinement: stronger evidence sources, more occupation-specific AI links, and eventually separate SEO pages per job.
