@echo off
echo ==========================================
echo   Pushing Poker AI to GitHub
echo ==========================================
echo.

:: Check if git is installed
where git >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Git is not installed or not in your PATH.
    echo Please install Git from https://git-scm.com/downloads
    echo and try again.
    pause
    exit /b
)

:: Initialize Git if not exists
if not exist ".git" (
    echo [INFO] Initializing Git repository...
    git init
)

:: Add all files
echo [INFO] Adding files...
git add .

:: Commit
echo [INFO] Committing files...
git commit -m "Initial commit"

:: Rename branch to main
git branch -M main

:: Add remote
echo [INFO] Adding remote origin...
git remote remove origin 2>nul
git remote add origin https://github.com/yvonnegongyy-spec/YYNate.git

:: Push
echo [INFO] Pushing to GitHub...
git push -u origin main

if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Push failed. 
    echo If the remote repo is not empty, try running:
    echo git pull origin main --allow-unrelated-histories
    echo followed by this script again.
) else (
    echo.
    echo [SUCCESS] Code pushed successfully!
)

echo.
pause
