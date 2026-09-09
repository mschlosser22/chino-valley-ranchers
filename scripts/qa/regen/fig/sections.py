import os as _os
_HERE = _os.path.dirname(_os.path.abspath(__file__))
import sys; sys.path.insert(0,_HERE)
from geom import *

# Section seams read off the full-width background planes. Each entry is
# (y_start, y_end, label). Ends are the next section's start, so the bands
# tile the artboard with no gaps.
SEAMS = [
    (   0.0, 1326.0, '1  HERO'),
    ( 802.0, 2165.0, '2  WHAT IS REGENERATIVE'),
    (1787.0, 3049.0, '3  REGEN AGRICULTURE'),
    (2629.0, 3992.0, '4  THE NEXT GENERATION'),
    (3808.0, 4592.0, '5  PHOTO ROW'),
    (4275.0, 5718.0, '6  HIGHEST STANDARDS'),
    (5513.0, 6988.5, '7  WHAT MAKES REGEN DIFFERENT'),
    (6441.0, 7951.0, '8  PRE FOOTER'),
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

def in_band(r, y0, y1):
    """A leaf belongs to the band its own centre falls inside."""
    cy = r['y'] + r['h']/2
    return y0 <= cy < y1
