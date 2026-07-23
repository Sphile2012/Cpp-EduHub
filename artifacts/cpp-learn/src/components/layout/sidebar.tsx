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
  FileQuestion,
  User,
  LogIn,
  LogOut,
  Languages,
  ChevronDown,
  Check
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocalProgress } from "@/hooks/use-local-progress";
import { useAuth } from "@/hooks/use-auth";
import { useLanguage } from "@/hooks/use-language";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LANGUAGES, LANGUAGE_ORDER } from "@/config/languages";

export function Sidebar({ className }: { className?: string }) {
  const [location, setLocation] = useLocation();
  const { getMergedProgress } = useLocalProgress();
  const { user, isAuthenticated, logout } = useAuth();
  const { currentLanguage, setLanguage } = useLanguage();
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

  const handleLogout = () => {
    logout();
    setLocation('/');
  };

  return (
    <div className={cn("flex flex-col border-r bg-card/50 text-card-foreground w-64 min-h-screen", className)}>
      <div className="p-6">
        <Link href="/" className="flex items-center gap-2 font-handwriting text-3xl font-bold text-primary hover:opacity-80 transition-opacity">
          <TerminalSquare className="w-8 h-8" />
          <span>cpp_learn</span>
        </Link>
        <p className="text-muted-foreground text-xs mt-1 font-mono">v0.2.0_beta</p>
      </div>

      {/* User Section */}
      {isAuthenticated && user ? (
        <div className="px-4 mb-4">
          <div className="bg-background rounded-lg p-3 border shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="bg-primary/20 text-primary font-semibold">
                  {user.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate">{user.name}</p>
                <p className="text-xs text-muted-foreground truncate">{user.email}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Link href="/profile" className="flex-1">
                <Button variant="outline" size="sm" className="w-full text-xs gap-1">
                  <User className="w-3 h-3" />
                  Profile
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleLogout}
                className="flex-1 text-xs gap-1"
              >
                <LogOut className="w-3 h-3" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="px-4 mb-4">
          <div className="bg-background rounded-lg p-3 border shadow-sm">
            <p className="text-xs text-muted-foreground mb-3">Sign in to save progress</p>
            <Link href="/login">
              <Button variant="default" size="sm" className="w-full text-xs gap-2 mb-2">
                <LogIn className="w-4 h-4" />
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button variant="outline" size="sm" className="w-full text-xs gap-2">
                <User className="w-4 h-4" />
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      )}

      <Separator className="mx-4 mb-4" />

      {/* Language Switcher */}
      <div className="px-4 mb-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-between gap-2 bg-background/50 hover:bg-accent/10"
            >
              <div className="flex items-center gap-2">
                <Languages className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {currentLanguage ? `${LANGUAGES[currentLanguage].icon} ${LANGUAGES[currentLanguage].displayName}` : 'Select Language'}
                </span>
              </div>
              <ChevronDown className="w-4 h-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            {LANGUAGE_ORDER.map((langId) => {
              const lang = LANGUAGES[langId];
              return (
                <DropdownMenuItem
                  key={langId}
                  onClick={() => setLanguage(langId)}
                  className="cursor-pointer"
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{lang.icon}</span>
                      <div>
                        <div className="font-medium text-sm">{lang.displayName}</div>
                        <div className="text-xs text-muted-foreground capitalize">{lang.difficulty}</div>
                      </div>
                    </div>
                    {currentLanguage === langId && (
                      <Check className="w-4 h-4 text-primary" />
                    )}
                  </div>
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Separator className="mx-4 mb-4" />

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
