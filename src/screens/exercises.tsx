import { useEffect, useMemo, useRef, useState } from 'react';
import type { IntroEx, ListenChooseEx, PairsEx, PickImageEx, PickMeaningEx, Vocab, WordBankEx } from '../types';
import { Jyut, SpeakerRound, SpeakerSquare } from '../components/bits';
import { speak } from '../lib/speech';
import { actions } from '../lib/store';

// ─────────────────────────────────────────────────────────────────────────────
// The six exercise types. Choice exercises register a checker with the player
// (CHECK button); pairs and intro complete themselves (CONTINUE / auto-advance).
//
// Design note (Charlie, 2026-06-07): emoji proved too abstract as meaning
// carriers, so every exercise trades in characters ↔ English text. The grid
// type ('pickImage' in the data model, kept for compatibility) now shows
// English meanings on its cards.
// ─────────────────────────────────────────────────────────────────────────────

export interface ExerciseApi {
  /** enable/disable the CHECK button */
  setCheckable(on: boolean): void;
  /** the player calls this when CHECK is pressed; return ok + reveal text */
  registerChecker(fn: () => { ok: boolean; reveal?: string }): void;
  /** self-graded exercises (pairs) report completion directly */
  selfComplete(ok: boolean, praise?: string): void;
}

function useAutoSpeak(text: string | null, delay = 300) {
  useEffect(() => {
    if (!text) return;
    const t = setTimeout(() => speak(text), delay);
    return () => clearTimeout(t);
  }, [text, delay]);
}

function reveal(w: Vocab): string {
  return `${w.trad} · ${w.jyut} — ${w.en}`;
}

// ── 1. intro ─────────────────────────────────────────────────────────────────

export function IntroCard({ ex }: { ex: IntroEx }) {
  const w = ex.word;
  useAutoSpeak(w.trad);
  useEffect(() => {
    actions.recordSeen(w.id);
  }, [w.id]);
  const hearRef = useRef<HTMLButtonElement>(null);
  return (
    <>
      <div className="prompt">New word</div>
      <div className="sub">Tap to hear it, then carry on</div>
      <div className="hero">
        <div className="char-big f-hero" style={{ marginTop: 34 }}>
          {w.trad}
        </div>
        <div className="jyut">
          <Jyut j={w.jyut} />
        </div>
        <div className="eng">{w.en}</div>
        <button ref={hearRef} className="speak" onClick={() => speak(w.trad, hearRef.current)}>
          <SpeakerIconInline />
          HEAR IT
        </button>
      </div>
    </>
  );
}

function SpeakerIconInline() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4 9v6h4l5 4V5L8 9z" />
      <path d="M16 8a5 5 0 0 1 0 8M18.5 5.5a9 9 0 0 1 0 13" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

// ── choice plumbing ──────────────────────────────────────────────────────────

function useChoice(api: ExerciseApi, correctId: string, revealText: string) {
  const [chosen, setChosen] = useState<string | null>(null);
  const [graded, setGraded] = useState<null | { ok: boolean }>(null);
  const chosenRef = useRef<string | null>(null);

  useEffect(() => {
    api.registerChecker(() => {
      const ok = chosenRef.current === correctId;
      setGraded({ ok });
      return { ok, reveal: ok ? undefined : revealText };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [correctId, revealText]);

  const select = (id: string) => {
    if (graded) return;
    chosenRef.current = id;
    setChosen(id);
    api.setCheckable(true);
  };

  const optClass = (id: string, base: string) => {
    let c = base;
    if (graded) {
      if (id === correctId) c += ' ok';
      else if (id === chosen && !graded.ok) c += ' no';
    } else if (id === chosen) c += ' sel';
    return c;
  };

  return { select, optClass, graded };
}

// ── 2. meaning grid ('pickImage' slot) ──────────────────────────────────────

export function PickImage({ ex, api }: { ex: PickImageEx; api: ExerciseApi }) {
  const w = ex.word;
  const { select, optClass } = useChoice(api, w.id, reveal(w));
  useAutoSpeak(ex.dir === 'toEmoji' ? w.trad : null);

  if (ex.dir === 'toEmoji') {
    // hear/see the Cantonese → pick the English meaning from a 2×2 grid
    return (
      <>
        <div className="prompt">Pick the meaning</div>
        <div className="qrow">
          <SpeakerSquare text={w.trad} />
          <div>
            <div className="qc f-hero">{w.trad}</div>
            <div className="qj">
              <Jyut j={w.jyut} />
            </div>
          </div>
        </div>
        <div className="grid2">
          {ex.options.map((o) => (
            <button key={o.id} className={optClass(o.id, 'opt')} onClick={() => select(o.id)}>
              <span className="om">{o.en}</span>
            </button>
          ))}
        </div>
      </>
    );
  }

  // English prompt → pick the character
  return (
    <>
      <div className="prompt">Pick the character</div>
      <div className="qrow">
        <div className="qe f-serif">“{w.en}”</div>
      </div>
      <div className="grid2">
        {ex.options.map((o) => (
          <button
            key={o.id}
            className={optClass(o.id, 'opt')}
            onClick={() => {
              select(o.id);
              speak(o.trad);
            }}
          >
            <span className="oc f-hero">{o.trad}</span>
            <span className="ol">
              <Jyut j={o.jyut} />
            </span>
          </button>
        ))}
      </div>
    </>
  );
}

// ── 3. pickMeaning ───────────────────────────────────────────────────────────

export function PickMeaning({ ex, api }: { ex: PickMeaningEx; api: ExerciseApi }) {
  const w = ex.word;
  const { select, optClass } = useChoice(api, w.id, reveal(w));
  useAutoSpeak(ex.dir === 'toEn' ? w.trad : null);

  if (ex.dir === 'toEn') {
    return (
      <>
        <div className="prompt">What does this mean?</div>
        <div className="qrow">
          <SpeakerSquare text={w.trad} />
          <div>
            <div className="qc f-hero">{w.trad}</div>
            <div className="qj">
              <Jyut j={w.jyut} />
            </div>
          </div>
        </div>
        <div className="list-opts">
          {ex.options.map((o, i) => (
            <button key={o.id} className={optClass(o.id, 'lopt')} onClick={() => select(o.id)}>
              <span className="idx">{i + 1}</span>
              {o.en}
            </button>
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      <div className="prompt">Say it in Cantonese</div>
      <div className="qrow">
        <div className="qe f-serif">“{w.en}”</div>
      </div>
      <div className="list-opts">
        {ex.options.map((o, i) => (
          <button
            key={o.id}
            className={optClass(o.id, 'lopt')}
            onClick={() => {
              select(o.id);
              speak(o.trad);
            }}
          >
            <span className="idx">{i + 1}</span>
            <span className="han-opt f-hero">{o.trad}</span>
            <span style={{ color: 'var(--ux-d)', fontSize: 13 }}>
              <Jyut j={o.jyut} />
            </span>
          </button>
        ))}
      </div>
    </>
  );
}

// ── 4. listenChoose ──────────────────────────────────────────────────────────

export function ListenChoose({ ex, api }: { ex: ListenChooseEx; api: ExerciseApi }) {
  const w = ex.word;
  const { select, optClass } = useChoice(api, w.id, reveal(w));
  useAutoSpeak(w.trad, 380);
  return (
    <>
      <div className="prompt">What did you hear?</div>
      <div className="qrow">
        <SpeakerSquare text={w.trad} label="Replay the word" />
        <div style={{ fontWeight: 700, color: 'var(--muted)' }}>Tap the speaker to replay</div>
      </div>
      <div className="grid2">
        {ex.options.map((o) => (
          <button key={o.id} className={optClass(o.id, 'opt')} onClick={() => select(o.id)}>
            <span className="om">{o.en}</span>
          </button>
        ))}
      </div>
    </>
  );
}

// ── 5. pairs (characters ↔ English) ─────────────────────────────────────────

interface PTile {
  key: string;
  side: 'L' | 'R';
  word: Vocab;
}

export function Pairs({ ex, api }: { ex: PairsEx; api: ExerciseApi }) {
  const tiles = useMemo<PTile[]>(() => {
    const shuffle = <T,>(a: T[]) => {
      const x = a.slice();
      for (let i = x.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [x[i], x[j]] = [x[j], x[i]];
      }
      return x;
    };
    const left = shuffle(ex.words).map<PTile>((w) => ({ key: `L-${w.id}`, side: 'L', word: w }));
    const right = shuffle(ex.words).map<PTile>((w) => ({ key: `R-${w.id}`, side: 'R', word: w }));
    const rows: PTile[] = [];
    for (let r = 0; r < left.length; r++) rows.push(left[r], right[r]);
    return rows;
  }, [ex]);

  const [sel, setSel] = useState<{ L: string | null; R: string | null }>({ L: null, R: null });
  const [gone, setGone] = useState<Set<string>>(new Set());
  const [bad, setBad] = useState<Set<string>>(new Set());

  const tap = (t: PTile) => {
    if (gone.has(t.key) || bad.size > 0) return;
    if (t.side === 'L') speak(t.word.trad);
    const next = { ...sel, [t.side]: sel[t.side] === t.key ? null : t.key } as typeof sel;
    setSel(next);
    if (next.L && next.R) {
      const lWord = next.L.slice(2);
      const rWord = next.R.slice(2);
      if (lWord === rWord) {
        const l = next.L;
        const r = next.R;
        setSel({ L: null, R: null });
        setTimeout(() => {
          setGone((g) => {
            const ng = new Set(g);
            ng.add(l);
            ng.add(r);
            if (ng.size === tiles.length) {
              setTimeout(() => api.selfComplete(true, '靚! · All matched'), 380);
            }
            return ng;
          });
        }, 140);
      } else {
        const l = next.L;
        const r = next.R;
        setBad(new Set([l, r]));
        setSel({ L: null, R: null });
        setTimeout(() => setBad(new Set()), 380);
      }
    }
  };

  return (
    <>
      <div className="prompt">Tap the matching pairs</div>
      <div className="sub">Match each word to its meaning</div>
      <div className="pairs">
        {tiles.map((t) => {
          let cls = 'ptile';
          if (sel[t.side] === t.key) cls += ' sel';
          if (gone.has(t.key)) cls += ' gone';
          if (bad.has(t.key)) cls += ' bad';
          return (
            <button key={t.key} className={cls} onClick={() => tap(t)} aria-label={t.side === 'L' ? `${t.word.trad}, ${t.word.jyut}` : t.word.en}>
              {t.side === 'L' ? (
                <>
                  <span className="pc f-hero">{t.word.trad}</span>
                  <span className="pj">{t.word.jyut}</span>
                </>
              ) : (
                <span className="pen">{t.word.en}</span>
              )}
            </button>
          );
        })}
      </div>
    </>
  );
}

// ── 6. wordBank / typeHeard ──────────────────────────────────────────────────

export function WordBank({ ex, api }: { ex: WordBankEx; api: ExerciseApi }) {
  const sentenceText = ex.sentence.tokens.map((t) => t.t).join('');
  const [picked, setPicked] = useState<number[]>([]); // indices into ex.bank
  const [graded, setGraded] = useState<null | { ok: boolean }>(null);
  const pickedRef = useRef<number[]>([]);

  useAutoSpeak(ex.heard ? sentenceText : null, 380);

  useEffect(() => {
    api.registerChecker(() => {
      const answer = ex.sentence.tokens.map((t) => t.t).join('|');
      const got = pickedRef.current.map((i) => ex.bank[i].t).join('|');
      const ok = got === answer;
      setGraded({ ok });
      if (ok) speak(sentenceText);
      return {
        ok,
        reveal: ok ? undefined : `${sentenceText} — ${ex.sentence.en}`
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ex]);

  const add = (i: number) => {
    if (graded || picked.includes(i)) return;
    const next = [...picked, i];
    pickedRef.current = next;
    setPicked(next);
    speak(ex.bank[i].t);
    api.setCheckable(next.length > 0);
  };
  const remove = (i: number) => {
    if (graded) return;
    const next = picked.filter((x) => x !== i);
    pickedRef.current = next;
    setPicked(next);
    api.setCheckable(next.length > 0);
  };

  return (
    <>
      <div className="prompt">{ex.heard ? 'Type what you hear' : 'Build the sentence'}</div>
      {ex.heard ? (
        <div className="qrow">
          <SpeakerSquare text={sentenceText} label="Replay the sentence" />
          <div style={{ fontWeight: 700, color: 'var(--muted)' }}>Tap the speaker to replay</div>
        </div>
      ) : (
        <div className="qrow">
          <div className="qe f-serif">“{ex.sentence.en}”</div>
        </div>
      )}
      <div className="wb-answer" aria-label="Your answer">
        {picked.map((i) => (
          <button key={i} className="wtile" onClick={() => remove(i)} aria-label={`Remove ${ex.bank[i].t}`}>
            <span className="wc f-hero">{ex.bank[i].t}</span>
            <span className="wj">{ex.bank[i].j}</span>
          </button>
        ))}
      </div>
      <div className="wb-bank">
        {ex.bank.map((tile, i) => (
          <button
            key={i}
            className={`wtile${picked.includes(i) ? ' used' : ''}`}
            onClick={() => add(i)}
            aria-label={`${tile.t}, ${tile.j}`}
          >
            <span className="wc f-hero">{tile.t}</span>
            <span className="wj">{tile.j}</span>
          </button>
        ))}
      </div>
      {graded && !graded.ok && (
        <div style={{ marginTop: 18, fontWeight: 700, color: 'var(--jade-d)' }}>
          {ex.sentence.tokens.map((t, i) => (
            <span key={i} className="f-hero" style={{ fontSize: 24, marginRight: 4 }}>
              {t.t}
            </span>
          ))}
        </div>
      )}
    </>
  );
}

// re-export the round speaker for the lesson sheet
export { SpeakerRound };
