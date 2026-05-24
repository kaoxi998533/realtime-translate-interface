# GPT Realtime Translate

Open-source, ready-to-run realtime speech translation for the browser and Android. It uses the OpenAI Realtime API, WebRTC, server-side VAD, and short-lived client secrets so you can ship a practical live interpreter without putting long-lived API keys in frontend code.

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Node.js >=20](https://img.shields.io/badge/Node.js-%3E%3D20-339933.svg)](package.json)
[![Realtime API](https://img.shields.io/badge/OpenAI-Realtime_API-111111.svg)](https://platform.openai.com/docs/guides/realtime)

## Why This Project

Most realtime translation demos stop at a proof of concept. This project is packaged as a usable interface layer:

- Browser app with push-to-talk, auto-listen, transcripts, translation text, and audio playback.
- OpenAI Realtime session broker that keeps `OPENAI_API_KEY` on the server.
- WebRTC audio path for low-latency speech-in, speech-out translation.
- Server VAD tuning for automatic turn detection.
- Input/output device selectors for supported browsers and Android WebView.
- Optional left/right ear routing for bilingual conversation monitoring.
- Android WebView wrapper that reuses the same frontend and stores the API key locally.
- Docker and local Node workflows for fast deployment.

The default UI is English, with an in-app Chinese UI toggle. Translation source and target languages are configurable from the interface, including automatic source-language detection.

## Demo Flow

1. Connect to Realtime.
2. Hold the microphone button or enable auto-listen.
3. Speak in the selected source language, or let Auto detect it.
4. Hear the translated speech and see source/translation text on screen.

## Quick Start

Requirements:

- Node.js 20 or newer.
- An OpenAI API key with Realtime API access.
- A modern browser with microphone and WebRTC support.

```bash
git clone https://github.com/kaoxi998533/realtime-translate-interface.git
cd realtime-translate-interface
cp .env.example .env
```

Edit `.env`:

```bash
OPENAI_API_KEY=sk-your-api-key-here
REALTIME_MODEL=gpt-realtime
PORT=3000
HOST=127.0.0.1
```

Run:

```bash
npm run dev
```

Open `http://127.0.0.1:3000`.

## Docker

```bash
cp .env.example .env
docker compose up --build
```

Open `http://127.0.0.1:3000`.

## How It Works

The browser never receives your long-lived API key.

1. The frontend calls `GET /api/session?source=auto&target=en`.
2. The Node server creates a short-lived Realtime client secret with your server-side `OPENAI_API_KEY`.
3. The frontend creates a WebRTC offer and sends it to the Realtime calls endpoint with the short-lived secret.
4. Realtime data-channel events update the UI transcript, translation text, status, and diagnostics.
5. Remote audio is played through the selected output device when the platform supports it.

## Controls

- `UI language`: switch the app interface between English and Chinese.
- `Source language`: choose Auto detect or a specific spoken language.
- `Target language`: choose the translated output language.
- `Mic test`: record and replay locally without calling the API.
- `Auto listen`: keep the microphone open and let server VAD translate after speech stops.
- `Split ears`: pan translated audio by detected source/target direction.

Bundled language options currently include English, Chinese, Japanese, Korean, Spanish, French, German, Italian, Portuguese, Russian, Arabic, Hindi, Thai, Vietnamese, and Indonesian.

## Realtime Tuning

The app defaults auto-listen to a faster server VAD response:

```bash
REALTIME_VAD_SILENCE_DURATION_MS=450
```

Open the in-app `Settings` panel to see the current runtime values.

Useful `.env` knobs:

```bash
REALTIME_VAD_SILENCE_DURATION_MS=450   # End-of-speech wait. Lower is faster; too low may split a sentence.
REALTIME_VAD_THRESHOLD=0.78            # Lower detects quieter speech/noise; higher requires stronger speech.
REALTIME_VAD_PREFIX_PADDING_MS=250     # Audio kept before speech start to avoid clipping first syllables.
REALTIME_OUTPUT_SPEED=1                # Spoken translation playback speed.
REALTIME_VOICE=marin                   # Output voice.
REALTIME_MODEL=gpt-realtime            # Realtime model ID.
REALTIME_TRANSCRIPTION_MODEL=gpt-4o-mini-transcribe
REALTIME_SESSION_TTL_SECONDS=600       # Client secret lifetime.
```

## API Surface

`GET /api/session?source=auto&target=en`

Creates a short-lived Realtime client secret.

Supported `source` values:

- `auto`
- `en`, `zh`, `ja`, `ko`, `es`, `fr`, `de`, `it`, `pt`, `ru`, `ar`, `hi`, `th`, `vi`, `id`

Supported `target` values:

- `en`, `zh`, `ja`, `ko`, `es`, `fr`, `de`, `it`, `pt`, `ru`, `ar`, `hi`, `th`, `vi`, `id`

Legacy `mode=auto`, `mode=zh_en`, and `mode=en_zh` are still accepted for compatibility.

`GET /api/config`

Returns the active Realtime tuning values used by the UI settings panel.

## Android APK

The Android app is a WebView wrapper around the same `public` frontend. It runs a tiny local server inside `MainActivity`, stores the OpenAI API key in local preferences, and supports Android audio-device routing where the OS allows it.

Build a debug APK:

```bash
chmod +x android/build-apk.sh
android/build-apk.sh
```

The APK is written to:

```bash
android/build-manual/out/realtime-translate-debug.apk
```

Android build requirements are defined in `android/build-apk.sh` and currently expect an Android SDK with matching platform/build-tools versions.

## Project Structure

```text
.
├── public/                 # Browser UI, WebRTC client, styles
├── server.js               # Static server + Realtime client-secret broker
├── android/                # Android WebView wrapper and manual APK build
├── DEVELOPMENT.md          # Architecture notes and manual test checklist
├── .env.example            # Runtime configuration template
├── Dockerfile              # Containerized web app
└── docker-compose.yml      # Local Docker workflow
```

## Security

- Do not put `OPENAI_API_KEY` in browser code.
- Do not commit `.env`, APK outputs, Gradle caches, or debug keystores.
- Treat Realtime client secrets as short-lived credentials.
- See [SECURITY.md](SECURITY.md) for reporting guidance.

## Contributing

Contributions are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md) and [ROADMAP.md](ROADMAP.md) for useful next steps.

## License

MIT. See [LICENSE](LICENSE).
