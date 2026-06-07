export type Tone = 1 | 2 | 3 | 4 | 5 | 6;

export type HueKey =
  | 'jade'
  | 'mandarin'
  | 'pink'
  | 'violet'
  | 'azure'
  | 'amber'
  | 'teal'
  | 'coral';

export interface Vocab {
  id: string; // stable, e.g. "nei5hou2"
  trad: string; // 你好
  jyut: string; // "nei5 hou2" (space-separated syllables, tone numbers)
  en: string; // "Hello"
  emoji?: string; // "👋" (omit for abstract words)
  pos?: string; // optional part of speech
}

export interface Lesson {
  id: string;
  title: string; // "Hello & goodbye"
  newWords: string[]; // vocab ids introduced here
  reviewWords?: string[];
  xp?: number; // default 20
}

export interface Unit {
  id: string;
  index: number;
  title: string; // "Greetings"
  titleHan: string; // "問候"
  hue: HueKey;
  lessons: Lesson[];
}

export interface Level {
  id: string; // "C1"
  index: number; // 1
  title: string; // "Foundations"
  titleHan: string; // "入門"
  units: Unit[];
}

/** A word-bank sentence template. Tokens are tiles in correct order. */
export interface Sentence {
  /** tiles in answer order: traditional text + jyutping for each tile */
  tokens: { t: string; j: string }[];
  en: string;
  /** vocab ids that must be learned before this sentence may appear */
  needs: string[];
}

export type ExerciseType =
  | 'intro'
  | 'pickImage'
  | 'pickMeaning'
  | 'listenChoose'
  | 'pairs'
  | 'wordBank'
  | 'typeHeard';

export interface IntroEx {
  kind: 'intro';
  word: Vocab;
}
export interface PickImageEx {
  kind: 'pickImage';
  /**
   * Grid-choice exercise. Direction names are historical (kept for storage
   * compatibility): 'toEmoji' = show the character, pick the English meaning
   * from a 2×2 grid; 'toChar' = show English, pick the character.
   */
  dir: 'toEmoji' | 'toChar';
  word: Vocab;
  options: Vocab[]; // includes word, shuffled
}
export interface PickMeaningEx {
  kind: 'pickMeaning';
  /** 'toEn': show character+audio, pick English. 'toChar': show English, pick character. */
  dir: 'toEn' | 'toChar';
  word: Vocab;
  options: Vocab[];
}
export interface ListenChooseEx {
  kind: 'listenChoose';
  word: Vocab;
  options: Vocab[];
}
export interface PairsEx {
  kind: 'pairs';
  words: Vocab[]; // 3-4, all with emoji
}
export interface WordBankEx {
  kind: 'wordBank';
  /** typeHeard: no English prompt; audio only */
  heard: boolean;
  sentence: Sentence;
  bank: { t: string; j: string }[]; // answer tokens + distractor tiles, shuffled
}

export type Exercise =
  | IntroEx
  | PickImageEx
  | PickMeaningEx
  | ListenChooseEx
  | PairsEx
  | WordBankEx;

export interface WordStat {
  s: number; // strength 0..5
  seen: number;
  wrong: number;
  last: number; // ts
}

export interface Progress {
  onboarded: boolean;
  dailyGoalXp: number;
  xpTotal: number;
  gems: number;
  hearts: number; // persistent hearts (Challenge Mode)
  challenge: boolean;
  reduceMotion: boolean;
  voiceURI: string | null;
  streak: { count: number; lastDay: string | null; freezes: number };
  days: Record<string, number>; // 'YYYY-MM-DD' -> xp earned
  lessons: Record<string, { done: true; perfect: boolean }>;
  chests: Record<string, true>;
  srs: Record<string, WordStat>;
  flags: Record<string, true>; // one-time hints
}
