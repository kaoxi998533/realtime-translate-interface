import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const publicDir = join(__dirname, "public");

if (existsSync(join(__dirname, ".env"))) {
  const envText = await readFile(join(__dirname, ".env"), "utf8");
  for (const line of envText.split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)=(.*)\s*$/);
    if (!match || process.env[match[1]]) continue;
    process.env[match[1]] = match[2].replace(/^["']|["']$/g, "");
  }
}

const port = Number(process.env.PORT || 3000);
const host = process.env.HOST || "127.0.0.1";

function envNumber(name, fallback) {
  const value = Number(process.env[name]);
  return Number.isFinite(value) ? value : fallback;
}

function envString(name, fallback) {
  const value = process.env[name];
  return value && value.trim() ? value.trim() : fallback;
}

function currentRealtimeSettings() {
  return {
    model: envString("REALTIME_MODEL", "gpt-realtime"),
    transcriptionModel: envString("REALTIME_TRANSCRIPTION_MODEL", "gpt-4o-mini-transcribe"),
    voice: envString("REALTIME_VOICE", "marin"),
    outputSpeed: envNumber("REALTIME_OUTPUT_SPEED", 1),
    turnDetection: {
      type: "server_vad",
      threshold: envNumber("REALTIME_VAD_THRESHOLD", 0.78),
      prefixPaddingMs: envNumber("REALTIME_VAD_PREFIX_PADDING_MS", 250),
      silenceDurationMs: envNumber("REALTIME_VAD_SILENCE_DURATION_MS", 450),
      createResponse: process.env.REALTIME_VAD_CREATE_RESPONSE !== "false",
      interruptResponse: process.env.REALTIME_VAD_INTERRUPT_RESPONSE !== "false",
    },
    expiresAfterSeconds: envNumber("REALTIME_SESSION_TTL_SECONDS", 600),
  };
}

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
};

const supportedLanguages = {
  auto: "the source language automatically",
  en: "English",
  zh: "Mandarin Chinese",
  ja: "Japanese",
  ko: "Korean",
  es: "Spanish",
  fr: "French",
  de: "German",
  it: "Italian",
  pt: "Portuguese",
  ru: "Russian",
  ar: "Arabic",
  hi: "Hindi",
  th: "Thai",
  vi: "Vietnamese",
  id: "Indonesian",
};

function languageName(code, fallback) {
  return supportedLanguages[code] || supportedLanguages[fallback] || supportedLanguages.en;
}

function translationInstruction(source, target) {
  const sourceName = languageName(source, "auto");
  const targetName = languageName(target, "en");
  if (source === "auto") {
    return `Detect the source language automatically and translate it to natural ${targetName}.`;
  }
  return `Translate ${sourceName} to natural ${targetName}. If the user speaks a different language, still translate the utterance to ${targetName} and do not scold the user.`;
}

function json(res, status, body) {
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(body));
}

async function createClientSecret(req, res) {
  if (!process.env.OPENAI_API_KEY) {
    json(res, 500, {
      error: "Missing OPENAI_API_KEY. Add it to your shell environment or a local .env loader before starting the server.",
    });
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host}`);
  const legacyMode = url.searchParams.get("mode") || "";
  const legacyDirections = {
    zh_en: ["zh", "en"],
    en_zh: ["en", "zh"],
    auto: ["auto", "en"],
  };
  const [legacySource, legacyTarget] = legacyDirections[legacyMode] || [];
  const source = url.searchParams.get("source") || legacySource || "auto";
  const target = url.searchParams.get("target") || legacyTarget || "en";
  const direction = translationInstruction(source, target);
  const settings = currentRealtimeSettings();

  const sessionConfig = {
    expires_after: {
      anchor: "created_at",
      seconds: settings.expiresAfterSeconds,
    },
    session: {
      type: "realtime",
      model: settings.model,
      instructions: [
        "You are a live two-way interpreter.",
        direction,
        "Only output the translation. Do not explain, summarize, answer questions, or add commentary.",
        "Preserve names, numbers, units, tone, and intent. Keep the result concise and spoken naturally.",
      ].join(" "),
      output_modalities: ["audio"],
      audio: {
        input: {
          transcription: {
            model: settings.transcriptionModel,
          },
          turn_detection: {
            type: settings.turnDetection.type,
            threshold: settings.turnDetection.threshold,
            prefix_padding_ms: settings.turnDetection.prefixPaddingMs,
            silence_duration_ms: settings.turnDetection.silenceDurationMs,
            create_response: settings.turnDetection.createResponse,
            interrupt_response: settings.turnDetection.interruptResponse,
          },
        },
        output: {
          voice: settings.voice,
          speed: settings.outputSpeed,
        },
      },
    },
  };

  try {
    const openaiRes = await fetch("https://api.openai.com/v1/realtime/client_secrets", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sessionConfig),
    });

    const text = await openaiRes.text();
    if (!openaiRes.ok) {
      res.writeHead(openaiRes.status, { "Content-Type": "application/json; charset=utf-8" });
      res.end(text);
      return;
    }

    res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
    res.end(text);
  } catch (error) {
    json(res, 502, { error: `Failed to create realtime client secret: ${error.message}` });
  }
}

function writeConfig(req, res) {
  const settings = currentRealtimeSettings();
  json(res, 200, {
    realtime: settings,
    tunable: [
      {
        env: "REALTIME_VAD_SILENCE_DURATION_MS",
        current: settings.turnDetection.silenceDurationMs,
        default: 450,
        unit: "ms",
        note: "End-of-speech wait before auto translation. Lower is faster; too low may cut off short pauses.",
      },
      {
        env: "REALTIME_VAD_THRESHOLD",
        current: settings.turnDetection.threshold,
        default: 0.78,
        note: "Speech detection sensitivity. Lower detects quieter speech/noise; higher requires stronger speech.",
      },
      {
        env: "REALTIME_VAD_PREFIX_PADDING_MS",
        current: settings.turnDetection.prefixPaddingMs,
        default: 250,
        unit: "ms",
        note: "Audio kept before detected speech starts. Higher preserves clipped first syllables at a small latency/token cost.",
      },
      {
        env: "REALTIME_OUTPUT_SPEED",
        current: settings.outputSpeed,
        default: 1,
        note: "Spoken translation speed. Slightly above 1 can finish playback sooner.",
      },
      {
        env: "REALTIME_VOICE",
        current: settings.voice,
        default: "marin",
        note: "Realtime output voice.",
      },
      {
        env: "REALTIME_MODEL",
        current: settings.model,
        default: "gpt-realtime",
        note: "Realtime model ID.",
      },
      {
        env: "REALTIME_TRANSCRIPTION_MODEL",
        current: settings.transcriptionModel,
        default: "gpt-4o-mini-transcribe",
        note: "Input transcription model used for the on-screen source transcript.",
      },
      {
        env: "REALTIME_SESSION_TTL_SECONDS",
        current: settings.expiresAfterSeconds,
        default: 600,
        unit: "s",
        note: "Client secret lifetime.",
      },
    ],
  });
}

async function serveStatic(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const requestedPath = url.pathname === "/" ? "/index.html" : url.pathname;
  const filePath = normalize(join(publicDir, requestedPath));

  if (!filePath.startsWith(publicDir) || !existsSync(filePath)) {
    json(res, 404, { error: "Not found" });
    return;
  }

  const body = await readFile(filePath);
  res.writeHead(200, {
    "Content-Type": mimeTypes[extname(filePath)] || "application/octet-stream",
    "Cache-Control": "no-store",
  });
  res.end(body);
}

const server = createServer(async (req, res) => {
  try {
    if (req.method === "GET" && req.url?.startsWith("/api/session")) {
      await createClientSecret(req, res);
      return;
    }

    if (req.method === "GET" && req.url?.startsWith("/api/config")) {
      writeConfig(req, res);
      return;
    }

    if (req.method === "GET" || req.method === "HEAD") {
      await serveStatic(req, res);
      return;
    }

    json(res, 405, { error: "Method not allowed" });
  } catch (error) {
    json(res, 500, { error: error.message });
  }
});

server.listen(port, host, () => {
  console.log(`Realtime translator running at http://${host}:${port}`);
});
