"""Refine the existing private portrait master and certificate previews."""

from pathlib import Path

from PIL import Image, ImageEnhance, ImageFilter

assets = Path(__file__).resolve().parents[1] / "assets/hero"

with Image.open(assets / "phase-02-portrait.png") as image:
    rgba = image.convert("RGBA")
    _, _, _, alpha = rgba.split()
    # Keep the original face and clothing pixels. Trim only the weakest matte fringe.
    alpha = alpha.point(lambda a: 0 if a < 14 else round((a - 14) * 255 / 241))
    color = ImageEnhance.Contrast(rgba.convert("RGB")).enhance(1.025)
    color = color.filter(ImageFilter.UnsharpMask(radius=0.65, percent=34, threshold=4))
    color.putalpha(alpha)
    color.save(assets / "phase-03-portrait.webp", quality=90, alpha_quality=100, method=6)
    print("portrait", color.size, (assets / "phase-03-portrait.webp").stat().st_size)

for name in ("course", "attendance"):
    with Image.open(assets / f"phase-02-{name}.webp") as image:
        image.thumbnail((540, 690), Image.Resampling.LANCZOS)
        output = assets / f"phase-03-{name}-thumb.webp"
        image.save(output, quality=94, method=6)
        print(name, image.size, output.stat().st_size)
