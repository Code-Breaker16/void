# void

A minimalist, dark-mode browser dashboard to replace your new tab page. Built with Vite, vanilla JavaScript, and CSS.

## Features
* **Matrix Rain:** Canvas-based dynamic background.
* **NASA APOD:** Daily space images/videos fetched via NASA's API.
* **Pomodoro Timer:** Work/rest focus timer with control buttons.
* **Clock & Greetings:** Live time with dynamic morning/evening greetings.
* **Search & Shortcuts:** Google search (opens in new tab) and quick links.

## Quick Start

```bash
# Install dependencies
npm install

# Add your NASA API key to .env
echo "VITE_NASA_API_KEY=your_key_here" > .env

# Run locally
npm run dev
```

## Deployment
Deploys automatically to GitHub Pages via GitHub Actions. Make sure to set VITE_NASA_API_KEY in your repo secrets (Settings > Secrets and variables > Actions) and set Pages source to GitHub Actions.
