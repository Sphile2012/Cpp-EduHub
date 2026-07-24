import { Sidebar } from "./sidebar";
import { MobileHeader } from "./mobile-header";
import { ReactNode, useEffect, useState } from "react";
import { useLocalProgress } from "@/hooks/use-local-progress";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import { Link } from "wouter";
import { LanguagePicker } from "./language-picker";

export function AppLayout({ children }: { children: ReactNode }) {
  const { incrementStreak } = useLocalProgress();
  const { isAuthenticated, user } = useAuth();
  const [isNavOpen, setIsNavOpen] = useState(true);

  useEffect(() => {
    // Document is dark mode by default
    document.documentElement.classList.add('dark');

    // Simple streak logic: increment once per session on mount
    const lastLogin = localStorage.getItem('cpp_learn_last_login');
    const today = new Date().toDateString();
    if (lastLogin !== today) {
      incrementStreak();
      localStorage.setItem('cpp_learn_last_login', today);
    }
  }, [incrementStreak]);

  return (
    <div className="flex min-h-screen bg-background text-foreground selection:bg-primary/30">
      <aside
        className={cn(
          "hidden transition-all duration-300 md:block",
          isNavOpen ? "w-64 shrink-0" : "w-0 overflow-hidden"
        )}
      >
        <Sidebar className={cn("h-screen border-r", !isNavOpen && "pointer-events-none opacity-0")} />
      </aside>

      <div className="flex-1 w-full max-w-full min-w-0 overflow-x-hidden">
        <header className="sticky top-0 z-30 hidden h-14 items-center gap-3 border-b bg-background/95 px-4 backdrop-blur md:flex">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsNavOpen((prev) => !prev)}
            aria-label="Toggle navigation"
          >
            {isNavOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
          <Link href="/" className="flex items-center gap-2 font-handwriting text-lg font-bold text-primary">
            <span>cpp_learn</span>
          </Link>
          <div className="ml-auto flex items-center gap-2">
            <LanguagePicker compact className="w-44" />
            {isAuthenticated && user ? (
              <Link href="/profile" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                Profile
              </Link>
            ) : (
              <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                Login
              </Link>
            )}
          </div>
        </header>

        <MobileHeader />
        <main>{children}</main>
      </div>
    </div>
  );
}
