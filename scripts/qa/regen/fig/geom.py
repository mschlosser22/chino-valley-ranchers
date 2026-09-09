import os as _os
_HERE = _os.path.dirname(_os.path.abspath(__file__))
"""Shared helpers: absolute geometry relative to the artboard."""
exec(open(_HERE+'/tree.py').read())

AB = '5:5'
ABW, ABH = size(nodes[AB])

def parent(k):
    pi = nodes[k].get('parentIndex')
    return gid(pi['guid']) if isinstance(pi, dict) else None

def _abs(k):
    x = y = 0.0; c = k
    while c:
        px, py = pos(nodes[c]); x += px; y += py; c = parent(c)
    return x, y

_ABX, _ABY = _abs(AB)

def rel(k):
    """Position relative to the artboard's top-left."""
    x, y = _abs(k); return x - _ABX, y - _ABY

def descendants(k):
    out = []
    stack = [k]
    while stack:
        c = stack.pop()
        for _, ch in kids.get(c, []):
            out.append(ch); stack.append(ch)
    return out

def content_bounds(k, skip_full_artboard=True):
    """True ink extent of a band: the union of its leaf children's boxes,
    ignoring the oversized clipping wrappers that span the whole artboard."""
    xs0=ys0=1e9; xs1=ys1=-1e9
    for d in descendants(k):
        n = nodes[d]
        w, h = size(n)
        if w <= 0 or h <= 0: continue
        if skip_full_artboard and w >= ABW*0.99 and h >= ABH*0.90: continue
        if not n.get('visible', True): continue
        x, y = rel(d)
        xs0=min(xs0,x); ys0=min(ys0,y); xs1=max(xs1,x+w); ys1=max(ys1,y+h)
    if xs1 < xs0: return None
    return xs0, ys0, xs1-xs0, ys1-ys0


def is_scaffold(k):
    """Clipping wrappers, masks and oversized texture planes carry no layout
    information -- they are far larger than the band they belong to. The
    masked child (e.g. "TEXTURE BG copy 7") is the one that gives real bounds."""
    n = nodes[k]
    nm = str(n.get('name') or '')
    w, h = size(n)
    if nm.startswith('Mask') or nm.startswith('Clipping'): return True
    if w >= ABW*0.99 and h >= ABH*0.90: return True      # full-artboard plane
    if w > ABW*1.6 or h > ABH*0.45: return True          # oversized wrapper
    return False

def band_bounds(k):
    """Vertical extent of a band from its real content."""
    xs0=ys0=1e9; xs1=ys1=-1e9
    for d in descendants(k):
        if is_scaffold(d): continue
        n = nodes[d]
        if not n.get('visible', True): continue
        w, h = size(n)
        if w <= 0 or h <= 0: continue
        x, y = rel(d)
        xs0=min(xs0,x); ys0=min(ys0,y); xs1=max(xs1,x+w); ys1=max(ys1,y+h)
    if xs1 < xs0: return None
    return xs0, ys0, xs1-xs0, ys1-ys0
