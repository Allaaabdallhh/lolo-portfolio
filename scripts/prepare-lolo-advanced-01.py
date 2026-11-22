"""Extract the Hero silhouette locally from the supplied navy portrait."""

from importlib.util import module_from_spec, spec_from_file_location
from pathlib import Path

import numpy as np
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "LOLO_PHASE_04_VISUAL_STORY_PACKAGE/source-assets/IMG-20261121-WA0010.jpg"
OUTPUT = ROOT / "assets/hero"
MODEL = ROOT / "assets/source/u2net_human_seg.onnx"

spec = spec_from_file_location("portrait_pipeline", ROOT / "scripts/prepare-lolo-portrait.py")
pipeline = module_from_spec(spec)
spec.loader.exec_module(pipeline)

with Image.open(SOURCE) as original:
    photo = ImageOps.exif_transpose(original).convert("RGB")
    if photo.size != (960, 1280):
        raise ValueError(f"Unexpected source dimensions: {photo.size}")
    subject = photo.crop((263, 300, 695, 1280))

alpha = pipeline.predict_mask(subject, MODEL)
# Suppress red curtain spill in the gaps around the navy dress and arms.
rgb = np.asarray(subject, dtype=np.float32)
red, green, blue = rgb.transpose(2, 0, 1)
curtain = np.clip((red - blue * 1.77 - 10) / 34, 0, 1)
curtain *= np.clip((red - green * 1.95 - 12) / 36, 0, 1)
curtain[:145, :] = 0
alpha *= 1 - curtain
# Exclude the narrow curtain fold that the mask retained behind the right elbow.
rows, cols = np.ogrid[:subject.height, :subject.width]
edge = np.interp(rows, [360, 440, 480, 590, 732], [360, 347, 344, 338, 336])
alpha *= np.where(rows < 360, 1, np.clip((edge - cols) / 1.8, 0, 1))
portrait = pipeline.restore_photo(subject, alpha)
# Keep the original face and torso anchored in the composition. CSS blends the lower edge.
portrait = portrait.crop((90, 0, 378, 732))
portrait.save(OUTPUT / "alaa-navy-hero.webp", quality=92, alpha_quality=100, method=6)
print(portrait.size, (OUTPUT / "alaa-navy-hero.webp").stat().st_size)
