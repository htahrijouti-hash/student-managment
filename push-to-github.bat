@echo off
cd /d "C:\Users\hamza\Desktop\prog C\app\student-management"

REM Ajouter le remote GitHub
git remote add origin https://github.com/htahrijouti-hash/student-managment.git

REM Renommer la branche en main
git branch -M main

REM Pousser le code
git push -u origin main

echo.
echo Push completed successfully!
pause
