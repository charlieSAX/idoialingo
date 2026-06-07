import type { Exercise, Sentence, Vocab } from '../types';
import { LEVELS, SENTENCES, VOCAB, findLesson, levelNewWords, unitWords } from '../data';
import type { Progress } from '../types';

// ─────────────────────────────────────────────────────────────────────────────
// The exercise engine. Content is a vocabulary bank + lesson groupings; this
// turns a lesson into a varied, playable sequence at runtime:
//   1. one intro per new word,
//   2. a recognition→recall mix of the six exercise types,
//   3. plausible distractors from the same unit (then level),
//   4. word-bank sentences once every component word has been met.
// ─────────────────────────────────────────────────────────────────────────────

function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function vocab(ids: string[]): Vocab[] {
  return ids.map((id) => VOCAB[id]).filter(Boolean);
}

/**
 * Sample distractors for `answer`: same unit first, then level, then course.
 * (Per Charlie's steer, exercises trade in characters ↔ English text — emoji
 * are no longer used as meaning carriers, so no emoji constraints here.)
 */
function distractors(answer: Vocab, unitIds: string[], levelIds: string[], n: number): Vocab[] {
  const seenEn = new Set<string>([answer.en]);
  const seenTrad = new Set<string>([answer.trad]);
  const out: Vocab[] = [];

  const consider = (v: Vocab) => {
    if (out.length >= n) return;
    if (v.id === answer.id) return;
    if (seenEn.has(v.en) || seenTrad.has(v.trad)) return;
    out.push(v);
    seenEn.add(v.en);
    seenTrad.add(v.trad);
  };

  for (const v of shuffle(vocab(unitIds))) consider(v);
  if (out.length < n) for (const v of shuffle(vocab(levelIds))) consider(v);
  if (out.length < n) for (const v of shuffle(Object.values(VOCAB))) consider(v);
  return out;
}

function choiceOptions(answer: Vocab, unitIds: string[], levelIds: string[], n: number): Vocab[] {
  return shuffle([answer, ...distractors(answer, unitIds, levelIds, n - 1)]);
}

/** One recognition exercise for a word (hear/see it → identify the meaning). */
function recognitionEx(w: Vocab, unitIds: string[], levelIds: string[]): Exercise {
  const roll = Math.random();
  if (roll < 0.4)
    return { kind: 'pickImage', dir: 'toEmoji', word: w, options: choiceOptions(w, unitIds, levelIds, 4) };
  if (roll < 0.7) return { kind: 'listenChoose', word: w, options: choiceOptions(w, unitIds, levelIds, 4) };
  return { kind: 'pickMeaning', dir: 'toEn', word: w, options: choiceOptions(w, unitIds, levelIds, 4) };
}

/** One recall exercise for a word (English meaning → produce the Cantonese). */
function recallEx(w: Vocab, unitIds: string[], levelIds: string[]): Exercise {
  if (Math.random() < 0.5)
    return { kind: 'pickImage', dir: 'toChar', word: w, options: choiceOptions(w, unitIds, levelIds, 4) };
  return { kind: 'pickMeaning', dir: 'toChar', word: w, options: choiceOptions(w, unitIds, levelIds, 4) };
}

function pairsEx(pool: Vocab[]): Exercise | null {
  const seen = new Set<string>();
  const words = shuffle(pool).filter((w) => {
    if (seen.has(w.en) || seen.has(w.trad)) return false;
    seen.add(w.en);
    seen.add(w.trad);
    return true;
  });
  if (words.length < 3) return null;
  return { kind: 'pairs', words: words.slice(0, Math.min(4, words.length)) };
}

function sentenceEx(s: Sentence, unitIds: string[], heard: boolean): Exercise {
  const inSentence = new Set(s.tokens.map((t) => t.t));
  const extras = shuffle(vocab(unitIds))
    .filter((v) => !inSentence.has(v.trad))
    .slice(0, Math.min(3, Math.max(2, 6 - s.tokens.length)))
    .map((v) => ({ t: v.trad, j: v.jyut }));
  return { kind: 'wordBank', heard, sentence: s, bank: shuffle([...s.tokens, ...extras]) };
}

/** Sentences whose every needed word has been met (or is in this lesson). */
function availableSentences(levelId: string, progress: Progress, lessonWordIds: string[]): Sentence[] {
  const pool = SENTENCES[levelId as 'C1' | 'C2' | 'C3'] ?? [];
  const known = new Set(lessonWordIds);
  for (const [id, w] of Object.entries(progress.srs)) if (w.seen > 0) known.add(id);
  return pool.filter((s) => s.needs.every((n) => known.has(n)));
}

/** Avoid the same word twice in a row. */
function spread(exs: Exercise[]): Exercise[] {
  const keyOf = (e: Exercise) =>
    e.kind === 'pairs' ? 'pairs' : e.kind === 'wordBank' ? 'sentence' : e.word.id;
  const a = exs.slice();
  for (let i = 1; i < a.length; i++) {
    if (keyOf(a[i]) === keyOf(a[i - 1])) {
      const j = a.findIndex((e, k) => k > i && keyOf(e) !== keyOf(a[i - 1]));
      if (j > 0) [a[i], a[j]] = [a[j], a[i]];
    }
  }
  return a;
}

export function generateLesson(lessonId: string, progress: Progress): Exercise[] {
  const ref = findLesson(lessonId);
  if (!ref) return [];
  const { lesson, unit, level, isCheckpoint } = ref;

  if (isCheckpoint) return generateReview(levelNewWords(level), level.id, progress, 11);

  const newWords = vocab(lesson.newWords);
  const reviewWords = vocab(lesson.reviewWords ?? []);
  const unitIds = unitWords(unit);
  const levelIds = ref.levelWordIds;
  const pool = [...newWords, ...reviewWords];

  const intros: Exercise[] = newWords.map((w) => ({ kind: 'intro', word: w }));

  // Graded target: roughly 8–12 per lesson.
  const target = Math.max(8, Math.min(12, newWords.length * 2 + 2));

  const recognition: Exercise[] = [];
  const recall: Exercise[] = [];
  for (const w of newWords) {
    recognition.push(recognitionEx(w, unitIds, levelIds));
    recall.push(recallEx(w, unitIds, levelIds));
  }
  // review words keep old material alive
  for (const w of shuffle(reviewWords).slice(0, 3)) recognition.push(recognitionEx(w, unitIds, levelIds));

  const middle: Exercise[] = [];
  const pe = pairsEx(pool.length >= 3 ? pool : vocab(unitIds));
  if (pe) middle.push(pe);

  // Word-bank sentences (recall-flavoured) once their words are known.
  const sentencePool = shuffle(availableSentences(level.id, progress, pool.map((w) => w.id)));
  const sentenceExs: Exercise[] = [];
  if (sentencePool.length > 0) sentenceExs.push(sentenceEx(sentencePool[0], unitIds, false));
  if (sentencePool.length > 1 && Math.random() < 0.6)
    sentenceExs.push(sentenceEx(sentencePool[1], unitIds, true));

  let graded: Exercise[] = [
    ...shuffle(recognition),
    ...middle,
    ...shuffle(recall),
    ...sentenceExs
  ];

  // Trim / top up towards target (intro cards aren't graded).
  if (graded.length > target + 1) {
    // keep pairs + sentences; trim review-recognition extras first
    const keep = new Set<Exercise>([...middle, ...sentenceExs]);
    const trimmed: Exercise[] = [];
    let overshoot = graded.length - target;
    for (const e of graded) {
      const isReviewRec =
        e.kind !== 'pairs' && e.kind !== 'wordBank' && !lesson.newWords.includes(e.word.id);
      if (overshoot > 0 && isReviewRec && !keep.has(e)) {
        overshoot -= 1;
        continue;
      }
      trimmed.push(e);
    }
    graded = trimmed;
  }
  while (graded.length < target && pool.length > 0) {
    const w = pick(pool);
    graded.push(Math.random() < 0.5 ? recognitionEx(w, unitIds, levelIds) : recallEx(w, unitIds, levelIds));
  }

  return [...intros, ...spread(graded)];
}

/** Review/practise sessions: no intros, SRS-weighted mixed exercises. */
export function generateReview(
  wordIds: string[],
  levelId: string | null,
  progress: Progress,
  count: number
): Exercise[] {
  const words = vocab(wordIds);
  if (words.length === 0) return [];

  // weakest first, with a little noise so sessions vary
  const strength = (id: string) => progress.srs[id]?.s ?? 0;
  const ordered = words
    .slice()
    .sort((a, b) => strength(a.id) - strength(b.id) + (Math.random() - 0.5));

  const focus = ordered.slice(0, Math.min(count, Math.max(4, Math.floor(count * 0.7))));

  // distractor scopes: the word's own level when known, else whole course
  const homeLevel = (w: Vocab): string[] => {
    for (const lv of LEVELS)
      if (lv.id === levelId || levelId === null) {
        const ids = levelNewWords(lv);
        if (ids.includes(w.id)) return ids;
      }
    return Object.keys(VOCAB);
  };

  const exs: Exercise[] = [];
  for (const w of focus) {
    const scope = homeLevel(w);
    exs.push(Math.random() < 0.55 ? recognitionEx(w, scope, scope) : recallEx(w, scope, scope));
    if (exs.length >= count - 1) break;
  }

  const pe = pairsEx(focus);
  if (pe) exs.push(pe);

  if (levelId) {
    const sentences = shuffle(availableSentences(levelId, progress, []));
    if (sentences.length > 0) exs.push(sentenceEx(sentences[0], wordIds.slice(0, 12), Math.random() < 0.4));
  }

  return spread(shuffle(exs)).slice(0, count);
}

/** Vocab ids credited to an exercise result (for the SRS). */
export function exerciseWordIds(e: Exercise): string[] {
  switch (e.kind) {
    case 'intro':
      return [e.word.id];
    case 'pickImage':
    case 'pickMeaning':
    case 'listenChoose':
      return [e.word.id];
    case 'pairs':
      return e.words.map((w) => w.id);
    case 'wordBank': {
      const byTrad = new Map(Object.values(VOCAB).map((v) => [v.trad, v.id]));
      return e.sentence.tokens.map((t) => byTrad.get(t.t)).filter((x): x is string => Boolean(x));
    }
  }
}
