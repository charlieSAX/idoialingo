import { LEVELS } from '../data';
import { HUES } from '../lib/hues';
import type { HueKey } from '../types';
import { dayKey, levelProgress, useProgress, wordsLearned } from '../lib/store';
import { FlameIcon, GemIcon } from '../components/icons';

const LEVEL_HUES: HueKey[] = ['jade', 'mandarin', 'violet'];

function Ring({ pct, hue }: { pct: number; hue: HueKey }) {
  const r = 26;
  const c = 2 * Math.PI * r;
  return (
    <svg width="74" height="74" viewBox="0 0 74 74" role="img" aria-label={`${Math.round(pct * 100)}% complete`}>
      <circle cx="37" cy="37" r={r} fill="none" stroke="var(--line)" strokeWidth="9" />
      <circle
        cx="37"
        cy="37"
        r={r}
        fill="none"
        stroke={HUES[hue].base}
        strokeWidth="9"
        strokeLinecap="round"
        strokeDasharray={`${c * pct} ${c}`}
        transform="rotate(-90 37 37)"
        style={{ transition: 'stroke-dasharray .6s cubic-bezier(.2,.8,.25,1)' }}
      />
      <text x="37" y="42" textAnchor="middle" fontSize="15" fontWeight="800" fill="var(--ink)">
        {Math.round(pct * 100)}%
      </text>
    </svg>
  );
}

function Heatmap({ days, goal }: { days: Record<string, number>; goal: number }) {
  const today = new Date();
  const cells: { key: string; xp: number; isToday: boolean }[] = [];
  // 12 weeks, aligned so the final column ends on today
  const start = new Date(today);
  start.setDate(start.getDate() - (83 - (6 - today.getDay())) - 1);
  for (let i = 0; i < 84; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    const key = dayKey(d);
    cells.push({ key, xp: days[key] ?? 0, isToday: key === dayKey(today) });
  }
  const cls = (xp: number) => (xp <= 0 ? '' : xp >= goal * 2 ? ' l3' : xp >= goal ? ' l2' : ' l1');
  return (
    <div className="heatmap">
      <div className="k" style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--muted)' }}>
        Last 12 weeks
      </div>
      <div className="hm-grid">
        {cells.map((c) => (
          <span key={c.key} className={`hm-cell${cls(c.xp)}${c.isToday ? ' today' : ''}`} title={`${c.key}: ${c.xp} XP`} />
        ))}
      </div>
    </div>
  );
}

export function Stats() {
  const p = useProgress();
  const todayXp = p.days[dayKey()] ?? 0;
  return (
    <div className="page-scroll">
      <h1 className="page-title">Stats</h1>
      <p className="page-sub">
        {todayXp >= p.dailyGoalXp ? `Daily goal done — ${todayXp}/${p.dailyGoalXp} XP 🎉` : `Today: ${todayXp}/${p.dailyGoalXp} XP towards your goal`}
      </p>

      <div className="statgrid">
        <div className="statcard">
          <div className="k">
            <span style={{ color: '#FB8B24', width: 14, height: 14, display: 'inline-flex' }}>
              <FlameIcon />
            </span>
            Streak
          </div>
          <div className="v">
            {p.streak.count} <small>days</small>
          </div>
        </div>
        <div className="statcard">
          <div className="k">Total XP</div>
          <div className="v">{p.xpTotal}</div>
        </div>
        <div className="statcard">
          <div className="k">Words learned</div>
          <div className="v">{wordsLearned(p)}</div>
        </div>
        <div className="statcard">
          <div className="k">
            <span style={{ color: '#37B6E9', width: 14, height: 14, display: 'inline-flex' }}>
              <GemIcon />
            </span>
            Gems
          </div>
          <div className="v">{p.gems}</div>
        </div>
      </div>

      <div className="rings">
        {LEVELS.map((lv, i) => {
          const { done, total } = levelProgress(p, lv.id);
          return (
            <div className="ringcard" key={lv.id}>
              <Ring pct={total ? done / total : 0} hue={LEVEL_HUES[i] ?? 'jade'} />
              <div className="rl">
                {lv.id} · {lv.title}
              </div>
              <div className="rh">{lv.titleHan}</div>
            </div>
          );
        })}
      </div>

      <Heatmap days={p.days} goal={p.dailyGoalXp} />

      {p.streak.freezes > 0 && (
        <p style={{ color: 'var(--muted)', fontWeight: 600, fontSize: 12.5, marginTop: 14, textAlign: 'center' }}>
          🧊 {p.streak.freezes} streak freeze{p.streak.freezes > 1 ? 's' : ''} in the bank — one missed day won't break the flame.
        </p>
      )}
    </div>
  );
}
