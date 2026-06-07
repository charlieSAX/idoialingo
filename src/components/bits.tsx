import { useRef } from 'react';
import { speak } from '../lib/speech';
import { SpeakerIcon } from './icons';

/** Subtle paper grain, identical to the references. */
export function Grain() {
  return (
    <svg className="grain" aria-hidden="true">
      <filter id="grain-n">
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain-n)" />
    </svg>
  );
}

/**
 * Jyutping renderer: syllables in the unit colour with the tone number picked
 * out in the partner accent, slightly raised — e.g. nei⁵ hou².
 */
export function Jyut({ j, className }: { j: string; className?: string }) {
  const parts = j.split(' ');
  return (
    <span className={className}>
      {parts.map((syl, i) => {
        const m = syl.match(/^([a-z]+)([1-6])$/i);
        return (
          <span key={i}>
            {i > 0 && ' '}
            {m ? (
              <>
                {m[1]}
                <span className="jyut-tone">{m[2]}</span>
              </>
            ) : (
              syl
            )}
          </span>
        );
      })}
    </span>
  );
}

/** Round speaker button (word sheets / intro). Pulses while speaking. */
export function SpeakerRound({ text, label }: { text: string; label?: string }) {
  const ref = useRef<HTMLButtonElement>(null);
  return (
    <button
      ref={ref}
      className="spk"
      aria-label={label ?? `Hear ${text}`}
      onClick={(e) => {
        e.stopPropagation();
        speak(text, ref.current);
      }}
    >
      <span className="ring" />
      <SpeakerIcon />
    </button>
  );
}

/** Square speaker tile used in exercise prompt rows. */
export function SpeakerSquare({ text, label }: { text: string; label?: string }) {
  const ref = useRef<HTMLButtonElement>(null);
  return (
    <button
      ref={ref}
      className="spk2"
      aria-label={label ?? `Hear ${text}`}
      onClick={(e) => {
        e.stopPropagation();
        speak(text, ref.current);
      }}
    >
      <SpeakerIcon />
    </button>
  );
}
