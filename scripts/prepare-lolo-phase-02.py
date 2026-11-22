"""Prepare the locally supplied Phase 02 portrait and certificates."""

from importlib.util import module_from_spec, spec_from_file_location
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "assets/source"
OUTPUT = ROOT / "assets/hero"
pipeline_spec = spec_from_file_location("portrait_pipeline", ROOT / "scripts/prepare-lolo-portrait.py")
pipeline = module_from_spec(pipeline_spec)
pipeline_spec.loader.exec_module(pipeline)


def portrait():
    with Image.open(SOURCE / "phase-02-portrait.jpg") as image:
        if image.size != (666, 1280):
            raise ValueError(f"Unexpected portrait dimensions: {image.size}")
        subject = image.convert("RGB").crop((155, 130, 666, 1280))
    alpha = pipeline.predict_mask(subject, SOURCE / "u2net_human_seg.onnx")
    # Mask a door-frame artifact above the scarf and the background gap at her elbow.
    exclusions = Image.new("L", subject.size)
    draw = ImageDraw.Draw(exclusions)
    draw.polygon([(173, 0), (355, 0), (355, 47), (304, 46), (284, 36),
                  (262, 30), (244, 29), (223, 34), (205, 42), (188, 57)], fill=255)
    draw.polygon([(116, 478), (130, 499), (136, 529), (132, 552),
                  (129, 576), (121, 557), (114, 531), (112, 506)], fill=255)
    exclusions = np.asarray(exclusions.filter(ImageFilter.GaussianBlur(0.65)), dtype=np.float32) / 255
    alpha *= 1 - exclusions
    prepared = pipeline.restore_photo(subject, alpha).crop((12, 18, 493, 850))
    prepared.save(OUTPUT / "phase-02-portrait.png", optimize=True)
    prepared.save(OUTPUT / "phase-02-portrait.webp", quality=88, alpha_quality=98, method=6)
    inspection = Image.new("RGBA", prepared.size, "#111114")
    Image.alpha_composite(inspection, prepared).save(OUTPUT / "phase-02-portrait-inspection.png")
    print("Portrait", prepared.size, "bounds", prepared.getbbox(alpha_only=True), "pixels", int(np.count_nonzero(alpha)))


def document(name, bounds=None):
    with Image.open(SOURCE / f"phase-02-{name}.jpg") as image:
        original = image.convert("RGB")
        if bounds is not None:
            original = original.crop(bounds)
        original.save(OUTPUT / f"phase-02-{name}.webp", lossless=True, method=6)
        preview = original.copy()
        preview.thumbnail((420, 540), Image.Resampling.LANCZOS)
        preview.save(OUTPUT / f"phase-02-{name}-thumb.webp", quality=90, method=6)
        print(name, "full", original.size, "thumbnail", preview.size)


if __name__ == "__main__":
    OUTPUT.mkdir(parents=True, exist_ok=True)
    portrait()
    document("attendance")
    document("course", (0, 68, 591, 1120))
    for path in sorted(OUTPUT.glob("phase-02-*")):
        print(path.name, path.stat().st_size)
