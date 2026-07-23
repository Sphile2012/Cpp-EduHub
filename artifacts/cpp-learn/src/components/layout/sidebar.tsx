import { Link, useLocation } from "wouter";
import { 
  BookOpen, 
  TerminalSquare, 
  Trophy, 
  Library, 
  Layers,
  LayoutDashboard,
  Bot,
  Sparkles,
  FileQuestion
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocalProgress } from "@/hooks/use-local-progress";
import { Progress } from "@/components/ui/progress";

export function Sidebar({ className }: { className?: string }) {
  const [location] = useLocation();
  const { getMergedProgress } = useLocalProgress();
  const progress = getMergedProgress();

  const navItems = [
    { href: "/", label: "Dashboard", icon: LayoutDashboard },
    { href: "/lessons", label: "Lessons", icon: BookOpen },
    { href: "/quiz/what-is-cpp", label: "Quiz", icon: FileQuestion },
    { href: "/playground", label: "Playground", icon: TerminalSquare },
    { href: "/learning-hub", label: "Learning Hub", icon: Sparkles },
    { href: "/ai-tutor", label: "AI Tutor", icon: Bot },
    { href: "/glossary", label: "Glossary", icon: Library },
    { href: "/flashcards", label: "Flashcards", icon: Layers },
    { href: "/achievements", label: "Achievements", icon: Trophy },
  ];

  return (
    <div className={cn("flex flex-col border-r bg-card/50 text-card-foreground w-64 min-h-screen", className)}>
      <div className="p-6">
        <Link href="/" className="flex items-center gap-2 font-handwriting text-3xl font-bold text-primary hover:opacity-80 transition-opacity">
          <TerminalSquare className="w-8 h-8" />
          <span>cpp_learn</span>
        </Link>
        <p className="text-muted-foreground text-xs mt-1 font-mono">v0.1.0_beta</p>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => {
          const isActive = location === item.href || (item.href !== "/" && location.startsWith(item.href));
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                isActive 
                  ? "bg-primary text-primary-foreground shadow-sm" 
                  : "hover:bg-accent/10 hover:text-foreground text-muted-foreground"
              )}
            >
              <item.icon className={cn("w-5 h-5", isActive ? "text-primary-foreground" : "text-muted-foreground")} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-6 mt-auto">
        <div className="bg-background rounded-lg p-4 border shadow-sm">
          <div className="flex justify-between items-end mb-2">
            <div>
              <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider">Level {progress.level}</p>
              <p className="font-bold text-sm text-foreground">{progress.xp} XP</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Progress</p>
              <p className="font-bold text-sm text-primary">{Math.round((progress.completedLessons / progress.totalLessons) * 100)}%</p>
            </div>
          </div>
          <Progress value={(progress.completedLessons / progress.totalLessons) * 100} className="h-1.5 bg-muted" indicatorColor="bg-primary" />
        </div>
      </div>
    </div>
  );
}
