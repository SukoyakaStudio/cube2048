# Cube 2048 - PWA配布キット

3D版2048パズルのPWA一式です。このディレクトリ全体をHTTPSで公開すれば、PWAとして動作します。

## ファイル構成

```
cube2048/
├── index.html              # ゲーム本体
├── manifest.json           # PWAメタ情報
├── sw.js                   # Service Worker (オフライン対応)
├── privacy.html            # プライバシーポリシー (日英)
├── icons/
│   ├── icon-192.png        # ホーム画面アイコン用
│   ├── icon-512.png        # 高解像度アイコン
│   └── icon-maskable-512.png  # Android Adaptive Icon用
├── generate_icons.py       # アイコン再生成スクリプト
└── README.md               # このファイル
```

## ここから先のステップ

### ステップ1: HTTPSで公開する

無料の選択肢:

- **GitHub Pages**: GitHubリポジトリを作って、このディレクトリの中身をpush。Settings > Pages で公開設定。`https://USERNAME.github.io/REPO/` で公開される。
- **Cloudflare Pages**: GitHubリポジトリと連携、自動デプロイ。独自ドメインも無料で接続可能。
- **Vercel / Netlify**: 同上。GitHubとの連携が簡単。

公開後、ブラウザで開いて以下を確認:
- ゲームが正常に動作する
- F12 (開発者ツール) > Application > Service Workers で `sw.js` がactivateされている
- F12 > Application > Manifest が表示される

### ステップ2: Lighthouse監査でPWA品質を確認

Google Chromeで公開URLを開き、F12 > Lighthouse > "Progressive Web App" にチェックして "Analyze page load"。
TWA化には Performance 80点以上 と PWA要件クリアが必要。

### ステップ3: Bubblewrapでアプリ化

Node.js (v14以上推奨) をインストールした環境で:

```bash
npm install -g @bubblewrap/cli

# 公開したPWAのmanifest URLを指定して初期化
bubblewrap init --manifest=https://YOUR-DOMAIN/manifest.json

# 質問に答える (アプリID, 署名キー等)。署名キーは絶対に紛失しないこと。
# 紛失するとアプリの更新ができなくなる。

# AAB (Android App Bundle) を生成
bubblewrap build
```

### ステップ4: Digital Asset Links を設定

Bubblewrap が出力する `assetlinks.json` を、公開ドメインの以下のパスに配置:

```
https://YOUR-DOMAIN/.well-known/assetlinks.json
```

これがないと、アプリ起動時にアドレスバーが消えず、TWAではなくCustom Tabになってしまう。

### ステップ5: Google Play Console で公開

- 開発者アカウント登録 ($25 一度きり)
- 新規アプリ作成 → 内部テスト → 製品版
- アップロード対象: `app-release-bundle.aab`
- 必要な素材:
  - アプリアイコン 512x512 PNG
  - フィーチャーグラフィック 1024x500 PNG/JPG
  - スクリーンショット 最低2枚 (端末で撮影)
  - 短い説明 (80文字以内)
  - 詳細な説明
  - プライバシーポリシーURL → 公開した `privacy.html` のURLを指定
- コンテンツレーティング質問票
- データセーフティ: 「データ収集なし」「データ共有なし」を選択

審査は通常1〜3日。

## アイコンの再生成

仮アイコンを差し替えたい場合は `generate_icons.py` を編集して `python3 generate_icons.py` を実行。
別途デザインしたPNGを `icons/` 配下に同名で置くだけでもOK。

## 開発者向けメモ

- ゲームのグリッド数は `index.html` 中の `const GRID = 3;` で変更可能 (2〜5あたりが現実的)。
- アニメーション速度は `SLIDE_MS` `POP_MS` `SPAWN_MS` で調整。
- 長押し閾値は `LONG_PRESS_MS` で調整。
- Service Workerを更新したら `CACHE_NAME = 'cube2048-v1'` のバージョン番号を上げる必要がある。
