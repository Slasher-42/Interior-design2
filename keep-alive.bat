@echo off
setlocal

set CORE_URL=https://interior-design2-jmo2.onrender.com/api/site-background-video
set AI_URL=https://ai-service-9xkq.onrender.com/health
set INTERVAL_SECONDS=600

:loop
echo [%date% %time%] Pinging core-service...
curl -s -o nul -w "core-service: %%{http_code}\n" "%CORE_URL%"

echo [%date% %time%] Pinging ai-service...
curl -s -o nul -w "ai-service: %%{http_code}\n" "%AI_URL%"

timeout /t %INTERVAL_SECONDS% /nobreak >nul
goto loop
