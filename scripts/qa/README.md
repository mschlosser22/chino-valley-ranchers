# QA check suites

Playwright checks that guard the Jammy landing page work against regressions.
They live here rather than in a temp directory because the scratchpad has been
cleared several times mid-engagement, taking the suites with it.

## Running

Playwright is deliberately NOT installed into this project. The dependency tree
has a pre-existing React 18/19 peer conflict (`@react-three/fiber` wants React
19, the app is on 18), so `npm install playwright` at the project root fails to
resolve. Install it somewhere else and point Node at it instead:

    mkdir -p /tmp/cvr-qa && cd /tmp/cvr-qa
    npm install playwright@1.62.0 --no-save

Then build and serve the app, and run the scripts with NODE_PATH set:

    cd /path/to/chino-valley-ranchers
    npx next build
    npx next start --port 7500 &
    NODE_PATH=/tmp/cvr-qa/node_modules node scripts/qa/regress.js
    NODE_PATH=/tmp/cvr-qa/node_modules node scripts/qa/font-check.js
    NODE_PATH=/tmp/cvr-qa/node_modules node scripts/qa/din-check.js

All three expect the app on port 7500 and exit non-zero if a check fails.

## What each covers

| Script | Guards |
|---|---|
| `regress.js` | Phases 1-3 and consent: tile order, Spotify CTA, badge tilt, headline shadow, the three SVG illustrations, ramen shines, hero entrance, section colours, mobile overflow, and zero pre-consent trackers |
| `font-check.js` | QA 4.1 — the Adobe kit loads, Proxima Nova and Cubano render rather than falling back |
| `din-check.js` | The homepage CTA keeps DIN Condensed after the kit swap |
