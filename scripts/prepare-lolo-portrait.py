"""Build the local gift-preview portrait from the original screenshot and U²-Net ONNX weights."""

from pathlib import Path
import argparse

import numpy as np
import onnxruntime as ort
from PIL import Image, ImageDraw, ImageEnhance, ImageFilter


ROOT = Path(__file__).resolve().parents[1]
PHOTO_BOX = (8, 432, 720, 1382)
PERSON_BOX = (271, 397, 521, 950)  # Relative to the photograph, with context for the mask.


def predict_mask(photo, model):
    pixels = np.asarray(photo.resize((320, 320), Image.Resampling.LANCZOS), dtype=np.float32)
    pixels /= pixels.max()
    pixels = (pixels - np.array([0.485, 0.456, 0.406], dtype=np.float32)) / np.array(
        [0.229, 0.224, 0.225], dtype=np.float32
    )
    options = ort.SessionOptions()
    options.intra_op_num_threads = 3
    session = ort.InferenceSession(str(model), sess_options=options, providers=["CPUExecutionProvider"])
    output = session.run(None, {session.get_inputs()[0].name: pixels.transpose(2, 0, 1)[None]})
    mask = output[0].squeeze()
    minimum, maximum = float(mask.min()), float(mask.max())
    if maximum <= minimum:
        raise ValueError("The segmentation model returned an empty mask.")
    mask = (mask - minimum) / (maximum - minimum)
    mask = Image.fromarray(np.uint8(mask * 255)).resize(photo.size, Image.Resampling.LANCZOS)
    mask = np.asarray(mask, dtype=np.float32) / 255
    return np.clip((mask - 0.22) / 0.64, 0, 1)


def repair_front_shoe(alpha, size):
    # The model omits the pale forward shoe. Restore only the visible source pixels.
    source_outline = [
        (344, 1327), (347, 1322), (353, 1328), (362, 1331),
        (369, 1332), (372, 1338), (374, 1351), (376, 1359),
        (379, 1365), (381, 1375), (380, 1382), (349, 1382),
        (348, 1375), (348, 1368), (347, 1361), (347, 1354),
        (345, 1346), (344, 1338),
    ]
    scale = 4
    origin = (PHOTO_BOX[0] + PERSON_BOX[0], PHOTO_BOX[1] + PERSON_BOX[1])
    corrected = Image.new("L", (size[0] * scale, size[1] * scale))
    points = [((x - origin[0]) * scale, (y - origin[1]) * scale) for x, y in source_outline]
    ImageDraw.Draw(corrected).polygon(points, fill=255)
    corrected = corrected.resize(size, Image.Resampling.LANCZOS).filter(ImageFilter.GaussianBlur(0.45))
    return np.maximum(alpha, np.asarray(corrected, dtype=np.float32) / 255)


def restore_photo(photo, alpha):
    denoised = Image.blend(photo, photo.filter(ImageFilter.MedianFilter(3)), 0.16)
    restored = ImageEnhance.Color(denoised).enhance(0.98)
    restored = restored.filter(ImageFilter.UnsharpMask(radius=0.8, percent=48, threshold=4))
    rgb = np.asarray(restored, dtype=np.float32)
    alpha_image = Image.fromarray(np.uint8(alpha * 255))

    # Pull edge RGB toward nearby mostly opaque foreground to reduce bright doorway fringe.
    solid = Image.fromarray(np.uint8(alpha >= 0.90) * 255)
    soft_weight = np.asarray(solid.filter(ImageFilter.GaussianBlur(1.5)), dtype=np.float32) / 255
    for index, channel in enumerate(restored.split()):
        weighted = Image.composite(channel, Image.new("L", restored.size), solid)
        weighted = np.asarray(weighted.filter(ImageFilter.GaussianBlur(1.5)), dtype=np.float32)
        foreground = weighted / np.maximum(soft_weight, 1 / 255)
        amount = (1 - alpha) * 0.70 * (soft_weight > 0.035)
        rgb[:, :, index] = rgb[:, :, index] * (1 - amount) + foreground * amount

    portrait = Image.fromarray(np.uint8(np.clip(rgb, 0, 255)))
    portrait.putalpha(alpha_image)
    return portrait


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--source", type=Path, default=ROOT / "assets/source/alaa-instagram.jpg")
    parser.add_argument("--model", type=Path, default=ROOT / "assets/source/u2net_human_seg.onnx")
    parser.add_argument("--output", type=Path, default=ROOT / "assets/hero")
    args = parser.parse_args()
    args.output.mkdir(parents=True, exist_ok=True)

    with Image.open(args.source) as original:
        if original.size != (720, 1600):
            raise ValueError(f"Unexpected input geometry: {original.size}")
        photo = original.convert("RGB").crop(PHOTO_BOX)
    photo.save(args.output / "alaa-photo-crop.webp", quality=92, method=6)

    subject = photo.crop(PERSON_BOX)
    alpha = repair_front_shoe(predict_mask(subject, args.model), subject.size)
    portrait = restore_photo(subject, alpha)
    box = portrait.getbbox(alpha_only=True)
    if box is None:
        raise ValueError("Portrait alpha is empty.")
    left, top, right, bottom = box
    portrait = portrait.crop((max(0, left - 8), max(0, top - 8), min(subject.width, right + 8), min(subject.height, bottom + 5)))
    master = portrait.resize((portrait.width * 2, portrait.height * 2), Image.Resampling.LANCZOS)
    master.save(args.output / "alaa-portrait-cutout.png", optimize=True)
    master.save(args.output / "alaa-portrait-cutout.webp", quality=88, alpha_quality=98, method=6)
    preview = Image.new("RGBA", master.size, "#08080a")
    Image.alpha_composite(preview, master).save(args.output / "cutout-inspection.png")
    print(f"Photo {photo.size}, native cutout {portrait.size}, master {master.size}, mask bounds {box}")
    for path in sorted(args.output.iterdir()):
        print(f"{path.name}: {path.stat().st_size:,} bytes")


if __name__ == "__main__":
    main()
