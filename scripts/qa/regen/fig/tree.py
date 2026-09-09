import os as _os
_HERE = _os.path.dirname(_os.path.abspath(__file__))
import kiwi, json
r = kiwi.R(open(_HERE+'/doc.bin','rb').read())
msg = kiwi.read_msg(r, kiwi.BY_NAME['Message'])
nc = msg['nodeChanges']
def gid(g): return f"{g['sessionID']}:{g['localID']}" if isinstance(g,dict) else str(g)
nodes={gid(n['guid']):n for n in nc}
kids={}
for k,n in nodes.items():
    pi=n.get('parentIndex')
    if pi and isinstance(pi,dict):
        kids.setdefault(gid(pi['guid']),[]).append((pi.get('position',''),k))
for p in kids: kids[p].sort()
def size(n):
    s=n.get('size') or {}; return (s.get('x',0), s.get('y',0))
def pos(n):
    t=n.get('transform') or {}; return (t.get('m02',0), t.get('m12',0))
