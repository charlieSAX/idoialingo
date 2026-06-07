import type { HueKey } from '../types';

export interface Hue {
  base: string;
  d: string; // darker "lip/shadow" shade
  t: string; // pale tint
  lip: string; // deepest 3D button base
  glow: string; // rgba for background radiance
}

export const HUES: Record<HueKey, Hue> = {
  jade: { base: '#12B58E', d: '#0C8E6F', t: '#DBF6ED', lip: '#086B56', glow: 'rgba(18,181,142,.30)' },
  mandarin: { base: '#FF6A3D', d: '#E14E1E', t: '#FFE6DB', lip: '#C0410F', glow: 'rgba(255,106,61,.28)' },
  pink: { base: '#FF3E7F', d: '#D81B60', t: '#FFE2EC', lip: '#B01050', glow: 'rgba(255,62,127,.26)' },
  violet: { base: '#7C5CFF', d: '#5B3FD6', t: '#ECE7FF', lip: '#4730AE', glow: 'rgba(124,92,255,.26)' },
  azure: { base: '#2BA8E0', d: '#1B82B4', t: '#DDF1FB', lip: '#146890', glow: 'rgba(43,168,224,.26)' },
  amber: { base: '#FFB020', d: '#E08C00', t: '#FFF0CF', lip: '#B87300', glow: 'rgba(255,176,32,.30)' },
  teal: { base: '#0FB9B1', d: '#0A8F89', t: '#D8F5F3', lip: '#07726D', glow: 'rgba(15,185,177,.28)' },
  coral: { base: '#FF715B', d: '#E2503B', t: '#FFE5E0', lip: '#BE3D2B', glow: 'rgba(255,113,91,.28)' }
};

export const HUE_ORDER: HueKey[] = [
  'jade',
  'mandarin',
  'pink',
  'violet',
  'azure',
  'amber',
  'teal',
  'coral'
];

/** Partner hue — used for tone superscripts and progress-bar gradients. */
export function partner(h: HueKey): HueKey {
  const i = HUE_ORDER.indexOf(h);
  return HUE_ORDER[(i + 1) % HUE_ORDER.length];
}

/** Inline CSS variables that re-skin a subtree in a unit's hue. */
export function hueVars(h: HueKey): Record<string, string> {
  const u = HUES[h];
  const p = HUES[partner(h)];
  return {
    '--ux': u.base,
    '--ux-d': u.d,
    '--ux-t': u.t,
    '--ux-lip': u.lip,
    '--ux-glow': u.glow,
    '--px': p.base,
    '--px-d': p.d,
    '--px-glow': p.glow
  };
}
