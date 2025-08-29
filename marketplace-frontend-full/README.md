# Marketplace Frontend (full)

Запуск:

1. npm install
2. npm run dev

Фронтенд использует Vite на порту 3000 и проксирует /api -> http://localhost:8080

Авторизация использует cookie (HttpOnly) — запросы выполняются с withCredentials через axios (/api/*).