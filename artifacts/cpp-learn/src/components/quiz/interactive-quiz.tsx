import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  CheckCircle2, XCircle, ArrowRight, RotateCcw, 
  Trophy, Star, Lightbulb, AlertCircle 
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface QuizQuestion {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'code-output' | 'fill-blank' | 'arrange-code';
  question: string;
  code?: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  hint?: string;
}

interface InteractiveQuizProps {
  questions: QuizQuestion[];
  lessonTitle: string;
  onComplete?: (score: number, totalQuestions: number) => void;
}

export function InteractiveQuiz({ questions, lessonTitle, onComplete }: InteractiveQuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [arrangedCode, setArrangedCode] = useState<string[]>([]);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const checkAnswer = () => {
    if (!currentQuestion) return false;

    if (currentQuestion.type === 'arrange-code') {
      return JSON.stringify(arrangedCode) === JSON.stringify(currentQuestion.correctAnswer);
    }
    
    return selectedAnswer === currentQuestion.correctAnswer;
  };

  const handleSubmitAnswer = () => {
    const isCorrect = checkAnswer();
    setIsAnswered(true);
    
    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setArrangedCode([]);
      setIsAnswered(false);
      setShowHint(false);
    } else {
      setIsComplete(true);
      onComplete?.(score, questions.length);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setArrangedCode([]);
    setIsAnswered(false);
    setScore(0);
    setShowHint(false);
    setIsComplete(false);
  };

  const handleDragStart = (e: React.DragEvent, line: string) => {
    e.dataTransfer.setData('text/plain', line);
  };

  const handleDrop = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    const line = e.dataTransfer.getData('text/plain');
    const newArrangedCode = [...arrangedCode];
    newArrangedCode.splice(index, 0, line);
    setArrangedCode(newArrangedCode);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  if (isComplete) {
    const percentage = Math.round((score / questions.length) * 100);
    const passed = percentage >= 70;

    return (
      <Card className="p-8 text-center space-y-6">
        <div className={cn(
          "w-20 h-20 rounded-full mx-auto flex items-center justify-center",
          passed ? "bg-green-500/20" : "bg-amber-500/20"
        )}>
          {passed ? (
            <Trophy className="w-10 h-10 text-green-500" />
          ) : (
            <Star className="w-10 h-10 text-amber-500" />
          )}
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-2">
            {passed ? "Excellent Work! 🎉" : "Good Try! 💪"}
          </h2>
          <p className="text-muted-foreground">
            You scored <span className="font-bold text-primary text-xl">{score}/{questions.length}</span> ({percentage}%)
          </p>
        </div>

        <div className="space-y-2">
          {passed ? (
            <p className="text-green-500 font-medium">
              ✓ You've mastered {lessonTitle}!
            </p>
          ) : (
            <p className="text-amber-500 font-medium">
              Review the lesson and try again to improve your score
            </p>
          )}
        </div>

        <div className="flex gap-3 justify-center">
          <Button onClick={handleRestart} variant="outline" className="gap-2">
            <RotateCcw className="w-4 h-4" /> Retry Quiz
          </Button>
          <Button onClick={() => window.history.back()}>
            Back to Lesson
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress Header */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Badge variant="outline">Question {currentQuestionIndex + 1}/{questions.length}</Badge>
            <Badge variant={
              currentQuestion.difficulty === 'easy' ? 'secondary' :
              currentQuestion.difficulty === 'medium' ? 'default' : 'destructive'
            }>
              {currentQuestion.difficulty}
            </Badge>
          </div>
          <div className="text-sm text-muted-foreground">
            Score: {score}/{questions.length}
          </div>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question Card */}
      <Card className="p-6 space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-4">{currentQuestion.question}</h3>
          
          {currentQuestion.code && (
            <div className="bg-zinc-900 rounded-lg p-4 mb-4 overflow-x-auto">
              <pre className="text-sm">
                <code className="text-green-400">{currentQuestion.code}</code>
              </pre>
            </div>
          )}
        </div>

        {/* Multiple Choice */}
        {currentQuestion.type === 'multiple-choice' && currentQuestion.options && (
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswer === option;
              const isCorrect = option === currentQuestion.correctAnswer;
              const showResult = isAnswered && isSelected;

              return (
                <button
                  key={index}
                  onClick={() => !isAnswered && setSelectedAnswer(option)}
                  disabled={isAnswered}
                  className={cn(
                    "w-full p-4 rounded-lg border-2 text-left transition-all",
                    "hover:border-primary disabled:cursor-not-allowed",
                    isSelected && !isAnswered && "border-primary bg-primary/5",
                    showResult && isCorrect && "border-green-500 bg-green-500/10",
                    showResult && !isCorrect && "border-red-500 bg-red-500/10",
                    !isSelected && !isAnswered && "border-border"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {showResult && (
                      isCorrect ? 
                        <CheckCircle2 className="w-5 h-5 text-green-500" /> :
                        <XCircle className="w-5 h-5 text-red-500" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* True/False */}
        {currentQuestion.type === 'true-false' && (
          <div className="grid grid-cols-2 gap-4">
            {['True', 'False'].map((option) => {
              const isSelected = selectedAnswer === option;
              const isCorrect = option === currentQuestion.correctAnswer;
              const showResult = isAnswered && isSelected;

              return (
                <button
                  key={option}
                  onClick={() => !isAnswered && setSelectedAnswer(option)}
                  disabled={isAnswered}
                  className={cn(
                    "p-6 rounded-lg border-2 text-center transition-all font-semibold",
                    "hover:border-primary disabled:cursor-not-allowed",
                    isSelected && !isAnswered && "border-primary bg-primary/5",
                    showResult && isCorrect && "border-green-500 bg-green-500/10",
                    showResult && !isCorrect && "border-red-500 bg-red-500/10",
                    !isSelected && !isAnswered && "border-border"
                  )}
                >
                  {option}
                  {showResult && (
                    <div className="mt-2">
                      {isCorrect ? 
                        <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" /> :
                        <XCircle className="w-5 h-5 text-red-500 mx-auto" />
                      }
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* Code Output Prediction */}
        {currentQuestion.type === 'code-output' && (
          <div>
            <input
              type="text"
              value={selectedAnswer || ''}
              onChange={(e) => !isAnswered && setSelectedAnswer(e.target.value)}
              disabled={isAnswered}
              placeholder="Enter the expected output..."
              className="w-full p-4 rounded-lg border-2 bg-background"
            />
          </div>
        )}

        {/* Arrange Code (Drag & Drop) */}
        {currentQuestion.type === 'arrange-code' && currentQuestion.options && (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Drag and drop to arrange the code in the correct order:
            </p>
            
            {/* Drop Zone */}
            <div 
              className="border-2 border-dashed rounded-lg p-4 min-h-[200px] space-y-2"
              onDrop={(e) => handleDrop(e, arrangedCode.length)}
              onDragOver={handleDragOver}
            >
              {arrangedCode.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">Drop code lines here</p>
              ) : (
                arrangedCode.map((line, index) => (
                  <div
                    key={index}
                    className="bg-zinc-900 p-3 rounded font-mono text-sm flex items-center justify-between"
                  >
                    <span className="text-green-400">{line}</span>
                    <button
                      onClick={() => setArrangedCode(arrangedCode.filter((_, i) => i !== index))}
                      className="text-red-400 hover:text-red-300"
                    >
                      ✕
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Available Lines */}
            <div className="space-y-2">
              {currentQuestion.options
                .filter(line => !arrangedCode.includes(line))
                .map((line, index) => (
                  <div
                    key={index}
                    draggable
                    onDragStart={(e) => handleDragStart(e, line)}
                    className="bg-card border-2 p-3 rounded font-mono text-sm cursor-move hover:border-primary transition-colors"
                  >
                    {line}
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Hint Button */}
        {currentQuestion.hint && !isAnswered && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowHint(!showHint)}
            className="gap-2"
          >
            <Lightbulb className="w-4 h-4" />
            {showHint ? 'Hide Hint' : 'Show Hint'}
          </Button>
        )}

        {/* Hint Display */}
        {showHint && currentQuestion.hint && (
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 flex gap-3">
            <Lightbulb className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm">{currentQuestion.hint}</p>
          </div>
        )}

        {/* Explanation (After Answer) */}
        {isAnswered && (
          <div className={cn(
            "rounded-lg p-4 flex gap-3",
            checkAnswer() 
              ? "bg-green-500/10 border border-green-500/30" 
              : "bg-red-500/10 border border-red-500/30"
          )}>
            {checkAnswer() ? (
              <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            )}
            <div>
              <p className="font-semibold mb-1">
                {checkAnswer() ? "Correct!" : "Not quite right"}
              </p>
              <p className="text-sm">{currentQuestion.explanation}</p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-between pt-4">
          <Button
            variant="outline"
            onClick={() => currentQuestionIndex > 0 && setCurrentQuestionIndex(currentQuestionIndex - 1)}
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </Button>

          {!isAnswered ? (
            <Button
              onClick={handleSubmitAnswer}
              disabled={
                !selectedAnswer && 
                !(currentQuestion.type === 'arrange-code' && arrangedCode.length === currentQuestion.options?.length)
              }
            >
              Submit Answer
            </Button>
          ) : (
            <Button onClick={handleNextQuestion} className="gap-2">
              {currentQuestionIndex < questions.length - 1 ? (
                <>Next Question <ArrowRight className="w-4 h-4" /></>
              ) : (
                <>View Results <Trophy className="w-4 h-4" /></>
              )}
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}
