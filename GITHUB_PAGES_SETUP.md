# GitHub Pages Setup Instructions

## 自動デプロイ / Automatic Deployment

このプロジェクトは GitHub Actions を使用して、`main` または `master` ブランチへのプッシュ時に自動的に GitHub Pages にデプロイされます。

This project uses GitHub Actions to automatically deploy to GitHub Pages when pushing to the `main` or `master` branch.

## 手順 / Steps

### 1. GitHub Pages を有効にする / Enable GitHub Pages

1. リポジトリの Settings に移動 / Go to repository Settings
2. 左サイドバーの "Pages" をクリック / Click "Pages" in the left sidebar
3. "Source" セクションで:
   - **Source**: `GitHub Actions` を選択 / Select `GitHub Actions`
   - **注意**: ブランチやフォルダを選択する必要はありません / No need to select branch or folder

### 2. デモサイトの確認 / View Demo Site

`main` または `master` ブランチにプッシュ後、GitHub Actions が自動的にデモサイトをビルド・デプロイします。
数分後、以下のURLでデモサイトが利用可能になります:

After pushing to `main` or `master` branch, GitHub Actions will automatically build and deploy the demo site.
After a few minutes, the demo site will be available at:

https://konbraphat51.github.io/SAM.vue/

### 3. デプロイ状況の確認 / Check Deployment Status

リポジトリの "Actions" タブで、デプロイの進行状況を確認できます。

You can check the deployment progress in the "Actions" tab of the repository.

### 4. 手動デプロイ / Manual Deployment

必要に応じて、GitHub の Actions タブから "Deploy to GitHub Pages" ワークフローを手動で実行することもできます。

If needed, you can manually trigger the "Deploy to GitHub Pages" workflow from the Actions tab on GitHub.

### 5. ローカルでのデモビルド / Build Demo Locally

ローカルでデモサイトをビルドしてプレビューする場合:

To build and preview the demo site locally:

```bash
# デモをビルド / Build demo
pnpm run build:demo

# ビルドされたファイルは docs/ フォルダに出力されます
# Built files will be in the docs/ folder

# プレビュー / Preview
pnpm run preview
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
