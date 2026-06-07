import { useEffect, useRef, useState } from 'react';
import { LEVELS, VOCAB, findLesson } from '../data';
import type { Lesson, Unit } from '../types';
import { hueVars } from '../lib/hues';
import { confettiBurst } from '../lib/confetti';
import { speak } from '../lib/speech';
import { actions, getState, isLessonDone, isUnitDone, lessonState, useProgress } from '../lib/store';
import { CheckIcon, ChestIcon, FlameIcon, GemIcon, HeartIcon, LockIcon } from '../components/icons';
import { Jyut, SpeakerRound } from '../components/bits';

const CHEST_GEMS = 40;

interface SheetData {
  lesson: Lesson;
  unit: Unit;
  levelIndex: number;
  lessonNumber: number;
}

export function Home({ onStartLesson }: { onStartLesson: (lessonId: string) => void }) {
  const p = useProgress();
  const [sheet, setSheet] = useState<SheetData | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<number | undefined>(undefined);
  const scrollRef = useRef<HTMLDivElement>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 1700);
  };

  // current lesson + its unit drive the header card
  const current = (() => {
    for (const level of LEVELS)
      for (const unit of level.units)
        for (const lesson of unit.lessons)
          if (!isLessonDone(p, lesson.id)) return { level, unit, lesson };
    const lv = LEVELS[LEVELS.length - 1];
    const u = lv.units[lv.units.length - 1];
    return { level: lv, unit: u, lesson: u.lessons[u.lessons.length - 1] };
  })();

  useEffect(() => {
    // bring the active node into view
    const el = scrollRef.current?.querySelector('[data-current="true"]');
    if (el) el.scrollIntoView({ block: 'center', behavior: 'instant' as ScrollBehavior });
  }, []);

  const unitDoneCount = current.unit.lessons.filter((l) => isLessonDone(p, l.id)).length;

  const openLesson = (lesson: Lesson, unit: Unit, levelIndex: number, lessonNumber: number) => {
    setSheet({ lesson, unit, levelIndex, lessonNumber });
    const wordId = lesson.newWords[0] ?? lesson.reviewWords?.[0];
    if (wordId && VOCAB[wordId]) setTimeout(() => speak(VOCAB[wordId].trad), 320);
  };

  const tapChest = (unit: Unit) => {
    if (!isUnitDone(p, unit.id)) {
      showToast('Reward chest · finish the unit first');
      return;
    }
    if (p.chests[unit.id]) {
      showToast('Chest already claimed');
      return;
    }
    actions.claimChest(unit.id, CHEST_GEMS);
    confettiBurst(document.querySelector('.phone'), getState().reduceMotion);
    showToast(`+${CHEST_GEMS} gems! 💎`);
  };

  let nodeIndex = 0;

  return (
    <>
      <div className="topbar">
        <div className="stat" style={{ color: '#FB8B24' }} aria-label={`${p.streak.count} day streak`}>
          <FlameIcon />
          <span className="n">{p.streak.count}</span>
        </div>
        <div className="stat" style={{ color: '#37B6E9' }} aria-label={`${p.gems} gems`}>
          <GemIcon />
          <span className="n">{p.gems}</span>
        </div>
        <div className="stat" style={{ color: '#F4456B' }} aria-label={`${p.challenge ? p.hearts : 5} hearts`}>
          <HeartIcon />
          <span className="n">{p.challenge ? p.hearts : 5}</span>
        </div>
      </div>

      <div className="home-scroll" ref={scrollRef}>
        <div className="unitcard" style={hueVars(current.unit.hue) as React.CSSProperties}>
          <div className="eyebrow">
            Cantonese · Level {current.level.index} · {current.level.title}
          </div>
          <div className="row">
            <h2>{current.unit.title}</h2>
            <span className="han">{current.unit.titleHan}</span>
          </div>
          <div className="pbar">
            <i style={{ width: `${(unitDoneCount / current.unit.lessons.length) * 100}%` }} />
          </div>
          <div className="pcap">
            Lesson {Math.min(unitDoneCount + 1, current.unit.lessons.length)} of {current.unit.lessons.length} · {p.xpTotal} XP earned
          </div>
        </div>

        {LEVELS.map((level) => (
          <div key={level.id}>
            {level.index > 1 && (
              <div className="level-banner">
                <div className="lb-eyebrow">Level {level.index}</div>
                <div className="lb-title">
                  {level.title}
                  <span className="lb-han">{level.titleHan}</span>
                </div>
              </div>
            )}
            {level.units.map((unit) => {
              const unitNumber = unit.index;
              const vars = hueVars(unit.hue) as React.CSSProperties;
              const isCourseStart = level.index === 1 && unit.index === 1;
              return (
                <div key={unit.id} style={vars}>
                  {!isCourseStart && (
                    <div className="divider">
                      <span className="ln" />
                      <span className="chip">
                        Unit {unitNumber} · {unit.title} <span className="han">{unit.titleHan}</span>
                      </span>
                      <span className="ln r" />
                    </div>
                  )}
                  <div className="path">
                    <div className="guide" />
                    {unit.lessons.map((lesson, li) => {
                      nodeIndex += 1;
                      const state = lessonState(p, lesson.id);
                      const offset = Math.round(Math.sin(nodeIndex * 1.05) * 70);
                      const delay = `${Math.min(0.18 + (nodeIndex % 10) * 0.07, 0.9)}s`;
                      const heroWordId = lesson.newWords[0] ?? lesson.reviewWords?.[0];
                      const heroChar = heroWordId && VOCAB[heroWordId] ? VOCAB[heroWordId].trad[0] : '練';
                      return (
                        <div className="step" key={lesson.id}>
                          <button
                            className={`node ${state}`}
                            data-current={state === 'current' || undefined}
                            style={{ transform: `translateX(${offset}px)` }}
                            aria-label={`${lesson.title} — ${state === 'done' ? 'completed' : state === 'current' ? 'start' : 'locked'}`}
                            onClick={() => {
                              if (state === 'locked') showToast(li === 0 ? 'Complete the previous unit first' : 'Finish the lesson before this one');
                              else openLesson(lesson, unit, level.index, li + 1);
                            }}
                          >
                            {state === 'current' && <span className="halo" />}
                            {state === 'current' && <span className="startbubble">START</span>}
                            <span className="face" style={{ animationDelay: delay }}>
                              {state === 'done' ? <CheckIcon /> : state === 'locked' ? <LockIcon /> : heroChar}
                            </span>
                          </button>
                        </div>
                      );
                    })}
                    {(() => {
                      nodeIndex += 1;
                      const offset = Math.round(Math.sin(nodeIndex * 1.05) * 70);
                      const claimed = p.chests[unit.id] === true;
                      return (
                        <div className="step" key={`${unit.id}-chest`}>
                          <button
                            className={`node chest${claimed ? ' claimed' : ''}`}
                            style={{ transform: `translateX(${offset}px)` }}
                            aria-label={claimed ? 'Reward chest (claimed)' : 'Reward chest'}
                            onClick={() => tapChest(unit)}
                          >
                            <span className="face" style={{ animationDelay: `${Math.min(0.18 + (nodeIndex % 10) * 0.07, 0.9)}s` }}>
                              <ChestIcon />
                            </span>
                          </button>
                        </div>
                      );
                    })()}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
        <div style={{ textAlign: 'center', padding: '26px 0 10px', color: 'var(--muted)', fontWeight: 700, fontSize: 13 }}>
          加油! · More levels coming with you
        </div>
      </div>

      <div className={`toast${toast ? ' show' : ''}`} role="status">
        {toast}
      </div>

      <button className={`scrim${sheet ? ' show' : ''}`} aria-label="Close" onClick={() => setSheet(null)} tabIndex={sheet ? 0 : -1} />
      <div className={`sheet${sheet ? ' show' : ''}`} style={sheet ? (hueVars(sheet.unit.hue) as React.CSSProperties) : undefined} aria-hidden={!sheet}>
        {sheet && (
          <SheetBody
            data={sheet}
            done={isLessonDone(p, sheet.lesson.id)}
            onStart={() => {
              const id = sheet.lesson.id;
              setSheet(null);
              onStartLesson(id);
            }}
          />
        )}
      </div>
    </>
  );
}

function SheetBody({ data, done, onStart }: { data: SheetData; done: boolean; onStart: () => void }) {
  const { lesson } = data;
  const wordId = lesson.newWords[0] ?? lesson.reviewWords?.[0];
  const word = wordId ? VOCAB[wordId] : undefined;
  const ref = findLesson(lesson.id);
  const isReview = lesson.newWords.length === 0;
  return (
    <>
      <div className="grab" />
      <div className="scap">
        Lesson {data.lessonNumber} · {ref?.isCheckpoint ? 'Checkpoint' : isReview ? 'Review' : `New words ${lesson.newWords.length}`}
      </div>
      {word ? (
        <>
          <div className="wrow">
            <div className="word f-hero">{word.trad}</div>
            <SpeakerRound text={word.trad} />
          </div>
          <div className="jyut">
            <Jyut j={word.jyut} />
          </div>
          <div className="eng">
            {lesson.title} {isReview ? '· keep it fresh' : `· starts with “${word.en}”`}
          </div>
        </>
      ) : (
        <>
          <div className="wrow">
            <div className="word f-hero">溫習</div>
          </div>
          <div className="jyut">
            <Jyut j="wan1 zaap6" />
          </div>
          <div className="eng">{lesson.title} · mixed review of everything so far</div>
        </>
      )}
      <button className="cont" onClick={onStart}>
        {done ? 'PRACTISE AGAIN' : 'START LESSON'} {`· +${lesson.xp ?? 20} XP`}
      </button>
    </>
  );
}
