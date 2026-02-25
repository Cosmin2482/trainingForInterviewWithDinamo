export type Difficulty = 'easy' | 'medium' | 'hard';

export type QuestionType = 'POO' | 'C#';

export interface Question {
  id: string;
  type: QuestionType;
  question: string;
  correct_answer: string;
  wrong_answers: string[];
  difficulty: Difficulty;
  created_at: string;
  explanation: string;
  conceptTitle: string;
}

export interface Team {
  id: string;
  name: string;
  attack_strength: number;
  defense_strength: number;
  created_at: string;
}

export interface Match {
  id: string;
  home_team_id: string;
  away_team_id: string;
  round: number;
  dinamo_is_home: boolean;
  home_goals: number | null;
  away_goals: number | null;
  is_played: boolean;
  created_at: string;
}

export interface Standing {
  id: string;
  team_id: string;
  matches_played: number;
  wins: number;
  draws: number;
  losses: number;
  goals_for: number;
  goals_against: number;
  points: number;
  updated_at: string;
}
