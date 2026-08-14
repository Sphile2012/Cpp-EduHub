import * as React from 'react';
import { Link, useLocation } from 'wouter';
import { useAuth } from '@/hooks/use-auth';
import { Home, BookOpen, Code, Brain, Trophy, Users, Menu, X, LogOut, Bell, Search, Sun, Moon, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface NavItem { href: string; label: string; icon: React.ComponentType<{ className?: string }>; }

const navItems: NavItem[] = [
  { href: '/', label: 'Dashboard', icon: Home },
  { href: '/lessons', label: 'Courses', icon: BookOpen },
  { href: '/playground', label: 'Playground', icon: Code },
  { href: '/ai-tutor', label: 'AI Assistant', icon: Brain },
  { href: '/achievements', label: 'Achievements', icon: Trophy },
  { href: '/learning-hub', label: 'Community', icon: Users },
];

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [theme, setTheme] = React.useState<'light' | 'dark'>('dark');

  React.useEffect(() => { const s = localStorage.getItem('theme'); if (s === 'light' || s === 'dark') setTheme(s); }, []);
  React.useEffect(() => { document.documentElement.classList.toggle('dark', theme === 'dark'); document.body.className = theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'; }, [theme]);

  const toggleTheme = () => { const n = theme === 'dark' ? 'light' : 'dark'; setTheme(n); localStorage.setItem('theme', n); };
  const isDark = theme === 'dark';

  return (
    <div className={cn('min-h-screen', isDark ? 'bg-slate-950' : 'bg-slate-50', isDark ? 'text-slate-100' : 'text-slate-900')}>
      {sidebarOpen && <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />}
      <aside className={cn('fixed inset-y-0 left-0 z-50 w-64 border-r transition-transform lg:translate-x-0', isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200', sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0')}>
        <div className="flex h-16 items-center justify-between px-6 border-b border-inherit">
          <Link href="/" className="flex items-center gap-2"><div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600"><Zap className="h-5 w-5 text-white" /></div><span className="text-lg font-bold">Infinity Code</span></Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden"><X className="h-5 w-5" /></button>
        </div>
        <nav className="flex-1 space-y-1 p-4">
          {navItems.map((item) => { const isActive = location === item.href || (item.href !== '/' && location.startsWith(item.href)); return (
            <Link key={item.href} href={item.href} onClick={() => setSidebarOpen(false)} className={cn('flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors', isActive ? 'bg-blue-600 text-white' : isDark ? 'text-slate-400 hover:bg-slate-800 hover:text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900')}><item.icon className="h-5 w-5" />{item.label}</Link>
          ); })}
        </nav>
        {isAuthenticated && user && (
          <div className="border-t border-inherit p-4">
            <Link href="/profile" className="flex items-center gap-3 rounded-lg p-2 hover:opacity-80"><img src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=3898FF&color=fff`} alt={user.name} className="h-9 w-9 rounded-full" /><div className="flex-1 min-w-0"><p className="text-sm font-medium truncate">{user.name}</p><p className="text-xs opacity-60 truncate">{user.email}</p></div></Link>
            <Button variant="ghost" size="sm" onClick={() => logout()} className="w-full mt-2 justify-start"><LogOut className="h-4 w-4 mr-2" /> Sign out</Button>
          </div>
        )}
      </aside>
      <div className="lg:pl-64">
        <header className={cn('sticky top-0 z-30 flex h-16 items-center justify-between border-b px-4 lg:px-6', isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200')}>
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden"><Menu className="h-6 w-6" /></button>
          <div className="hidden sm:flex items-center gap-2 flex-1 max-w-md"><Search className="h-4 w-4 opacity-50" /><input type="text" placeholder="Search courses, lessons..." className={cn('w-full bg-transparent text-sm outline-none placeholder:opacity-50', isDark ? 'text-slate-100' : 'text-slate-900')} /></div>
          <div className="flex items-center gap-2 ml-auto">
            <Button variant="ghost" size="icon" onClick={toggleTheme}>{isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}</Button>
            <Button variant="ghost" size="icon"><Bell className="h-5 w-5" /></Button>
            {isAuthenticated ? <Link href="/profile"><img src={user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=3898FF&color=fff`} alt="Profile" className="h-9 w-9 rounded-full" /></Link> : <Link href="/login"><Button size="sm">Sign in</Button></Link>}
          </div>
        </header>
        <main className="p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
