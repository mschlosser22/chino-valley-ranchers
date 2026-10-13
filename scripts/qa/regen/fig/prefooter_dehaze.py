import sys
from PIL import Image
import numpy as np
src,dst=sys.argv[1],sys.argv[2]
im=np.array(Image.open(src).convert('RGBA')).astype(np.float64)
H,W,_=im.shape
out=im.copy()
top=np.array([6,7,9],float)
for x in range(880,W):
    # Feather in across the photo's own cross-fade so there is no column step.
    t=min(1,(x-880)/60); wx=t*t*(3-2*t)
    base=im[100,x,:3]
    for y in range(0,96):
        # Rows above 30 are the tear's soft, semi-transparent fringe. Left grey
        # they ended in a hard line where the dark rows began.
        f=max(0,(y-30)/(95-30))
        new=top*(1-f)+base*f
        out[y,x,:3]=im[y,x,:3]*(1-wx)+new*wx
out[...,3]=im[...,3]  # alpha untouched
Image.fromarray(out.round().clip(0,255).astype(np.uint8),'RGBA').save(dst,'WEBP',quality=92,method=6,alpha_quality=100,exact=True)
a=np.array(Image.open(src).convert('RGBA'))[...,3]; b=np.array(Image.open(dst).convert('RGBA'))[...,3]
print('alpha identical:', np.array_equal(a,b), 'size', Image.open(dst).size)
