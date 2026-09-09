import json, struct

import os as _os; defs = json.load(open(_os.path.join(_os.path.dirname(_os.path.abspath(__file__)),'schema.json')))
BY_ID = defs                      # index == type id for user types
BY_NAME = {d['name']: i for i, d in enumerate(defs)}

class R:
    def __init__(s, b): s.b, s.p = b, 0
    def byte(s):
        v = s.b[s.p]; s.p += 1; return v
    def u32(s):
        r = 0; sh = 0
        while True:
            b = s.byte(); r |= (b & 0x7f) << sh
            if b < 0x80: break
            sh += 7
        return r & 0xffffffff
    def i32(s):
        v = s.u32(); return (v >> 1) ^ -(v & 1)
    def f32(s):
        # Kiwi rotates the IEEE bits left by 9 so the exponent lands in the
        # first byte; a lone 0x00 byte therefore encodes 0.0. Rotate back.
        if s.b[s.p] == 0:
            s.p += 1; return 0.0
        v = struct.unpack_from('<I', s.b, s.p)[0]; s.p += 4
        v = ((v << 23) | (v >> 9)) & 0xffffffff
        return struct.unpack('<f', struct.pack('<I', v))[0]
    def string(s):
        st = s.p
        while s.b[s.p] != 0: s.p += 1
        v = s.b[st:s.p].decode('utf8', 'replace'); s.p += 1
        return v
    def bool(s): return bool(s.byte())

BUILTIN = {-1:'bool', -2:'byte', -3:'int', -4:'uint', -5:'float', -6:'string', -7:'int64', -8:'uint64'}

def read_val(r, t):
    if t == -1: return r.bool()
    if t == -2: return r.byte()
    if t == -3: return r.i32()
    if t == -4: return r.u32()
    if t == -5: return r.f32()
    if t == -6: return r.string()
    if t in (-7, -8):
        lo = r.u32(); hi = r.u32(); return (hi << 32) | lo
    d = BY_ID[t]
    if d['kind'] == 0:   # ENUM
        v = r.u32()
        for f in d['fields']:
            if f['value'] == v: return f['name']
        return v
    return read_msg(r, t)

def read_msg(r, tid):
    d = BY_ID[tid]
    out = {}
    if d['kind'] == 1:              # STRUCT: all fields, in order
        for f in d['fields']:
            out[f['name']] = read_arr(r, f)
        return out
    while True:                     # MESSAGE: tagged
        tag = r.u32()
        if tag == 0: return out
        f = next((x for x in d['fields'] if x['value'] == tag), None)
        if f is None: return out    # unknown field: cannot skip safely
        out[f['name']] = read_arr(r, f)

def read_arr(r, f):
    if f['array']:
        n = r.u32()
        return [read_val(r, f['type']) for _ in range(n)]
    return read_val(r, f['type'])
