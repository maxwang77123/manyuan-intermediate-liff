# manyuan-intermediate-liff (居間看護 LIFF)

新版居間看護 LIFF, 重寫舊 hospital-care-liff (Vercel CRA prototype).

## Stack
- Vite + React 18 + TypeScript
- @line/liff (LIFF SDK)
- @sentry/react (Stage 3 啟用)
- react-router-dom

## 部署
- Cloud Run (manyuan-bq-prep, asia-east1) — Stage 3
- LIFF ID `2009128968-3VXsvrAB` (LINE Developers manyuan_admin → 醫院看護 → LIFF)

## 開發
```
npm install
cp .env.example .env
npm run dev
```

## 階段
- Stage 1 ✓ BQ intermediate_dataset 4 表已建
- Stage 2 ✓ 本 repo (Vite + 5 component + LIFF init + Sentry 框架)
- Stage 3 ⏳ Cloud Run deploy + BQ backend API + LINE Login → person_id 對應
- Stage 4 ⏳ manyuan-hr-webapp 派案後台 UI
- Stage 5 ⏳ fact_intermediate_dispatch 派定台帳 + 財務

## BQ schema
intermediate_dataset:
- dim_label (label 主檔, REGION/HOSPITAL/SKILL/SHIFT)
- dim_intermediate_carer (PK person_id UUID, labels ARRAY)
- fact_intermediate_dispatch_pool (案件池)
- fact_intermediate_dispatch_assignment (指派+接案)

## Matching
B 全包含優先 (看護 labels ⊇ 案子 labels), fallback A 任一交集
