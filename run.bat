@echo off
title C0 Team Starter Suite
echo ==============================================
echo        C0 TEAM FULL-STACK STARTER SUITE
echo ==============================================
echo.

:: Checking if backend virtual environment exists
if not exist "backend\.venv\" (
    echo [ERROR] Python Virtual environment not found in backend\.venv
    echo Please make sure the backend is set up properly.
    pause
    exit /b
)

:: Checking if frontend node_modules exists
if not exist "frontend\node_modules\" (
    echo [WARNING] Node modules not found in frontend\node_modules.
    echo Running 'npm install' inside frontend directory first...
    cd frontend && npm install && cd ..
)

echo Starting Django Backend on http://127.0.0.1:8000 ...
start "C0 Team - Django Backend" cmd /k "cd backend && .venv\Scripts\python manage.py runserver"

echo Starting React + Vite Frontend on http://localhost:5173 ...
start "C0 Team - Vite Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo ==============================================
echo  Both services are launching in separate windows!
echo  Backend: http://127.0.0.1:8000
echo  Frontend: http://localhost:5173
echo ==============================================
echo.
pause
