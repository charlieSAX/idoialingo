import type { Level, Vocab } from '../types';

// ─────────────────────────────────────────────────────────────────────────────
// Level 3 — "Connecting" 溝通
// Colloquial spoken Cantonese (起身/瞓覺/沖涼/行路/做嘢/傾偈…), Jyutping with
// tone numbers checked against words.hk / CC-Canto. Aspect markers 咗/緊/過
// are abstract grammar words: no emoji, taught through pickMeaning + wordBank.
// ─────────────────────────────────────────────────────────────────────────────

export const VOCAB_L3: Vocab[] = [
  // Unit 1 — Daily routine 日程
  { id: 'hei2san1', trad: '起身', jyut: 'hei2 san1', en: 'Get up', emoji: '🛏️' },
  { id: 'fan3gaau3', trad: '瞓覺', jyut: 'fan3 gaau3', en: 'Sleep', emoji: '😴' },
  { id: 'faan1gung1', trad: '返工', jyut: 'faan1 gung1', en: 'Go to work', emoji: '💼' },
  { id: 'fong3gung1', trad: '放工', jyut: 'fong3 gung1', en: 'Finish work', emoji: '🎉' },
  { id: 'cung1loeng4', trad: '沖涼', jyut: 'cung1 loeng4', en: 'Shower', emoji: '🚿' },
  { id: 'sik6zou2caan1', trad: '食早餐', jyut: 'sik6 zou2 caan1', en: 'Eat breakfast', emoji: '🍳' },
  { id: 'caat3ngaa4', trad: '刷牙', jyut: 'caat3 ngaa4', en: 'Brush teeth', emoji: '🪥' },
  { id: 'faan1uk1kei2', trad: '返屋企', jyut: 'faan1 uk1 kei2', en: 'Go home', emoji: '🏡' },

  // Unit 2 — Transport 交通
  { id: 'baa1si2', trad: '巴士', jyut: 'baa1 si2', en: 'Bus', emoji: '🚌' }, // 士 si6; changed tone si6*2
  { id: 'siu2baa1', trad: '小巴', jyut: 'siu2 baa1', en: 'Minibus', emoji: '🚐' },
  { id: 'dik1si2', trad: '的士', jyut: 'dik1 si2', en: 'Taxi', emoji: '🚕' }, // 士 si6*2
  { id: 'fo2ce1', trad: '火車', jyut: 'fo2 ce1', en: 'Train', emoji: '🚆' },
  { id: 'fei1gei1', trad: '飛機', jyut: 'fei1 gei1', en: 'Plane', emoji: '✈️' },
  { id: 'daan1ce1', trad: '單車', jyut: 'daan1 ce1', en: 'Bicycle', emoji: '🚲' },
  { id: 'daap3', trad: '搭', jyut: 'daap3', en: 'Take / ride', emoji: '🎫' },
  { id: 'haang4lou6', trad: '行路', jyut: 'haang4 lou6', en: 'Walk', emoji: '👟' },

  // Unit 3 — Body & health 身體
  { id: 'tau4', trad: '頭', jyut: 'tau4', en: 'Head', emoji: '🗣' },
  { id: 'sau2', trad: '手', jyut: 'sau2', en: 'Hand', emoji: '✋' },
  { id: 'goek3', trad: '腳', jyut: 'goek3', en: 'Leg / foot', emoji: '🦵' },
  { id: 'ngaan5', trad: '眼', jyut: 'ngaan5', en: 'Eye', emoji: '👁️' },
  { id: 'tou5', trad: '肚', jyut: 'tou5', en: 'Belly', pos: 'n.' },
  { id: 'tung3', trad: '痛', jyut: 'tung3', en: 'Hurts / pain', emoji: '🤕' },
  { id: 'beng6', trad: '病', jyut: 'beng6', en: 'Sick', emoji: '🤒' },
  { id: 'tai2ji1sang1', trad: '睇醫生', jyut: 'tai2 ji1 sang1', en: 'See a doctor', emoji: '🧑‍⚕️' },
  { id: 'sik6joek6', trad: '食藥', jyut: 'sik6 joek6', en: 'Take medicine', emoji: '💊' },

  // Unit 4 — Work & study 返工讀書
  { id: 'duk6syu1', trad: '讀書', jyut: 'duk6 syu1', en: 'Study', emoji: '📚' },
  { id: 'lou5si1', trad: '老師', jyut: 'lou5 si1', en: 'Teacher', emoji: '🧑‍🏫' },
  { id: 'hok6saang1', trad: '學生', jyut: 'hok6 saang1', en: 'Student', emoji: '🧑‍🎓' },
  { id: 'hoi1wui2', trad: '開會', jyut: 'hoi1 wui2', en: 'Have a meeting', emoji: '🪑' }, // 會 wui6; changed tone wui6*2
  { id: 'gung1si1', trad: '公司', jyut: 'gung1 si1', en: 'Company', emoji: '🏢' },
  { id: 'tung4si6', trad: '同事', jyut: 'tung4 si6', en: 'Colleague', emoji: '🧑‍💼' },
  { id: 'zou6je5', trad: '做嘢', jyut: 'zou6 je5', en: 'Work (do stuff)', emoji: '🔨' },
  { id: 'mong4', trad: '忙', jyut: 'mong4', en: 'Busy', emoji: '⏳' },

  // Unit 5 — Making plans 約
  { id: 'gei2si4', trad: '幾時', jyut: 'gei2 si4', en: 'When', emoji: '🕰️' },
  { id: 'jat1cai4', trad: '一齊', jyut: 'jat1 cai4', en: 'Together', emoji: '🤝' },
  { id: 'dak1m4dak1', trad: '得唔得', jyut: 'dak1 m4 dak1', en: 'Is that OK?', emoji: '🆗' },
  { id: 'hou2aa3', trad: '好呀', jyut: 'hou2 aa3', en: 'Sure!', emoji: '👍' },
  { id: 'ci4di1', trad: '遲啲', jyut: 'ci4 di1', en: 'Later', emoji: '🔜' },
  { id: 'joek3', trad: '約', jyut: 'joek3', en: 'Arrange to meet', emoji: '🗓️' },
  { id: 'heoi3bin1', trad: '去邊', jyut: 'heoi3 bin1', en: 'Where to?', emoji: '🗺️' },
  { id: 'ting1jat6gin3', trad: '聽日見', jyut: 'ting1 jat6 gin3', en: 'See you tomorrow', emoji: '🌇' },

  // Unit 6 — Aspect 時態 (grammar; no emoji — wordBank territory)
  { id: 'zo2', trad: '咗', jyut: 'zo2', en: '(did) — completed', pos: 'aspect' },
  { id: 'gan2', trad: '緊', jyut: 'gan2', en: '(-ing) — ongoing', pos: 'aspect' },
  { id: 'gwo3', trad: '過', jyut: 'gwo3', en: '(have) — experienced', pos: 'aspect' },
  { id: 'wui5', trad: '會', jyut: 'wui5', en: 'Will', pos: 'aux.' },
  { id: 'mei6', trad: '未', jyut: 'mei6', en: 'Not yet', pos: 'adv.' },
  { id: 'sik6zo2', trad: '食咗', jyut: 'sik6 zo2', en: 'Ate (already)' },
  { id: 'sik6gan2', trad: '食緊', jyut: 'sik6 gan2', en: 'Eating (now)' },
  { id: 'heoi3gwo3', trad: '去過', jyut: 'heoi3 gwo3', en: 'Have been to' },

  // Unit 7 — Small talk 傾偈
  { id: 'zou6gan2mat1', trad: '你做緊乜呀', jyut: 'nei5 zou6 gan2 mat1 aa3', en: 'What are you doing?' },
  { id: 'dim2aa3', trad: '點呀', jyut: 'dim2 aa3', en: "How's it going?", emoji: '💁' },
  { id: 'hou2noi6mou5gin3', trad: '好耐冇見', jyut: 'hou2 noi6 mou5 gin3', en: 'Long time no see', emoji: '🤗' },
  { id: 'mat1je5', trad: '乜嘢', jyut: 'mat1 je5', en: 'What', emoji: '❔' },
  { id: 'dim2gaai2', trad: '點解', jyut: 'dim2 gaai2', en: 'Why', emoji: '🧐' },
  { id: 'm4zi1', trad: '唔知', jyut: 'm4 zi1', en: "Don't know", emoji: '🤷' },
  { id: 'king1gai2', trad: '傾偈', jyut: 'king1 gai2', en: 'Chat', emoji: '💬' }, // 偈 gai6*2
  { id: 'hai6gam2sin1', trad: '係咁先', jyut: 'hai6 gam2 sin1', en: 'Bye for now', emoji: '🫡' }
];

export const LEVEL3: Level = {
  id: 'C3',
  index: 3,
  title: 'Connecting',
  titleHan: '溝通',
  units: [
    {
      id: 'c3u1',
      index: 1,
      title: 'Daily routine',
      titleHan: '日程',
      hue: 'jade',
      lessons: [
        { id: 'c3u1l1', title: 'Morning moves', newWords: ['hei2san1', 'cung1loeng4', 'caat3ngaa4', 'sik6zou2caan1'] },
        { id: 'c3u1l2', title: 'Work & rest', newWords: ['faan1gung1', 'fong3gung1', 'faan1uk1kei2', 'fan3gaau3'], reviewWords: ['hei2san1'] },
        { id: 'c3u1l3', title: 'Routine practice', newWords: [], reviewWords: ['hei2san1', 'fan3gaau3', 'faan1gung1', 'fong3gung1', 'cung1loeng4', 'sik6zou2caan1', 'caat3ngaa4', 'faan1uk1kei2'] },
        { id: 'c3u1l4', title: 'Routine mastery', newWords: [], reviewWords: ['hei2san1', 'fan3gaau3', 'faan1gung1', 'fong3gung1', 'cung1loeng4', 'sik6zou2caan1', 'caat3ngaa4', 'faan1uk1kei2'], xp: 25 }
      ]
    },
    {
      id: 'c3u2',
      index: 2,
      title: 'Transport',
      titleHan: '交通',
      hue: 'mandarin',
      lessons: [
        { id: 'c3u2l1', title: 'On wheels', newWords: ['baa1si2', 'siu2baa1', 'dik1si2', 'daan1ce1'] },
        { id: 'c3u2l2', title: 'Far and away', newWords: ['fo2ce1', 'fei1gei1', 'daap3', 'haang4lou6'], reviewWords: ['baa1si2', 'dik1si2'] },
        { id: 'c3u2l3', title: 'Transport practice', newWords: [], reviewWords: ['baa1si2', 'siu2baa1', 'dik1si2', 'fo2ce1', 'fei1gei1', 'daan1ce1', 'daap3', 'haang4lou6'] },
        { id: 'c3u2l4', title: 'Transport mastery', newWords: [], reviewWords: ['baa1si2', 'siu2baa1', 'dik1si2', 'fo2ce1', 'fei1gei1', 'daan1ce1', 'daap3', 'haang4lou6'], xp: 25 }
      ]
    },
    {
      id: 'c3u3',
      index: 3,
      title: 'Body & health',
      titleHan: '身體',
      hue: 'pink',
      lessons: [
        { id: 'c3u3l1', title: 'Head to toe', newWords: ['tau4', 'sau2', 'goek3', 'ngaan5', 'tou5'] },
        { id: 'c3u3l2', title: 'Feeling poorly', newWords: ['tung3', 'beng6', 'tai2ji1sang1', 'sik6joek6'], reviewWords: ['tau4', 'tou5'] },
        { id: 'c3u3l3', title: 'Health practice', newWords: [], reviewWords: ['tau4', 'sau2', 'goek3', 'ngaan5', 'tou5', 'tung3', 'beng6', 'tai2ji1sang1', 'sik6joek6'] },
        { id: 'c3u3l4', title: 'Health mastery', newWords: [], reviewWords: ['tau4', 'sau2', 'goek3', 'ngaan5', 'tou5', 'tung3', 'beng6', 'tai2ji1sang1', 'sik6joek6'], xp: 25 }
      ]
    },
    {
      id: 'c3u4',
      index: 4,
      title: 'Work & study',
      titleHan: '返工讀書',
      hue: 'violet',
      lessons: [
        { id: 'c3u4l1', title: 'School days', newWords: ['duk6syu1', 'lou5si1', 'hok6saang1', 'gung1si1'], reviewWords: ['faan1gung1'] },
        { id: 'c3u4l2', title: 'Office hours', newWords: ['hoi1wui2', 'tung4si6', 'zou6je5', 'mong4'], reviewWords: ['gung1si1', 'duk6syu1'] },
        { id: 'c3u4l3', title: 'Work practice', newWords: [], reviewWords: ['duk6syu1', 'lou5si1', 'hok6saang1', 'hoi1wui2', 'gung1si1', 'tung4si6', 'zou6je5', 'mong4'] },
        { id: 'c3u4l4', title: 'Work mastery', newWords: [], reviewWords: ['duk6syu1', 'lou5si1', 'hok6saang1', 'hoi1wui2', 'gung1si1', 'tung4si6', 'zou6je5', 'mong4'], xp: 25 }
      ]
    },
    {
      id: 'c3u5',
      index: 5,
      title: 'Making plans',
      titleHan: '約',
      hue: 'azure',
      lessons: [
        { id: 'c3u5l1', title: 'When & where', newWords: ['gei2si4', 'jat1cai4', 'joek3', 'heoi3bin1'] },
        { id: 'c3u5l2', title: 'Sounds good', newWords: ['dak1m4dak1', 'hou2aa3', 'ci4di1', 'ting1jat6gin3'], reviewWords: ['gei2si4', 'jat1cai4'] },
        { id: 'c3u5l3', title: 'Plans practice', newWords: [], reviewWords: ['gei2si4', 'jat1cai4', 'dak1m4dak1', 'hou2aa3', 'ci4di1', 'joek3', 'heoi3bin1', 'ting1jat6gin3'] },
        { id: 'c3u5l4', title: 'Plans mastery', newWords: [], reviewWords: ['gei2si4', 'jat1cai4', 'dak1m4dak1', 'hou2aa3', 'ci4di1', 'joek3', 'heoi3bin1', 'ting1jat6gin3'], xp: 25 }
      ]
    },
    {
      id: 'c3u6',
      index: 6,
      title: 'Past, now & next',
      titleHan: '時態',
      hue: 'amber',
      lessons: [
        { id: 'c3u6l1', title: 'Did it — 咗', newWords: ['zo2', 'sik6zo2', 'mei6'], reviewWords: ['sik6', 'faan6'] },
        { id: 'c3u6l2', title: 'Doing it — 緊', newWords: ['gan2', 'sik6gan2'], reviewWords: ['zo2', 'sik6zo2'] },
        { id: 'c3u6l3', title: 'Been there — 過 · 會', newWords: ['gwo3', 'heoi3gwo3', 'wui5'], reviewWords: ['gan2', 'mei6'] },
        { id: 'c3u6l4', title: 'Aspect mastery', newWords: [], reviewWords: ['zo2', 'gan2', 'gwo3', 'wui5', 'mei6', 'sik6zo2', 'sik6gan2', 'heoi3gwo3'], xp: 25 }
      ]
    },
    {
      id: 'c3u7',
      index: 7,
      title: 'Small talk',
      titleHan: '傾偈',
      hue: 'teal',
      lessons: [
        { id: 'c3u7l1', title: 'What & why', newWords: ['mat1je5', 'dim2gaai2', 'm4zi1', 'king1gai2'] },
        { id: 'c3u7l2', title: 'Catching up', newWords: ['dim2aa3', 'hou2noi6mou5gin3', 'zou6gan2mat1', 'hai6gam2sin1'], reviewWords: ['king1gai2'] },
        { id: 'c3u7l3', title: 'Small talk practice', newWords: [], reviewWords: ['mat1je5', 'dim2gaai2', 'm4zi1', 'king1gai2', 'dim2aa3', 'hou2noi6mou5gin3', 'zou6gan2mat1', 'hai6gam2sin1'] },
        { id: 'c3u7l4', title: 'Small talk mastery', newWords: [], reviewWords: ['mat1je5', 'dim2gaai2', 'm4zi1', 'king1gai2', 'dim2aa3', 'hou2noi6mou5gin3', 'zou6gan2mat1', 'hai6gam2sin1'], xp: 25 }
      ]
    },
    {
      id: 'c3u8',
      index: 8,
      title: 'Checkpoint',
      titleHan: '關卡',
      hue: 'coral',
      lessons: [
        { id: 'c3u8l1', title: 'Checkpoint I', newWords: [], reviewWords: [], xp: 25 },
        { id: 'c3u8l2', title: 'Checkpoint II', newWords: [], reviewWords: [], xp: 25 },
        { id: 'c3u8l3', title: 'Checkpoint III', newWords: [], reviewWords: [], xp: 25 }
      ]
    }
  ]
};
