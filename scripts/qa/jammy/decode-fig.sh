#!/usr/bin/env bash
# Decode CVR_JammyWebsite_r1.fig into readable design data.
#
# A .fig is a "fig-kiwi" container: an 8-byte magic, a u32 version, then
# length-prefixed blocks. Block 1 (the schema) is zlib. Block 2 (the document)
# is ZSTD, not zlib -- `strings` on the raw file returns nothing useful, which
# is not evidence that the file is unreadable.
#
#   ./decode-fig.sh "ref/FIN Deliverables/CVR_JammyWebsite_r1.fig" outdir
set -euo pipefail
FIG="${1:?path to .fig}"; OUT="${2:-fig-decoded}"
mkdir -p "$OUT"; cd "$OUT"
unzip -o -q "$OLDPWD/$FIG" 2>/dev/null || cp "$OLDPWD/$FIG" canvas.fig
python3 - <<'PY'
import struct
d=open('canvas.fig','rb').read()
assert d[:8]==b'fig-kiwi', d[:8]
pos=8+4
n1=struct.unpack_from('<I',d,pos)[0]; pos+=4+n1      # skip schema block
n2=struct.unpack_from('<I',d,pos)[0]; start=pos+4
open('data.zst','wb').write(d[start:start+n2])
print('extracted data.zst', n2, 'bytes')
PY
zstd -d -f data.zst -o data.bin
echo "wrote $OUT/data.bin -- grep it for text nodes and font postscript names"
