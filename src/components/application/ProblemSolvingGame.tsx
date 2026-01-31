import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Lightbulb, 
  RotateCcw,
  Trophy,
  Target
} from 'lucide-react';

interface ProblemSolvingGameProps {
  onComplete: (score: number, timeSpent: number) => void;
  isCompleted: boolean;
}

interface Puzzle {
  id: number;
  type: 'pattern' | 'logic' | 'sequence';
  question: string;
  options: string[];
  correctAnswer: number;
  hint: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
}

const puzzles: Puzzle[] = [
  {
    id: 1,
    type: 'pattern',
    question: 'What comes next in the sequence? 🔵 🔴 🔵 🔵 🔴 🔵 🔵 🔵 ?',
    options: ['🔴', '🔵', '🟢', '🟡'],
    correctAnswer: 0,
    hint: 'Count how many blue circles appear before each red one.',
    difficulty: 'easy',
    points: 10
  },
  {
    id: 2,
    type: 'logic',
    question: 'If all Bloops are Razzies and all Razzies are Lazzies, then all Bloops are definitely Lazzies. True or False?',
    options: ['True', 'False', 'Cannot be determined', 'Sometimes true'],
    correctAnswer: 0,
    hint: 'Think about the transitive property: if A→B and B→C, then A→C.',
    difficulty: 'easy',
    points: 10
  },
  {
    id: 3,
    type: 'sequence',
    question: 'Complete the number sequence: 2, 6, 12, 20, 30, ?',
    options: ['40', '42', '44', '36'],
    correctAnswer: 1,
    hint: 'Look at the differences between consecutive numbers.',
    difficulty: 'medium',
    points: 15
  },
  {
    id: 4,
    type: 'logic',
    question: 'A project requires 3 developers working 8 hours each to complete. How many hours would it take 6 developers working at the same rate?',
    options: ['16 hours', '4 hours', '12 hours', '24 hours'],
    correctAnswer: 1,
    hint: 'Total work stays the same: developers × hours = constant.',
    difficulty: 'medium',
    points: 15
  },
  {
    id: 5,
    type: 'pattern',
    question: 'In a team meeting, everyone shakes hands with everyone else exactly once. If there are 6 people, how many handshakes occur?',
    options: ['12', '15', '18', '30'],
    correctAnswer: 1,
    hint: 'Each person shakes hands with 5 others, but each handshake involves 2 people.',
    difficulty: 'hard',
    points: 20
  }
];

export function ProblemSolvingGame({ onComplete, isCompleted }: ProblemSolvingGameProps) {
  const [currentPuzzle, setCurrentPuzzle] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isGameComplete, setIsGameComplete] = useState(false);
  const [answers, setAnswers] = useState<boolean[]>([]);

  useEffect(() => {
    if (isCompleted || isGameComplete) return;
    
    const timer = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isCompleted, isGameComplete]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const puzzle = puzzles[currentPuzzle];
  const progress = ((currentPuzzle + (isAnswered ? 1 : 0)) / puzzles.length) * 100;

  const handleAnswer = (answerIndex: number) => {
    if (isAnswered) return;
    
    setSelectedAnswer(answerIndex);
    setIsAnswered(true);
    
    const isCorrect = answerIndex === puzzle.correctAnswer;
    const newAnswers = [...answers, isCorrect];
    setAnswers(newAnswers);
    
    if (isCorrect) {
      const hintPenalty = showHint ? Math.floor(puzzle.points * 0.3) : 0;
      setScore(prev => prev + puzzle.points - hintPenalty);
      setCorrectCount(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentPuzzle < puzzles.length - 1) {
      setCurrentPuzzle(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setShowHint(false);
    } else {
      setIsGameComplete(true);
      onComplete(score, timeElapsed);
    }
  };

  const handleRestart = () => {
    setCurrentPuzzle(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setCorrectCount(0);
    setShowHint(false);
    setTimeElapsed(0);
    setIsGameComplete(false);
    setAnswers([]);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-success bg-success-light';
      case 'medium': return 'text-warning bg-warning-light';
      case 'hard': return 'text-danger bg-danger-light';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getScoreRating = () => {
    const percentage = (score / 70) * 100;
    if (percentage >= 80) return { label: 'Excellent', color: 'text-success' };
    if (percentage >= 60) return { label: 'Good', color: 'text-primary' };
    if (percentage >= 40) return { label: 'Average', color: 'text-warning' };
    return { label: 'Needs Improvement', color: 'text-danger' };
  };

  if (isCompleted || isGameComplete) {
    const rating = getScoreRating();
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="text-center">
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 mb-4">
            <Trophy className="h-10 w-10 text-primary" />
          </div>
          <h2 className="font-display text-xl font-semibold mb-2">Challenge Complete!</h2>
          <p className="text-muted-foreground">Here's how you performed on the problem-solving assessment.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-border bg-muted/30 p-4 text-center">
            <Target className="h-6 w-6 mx-auto mb-2 text-primary" />
            <p className="text-2xl font-bold text-primary">{score}/70</p>
            <p className="text-sm text-muted-foreground">Total Score</p>
          </div>
          <div className="rounded-lg border border-border bg-muted/30 p-4 text-center">
            <CheckCircle2 className="h-6 w-6 mx-auto mb-2 text-success" />
            <p className="text-2xl font-bold">{correctCount}/{puzzles.length}</p>
            <p className="text-sm text-muted-foreground">Correct Answers</p>
          </div>
          <div className="rounded-lg border border-border bg-muted/30 p-4 text-center">
            <Clock className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
            <p className="text-2xl font-bold">{formatTime(timeElapsed)}</p>
            <p className="text-sm text-muted-foreground">Time Taken</p>
          </div>
        </div>

        <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 text-center">
          <p className="text-sm text-muted-foreground mb-1">Overall Rating</p>
          <p className={`text-xl font-bold ${rating.color}`}>{rating.label}</p>
        </div>

        <div className="flex gap-3 justify-center">
          <Button variant="outline" onClick={handleRestart}>
            <RotateCcw className="h-4 w-4" />
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-xl font-semibold mb-2">Problem-Solving Challenge</h2>
        <p className="text-muted-foreground text-sm">
          Complete these puzzles to demonstrate your analytical thinking skills.
        </p>
      </div>

      {/* Stats Bar */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <Brain className="h-4 w-4 text-primary" />
            Question {currentPuzzle + 1}/{puzzles.length}
          </span>
          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(puzzle.difficulty)}`}>
            {puzzle.difficulty}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <Trophy className="h-4 w-4 text-warning" />
            {score} pts
          </span>
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <Clock className="h-4 w-4" />
            {formatTime(timeElapsed)}
          </span>
        </div>
      </div>

      <Progress value={progress} className="h-2" />

      {/* Question */}
      <div className="rounded-lg border border-border bg-muted/30 p-6">
        <p className="font-medium text-lg leading-relaxed">{puzzle.question}</p>
        <p className="text-xs text-muted-foreground mt-2">Worth {puzzle.points} points</p>
      </div>

      {/* Options */}
      <div className="grid gap-3 sm:grid-cols-2">
        {puzzle.options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrect = index === puzzle.correctAnswer;
          const showResult = isAnswered;

          let optionClass = 'border-border hover:border-primary/50 hover:bg-primary/5';
          if (showResult && isCorrect) {
            optionClass = 'border-success bg-success-light';
          } else if (showResult && isSelected && !isCorrect) {
            optionClass = 'border-danger bg-danger-light';
          } else if (isSelected) {
            optionClass = 'border-primary bg-primary/10';
          }

          return (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              disabled={isAnswered}
              className={`relative flex items-center gap-3 rounded-lg border-2 p-4 text-left transition-all ${optionClass} ${
                isAnswered ? 'cursor-default' : 'cursor-pointer'
              }`}
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-current font-medium text-sm">
                {String.fromCharCode(65 + index)}
              </span>
              <span className="font-medium">{option}</span>
              {showResult && isCorrect && (
                <CheckCircle2 className="absolute right-4 h-5 w-5 text-success" />
              )}
              {showResult && isSelected && !isCorrect && (
                <XCircle className="absolute right-4 h-5 w-5 text-danger" />
              )}
            </button>
          );
        })}
      </div>

      {/* Hint */}
      {!isAnswered && (
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => setShowHint(true)}
          disabled={showHint}
          className="text-muted-foreground"
        >
          <Lightbulb className="h-4 w-4" />
          {showHint ? 'Hint shown (-30% points)' : 'Show Hint (-30% points)'}
        </Button>
      )}

      {showHint && !isAnswered && (
        <div className="rounded-lg border border-warning/20 bg-warning-light p-4 text-sm animate-fade-in">
          <p className="flex items-center gap-2 font-medium text-warning mb-1">
            <Lightbulb className="h-4 w-4" />
            Hint
          </p>
          <p className="text-foreground">{puzzle.hint}</p>
        </div>
      )}

      {/* Result Feedback */}
      {isAnswered && (
        <div className={`rounded-lg p-4 animate-fade-in ${
          selectedAnswer === puzzle.correctAnswer 
            ? 'bg-success-light border border-success/20' 
            : 'bg-danger-light border border-danger/20'
        }`}>
          {selectedAnswer === puzzle.correctAnswer ? (
            <p className="flex items-center gap-2 font-medium text-success">
              <CheckCircle2 className="h-5 w-5" />
              Correct! +{showHint ? puzzle.points - Math.floor(puzzle.points * 0.3) : puzzle.points} points
            </p>
          ) : (
            <div>
              <p className="flex items-center gap-2 font-medium text-danger mb-1">
                <XCircle className="h-5 w-5" />
                Not quite right
              </p>
              <p className="text-sm text-foreground">
                The correct answer was: <span className="font-medium">{puzzle.options[puzzle.correctAnswer]}</span>
              </p>
            </div>
          )}
        </div>
      )}

      {/* Next Button */}
      {isAnswered && (
        <div className="flex justify-end">
          <Button onClick={handleNext} variant="hero">
            {currentPuzzle < puzzles.length - 1 ? 'Next Question' : 'See Results'}
          </Button>
        </div>
      )}
    </div>
  );
}
