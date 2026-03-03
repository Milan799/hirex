@echo off
echo Pushing Frontend...
cd /d d:\HireX
git add .
git commit -m "Enhance UI error mapping, OTP flow, and fix Network Error intercepts"
git push

echo Pushing Backend...
cd /d d:\HireX_Server
git add .
git commit -m "Fix OTP reset flow with verifyResetToken and sanitize 500 API errors"
git push

echo Done!
