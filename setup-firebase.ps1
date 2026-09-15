cd "C:\Users\ianbf\Documents\travelos-frontend"

Write-Host "Updating .env..."
$env_content = @"
VITE_API_URL=http://localhost:3000/api
VITE_BACKEND_URL=http://localhost:3000
VITE_FIREBASE_API_KEY=AIzaSyAcuBzXQzKiz_GUpKSbLH4dsKCf46v-OGQ
VITE_FIREBASE_AUTH_DOMAIN=travelos-9f482.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=travelos-9f482
VITE_FIREBASE_STORAGE_BUCKET=travelos-9f482.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=291177331016
VITE_FIREBASE_APP_ID=1:291177331016:web:705f5315855da513351b7d
"@
Set-Content -Path ".env" -Value $env_content

Write-Host "Installing Firebase..."
npm install firebase

Write-Host "Committing changes..."
git add .
git commit -m "Add Firebase OAuth authentication"

Write-Host "Pushing to GitHub..."
git push origin main

Write-Host "Done!"
