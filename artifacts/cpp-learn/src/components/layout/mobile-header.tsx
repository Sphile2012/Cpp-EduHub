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
  FileQuestion
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function MobileHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  const navItems = [
    { href: "/", label: "Dashboard", icon: LayoutDashboard },
    { href: "/lessons", label: "Lessons", icon: BookOpen },
    { href: "/quiz/basics", label: "Quiz", icon: FileQuestion },
    { href: "/playground", label: "Playground", icon: TerminalSquare },
    { href: "/learning-hub", label: "Learning Hub", icon: Sparkles },
    { href: "/ai-tutor", label: "AI Tutor", icon: Bot },
    { href: "/glossary", label: "Glossary", icon: Library },
    { href: "/flashcards", label: "Flashcards", icon: Layers },
    { href: "/achievements", label: "Achievements", icon: Trophy },
  ];

  return (
    <>
      {/* Mobile Header */}
      <header className="md:hidden sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center justify-between px-4 h-14">
          <Link href="/" className="flex items-center gap-2 font-handwriting text-xl font-bold text-primary">
            <TerminalSquare className="w-6 h-6" />
            <span>cpp_learn</span>
          </Link>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-background/80 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
      )}

      {/* Mobile Menu Drawer */}
      <nav
        className={cn(
          "md:hidden fixed top-14 right-0 z-50 h-[calc(100vh-3.5rem)] w-64 bg-card border-l shadow-lg transition-transform duration-300 ease-in-out overflow-y-auto",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col p-4 space-y-1">
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
        </div>
      </nav>
    </>
  );
}
