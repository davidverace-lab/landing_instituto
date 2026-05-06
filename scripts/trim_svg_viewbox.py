"""Re-export AI -> SVG with viewBox tightened to the artwork's real bbox.

The ICAVE .ai is on an A4-ish page so the logo sits in a corner with lots of
whitespace. PyMuPDF gives us the actual drawing bbox via page.bound() of the
rendered content; we use cropbox + drawings to find the artwork's real extent.
"""
from pathlib import Path
import re
import fitz

SRC = Path(r"C:\Users\david\Documents\landinginstituto\public\vectores_logos")
DST = Path(r"C:\Users\david\Documents\landinginstituto\public\logos")

NAME_MAP = {
    "HP-ICAVE LOGO RGB COLOUR POS": "icave",
    "HUTCHISON PORTS ECV RGB COLOUR POS": "ecv",
    "HUTCHISON PORTS EIT RGB COLOUR POS": "eit",
    "HUTCHISON PORTS HUTCHISON LOGISTICS CMYK COLOUR POS": "hp-logistics",
    "HUTCHISON PORTS LCMT RGB COLOUR POS": "lcmt",
    "HUTCHISON PORTS LCT RGB COLOUR POS": "lct",
    "HUTCHISON PORTS TILH MASTER RGB COLOUR POS": "tilh",
    "HUTCHISON PORTS TIMSA RGB COLOUR POS": "timsa",
    "HUTCHISON PORTS TNG RGB COLOUR POS": "tng",
}

def real_bbox(page: fitz.Page) -> fitz.Rect:
    """Compute tight bbox of all drawings + images on the page."""
    rect = fitz.Rect()
    rect.x0 = float("inf")
    rect.y0 = float("inf")
    rect.x1 = float("-inf")
    rect.y1 = float("-inf")
    for d in page.get_drawings():
        r = d.get("rect")
        if r:
            rect.include_rect(r)
    for img in page.get_image_info(xrefs=False):
        r = fitz.Rect(img["bbox"])
        rect.include_rect(r)
    if not (rect.x0 < rect.x1 and rect.y0 < rect.y1):
        return page.rect
    # small padding (1% of size)
    pad_x = (rect.x1 - rect.x0) * 0.02
    pad_y = (rect.y1 - rect.y0) * 0.02
    rect.x0 -= pad_x
    rect.y0 -= pad_y
    rect.x1 += pad_x
    rect.y1 += pad_y
    rect &= page.rect
    return rect

def tight_svg(ai_path: Path, out_path: Path):
    doc = fitz.open(ai_path)
    page = doc[0]
    bbox = real_bbox(page)
    # Render SVG with explicit clip to bbox by setting cropbox temporarily.
    page.set_cropbox(bbox)
    svg = page.get_svg_image(text_as_path=True)
    # Force width/height removal and tighten viewBox to bbox dimensions.
    w = bbox.width
    h = bbox.height
    # Replace svg root attributes
    svg = re.sub(
        r'<svg[^>]*>',
        lambda m: re.sub(
            r'\s(width|height|viewBox)="[^"]*"',
            '',
            m.group(0),
        ).replace(
            '<svg',
            f'<svg viewBox="0 0 {w:.3f} {h:.3f}"',
            1,
        ),
        svg,
        count=1,
    )
    out_path.write_text(svg, encoding="utf-8")
    doc.close()
    return bbox

def main():
    DST.mkdir(parents=True, exist_ok=True)
    files = list(SRC.glob("*.ai")) + list(SRC.glob("*.AI"))
    seen = set()
    for f in files:
        stem = f.stem.upper()
        slug = next((v for k, v in NAME_MAP.items() if k.upper() == stem), None)
        if not slug or slug in seen:
            continue
        seen.add(slug)
        out = DST / f"{slug}.svg"
        bbox = tight_svg(f, out)
        print(f"OK  {slug:14s}  bbox={bbox.width:7.2f} x {bbox.height:6.2f}  ratio={bbox.width/bbox.height:.2f}")

if __name__ == "__main__":
    main()
