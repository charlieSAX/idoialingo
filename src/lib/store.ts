import { useSyncExternalStore } from 'react';
import type { Progress, WordStat } from '../types';
import { LEVELS, allLessons } from '../data';

// ─────────────────────────────────────────────────────────────────────────────
// Single localStorage-backed store. No backend, no accounts — the phone is the
// database. Includes the lightweight SRS, streak (with a gentle freeze),
// gems/chests and unlock logic.
// ─────────────────────────────────────────────────────────────────────────────

const KEY = 'idoialingo:v1';

const DEFAULTS: Progress = {
  onboarded: false,
  dailyGoalXp: 20,
  xpTotal: 0,
  gems: 0,
  hearts: 5,
  challenge: false,
  reduceMotion: false,
  voiceURI: null,
  streak: { count: 0, lastDay: null, freezes: 1 },
  days: {},
  lessons: {},
  chests: {},
  srs: {},
  flags: {}
};

function load(): Progress {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...DEFAULTS };
    const parsed = JSON.parse(raw) as Partial<Progress>;
    return {
      ...DEFAULTS,
      ...parsed,
      streak: { ...DEFAULTS.streak, ...(parsed.streak ?? {}) },
      days: parsed.days ?? {},
      lessons: parsed.lessons ?? {},
      chests: parsed.chests ?? {},
      srs: parsed.srs ?? {},
      flags: parsed.flags ?? {}
    };
  } catch {
    return { ...DEFAULTS };
  }
}

let state: Progress = load();
const listeners = new Set<() => void>();

function persist() {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* storage full / private mode — keep running in-memory */
  }
}

function emit() {
  persist();
  for (const fn of listeners) fn();
}

export function getState(): Progress {
  return state;
}

export function subscribe(fn: () => void): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function useProgress(): Progress {
  return useSyncExternalStore(subscribe, getState, getState);
}

function set(patch: Partial<Progress>) {
  state = { ...state, ...patch };
  emit();
}

// ── dates ───────────────────────────────────────────────────────────────────

export function dayKey(d = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${dd}`;
}

function daysBetween(a: string, b: string): number {
  return Math.round((Date.parse(b) - Date.parse(a)) / 86400000);
}

// ── actions ──────────────────────────────────────────────────────────────────

export const actions = {
  completeOnboarding(goal: number) {
    set({ onboarded: true, dailyGoalXp: goal });
  },

  setVoice(uri: string | null) {
    set({ voiceURI: uri });
  },

  setChallenge(on: boolean) {
    set({ challenge: on, hearts: on ? Math.max(state.hearts, 1) : 5 });
  },

  setReduceMotion(on: boolean) {
    set({ reduceMotion: on });
  },

  setFlag(flag: string) {
    set({ flags: { ...state.flags, [flag]: true } });
  },

  setDailyGoal(xp: number) {
    set({ dailyGoalXp: xp });
  },

  loseHeart() {
    if (state.challenge) set({ hearts: Math.max(0, state.hearts - 1) });
  },

  refillHearts(costGems: number): boolean {
    if (state.gems < costGems) return false;
    set({ gems: state.gems - costGems, hearts: 5 });
    return true;
  },

  /** New calendar day in Challenge Mode = friendly full refill. */
  dailyHeartRefill() {
    const today = dayKey();
    if (state.challenge && state.flags[`hearts:${today}`] !== true) {
      set({ hearts: 5, flags: { ...state.flags, [`hearts:${today}`]: true } });
    }
  },

  recordAnswer(vocabIds: string[], correct: boolean) {
    const srs = { ...state.srs };
    const now = Date.now();
    for (const id of vocabIds) {
      const cur: WordStat = srs[id] ?? { s: 0, seen: 0, wrong: 0, last: 0 };
      srs[id] = {
        s: Math.max(0, Math.min(5, cur.s + (correct ? 1 : -1))),
        seen: cur.seen + 1,
        wrong: cur.wrong + (correct ? 0 : 1),
        last: now
      };
    }
    state = { ...state, srs };
    emit();
  },

  /** Mark a word as introduced (intro cards count as a first sighting). */
  recordSeen(vocabId: string) {
    const cur: WordStat = state.srs[vocabId] ?? { s: 0, seen: 0, wrong: 0, last: 0 };
    state = {
      ...state,
      srs: { ...state.srs, [vocabId]: { ...cur, s: Math.max(cur.s, 1), seen: cur.seen + 1, last: Date.now() } }
    };
    emit();
  },

  completeLesson(lessonId: string, xp: number, perfect: boolean) {
    const today = dayKey();
    const bonus = perfect ? 5 : 0;
    const earned = xp + bonus;

    // streak with one gentle freeze (a single missed day doesn't reset)
    const s = { ...state.streak };
    if (s.lastDay !== today) {
      if (s.lastDay === null) {
        s.count = 1;
      } else {
        const gap = daysBetween(s.lastDay, today);
        if (gap === 1) s.count += 1;
        else if (gap === 2 && s.freezes > 0) {
          s.freezes -= 1;
          s.count += 1;
        } else s.count = 1;
      }
      s.lastDay = today;
      // earn a freeze back every 7-day milestone (cap 2)
      if (s.count > 0 && s.count % 7 === 0) s.freezes = Math.min(2, s.freezes + 1);
    }

    const prev = state.lessons[lessonId];
    set({
      xpTotal: state.xpTotal + earned,
      days: { ...state.days, [today]: (state.days[today] ?? 0) + earned },
      lessons: { ...state.lessons, [lessonId]: { done: true, perfect: perfect || (prev?.perfect ?? false) } },
      streak: s
    });
    return earned;
  },

  completePractise(xp: number) {
    const today = dayKey();
    set({
      xpTotal: state.xpTotal + xp,
      days: { ...state.days, [today]: (state.days[today] ?? 0) + xp }
    });
  },

  claimChest(unitId: string, gems: number) {
    if (state.chests[unitId]) return false;
    set({ chests: { ...state.chests, [unitId]: true }, gems: state.gems + gems });
    return true;
  },

  resetAll() {
    state = { ...DEFAULTS, streak: { ...DEFAULTS.streak }, days: {}, lessons: {}, chests: {}, srs: {}, flags: {} };
    emit();
  },

  /** Serialise all progress to a portable backup string. */
  exportProgress(): string {
    return JSON.stringify({ app: 'idoialingo', v: 1, exportedAt: new Date().toISOString(), data: state }, null, 2);
  },

  /**
   * Restore progress from a backup string produced by exportProgress.
   * Returns true on success. Merges over defaults so older/newer backups
   * stay forward-compatible.
   */
  importProgress(raw: string): boolean {
    try {
      const parsed = JSON.parse(raw);
      const data = (parsed?.app === 'idoialingo' && parsed.data ? parsed.data : parsed) as Partial<Progress>;
      if (!data || typeof data !== 'object' || !('lessons' in data)) return false;
      state = {
        ...DEFAULTS,
        ...data,
        streak: { ...DEFAULTS.streak, ...(data.streak ?? {}) },
        days: data.days ?? {},
        lessons: data.lessons ?? {},
        chests: data.chests ?? {},
        srs: data.srs ?? {},
        flags: data.flags ?? {}
      };
      emit();
      return true;
    } catch {
      return false;
    }
  }
};

// ── derived selectors ─────────────────────────────────────────────────────────

export function isLessonDone(p: Progress, lessonId: string): boolean {
  return p.lessons[lessonId]?.done === true;
}

export function isUnitDone(p: Progress, unitId: string): boolean {
  for (const level of LEVELS) {
    const unit = level.units.find((u) => u.id === unitId);
    if (unit) return unit.lessons.every((l) => isLessonDone(p, l.id));
  }
  return false;
}

/** The first not-yet-completed lesson in course order. Null → course finished. */
export function currentLessonId(p: Progress): string | null {
  for (const { lesson } of allLessons()) {
    if (!isLessonDone(p, lesson.id)) return lesson.id;
  }
  return null;
}

export type NodeState = 'done' | 'current' | 'locked';

export function lessonState(p: Progress, lessonId: string): NodeState {
  if (isLessonDone(p, lessonId)) return 'done';
  return currentLessonId(p) === lessonId ? 'current' : 'locked';
}

export function wordsLearned(p: Progress): number {
  return Object.values(p.srs).filter((w) => w.s > 0).length;
}

export function levelProgress(p: Progress, levelId: string): { done: number; total: number } {
  const level = LEVELS.find((l) => l.id === levelId);
  if (!level) return { done: 0, total: 1 };
  let done = 0;
  let total = 0;
  for (const u of level.units)
    for (const l of u.lessons) {
      total += 1;
      if (isLessonDone(p, l.id)) done += 1;
    }
  return { done, total };
}

/** Words due for practise: weakest strength first, then least recently seen. */
export function dueWords(p: Progress, max = 10): string[] {
  const entries = Object.entries(p.srs).filter(([, w]) => w.seen > 0);
  entries.sort((a, b) => a[1].s - b[1].s || a[1].last - b[1].last);
  return entries.slice(0, max).map(([id]) => id);
}
