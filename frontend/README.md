Frontend (Vite + React)
- Install: cd frontend && npm install
- Dev: npm run start
- Build: npm run build

Notes:
- API base is expected at `/api` (proxy or same domain). Adjust `services/api.js` if backend runs on a different origin.
- Auth token is stored in localStorage as `ft_token`.
