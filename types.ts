export interface UserData {
  name: string;
  birthDate: string;
  birthTime: string;
  birthPlace: string;
}

export interface QuizOption {
  id: string;
  text: string;
  icon: string;
}

export interface Question {
  id: number;
  question: string;
  options: QuizOption[];
}

export type AppStep = 'hero' | 'form' | 'quiz' | 'loading' | 'results';

export interface QuizAnswer {
  questionId: number;
  answerText: string;
  answerIcon: string;
}