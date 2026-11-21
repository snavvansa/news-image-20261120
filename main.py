"""Friday 20 November 2026 in one image.

Writes the front page held in this repository (entry.png, rendered from
src/page.html by tools/render.mjs) to /output/entry.png. Standard library only,
no network, and the same bytes on every run.

Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
    mkdir -p out && MAKEFUN_OUTPUT_DIR=out python3 main.py
"""

import os
import shutil
from pathlib import Path

HERE = Path(__file__).resolve().parent
OUT_DIR = Path(os.environ.get("MAKEFUN_OUTPUT_DIR", "/output"))


PNG_SIGNATURE = b"\x89PNG\r\n\x1a\n"
MAX_BYTES = 1048576  # the gate's 1 MiB limit


def check(data: bytes) -> None:
    """Refuse to write anything the gate would reject: not a PNG, too big, or not 1024 x 1024 at most."""
    if not data.startswith(PNG_SIGNATURE):
        raise SystemExit("entry.png is not a PNG")
    if len(data) > MAX_BYTES:
        raise SystemExit(f"entry.png is {len(data)} bytes, over 1 MiB")
    width = int.from_bytes(data[16:20], "big")
    height = int.from_bytes(data[20:24], "big")
    if width > 1024 or height > 1024:
        raise SystemExit(f"entry.png is {width}x{height}, over 1024x1024")


def main() -> None:
    src = HERE / "entry.png"
    check(src.read_bytes())
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    shutil.copyfile(src, OUT_DIR / "entry.png")


if __name__ == "__main__":
    main()
