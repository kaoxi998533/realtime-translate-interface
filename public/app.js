const connectButton = document.querySelector("#connectButton");
const talkButton = document.querySelector("#talkButton");
const autoListenButton = document.querySelector("#autoListenButton");
const stereoButton = document.querySelector("#stereoButton");
const uiLanguageSelect = document.querySelector("#uiLanguageSelect");
const sourceLanguageSelect = document.querySelector("#sourceLanguageSelect");
const targetLanguageSelect = document.querySelector("#targetLanguageSelect");
const swapLanguageButton = document.querySelector("#swapLanguageButton");
const debugModeButton = document.querySelector("#debugModeButton");
const inputDeviceSelect = document.querySelector("#inputDeviceSelect");
const outputDeviceSelect = document.querySelector("#outputDeviceSelect");
const nativeInputTestButton = document.querySelector("#nativeInputTestButton");
const keyRow = document.querySelector("#keyRow");
const apiKeyInput = document.querySelector("#apiKeyInput");
const saveKeyButton = document.querySelector("#saveKeyButton");
const hint = document.querySelector("#hint");
const statusEl = document.querySelector("#status");
const sourceText = document.querySelector("#sourceText");
const translationText = document.querySelector("#translationText");
const settingsList = document.querySelector("#settingsList");
const eventLog = document.querySelector("#eventLog");
const micIcon = document.querySelector(".mic");

const languages = [
  { code: "auto", en: "Auto detect", zh: "自动检测", sourceOnly: true },
  { code: "en", en: "English", zh: "英语" },
  { code: "zh", en: "Chinese", zh: "中文" },
  { code: "ja", en: "Japanese", zh: "日语" },
  { code: "ko", en: "Korean", zh: "韩语" },
  { code: "es", en: "Spanish", zh: "西班牙语" },
  { code: "fr", en: "French", zh: "法语" },
  { code: "de", en: "German", zh: "德语" },
  { code: "it", en: "Italian", zh: "意大利语" },
  { code: "pt", en: "Portuguese", zh: "葡萄牙语" },
  { code: "ru", en: "Russian", zh: "俄语" },
  { code: "ar", en: "Arabic", zh: "阿拉伯语" },
  { code: "hi", en: "Hindi", zh: "印地语" },
  { code: "th", en: "Thai", zh: "泰语" },
  { code: "vi", en: "Vietnamese", zh: "越南语" },
  { code: "id", en: "Indonesian", zh: "印尼语" },
];

const i18n = {
  en: {
    title: "Realtime Speech Translator",
    uiLanguage: "UI language",
    sourceLanguage: "Source language",
    targetLanguage: "Target language",
    micTest: "Mic test",
    holdToTalk: "Hold to talk",
    autoListen: "Auto listen",
    normalOutput: "Normal output",
    splitEars: "Split ears",
    inputDevice: "Input device",
    outputDevice: "Output device",
    save: "Save",
    connect: "Connect",
    disconnect: "Disconnect",
    connecting: "Connecting",
    hintInitial: "Connect to Realtime first. Microphone permission will be requested.",
    sourcePanel: "Source",
    translationPanel: "Translation",
    waitingForSpeech: "Waiting for speech",
    waitingForOutput: "Waiting for output",
    settings: "Settings",
    loading: "Loading",
    currentRealtimeSettings: "Current Realtime settings",
    eventLog: "Event log",
    statusDisconnected: "Disconnected",
    statusConnected: "Connected",
    statusConnecting: "Connecting",
    statusPaused: "Paused",
    statusRetrying: "Retrying",
    statusError: "Error",
    statusTestMode: "Test mode",
    sourceExpected: "Waiting for microphone input",
    modeChanged: "Language selection changed. Please reconnect.",
    missingKey: "Save an OpenAI API key first.",
    noClientSecret: "OpenAI response did not include a client secret.",
    createSessionFailed: "Failed to create session",
    requestingMic: "Requesting microphone permission and creating a Realtime session.",
    requestingMicOnly: "Requesting microphone permission.",
    readyHint: "Hold the microphone to speak, or enable auto listen.",
    readyHintNative: "Using Android native DJI input. Hold the microphone to speak, or enable auto listen.",
    pausedHint: "Paused and disconnected from Realtime. Tap the center button to resume auto listen.",
    pausedText: "Paused",
    resumedAria: "Resume auto listen",
    holdAria: "Hold to talk",
    pauseAria: "Pause auto listen",
    localRecordingUnsupported: "This browser does not support local recording playback.",
    playbackDone: "Playback finished",
    playbackDoneHint: "Hold the microphone to test again.",
    testReleasePlayback: "Release to play the recording",
    micTestHint: "Mic test mode does not call the API. Hold to record; release to play it back.",
    detectedSpeech: "Speech detected. Pause briefly after a sentence to translate automatically.",
    detectedPause: "Pause detected. Translating.",
    listening: "Listening",
    translating: "Translating",
    translated: "Translation complete",
    noTranscript: "No transcript recognized",
    waitingForYou: "Waiting for you to finish",
    recording: "Recording",
    recordingHint: "Recording. Release to play it back.",
    listeningHint: "Listening. Release to translate.",
    processing: "Processing.",
    preparingPlayback: "Preparing playback.",
    nothingRecorded: "No audio was recorded. Try again.",
    noAudio: "No audio recorded",
    checkMic: "Check microphone permission or input device",
    checkMicHint: "No audio was recorded. Confirm microphone permission and the selected input device.",
    gotMicAudio: "Microphone audio recorded",
    playingRecording: "Playing recording",
    playingRecordingHint: "Playing your recorded input.",
    playbackFailed: "Playback failed",
    autoListenNative: "Auto listen is on and sending audio from Android native input. Tap the center button to pause.",
    autoListenOn: "Auto listen is on. Pause after a sentence and it will translate automatically. Tap the center button to pause.",
    autoListenOff: "Auto listen is off. Hold the microphone to speak.",
    stereoOn: "Split-ear output is on. The translation is panned by detected source/target direction.",
    stereoOff: "Split-ear output is off. Translation plays in both channels.",
    noConfig: "No configuration",
    noConfigDetail: "This runtime did not return tunable settings.",
    currentDefault: "current {current}, default {default}",
    configFailed: "Configuration failed",
    configFailedNote: "The web build needs /api/config from the Node server; Android requires a rebuilt APK.",
    readConfigFailed: "Failed to read config",
    browserDefaultInput: "Browser default input",
    systemDefaultInput: "System default input",
    androidDefaultOutput: "Android default output",
    systemDefaultOutput: "System default output",
    selectedInput: "Input device selected. It will be used on the next connection.",
    selectedInputAndroid: "Input device selected. WebView microphone constraints apply on the next connection.",
    selectedOutput: "Output device changed.",
    outputUnsupported: "This browser does not support selecting output devices in the page.",
    outputFailed: "Output device switch failed",
    routeMaybeFailed: "Audio device selection may not have taken effect. Confirm the device is connected and try again.",
    defaultInput: "System default input",
    activeWebViewInput: "Using WebView input device: {label}",
    inputMismatch: "The browser did not use the selected microphone: {label}. See event log for details.",
    nativeTest: "Test DJI native input",
    nativeTestNamed: "Test {label} native input",
    nativeInputUnavailable: "Android sees Wireless Mic Rx, but WebView does not expose it as a browser microphone. See event log.",
    nativeStartFailed: "Native DJI input failed to start",
    nativeTestRunning: "Testing DJI with Android native recording. Speak into the DJI mic.",
    nativeTestFailed: "Native input test failed",
    nativeWrongRoute: "Native recording did not route to DJI. Actual route: {label}",
    nativeLowLevel: "Native recording routed to DJI, but the level is low. Confirm the transmitter is not muted.",
    nativeOk: "Native recording routed to DJI, peak={peak}.",
    nativeException: "Native input test error",
    keySavedPlaceholder: "API key saved. Enter a new key to replace it.",
    keyPlaceholder: "Paste OpenAI API key",
    enterKey: "Enter an API key.",
    keySaved: "API key saved locally on this phone.",
    disconnectedHint: "Disconnected.",
    backgroundDisconnected: "App entered background. Realtime disconnected.",
  },
  zh: {
    title: "实时语音翻译",
    uiLanguage: "界面语言",
    sourceLanguage: "源语言",
    targetLanguage: "目标语言",
    micTest: "麦克风测试",
    holdToTalk: "按住说话",
    autoListen: "自动监听",
    normalOutput: "普通输出",
    splitEars: "左右耳",
    inputDevice: "输入设备",
    outputDevice: "输出设备",
    save: "保存",
    connect: "连接",
    disconnect: "断开",
    connecting: "连接中",
    hintInitial: "先连接 Realtime，会请求麦克风权限。",
    sourcePanel: "你说的",
    translationPanel: "翻译",
    waitingForSpeech: "等待语音输入",
    waitingForOutput: "等待输出",
    settings: "可调参数",
    loading: "正在读取",
    currentRealtimeSettings: "当前 Realtime 参数",
    eventLog: "事件日志",
    statusDisconnected: "未连接",
    statusConnected: "已连接",
    statusConnecting: "连接中",
    statusPaused: "已暂停",
    statusRetrying: "重试中",
    statusError: "错误",
    statusTestMode: "测试模式",
  },
};

Object.assign(i18n.zh, {
  sourceExpected: "等待麦克风输入",
  modeChanged: "语言选择已切换，请重新连接。",
  missingKey: "请先保存 OpenAI API key。",
  noClientSecret: "OpenAI 响应里没有 client secret。",
  createSessionFailed: "创建 session 失败",
  requestingMic: "正在请求麦克风权限并创建 Realtime 会话。",
  requestingMicOnly: "正在请求麦克风权限。",
  readyHint: "按住麦克风说话，或打开自动监听。",
  readyHintNative: "正在使用 Android 原生 DJI 输入。按住麦克风说话，或打开自动监听。",
  pausedHint: "已暂停并断开 Realtime。点击中间按钮恢复自动监听。",
  pausedText: "已暂停",
  resumedAria: "恢复自动监听",
  holdAria: "按住说话",
  pauseAria: "暂停自动监听",
  localRecordingUnsupported: "当前浏览器不支持本地录音回放。",
  playbackDone: "播放完成",
  playbackDoneHint: "按住麦克风可以再次测试。",
  testReleasePlayback: "松开后播放录音",
  micTestHint: "麦克风测试模式不会调用 API。按住录音，松开后播放刚才的声音。",
  detectedSpeech: "检测到语音，说完停顿一下会自动翻译。",
  detectedPause: "检测到停顿，正在翻译。",
  listening: "正在监听",
  translating: "正在翻译",
  translated: "翻译完成",
  noTranscript: "未识别到文字",
  waitingForYou: "等待你说完",
  recording: "正在录音",
  recordingHint: "正在录音，松开后会立刻回放。",
  listeningHint: "正在听，松开后翻译。",
  processing: "处理中。",
  preparingPlayback: "正在准备回放。",
  nothingRecorded: "没有录到声音，请再试一次。",
  noAudio: "未录到音频",
  checkMic: "请检查麦克风权限或输入设备",
  checkMicHint: "没有录到声音，请确认麦克风已授权并选择了正确输入设备。",
  gotMicAudio: "已录到麦克风声音",
  playingRecording: "正在播放录音",
  playingRecordingHint: "正在播放刚才的输入声音。",
  playbackFailed: "播放失败",
  autoListenNative: "自动监听已开启，正在从 Android 原生输入发送音频。点击中间按钮暂停。",
  autoListenOn: "自动监听已开启，说完一句话后会自动翻译。点击中间按钮暂停。",
  autoListenOff: "自动监听已关闭，可以按住麦克风说话。",
  stereoOn: "左右耳已开启：翻译会按检测到的源/目标方向声像定位。",
  stereoOff: "左右耳已关闭，翻译会双声道播放。",
  noConfig: "暂无配置",
  noConfigDetail: "当前运行环境没有返回可调参数。",
  currentDefault: "当前 {current}，默认 {default}",
  configFailed: "配置读取失败",
  configFailedNote: "Web 版需要 Node server 提供 /api/config；Android 版需要更新 APK 后才会显示。",
  readConfigFailed: "读取配置失败",
  browserDefaultInput: "浏览器默认输入",
  systemDefaultInput: "系统默认输入",
  androidDefaultOutput: "Android 默认输出",
  systemDefaultOutput: "系统默认输出",
  selectedInput: "输入设备已选择，下次连接生效。",
  selectedInputAndroid: "输入设备已选择，下次连接时由 WebView 麦克风约束生效。",
  selectedOutput: "输出设备已切换。",
  outputUnsupported: "当前浏览器不支持网页内切换输出设备。",
  outputFailed: "输出设备切换失败",
  routeMaybeFailed: "音频设备切换可能未生效，请确认设备已连接后重试。",
  defaultInput: "系统默认输入",
  activeWebViewInput: "正在使用 WebView 输入设备：{label}",
  inputMismatch: "浏览器没有使用所选麦克风：已选 {label}。详情见事件日志。",
  nativeTest: "测试 DJI 原生输入",
  nativeTestNamed: "测试 {label} 原生输入",
  nativeInputUnavailable: "Android 系统能看到 Wireless Mic Rx，但 WebView 没把它暴露为浏览器麦克风。详情见事件日志。",
  nativeStartFailed: "原生 DJI 输入启动失败",
  nativeTestRunning: "正在用 Android 原生录音测试 DJI，请对着 DJI 说话。",
  nativeTestFailed: "原生输入测试失败",
  nativeWrongRoute: "原生录音没有路由到 DJI，实际路由：{label}",
  nativeLowLevel: "原生录音已路由到 DJI，但电平很低，请确认 DJI 发射端未静音。",
  nativeOk: "原生录音已路由到 DJI，peak={peak}。",
  nativeException: "原生输入测试异常",
  keySavedPlaceholder: "API key 已保存，输入新 key 可覆盖",
  keyPlaceholder: "粘贴 OpenAI API key",
  enterKey: "请输入 API key。",
  keySaved: "API key 已保存到手机本地。",
  disconnectedHint: "已断开。",
  backgroundDisconnected: "应用已进入后台，Realtime 已断开。",
});

for (const [key, value] of Object.entries(i18n.en)) {
  if (!(key in i18n.zh)) i18n.zh[key] = value;
}

let uiLanguage = localStorage.getItem("uiLanguage") || "en";
let sourceLanguage = localStorage.getItem("sourceLanguage") || "auto";
let targetLanguage = localStorage.getItem("targetLanguage") || "en";
let debugMode = false;
let pc;
let dc;
let micStream;
let micTrack;
let remoteAudio;
let audioContext;
let remoteSource;
let stereoPanner;
let mediaRecorder;
let recordedChunks = [];
let debugConnected = false;
let playbackUrl = "";
let currentTranslation = "";
let autoListening = false;
let stereoRouting = false;
let paused = false;
let pendingAutoListen = false;
let nextOutputPan = 0;
let selectedInputDeviceId = "";
let selectedOutputDeviceId = "";
let selectedInputLabel = "";
let nativeInputDeviceId = "";
let nativeInputActive = false;
let nativeInputSending = false;
const isAndroidApp = Boolean(window.AndroidBridge);
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function t(key, vars = {}) {
  const template = i18n[uiLanguage]?.[key] || i18n.en[key] || key;
  return Object.entries(vars).reduce(
    (text, [name, value]) => text.replaceAll(`{${name}}`, String(value)),
    template,
  );
}

function languageName(code, locale = uiLanguage) {
  const language = languages.find((item) => item.code === code);
  return language?.[locale] || language?.en || code;
}

function populateLanguageSelects() {
  const previousSource = sourceLanguageSelect.value || sourceLanguage;
  const previousTarget = targetLanguageSelect.value || targetLanguage;
  sourceLanguageSelect.replaceChildren();
  targetLanguageSelect.replaceChildren();

  for (const language of languages) {
    sourceLanguageSelect.append(new Option(languageName(language.code), language.code));
    if (!language.sourceOnly) {
      targetLanguageSelect.append(new Option(languageName(language.code), language.code));
    }
  }

  sourceLanguage = languages.some((item) => item.code === previousSource) ? previousSource : "auto";
  targetLanguage = languages.some((item) => !item.sourceOnly && item.code === previousTarget) ? previousTarget : "en";
  if (sourceLanguage !== "auto" && sourceLanguage === targetLanguage) {
    targetLanguage = targetLanguage === "en" ? "zh" : "en";
  }
  sourceLanguageSelect.value = sourceLanguage;
  targetLanguageSelect.value = targetLanguage;
}

function applyI18n() {
  document.documentElement.lang = uiLanguage === "zh" ? "zh-CN" : "en";
  uiLanguageSelect.value = uiLanguage;
  populateLanguageSelects();
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });
  debugModeButton.classList.toggle("active", debugMode);
  connectButton.textContent = isConnected() ? t("disconnect") : t("connect");
  if (!isConnected()) setStatus(t("statusDisconnected"));
  talkButton.setAttribute("aria-label", autoListening ? t("pauseAria") : t("holdAria"));
  refreshAudioDevices();
}

function setStatus(text, state = "") {
  statusEl.textContent = text;
  statusEl.className = `status ${state}`.trim();
}

function logEvent(event) {
  const line = `[${new Date().toLocaleTimeString()}] ${event.type}`;
  eventLog.textContent = `${line}\n${eventLog.textContent}`.slice(0, 7000);
}

function logDebug(type, details = {}) {
  const event = { type, ...details };
  const serialized = JSON.stringify(event);
  eventLog.textContent = `[${new Date().toLocaleTimeString()}] ${serialized}\n${eventLog.textContent}`.slice(0, 7000);
  try {
    window.AndroidBridge?.log?.(serialized, "");
  } catch {
    // Native log forwarding is best-effort diagnostics only.
  }
}

function updateTranslationSelection({ reconnectHint = true } = {}) {
  localStorage.setItem("sourceLanguage", sourceLanguage);
  localStorage.setItem("targetLanguage", targetLanguage);
  if (isConnected()) {
    disconnect();
    if (reconnectHint) hint.textContent = t("modeChanged");
  }
}

function isDebugMode() {
  return debugMode;
}

function isConnected() {
  return Boolean(pc || debugConnected);
}

function shouldUseNativeInput() {
  return isAndroidApp && !isDebugMode() && Boolean(nativeInputDeviceId);
}

function inputReady() {
  return shouldUseNativeInput() ? nativeInputActive : Boolean(micTrack);
}

function cleanupMedia() {
  if (micTrack) micTrack.stop();
  if (micStream) micStream.getTracks().forEach((track) => track.stop());
  micTrack = null;
  micStream = null;
}

async function warmUpBrowserDefaultInput() {
  if (!isAndroidApp || isDebugMode() || !navigator.mediaDevices?.getUserMedia) return false;
  let warmupStream;
  try {
    warmupStream = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true,
      },
    });
    logDebug("audio.browser_warmup", {
      ok: true,
      tracks: warmupStream.getAudioTracks().map((track) => ({
        label: track.label || "(no label)",
        settings: track.getSettings ? track.getSettings() : {},
      })),
    });
    return true;
  } catch (error) {
    logDebug("audio.browser_warmup", {
      ok: false,
      error: error.message,
    });
    return false;
  } finally {
    warmupStream?.getTracks().forEach((track) => track.stop());
  }
}

function resetConnectedControls() {
  autoListening = false;
  talkButton.disabled = true;
  autoListenButton.disabled = true;
  autoListenButton.classList.remove("active");
  autoListenButton.setAttribute("aria-pressed", "false");
  talkButton.classList.remove("recording", "auto-listening");
  micIcon.textContent = "🎙";
}

function disconnect(options = {}) {
  const keepPaused = Boolean(options.keepPaused);
  if (mediaRecorder?.state === "recording") {
    mediaRecorder.onstop = null;
    mediaRecorder.stop();
  }
  if (dc) dc.close();
  if (pc) pc.close();
  if (remoteSource) remoteSource.disconnect();
  if (stereoPanner) stereoPanner.disconnect();
  if (remoteAudio) remoteAudio.remove();
  if (playbackUrl) URL.revokeObjectURL(playbackUrl);
  stopNativeInputStream();
  cleanupMedia();
  pc = null;
  dc = null;
  mediaRecorder = null;
  recordedChunks = [];
  debugConnected = false;
  remoteAudio = null;
  remoteSource = null;
  stereoPanner = null;
  playbackUrl = "";
  resetConnectedControls();
  connectButton.disabled = false;
  connectButton.textContent = t("connect");

  if (keepPaused) {
    paused = true;
    talkButton.disabled = false;
    talkButton.classList.add("paused");
    talkButton.setAttribute("aria-label", t("resumedAria"));
    micIcon.textContent = "▶";
    setStatus(t("statusPaused"), "paused");
    translationText.textContent = t("pausedText");
    hint.textContent = t("pausedHint");
  } else {
    paused = false;
    pendingAutoListen = false;
    talkButton.classList.remove("paused");
    talkButton.setAttribute("aria-label", t("holdAria"));
    setStatus(t("statusDisconnected"));
  }
}

function selectedInputConstraint() {
  const deviceId = selectedInputDeviceId;
  const constraint = {
    echoCancellation: true,
    noiseSuppression: true,
    autoGainControl: true,
    ...(deviceId ? { deviceId: { exact: deviceId } } : {}),
  };
  logDebug("audio.input_constraint", {
    selectedInputDeviceId: deviceId || "default",
    selectedInputLabel: inputDeviceSelect.selectedOptions[0]?.textContent || "",
    constraint,
  });
  return constraint;
}

function shouldRetryConnect(error) {
  const message = String(error?.message || "");
  return !/api key|client secret|当前浏览器不支持|Missing OpenAI|browser does not support/i.test(message);
}

function formatSettingValue(item) {
  const value = item.current ?? "";
  return item.unit ? `${value} ${item.unit}` : String(value);
}

function renderSettings(config) {
  if (!settingsList) return;
  const items = config?.tunable || [];
  if (!items.length) {
    settingsList.replaceChildren();
    const row = document.createElement("div");
    const name = document.createElement("dt");
    const detail = document.createElement("dd");
    name.textContent = t("noConfig");
    detail.textContent = t("noConfigDetail");
    row.append(name, detail);
    settingsList.append(row);
    return;
  }

  settingsList.replaceChildren();
  for (const item of items) {
    const row = document.createElement("div");
    const name = document.createElement("dt");
    const detail = document.createElement("dd");
    const note = document.createElement("span");
    name.textContent = item.env;
    detail.textContent = t("currentDefault", {
      current: formatSettingValue(item),
      default: `${item.default}${item.unit ? ` ${item.unit}` : ""}`,
    });
    note.textContent = item.note || "";
    detail.append(document.createElement("br"), note);
    row.append(name, detail);
    settingsList.append(row);
  }
}

async function loadSettings() {
  try {
    const response = await fetch("/api/config");
    const config = await response.json();
    if (!response.ok) throw new Error(config.error || t("readConfigFailed"));
    renderSettings(config);
  } catch (error) {
    renderSettings({
      tunable: [{
        env: t("configFailed"),
        current: error.message,
        default: "",
        note: t("configFailedNote"),
      }],
    });
  }
}

async function connect(options = {}) {
  const retries = options.retries ?? 1;
  connectButton.disabled = true;
  connectButton.textContent = t("connecting");
  setStatus(t("statusConnecting"));
  hint.textContent = isDebugMode() ? t("requestingMicOnly") : t("requestingMic");

  try {
    if (isDebugMode()) {
      await connectDebug();
      return;
    }

    if (isAndroidApp) {
      const hasKey = await androidCall("hasApiKey");
      if (!hasKey) {
        throw new Error(t("missingKey"));
      }
    }

    const tokenResponse = await fetch(
      `/api/session?source=${encodeURIComponent(sourceLanguage)}&target=${encodeURIComponent(targetLanguage)}`,
    );
    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok) {
      throw new Error(tokenData.error?.message || tokenData.error || t("createSessionFailed"));
    }

    const ephemeralKey = tokenData.value || tokenData.client_secret?.value;
    if (!ephemeralKey) {
      throw new Error(t("noClientSecret"));
    }

    pc = new RTCPeerConnection();
    dc = pc.createDataChannel("oai-events");
    currentTranslation = "";
    translationText.textContent = t("waitingForOutput");
    sourceText.textContent = t("waitingForSpeech");

    remoteAudio = document.createElement("audio");
    remoteAudio.autoplay = true;
    document.body.append(remoteAudio);
    setupAudioRouting();
    await applyOutputDevice();

    pc.ontrack = (event) => {
      remoteAudio.srcObject = event.streams[0];
      remoteAudio.play().catch(() => {});
    };

    dc.addEventListener("open", () => {
      paused = false;
      setStatus(t("statusConnected"), "ready");
      talkButton.disabled = false;
      talkButton.classList.remove("paused");
      talkButton.setAttribute("aria-label", t("holdAria"));
      autoListenButton.disabled = false;
      connectButton.textContent = t("disconnect");
      connectButton.disabled = false;
      hint.textContent = shouldUseNativeInput()
        ? t("readyHintNative")
        : t("readyHint");
      if (pendingAutoListen) {
        pendingAutoListen = false;
        setAutoListening(true);
      }
    });

    dc.addEventListener("message", (message) => {
      const event = JSON.parse(message.data);
      logEvent(event);
      handleRealtimeEvent(event);
    });

    await refreshAudioDevices();
    if (shouldUseNativeInput()) {
      pc.addTransceiver("audio", { direction: "recvonly" });
      const nativeStarted = await androidCall("startInputStream", nativeInputDeviceId);
      if (!nativeStarted?.ok) {
        throw new Error(`${t("nativeStartFailed")}: ${nativeStarted?.error || "Unknown error"}`);
      }
      nativeInputActive = true;
      logDebug("native_input.start", nativeStarted);
    } else {
      micStream = await navigator.mediaDevices.getUserMedia({
        audio: selectedInputConstraint(),
      });
      await refreshAudioDevices();
      micTrack = micStream.getAudioTracks()[0];
      reportActiveInputDevice("realtime");
      micTrack.enabled = false;
      pc.addTrack(micTrack, micStream);
    }

    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);

    const sdpResponse = await fetch("https://api.openai.com/v1/realtime/calls", {
      method: "POST",
      body: offer.sdp,
      headers: {
        Authorization: `Bearer ${ephemeralKey}`,
        "Content-Type": "application/sdp",
      },
    });

    if (!sdpResponse.ok) {
      throw new Error(await sdpResponse.text());
    }

    await pc.setRemoteDescription({
      type: "answer",
      sdp: await sdpResponse.text(),
    });
  } catch (error) {
    disconnect();
    if (retries > 0 && shouldRetryConnect(error)) {
      setStatus(t("statusRetrying"));
      hint.textContent = `${t("createSessionFailed")}, ${t("statusRetrying").toLowerCase()}: ${error.message}`;
      await delay(650);
      return connect({ retries: retries - 1 });
    }
    setStatus(t("statusError"), "error");
    hint.textContent = error.message;
  }
}

async function connectDebug() {
  if (!window.MediaRecorder) {
    throw new Error(t("localRecordingUnsupported"));
  }

  micStream = await navigator.mediaDevices.getUserMedia({
    audio: selectedInputConstraint(),
  });
  await refreshAudioDevices();
  micTrack = micStream.getAudioTracks()[0];
  reportActiveInputDevice("debug");
  micTrack.enabled = false;

  remoteAudio = document.createElement("audio");
  remoteAudio.autoplay = true;
  remoteAudio.addEventListener("ended", () => {
    if (!isDebugMode() || !debugConnected) return;
    translationText.textContent = t("playbackDone");
    hint.textContent = t("playbackDoneHint");
  });
  document.body.append(remoteAudio);
  setupAudioRouting();
  await applyOutputDevice();

  debugConnected = true;
  paused = false;
  currentTranslation = "";
  sourceText.textContent = t("sourceExpected");
  translationText.textContent = t("testReleasePlayback");
  setStatus(t("statusTestMode"), "ready");
  talkButton.disabled = false;
  talkButton.classList.remove("paused");
  talkButton.setAttribute("aria-label", t("holdAria"));
  autoListenButton.disabled = true;
  connectButton.textContent = t("disconnect");
  connectButton.disabled = false;
  hint.textContent = t("micTestHint");
}

function handleRealtimeEvent(event) {
  if (event.type === "input_audio_buffer.speech_started" && autoListening) {
    currentTranslation = "";
    nextOutputPan = 0;
    applyOutputPan();
    translationText.textContent = t("listening");
    hint.textContent = t("detectedSpeech");
  }

  if (event.type === "input_audio_buffer.speech_stopped" && autoListening) {
    hint.textContent = t("detectedPause");
  }

  if (event.type === "conversation.item.input_audio_transcription.completed") {
    sourceText.textContent = event.transcript || t("noTranscript");
    nextOutputPan = detectPanForTranscript(event.transcript || "");
  }

  if (event.type === "response.output_audio_transcript.delta") {
    currentTranslation += event.delta || "";
    nextOutputPan = detectPanForOutput(currentTranslation);
    applyOutputPan();
    translationText.textContent = currentTranslation || t("translating");
  }

  if (event.type === "response.output_audio_transcript.done") {
    currentTranslation = event.transcript || currentTranslation;
    translationText.textContent = currentTranslation || t("translated");
  }

  if (event.type === "response.created") {
    currentTranslation = "";
    translationText.textContent = t("translating");
    applyOutputPan();
  }

  if (event.type === "error") {
    setStatus(t("statusError"), "error");
    hint.textContent = event.error?.message || "Realtime API error";
  }
}

function detectPanForTranscript(transcript) {
  if (!stereoRouting || !transcript) return 0;
  return /[\u3400-\u9fff]/.test(transcript) ? 1 : -1;
}

function detectPanForOutput(text) {
  if (!stereoRouting || !text) return nextOutputPan;
  return /[\u3400-\u9fff]/.test(text) ? -1 : 1;
}

function setupAudioRouting() {
  if (!window.AudioContext && !window.webkitAudioContext) return;
  audioContext = audioContext || new (window.AudioContext || window.webkitAudioContext)();
  if (!remoteAudio || remoteSource) return;
  remoteSource = audioContext.createMediaElementSource(remoteAudio);
  stereoPanner = audioContext.createStereoPanner();
  remoteSource.connect(stereoPanner).connect(audioContext.destination);
  applyOutputPan();
}

function applyOutputPan() {
  if (!stereoPanner) return;
  stereoPanner.pan.value = stereoRouting ? nextOutputPan : 0;
}

function startTalking(event) {
  if (paused || !inputReady() || talkButton.disabled || autoListening) return;
  event.preventDefault();
  currentTranslation = "";
  translationText.textContent = isDebugMode() ? t("recording") : t("waitingForYou");
  if (shouldUseNativeInput()) {
    nativeInputSending = true;
  } else {
    micTrack.enabled = true;
  }
  talkButton.classList.add("recording");
  hint.textContent = isDebugMode() ? t("recordingHint") : t("listeningHint");

  if (isDebugMode()) {
    startDebugRecording();
  }
}

function stopTalking(event) {
  if (paused || !inputReady() || talkButton.disabled || autoListening) return;
  event.preventDefault();
  if (shouldUseNativeInput()) {
    nativeInputSending = false;
  } else {
    micTrack.enabled = false;
  }
  talkButton.classList.remove("recording");
  if (isDebugMode()) {
    stopDebugRecording();
    return;
  }
  if (shouldUseNativeInput()) {
    sendRealtimeEvent({ type: "input_audio_buffer.commit" });
    sendRealtimeEvent({ type: "response.create" });
  }
  hint.textContent = t("processing");
}

function startDebugRecording() {
  if (!micStream || mediaRecorder?.state === "recording") return;
  if (playbackUrl) {
    URL.revokeObjectURL(playbackUrl);
    playbackUrl = "";
  }
  recordedChunks = [];
  mediaRecorder = new MediaRecorder(micStream);
  mediaRecorder.addEventListener("dataavailable", (event) => {
    if (event.data.size > 0) recordedChunks.push(event.data);
  });
  mediaRecorder.addEventListener("stop", () => {
    playDebugRecording();
  });
  mediaRecorder.start();
  sourceText.textContent = t("recording");
}

function stopDebugRecording() {
  if (mediaRecorder?.state === "recording") {
    hint.textContent = t("preparingPlayback");
    mediaRecorder.stop();
  } else {
    hint.textContent = t("nothingRecorded");
  }
}

function playDebugRecording() {
  if (!recordedChunks.length || !remoteAudio) {
    sourceText.textContent = t("noAudio");
    translationText.textContent = t("checkMic");
    hint.textContent = t("checkMicHint");
    return;
  }

  const recording = new Blob(recordedChunks, { type: mediaRecorder?.mimeType || "audio/webm" });
  playbackUrl = URL.createObjectURL(recording);
  remoteAudio.srcObject = null;
  remoteAudio.src = playbackUrl;
  remoteAudio.currentTime = 0;
  sourceText.textContent = t("gotMicAudio");
  translationText.textContent = t("playingRecording");
  hint.textContent = t("playingRecordingHint");
  remoteAudio.play().catch((error) => {
    hint.textContent = `${t("playbackFailed")}: ${error.message}`;
  });
}

function setAutoListening(nextValue) {
  if (!inputReady() || autoListenButton.disabled) return;
  autoListening = nextValue;
  if (shouldUseNativeInput()) {
    nativeInputSending = autoListening;
  } else {
    micTrack.enabled = autoListening;
  }
  autoListenButton.classList.toggle("active", autoListening);
  autoListenButton.setAttribute("aria-pressed", String(autoListening));
  talkButton.classList.toggle("auto-listening", autoListening);
  talkButton.classList.remove("recording");
  talkButton.setAttribute("aria-label", autoListening ? t("pauseAria") : t("holdAria"));
  micIcon.textContent = autoListening ? "⏸" : "🎙";

  if (autoListening) {
    currentTranslation = "";
    hint.textContent = shouldUseNativeInput()
      ? t("autoListenNative")
      : t("autoListenOn");
    translationText.textContent = t("listening");
  } else {
    hint.textContent = t("autoListenOff");
    translationText.textContent = t("waitingForOutput");
  }
}

function pauseAutoListening() {
  if (!autoListening) return;
  pendingAutoListen = true;
  disconnect({ keepPaused: true });
}

async function resumeAutoListening() {
  if (!paused) return;
  pendingAutoListen = true;
  await connect({ retries: 1 });
}

function setStereoRouting(nextValue) {
  stereoRouting = nextValue;
  stereoButton.classList.toggle("active", stereoRouting);
  stereoButton.setAttribute("aria-pressed", String(stereoRouting));
  if (!stereoRouting) nextOutputPan = 0;
  applyOutputPan();
  hint.textContent = stereoRouting
    ? t("stereoOn")
    : t("stereoOff");
}

function deviceLabel(device, fallback) {
  return device.label || fallback;
}

function replaceOptions(select, devices, defaultLabel) {
  const currentValue = select.value;
  select.replaceChildren(new Option(defaultLabel, ""));
  devices.forEach((device, index) => {
    select.append(new Option(deviceLabel(device, `${defaultLabel} ${index + 1}`), device.deviceId));
  });
  if ([...select.options].some((option) => option.value === currentValue)) {
    select.value = currentValue;
  }
}

function restoreInputSelectionByLabel() {
  if (!selectedInputDeviceId || [...inputDeviceSelect.options].some((option) => option.value === selectedInputDeviceId)) {
    return;
  }
  const normalizedLabel = selectedInputLabel.trim().toLowerCase();
  if (!normalizedLabel) return;
  const matchedOption = [...inputDeviceSelect.options].find((option) => {
    const label = option.textContent.trim().toLowerCase();
    return label === normalizedLabel || label.includes(normalizedLabel) || normalizedLabel.includes(label);
  });
  if (!matchedOption) return;
  selectedInputDeviceId = matchedOption.value;
  inputDeviceSelect.value = selectedInputDeviceId;
  logDebug("audio.input_remapped_by_label", {
    selectedInputLabel,
    selectedInputDeviceId,
  });
}

async function refreshAudioDevices() {
  if (!navigator.mediaDevices?.enumerateDevices) return;
  const devices = await navigator.mediaDevices.enumerateDevices();
  const browserInputs = devices.filter((device) => device.kind === "audioinput");
  logDebug("audio.devices", {
    inputs: browserInputs
      .map((device) => ({
        label: device.label || "(no label)",
        deviceId: device.deviceId,
        groupId: device.groupId,
      })),
  });
  if (isAndroidApp) {
    const nativeInputs = (await androidCall("listAudioDevices", "input")) || [];
    const nativeWirelessMic = nativeInputs.find((device) => /wireless mic rx|dji/i.test(device.label || ""));
    nativeInputDeviceId = nativeWirelessMic?.deviceId || "";
    logDebug("android.audio.inputs", {
      inputs: nativeInputs.map((device) => ({
        label: device.label || "(no label)",
        deviceId: device.deviceId,
      })),
    });
    if (nativeInputTestButton) {
      nativeInputTestButton.hidden = !nativeWirelessMic;
      nativeInputTestButton.dataset.deviceId = nativeWirelessMic?.deviceId || "";
      nativeInputTestButton.textContent = nativeWirelessMic
        ? t("nativeTestNamed", { label: nativeWirelessMic.label })
        : t("nativeTest");
    }
    const nativeHasWirelessMic = Boolean(nativeWirelessMic);
    const browserHasWirelessMic = browserInputs.some((device) => /wireless mic rx|dji/i.test(device.label || ""));
    if (nativeHasWirelessMic && !browserHasWirelessMic) {
      hint.textContent = t("nativeInputUnavailable");
    }
  }
  replaceOptions(
    inputDeviceSelect,
    browserInputs,
    isAndroidApp ? t("browserDefaultInput") : t("systemDefaultInput"),
  );
  restoreInputSelectionByLabel();
  replaceOptions(
    outputDeviceSelect,
    isAndroidApp
      ? ((await androidCall("listAudioDevices", "output")) || [])
      : devices.filter((device) => device.kind === "audiooutput"),
    isAndroidApp ? t("androidDefaultOutput") : t("systemDefaultOutput"),
  );
  inputDeviceSelect.value = selectedInputDeviceId;
  outputDeviceSelect.value = selectedOutputDeviceId;
}

function reportActiveInputDevice(context) {
  if (!micTrack) return;
  const settings = micTrack.getSettings ? micTrack.getSettings() : {};
  const selectedOption = inputDeviceSelect.selectedOptions[0];
  const selectedLabel = selectedOption?.textContent || t("defaultInput");
  const actualDeviceId = settings.deviceId || "";
  const selectedDeviceId = selectedInputDeviceId || "";
  const matched =
    !selectedDeviceId ||
    !actualDeviceId ||
    actualDeviceId === selectedDeviceId;

  logDebug("audio.active_input", {
    context,
    selectedLabel,
    selectedDeviceId: selectedDeviceId || "default",
    actualDeviceId: actualDeviceId || "(not reported)",
    settings,
    matched,
  });

  if (selectedDeviceId && actualDeviceId && actualDeviceId !== selectedDeviceId) {
    hint.textContent = t("inputMismatch", { label: selectedLabel });
  } else if (selectedDeviceId) {
    hint.textContent = t("activeWebViewInput", { label: selectedLabel });
  }
}

async function applyOutputDevice() {
  if (isAndroidApp) {
    await selectAndroidAudioDevice(`output:${selectedOutputDeviceId}`);
    return;
  }
  try {
    if (audioContext?.setSinkId) {
      await audioContext.setSinkId(selectedOutputDeviceId || "");
    }
    if (remoteAudio?.setSinkId) {
      await remoteAudio.setSinkId(selectedOutputDeviceId);
    } else if (selectedOutputDeviceId && !isAndroidApp) {
      hint.textContent = t("outputUnsupported");
    }
  } catch (error) {
    hint.textContent = `${t("outputFailed")}: ${error.message}`;
  }
}

async function selectAndroidAudioDevice(value) {
  if (!isAndroidApp) return true;
  let selected = false;
  for (let attempt = 0; attempt < 3; attempt += 1) {
    selected = Boolean(await androidCall("selectAudioDevice", value));
    if (selected) return true;
    await delay(180 * (attempt + 1));
  }
  hint.textContent = t("routeMaybeFailed");
  return false;
}

function androidCall(method, value = "") {
  return new Promise((resolve, reject) => {
    if (!window.AndroidBridge?.[method]) {
      resolve(null);
      return;
    }
    const callbackName = `androidCallback_${Date.now()}_${Math.random().toString(16).slice(2)}`;
    window[callbackName] = (result) => {
      delete window[callbackName];
      try {
        resolve(JSON.parse(result));
      } catch {
        resolve(result);
      }
    };
    try {
      window.AndroidBridge[method](String(value), callbackName);
    } catch (error) {
      delete window[callbackName];
      reject(error);
    }
  });
}

function sendRealtimeEvent(event) {
  if (dc?.readyState !== "open") return false;
  dc.send(JSON.stringify(event));
  return true;
}

function stopNativeInputStream() {
  nativeInputSending = false;
  nativeInputActive = false;
  if (isAndroidApp) {
    androidCall("stopInputStream").catch(() => {});
  }
}

window.__androidNativeAudioChunk = (audio) => {
  if (!nativeInputSending || dc?.readyState !== "open") return;
  sendRealtimeEvent({
    type: "input_audio_buffer.append",
    audio,
  });
};

window.__androidNativeAudioStatus = (payload) => {
  try {
    logDebug("android.native_input_status", JSON.parse(payload));
  } catch {
    logDebug("android.native_input_status", { payload });
  }
};

async function initAndroidKeyControls() {
  if (!isAndroidApp) return;
  keyRow.hidden = false;
  const hasKey = await androidCall("hasApiKey");
  apiKeyInput.placeholder = hasKey ? t("keySavedPlaceholder") : t("keyPlaceholder");
}

uiLanguageSelect.addEventListener("change", () => {
  uiLanguage = uiLanguageSelect.value;
  localStorage.setItem("uiLanguage", uiLanguage);
  applyI18n();
  loadSettings();
});

sourceLanguageSelect.addEventListener("change", () => {
  sourceLanguage = sourceLanguageSelect.value;
  if (sourceLanguage !== "auto" && sourceLanguage === targetLanguage) {
    targetLanguage = targetLanguage === "en" ? "zh" : "en";
    targetLanguageSelect.value = targetLanguage;
  }
  updateTranslationSelection();
});

targetLanguageSelect.addEventListener("change", () => {
  targetLanguage = targetLanguageSelect.value;
  if (sourceLanguage !== "auto" && sourceLanguage === targetLanguage) {
    sourceLanguage = "auto";
    sourceLanguageSelect.value = sourceLanguage;
  }
  updateTranslationSelection();
});

swapLanguageButton.addEventListener("click", () => {
  if (sourceLanguage === "auto") {
    sourceLanguage = targetLanguage === "en" ? "zh" : "en";
  }
  const nextSource = targetLanguage;
  const nextTarget = sourceLanguage;
  sourceLanguage = nextSource;
  targetLanguage = nextTarget;
  sourceLanguageSelect.value = sourceLanguage;
  targetLanguageSelect.value = targetLanguage;
  updateTranslationSelection();
});

debugModeButton.addEventListener("click", () => {
  debugMode = !debugMode;
  debugModeButton.classList.toggle("active", debugMode);
  if (isConnected()) {
    disconnect();
    hint.textContent = t("modeChanged");
  }
});

connectButton.addEventListener("click", () => {
  if (isConnected()) {
    disconnect();
    hint.textContent = t("disconnectedHint");
    return;
  }
  connect({ retries: 1 });
});

autoListenButton.addEventListener("click", () => {
  setAutoListening(!autoListening);
});

stereoButton.addEventListener("click", () => {
  setStereoRouting(!stereoRouting);
});

inputDeviceSelect.addEventListener("change", async () => {
  selectedInputDeviceId = inputDeviceSelect.value;
  selectedInputLabel = inputDeviceSelect.selectedOptions[0]?.textContent || "";
  if (isConnected()) {
    const resumeAuto = autoListening;
    disconnect();
    pendingAutoListen = resumeAuto;
    connect({ retries: 1 });
  } else {
    hint.textContent = isAndroidApp
      ? t("selectedInputAndroid")
      : t("selectedInput");
  }
});

outputDeviceSelect.addEventListener("change", async () => {
  selectedOutputDeviceId = outputDeviceSelect.value;
  await applyOutputDevice();
  hint.textContent = t("selectedOutput");
});

nativeInputTestButton?.addEventListener("click", async () => {
  const deviceId = nativeInputTestButton.dataset.deviceId;
  if (!deviceId) return;
  nativeInputTestButton.disabled = true;
  hint.textContent = t("nativeTestRunning");
  try {
    const result = await androidCall("testInputDevice", deviceId);
    logDebug("android.input_test", result || {});
    if (!result?.ok) {
      hint.textContent = `${t("nativeTestFailed")}: ${result?.error || "Unknown error"}`;
    } else if (result.routed?.deviceId !== result.requested?.deviceId) {
      hint.textContent = t("nativeWrongRoute", { label: result.routed?.label || "Unknown" });
    } else if (Number(result.peak || 0) < 0.01) {
      hint.textContent = t("nativeLowLevel");
    } else {
      hint.textContent = t("nativeOk", { peak: Number(result.peak).toFixed(3) });
    }
  } catch (error) {
    hint.textContent = `${t("nativeException")}: ${error.message}`;
  } finally {
    nativeInputTestButton.disabled = false;
  }
});

saveKeyButton.addEventListener("click", async () => {
  const key = apiKeyInput.value.trim();
  if (!key) {
    hint.textContent = t("enterKey");
    return;
  }
  await androidCall("saveApiKey", key);
  apiKeyInput.value = "";
  apiKeyInput.placeholder = t("keySavedPlaceholder");
  hint.textContent = t("keySaved");
});

talkButton.addEventListener("click", () => {
  if (paused) {
    resumeAutoListening();
  } else if (autoListening) {
    pauseAutoListening();
  }
});
talkButton.addEventListener("pointerdown", startTalking);
talkButton.addEventListener("pointerup", stopTalking);
talkButton.addEventListener("pointercancel", stopTalking);
talkButton.addEventListener("pointerleave", (event) => {
  if (talkButton.classList.contains("recording")) stopTalking(event);
});

navigator.mediaDevices?.addEventListener?.("devicechange", refreshAudioDevices);
window.addEventListener("beforeunload", () => disconnect());
window.realtimeTranslateDisconnect = () => {
  disconnect();
  hint.textContent = t("backgroundDisconnected");
};
async function initializeAudioDevices() {
  await refreshAudioDevices();
  if (isAndroidApp) {
    await warmUpBrowserDefaultInput();
    await delay(160);
    await refreshAudioDevices();
  }
}

populateLanguageSelects();
applyI18n();
initAndroidKeyControls();
initializeAudioDevices();
loadSettings();
