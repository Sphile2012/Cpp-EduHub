@echo off
echo Starting Backend API Server...
cd artifacts\api-server
set PORT=3000
set NODE_ENV=development
node -r esbuild-register src/index.ts
pause
