import os as _os
_HERE = _os.path.dirname(_os.path.abspath(__file__))
import sys; sys.path.insert(0,_HERE)
from geom import *

# Section seams read off the full-width background planes. Each entry is
# (y_start, y_end, label): the extent of the band's own background plane.
# Those planes overlap -- each runs under its neighbours' torn edges -- so the
# extents do NOT tile the artboard, and a leaf assigned by "centre inside the
# extent" landed in two bands at every seam (36 leaves double-counted). Leaves
# are now assigned by in_band below, against the band's CORE: its start to the
# next band's start. Extents are still what the report measures against.
#
# Band 8 was (6441, 7951), read off "Layer 2 copy 4", a plane that starts
# inside section 7: it put the callouts and the eggs photo in the pre-footer
# and gave it a 1510px height. The pre-footer's own band is 7039..7686 (647px,
# aspect 3.21 -- 449px at 1440, so the built 432px is about 4% short, not the
# +4.9% the old table implied). Review item WI-21.
SEAMS = [
    (   0.0, 1326.0, '1  HERO'),
    ( 802.0, 2165.0, '2  WHAT IS REGENERATIVE'),
    (1787.0, 3049.0, '3  REGEN AGRICULTURE'),
    (2629.0, 3992.0, '4  THE NEXT GENERATION'),
    (3808.0, 4592.0, '5  PHOTO ROW'),
    (4275.0, 5718.0, '6  HIGHEST STANDARDS'),
    (5513.0, 6988.5, '7  WHAT MAKES REGEN DIFFERENT'),
    (7039.0, 7686.0, '8  PRE FOOTER'),
    (7686.0, 8481.0, '9  FOOTER'),
]

def all_leaves():
    out=[]
    for d in descendants(AB):
        if kids.get(d) or is_scaffold(d): continue
        n=nodes[d]
        if not n.get('visible',True): continue
        w,h=size(n)
        if w<=0 or h<=0: continue
        x,y=rel(d)
        out.append(dict(x=x,y=y,w=w,h=h,name=str(n.get('name') or ''),
                        type=n.get('type'),id=d))
    return sorted(out,key=lambda r:(r['y'],r['x']))

def core(y0):
    """The band starting at y0 owns y0 up to the next band's start."""
    starts = sorted(b[0] for b in SEAMS)
    nxt = [v for v in starts if v > y0]
    return y0, (nxt[0] if nxt else float('inf'))

def in_band(r, y0, y1):
    """A leaf belongs to exactly one band: the one whose core holds its
    centre. y1 is accepted for the callers' signature but the extent is not
    used for assignment -- extents overlap."""
    c0, c1 = core(y0)
    cy = r['y'] + r['h']/2
    return c0 <= cy < c1
