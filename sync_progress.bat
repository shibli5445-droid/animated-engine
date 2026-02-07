@echo off
echo Syncing your work to GitHub...
git add .
set /p commit_msg="Enter a description of your changes (optional, press Enter for default): "
if "%commit_msg%"=="" set commit_msg="Update progress"
git commit -m "%commit_msg%"
git push
echo.
echo Done! Your changes are live on GitHub and Vercel will update shortly.
pause
