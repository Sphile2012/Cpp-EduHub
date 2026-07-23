import { useState } from "react";
import { Link, useLocation } from "wouter";
import { 
  Menu, 
  X,
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
  LogOut,
  Moon,
  Sun
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import { useLanguage } from "@/hooks/use-language";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function MobileHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const { languageConfig } = useLanguage();

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
    <>
      {/* Header with Hamburger Menu (All Screen Sizes) */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center justify-between px-4 h-14">
          <Link href="/" className="flex items-center gap-2 font-handwriting text-xl font-bold text-primary">
            <TerminalSquare className="w-6 h-6" />
            <span>uPhumeh</span>
          </Link>
          
          <div className="flex items-center gap-2">
            {/* Language Badge */}
            {languageConfig && (
              <Badge variant="outline" className="hidden sm:inline-flex">
                {languageConfig.icon} {languageConfig.name}
              </Badge>
            )}
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Menu Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm" 
          onClick={() => setIsOpen(false)} 
        />
      )}

      {/* Menu Drawer */}
      <nav
        className={cn(
          "fixed top-14 right-0 z-50 h-[calc(100vh-3.5rem)] w-72 bg-card border-l shadow-lg transition-transform duration-300 ease-in-out overflow-y-auto",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col p-4 space-y-1">
          {/* User Section */}
          {isAuthenticated && user ? (
            <div className="mb-4 p-3 rounded-lg bg-accent/10 border">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                    {user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{user.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  Level {user.stats.level}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {user.stats.totalXp} XP
                </Badge>
              </div>
            </div>
          ) : (
            <div className="mb-4 p-3 rounded-lg bg-accent/10 border">
              <p className="text-sm text-muted-foreground mb-2">Sign in to track progress</p>
              <div className="flex gap-2">
                <Link href="/login" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" size="sm" className="w-full">Login</Button>
                </Link>
                <Link href="/signup" onClick={() => setIsOpen(false)}>
                  <Button size="sm" className="w-full">Sign Up</Button>
                </Link>
              </div>
            </div>
          )}

          {/* Navigation Items */}
          {navItems.map((item) => {
            const isActive = location === item.href || (item.href !== "/" && location.startsWith(item.href));
            return (
              <Link 
                key={item.href} 
                href={item.href}
                onClick={() => setIsOpen(false)}
              >
                <div
                  className={cn(
                    "flex items-center gap-3 px-3 py-3 rounded-md text-sm font-medium transition-colors",
                    isActive 
                      ? "bg-primary text-primary-foreground shadow-sm" 
                      : "hover:bg-accent/10 hover:text-foreground text-muted-foreground"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </div>
              </Link>
            );
          })}

          {/* Divider */}
          <div className="my-2 border-t" />

          {/* User Actions */}
          {isAuthenticated ? (
            <>
              <Link href="/profile" onClick={() => setIsOpen(false)}>
                <div className="flex items-center gap-3 px-3 py-3 rounded-md text-sm font-medium hover:bg-accent/10 text-muted-foreground hover:text-foreground transition-colors">
                  <User className="w-5 h-5" />
                  Profile
                </div>
              </Link>
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="flex items-center gap-3 px-3 py-3 rounded-md text-sm font-medium hover:bg-destructive/10 text-destructive transition-colors w-full text-left"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </>
          ) : null}
        </div>
      </nav>
    </>
  );
}