@echo off
set PORT=3000
set BASE_PATH=/
cd /d %~dp0
node ..\..\node_modules\.pnpm\vite@7.3.6_@types+node@25.9_62902a90fc8e8c73dbdcba8cca17318c\node_modules\vite\bin\vite.js preview --config vite.config.ts