# RE:IDENTITY 現在地診断

Identity・Presence・Action の3領域を1〜10点で自己評価し、現在地を可視化する簡易診断アプリです。

- 12問（各領域4問）を回答 → 3ヶ月後の目標スコアを設定 → 結果を表示
- 結果画面: 領域別スコア、レーダーチャート、総合スコア、強み、優先テーマ、現在起きているズレ、プラン仮提案
- 採点はすべてクライアント側で実行。ログイン不要・外部データベースなし
- 本診断は心理検査・性格検査・医療的診断ではありません

## 技術構成

- Next.js (App Router) / TypeScript / Tailwind CSS / Recharts

## 開発

```bash
npm install
npm run dev    # http://localhost:3000
npm run build  # 本番ビルド
```

## 構成

```
app/
  page.tsx                # トップ（診断アプリ）
  diagnosis/
    DiagnosisApp.tsx      # 7ステップの状態管理
    lib/questions.ts      # 12問データ
    lib/scoring.ts        # 採点・強み・優先テーマ・ズレ・プラン提案ロジック
    components/           # 各ステップのUI
```
