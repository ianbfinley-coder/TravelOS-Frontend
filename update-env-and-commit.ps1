# Firebase Environment Variables Update Script
# This script updates .env and commits changes to git

Write-Host "🔧 TravelOS Firebase Setup - Final Steps" -ForegroundColor Cyan
Write-Host ""

# Change to frontend directory
$frontendPath = "C:\Users\ianbf\Documents\travelos-frontend"
Set-Location $frontendPath
Write-Host "✅ Working directory: $frontendPath"

# Update .env file with Firebase credentials
Write-Host ""
Write-Host "📝 Updating .env file..." -ForegroundColor Yellow

$envContent = @"
VITE_API_URL=http://localhost:3000/api
VITE_BACKEND_URL=http://localhost:3000

# Firebase Configuration
VITE_FIREBASE_API_KEY=AIzaSyAcuBzXQzKiz_GUpKSbLH4dsKCf46v-OGQ
VITE_FIREBASE_AUTH_DOMAIN=travelos-9f482.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=travelos-9f482
VITE_FIREBASE_STORAGE_BUCKET=travelos-9f482.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=291177331016
VITE_FIREBASE_APP_ID=1:291177331016:web:705f5315855da513351b7d
"@

Set-Content -Path ".env" -Value $envContent
Write-Host "✅ .env file updated with Firebase credentials"

# Install Firebase dependency
Write-Host ""
Write-Host "📦 Installing Firebase package..." -ForegroundColor Yellow
npm install firebase

# Stage all changes
Write-Host ""
Write-Host "📝 Staging changes for commit..." -ForegroundColor Yellow
git add .

# Commit changes with fixed message
Write-Host "📝 Committing changes..." -ForegroundColor Yellow
$commitMessage = @"
Add Firebase OAuth authentication (Google and Apple Sign-In)

- Integrated Firebase Authentication into React frontend
- Added Google Sign-In component with OAuth popup
- Added Apple Sign-In component with Safari detection
- Created authentication context for global state management
- Updated App.jsx to use AuthProvider
- Integrated OAuth buttons into LoginPage
- Added Firebase configuration via environment variables
- Includes professional styling and error handling
- Full backend integration ready for token verification

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>
"@

git commit -m $commitMessage

# Push to GitHub
Write-Host ""
Write-Host "🚀 Pushing to GitHub..." -ForegroundColor Yellow
git push origin main

Write-Host ""
Write-Host "✅ All done! Firebase authentication is now integrated." -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Deploy to Vercel (should auto-deploy from GitHub push)"
Write-Host "2. Set environment variables in Vercel dashboard"
Write-Host "3. Test OAuth sign-in flow in production"
Write-Host "4. Integrate Firebase token verification on backend"
