import { VOCAB } from '../data';
import { dueWords, useProgress, wordsLearned } from '../lib/store';
import { Jyut } from '../components/bits';

export function Practise({ onStart, onGoLearn }: { onStart: () => void; onGoLearn: () => void }) {
  const p = useProgress();
  const learned = wordsLearned(p);
  const due = dueWords(p, 6);

  if (learned === 0) {
    return (
      <div className="page-scroll">
        <h1 className="page-title">Practise</h1>
        <p className="page-sub">Smart review of your weakest words</p>
        <div className="empty">
          <div className="big" aria-hidden="true">
            🌱
          </div>
          <h3>Nothing to review yet</h3>
          <p>Practise pulls in words you've already met. Finish your first lesson and they'll show up here, ready for a workout.</p>
          <button className="cont" style={{ marginTop: 26, maxWidth: 280 }} onClick={onGoLearn}>
            GO TO LESSONS
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-scroll">
      <h1 className="page-title">Practise</h1>
      <p className="page-sub">
        {learned} words in your bank · the weakest come first
      </p>

      <div className="statcard" style={{ marginBottom: 18 }}>
        <div className="k">Up next</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 10 }}>
          {due.map((id) => {
            const w = VOCAB[id];
            if (!w) return null;
            return (
              <span
                key={id}
                style={{
                  display: 'inline-flex',
                  alignItems: 'baseline',
                  gap: 7,
                  background: 'var(--paper2)',
                  borderRadius: 12,
                  padding: '7px 11px',
                  fontWeight: 700,
                  boxShadow: 'inset 0 0 0 1px var(--line-d)'
                }}
              >
                <span className="f-hero" style={{ fontSize: 19 }}>
                  {w.trad}
                </span>
                <span style={{ fontSize: 11.5, color: 'var(--ux-d)' }}>
                  <Jyut j={w.jyut} />
                </span>
              </span>
            );
          })}
        </div>
      </div>

      <button className="cont" onClick={onStart}>
        START PRACTISE · +12 XP
      </button>
      <p style={{ textAlign: 'center', color: 'var(--muted)', fontWeight: 600, fontSize: 12.5, marginTop: 14 }}>
        Sessions are generated fresh every time — practise never runs out.
      </p>
    </div>
  );
}
