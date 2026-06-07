import type { Level, Vocab } from '../types';

// ─────────────────────────────────────────────────────────────────────────────
// Level 1 — "Foundations" 入門
// Vocabulary verbatim from the verified seed (colloquial Cantonese, Jyutping
// cross-checked against words.hk / CC-Canto in the design session).
// Politeness reuses the canonical Greetings entries (no duplicate ids).
// ─────────────────────────────────────────────────────────────────────────────

export const VOCAB_L1: Vocab[] = [
  // Unit 1 — Greetings 問候
  { id: 'nei5hou2', trad: '你好', jyut: 'nei5 hou2', en: 'Hello', emoji: '👋' },
  { id: 'zou2san4', trad: '早晨', jyut: 'zou2 san4', en: 'Good morning', emoji: '☀️' },
  { id: 'neihoumaa', trad: '你好嗎', jyut: 'nei5 hou2 maa3', en: 'How are you?', emoji: '🙂' },
  { id: 'mgoi1', trad: '唔該', jyut: 'm4 goi1', en: 'Thanks / excuse me', emoji: '🙏' },
  { id: 'do1ze6', trad: '多謝', jyut: 'do1 ze6', en: 'Thank you', emoji: '🎁' },
  { id: 'zoi3gin3', trad: '再見', jyut: 'zoi3 gin3', en: 'Goodbye', emoji: '👋' },
  { id: 'baai1baai', trad: '拜拜', jyut: 'baai1 baai3', en: 'Bye-bye', emoji: '🫡' },
  { id: 'deoimzyu', trad: '對唔住', jyut: 'deoi3 m4 zyu6', en: 'Sorry', emoji: '😟' },

  // Unit 2 — Numbers 1-10 數字
  { id: 'jat1', trad: '一', jyut: 'jat1', en: 'One', emoji: '1️⃣' },
  { id: 'ji6', trad: '二', jyut: 'ji6', en: 'Two', emoji: '2️⃣' },
  { id: 'saam1', trad: '三', jyut: 'saam1', en: 'Three', emoji: '3️⃣' },
  { id: 'sei3', trad: '四', jyut: 'sei3', en: 'Four', emoji: '4️⃣' },
  { id: 'ng5', trad: '五', jyut: 'ng5', en: 'Five', emoji: '5️⃣' },
  { id: 'luk6', trad: '六', jyut: 'luk6', en: 'Six', emoji: '6️⃣' },
  { id: 'cat1', trad: '七', jyut: 'cat1', en: 'Seven', emoji: '7️⃣' },
  { id: 'baat3', trad: '八', jyut: 'baat3', en: 'Eight', emoji: '8️⃣' },
  { id: 'gau2', trad: '九', jyut: 'gau2', en: 'Nine', emoji: '9️⃣' },
  { id: 'sap6', trad: '十', jyut: 'sap6', en: 'Ten', emoji: '🔟' },

  // Unit 3 — Family 屋企人 (authentic colloquial Cantonese)
  { id: 'baa4baa1', trad: '爸爸', jyut: 'baa4 baa1', en: 'Dad', emoji: '👨' },
  { id: 'maa4maa1', trad: '媽媽', jyut: 'maa4 maa1', en: 'Mum', emoji: '👩' },
  { id: 'go4go1', trad: '哥哥', jyut: 'go4 go1', en: 'Older brother', emoji: '👦' },
  { id: 'gaa1ze1', trad: '家姐', jyut: 'gaa1 ze1', en: 'Older sister', emoji: '👧' },
  { id: 'sai3lou2', trad: '細佬', jyut: 'sai3 lou2', en: 'Younger brother', emoji: '🧒' },
  { id: 'sai3mui2', trad: '細妹', jyut: 'sai3 mui2', en: 'Younger sister', emoji: '👶' },
  { id: 'zai2', trad: '仔', jyut: 'zai2', en: 'Son', emoji: '👼' },
  { id: 'neoi2', trad: '女', jyut: 'neoi2', en: 'Daughter', emoji: '🎀' },

  // Unit 4 — Food & Drink 飲食 (matches the playable demo)
  { id: 'caa4', trad: '茶', jyut: 'caa4', en: 'Tea', emoji: '🍵' },
  { id: 'seoi2', trad: '水', jyut: 'seoi2', en: 'Water', emoji: '💧' },
  { id: 'faan6', trad: '飯', jyut: 'faan6', en: 'Rice', emoji: '🍚' },
  { id: 'min6', trad: '麵', jyut: 'min6', en: 'Noodles', emoji: '🍜' },
  { id: 'ping4gwo2', trad: '蘋果', jyut: 'ping4 gwo2', en: 'Apple', emoji: '🍎' },
  { id: 'gai1daan2', trad: '雞蛋', jyut: 'gai1 daan2', en: 'Egg', emoji: '🥚' },
  { id: 'gaa3fe1', trad: '咖啡', jyut: 'gaa3 fe1', en: 'Coffee', emoji: '☕' },
  { id: 'jyu4', trad: '魚', jyut: 'jyu4', en: 'Fish', emoji: '🐟' },

  // Unit 5 — Pronouns & "to be" 我你佢
  { id: 'ngo5', trad: '我', jyut: 'ngo5', en: 'I / me', emoji: '🙋' },
  { id: 'nei5', trad: '你', jyut: 'nei5', en: 'You', emoji: '👉' },
  { id: 'keoi5', trad: '佢', jyut: 'keoi5', en: 'He / she', emoji: '🧑' },
  { id: 'ngo5dei6', trad: '我哋', jyut: 'ngo5 dei6', en: 'We', emoji: '👥' },
  { id: 'nei5dei6', trad: '你哋', jyut: 'nei5 dei6', en: 'You (pl.)', emoji: '👫' },
  { id: 'keoi5dei', trad: '佢哋', jyut: 'keoi5 dei6', en: 'They', emoji: '👪' },
  { id: 'hai6', trad: '係', jyut: 'hai6', en: 'To be / yes', emoji: '✅' },
  { id: 'm4hai6', trad: '唔係', jyut: 'm4 hai6', en: 'Is not / no', emoji: '❌' },

  // Unit 6 — Common verbs 動作
  { id: 'sik6', trad: '食', jyut: 'sik6', en: 'Eat', emoji: '🍽️' },
  { id: 'jam2', trad: '飲', jyut: 'jam2', en: 'Drink', emoji: '🥤' },
  { id: 'heoi3', trad: '去', jyut: 'heoi3', en: 'Go', emoji: '🚶' },
  { id: 'lai4', trad: '嚟', jyut: 'lai4', en: 'Come', emoji: '🤙' },
  { id: 'tai2', trad: '睇', jyut: 'tai2', en: 'Look / watch', emoji: '👀' },
  { id: 'teng1', trad: '聽', jyut: 'teng1', en: 'Listen / hear', emoji: '👂' },
  { id: 'gong2', trad: '講', jyut: 'gong2', en: 'Speak / say', emoji: '🗣️' },
  { id: 'zung1ji3', trad: '鍾意', jyut: 'zung1 ji3', en: 'Like', emoji: '❤️' },

  // Unit 7 — Politeness 禮貌 (new words; 唔該/多謝/對唔住 reviewed from Unit 1)
  { id: 'mgan2jiu3', trad: '唔緊要', jyut: 'm4 gan2 jiu3', en: 'Never mind', emoji: '🙆' },
  { id: 'cing2', trad: '請', jyut: 'cing2', en: 'Please (invite)', emoji: '🤲' },
  { id: 'mhouji3si1', trad: '唔好意思', jyut: 'm4 hou2 ji3 si1', en: 'Excuse me', emoji: '😅' }
];

export const LEVEL1: Level = {
  id: 'C1',
  index: 1,
  title: 'Foundations',
  titleHan: '入門',
  units: [
    {
      id: 'c1u1',
      index: 1,
      title: 'Greetings',
      titleHan: '問候',
      hue: 'jade',
      lessons: [
        { id: 'c1u1l1', title: 'Hello', newWords: ['nei5hou2', 'zou2san4', 'neihoumaa', 'mgoi1'] },
        { id: 'c1u1l2', title: 'Goodbye', newWords: ['do1ze6', 'zoi3gin3', 'baai1baai', 'deoimzyu'], reviewWords: ['nei5hou2', 'mgoi1'] },
        { id: 'c1u1l3', title: 'Greetings practice', newWords: [], reviewWords: ['nei5hou2', 'zou2san4', 'neihoumaa', 'mgoi1', 'do1ze6', 'zoi3gin3', 'baai1baai', 'deoimzyu'] },
        { id: 'c1u1l4', title: 'Greetings mastery', newWords: [], reviewWords: ['nei5hou2', 'zou2san4', 'neihoumaa', 'mgoi1', 'do1ze6', 'zoi3gin3', 'baai1baai', 'deoimzyu'], xp: 25 }
      ]
    },
    {
      id: 'c1u2',
      index: 2,
      title: 'Numbers',
      titleHan: '數字',
      hue: 'mandarin',
      lessons: [
        { id: 'c1u2l1', title: 'One to five', newWords: ['jat1', 'ji6', 'saam1', 'sei3', 'ng5'] },
        { id: 'c1u2l2', title: 'Six to ten', newWords: ['luk6', 'cat1', 'baat3', 'gau2', 'sap6'], reviewWords: ['jat1', 'ji6', 'saam1'] },
        { id: 'c1u2l3', title: 'Numbers practice', newWords: [], reviewWords: ['jat1', 'ji6', 'saam1', 'sei3', 'ng5', 'luk6', 'cat1', 'baat3', 'gau2', 'sap6'] },
        { id: 'c1u2l4', title: 'Numbers mastery', newWords: [], reviewWords: ['jat1', 'ji6', 'saam1', 'sei3', 'ng5', 'luk6', 'cat1', 'baat3', 'gau2', 'sap6'], xp: 25 }
      ]
    },
    {
      id: 'c1u3',
      index: 3,
      title: 'Family',
      titleHan: '屋企人',
      hue: 'pink',
      lessons: [
        { id: 'c1u3l1', title: 'Mum & dad', newWords: ['baa4baa1', 'maa4maa1', 'go4go1', 'gaa1ze1'] },
        { id: 'c1u3l2', title: 'Brothers & sisters', newWords: ['sai3lou2', 'sai3mui2', 'zai2', 'neoi2'], reviewWords: ['baa4baa1', 'maa4maa1'] },
        { id: 'c1u3l3', title: 'Family practice', newWords: [], reviewWords: ['baa4baa1', 'maa4maa1', 'go4go1', 'gaa1ze1', 'sai3lou2', 'sai3mui2', 'zai2', 'neoi2'] },
        { id: 'c1u3l4', title: 'Family mastery', newWords: [], reviewWords: ['baa4baa1', 'maa4maa1', 'go4go1', 'gaa1ze1', 'sai3lou2', 'sai3mui2', 'zai2', 'neoi2'], xp: 25 }
      ]
    },
    {
      id: 'c1u4',
      index: 4,
      title: 'Food & Drink',
      titleHan: '飲食',
      hue: 'coral',
      lessons: [
        { id: 'c1u4l1', title: 'At the table', newWords: ['caa4', 'seoi2', 'faan6', 'min6'] },
        { id: 'c1u4l2', title: 'Tasty things', newWords: ['ping4gwo2', 'gai1daan2', 'gaa3fe1', 'jyu4'], reviewWords: ['caa4', 'seoi2'] },
        { id: 'c1u4l3', title: 'Food practice', newWords: [], reviewWords: ['caa4', 'seoi2', 'faan6', 'min6', 'ping4gwo2', 'gai1daan2', 'gaa3fe1', 'jyu4'] },
        { id: 'c1u4l4', title: 'Food mastery', newWords: [], reviewWords: ['caa4', 'seoi2', 'faan6', 'min6', 'ping4gwo2', 'gai1daan2', 'gaa3fe1', 'jyu4'], xp: 25 }
      ]
    },
    {
      id: 'c1u5',
      index: 5,
      title: 'Pronouns & 係',
      titleHan: '我你佢',
      hue: 'violet',
      lessons: [
        { id: 'c1u5l1', title: 'Me, you, them', newWords: ['ngo5', 'nei5', 'keoi5', 'hai6'] },
        { id: 'c1u5l2', title: 'All of us', newWords: ['ngo5dei6', 'nei5dei6', 'keoi5dei', 'm4hai6'], reviewWords: ['ngo5', 'hai6'] },
        { id: 'c1u5l3', title: 'Pronouns practice', newWords: [], reviewWords: ['ngo5', 'nei5', 'keoi5', 'hai6', 'ngo5dei6', 'nei5dei6', 'keoi5dei', 'm4hai6'] },
        { id: 'c1u5l4', title: 'Pronouns mastery', newWords: [], reviewWords: ['ngo5', 'nei5', 'keoi5', 'hai6', 'ngo5dei6', 'nei5dei6', 'keoi5dei', 'm4hai6'], xp: 25 }
      ]
    },
    {
      id: 'c1u6',
      index: 6,
      title: 'Common verbs',
      titleHan: '動作',
      hue: 'azure',
      lessons: [
        { id: 'c1u6l1', title: 'Eat, drink, go', newWords: ['sik6', 'jam2', 'heoi3', 'lai4'] },
        { id: 'c1u6l2', title: 'Look, listen, speak', newWords: ['tai2', 'teng1', 'gong2', 'zung1ji3'], reviewWords: ['sik6', 'jam2'] },
        { id: 'c1u6l3', title: 'Verbs practice', newWords: [], reviewWords: ['sik6', 'jam2', 'heoi3', 'lai4', 'tai2', 'teng1', 'gong2', 'zung1ji3'] },
        { id: 'c1u6l4', title: 'Verbs mastery', newWords: [], reviewWords: ['sik6', 'jam2', 'heoi3', 'lai4', 'tai2', 'teng1', 'gong2', 'zung1ji3'], xp: 25 }
      ]
    },
    {
      id: 'c1u7',
      index: 7,
      title: 'Politeness',
      titleHan: '禮貌',
      hue: 'amber',
      lessons: [
        { id: 'c1u7l1', title: 'Being kind', newWords: ['mgan2jiu3', 'cing2'], reviewWords: ['mgoi1', 'do1ze6'] },
        { id: 'c1u7l2', title: 'Excuse me', newWords: ['mhouji3si1'], reviewWords: ['deoimzyu', 'mgan2jiu3', 'cing2', 'mgoi1'] },
        { id: 'c1u7l3', title: 'Politeness mastery', newWords: [], reviewWords: ['mgoi1', 'do1ze6', 'deoimzyu', 'mgan2jiu3', 'cing2', 'mhouji3si1'], xp: 25 }
      ]
    },
    {
      id: 'c1u8',
      index: 8,
      title: 'Checkpoint',
      titleHan: '關卡',
      hue: 'teal',
      lessons: [
        { id: 'c1u8l1', title: 'Checkpoint I', newWords: [], reviewWords: [], xp: 25 },
        { id: 'c1u8l2', title: 'Checkpoint II', newWords: [], reviewWords: [], xp: 25 },
        { id: 'c1u8l3', title: 'Checkpoint III', newWords: [], reviewWords: [], xp: 25 }
      ]
    }
  ]
};
