@echo off
REM UniTech Blockly Editor Setup Script for Windows

echo Setting up UniTech Blockly Editor...
echo.

REM Create directory structure
echo Creating directory structure...
if not exist "src\components" mkdir src\components

REM Check if package.json exists
if exist "package.json" (
    echo Warning: package.json already exists. Skipping file creation.
    echo Run 'npm install' to install dependencies.
) else (
    echo Directory structure created!
    echo.
    echo Next steps:
    echo 1. Copy all the provided files to their respective locations
    echo 2. Run: npm install
    echo 3. Run: npm run dev
    echo.
    echo The editor will be available at http://localhost:3000
)

echo.
echo Happy coding with UniTech!
pause