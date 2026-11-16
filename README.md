# FootballIQ
Transparent multi-league football analysis, fixture tracking and accountable prediction records.

## Current application
- Responsive React dashboard and multi-competition match centre.
- Independent-Poisson probability baseline, correct-score estimates, CSV export and Brier/RPS scoring.
- Live fixture/result ingestion from API-Sports (API-Football) through a scheduled GitHub Actions job.
- Optional shared append-only prediction ledger using Supabase.
- GitHub Pages deployment on every main-branch push.

## Activate live fixtures and results
1. Obtain an API-Football key from API-Sports.
2. In GitHub, open Settings > Secrets and variables > Actions > New repository secret.
3. Create secret API_FOOTBALL_KEY with the provider key.
4. Run Actions > Refresh FootballIQ fixtures and results > Run workflow. It also runs every six hours.
5. The job writes public/data/fixtures.json; GitHub Pages redeploys refreshed data automatically.

The scheduled job requests nine competitions for the 2026 season and a rolling 14-day date window. Provider plan quotas and competition coverage apply. A missing/invalid key causes the workflow to fail visibly rather than silently showing fabricated live data.

## Activate the shared prediction ledger
1. Create a Supabase project.
2. Run supabase/schema.sql in the Supabase SQL Editor.
3. In Supabase Project Settings > API, copy the Project URL and anon/public key.
4. In GitHub repository Settings > Secrets and variables > Actions > Variables, add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.
5. Push or manually run Deploy FootballIQ to GitHub Pages.

The anon key is intended for browser use; never put a Supabase service-role key in frontend variables. The SQL policy allows public reads and inserts but denies updates/deletes. Hashes are client-generated integrity fingerprints, not proof of identity or a fully tamper-proof audit. Public submissions are not independently verified; production use needs server-side validation, abuse controls, immutable snapshots and independent audit.

## Forecast limitations
API-Sports supplies fixture and final-score data, not expected-goal inputs. Until a validated team-strength/xG data source is added, each live fixture uses generic baseline inputs (1.35 home, 1.15 away). These are not team-specific forecasts. The model is a transparent teaching baseline, not betting advice or a claim of predictive superiority.

## Run locally
Requires Node.js 18+. Run npm install, npm run dev, and npm run build.
For local Supabase settings, copy .env.example to .env.local and fill in the two public Vite variables.

## Accuracy metrics
Brier Score and Ranked Probability Score are calculated only where a logged forecast has a matching result. The shared ledger is an append-only prototype, not an independently audited benchmark. No historical accuracy, traffic, audience or sponsor commitments are invented.

## Partnerships
The partner page still contains a placeholder contact address. Replace it with a verified email before external sponsorship outreach.

## Licence
MIT — see LICENSE.
