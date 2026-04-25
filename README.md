# Cube 2048

A 3D twist on the classic 2048 puzzle. Tiles live inside a 3×3×3 cube, and you slide them along any of six directions to merge equal numbers. Built as a Progressive Web App.

[日本語版は下にあります / Japanese version below](#日本語)

## Features

- **3×3×3 grid** — 27 cells, six directions, one center tile hidden inside
- **Tap-to-push controls** — tap a face to slide tiles toward it; long-press to slide them the opposite way
- **Free 3D rotation** — drag to orbit the cube, pinch to zoom
- **Adjustable explode view** — slider to spread tiles apart and peek at the inside
- **Time attack records** — best time to reach 128 / 256 / 512 / 1024 / 2048
- **Auto-save & resume** — game state persists across sessions; the timer pauses when the app is in the background
- **Offline-ready** — full PWA, works without a network after the first load

## Tech Stack

- Vanilla JavaScript (no framework)
- [Three.js](https://threejs.org/) (r128) for 3D rendering
- Service Worker for offline caching
- localStorage for records, settings, and saved games

## Project Structure

```
.
├── index.html              # Game (single-file: HTML + CSS + JS)
├── manifest.json           # PWA manifest
├── sw.js                   # Service worker
├── privacy.html            # Privacy policy (EN/JA)
└── icons/
    ├── icon-192.png
    ├── icon-512.png
    └── icon-maskable-512.png
```

## Local Development

This is a static site with no build step. To run locally, serve the directory with any static HTTP server:

```bash
# Python
python3 -m http.server 8000

# Node.js
npx serve .
```

Then open `http://localhost:8000` in a browser.

> Service workers require HTTPS or `localhost`. Opening `index.html` directly via `file://` will not register the service worker.

## Configuration

A few constants in `index.html` are easy to tweak:

| Constant | Default | Description |
|---|---|---|
| `GRID` | `3` | Grid size per axis (3 → 27 cells) |
| `SLIDE_MS` | `140` | Tile slide animation duration (ms) |
| `POP_MS` | `110` | Merge pop animation duration (ms) |
| `LONG_PRESS_MS` | `220` | Long-press threshold for opposite-direction push |
| `TIME_TARGETS` | `[128, 256, 512, 1024, 2048]` | Tile values tracked for time attack |

## Cache Versioning

When updating cached assets, bump `CACHE_NAME` in `sw.js` so existing clients pick up the new version on next launch.

## License

(c) 2026. All rights reserved.

---

## 日本語

3D版2048パズル。3×3×3の立方体の中にタイルが配置され、6方向のいずれかにスライドさせて同じ数字を合体させていきます。PWAとして実装。

### 特徴

- **3×3×3グリッド** — 27マス、6方向、中心の1マスは内側に隠れる
- **面タップ操作** — 面をタップでそちら側へ寄せる、長押しで反対側へ
- **3D回転** — ドラッグで立方体を回転、ピンチで拡大縮小
- **分解表示** — スライダーでタイルの間隔を広げ、内側を確認
- **タイムアタック記録** — 128 / 256 / 512 / 1024 / 2048 への到達タイム
- **自動セーブ・再開** — セッション間で盤面を保持、バックグラウンド時はタイマー停止
- **オフライン動作** — PWAとして初回読み込み後はネット不要

### 技術スタック

- 素のJavaScript（フレームワーク不使用）
- [Three.js](https://threejs.org/) (r128) による3D描画
- オフラインキャッシュ用Service Worker
- localStorageによる記録・設定・中断ゲームの保存

### ローカル開発

ビルド工程はありません。任意の静的HTTPサーバーで動作します:

```bash
python3 -m http.server 8000
```

ブラウザで `http://localhost:8000` を開いてください。

> Service Workerは HTTPS または `localhost` が必要です。`file://` で直接開いた場合は登録されません。

### 設定

`index.html` 内の主要な定数は調整可能です（`GRID`, `SLIDE_MS`, `LONG_PRESS_MS` など）。詳細は英語版の表を参照。

### キャッシュのバージョン管理

キャッシュ対象のリソースを更新した際は、`sw.js` の `CACHE_NAME` の値を更新してください。次回起動時に新しいキャッシュが取得されます。
