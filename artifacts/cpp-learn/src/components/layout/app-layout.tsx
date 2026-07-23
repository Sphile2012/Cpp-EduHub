import { Sidebar } from "./sidebar";
import { MobileHeader } from "./mobile-header";
import { ReactNode, useEffect } from "react";
import { useLocalProgress } from "@/hooks/use-local-progress";

export function AppLayout({ children }: { children: ReactNode }) {
  const { incrementStreak } = useLocalProgress();

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
  }, []);

  return (
    <div className="flex min-h-screen bg-background text-foreground selection:bg-primary/30">
      {/* Sidebar hidden - using hamburger menu for all screen sizes */}
      <div className="flex-1 w-full max-w-full min-w-0 overflow-x-hidden">
        <MobileHeader />
        <main>
          {children}
        </main>
      </div>
    </div>
  );
}
