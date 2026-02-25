import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Shield, Swords, Trophy, Timer, Play, Pause, RotateCcw } from 'lucide-react';
import { questionService } from '../lib/questionService.ts';
import type { Difficulty, Question, Team } from '../lib/types.ts';

type PhaseType = 'attack' | 'defense' | 'duel';

type CurrentMatch = {
  matchId: string;
  opponent: Team;
  dinamoIsHome: boolean;
  minute: number;
  dinamoGoals: number;
  opponentGoals: number;
  finished: boolean;
};

type StandingRow = {
  team: Team;
  matchesPlayed: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
};

type QuestionPhase = {
  type: PhaseType;
  question: Question;
  answers: string[];
};

type ConceptMastery = Record<string, { asked: number; correct: number }>;

const DINAMO: Team = {
  id: 'dinamo',
  name: 'Dinamo',
  attack_strength: 78,
  defense_strength: 74,
  created_at: new Date().toISOString(),
};

const OTHER_TEAMS: Team[] = [
  { id: 'fcsb', name: 'FCSB', attack_strength: 86, defense_strength: 84, created_at: new Date().toISOString() },
  { id: 'cfr', name: 'CFR Cluj', attack_strength: 82, defense_strength: 83, created_at: new Date().toISOString() },
  { id: 'universitatea-craiova', name: 'U Craiova', attack_strength: 81, defense_strength: 80, created_at: new Date().toISOString() },
  { id: 'rapid', name: 'Rapid', attack_strength: 79, defense_strength: 78, created_at: new Date().toISOString() },
  { id: 'farul', name: 'Farul', attack_strength: 77, defense_strength: 75, created_at: new Date().toISOString() },
  { id: 'sepsi', name: 'Sepsi', attack_strength: 74, defense_strength: 74, created_at: new Date().toISOString() },
  { id: 'uta', name: 'UTA', attack_strength: 70, defense_strength: 71, created_at: new Date().toISOString() },
  { id: 'petrolul', name: 'Petrolul', attack_strength: 71, defense_strength: 70, created_at: new Date().toISOString() },
  { id: 'hermannstadt', name: 'Hermannstadt', attack_strength: 69, defense_strength: 72, created_at: new Date().toISOString() },
  { id: 'otelul', name: 'Oțelul', attack_strength: 68, defense_strength: 70, created_at: new Date().toISOString() },
  { id: 'u-cluj', name: 'U Cluj', attack_strength: 72, defense_strength: 73, created_at: new Date().toISOString() },
  { id: 'botosani', name: 'Botoșani', attack_strength: 66, defense_strength: 67, created_at: new Date().toISOString() },
  { id: 'iasi', name: 'Poli Iași', attack_strength: 65, defense_strength: 66, created_at: new Date().toISOString() },
  { id: 'slobozia', name: 'Unirea Slobozia', attack_strength: 64, defense_strength: 64, created_at: new Date().toISOString() },
  { id: 'buzau', name: 'Gloria Buzău', attack_strength: 63, defense_strength: 63, created_at: new Date().toISOString() },
];

const ALL_TEAMS = [DINAMO, ...OTHER_TEAMS];
const REGULAR_SCHEDULE = [...OTHER_TEAMS, ...OTHER_TEAMS].map((team, index) => ({
  matchId: `reg-${team.id}-${index}`,
  opponent: team,
  dinamoIsHome: index < OTHER_TEAMS.length,
}));

const MAX_MINUTE = 90;

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function randomDifficulty(): Difficulty {
  const roll = Math.random();
  if (roll < 0.45) return 'easy';
  if (roll < 0.8) return 'medium';
  return 'hard';
}

function shuffleAnswers(question: Question): string[] {
  return [question.correct_answer, ...question.wrong_answers]
    .filter((answer) => answer && answer.trim().length > 0)
    .sort(() => Math.random() - 0.5);
}

function createEmptyTable(): StandingRow[] {
  return ALL_TEAMS.map((team) => ({
    team,
    matchesPlayed: 0,
    wins: 0,
    draws: 0,
    losses: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    points: 0,
  }));
}

function sortTable(table: StandingRow[]): StandingRow[] {
  return [...table].sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    const goalDiffA = a.goalsFor - a.goalsAgainst;
    const goalDiffB = b.goalsFor - b.goalsAgainst;
    if (goalDiffB !== goalDiffA) return goalDiffB - goalDiffA;
    if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor;
    return a.team.name.localeCompare(b.team.name);
  });
}

export function QuizArena() {
  const [table, setTable] = useState<StandingRow[]>(createEmptyTable());
  const [schedule, setSchedule] = useState(REGULAR_SCHEDULE);
  const [phaseName, setPhaseName] = useState<'Regular' | 'Playoff' | 'Playout'>('Regular');
  const [matchIndex, setMatchIndex] = useState(0);
  const [currentMatch, setCurrentMatch] = useState<CurrentMatch | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [questionPhase, setQuestionPhase] = useState<QuestionPhase | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [logs, setLogs] = useState<string[]>(['Sezon nou: Dinamo intră pe teren!']);
  const [goalBanner, setGoalBanner] = useState<'dinamo' | 'opponent' | null>(null);
  const [questionStats, setQuestionStats] = useState<{ poo: number; csharp: number }>({ poo: 0, csharp: 0 });
  const [conceptMastery, setConceptMastery] = useState<ConceptMastery>({});

  const finishedSeason = matchIndex >= schedule.length && (!currentMatch || currentMatch.finished);

  const tableSorted = useMemo(() => sortTable(table), [table]);
  const dinamoPosition = tableSorted.findIndex((row) => row.team.id === DINAMO.id) + 1;
  const dinamoRow = tableSorted.find((row) => row.team.id === DINAMO.id);
  const conceptInsights = useMemo(() => {
    return (Object.entries(conceptMastery) as Array<[string, { asked: number; correct: number }]>)
      .map(([concept, stats]) => ({
        concept,
        asked: stats.asked,
        correct: stats.correct,
        rate: stats.asked ? Math.round((stats.correct / stats.asked) * 100) : 0,
      }))
      .sort((a, b) => a.rate - b.rate)
      .slice(0, 5);
  }, [conceptMastery]);

  useEffect(() => {
    void questionService.getQuestionStats().then(setQuestionStats);
  }, []);

  useEffect(() => {
    if (!currentMatch && matchIndex < schedule.length) {
      const fixture = schedule[matchIndex];
      setCurrentMatch({
        matchId: fixture.matchId,
        opponent: fixture.opponent,
        dinamoIsHome: fixture.dinamoIsHome,
        minute: 0,
        dinamoGoals: 0,
        opponentGoals: 0,
        finished: false,
      });
      setLogs((prev) => [
        `Meci nou (${phaseName}): ${fixture.dinamoIsHome ? 'Dinamo' : fixture.opponent.name} vs ${fixture.dinamoIsHome ? fixture.opponent.name : 'Dinamo'}`,
        ...prev,
      ]);
    }
  }, [currentMatch, matchIndex, phaseName, schedule]);

  useEffect(() => {
    if (!isRunning || !currentMatch || questionPhase || currentMatch.finished) return;

    const timer = window.setInterval(() => {
      void playMinute();
    }, 750);

    return () => window.clearInterval(timer);
  }, [isRunning, currentMatch, questionPhase]);

  useEffect(() => {
    if (goalBanner) {
      const timeout = window.setTimeout(() => setGoalBanner(null), 1200);
      return () => window.clearTimeout(timeout);
    }
  }, [goalBanner]);

  const applyGoal = (forDinamo: boolean) => {
    setCurrentMatch((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        dinamoGoals: prev.dinamoGoals + (forDinamo ? 1 : 0),
        opponentGoals: prev.opponentGoals + (forDinamo ? 0 : 1),
      };
    });

    setGoalBanner(forDinamo ? 'dinamo' : 'opponent');
    setLogs((prev) => [forDinamo ? 'GOOOL DINAMO! 🔴⚪' : 'Gol adversar... ⚫', ...prev]);
  };

  const maybeCreatePhase = async (minute: number, opponent: Team) => {
    const dinamoAttackChance = clamp(0.06 + (DINAMO.attack_strength - opponent.defense_strength) / 220, 0.04, 0.2);
    const opponentAttackChance = clamp(0.06 + (opponent.attack_strength - DINAMO.defense_strength) / 220, 0.04, 0.2);
    const roll = Math.random();

    if (roll < dinamoAttackChance) {
      const difficulty = randomDifficulty();
      const question = await questionService.getRandomQuestion('POO', difficulty);
      if (!question) return;

      const phaseType: PhaseType = difficulty === 'hard' ? 'duel' : 'attack';
      setQuestionPhase({ type: phaseType, question, answers: shuffleAnswers(question) });
      setSelectedAnswer(null);
      setLogs((prev) => [
        phaseType === 'duel'
          ? `${minute}' FAZĂ GREA! Duel total: atac + apărare (POO ${difficulty})`
          : `${minute}' Dinamo atacă! Întrebare POO (${difficulty})`,
        ...prev,
      ]);
      return;
    }

    if (roll < dinamoAttackChance + opponentAttackChance) {
      const difficulty = randomDifficulty();
      const question = await questionService.getRandomQuestion('C#', difficulty);
      if (!question) return;

      const phaseType: PhaseType = difficulty === 'hard' ? 'duel' : 'defense';
      setQuestionPhase({ type: phaseType, question, answers: shuffleAnswers(question) });
      setSelectedAnswer(null);
      setLogs((prev) => [
        phaseType === 'duel'
          ? `${minute}' FAZĂ GREA! Duel total: atac + apărare (C# ${difficulty})`
          : `${minute}' ${opponent.name} atacă! Întrebare C# (${difficulty})`,
        ...prev,
      ]);
      return;
    }

    if (minute % 15 === 0) {
      setLogs((prev) => [`${minute}' Joc de mijloc, fără faze mari.`, ...prev]);
    }
  };

  const playMinute = async () => {
    if (!currentMatch || currentMatch.finished || questionPhase) return;

    const nextMinute = currentMatch.minute + 1;

    if (nextMinute > MAX_MINUTE) {
      finalizeMatch();
      return;
    }

    setCurrentMatch((prev) => (prev ? { ...prev, minute: nextMinute } : prev));
    await maybeCreatePhase(nextMinute, currentMatch.opponent);

    if (nextMinute === MAX_MINUTE) {
      setLogs((prev) => [`90' Fluier final aproape...`, ...prev]);
    }
  };

  const finalizeMatch = () => {
    setIsRunning(false);
    setCurrentMatch((prev) => {
      if (!prev) return prev;

      const dinamoGoals = prev.dinamoGoals;
      const opponentGoals = prev.opponentGoals;

      setTable((oldTable) => {
        const updated = oldTable.map((row) => {
          if (row.team.id === DINAMO.id) {
            const wins = row.wins + (dinamoGoals > opponentGoals ? 1 : 0);
            const draws = row.draws + (dinamoGoals === opponentGoals ? 1 : 0);
            const losses = row.losses + (dinamoGoals < opponentGoals ? 1 : 0);
            return {
              ...row,
              matchesPlayed: row.matchesPlayed + 1,
              wins,
              draws,
              losses,
              goalsFor: row.goalsFor + dinamoGoals,
              goalsAgainst: row.goalsAgainst + opponentGoals,
              points: row.points + (dinamoGoals > opponentGoals ? 3 : dinamoGoals === opponentGoals ? 1 : 0),
            };
          }

          if (row.team.id === prev.opponent.id) {
            const oppWins = row.wins + (opponentGoals > dinamoGoals ? 1 : 0);
            const oppDraws = row.draws + (dinamoGoals === opponentGoals ? 1 : 0);
            const oppLosses = row.losses + (opponentGoals < dinamoGoals ? 1 : 0);
            return {
              ...row,
              matchesPlayed: row.matchesPlayed + 1,
              wins: oppWins,
              draws: oppDraws,
              losses: oppLosses,
              goalsFor: row.goalsFor + opponentGoals,
              goalsAgainst: row.goalsAgainst + dinamoGoals,
              points: row.points + (opponentGoals > dinamoGoals ? 3 : dinamoGoals === opponentGoals ? 1 : 0),
            };
          }

          return row;
        });

        const randomUpdated = updated.map((row) => {
          if (row.team.id === DINAMO.id || row.team.id === prev.opponent.id) return row;

          const formBoost = Math.random();
          if (formBoost > 0.7) {
            return {
              ...row,
              points: row.points + 1,
              goalsFor: row.goalsFor + Math.floor(Math.random() * 2),
              goalsAgainst: row.goalsAgainst + Math.floor(Math.random() * 2),
            };
          }

          return row;
        });

        return randomUpdated;
      });

      setLogs((oldLogs) => [
        `Final: Dinamo ${dinamoGoals}-${opponentGoals} ${prev.opponent.name}`,
        ...oldLogs,
      ]);

      return { ...prev, finished: true, minute: MAX_MINUTE };
    });
  };

  const handleAnswer = (answer: string) => {
    if (!questionPhase || selectedAnswer) return;

    setSelectedAnswer(answer);
    const isCorrect = answer === questionPhase.question.correct_answer;
    const conceptName = questionPhase.question.conceptTitle;

    setConceptMastery((prev) => {
      const current = prev[conceptName] ?? { asked: 0, correct: 0 };
      return {
        ...prev,
        [conceptName]: {
          asked: current.asked + 1,
          correct: current.correct + (isCorrect ? 1 : 0),
        },
      };
    });

    if (questionPhase.type === 'attack') {
      if (isCorrect) {
        applyGoal(true);
      } else {
        setLogs((prev) => ['Ratări în atac: nu se schimbă scorul.', ...prev]);
      }
    }

    if (questionPhase.type === 'defense') {
      if (isCorrect) {
        setLogs((prev) => ['Intervenție salvatoare! Dinamo nu primește gol.', ...prev]);
      } else {
        applyGoal(false);
      }
    }

    if (questionPhase.type === 'duel') {
      if (isCorrect) {
        applyGoal(true);
        setLogs((prev) => ['Răspuns greu corect: atac + apărare câștigate!', ...prev]);
      } else {
        applyGoal(false);
        setLogs((prev) => ['Întrebare grea ratată: adversarul lovește!', ...prev]);
      }
    }
  };

  const continueAfterQuestion = () => {
    setQuestionPhase(null);
    setSelectedAnswer(null);
  };

  const goToNextMatch = () => {
    if (!currentMatch?.finished) return;

    const nextIndex = matchIndex + 1;
    setMatchIndex(nextIndex);
    setCurrentMatch(null);

    if (phaseName === 'Regular' && nextIndex >= schedule.length) {
      const ranked = sortTable(table);
      const top6 = ranked.slice(0, 6).map((row) => row.team);
      const bottom = ranked.slice(6).map((row) => row.team);

      const inPlayoff = top6.some((team) => team.id === DINAMO.id);
      const targetGroup = inPlayoff ? top6.filter((team) => team.id !== DINAMO.id) : bottom.filter((team) => team.id !== DINAMO.id);

      const extraSchedule = targetGroup.map((team, index) => ({
        matchId: `${inPlayoff ? 'playoff' : 'playout'}-${team.id}-${index}`,
        opponent: team,
        dinamoIsHome: index % 2 === 0,
      }));

      setPhaseName(inPlayoff ? 'Playoff' : 'Playout');
      setSchedule(extraSchedule);
      setMatchIndex(0);
      setLogs((prev) => [
        inPlayoff
          ? 'Dinamo intră în PLAYOFF! Luptă pentru titlu.'
          : 'Dinamo intră în PLAYOUT! Luptă pentru salvare.',
        ...prev,
      ]);
    }
  };

  const resetSeason = () => {
    setTable(createEmptyTable());
    setSchedule(REGULAR_SCHEDULE);
    setPhaseName('Regular');
    setMatchIndex(0);
    setCurrentMatch(null);
    setQuestionPhase(null);
    setSelectedAnswer(null);
    setIsRunning(false);
    setGoalBanner(null);
    setConceptMastery({});
    setLogs(['Sezon resetat. Dinamo pornește iar la drum!']);
  };

  return (
    <div className="h-full overflow-y-auto p-4 md:p-8 bg-neutral-50">
      <div className="max-w-6xl mx-auto space-y-5">
        <div className="bg-gradient-to-r from-red-700 via-red-600 to-red-800 rounded-2xl p-5 text-white shadow-lg border border-red-500/30">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-black uppercase italic tracking-tight">Superliga Dinamo Quiz Mode</h1>
              <p className="text-sm text-red-50 mt-1">Marchezi prin POO. Te aperi prin C#. Câștigi sezonul cu creierul de programator.</p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <div className="px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-sm font-bold">Întrebări POO: {questionStats.poo}</div>
              <div className="px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-sm font-bold">Întrebări C#: {questionStats.csharp}</div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 bg-white rounded-2xl border border-neutral-200 shadow-sm p-5 space-y-4 relative overflow-hidden">
            <div className="absolute -right-8 -top-8 w-28 h-28 rounded-full bg-red-100 blur-2xl pointer-events-none" />
            <div className="absolute -left-10 bottom-8 w-28 h-28 rounded-full bg-neutral-200 blur-2xl pointer-events-none" />
            <AnimatePresence>
              {goalBanner && (
                <motion.div
                  initial={{ opacity: 0, y: -20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className={`absolute top-3 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full text-sm font-black uppercase tracking-wider z-20 ${
                    goalBanner === 'dinamo' ? 'bg-red-600 text-white shadow-lg shadow-red-400/50' : 'bg-neutral-900 text-white'
                  }`}
                >
                  {goalBanner === 'dinamo' ? 'GOOOL DINAMO ⚽' : 'Gol adversar'}
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {goalBanner === 'dinamo' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute inset-0 pointer-events-none"
                >
                  {['🔴', '⚪', '⚽', '🔥', '🐺'].map((icon, index) => (
                    <motion.span
                      key={`${icon}-${index}`}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: -70, opacity: [0, 1, 0] }}
                      transition={{ duration: 1.2, delay: index * 0.08 }}
                      className="absolute text-xl"
                      style={{ left: `${20 + index * 14}%`, bottom: '20%' }}
                    >
                      {icon}
                    </motion.span>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase font-black text-neutral-500">Fază sezon</p>
                <p className="text-xl font-black text-neutral-900">{phaseName}</p>
              </div>
              <div className="text-right">
                <p className="text-xs uppercase font-black text-neutral-500">Clasare Dinamo</p>
                <p className="text-xl font-black text-red-600">Locul {dinamoPosition || '-'}</p>
              </div>
            </div>

            {currentMatch ? (
              <>
                <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-bold text-neutral-700">{currentMatch.dinamoIsHome ? 'Dinamo' : currentMatch.opponent.name}</div>
                    <div className="text-2xl font-black text-neutral-900">{currentMatch.dinamoIsHome ? currentMatch.dinamoGoals : currentMatch.opponentGoals} - {currentMatch.dinamoIsHome ? currentMatch.opponentGoals : currentMatch.dinamoGoals}</div>
                    <div className="text-sm font-bold text-neutral-700">{currentMatch.dinamoIsHome ? currentMatch.opponent.name : 'Dinamo'}</div>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-xs font-bold uppercase text-neutral-500">
                    <span className="inline-flex items-center gap-1"><Timer size={12} /> Min {currentMatch.minute}</span>
                    <span>Meci {matchIndex + 1} / {schedule.length}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setIsRunning((prev) => !prev)}
                    disabled={currentMatch.finished || Boolean(questionPhase)}
                    className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 disabled:bg-neutral-300 text-white text-sm font-black uppercase tracking-wide flex items-center gap-2"
                  >
                    {isRunning ? <Pause size={14} /> : <Play size={14} />}
                    {isRunning ? 'Pauză simulare' : 'Pornește simularea'}
                  </button>

                  <button
                    onClick={() => {
                      void playMinute();
                    }}
                    disabled={currentMatch.finished || Boolean(questionPhase)}
                    className="px-4 py-2 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-100 disabled:bg-neutral-100 text-neutral-700 text-sm font-bold"
                  >
                    +1 minut
                  </button>

                  {currentMatch.finished && (
                    <button
                      onClick={goToNextMatch}
                      className="px-4 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white text-sm font-black uppercase tracking-wide"
                    >
                      Următorul meci
                    </button>
                  )}
                </div>

                {questionPhase && (
                  <div className="rounded-xl border-2 border-red-200 bg-red-50 p-4">
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <p className="text-xs font-black uppercase tracking-wide text-red-700 flex items-center gap-1">
                        <Swords size={14} />
                        {questionPhase.type === 'attack' && 'Fază de atac (POO)'}
                        {questionPhase.type === 'defense' && 'Fază de apărare (C#)'}
                        {questionPhase.type === 'duel' && 'Fază grea: atac + apărare'}
                      </p>
                      <span className="text-xs font-bold uppercase px-2 py-1 rounded bg-white border border-red-200 text-red-700">
                        {questionPhase.question.difficulty}
                      </span>
                    </div>

                    <div className="relative h-12 mb-3 rounded-lg bg-white border border-red-100 overflow-hidden">
                      <motion.div
                        animate={{ x: ['-15%', '115%'] }}
                        transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }}
                        className="absolute top-1/2 -translate-y-1/2 text-xl"
                      >
                        ⚽
                      </motion.div>
                      <div className="absolute inset-0 flex items-center justify-center text-[11px] font-black uppercase tracking-wide text-red-700">
                        {questionPhase.type === 'attack' && 'Atac Dinamo: marchezi dacă răspunzi corect'}
                        {questionPhase.type === 'defense' && 'Apărare Dinamo: nu iei gol dacă răspunzi corect'}
                        {questionPhase.type === 'duel' && 'Fază grea: răspunsul decide atac + apărare'}
                      </div>
                    </div>

                    <h3 className="text-lg font-black text-neutral-900 mb-2">{questionPhase.question.question}</h3>
                    <p className="text-sm text-neutral-600 mb-3">Concept: {questionPhase.question.conceptTitle}</p>

                    <div className="grid gap-2">
                      {questionPhase.answers.map((answer) => {
                        const isCorrect = answer === questionPhase.question.correct_answer;
                        const isPicked = answer === selectedAnswer;

                        let classes = 'w-full text-left px-3 py-2 rounded-lg border text-sm font-semibold bg-white border-neutral-200 hover:border-red-300';

                        if (selectedAnswer && isCorrect) {
                          classes = 'w-full text-left px-3 py-2 rounded-lg border text-sm font-semibold bg-green-50 border-green-300 text-green-800';
                        } else if (selectedAnswer && isPicked && !isCorrect) {
                          classes = 'w-full text-left px-3 py-2 rounded-lg border text-sm font-semibold bg-red-100 border-red-300 text-red-700';
                        }

                        return (
                          <button
                            key={answer}
                            className={classes}
                            onClick={() => handleAnswer(answer)}
                            disabled={Boolean(selectedAnswer)}
                          >
                            {answer}
                          </button>
                        );
                      })}
                    </div>

                    {selectedAnswer && (
                      <div className="mt-3 space-y-3">
                        <div className="rounded-lg bg-white border border-neutral-200 p-3 text-sm text-neutral-700 font-medium">
                          {questionPhase.question.explanation}
                        </div>
                        <button
                          onClick={continueAfterQuestion}
                          className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-black uppercase tracking-wide"
                        >
                          Continuă meciul
                        </button>
                      </div>
                    )}
                  </div>
                )}

                <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-3">
                  <p className="text-xs uppercase font-black text-neutral-500 mb-2">Comentariu live</p>
                  <div className="space-y-1 max-h-48 overflow-y-auto">
                    {logs.slice(0, 12).map((line, idx) => (
                      <p key={`${line}-${idx}`} className="text-sm text-neutral-700 font-medium">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="text-sm font-semibold text-neutral-600">Se pregătește următorul meci...</div>
            )}

            {finishedSeason && (
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-800">
                <p className="font-black uppercase tracking-wide flex items-center gap-2"><Trophy size={16} /> Sezon încheiat</p>
                <p className="text-sm font-semibold mt-1">Dinamo termină pe locul {dinamoPosition}. Puncte: {dinamoRow?.points ?? 0}.</p>
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-4 space-y-3">
            <p className="text-xs uppercase font-black text-neutral-500">Clasament Superliga</p>
            <div className="max-h-[620px] overflow-y-auto space-y-1">
              {tableSorted.map((row, index) => {
                const gd = row.goalsFor - row.goalsAgainst;
                const isDinamo = row.team.id === DINAMO.id;
                return (
                  <div
                    key={row.team.id}
                    className={`grid grid-cols-[28px_1fr_40px_40px_40px] gap-1 items-center rounded-lg px-2 py-1.5 border text-xs font-semibold ${
                      isDinamo
                        ? 'bg-red-50 border-red-200 text-red-700'
                        : 'bg-neutral-50 border-neutral-200 text-neutral-700'
                    }`}
                  >
                    <span className="font-black">{index + 1}</span>
                    <span className="truncate">{row.team.name}</span>
                    <span className="text-right">{row.points}p</span>
                    <span className="text-right">{row.matchesPlayed}j</span>
                    <span className="text-right">{gd >= 0 ? `+${gd}` : gd}</span>
                  </div>
                );
              })}
            </div>

            <div className="pt-2 border-t border-neutral-200 flex gap-2">
              <button
                onClick={resetSeason}
                className="flex-1 px-3 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-black uppercase tracking-wide inline-flex items-center justify-center gap-1"
              >
                <RotateCcw size={13} /> Reset sezon
              </button>
              <button
                onClick={() => setIsRunning(false)}
                className="flex-1 px-3 py-2 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-100 text-neutral-700 text-xs font-bold uppercase tracking-wide inline-flex items-center justify-center gap-1"
              >
                <Shield size={13} /> Stop
              </button>
            </div>

            <div className="pt-2 border-t border-neutral-200 space-y-2">
              <p className="text-xs uppercase font-black text-neutral-500">Mastery (zone de lucru)</p>
              {conceptInsights.length === 0 ? (
                <p className="text-xs text-neutral-600 font-semibold">Joacă faze de quiz ca să vezi unde mai ai gaps.</p>
              ) : (
                <div className="space-y-1 max-h-40 overflow-y-auto">
                  {conceptInsights.map((item) => (
                    <div key={item.concept} className="rounded-lg border border-neutral-200 bg-neutral-50 px-2 py-1.5">
                      <p className="text-[11px] font-bold text-neutral-700 truncate">{item.concept}</p>
                      <p className="text-[10px] text-neutral-500 font-semibold">{item.correct}/{item.asked} corecte ({item.rate}%)</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
