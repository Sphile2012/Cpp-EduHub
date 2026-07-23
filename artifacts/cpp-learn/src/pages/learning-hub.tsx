import { Link } from "wouter";
import {
  BookOpen,
  TerminalSquare,
  Library,
  Layers,
  Trophy,
  Bot,
  Lightbulb,
  Target,
  Clock,
  TrendingUp,
  BookMarked,
  Code2,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useLocalProgress } from "@/hooks/use-local-progress";
import { Badge } from "@/components/ui/badge";

export default function LearningHubPage() {
  const { getMergedProgress } = useLocalProgress();
  const progress = getMergedProgress();

  const quickLinks = [
    { 
      title: "Start Learning", 
      description: "Begin with C++ fundamentals",
      icon: BookOpen, 
      href: "/lessons",
      color: "text-blue-500"
    },
    { 
      title: "Code Playground", 
      description: "Practice coding in real-time",
      icon: TerminalSquare, 
      href: "/playground",
      color: "text-green-500"
    },
    { 
      title: "Glossary", 
      description: "Look up C++ terminology",
      icon: Library, 
      href: "/glossary",
      color: "text-purple-500"
    },
    { 
      title: "Flashcards", 
      description: "Quick memory reinforcement",
      icon: Layers, 
      href: "/flashcards",
      color: "text-orange-500"
    },
    { 
      title: "AI Tutor", 
      description: "Get personalized help",
      icon: Bot, 
      href: "/ai-tutor",
      color: "text-pink-500"
    },
    { 
      title: "Achievements", 
      description: "Track your milestones",
      icon: Trophy, 
      href: "/achievements",
      color: "text-amber-500"
    },
  ];

  const learningPaths = [
    {
      title: "Beginner Path",
      description: "Start from scratch with C++ basics",
      lessons: ["Variables & Types", "Control Flow", "Functions", "Arrays"],
      difficulty: "Easy",
      duration: "2-3 weeks",
      icon: GraduationCap,
    },
    {
      title: "Intermediate Path",
      description: "Master OOP and advanced concepts",
      lessons: ["Classes & Objects", "Inheritance", "Polymorphism", "Templates"],
      difficulty: "Medium",
      duration: "3-4 weeks",
      icon: TrendingUp,
    },
    {
      title: "Advanced Path",
      description: "Deep dive into expert topics",
      lessons: ["Memory Management", "STL Containers", "Smart Pointers", "Concurrency"],
      difficulty: "Hard",
      duration: "4-6 weeks",
      icon: Sparkles,
    },
  ];

  const studyTips = [
    {
      icon: Target,
      title: "Set Daily Goals",
      description: "Complete at least one lesson per day to maintain momentum"
    },
    {
      icon: Code2,
      title: "Practice Coding",
      description: "Use the playground to experiment with concepts you learn"
    },
    {
      icon: Clock,
      title: "Regular Reviews",
      description: "Use flashcards to reinforce concepts you've already learned"
    },
    {
      icon: Bot,
      title: "Ask Questions",
      description: "Don't hesitate to use the AI Tutor when you're stuck"
    },
  ];

  const completionPercentage = Math.round((progress.completedLessons / progress.totalLessons) * 100);

  return (
    <div className="min-h-screen bg-background text-foreground p-6 space-y-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-primary/10 rounded-lg text-primary">
            <Sparkles className="w-6 h-6" />
          </div>
          <h1 className="text-3xl font-bold font-handwriting">Learning Hub</h1>
        </div>
        <p className="text-muted-foreground">
          Your personalized learning center - access lessons, track progress, and find study resources
        </p>
      </div>

      {/* Progress Overview */}
      <div className="max-w-7xl mx-auto">
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Your Progress
            </CardTitle>
            <CardDescription>Keep up the great work!</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Level</p>
                <p className="text-2xl font-bold text-primary">{progress.level}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">XP</p>
                <p className="text-2xl font-bold">{progress.xp}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Completed Lessons</p>
                <p className="text-2xl font-bold">{progress.completedLessons} / {progress.totalLessons}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Completion</p>
                <p className="text-2xl font-bold text-green-500">{completionPercentage}%</p>
              </div>
            </div>
            <Progress value={completionPercentage} className="h-2" />
          </CardContent>
        </Card>
      </div>

      {/* Quick Links */}
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Lightbulb className="w-6 h-6 text-amber-500" />
          Quick Access
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <Card className="hover:border-primary/50 transition-all cursor-pointer hover:shadow-lg h-full">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className={`p-3 rounded-lg bg-background ${link.color}`}>
                    <link.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{link.title}</h3>
                    <p className="text-sm text-muted-foreground">{link.description}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Learning Paths */}
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <BookMarked className="w-6 h-6 text-blue-500" />
          Learning Paths
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {learningPaths.map((path) => (
            <Card key={path.title} className="hover:border-primary/50 transition-all">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <path.icon className="w-8 h-8 text-primary" />
                  <Badge variant={path.difficulty === "Easy" ? "default" : path.difficulty === "Medium" ? "secondary" : "destructive"}>
                    {path.difficulty}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{path.title}</CardTitle>
                <CardDescription>{path.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Key Topics:</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {path.lessons.map((lesson) => (
                      <li key={lesson} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {lesson}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  {path.duration}
                </div>
                <Link href="/lessons">
                  <Button className="w-full">Start Path</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Study Tips */}
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Target className="w-6 h-6 text-green-500" />
          Study Tips
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {studyTips.map((tip) => (
            <Card key={tip.title}>
              <CardContent className="p-6 flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10 text-primary">
                  <tip.icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{tip.title}</h3>
                  <p className="text-sm text-muted-foreground">{tip.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
