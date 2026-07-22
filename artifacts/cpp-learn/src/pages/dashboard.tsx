import { useGetLessons, useGetProgress } from "@workspace/api-client-react";
import { useLocalProgress } from "@/hooks/use-local-progress";
import { Link } from "wouter";
import { BookOpen, Target, CheckCircle2, Flame, Trophy, Activity, ArrowRight, Play, Award, Layers, TerminalSquare } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function Dashboard() {
  const { data: lessons, isLoading: isLoadingLessons } = useGetLessons();
  const { data: apiProgress, isLoading: isLoadingProgress } = useGetProgress();
  const { getMergedProgress, completedLessonIds } = useLocalProgress();

  const progress = getMergedProgress(apiProgress);

  const nextLesson = lessons?.find(l => !completedLessonIds.includes(l.id)) || lessons?.[0];

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row gap-8 items-start md:items-center justify-between bg-card border rounded-2xl p-8 shadow-sm relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        
        <div className="space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
            <Flame className="w-4 h-4" /> {progress.streak} Day Streak
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-handwriting tracking-tight text-foreground">
            Welcome back to the workshop.
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl">
            You're making solid progress. Ready to tackle {nextLesson?.title || "your next challenge"}?
          </p>
          
          {nextLesson && (
            <div className="pt-4">
              <Link href={`/lessons/${nextLesson.id}`} className="inline-flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-lg font-medium transition-colors shadow-sm active-elevate">
                <Play className="w-4 h-4 fill-current" />
                Continue Learning
              </Link>
            </div>
          )}
        </div>

        <div className="relative z-10 flex-shrink-0 flex flex-col items-center justify-center p-6 bg-background rounded-xl border shadow-sm min-w-[200px]">
          <div className="relative w-32 h-32 flex items-center justify-center mb-4">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" className="text-muted/30" strokeWidth="8" />
              <circle 
                cx="50" cy="50" r="45" fill="none" stroke="currentColor" 
                className="text-primary" strokeWidth="8"
                strokeDasharray={`${2 * Math.PI * 45}`}
                strokeDashoffset={`${2 * Math.PI * 45 * (1 - (progress.completedLessons / progress.totalLessons))}`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-3xl font-bold font-mono">{progress.completedLessons}</span>
              <span className="text-xs text-muted-foreground uppercase tracking-wider font-mono">/ {progress.totalLessons}</span>
            </div>
          </div>
          <p className="text-sm font-medium text-muted-foreground">Lessons Completed</p>
        </div>
      </motion.div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total XP", value: progress.xp, icon: Trophy, color: "text-yellow-500" },
          { label: "Level", value: progress.level, icon: Award, color: "text-purple-500" },
          { label: "Quizzes Passed", value: progress.passedQuizzes, icon: CheckCircle2, color: "text-green-500" },
          { label: "Avg Score", value: `${progress.averageScore}%`, icon: Activity, color: "text-blue-500" },
        ].map((stat, i) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + (i * 0.05) }}
          >
            <Card className="hover:border-primary/50 transition-colors">
              <CardContent className="p-6 flex items-center gap-4">
                <div className={cn("p-3 rounded-lg bg-background border shadow-sm", stat.color)}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-2xl font-bold font-mono">{stat.value}</p>
                  <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
        {/* Roadmap Preview */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold font-handwriting flex items-center gap-2">
              <Target className="w-6 h-6 text-primary" /> Roadmap
            </h2>
            <Link href="/lessons" className="text-sm text-primary hover:underline font-medium inline-flex items-center gap-1">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <Card>
            <div className="divide-y">
              {isLoadingLessons ? (
                Array(5).fill(0).map((_, i) => (
                  <div key={i} className="p-4 flex gap-4"><Skeleton className="w-full h-12" /></div>
                ))
              ) : (
                lessons?.slice(0, 5).map((lesson, idx) => {
                  const isCompleted = completedLessonIds.includes(lesson.id);
                  const isNext = !isCompleted && (!lessons[idx-1] || completedLessonIds.includes(lessons[idx-1].id));
                  
                  return (
                    <Link key={lesson.id} href={`/lessons/${lesson.id}`}>
                      <div className={cn(
                        "p-5 flex items-center gap-4 transition-colors hover:bg-accent/5",
                        isCompleted ? "opacity-70" : isNext ? "bg-primary/5 border-l-2 border-l-primary" : ""
                      )}>
                        <div className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center border-2 flex-shrink-0 font-mono text-sm",
                          isCompleted ? "bg-primary border-primary text-primary-foreground" : 
                          isNext ? "border-primary text-primary" : "border-muted text-muted-foreground"
                        )}>
                          {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : lesson.order}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className={cn("font-semibold text-lg truncate", isCompleted ? "line-through text-muted-foreground" : "")}>
                            {lesson.title}
                          </h4>
                          <p className="text-sm text-muted-foreground truncate">{lesson.description}</p>
                        </div>
                        <div className="hidden sm:flex gap-2">
                          <Badge variant="outline" className="font-mono">{lesson.estimatedMinutes}m</Badge>
                          <Badge variant={lesson.difficulty === 'beginner' ? 'default' : 'secondary'} className="capitalize">
                            {lesson.difficulty}
                          </Badge>
                        </div>
                      </div>
                    </Link>
                  );
                })
              )}
            </div>
          </Card>
        </div>

        {/* Quick Access Sidebar */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold font-handwriting flex items-center gap-2">
            <Layers className="w-6 h-6 text-primary" /> Quick Tools
          </h2>
          
          <div className="grid gap-4">
            <Link href="/playground">
              <Card className="hover:border-primary transition-all hover:-translate-y-1 hover:shadow-md cursor-pointer group">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <div className="p-2 bg-primary/10 rounded-md text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <TerminalSquare className="w-5 h-5" />
                    </div>
                    Code Playground
                  </CardTitle>
                  <CardDescription>Write and test C++ code instantly.</CardDescription>
                </CardHeader>
              </Card>
            </Link>
            
            <Link href="/glossary">
              <Card className="hover:border-primary transition-all hover:-translate-y-1 hover:shadow-md cursor-pointer group">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <div className="p-2 bg-primary/10 rounded-md text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    Glossary
                  </CardTitle>
                  <CardDescription>Look up concepts, syntax, and definitions.</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
