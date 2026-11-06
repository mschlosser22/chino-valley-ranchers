// Asset-level check: the agriculture card must be torn on all four edges.
// A straight run in any edge means a step or a flat cut is showing -- the
// defect the client saw as "a weird border conflicting with the torn paper".
const { execSync } = require('child_process');
const out = execSync(`python3 - <<'PY'
from PIL import Image
import numpy as np
im=Image.open('public/images/regen/card-agri.png').convert('RGBA')
al=np.array(im)[:,:,3]; H,W=al.shape
def prof(axis):
    if axis=='top':    return np.array([np.where(al[:,x]>128)[0].min() if (al[:,x]>128).any() else 0 for x in range(W)])
    if axis=='bottom': return np.array([np.where(al[:,x]>128)[0].max() if (al[:,x]>128).any() else 0 for x in range(W)])
    if axis=='left':   return np.array([np.where(al[y]>128)[0].min() if (al[y]>128).any() else 0 for y in range(H)])
    return np.array([np.where(al[y]>128)[0].max() if (al[y]>128).any() else 0 for y in range(H)])
res={}
for ax in ('top','bottom','left','right'):
    p=prof(ax)
    d=np.abs(np.diff(p.astype(int)))
    # longest run with no variation at all = a straight cut
    run=best=0
    for v in d:
        run = run+1 if v==0 else 0
        best=max(best,run)
    res[ax]=(float(p.std()), int(best))
import json; print(json.dumps(res))
PY`, { encoding: 'utf8' });
const r = JSON.parse(out);
let pass = 0, total = 0;
for (const ax of ['top','bottom','left','right']) {
  const [std, run] = r[ax];
  total++;
  // a torn edge wanders: real variation, and no long dead-flat stretch
  const ok = std > 3 && run < 120;
  if (ok) pass++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  card ${ax} edge is torn — std ${std.toFixed(1)}, longest flat run ${run}px`);
}
console.log(`\n${pass}/${total} passed`);
process.exit(pass === total ? 0 : 1);
