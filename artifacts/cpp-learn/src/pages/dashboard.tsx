import { useGetLessons, useGetProgress } from "@/hooks/use-static-data";
import { useLocalProgress } from "@/hooks/use-local-progress";
import { useLanguage } from "@/hooks/use-language";
import { Link } from "wouter";
import { BookOpen, Target, CheckCircle2, Flame, Trophy, Activity, ArrowRight, Play, Award, Layers, TerminalSquare, Sparkles, Code, Brain, Zap, Calendar, Star } from "lucide-react";
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
  const { languageConfig } = useLanguage();

  const progress = getMergedProgress(apiProgress ?? undefined);

  const nextLesson = lessons?.find(l => !completedLessonIds.includes(l.id)) || lessons?.[0];

  const quickActions = [
    {
      title: "Code Playground",
      description: `Write and test ${languageConfig?.name || "code"} instantly.`,
      icon: TerminalSquare,
      href: "/playground",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Learning Hub",
      description: "Explore concepts, challenges, errors, and progress in one place.",
      icon: Sparkles,
      href: "/learning-hub",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      title: "AI Tutor",
      description: "Get instant help with any programming question.",
      icon: Brain,
      href: "/ai-tutor",
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Daily Challenge",
      description: "Test your skills with today's coding challenge.",
      icon: Zap,
      href: "/quiz/daily",
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
    {
      title: "Glossary",
      description: "Look up concepts, syntax, and definitions.",
      icon: BookOpen,
      href: "/glossary",
      color: "text-cyan-500",
      bgColor: "bg-cyan-500/10",
    },
    {
      title: "Achievements",
      description: "View your badges and milestones.",
      icon: Trophy,
      href: "/achievements",
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Video Hero Section with uPhumeh Branding */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-[70vh] min-h-[500px] w-full overflow-hidden"
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2069&auto=format&fit=crop"
            alt="Coding background"
            className="w-full h-full object-cover"
            loading="eager"
          />
          
          {/* Dark overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/70" />
          
          {/* Animated gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-purple-900/30 to-pink-900/30 animate-gradient-shift" />
          
          {/* Dot pattern overlay */}
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }} />
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-6 px-4 z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
                <Code className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-white/80 font-medium">
                  Learning {languageConfig?.name || "Programming"}
                </span>
              </div>
              
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4 drop-shadow-2xl font-handwriting">
                Master Programming with{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                  uPhumeh
                </span>
              </h1>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto drop-shadow-lg"
            >
              Learn, Practice, Build, and Become a Professional Developer
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
            >
              {nextLesson && (
                <Link href={`/lessons/${nextLesson.id}`}>
                  <button className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all shadow-lg hover:shadow-xl hover:scale-105 active-elevate">
                    <Play className="w-5 h-5 fill-current" />
                    {progress.completedLessons > 0 ? 'Continue Learning' : 'Start Learning'}
                  </button>
                </Link>
              )}
              
              <Link href="/playground">
                <button className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-2 border-white/30 px-8 py-4 rounded-lg font-semibold text-lg transition-all shadow-lg hover:shadow-xl hover:scale-105">
                  <TerminalSquare className="w-5 h-5" />
                  Try Playground
                </button>
              </Link>
            </motion.div>

            {/* Progress Indicator */}
            {progress.completedLessons > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="pt-8"
              >
                <div className="inline-flex items-center gap-3 bg-black/40 backdrop-blur-md px-6 py-3 rounded-full border border-white/20">
                  <div className="flex items-center gap-2">
                    <Flame className="w-5 h-5 text-orange-400" />
                    <span className="text-white font-semibold">{progress.streak} day streak</span>
                  </div>
                  <div className="w-px h-6 bg-white/20" />
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                    <span className="text-white font-semibold">{progress.completedLessons}/{progress.totalLessons} lessons</span>
                  </div>
                  <div className="w-px h-6 bg-white/20" />
                  <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-yellow-400" />
                    <span className="text-white font-semibold">Level {progress.level}</span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, repeat: Infinity, duration: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full p-1">
            <motion.div 
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1.5 h-1.5 bg-white rounded-full mx-auto"
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Main Content Section */}
      <div className="p-8 max-w-6xl mx-auto space-y-8">

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
              <Target className="w-6 h-6 text-primary" /> Learning Path
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
            {quickActions.slice(0, 4).map((action) => (
              <Link key={action.title} href={action.href}>
                <Card className="hover:border-primary transition-all hover:-translate-y-1 hover:shadow-md cursor-pointer group">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <div className={cn("p-2 rounded-md", action.bgColor, action.color)}>
                        <action.icon className="w-5 h-5" />
                      </div>
                      {action.title}
                    </CardTitle>
                    <CardDescription>{action.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Daily Challenge Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 border-purple-500/30 overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-yellow-500/20 rounded-full">
                  <Star className="w-8 h-8 text-yellow-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Daily Coding Challenge</h3>
                  <p className="text-gray-300">Complete today's challenge to earn bonus XP and keep your streak alive!</p>
                </div>
              </div>
              <Link href="/quiz/daily">
                <button className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl hover:scale-105">
                  <Zap className="w-4 h-4" />
                  Start Challenge
                </button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      </div>
    </div>
  );
}