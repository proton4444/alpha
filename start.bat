@echo off
REM ============================================================================
REM BMAD METHOD - Initialization and Update Script
REM ============================================================================
REM This script checks for updates from the BMAD-METHOD repository,
REM pulls the latest changes, initializes the method, and provides a report.
REM ============================================================================

setlocal enabledelayedexpansion
cd /d "%~dp0"

REM Set colors for output
set "GREEN=[92m"
set "RED=[91m"
set "YELLOW=[93m"
set "BLUE=[94m"
set "RESET=[0m"
set "INFO_PREFIX=[*]"
set "SUCCESS_PREFIX=[✓]"
set "ERROR_PREFIX=[✗]"
set "WARN_PREFIX=[!]"

REM Log file setup
set "TIMESTAMP=%date:~-4%%date:~-10,2%%date:~-7,2%_%time:~0,2%%time:~3,2%%time:~6,2%"
set "LOG_FILE=.bmad\logs\start_%TIMESTAMP%.log"

REM Create logs directory if it doesn't exist
if not exist ".bmad\logs" mkdir ".bmad\logs"

echo. >> "%LOG_FILE%"
echo ============================================================================ >> "%LOG_FILE%"
echo BMAD METHOD - Initialization Report >> "%LOG_FILE%"
echo Started: %date% %time% >> "%LOG_FILE%"
echo ============================================================================ >> "%LOG_FILE%"

cls
echo.
echo %BLUE%============================================================================%RESET%
echo %BLUE%   BMAD METHOD - Initialization and Update Script%RESET%
echo %BLUE%============================================================================%RESET%
echo.

REM ============================================================================
REM Section 1: Git Repository Setup Check
REM ============================================================================
echo %INFO_PREFIX% Checking git repository status...
echo. >> "%LOG_FILE%"
echo --- Git Repository Check --- >> "%LOG_FILE%"

git rev-parse --git-dir >nul 2>&1
if errorlevel 1 (
    echo %WARN_PREFIX% Not a git repository. Initializing as git repository...
    echo Not a git repository. Initializing... >> "%LOG_FILE%"
    git init >> "%LOG_FILE%" 2>&1
    git remote add origin https://github.com/bmad-code-org/BMAD-METHOD >> "%LOG_FILE%" 2>&1
    if errorlevel 1 (
        echo %ERROR_PREFIX% Failed to initialize git repository >> "%LOG_FILE%"
    ) else (
        echo %SUCCESS_PREFIX% Git repository initialized successfully >> "%LOG_FILE%"
    )
) else (
    echo %SUCCESS_PREFIX% Already a git repository >> "%LOG_FILE%"
)

echo.

REM ============================================================================
REM Section 2: Check Remote Repository
REM ============================================================================
echo %INFO_PREFIX% Checking remote repository access...
echo. >> "%LOG_FILE%"
echo --- Remote Repository Check --- >> "%LOG_FILE%"

git remote get-url origin >nul 2>&1
if errorlevel 1 (
    echo %WARN_PREFIX% Remote 'origin' not found. Adding remote...
    echo Remote not found. Adding... >> "%LOG_FILE%"
    git remote add origin https://github.com/bmad-code-org/BMAD-METHOD >> "%LOG_FILE%" 2>&1
) else (
    for /f "tokens=*" %%i in ('git remote get-url origin') do set "CURRENT_REMOTE=%%i"
    echo %SUCCESS_PREFIX% Remote origin: %CURRENT_REMOTE% >> "%LOG_FILE%"
)

echo.

REM ============================================================================
REM Section 3: Fetch Latest Updates
REM ============================================================================
echo %INFO_PREFIX% Fetching latest updates from remote repository...
echo. >> "%LOG_FILE%"
echo --- Fetching Updates --- >> "%LOG_FILE%"

git fetch origin main >> "%LOG_FILE%" 2>&1
if errorlevel 1 (
    echo %WARN_PREFIX% Could not fetch from 'main' branch. Trying 'master'...
    echo Fetch failed, trying master branch >> "%LOG_FILE%"
    git fetch origin master >> "%LOG_FILE%" 2>&1
    if errorlevel 1 (
        echo %ERROR_PREFIX% Failed to fetch from remote repository >> "%LOG_FILE%"
        echo %ERROR_PREFIX% Please check your internet connection and repository access
        goto skip_pull
    )
    set "DEFAULT_BRANCH=master"
) else (
    set "DEFAULT_BRANCH=main"
)

echo %SUCCESS_PREFIX% Successfully fetched updates from %DEFAULT_BRANCH% branch >> "%LOG_FILE%"
echo.

REM ============================================================================
REM Section 4: Check for Local Changes
REM ============================================================================
echo %INFO_PREFIX% Checking for local changes...
echo. >> "%LOG_FILE%"
echo --- Local Changes Check --- >> "%LOG_FILE%"

git diff --quiet
set "HAS_UNSTAGED=!errorlevel!"
git diff --quiet --cached
set "HAS_STAGED=!errorlevel!"

if !HAS_UNSTAGED! equ 1 (
    echo %WARN_PREFIX% Found unstaged changes >> "%LOG_FILE%"
    echo Unstaged changes detected >> "%LOG_FILE%"
) else (
    echo %SUCCESS_PREFIX% No unstaged changes >> "%LOG_FILE%"
)

if !HAS_STAGED! equ 1 (
    echo %WARN_PREFIX% Found staged changes >> "%LOG_FILE%"
    echo Staged changes detected >> "%LOG_FILE%"
) else (
    echo %SUCCESS_PREFIX% No staged changes >> "%LOG_FILE%"
)

echo.

REM ============================================================================
REM Section 5: Pull Latest Changes
REM ============================================================================
echo %INFO_PREFIX% Pulling latest changes...
echo. >> "%LOG_FILE%"
echo --- Pulling Changes --- >> "%LOG_FILE%"

:skip_pull

if defined DEFAULT_BRANCH (
    git pull origin %DEFAULT_BRANCH% >> "%LOG_FILE%" 2>&1
    if errorlevel 1 (
        echo %WARN_PREFIX% Pull completed with some issues. Check logs for details.
        echo Pull encountered issues >> "%LOG_FILE%"
    ) else (
        echo %SUCCESS_PREFIX% Successfully pulled latest changes >> "%LOG_FILE%"
    )
) else (
    echo %WARN_PREFIX% Skipping pull due to previous fetch errors >> "%LOG_FILE%"
)

echo.

REM ============================================================================
REM Section 6: Verify Directory Structure
REM ============================================================================
echo %INFO_PREFIX% Verifying BMAD directory structure...
echo. >> "%LOG_FILE%"
echo --- Directory Structure Verification --- >> "%LOG_FILE%"

if not exist ".bmad" (
    echo %WARN_PREFIX% .bmad directory not found. Creating...
    mkdir .bmad >> "%LOG_FILE%" 2>&1
    echo .bmad directory created >> "%LOG_FILE%"
) else (
    echo %SUCCESS_PREFIX% .bmad directory exists >> "%LOG_FILE%"
)

if not exist "projects" (
    echo %WARN_PREFIX% projects directory not found. Creating...
    mkdir projects >> "%LOG_FILE%" 2>&1
    echo projects directory created >> "%LOG_FILE%"
) else (
    echo %SUCCESS_PREFIX% projects directory exists >> "%LOG_FILE%"
)

if not exist "docs" (
    echo %WARN_PREFIX% docs directory not found. Creating...
    mkdir docs >> "%LOG_FILE%" 2>&1
    echo docs directory created >> "%LOG_FILE%"
) else (
    echo %SUCCESS_PREFIX% docs directory exists >> "%LOG_FILE%"
)

echo.

REM ============================================================================
REM Section 7: Verify Project Repository Separation
REM ============================================================================
echo %INFO_PREFIX% Verifying project repository separation...
echo. >> "%LOG_FILE%"
echo --- Project Repository Separation Check --- >> "%LOG_FILE%"

REM Check if alpha project has its own git repo
if exist "projects\alpha\.git" (
    echo %SUCCESS_PREFIX% Alpha project has separate git repository >> "%LOG_FILE%"
    cd /d projects\alpha
    for /f "tokens=*" %%i in ('git remote get-url origin 2^>nul') do set "ALPHA_REMOTE=%%i"
    cd /d "%~dp0"
    if defined ALPHA_REMOTE (
        echo %SUCCESS_PREFIX% Alpha remote: !ALPHA_REMOTE! >> "%LOG_FILE%"
    ) else (
        echo %WARN_PREFIX% Alpha project has no remote configured >> "%LOG_FILE%"
        echo %INFO_PREFIX% Configure with: cd projects\alpha ^&^& git remote add origin [your-repo-url] >> "%LOG_FILE%"
    )
) else (
    echo %WARN_PREFIX% Alpha project git repo not found. Initializing... >> "%LOG_FILE%"
    if not exist "projects\alpha" mkdir "projects\alpha"
    cd /d projects\alpha
    git init >> "%LOG_FILE%" 2>&1
    cd /d "%~dp0"
    echo %INFO_PREFIX% Alpha project initialized. Configure remote with: cd projects\alpha ^&^& git remote add origin [your-repo-url] >> "%LOG_FILE%"
)

echo %INFO_PREFIX% IMPORTANT: Alpha project and BMAD Method are in separate repositories >> "%LOG_FILE%"
echo %INFO_PREFIX% - BMAD Method repo: https://github.com/bmad-code-org/BMAD-METHOD >> "%LOG_FILE%"
echo %INFO_PREFIX% - Alpha project repo: [Configure your own] >> "%LOG_FILE%"

echo.

REM ============================================================================
REM Section 8: Initialize MCP Servers
REM ============================================================================
echo %INFO_PREFIX% Initializing MCP servers...
echo. >> "%LOG_FILE%"
echo --- MCP Initialization --- >> "%LOG_FILE%"

python ".\.claude\mcp-init.py" >> "%LOG_FILE%" 2>&1
if errorlevel 1 (
    echo %WARN_PREFIX% MCP initialization completed with errors >> "%LOG_FILE%"
) else (
    echo %SUCCESS_PREFIX% MCP servers initialized successfully >> "%LOG_FILE%"
)

echo.

REM ============================================================================
REM Section 9: Get Git Status Information
REM ============================================================================
echo %INFO_PREFIX% Gathering git status information...
echo. >> "%LOG_FILE%"
echo --- Git Status Information --- >> "%LOG_FILE%"

for /f "tokens=*" %%i in ('git rev-parse --short HEAD') do set "CURRENT_COMMIT=%%i"
for /f "tokens=*" %%i in ('git rev-parse --abbrev-ref HEAD') do set "CURRENT_BRANCH=%%i"
for /f "tokens=*" %%i in ('git log -1 --pretty=format:%%s') do set "LAST_COMMIT_MSG=%%i"

echo Current Branch: %CURRENT_BRANCH% >> "%LOG_FILE%"
echo Current Commit: %CURRENT_COMMIT% >> "%LOG_FILE%"
echo Last Commit: %LAST_COMMIT_MSG% >> "%LOG_FILE%"

echo %SUCCESS_PREFIX% Branch: %CURRENT_BRANCH% >> "%LOG_FILE%"
echo %SUCCESS_PREFIX% Commit: %CURRENT_COMMIT% >> "%LOG_FILE%"

echo.

REM ============================================================================
REM Section 10: Generate Final Report
REM ============================================================================
echo %BLUE%============================================================================%RESET%
echo %BLUE%   INITIALIZATION REPORT%RESET%
echo %BLUE%============================================================================%RESET%
echo.
echo %SUCCESS_PREFIX% BMAD Method Initialization Complete
echo %INFO_PREFIX% Current Working Directory: %cd%
echo %INFO_PREFIX% Current Branch: %CURRENT_BRANCH%
echo %INFO_PREFIX% Current Commit: %CURRENT_COMMIT%
echo %INFO_PREFIX% Log File: %LOG_FILE%
echo.
echo %BLUE%============================================================================%RESET%
echo.

REM Append report to log file
echo. >> "%LOG_FILE%"
echo ============================================================================ >> "%LOG_FILE%"
echo INITIALIZATION REPORT >> "%LOG_FILE%"
echo ============================================================================ >> "%LOG_FILE%"
echo. >> "%LOG_FILE%"
echo Current Working Directory: %cd% >> "%LOG_FILE%"
echo Current Branch: %CURRENT_BRANCH% >> "%LOG_FILE%"
echo Current Commit: %CURRENT_COMMIT% >> "%LOG_FILE%"
echo Last Commit Message: %LAST_COMMIT_MSG% >> "%LOG_FILE%"
echo Timestamp: %date% %time% >> "%LOG_FILE%"
echo. >> "%LOG_FILE%"
echo ============================================================================ >> "%LOG_FILE%"

echo %SUCCESS_PREFIX% Detailed report saved to: %LOG_FILE%

REM ============================================================================
REM Completion
REM ============================================================================
echo.
echo %GREEN%Ready to use BMAD Method!%RESET%
echo.

endlocal
pause
