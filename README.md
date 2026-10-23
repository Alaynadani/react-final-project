# Movie Search

## GitHub Pages

The app is configured for the project URL `/react-final-project/`. The GitHub
Actions workflow builds the Vite app and deploys the generated `dist` directory
to GitHub Pages. It also publishes `404.html` so direct links and page refreshes
on movie-detail routes load the app correctly.

To enable deployment, push to the `main` branch and set **Settings → Pages →
Build and deployment → Source** to **GitHub Actions**.

For local development, run `npm install` and then `npm run dev`.
