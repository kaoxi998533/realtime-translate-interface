# Contributing

Thanks for helping improve GPT Realtime Translate.

## Local Setup

```bash
cp .env.example .env
npm run dev
```

Set `OPENAI_API_KEY` in `.env`, then open `http://127.0.0.1:3000`.

## Checks

Before opening a pull request, run:

```bash
npm run check
```

For Android changes, also build a debug APK:

```bash
android/build-apk.sh
```

## Pull Requests

- Keep changes focused and explain the user-facing behavior.
- Include screenshots or short clips for UI changes.
- Document new environment variables in `.env.example` and `README.md`.
- Do not commit API keys, APK outputs, Gradle caches, or local Android SDK files.

## Good First Issues

Useful starter areas:

- Add more language-pair presets.
- Improve mobile layout and accessibility labels.
- Add provider adapters behind the existing session endpoint.
- Add deployment recipes for Fly.io, Render, Railway, and Docker hosts.
