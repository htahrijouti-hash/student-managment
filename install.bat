@echo off
cd /d "C:\Users\hamza\Desktop\prog C\app\student-management"
if exist node_modules (
    rmdir /s /q node_modules
)
call npm install
pause
