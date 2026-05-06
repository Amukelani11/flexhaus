@echo off
taskkill /F /IM node.exe 2>nul
rd /s /q "c:\Users\i5\Downloads\flexhaus\node_modules" 2>nul
rd /s /q "c:\Users\i5\Downloads\flexhaus\variant-1\.next" 2>nul
rd /s /q "c:\Users\i5\Downloads\flexhaus\variant-2\.next" 2>nul
rd /s /q "c:\Users\i5\Downloads\flexhaus\variant-3\.next" 2>nul
rd /s /q "%LOCALAPPDATA%\npm-cache" 2>nul
echo Done. Free space:
for /f "tokens=3" %%a in ('dir c:\ ^| find "bytes free"') do echo %%a bytes free
