import { QUESTION_BANK } from '../data/questionBank.ts';
import type { Difficulty, Question, QuestionType } from './types.ts';

const mutableQuestionBank: Question[] = [...QUESTION_BANK];

function pickRandom<T>(items: T[]): T | null {
  if (!items.length) return null;
  return items[Math.floor(Math.random() * items.length)];
}

export const questionService = {
  async getRandomQuestion(type: QuestionType, difficulty?: Difficulty): Promise<Question | null> {
    const filtered = mutableQuestionBank.filter((question) => {
      if (question.type !== type) return false;
      if (difficulty && question.difficulty !== difficulty) return false;
      return true;
    });

    if (!filtered.length) {
      console.warn(`No questions found for type: ${type}, difficulty: ${difficulty}`);
      return null;
    }

    return pickRandom(filtered);
  },

  async getQuestionsByType(type: QuestionType): Promise<Question[]> {
    return mutableQuestionBank.filter((question) => question.type === type);
  },

  async getQuestionsByDifficulty(difficulty: Difficulty): Promise<Question[]> {
    return mutableQuestionBank.filter((question) => question.difficulty === difficulty);
  },

  async getAllQuestions(): Promise<Question[]> {
    return [...mutableQuestionBank].sort((a, b) => (a.created_at < b.created_at ? 1 : -1));
  },

  async addQuestion(
    type: QuestionType,
    question: string,
    correct_answer: string,
    wrong_answers: string[],
    difficulty: Difficulty = 'medium',
  ): Promise<Question | null> {
    const newQuestion: Question = {
      id: `custom-${Date.now()}`,
      type,
      question,
      correct_answer,
      wrong_answers,
      difficulty,
      created_at: new Date().toISOString(),
      explanation: 'Întrebare adăugată manual.',
      conceptTitle: 'Custom',
    };

    mutableQuestionBank.unshift(newQuestion);
    return newQuestion;
  },

  async getQuestionStats(): Promise<{ poo: number; csharp: number }> {
    const poo = mutableQuestionBank.filter((question) => question.type === 'POO').length;
    const csharp = mutableQuestionBank.filter((question) => question.type === 'C#').length;

    return { poo, csharp };
  },
};

export const quizQuestionTypes: QuestionType[] = ['POO', 'C#'];
