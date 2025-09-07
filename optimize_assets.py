#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import sys
import subprocess
from pathlib import Path
from typing import List

try:
    from PIL import Image
except ImportError:
    print('未安装 Pillow，正在尝试使用 pip 安装...')
    subprocess.run([sys.executable, '-m', 'pip', 'install', '--quiet', 'Pillow'], check=False)
    from PIL import Image  # type: ignore

ROOT = Path(__file__).resolve().parent
SRC_IMAGES = ROOT / 'images' / 'pictures'
SRC_MUSICS = ROOT / 'musics'
BUILD_DIR = ROOT / 'build'
OUT_IMAGES = BUILD_DIR / 'images' / 'pictures'
OUT_MUSICS = BUILD_DIR / 'musics'

IMAGE_EXTS = {'.jpg', '.jpeg', '.png', '.heic', '.JPG', '.JPEG', '.PNG', '.HEIC'}
AUDIO_EXTS = {'.mp3', '.wav', '.m4a', '.aac', '.flac', '.ogg'}


def ensure_dir(path: Path) -> None:
    path.mkdir(parents=True, exist_ok=True)


def convert_image_to_webp(src: Path, dst: Path, quality: int = 75, max_width: int = 1920) -> None:
    try:
        with Image.open(src) as im:
            im.load()
            # 尺寸压缩：最长边不超过 max_width
            w, h = im.size
            if max(w, h) > max_width:
                if w >= h:
                    new_w = max_width
                    new_h = int(h * (max_width / float(w)))
                else:
                    new_h = max_width
                    new_w = int(w * (max_width / float(h)))
                im = im.resize((new_w, new_h), Image.LANCZOS)
            # 转 RGB 以兼容
            if im.mode not in ('RGB', 'RGBA'):
                im = im.convert('RGB')
            im.save(dst, 'WEBP', quality=quality, method=6)
            print(f'[IMG] {src} -> {dst}')
    except Exception as e:
        print(f'[IMG][ERR] {src}: {e}')


def process_images() -> None:
    if not SRC_IMAGES.exists():
        print(f'图片目录不存在: {SRC_IMAGES}')
        return
    for src in SRC_IMAGES.rglob('*'):
        if not src.is_file():
            continue
        if src.suffix in IMAGE_EXTS:
            rel = src.relative_to(SRC_IMAGES)
            dst = (OUT_IMAGES / rel).with_suffix('.webp')
            ensure_dir(dst.parent)
            convert_image_to_webp(src, dst)


def has_cmd(cmd: str) -> bool:
    return subprocess.call(['which', cmd], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL) == 0


def transcode_audio_ffmpeg(src: Path, dst_m4a: Path, dst_ogg: Path, bitrate: str = '128k') -> None:
    # 生成 m4a (AAC)
    try:
        if not dst_m4a.exists():
            subprocess.run([
                'ffmpeg', '-y', '-i', str(src),
                '-vn', '-acodec', 'aac', '-b:a', bitrate,
                str(dst_m4a)
            ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
            print(f'[AUD] {src} -> {dst_m4a}')
    except Exception as e:
        print(f'[AUD][ERR m4a] {src}: {e}')
    # 生成 ogg (Vorbis)
    try:
        if not dst_ogg.exists():
            subprocess.run([
                'ffmpeg', '-y', '-i', str(src),
                '-vn', '-c:a', 'libvorbis', '-b:a', bitrate,
                str(dst_ogg)
            ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
            print(f'[AUD] {src} -> {dst_ogg}')
    except Exception as e:
        print(f'[AUD][ERR ogg] {src}: {e}')


def process_musics() -> None:
    if not SRC_MUSICS.exists():
        print(f'音乐目录不存在: {SRC_MUSICS}')
        return
    if not has_cmd('ffmpeg'):
        print('未检测到 ffmpeg，请先安装：brew install ffmpeg')
        return
    ensure_dir(OUT_MUSICS)
    for src in SRC_MUSICS.iterdir():
        if not src.is_file():
            continue
        if src.suffix.lower() in AUDIO_EXTS:
            dst_m4a = (OUT_MUSICS / src.name).with_suffix('.m4a')
            dst_ogg = (OUT_MUSICS / src.name).with_suffix('.ogg')
            transcode_audio_ffmpeg(src, dst_m4a, dst_ogg)


def main():
    ensure_dir(BUILD_DIR)
    process_images()
    process_musics()
    print('\n完成：')
    print(f'- 压缩图片输出：{OUT_IMAGES}')
    print(f'- 压缩音乐输出：{OUT_MUSICS}')


if __name__ == '__main__':
    main() 