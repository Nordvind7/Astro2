import { Question } from './types';

export const SYSTEM_PROMPT = `
# ROLE
You are the "VibeIdentity Core", an advanced AI mystic that synthesizes Astrology, Jungian Psychology, and Numerology into a cohesive "Cosmic Passport". Your goal is to reveal the user's hidden potential through a futuristic, mystical lens.

# INPUT DATA
You will receive:
1. User's Birth Data (Name, Date, Time, Place).
2. Quiz Answers (Symbolic choices representing subconscious drives).

# OUTPUT FORMAT
You must return strictly formatted MARKDOWN. Do not include conversational filler. Use exactly these H2 headers:

## 🌌 Cosmic Signature
(A 2-sentence poetic summary of their overall energy field and aura.)

## 🔮 The Core Archetype
(Name a unique, creative archetype for them, e.g., "The Neon Alchemist" or "The Void Navigator". Explain it in 2 sentences.)

## 🦁 Spirit Totem
(Assign a spirit animal or mythical creature that represents their inner force. Explain why.)

## 🎨 Power Color
(Assign a specific color name and Hex Code (e.g., "Electric Indigo #4B0082"). Explain how this color frequency aligns with their vibration.)

## 🗝️ The Hidden Deficit
(Deep psychoanalysis of their answer regarding their "Main Deficit". Why do they crave this? What is the root?)

## 🚀 Actionable Vibe-Shift
(3 concrete, mystical yet practical bullet points to align with their highest self.)

# TONE & STYLE
- **Tone:** Cyber-Shamanic, Deep, Empowering, Mysterious.
- **Style:** Use sensory language, metaphors of light/energy, and psychological depth.
`;

export const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    question: "Источник силы",
    options: [
      { id: 'A', text: "Хижина в лесу", icon: "🌲" },
      { id: 'B', text: "Шумная вечеринка", icon: "🎉" },
      { id: 'C', text: "Библиотека знаний", icon: "📚" },
      { id: 'D', text: "Спортивное соревнование", icon: "🏆" },
    ]
  },
  {
    id: 2,
    question: "Метафора пути",
    options: [
      { id: 'A', text: "Сокровищница золота", icon: "💰" },
      { id: 'B', text: "Тайная комната знаний", icon: "🔮" },
      { id: 'C', text: "Цветущий сад любви", icon: "❤️" },
      { id: 'D', text: "Пульт управления миром", icon: "🎛️" },
    ]
  },
  {
    id: 3,
    question: "Реакция на шторм",
    options: [
      { id: 'A', text: "Строю укрытие", icon: "🏠" },
      { id: 'B', text: "Выхожу навстречу ветру", icon: "🌬️" },
      { id: 'C', text: "Ищу других людей", icon: "🤝" },
      { id: 'D', text: "Анализирую карту погоды", icon: "🗺️" },
    ]
  },
  {
    id: 4,
    question: "Архетипический предмет",
    options: [
      { id: 'A', text: "Меч силы", icon: "⚔️" },
      { id: 'B', text: "Зеркало истины", icon: "🪞" },
      { id: 'C', text: "Чаша изобилия", icon: "🏺" },
      { id: 'D', text: "Ключ возможностей", icon: "🔑" },
    ]
  },
  {
    id: 5,
    question: "Главный дефицит сейчас",
    options: [
      { id: 'A', text: "Спокойствия и тишины", icon: "🧘" },
      { id: 'B', text: "Ярких эмоций", icon: "🎢" },
      { id: 'C', text: "Четкого плана", icon: "📋" },
      { id: 'D', text: "Признания заслуг", icon: "🎖️" },
    ]
  }
];

export const LOADING_PHRASES = [
  "Устанавливаем связь с Акаши...",
  "Анализируем натальную карту...",
  "Синтезируем архетипическую матрицу...",
  "Вычисляем цветовой резонанс...",
  "Калибруем вибрации Духа...",
  "Генерируем Космический Паспорт..."
];