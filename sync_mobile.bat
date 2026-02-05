@echo off
echo ==========================================
echo   Syncing to Mobile (Android/iOS)
echo ==========================================
echo.

echo [1/2] Building Web Config...
call npm.cmd run build
if %errorlevel% neq 0 (
    echo [ERROR] Web build failed!
    pause
    exit /b
)

echo.
echo [2/2] Syncing to Capacitor...
call node "node_modules\@capacitor\cli\bin\capacitor" sync
if %errorlevel% neq 0 (
    echo [ERROR] Capacitor sync failed!
    pause
    exit /b
)

echo.
echo [SUCCESS] Mobile projects updated!
echo You can now run:
echo - Android: npx cap open android
echo - iOS (Mac only): npx cap open ios
echo.
pause
