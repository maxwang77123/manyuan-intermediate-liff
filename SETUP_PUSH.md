# Stage 2 本機 push 指令 (你本機 gh 已登入, 不需新 token)

```bash
# 1. 建 private repo
gh repo create manyuan-intermediate-liff --private

# 2. 進入解壓後的資料夾
cd manyuan-intermediate-liff

# 3. init + push
git init
git add -A
git commit -m "Stage 2: Vite + React + LIFF + Sentry scaffold + 5 component (重寫 hospital-care-liff prototype)"
git branch -M main
git remote add origin https://github.com/maxwang77123/manyuan-intermediate-liff.git
git push -u origin main

# 4. 本機驗證跑得起來
npm install
npm run dev
# 開 http://localhost:3000 看派案列表 (2 筆 placeholder)
```
