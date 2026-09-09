// The section 4 tear must be a HARD rip, not a gradient. Layer 53 in the
// design is a paper plane whose edge is feathered over ~60px so paper fades
// into paper; used as a mask on a photograph that feather renders as a grey
// haze and washes out anything crossing it -- the rooster's comb, in the
// client's report. The mask is thresholded, keeping only anti-aliasing.
const { execSync } = require('child_process');
const out = execSync(`python3 - <<'PY'
from PIL import Image
import numpy as np, json
al=np.array(Image.open('public/images/regen/tear-next.png').convert('RGBA'))[:,:,3].astype(float)
RIP=120
rip=al[:RIP]
partial=int(((rip>20)&(rip<200)).sum())
rows=[y for y in range(RIP) if ((rip[y]>20)&(rip[y]<200)).any()]
print(json.dumps({'partial':partial,'span':(max(rows)-min(rows)+1) if rows else 0,
                  'clearTop':bool((al[0]<=20).all()),'solidBelow':bool((al[RIP-1]>200).all())}))
PY`, { encoding: 'utf8' });
const r = JSON.parse(out);
const checks = [
  ['tear is a hard cut, not a gradient', r.partial < 8000, `${r.partial} partial px (was 49453)`],
  ['tear is fully clear above the rip', r.clearTop],
  ['tear is fully solid below the rip', r.solidBelow],
];
let pass = 0;
for (const [n, ok, d] of checks) {
  if (ok) pass++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${n}${d ? ' — ' + d : ''}`);
}
console.log(`\n${pass}/${checks.length} passed`);
process.exit(pass === checks.length ? 0 : 1);
