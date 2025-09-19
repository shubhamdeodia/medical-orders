# Medical Orders

Static-exportable Next.js 14 project prepared for deployment to GitHub Pages.

## Stack
- Next.js 14 (App Router, `output: 'export'`)
- React 19
- Tailwind CSS 4
- Radix UI primitives + custom components

## Run Locally
### 1. Install dependencies
```bash
npm install
```

### 2. Start development server
```bash
npm run dev
```
Visit: http://localhost:3000

### 3. Build & static export
The `build` script performs `next build && next export` producing a static site.
```bash
npm run build
```
Output folder: `out/`

### 4. Preview exported site
```bash
npx serve out
# or
python3 -m http.server --directory out 3000
```

## Deployment (GitHub Pages)
Push to `main`; GitHub Actions workflow (`.github/workflows/deploy.yml`) builds & deploys.
Ensure Pages setting: Source → GitHub Actions.

### Base Path
CI sets `GITHUB_PAGES=true` so `basePath` & `assetPrefix` become `/<repoName>`.
Local dev omits them (root path).
Emulate Pages locally:
```bash
GITHUB_PAGES=true npm run build
npx serve out
```

## Environment Variables
Use `.env.local`. Only compile-time values are embedded (no server runtime in static export).

## Static Export Limitations
- No API routes / server actions / SSR / ISR
- All dynamic data must be fetched client-side

## Custom Domain
Add a `CNAME` file inside `public/` (e.g. containing `example.com`). It is copied into `out/`.

## Scripts
| Script | Description |
| ------ | ----------- |
| dev | Start dev server |
| build | Build & export to `out/` |
| start | Unused in static hosting context (would start Node server) |
| lint | Run linting |
| deploy | Alias to `build` (used by CI) |

## License
Add a license (e.g. MIT) if open sourcing.

---
Feel free to adjust or request more details.
