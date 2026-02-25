import { CURRICULUM } from './curriculum.ts';
import type { Difficulty, Question, QuestionType } from '../lib/types.ts';

type QuestionSeed = Omit<Question, 'id' | 'created_at'>;

const POO_MODULE_IDS = new Set([2, 3, 4, 16]);

function toType(moduleId: number): QuestionType {
  return POO_MODULE_IDS.has(moduleId) ? 'POO' : 'C#';
}

function difficultyFromIndex(index: number, detailCount: number): Difficulty {
  if (index === 0) return 'easy';
  if (detailCount >= 5 || index >= 2) return 'hard';
  return 'medium';
}

function uniquePick(pool: string[], exclude: string[], count: number): string[] {
  const excluded = new Set(exclude.map((item) => item.trim()));
  const picked: string[] = [];

  for (const value of pool) {
    const clean = value.trim();
    if (!clean || excluded.has(clean) || picked.includes(clean)) continue;
    picked.push(clean);
    if (picked.length >= count) break;
  }

  return picked;
}

function buildSeedQuestions(): QuestionSeed[] {
  const allDetails = CURRICULUM.flatMap((module) => module.concepts.flatMap((concept) => concept.details));
  const allContents = CURRICULUM.flatMap((module) => module.concepts.map((concept) => concept.content));

  return CURRICULUM.flatMap((module) => {
    const moduleType = toType(module.id);

    return module.concepts.flatMap((concept) => {
      const modulePool = module.concepts
        .flatMap((otherConcept) => otherConcept.details)
        .filter((detail) => detail !== concept.details[0]);

      const contentPool = module.concepts.map((otherConcept) => otherConcept.content);

      const seeds: QuestionSeed[] = [];

      const overviewCorrect = concept.content;
      const overviewWrong = uniquePick(contentPool, [overviewCorrect], 3);

      if (overviewWrong.length === 3) {
        seeds.push({
          type: moduleType,
          question: `În contextul aplicației Dinamo Prep, ce descrie cel mai bine conceptul „${concept.title}”?`,
          correct_answer: overviewCorrect,
          wrong_answers: overviewWrong,
          difficulty: 'easy',
          explanation: `${concept.analogy} | Repere tehnice: ${concept.details.slice(0, 2).join(' • ')}`,
          conceptTitle: concept.title,
        });
      }

      concept.details.forEach((detail, detailIndex) => {
        const baseWrong = uniquePick(modulePool, [detail], 3);
        const extraWrong = uniquePick(allDetails, [detail, ...baseWrong], 3 - baseWrong.length);
        const wrongAnswers = [...baseWrong, ...extraWrong].slice(0, 3);

        if (wrongAnswers.length === 3) {
          seeds.push({
            type: moduleType,
            question: `Care afirmație este corectă despre „${concept.title}”?`,
            correct_answer: detail,
            wrong_answers: wrongAnswers,
            difficulty: difficultyFromIndex(detailIndex, concept.details.length),
            explanation: `${concept.analogy} | Concept-cheie: ${concept.content}`,
            conceptTitle: concept.title,
          });
        }
      });

      const scenarioCorrect = `Pe analogia Dinamo, „${concept.title}” se leagă de: ${concept.content}`;
      const scenarioWrong = uniquePick(
        allContents.map((content) => `Pe analogia Dinamo, conceptul se leagă de: ${content}`),
        [scenarioCorrect],
        3,
      );

      if (scenarioWrong.length === 3) {
        seeds.push({
          type: moduleType,
          question: `În fază de meci, care interpretare este corectă pentru „${concept.title}”?`,
          correct_answer: scenarioCorrect,
          wrong_answers: scenarioWrong,
          difficulty: concept.details.length > 4 ? 'hard' : 'medium',
          explanation: `${concept.analogy} | Tactică oficială: ${concept.details.join(' • ')}`,
          conceptTitle: concept.title,
        });
      }

      return seeds;
    });
  });
}

export const QUESTION_BANK: Question[] = buildSeedQuestions().map((seed, index) => ({
  ...seed,
  id: `qb-${index + 1}`,
  created_at: new Date(Date.now() - index * 1000).toISOString(),
}));
