"""Convert .ai (PDF-based Illustrator) files to SVG using PyMuPDF."""
import sys
import re
from pathlib import Path
import fitz

SRC = Path(r"C:\Users\david\Documents\landinginstituto\public\vectores_logos")
DST = Path(r"C:\Users\david\Documents\landinginstituto\public\logos")
DST.mkdir(parents=True, exist_ok=True)

# Map AI filename -> output slug
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

def convert(ai_path: Path, out_path: Path):
    doc = fitz.open(ai_path)
    page = doc[0]
    svg = page.get_svg_image(text_as_path=True)
    out_path.write_text(svg, encoding="utf-8")
    doc.close()
    return out_path

def main():
    files = list(SRC.glob("*.ai")) + list(SRC.glob("*.AI"))
    print(f"Found {len(files)} AI files")
    for f in files:
        stem = f.stem.upper()
        slug = None
        for k, v in NAME_MAP.items():
            if k.upper() == stem:
                slug = v
                break
        if not slug:
            slug = re.sub(r"[^a-z0-9]+", "-", f.stem.lower()).strip("-")
        out = DST / f"{slug}.svg"
        try:
            convert(f, out)
            size = out.stat().st_size
            print(f"OK  {f.name}  ->  {out.name}  ({size} bytes)")
        except Exception as e:
            print(f"ERR {f.name}: {e}")

if __name__ == "__main__":
    main()
