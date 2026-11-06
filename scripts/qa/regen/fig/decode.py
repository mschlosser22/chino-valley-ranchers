#!/usr/bin/env python3
"""Read the CVR Regen Page design geometry straight out of the .fig.

Every placement error on this page came from measuring a scaled screenshot.
The design file carries exact numbers, so read those instead.

  python3 scripts/qa/regen/fig/decode.py ~/Downloads/"CVR Regen Page.fig" [filter]

`filter` is an optional case-insensitive substring; only nodes whose name
matches are printed. Positions are absolute, relative to the artboard's
top-left, and the percentage columns are of the 2075px artboard width.

Format notes, both of which cost time to work out:
  * canvas.fig is a fig-kiwi container -- 8-byte magic, uint32 version, then
    length-prefixed blocks. Block 0 is the schema (raw zlib, -15 window);
    block 1 is the document (ZSTD). `strings` finds nothing in either, which
    is not evidence they are unreadable.
  * kiwi floats are the IEEE bits rotated LEFT by 9, so the exponent lands in
    the first byte and a lone 0x00 encodes 0.0. Decoding them as plain LE
    floats yields ~1e33 garbage.
"""
import os, sys, struct, zipfile, subprocess, tempfile, json

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)

def unpack(fig_path, workdir):
    raw = zipfile.ZipFile(fig_path).read("canvas.fig")
    assert raw[:8] == b"fig-kiwi", "not a fig-kiwi container"
    off = 12                                    # magic + uint32 version
    blocks = []
    while off < len(raw):
        n = struct.unpack_from("<I", raw, off)[0]; off += 4
        blocks.append(raw[off:off+n]); off += n
    import zlib
    schema = zlib.decompress(blocks[0], -15)
    open(os.path.join(workdir, "schema.bin"), "wb").write(schema)
    doc_z = os.path.join(workdir, "doc.zst")
    open(doc_z, "wb").write(blocks[1])
    doc = os.path.join(workdir, "doc.bin")
    subprocess.run(["zstd", "-d", "-f", "-q", doc_z, "-o", doc], check=True)
    return schema, doc

def parse_schema(schema, workdir):
    d, pos = schema, 0
    def u32():
        nonlocal pos
        r = sh = 0
        while True:
            b = d[pos]; pos += 1
            r |= (b & 0x7f) << sh
            if b < 0x80: return r
            sh += 7
    def i32():
        v = u32(); return (v >> 1) ^ -(v & 1)
    def st():
        nonlocal pos
        s0 = pos
        while d[pos]: pos += 1
        v = d[s0:pos].decode("utf8", "replace"); pos += 1
        return v
    defs = []
    for _ in range(u32()):
        name = st(); kind = d[pos]; pos += 1
        fields = []
        for _ in range(u32()):
            fn = st(); ft = i32(); arr = d[pos]; pos += 1; val = u32()
            fields.append(dict(name=fn, type=ft, array=bool(arr), value=val))
        defs.append(dict(name=name, kind=kind, fields=fields))
    json.dump(defs, open(os.path.join(workdir, "schema.json"), "w"))
    return defs

def main():
    if len(sys.argv) < 2:
        print(__doc__); sys.exit(2)
    fig = os.path.expanduser(sys.argv[1])
    want = sys.argv[2].lower() if len(sys.argv) > 2 else None
    work = tempfile.mkdtemp(prefix="fig-")
    parse_schema(*unpack(fig, work)[:1], work) if False else None
    schema, doc = unpack(fig, work)
    parse_schema(schema, work)
    os.environ["FIG_WORKDIR"] = work
    # kiwi.py reads schema.json from its own directory; point it at ours
    import shutil; shutil.copy(os.path.join(work, "schema.json"), os.path.join(HERE, "schema.json"))
    import kiwi
    r = kiwi.R(open(doc, "rb").read())
    msg = kiwi.read_msg(r, kiwi.BY_NAME["Message"])
    nc = msg["nodeChanges"]
    gid = lambda g: f"{g['sessionID']}:{g['localID']}"
    nodes = {gid(n["guid"]): n for n in nc}
    parent = {}
    for k, n in nodes.items():
        pi = n.get("parentIndex")
        if isinstance(pi, dict): parent[k] = gid(pi["guid"])
    def pos(k):
        t = nodes[k].get("transform") or {}
        return t.get("m02", 0.0), t.get("m12", 0.0)
    def absxy(k):
        x = y = 0.0
        while k:
            px, py = pos(k); x += px; y += py; k = parent.get(k)
        return x, y
    board = next((k for k, n in nodes.items()
                  if n.get("type") == "FRAME" and abs((n.get("size") or {}).get("x", 0) - 2075) < 2), None)
    bx, by = absxy(board) if board else (0.0, 0.0)
    ABW = (nodes[board].get("size") or {}).get("x", 2075.0) if board else 2075.0
    print(f"# artboard {board} width {ABW:.0f}\n")
    print(f"{'name':38s} {'type':18s} {'x':>8s} {'y':>8s} {'w':>8s} {'h':>8s} {'x%':>7s} {'w%':>7s}")
    rows = []
    for k, n in nodes.items():
        nm = str(n.get("name", ""))
        if want and want not in nm.lower(): continue
        s = n.get("size") or {}
        w, h = s.get("x", 0.0), s.get("y", 0.0)
        x, y = absxy(k); x -= bx; y -= by
        rows.append((y, x, nm, n.get("type", "?"), w, h))
    for y, x, nm, t, w, h in sorted(rows):
        print(f"{nm[:36]:38s} {t:18s} {x:8.1f} {y:8.1f} {w:8.1f} {h:8.1f} {x/ABW*100:7.2f} {w/ABW*100:7.2f}")

if __name__ == "__main__":
    main()
