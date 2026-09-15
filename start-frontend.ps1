Write-Host "Creating .env file..." -ForegroundColor Cyan

@"
VITE_API_URL=http://localhost:3000/api
VITE_BACKEND_URL=http://localhost:3000
"@ | Out-File -FilePath ".env" -Encoding UTF8

Write-Host ".env created!" -ForegroundColor Green
Write-Host "Starting development server..." -ForegroundColor Green
Write-Host ""

npm run dev
