# FootballIQ

Transparent, model-based football analysis. Multi-league. Built around pre-match forecast logging and honest performance measurement.

## What is included

- Responsive React dashboard and match centre
- Competition filters for Premier League, LaLiga, Serie A, Bundesliga, Ligue 1, Champions League, MLS, Brasileirão, Liga MX and women's football
- Transparent independent-Poisson score grid
- 1X2, over-2.5, both-teams-to-score and ranked correct-score estimates
- Pre-match prediction ledger with timestamp and model version
- CSV export
- Manual result entry and Brier Score / Ranked Probability Score calculations
- Sponsorship placements page and Women's World Cup 2027 concept

## Important status and data limitations

This repository is a functional **prototype**, not a live-data production forecasting service. The fixture list and expected-goal inputs in `src/main.jsx` are illustrative demo values. They are not current official fixtures, live odds, validated model outputs or verified forecasts.

The accuracy lab scores only forecasts logged in the same browser and manually entered results. Browser localStorage is not a public, tamper-evident audit log. The demo intentionally shows no invented historical accuracy, audience metrics, subscribers, engagement or sponsor commitments.

The sponsorship page uses an example email address (`partnerships@footballiq.example`); replace it with a verified contact before publishing outreach. FootballIQ is not affiliated with FIFA or any football governing body. Predictions are probabilistic estimates, not betting or financial advice.

## Run locally

Requires Node.js 18 or later.

```bash
npm install
npm run dev
```

Create a production build:

```bash
npm run build
npm run preview
```

## Model

The baseline assumes independent Poisson goal counts:

`P(X=k)=e^-λ λ^k/k!`

The home and away goal distributions are combined into a score grid (0–8 goals per side). Probabilities are aggregated into home/draw/away, over 2.5 and both-teams-to-score markets. This is a transparent teaching baseline, not a claim of predictive superiority. Production use requires documented historical training data, calibration, out-of-sample testing, uncertainty analysis and versioned input snapshots.

## Accuracy metrics

For three-class outcome probability vector (p) and realized class (o), the Brier score is the mean of squared one-hot errors. The Ranked Probability Score compares cumulative probabilities over the ordered home/draw/away outcomes. Lower scores are better.

## Production roadmap

1. Integrate a licensed, reliable fixture and results data provider.
2. Build a server-side prediction service with immutable pre-kickoff snapshots.
3. Store records in a database with UTC timestamps, model/data versions and cryptographic audit hashes.
4. Add scheduled result ingestion, void/postponed-match handling and reproducible scoring.
5. Publish weekly per-league metrics with sample counts, confidence intervals and calibration plots.
6. Add privacy, security, monitoring, rate limits and deployment secrets.
7. Verify actual traffic and engagement before quoting sponsorship prices.

## Licence

MIT — see [LICENSE](LICENSE).