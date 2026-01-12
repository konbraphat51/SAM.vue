# GitHub Pages Setup Instructions

## 手順 / Steps

### 1. GitHub Pages を有効にする / Enable GitHub Pages

1. リポジトリの Settings に移動 / Go to repository Settings
2. 左サイドバーの "Pages" をクリック / Click "Pages" in the left sidebar
3. "Source" セクションで:
   - **Branch**: `copilot/create-self-assessment-manikin-component` を選択
   - **Folder**: `/docs` を選択
   - "Save" をクリック

### 2. デモサイトの確認 / View Demo Site

数分後、以下のURLでデモサイトが利用可能になります:

https://konbraphat51.github.io/SAM.vue/

### 3. デモサイトの再ビルド / Rebuild Demo Site

デモサイトを更新したい場合:

```bash
pnpm run build:demo
git add docs/
git commit -m "Update demo site"
git push
```

## デモの内容 / Demo Contents

デモサイトには以下の3つの例が含まれています:

1. **全3軸（nine表示形式）** - Arousal, Valence, Dominance すべての軸を9つの画像で表示
2. **Valenceのみ（five表示形式）** - 1, 3, 5, 7, 9番目の画像のみ表示
3. **Arousal と Valence（nine表示形式）** - 2つの軸を表示

選択した値は画面下部に表示されます。

## 技術詳細 / Technical Details

- **ビルドツール**: Vite
- **出力先**: `docs/` フォルダ
- **ベースパス**: `/SAM.vue/`
- **画像**: すべてのSAM画像（arousal, valence, dominance）が `docs/images/` にコピーされます
- **`.nojekyll`**: Jekyll処理を無効化するために含まれています

## トラブルシューティング / Troubleshooting

### 画像が表示されない場合

`vite.config.demo.ts` のプラグインが自動的に画像をコピーします。手動でビルドする場合:

```bash
pnpm run build:demo
```

### GitHub Pages が404エラーを返す場合

1. Settings > Pages で正しいブランチとフォルダが選択されているか確認
2. `docs/.nojekyll` ファイルが存在するか確認
3. GitHub Actions が完了するまで数分待つ
