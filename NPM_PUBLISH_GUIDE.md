# npm パッケージ公開手順 / npm Package Publishing Guide

## GitHub Actions を使用した自動公開 / Automated Publishing with GitHub Actions

GitHub Actions を使用して、タグをプッシュすると自動的に npm にパッケージを公開できます。

This package can be automatically published to npm when you push a version tag using GitHub Actions.

### 初期設定（一度だけ）/ Setup (One-time)

#### 1. npm アカウントの準備 / Prepare npm Account

npm アカウントをお持ちでない場合は、作成してください：
If you don't have an npm account, create one:

https://www.npmjs.com/signup

#### 2. npm アクセストークンの生成 / Generate npm Access Token

1. npm にログイン / Login to npm
2. https://www.npmjs.com/settings/[your-username]/tokens にアクセス
3. "Generate New Token" をクリック / Click "Generate New Token"
4. トークンタイプで "Automation" を選択 / Select "Automation" type
5. 生成されたトークンをコピー / Copy the generated token

#### 3. GitHub シークレットの設定 / Configure GitHub Secret

1. リポジトリの Settings に移動 / Go to repository Settings
2. "Secrets and variables" > "Actions" に移動 / Navigate to "Secrets and variables" > "Actions"
3. "New repository secret" をクリック / Click "New repository secret"
4. 以下のように設定 / Configure as follows:
   - **Name**: `NPM_TOKEN`
   - **Value**: 手順2でコピーした npm トークンを貼り付け / Paste your npm token from step 2
5. "Add secret" をクリック / Click "Add secret"

### 新しいバージョンの公開 / Publishing a New Version

#### 1. バージョンの更新 / Update Version

package.json のバージョンを更新します。npm version コマンドを使用すると、自動的にコミットとタグが作成されます。

Update the version in package.json. Using the npm version command will automatically create a commit and tag.

```bash
# パッチリリース（バグ修正）: 1.0.0 -> 1.0.1
# Patch release (bug fixes): 1.0.0 -> 1.0.1
npm version patch

# マイナーリリース（新機能、後方互換性あり）: 1.0.0 -> 1.1.0
# Minor release (new features, backward compatible): 1.0.0 -> 1.1.0
npm version minor

# メジャーリリース（破壊的変更）: 1.0.0 -> 2.0.0
# Major release (breaking changes): 1.0.0 -> 2.0.0
npm version major
```

#### 2. タグのプッシュ / Push Tags

バージョンコミットとタグをリポジトリにプッシュします：

Push the version commit and tag to the repository:

```bash
git push && git push --tags
```

#### 3. 自動公開の確認 / Verify Automatic Publishing

タグをプッシュすると、GitHub Actions が自動的に以下を実行します：

When you push a tag, GitHub Actions will automatically:

1. ✅ テストを実行 / Run tests
2. ✅ ライブラリをビルド / Build the library
3. ✅ npm に公開 / Publish to npm

リポジトリの "Actions" タブで進行状況を確認できます。

You can monitor the progress in the "Actions" tab of your repository.

### トラブルシューティング / Troubleshooting

#### 公開が失敗する場合 / If Publishing Fails

1. **NPM_TOKEN が正しく設定されているか確認**
   - リポジトリの Settings > Secrets and variables > Actions を確認
   - Check repository Settings > Secrets and variables > Actions

2. **npm トークンの権限を確認**
   - トークンタイプが "Automation" であることを確認
   - Verify token type is "Automation"

3. **パッケージ名が既に使用されている場合**
   - スコープ付きパッケージ名を使用: `@your-username/sam-vue`
   - Use scoped package name: `@your-username/sam-vue`
   - package.json の `name` フィールドを更新
   - Update the `name` field in package.json

4. **Actions ログを確認**
   - "Actions" タブで失敗したワークフローのログを確認
   - Check the failed workflow logs in the "Actions" tab

## 手動公開（代替方法）/ Manual Publishing (Alternative)

自動公開の代わりに、手動で公開することもできます：

You can also publish manually instead of using automatic publishing:

### 1. npm にログイン / Login to npm

```bash
npm login
```

### 2. ビルド / Build

```bash
pnpm run build
```

### 3. 公開 / Publish

```bash
npm publish
```

スコープ付きパッケージの場合：
For scoped packages:

```bash
npm publish --access public
```

## セマンティックバージョニング / Semantic Versioning

バージョン番号は `MAJOR.MINOR.PATCH` の形式に従います：

Version numbers follow the `MAJOR.MINOR.PATCH` format:

- **MAJOR (メジャー)**: 後方互換性のない変更 / Breaking changes
- **MINOR (マイナー)**: 後方互換性のある新機能 / New features (backward compatible)
- **PATCH (パッチ)**: 後方互換性のあるバグ修正 / Bug fixes (backward compatible)

例 / Examples:
- `1.0.0` -> `1.0.1`: バグ修正 / Bug fix
- `1.0.0` -> `1.1.0`: 新機能追加 / New feature
- `1.0.0` -> `2.0.0`: 破壊的変更 / Breaking change

## ワークフローファイル / Workflow File

自動公開は `.github/workflows/publish-npm.yml` で設定されています。

Automatic publishing is configured in `.github/workflows/publish-npm.yml`.

このワークフローは以下のトリガーで実行されます：
This workflow runs on the following trigger:

- `v*` パターンのタグがプッシュされたとき（例: `v1.0.0`, `v1.2.3`）
- When a tag matching the `v*` pattern is pushed (e.g., `v1.0.0`, `v1.2.3`)
