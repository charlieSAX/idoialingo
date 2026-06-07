import { useState } from 'react';
import { actions } from '../lib/store';
import { Jyut } from '../components/bits';

const GOALS = [
  { xp: 10, label: 'Casual', sub: '~1 lesson a day' },
  { xp: 20, label: 'Regular', sub: '~2 lessons a day' },
  { xp: 30, label: 'Serious', sub: '~3 lessons a day' }
];

export function Welcome() {
  const [step, setStep] = useState<1 | 2>(1);
  const [goal, setGoal] = useState(20);

  if (step === 1) {
    return (
      <div className="welcome">
        <div className="wordmark">
          Idoialingo
          <span className="yue" aria-hidden="true">
            粵
          </span>
        </div>
        <p className="tag">Beginner Cantonese, one tap at a time — real Traditional characters, Jyutping and your phone's own voice.</p>
        <div className="heroline">
          <div className="char-big f-hero">你好</div>
          <div className="jyut" style={{ color: 'var(--jade-d)', fontWeight: 700, fontSize: 22, marginTop: 6 }}>
            <Jyut j="nei5 hou2" />
          </div>
        </div>
        <button className="cont" style={{ marginTop: 36 }} onClick={() => setStep(2)}>
          START LEARNING
        </button>
      </div>
    );
  }

  return (
    <div className="welcome">
      <div className="wordmark" style={{ fontSize: 30 }}>
        Daily goal
      </div>
      <p className="tag">A gentle target keeps the streak alive. You can change it any time in You → Settings.</p>
      <div className="goal-row" style={{ opacity: 0, animation: 'rise .7s .3s cubic-bezier(.2,.8,.25,1) forwards' }}>
        {GOALS.map((g) => (
          <button key={g.xp} className={`goal${goal === g.xp ? ' sel' : ''}`} onClick={() => setGoal(g.xp)}>
            {g.xp} XP
            <small>
              {g.label} · {g.sub}
            </small>
          </button>
        ))}
      </div>
      <button className="cont" style={{ marginTop: 26 }} onClick={() => actions.completeOnboarding(goal)}>
        LET'S GO · 開始
      </button>
    </div>
  );
}
