# iNews Frontend (iNews_fe)

React + Vite frontend for NewsExplorer. Lets users search news via NewsAPI, save articles (when logged in), and view/delete saved articles.

## Frontend

- Production frontend: http://newsexplorer.fpr.net

## Features

- Search news (past 7 days) by keyword
- Sign up / sign in
- Save and delete articles
- Saved articles page with keyword summary
- Responsive UI

## Tech Stack

- React 18, React Router
- Vite
- CSS

## Getting Started

### Prerequisites

- Node.js 18+
- A NewsAPI key (https://newsapi.org/)
- Backend running (default http://localhost:3002)

### Installation

```bash
cd iNews_fe
npm install
```

### Environment Variables

Create `.env` in `iNews_fe/` with your NewsAPI key:

```env
VITE_NEWS_API_KEY=your_news_api_key_here
```

Note: Frontend expects the backend at `http://localhost:3002` in development (see `src/utils/api.js`). In production it uses `https://api.newsexplorer.fpr.net`.

### Scripts

```bash
npm run dev      # start dev server at http://localhost:5173
npm run build    # build for production (output in dist/)
npm run preview  # preview production build
npm run lint     # run eslint
```

### Development Workflow

1. Start the backend (port 3002).
2. Start the frontend dev server.
3. In the app, use the header to Sign In or Sign Up, then search and save articles.

### API Integration

- News search uses `src/utils/newsApi.js` (NewsAPI).
- Saved articles use `src/utils/api.js` to call backend:
  - `POST /signup`, `POST /signin`, `GET /users/me`
  - `GET /articles`, `POST /articles`, `DELETE /articles/:id`

### Build & Deploy

- Build: `npm run build` produces `dist/`.
- A `homepage` field exists in `package.json` and a sample `deploy` script references a remote server; adjust/remove to your environment.

### Project Structure

```
iNews_fe/
	src/
		components/
		utils/
		main.jsx
	public/
		favicon.png
```

### Notes

- The browser tab title and favicon are set in `index.html`.
- Ensure CORS is enabled on the backend for your frontend origin in production.
