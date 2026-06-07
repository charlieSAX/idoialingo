// ─────────────────────────────────────────────────────────────────────────────
// Cantonese audio via the Web Speech API (zh-HK), tuned for iOS Safari:
//  • speak() must follow a user gesture → we prime the engine on first tap.
//  • The hardware silent switch mutes Safari TTS → one-time hint elsewhere.
//  • Voices load asynchronously → cache on `voiceschanged`.
// ─────────────────────────────────────────────────────────────────────────────

const CANTO_RE = /zh.?HK|yue|cantonese|sin.?ji/i;

let voices: SpeechSynthesisVoice[] = [];
let preferredURI: string | null = null;
let primed = false;

function refresh() {
  try {
    voices = window.speechSynthesis?.getVoices() ?? [];
  } catch {
    voices = [];
  }
}

export function initSpeech(savedVoiceURI: string | null) {
  preferredURI = savedVoiceURI;
  refresh();
  try {
    window.speechSynthesis.onvoiceschanged = refresh;
  } catch {
    /* no speech support */
  }
  // Prime on the very first user gesture so iOS lets later speak() calls play.
  const prime = () => {
    if (primed) return;
    primed = true;
    try {
      const u = new SpeechSynthesisUtterance(' ');
      u.volume = 0;
      window.speechSynthesis.speak(u);
    } catch {
      /* ignore */
    }
    window.removeEventListener('pointerdown', prime);
  };
  window.addEventListener('pointerdown', prime, { once: true });
}

export function setPreferredVoice(uri: string | null) {
  preferredURI = uri;
}

export function cantoneseVoices(): SpeechSynthesisVoice[] {
  refresh();
  const canto = voices.filter((v) => CANTO_RE.test(`${v.lang} ${v.name}`));
  const zh = voices.filter((v) => /^zh/i.test(v.lang) && !canto.includes(v));
  return [...canto, ...zh];
}

export function hasCantoneseVoice(): boolean {
  refresh();
  return voices.some((v) => CANTO_RE.test(`${v.lang} ${v.name}`));
}

function pickVoice(): SpeechSynthesisVoice | undefined {
  refresh();
  if (preferredURI) {
    const chosen = voices.find((v) => v.voiceURI === preferredURI);
    if (chosen) return chosen;
  }
  return (
    voices.find((v) => CANTO_RE.test(`${v.lang} ${v.name}`)) ||
    voices.find((v) => /^zh/i.test(v.lang))
  );
}

/**
 * Speak Cantonese text. Optionally pass an element to pulse while speaking
 * (adds the `play` class, removes it when done).
 */
export function speak(text: string, el?: HTMLElement | null) {
  if (el) {
    el.classList.remove('play');
    void el.offsetWidth; // restart the CSS animation
    el.classList.add('play');
  }
  try {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'zh-HK';
    u.rate = 0.85;
    const v = pickVoice();
    if (v) u.voice = v;
    if (el) {
      u.onend = () => el.classList.remove('play');
      u.onerror = () => el.classList.remove('play');
    }
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  } catch {
    /* no speech support — UI still works silently */
  }
}

export function stopSpeaking() {
  try {
    window.speechSynthesis.cancel();
  } catch {
    /* ignore */
  }
}

export function isIOS(): boolean {
  const ua = navigator.userAgent;
  return /iPad|iPhone|iPod/.test(ua) || (ua.includes('Mac') && 'ontouchend' in document);
}
