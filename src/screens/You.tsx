import { useEffect, useState } from 'react';
import { actions, useProgress, wordsLearned } from '../lib/store';
import { cantoneseVoices, isIOS, setPreferredVoice, speak } from '../lib/speech';

function Switch({ on, onToggle, label }: { on: boolean; onToggle: () => void; label: string }) {
  return <button className={`switch${on ? ' on' : ''}`} role="switch" aria-checked={on} aria-label={label} onClick={onToggle} />;
}

export function You() {
  const p = useProgress();
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    const update = () => setVoices(cantoneseVoices());
    update();
    try {
      window.speechSynthesis.addEventListener('voiceschanged', update);
      return () => window.speechSynthesis.removeEventListener('voiceschanged', update);
    } catch {
      return;
    }
  }, []);

  return (
    <div className="page-scroll">
      <h1 className="page-title">You</h1>
      <p className="page-sub">
        {wordsLearned(p)} words · {p.xpTotal} XP · {p.streak.count}-day streak
      </p>

      <div className="setrow" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
        <div>
          <div className="sl">Cantonese voice</div>
          <div className="sd">
            {voices.length === 0
              ? 'No Chinese voices found on this device yet.'
              : 'Pick the voice used for all audio. Tap to hear a sample.'}
          </div>
        </div>
        <select
          className="select"
          style={{ marginTop: 10 }}
          aria-label="Cantonese voice"
          value={p.voiceURI ?? ''}
          onChange={(e) => {
            const uri = e.target.value || null;
            actions.setVoice(uri);
            setPreferredVoice(uri);
            setTimeout(() => speak('你好'), 120);
          }}
        >
          <option value="">Automatic (best Cantonese voice)</option>
          {voices.map((v) => (
            <option key={v.voiceURI} value={v.voiceURI}>
              {v.name} · {v.lang}
            </option>
          ))}
        </select>
        {isIOS() && (
          <div className="sd" style={{ marginTop: 10 }}>
            💡 For the nicest audio, download the enhanced Cantonese voice: Settings → Accessibility → Spoken Content → Voices → Chinese → Chinese (Hong Kong).
          </div>
        )}
      </div>

      <div className="setrow">
        <div>
          <div className="sl">Challenge Mode</div>
          <div className="sd">Hearts persist between lessons and running out ends the lesson. Refill costs 300 gems.</div>
        </div>
        <Switch on={p.challenge} onToggle={() => actions.setChallenge(!p.challenge)} label="Challenge Mode" />
      </div>

      <div className="setrow">
        <div>
          <div className="sl">Reduce motion</div>
          <div className="sd">Turns off the springy animations and confetti.</div>
        </div>
        <Switch on={p.reduceMotion} onToggle={() => actions.setReduceMotion(!p.reduceMotion)} label="Reduce motion" />
      </div>

      <div className="setrow">
        <div>
          <div className="sl">Daily goal</div>
          <div className="sd">XP target that feeds the streak and heatmap.</div>
        </div>
        <select
          className="select"
          style={{ width: 110 }}
          aria-label="Daily goal"
          value={p.dailyGoalXp}
          onChange={(e) => actions.setDailyGoal(Number(e.target.value))}
        >
          <option value={10}>10 XP</option>
          <option value={20}>20 XP</option>
          <option value={30}>30 XP</option>
        </select>
      </div>

      <button
        className="danger"
        onClick={() => {
          if (window.confirm('Reset ALL progress? Streak, XP, gems and word strength will be wiped. This cannot be undone.')) {
            actions.resetAll();
          }
        }}
      >
        RESET PROGRESS
      </button>

      <p style={{ textAlign: 'center', color: 'var(--muted)', fontWeight: 600, fontSize: 12, marginTop: 18 }}>
        Idoialingo 粵 · everything lives on this device — no account, no cloud.
      </p>
    </div>
  );
}
