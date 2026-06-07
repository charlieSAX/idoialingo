// Confetti burst, straight from the design reference — 30 falling slips of
// colour inside the phone frame. Skipped entirely under reduced motion.

const COLS = ['#FF6A3D', '#FF3E7F', '#12B58E', '#FFC83D', '#37B6E9', '#7C5CFF'];

export function confettiBurst(host: HTMLElement | null, reduceMotion: boolean) {
  if (!host || reduceMotion) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  for (let k = 0; k < 30; k++) {
    const d = document.createElement('div');
    d.className = 'confetti';
    d.style.left = `${Math.random() * 100}%`;
    d.style.background = COLS[k % COLS.length];
    d.style.animation = `confetti-fall ${1.1 + Math.random() * 1.1}s ${Math.random() * 0.3}s ease-in forwards`;
    d.style.transform = `rotate(${Math.random() * 360}deg)`;
    host.appendChild(d);
    setTimeout(() => d.remove(), 2600);
  }
}
