#!/bin/bash

echo "=============================================="
echo "       C0 TEAM FULL-STACK STARTER SUITE"
echo "=============================================="
echo ""

# Checking if backend virtual environment exists
if [ ! -d "backend/.venv" ]; then
    echo "[ERROR] Python Virtual environment not found in backend/.venv"
    echo "Please run the manual backend setup first."
    exit 1
fi

# Checking if frontend node_modules exists
if [ ! -d "frontend/node_modules" ]; then
    echo "[WARNING] Node modules not found in frontend/node_modules."
    echo "Running 'npm install' inside frontend directory first..."
    cd frontend && npm install && cd ..
fi

echo "Starting Django Backend on http://127.0.0.1:8000 ..."
(cd backend && source .venv/bin/activate && python manage.py runserver) &
BACKEND_PID=$!

echo "Starting React + Vite Frontend on http://localhost:5173 ..."
(cd frontend && npm run dev) &
FRONTEND_PID=$!

echo ""
echo "=============================================="
echo " Both services are running in the background!"
echo " Backend: http://127.0.0.1:8000"
echo " Frontend: http://localhost:5173"
echo " Admin panel: http://localhost:5173/admin-login (admin-admin)"
echo " Press Ctrl+C to stop both servers."
echo "=============================================="
echo ""

# Wait for Ctrl+C to stop both servers
trap "echo 'Stopping servers...'; kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait
