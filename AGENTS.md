# Repository Guidelines

## Project Structure & Module Organization
- `src/index.ts` — TypeScript MCP server with all QWeather tools and Zod schemas.
- `build/` — Transpiled JavaScript output (`build/index.js`).
- `cli.js` — CLI entry; executes `build/index.js`.
- `scripts/set-permissions.js` — Sets execute bit on build output (non‑Windows).
- Config: `tsconfig.json`, `smithery.yaml`, `Dockerfile`. No test directory yet.

## Build, Test, and Development Commands
- `npm run build` — Compile TypeScript and set executable permissions.
- `npm run build:windows` — Compile TypeScript (no permission changes).
- Run locally (stdio):
  - `export QWEATHER_API_BASE=https://api.qweather.com`
  - `export QWEATHER_API_KEY=<your-api-key>`
  - `npx -y qweather-mcp` (or `node build/index.js` after build)
- Optional dev loop: `npx tsc -w` to watch-compile during development.

## Coding Style & Naming Conventions
- TypeScript, ES Modules, strict mode enabled; 2‑space indentation.
- Naming: camelCase for variables/functions; PascalCase for types/interfaces.
- QWeather DTOs/interfaces: prefix with `QWeather` (or `Q`), e.g., `QWeatherAirQualityResponse`.
- Use async/await; validate inputs with Zod; check required env vars at startup.
- Keep functions small; centralize HTTP calls; include clear error messages.

## Testing Guidelines
- No framework configured yet. If adding tests, prefer Vitest or Node’s built‑in test runner.
- Place tests next to source in `src/__tests__/` with `*.test.ts` naming.
- Cover new logic and edge cases for tools, validators, and API helpers.

## Commit & Pull Request Guidelines
- Commits: present tense, concise subject (English or 中文). Example:
  - `feat: add hourly air quality tool`
  - `新增获取逐小时空气质量预报功能`
- PRs: include clear description, linked issues, and example CLI usage/output. Update README when adding/altering tools. Ensure `npm run build` passes and the server runs with sample env.

## Security & Configuration Tips
- Never commit API keys. Use environment variables only.
- Avoid logging secrets; prefer high‑level error messages.
- For local testing, keep `.env` files untracked and load before running (if you choose to use one).
