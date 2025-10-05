@echo off
title ExoVet - Starting Application
color 0A

echo ========================================
echo    ExoVet - Exoplanet Vetting Assistant
echo ========================================
echo.

echo [1/3] Checking Node.js installation...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)
echo ✓ Node.js is installed

echo.
echo [2/3] Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)
echo ✓ Dependencies installed

echo.
echo [3/3] Starting servers...
echo.
echo Starting Backend Server (Port 5000)...
start "ExoVet Backend" cmd /k "cd /d %~dp0 && echo Backend Server Starting... && node server.js"

echo Waiting for backend to initialize...
timeout /t 5 /nobreak >nul

echo Starting Frontend Server (Port 3000)...
start "ExoVet Frontend" cmd /k "cd /d %~dp0 && echo Frontend Server Starting... && npm start"

echo.
echo ========================================
echo    Application Started Successfully!
echo ========================================
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo The application will open in your browser automatically.
echo Close this window to stop the application.
echo.
echo Press any key to close this window...
pause >nul
