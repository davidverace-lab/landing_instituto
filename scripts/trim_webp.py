"""Trim transparent/white whitespace around hutchisonports.webp."""
from PIL import Image, ImageChops
from pathlib import Path

SRC = Path(r"C:\Users\david\Documents\landinginstituto\public\webp\hutchisonports.webp")
DST = Path(r"C:\Users\david\Documents\landinginstituto\public\logos\hutchisonports.webp")

im = Image.open(SRC)
print(f"Original: {im.width} x {im.height}, mode={im.mode}")

# If has alpha, trim by alpha; otherwise trim by white background.
if im.mode in ("RGBA", "LA"):
    bbox = im.getchannel("A").getbbox()
else:
    rgb = im.convert("RGB")
    bg = Image.new("RGB", rgb.size, (255, 255, 255))
    diff = ImageChops.difference(rgb, bg)
    bbox = diff.getbbox()

print(f"Detected bbox: {bbox}")
if bbox:
    cropped = im.crop(bbox)
    print(f"Cropped: {cropped.width} x {cropped.height}, ratio={cropped.width/cropped.height:.2f}:1")
    DST.parent.mkdir(parents=True, exist_ok=True)
    cropped.save(DST, "WEBP", quality=95, lossless=False)
    print(f"Saved: {DST}")
else:
    print("No content found")
