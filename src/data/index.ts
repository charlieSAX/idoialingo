import type { Level, Lesson, Unit, Vocab } from '../types';
import { LEVEL1, VOCAB_L1 } from './level1';
import { LEVEL2, VOCAB_L2 } from './level2';
import { LEVEL3, VOCAB_L3 } from './level3';
import { SENTENCES } from './sentences';

export const LEVELS: Level[] = [LEVEL1, LEVEL2, LEVEL3];

export const VOCab_ALL: Vocab[] = [...VOCAB_L1, ...VOCAB_L2, ...VOCAB_L3];

export const VOCAB: Record<string, Vocab> = Object.fromEntries(
  VOCab_ALL.map((v) => [v.id, v])
);

export { SENTENCES };

export interface LessonRef {
  level: Level;
  unit: Unit;
  lesson: Lesson;
  /** ids of every word in this lesson's unit (for distractors) */
  unitWordIds: string[];
  /** ids of every word in this lesson's level */
  levelWordIds: string[];
  isCheckpoint: boolean;
}

const unitWordCache = new Map<string, string[]>();

export function unitWords(unit: Unit): string[] {
  const hit = unitWordCache.get(unit.id);
  if (hit) return hit;
  const ids: string[] = [];
  for (const l of unit.lessons) {
    for (const w of l.newWords) if (!ids.includes(w)) ids.push(w);
    for (const w of l.reviewWords ?? []) if (!ids.includes(w)) ids.push(w);
  }
  unitWordCache.set(unit.id, ids);
  return ids;
}

export function levelWords(level: Level): string[] {
  const ids: string[] = [];
  for (const u of level.units) for (const w of unitWords(u)) if (!ids.includes(w)) ids.push(w);
  return ids;
}

/** Words introduced (newWords) anywhere in a level — used by checkpoints. */
export function levelNewWords(level: Level): string[] {
  const ids: string[] = [];
  for (const u of level.units) for (const l of u.lessons) for (const w of l.newWords) if (!ids.includes(w)) ids.push(w);
  return ids;
}

export function findLesson(lessonId: string): LessonRef | null {
  for (const level of LEVELS) {
    for (const unit of level.units) {
      for (const lesson of unit.lessons) {
        if (lesson.id === lessonId) {
          return {
            level,
            unit,
            lesson,
            unitWordIds: unitWords(unit),
            levelWordIds: levelWords(level),
            isCheckpoint: unit.title === 'Checkpoint'
          };
        }
      }
    }
  }
  return null;
}

/** Flat ordered list of all lessons in course order. */
export function allLessons(): { levelId: string; unitId: string; lesson: Lesson }[] {
  const out: { levelId: string; unitId: string; lesson: Lesson }[] = [];
  for (const level of LEVELS)
    for (const unit of level.units)
      for (const lesson of unit.lessons) out.push({ levelId: level.id, unitId: unit.id, lesson });
  return out;
}
