#!/usr/bin/env bash
# Runs every Regenerative section check against a local dev server.
#
#   PW=/path/to/playwright/node_modules ./scripts/qa/regen/run-all.sh
#
# Expects the dev server on :7500 (npm run dev). Playwright is not a project
# dependency -- installing it at the root trips a pre-existing React 18/19
# peer conflict via @react-three/fiber -- so it is reached through NODE_PATH.

set -u
cd "$(dirname "$0")"

if ! curl -sf -o /dev/null http://localhost:7500/regenerative; then
  echo "dev server is not answering on :7500 -- start it with 'npm run dev'" >&2
  exit 1
fi

export NODE_PATH="${PW:-$NODE_PATH}"
pass=0; total=0; fail=0
for f in sec*test.js; do
  out=$(node "$f" 2>&1 | tail -1)
  printf "  %-14s %s\n" "$f" "$out"
  n=${out%%/*}; d=${out#*/}; d=${d%% *}
  case "$n$d" in ''|*[!0-9]*) fail=1; continue;; esac
  pass=$((pass+n)); total=$((total+d))
  [ "$n" = "$d" ] || fail=1
done
echo ""
echo "  TOTAL: $pass/$total"
exit $fail
