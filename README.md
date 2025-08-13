# 🔐 HonoX WebAuthn App 〜生体認証でセキュアログイン 💕〜

Hono と Honox を使った生体認証（WebAuthn）のサンプルアプリだよ〜✨  
指紋・顔認証・セキュリティキーでパスワードレスなログインができちゃう〜💕

## 🎯 特徴

- **🔐 WebAuthn 対応**: 指紋・顔認証・セキュリティキーでセキュアログイン
- **🏝️ Island Architecture**: Honox の Island コンポーネントで高速レンダリング
- **💬 ギャル語 UI**: めっちゃカワイイメッセージでユーザーフレンドリー
- **⚡ 高パフォーマンス**: Vite と Honox で爆速な開発体験
- **🎨 モダン UI**: グラデーション背景とガラスモーフィズムデザイン

## 🛠️ 技術スタック

- **[Hono](https://hono.dev/)**: 軽量で高速な Web フレームワーク
- **[HonoX](https://github.com/honojs/honox)**: Hono ベースのフルスタックメタフレームワーク
- **[SimpleWebAuthn](https://simplewebauthn.dev/)**: WebAuthn 実装ライブラリ
- **TypeScript**: 型安全な開発
- **Vite**: 高速ビルドツール

## 🚀 セットアップ

### 必要要件

- Node.js 18.0.0 以上
- npm または yarn

### インストール & 起動

```bash
# リポジトリをクローン
git clone https://github.com/username/webauthn_sample
cd webauthn_sample

# 依存関係をインストール
npm install

# 開発サーバー起動
npm run dev
```

サーバー起動後、 http://localhost:5173 にアクセスしてね〜✨

## 📱 使い方

### 1. 新規登録

1. 「ユーザー名を入れてね〜💕」にお好きな名前を入力
2. 「生体認証で登録しちゃう 🔐」ボタンをクリック
3. デバイスの生体認証（指紋・顔認証など）で登録完了〜

### 2. ログイン

1. 登録済みのユーザー名を入力
2. 「生体認証でログイン 🔐」ボタンをクリック
3. 生体認証でサクッとログイン完了〜💕

### 3. ブラウザ対応確認

ページを開くと自動で WebAuthn サポート状況を確認してくれるよ〜

## 🛣️ API エンドポイント

### WebAuthn 登録

#### `POST /api/webauthn/register/begin`

新規登録開始のエンドポイントだよ〜

**Request Body:**

```json
{
  "username": "あなたの名前〜"
}
```

**Response:**

```json
{
  "challenge": "チャレンジ文字列",
  "rp": { "name": "HonoX WebAuthn App", "id": "localhost" },
  "user": { "id": "ユーザーID", "name": "ユーザー名", "displayName": "表示名" },
  "pubKeyCredParams": [...],
  "authenticatorSelection": { ... },
  "timeout": 60000,
  "attestation": "none"
}
```

**Error Response:**

```json
{
  "error": "ユーザー名が必要だよ〜💦"
}
```

#### `POST /api/webauthn/register/complete`

新規登録完了のエンドポイントだよ〜

**Request Body:**

```json
{
  "username": "あなたの名前〜",
  "credential": { ... }
}
```

**Response:**

```json
{
  "verified": true,
  "message": "登録成功だよ〜✨"
}
```

### WebAuthn 認証

#### `POST /api/webauthn/authenticate/begin`

認証開始のエンドポイントだよ〜

**Request Body:**

```json
{
  "username": "あなたの名前〜"
}
```

**Response:**

```json
{
  "challenge": "チャレンジ文字列",
  "allowCredentials": [...],
  "timeout": 60000,
  "userVerification": "preferred"
}
```

**Error Response:**

```json
{
  "error": "ユーザーが見つからないよ〜💦"
}
```

#### `POST /api/webauthn/authenticate/complete`

認証完了のエンドポイントだよ〜

**Request Body:**

```json
{
  "username": "あなたの名前〜",
  "credential": { ... }
}
```

**Response:**

```json
{
  "verified": true,
  "message": "認証成功だよ〜✨"
}
```

## 📁 プロジェクト構成

```
webauthn_sample/
├── app/
│   ├── client.ts                          # Islandハイドレーション用エントリーポイント
│   ├── server.ts                          # Honoxサーバー
│   ├── routes/
│   │   ├── _renderer.tsx                  # HTMLレンダラー（共通レイアウト）
│   │   ├── index.tsx                      # メインページ
│   │   └── api/webauthn/                  # WebAuthn API
│   │       ├── register/
│   │       │   ├── begin.ts               # 登録開始API
│   │       │   └── complete.ts            # 登録完了API
│   │       └── authenticate/
│   │           ├── begin.ts               # 認証開始API
│   │           └── complete.ts            # 認証完了API
│   └── islands/                           # Islandコンポーネント
│       ├── RegistrationForm.tsx           # 登録フォーム
│       ├── AuthenticationForm.tsx         # 認証フォーム
│       └── BrowserSupport.tsx             # ブラウザサポート確認
├── package.json                           # 依存関係とスクリプト
├── vite.config.ts                         # Vite設定
├── tsconfig.json                          # TypeScript設定
└── README.md                              # このファイル
```

## 🎨 Island Architecture

このアプリは Honox の Island Architecture を使って最適化されてるよ〜✨

- **サーバーサイドレンダリング**: 初期表示が爆速
- **部分的ハイドレーション**: 必要な部分だけクライアントサイドで動作
- **パフォーマンス最適化**: バンドルサイズを最小限に抑制

### Islands（対話的コンポーネント）

1. **RegistrationForm**: 新規登録フォーム

   - ユーザー名入力
   - WebAuthn 登録処理
   - リアルタイムステータス表示

2. **AuthenticationForm**: 認証フォーム

   - ユーザー名入力
   - WebAuthn 認証処理
   - リアルタイムステータス表示

3. **BrowserSupport**: ブラウザサポート確認
   - WebAuthn 対応状況の自動チェック
   - 対応状況の表示

## 🔒 セキュリティ機能

- **WebAuthn 標準準拠**: FIDO2/WebAuthn 仕様に完全対応
- **生体認証サポート**: 指紋・顔認証・虹彩認証
- **セキュリティキー対応**: YubiKey などのハードウェアキー
- **フィッシング耐性**: オリジン検証による高度なセキュリティ
- **パスワードレス**: パスワード漏洩のリスクゼロ

## 🌐 対応ブラウザ

- **Chrome/Edge**: 67 以上
- **Firefox**: 60 以上
- **Safari**: 14 以上
- **Chrome Mobile**: 67 以上
- **Safari Mobile**: 14 以上

## 📝 開発コマンド

```bash
# 開発サーバー起動
npm run dev

# 本番ビルド
npm run build

# 本番サーバー起動（ビルド後）
npm run preview
```

## 🤝 コントリビューション

PR や Issue はいつでもウェルカムだよ〜💕

1. このリポジトリをフォーク
2. フィーチャーブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add some amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. Pull Request を作成

## 📄 ライセンス

MIT License - 詳細は [LICENSE](LICENSE) ファイルを確認してね〜

## 💝 謝辞

- [Hono](https://hono.dev/) - 素晴らしい Web フレームワーク
- [HonoX](https://github.com/honojs/honox) - 最高のメタフレームワーク
- [SimpleWebAuthn](https://simplewebauthn.dev/) - WebAuthn 実装の救世主
- [WebAuthn.guide](https://webauthn.guide/) - WebAuthn の学習リソース

---

### 💕 作成者より

パスワードレスな未来を一緒に作っていこうね〜✨  
生体認証でもっとセキュアで便利な Web を実現しよう 💪

何か質問があったら気軽に Issue を立ててね〜😊
