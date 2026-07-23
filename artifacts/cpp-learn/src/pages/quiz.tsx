import { useParams, useLocation } from "wouter";
import { useGetLessonQuiz, useGetLessons } from "@/hooks/use-static-data";
import { useState } from "react";
import { useLocalProgress } from "@/hooks/use-local-progress";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SimpleSyntaxHighlighter } from "@/components/ui/syntax-highlighter";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, Trophy, ArrowRight, RotateCcw, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Link } from "wouter";
import { ClearCacheButton } from "@/components/clear-cache-button";

export default function QuizPage() {
  const { lessonId: lessonIdParam } = useParams<{ lessonId: string }>();
  const [_, setLocation] = useLocation();
  const lessonId = lessonIdParam || "";
  const { data: questions } = useGetLessonQuiz(lessonId);
  const { data: allLessons } = useGetLessons();
  const { saveQuizScore } = useLocalProgress();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);

  // Debug logging
  console.log('Quiz Page - Lesson ID:', lessonId);
  console.log('Quiz Questions:', questions);
  console.log('Questions count:', questions?.length || 0);

  if (!questions || questions.length === 0) {
    // Find lessons that have quizzes
    const lessonsWithQuizzes = [
      { id: "what-is-cpp", title: "What Is C++?" },
      { id: "how-cpp-works", title: "How C++ Works" },
      { id: "data-types", title: "Data Types" },
      { id: "operators", title: "Operators" },
      { id: "loops", title: "Loops" },
      { id: "functions", title: "Functions" },
      { id: "input-output", title: "Input & Output" },
      { id: "pointers-memory", title: "Pointers & Memory" },
      { id: "oop", title: "Object-Oriented Programming" },
      { id: "dependencies-building", title: "Dependencies & Building" },
    ];

    return (
      <div className="min-h-screen p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">No Quiz Available</h2>
            <p className="text-muted-foreground mb-6">
              There is no quiz for this lesson yet. Choose from available quizzes below:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {lessonsWithQuizzes.map((lesson) => (
              <Link key={lesson.id} href={`/quiz/${lesson.id}`}>
                <Card className="p-6 hover:border-primary transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-5 h-5 text-primary" />
                    <div>
                      <h3 className="font-semibold">{lesson.title}</h3>
                      <p className="text-sm text-muted-foreground">Click to start quiz</p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Button onClick={() => setLocation('/lessons')}>Back to Lessons</Button>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentIndex];
  const hasAnsweredCurrent = !!answers[currentQ.id];
  const isCorrect = answers[currentQ.id] === currentQ.correctAnswer;

  const handleSelectAnswer = (answer: string) => {
    if (hasAnsweredCurrent) return;
    setAnswers(prev => ({ ...prev, [currentQ.id]: answer }));
    setShowExplanation(true);
    
    // Update score immediately if correct
    if (answer === currentQ.correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setShowExplanation(false);
    } else {
      // Finish quiz
      let correctCount = 0;
      questions.forEach(q => {
        if (answers[q.id] === q.correctAnswer) correctCount++;
      });
      const finalScore = Math.round((correctCount / questions.length) * 100);
      setScore(finalScore);
      saveQuizScore(lessonId!, finalScore);
      setIsFinished(true);
    }
  };

  if (isFinished) {
    const passed = score >= 70;
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-6">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-md w-full bg-card border rounded-2xl p-8 text-center shadow-xl relative overflow-hidden"
        >
          <div className={`absolute top-0 inset-x-0 h-2 ${passed ? 'bg-green-500' : 'bg-amber-500'}`} />
          
          <div className="w-20 h-20 mx-auto rounded-full bg-background border-4 flex items-center justify-center mb-6 shadow-inner">
            <Trophy className={`w-10 h-10 ${passed ? 'text-green-500' : 'text-amber-500'}`} />
          </div>
          
          <h2 className="text-3xl font-handwriting font-bold mb-2">
            {passed ? "Excellent Work!" : "Good Effort!"}
          </h2>
          <p className="text-muted-foreground mb-6">
            You completed the quiz for Lesson {lessonId}.
          </p>
          
          <div className="text-6xl font-mono font-bold mb-8 flex items-center justify-center">
            {score}<span className="text-3xl text-muted-foreground">%</span>
          </div>
          
          <div className="flex gap-4 justify-center">
            <Button variant="outline" onClick={() => {
              setAnswers({});
              setCurrentIndex(0);
              setShowExplanation(false);
              setIsFinished(false);
            }}>
              <RotateCcw className="w-4 h-4 mr-2" /> Retry
            </Button>
            <Button onClick={() => setLocation(`/lessons`)}>
              Back to Lessons <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 md:p-12 space-y-8">
      {/* Progress Header */}
      <div className="space-y-4">
        <div className="flex justify-between items-center text-sm font-medium font-mono text-muted-foreground">
          <span>Question {currentIndex + 1} of {questions.length}</span>
          <span>{Math.round(((currentIndex) / questions.length) * 100)}%</span>
        </div>
        <Progress value={((currentIndex) / questions.length) * 100} className="h-2" />
      </div>

      {/* Question Card */}
      <Card className="p-6 md:p-8 relative overflow-hidden shadow-lg border-2 border-border/50">
        <div className="mb-6 space-y-4">
          <Badge variant="outline" className="uppercase tracking-wider text-xs font-mono mb-2">
            {currentQ.type.replace('_', ' ')}
          </Badge>
          <h2 className="text-2xl font-bold leading-tight">{currentQ.question}</h2>
          
          {currentQ.codeSnippet && (
            <div className="mt-6 mb-4 rounded-md overflow-hidden border">
              <SimpleSyntaxHighlighter code={currentQ.codeSnippet} />
            </div>
          )}
        </div>

        {/* Options */}
        <div className="space-y-3">
          {currentQ.options?.map((opt, i) => {
            const isSelected = answers[currentQ.id] === opt;
            let btnStateClass = "bg-card hover:bg-accent/10 hover:border-primary/50";
            
            if (hasAnsweredCurrent) {
              if (opt === currentQ.correctAnswer) {
                btnStateClass = "bg-green-500/10 border-green-500 text-green-600 dark:text-green-400";
              } else if (isSelected) {
                btnStateClass = "bg-destructive/10 border-destructive text-destructive";
              } else {
                btnStateClass = "opacity-50";
              }
            } else if (isSelected) {
              btnStateClass = "border-primary bg-primary/5";
            }

            return (
              <button
                key={i}
                disabled={hasAnsweredCurrent}
                onClick={() => handleSelectAnswer(opt)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between ${btnStateClass}`}
              >
                <span className={currentQ.type === 'predict_output' ? 'font-mono' : ''}>{opt}</span>
                {hasAnsweredCurrent && opt === currentQ.correctAnswer && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                {hasAnsweredCurrent && isSelected && opt !== currentQ.correctAnswer && <XCircle className="w-5 h-5 text-destructive" />}
              </button>
            );
          })}

          {currentQ.type === 'true_false' && ['True', 'False'].map((opt) => {
             const isSelected = answers[currentQ.id] === opt;
             let btnStateClass = "bg-card hover:bg-accent/10";
             
             if (hasAnsweredCurrent) {
               if (opt === currentQ.correctAnswer) {
                 btnStateClass = "bg-green-500/10 border-green-500 text-green-500";
               } else if (isSelected) {
                 btnStateClass = "bg-destructive/10 border-destructive text-destructive";
               } else {
                 btnStateClass = "opacity-50";
               }
             }

             return (
              <button
                key={opt}
                disabled={hasAnsweredCurrent}
                onClick={() => handleSelectAnswer(opt)}
                className={`w-full text-center p-6 rounded-xl border-2 font-bold text-lg transition-all duration-200 ${btnStateClass}`}
              >
                {opt}
              </button>
             );
          })}
        </div>

        {/* Explanation & Next */}
        <AnimatePresence>
          {showExplanation && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              className="mt-8 pt-6 border-t overflow-hidden"
            >
              <div className={`p-4 rounded-lg flex items-start gap-3 ${isCorrect ? 'bg-green-500/10 text-green-800 dark:text-green-200' : 'bg-destructive/10 text-destructive'}`}>
                {isCorrect ? <CheckCircle2 className="w-6 h-6 mt-0.5 flex-shrink-0" /> : <XCircle className="w-6 h-6 mt-0.5 flex-shrink-0" />}
                <div>
                  <h4 className="font-bold mb-1">{isCorrect ? 'Correct!' : 'Incorrect'}</h4>
                  <p className="text-sm leading-relaxed opacity-90">{currentQ.explanation}</p>
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <Button size="lg" onClick={handleNext} className="gap-2">
                  {currentIndex < questions.length - 1 ? "Next Question" : "Finish Quiz"} <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </div>
  );
}
