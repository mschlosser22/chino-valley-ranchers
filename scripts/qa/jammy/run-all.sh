#!/usr/bin/env bash
# Runs every Jammy QA check against a local dev server.
#
# Playwright cannot install at the project root -- @react-three/fiber pins a
# React 18/19 peer conflict that predates this work -- so it lives outside the
# repo and is reached through NODE_PATH.
#
#   PW=/path/to/node_modules ./scripts/qa/jammy/run-all.sh
#
# Expects the dev server on :7500 (npm run dev).

set -u
cd "$(dirname "$0")"

if ! curl -sf -o /dev/null http://localhost:7500/jammy; then
  echo "dev server is not answering on :7500 -- start it with 'npm run dev'" >&2
  exit 1
fi

export NODE_PATH="${PW:-$NODE_PATH}"
fail=0
for f in jv2.js item*.js; do
  printf "  %-12s " "$f"
  out=$(node "$f" 2>&1 | tail -1)
  echo "$out"
  case "$out" in
    *"/"*" passed") n=${out%%/*}; d=${out#*/}; d=${d%% *}
      [ "$n" = "$d" ] || fail=1 ;;
    *) fail=1 ;;
  esac
done
exit $fail
