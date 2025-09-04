@echo off
echo ========================================
echo    Sistema HelpDesk - Inicializacao
echo ========================================
echo.

echo [1/3] Iniciando Backend ASP.NET Core...
cd ProjetoHelpDesk
start "Backend HelpDesk" cmd /k "dotnet run"
echo Backend iniciado em https://localhost:7137
echo.

echo [2/3] Aguardando 5 segundos para o backend inicializar...
timeout /t 5 /nobreak >nul
echo.

echo [3/3] Iniciando Frontend React...
cd ..\frontend
start "Frontend HelpDesk" cmd /k "npm start"
echo Frontend iniciado em http://localhost:3000
echo.

echo ========================================
echo    Projeto iniciado com sucesso!
echo    Backend: https://localhost:7137
echo    Frontend: http://localhost:3000
echo ========================================
pause
