import type { Sentence } from '../types';

// ─────────────────────────────────────────────────────────────────────────────
// Word-bank sentence templates. A sentence only enters the exercise pool once
// every vocab id in `needs` has been seen by the learner. Particles (呀/喇/啦)
// ride along as tiles with their own Jyutping — natural spoken Cantonese.
// ─────────────────────────────────────────────────────────────────────────────

export const SENTENCES: Record<'C1' | 'C2' | 'C3', Sentence[]> = {
  C1: [
    {
      tokens: [{ t: '我', j: 'ngo5' }, { t: '鍾意', j: 'zung1 ji3' }, { t: '茶', j: 'caa4' }],
      en: 'I like tea',
      needs: ['ngo5', 'zung1ji3', 'caa4']
    },
    {
      tokens: [{ t: '我', j: 'ngo5' }, { t: '鍾意', j: 'zung1 ji3' }, { t: '咖啡', j: 'gaa3 fe1' }],
      en: 'I like coffee',
      needs: ['ngo5', 'zung1ji3', 'gaa3fe1']
    },
    {
      tokens: [{ t: '佢', j: 'keoi5' }, { t: '飲', j: 'jam2' }, { t: '水', j: 'seoi2' }],
      en: 'He drinks water',
      needs: ['keoi5', 'jam2', 'seoi2']
    },
    {
      tokens: [{ t: '我哋', j: 'ngo5 dei6' }, { t: '食', j: 'sik6' }, { t: '飯', j: 'faan6' }],
      en: 'We eat rice',
      needs: ['ngo5dei6', 'sik6', 'faan6']
    },
    {
      tokens: [{ t: '佢', j: 'keoi5' }, { t: '係', j: 'hai6' }, { t: '我', j: 'ngo5' }, { t: '爸爸', j: 'baa4 baa1' }],
      en: 'He is my dad',
      needs: ['keoi5', 'hai6', 'ngo5', 'baa4baa1']
    },
    {
      tokens: [{ t: '佢', j: 'keoi5' }, { t: '唔係', j: 'm4 hai6' }, { t: '我', j: 'ngo5' }, { t: '媽媽', j: 'maa4 maa1' }],
      en: 'She is not my mum',
      needs: ['keoi5', 'm4hai6', 'ngo5', 'maa4maa1']
    },
    {
      tokens: [{ t: '早晨', j: 'zou2 san4' }, { t: '爸爸', j: 'baa4 baa1' }],
      en: 'Good morning, Dad',
      needs: ['zou2san4', 'baa4baa1']
    },
    {
      tokens: [{ t: '多謝', j: 'do1 ze6' }, { t: '媽媽', j: 'maa4 maa1' }],
      en: 'Thank you, Mum',
      needs: ['do1ze6', 'maa4maa1']
    },
    {
      tokens: [{ t: '你', j: 'nei5' }, { t: '食', j: 'sik6' }, { t: '蘋果', j: 'ping4 gwo2' }],
      en: 'You eat an apple',
      needs: ['nei5', 'sik6', 'ping4gwo2']
    },
    {
      tokens: [{ t: '我', j: 'ngo5' }, { t: '係', j: 'hai6' }, { t: '細佬', j: 'sai3 lou2' }],
      en: 'I am the younger brother',
      needs: ['ngo5', 'hai6', 'sai3lou2']
    },
    {
      tokens: [{ t: '佢哋', j: 'keoi5 dei6' }, { t: '睇', j: 'tai2' }, { t: '魚', j: 'jyu4' }],
      en: 'They look at the fish',
      needs: ['keoi5dei', 'tai2', 'jyu4']
    }
  ],

  C2: [
    {
      tokens: [{ t: '茶', j: 'caa4' }, { t: '幾多錢', j: 'gei2 do1 cin2' }, { t: '呀', j: 'aa3' }],
      en: 'How much is the tea?',
      needs: ['caa4', 'gei2do1cin2']
    },
    {
      tokens: [{ t: '我想要', j: 'ngo5 soeng2 jiu3' }, { t: '一杯', j: 'jat1 bui1' }, { t: '咖啡', j: 'gaa3 fe1' }],
      en: "I'd like a cup of coffee",
      needs: ['soeng2jiu3', 'jat1bui1', 'gaa3fe1']
    },
    {
      tokens: [{ t: '我想要', j: 'ngo5 soeng2 jiu3' }, { t: '一碗', j: 'jat1 wun2' }, { t: '麵', j: 'min6' }],
      en: "I'd like a bowl of noodles",
      needs: ['soeng2jiu3', 'jat1wun2', 'min6']
    },
    {
      tokens: [{ t: '唔該', j: 'm4 goi1' }, { t: '埋單', j: 'maai4 daan1' }],
      en: 'The bill, please',
      needs: ['mgoi1', 'maai4daan1']
    },
    {
      tokens: [{ t: '學校', j: 'hok6 haau6' }, { t: '喺', j: 'hai2' }, { t: '邊度', j: 'bin1 dou6' }, { t: '呀', j: 'aa3' }],
      en: 'Where is the school?',
      needs: ['hok6haau6', 'hai2', 'bin1dou6']
    },
    {
      tokens: [{ t: '我', j: 'ngo5' }, { t: '喺', j: 'hai2' }, { t: '屋企', j: 'uk1 kei2' }],
      en: 'I am at home',
      needs: ['ngo5', 'hai2', 'uk1kei2']
    },
    {
      tokens: [{ t: '港鐵', j: 'gong2 tit3' }, { t: '喺', j: 'hai2' }, { t: '左邊', j: 'zo2 bin1' }],
      en: 'The MTR is on the left',
      needs: ['gong2tit3', 'hai2', 'zo2bin1']
    },
    {
      tokens: [{ t: '今日', j: 'gam1 jat6' }, { t: '落雨', j: 'lok6 jyu5' }],
      en: "It's raining today",
      needs: ['gam1jat6', 'lok6jyu5']
    },
    {
      tokens: [{ t: '聽日', j: 'ting1 jat6' }, { t: '好天', j: 'hou2 tin1' }],
      en: 'Tomorrow will be sunny',
      needs: ['ting1jat6', 'hou2tin1']
    },
    {
      tokens: [{ t: '我', j: 'ngo5' }, { t: '買', j: 'maai5' }, { t: '衫', j: 'saam1' }],
      en: 'I buy clothes',
      needs: ['ngo5', 'maai5', 'saam1b']
    },
    {
      tokens: [{ t: '咖啡', j: 'gaa3 fe1' }, { t: '好', j: 'hou2' }, { t: '貴', j: 'gwai3' }],
      en: 'Coffee is very expensive',
      needs: ['gaa3fe1', 'hou2', 'gwai3']
    },
    {
      tokens: [{ t: '茶', j: 'caa4' }, { t: '好', j: 'hou2' }, { t: '平', j: 'peng4' }],
      en: 'Tea is very cheap',
      needs: ['caa4', 'hou2', 'peng4']
    },
    {
      tokens: [{ t: '屋企', j: 'uk1 kei2' }, { t: '好', j: 'hou2' }, { t: '大', j: 'daai6' }],
      en: 'The house is very big',
      needs: ['uk1kei2', 'hou2', 'daai6']
    },
    {
      tokens: [{ t: '細佬', j: 'sai3 lou2' }, { t: '好', j: 'hou2' }, { t: '攰', j: 'gui6' }],
      en: 'Little brother is very tired',
      needs: ['sai3lou2', 'hou2', 'gui6']
    },
    {
      tokens: [{ t: '我', j: 'ngo5' }, { t: '好', j: 'hou2' }, { t: '肚餓', j: 'tou5 ngo6' }, { t: '呀', j: 'aa3' }],
      en: "I'm so hungry!",
      needs: ['ngo5', 'hou2', 'tou5ngo6']
    }
  ],

  C3: [
    {
      tokens: [{ t: '我', j: 'ngo5' }, { t: '聽日', j: 'ting1 jat6' }, { t: '返工', j: 'faan1 gung1' }],
      en: 'I go to work tomorrow',
      needs: ['ngo5', 'ting1jat6', 'faan1gung1']
    },
    {
      tokens: [{ t: '我', j: 'ngo5' }, { t: '食緊', j: 'sik6 gan2' }, { t: '飯', j: 'faan6' }],
      en: 'I am eating (right now)',
      needs: ['ngo5', 'sik6gan2', 'faan6']
    },
    {
      tokens: [{ t: '你', j: 'nei5' }, { t: '食咗', j: 'sik6 zo2' }, { t: '飯', j: 'faan6' }, { t: '未', j: 'mei6' }, { t: '呀', j: 'aa3' }],
      en: 'Have you eaten yet?',
      needs: ['nei5', 'sik6zo2', 'faan6', 'mei6']
    },
    {
      tokens: [{ t: '我', j: 'ngo5' }, { t: '去過', j: 'heoi3 gwo3' }, { t: '餐廳', j: 'caan1 teng1' }],
      en: "I've been to the restaurant",
      needs: ['ngo5', 'heoi3gwo3', 'caan1teng1']
    },
    {
      tokens: [{ t: '我哋', j: 'ngo5 dei6' }, { t: '聽日', j: 'ting1 jat6' }, { t: '一齊', j: 'jat1 cai4' }, { t: '食', j: 'sik6' }, { t: '飯', j: 'faan6' }],
      en: "Let's eat together tomorrow",
      needs: ['ngo5dei6', 'ting1jat6', 'jat1cai4', 'sik6', 'faan6']
    },
    {
      tokens: [{ t: '你', j: 'nei5' }, { t: '幾時', j: 'gei2 si4' }, { t: '返屋企', j: 'faan1 uk1 kei2' }, { t: '呀', j: 'aa3' }],
      en: 'When are you going home?',
      needs: ['nei5', 'gei2si4', 'faan1uk1kei2']
    },
    {
      tokens: [{ t: '我', j: 'ngo5' }, { t: '會', j: 'wui5' }, { t: '搭', j: 'daap3' }, { t: '巴士', j: 'baa1 si2' }],
      en: 'I will take the bus',
      needs: ['ngo5', 'wui5', 'daap3', 'baa1si2']
    },
    {
      tokens: [{ t: '搭', j: 'daap3' }, { t: '的士', j: 'dik1 si2' }, { t: '去', j: 'heoi3' }, { t: '學校', j: 'hok6 haau6' }],
      en: 'Take a taxi to school',
      needs: ['daap3', 'dik1si2', 'heoi3', 'hok6haau6']
    },
    {
      tokens: [{ t: '好耐冇見', j: 'hou2 noi6 mou5 gin3' }, { t: '你', j: 'nei5' }, { t: '點呀', j: 'dim2 aa3' }],
      en: 'Long time no see — how are you?',
      needs: ['hou2noi6mou5gin3', 'nei5', 'dim2aa3']
    },
    {
      tokens: [{ t: '我', j: 'ngo5' }, { t: '頭', j: 'tau4' }, { t: '痛', j: 'tung3' }],
      en: 'My head hurts',
      needs: ['ngo5', 'tau4', 'tung3']
    },
    {
      tokens: [{ t: '佢', j: 'keoi5' }, { t: '病', j: 'beng6' }, { t: '咗', j: 'zo2' }],
      en: 'He has fallen ill',
      needs: ['keoi5', 'beng6', 'zo2']
    },
    {
      tokens: [{ t: '我', j: 'ngo5' }, { t: '瞓覺', j: 'fan3 gaau3' }, { t: '喇', j: 'laa3' }],
      en: "I'm off to sleep now",
      needs: ['ngo5', 'fan3gaau3']
    },
    {
      tokens: [{ t: '聽日', j: 'ting1 jat6' }, { t: '一齊', j: 'jat1 cai4' }, { t: '傾偈', j: 'king1 gai2' }, { t: '得唔得', j: 'dak1 m4 dak1' }, { t: '呀', j: 'aa3' }],
      en: 'Shall we chat together tomorrow?',
      needs: ['ting1jat6', 'jat1cai4', 'king1gai2', 'dak1m4dak1']
    }
  ]
};
