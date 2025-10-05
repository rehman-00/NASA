# Getting Started with Create React App
## Local AI backend (safe proxy)

This project includes a minimal Express server at `server.js` which exposes a safe `/api/ask` endpoint to call OpenAI (or compatible) models from the backend so your API key is never exposed in the browser.

### Setup

1. Create a `.env` file in the project root and set:

```
OPENAI_API_KEY=your-key-here
# Optional overrides
# OPENAI_BASE_URL=https://api.openai.com/v1
# OPENAI_MODEL=gpt-4o-mini
# CORS_ALLOWLIST=http://localhost:3000
# PORT=5000
```

2. Install dependencies:

```
npm install
```

3. Run server and frontend together:

```
npm run dev
```

The React dev server proxies API calls to `http://localhost:5000` (see `proxy` in `package.json`).

### Security notes

- Never put `OPENAI_API_KEY` in client-side code. Keep it in `.env` on the server.
- CORS is allowlisted via `CORS_ALLOWLIST` (defaults to `http://localhost:3000`).
- Basic IP rate limiting and a 30s timeout are enabled on `/api/*` routes.

### Test the backend quickly

```
curl -X POST http://localhost:5000/api/ask \
  -H "Content-Type: application/json" \
  -d '{"context":"hello","question":"Say hi"}'
```

## Optional: Python FastAPI backend

If you prefer Python, a FastAPI backend is provided in `python-backend/` with endpoints:
- `GET /api/health`
- `POST /api/ask` (single Q&A)
- `POST /api/chat` (multi-turn chat)
- `GET /api/resources` (videos, materials)
- `GET /api/papers` (popular research papers)

Setup:
```
cd python-backend
python -m venv .venv
./.venv/Scripts/Activate.ps1  # PowerShell on Windows
pip install -r requirements.txt
setx OPENAI_API_KEY "your-key-here"
uvicorn main:app --reload --port 8000
```

Then, in the React app, set an env to point requests to Python:

```
# in my-app/.env.local
REACT_APP_API_BASE=http://localhost:8000
```

The app now uses `src/api.js` to prefix all requests with `REACT_APP_API_BASE` (or defaults to the Node proxy when not set).


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
