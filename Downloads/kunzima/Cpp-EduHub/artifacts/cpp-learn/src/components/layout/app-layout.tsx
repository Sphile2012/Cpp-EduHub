import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code2,
  Home,
  BookOpen,
  Terminal,
  Brain,
  Trophy,
  User,
  Menu,
  X,
  LogOut,
  LogIn,
  UserPlus,
  Crown,
  Shield,
  Bell,
} from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';

interface NavItem {
  path: string;
  label: string;
  icon: typeof Home;
}

const navItems: NavItem[] = [
  { path: '/', label: 'Dashboard', icon: Home },
  { path: '/lessons', label: 'Courses', icon: BookOpen },
  { path: '/playground', label: 'Playground', icon: Terminal },
  { path: '/ai-tutor', label: 'AI Tutor', icon: Brain },
  { path: '/achievements', label: 'Achievements', icon: Trophy },
];

export function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, logout } = useAuth();
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/') return location === '/';
    return location.startsWith(path);
  };

  const handleLogout = async () => {
    await logout();
    setUserMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Top Navigation */}
      <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden text-slate-400 hover:text-white"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
                <Code2 className="h-5 w-5 text-white" />
              </div>
              <span className="hidden sm:block text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Infinity Code
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isActive(item.path)
                      ? 'bg-blue-500/10 text-blue-400'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {isAuthenticated && user ? (
              <>
                {/* Subscription badge */}
                {user.subscription_status === 'premium' && (
                  <span className="hidden sm:flex items-center gap-1 rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 px-3 py-1 text-xs font-semibold text-black">
                    <Crown className="h-3 w-3" />
                    Premium
                  </span>
                )}

                {/* Admin badge */}
                {user.role === 'admin' && (
                  <Link href="/admin">
                    <span className="hidden sm:flex items-center gap-1 rounded-full bg-purple-500/20 px-3 py-1 text-xs font-semibold text-purple-300 hover:bg-purple-500/30 transition-colors cursor-pointer">
                      <Shield className="h-3 w-3" />
                      Admin
                    </span>
                  </Link>
                )}

                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 rounded-lg p-1 hover:bg-slate-800/50 transition-colors"
                  >
                    <img
                      src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=3898FF&color=fff&size=80`}
                      alt={user.name}
                      className="h-8 w-8 rounded-full object-cover border border-slate-700"
                    />
                    <span className="hidden sm:block text-sm text-slate-300 max-w-[120px] truncate">
                      {user.name?.split(' ')[0] || 'User'}
                    </span>
                  </button>

                  <AnimatePresence>
                    {userMenuOpen && (
                      <>
                        <div
                          className="fixed inset-0 z-40"
                          onClick={() => setUserMenuOpen(false)}
                        />
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute right-0 mt-2 w-56 rounded-xl border border-slate-800 bg-slate-900 shadow-2xl z-50 overflow-hidden"
                        >
                          <div className="p-4 border-b border-slate-800">
                            <p className="text-sm font-medium text-white truncate">{user.name}</p>
                            <p className="text-xs text-slate-400 truncate">{user.email}</p>
                          </div>
                          <div className="p-2">
                            <Link
                              href="/profile"
                              onClick={() => setUserMenuOpen(false)}
                              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
                            >
                              <User className="h-4 w-4" />
                              Profile
                            </Link>
                            {user.subscription_status !== 'premium' && (
                              <Link
                                href="/subscription"
                                onClick={() => setUserMenuOpen(false)}
                                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
                              >
                                <Crown className="h-4 w-4" />
                                Upgrade to Premium
                              </Link>
                            )}
                            <Link
                              href="/payment-history"
                              onClick={() => setUserMenuOpen(false)}
                              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
                            >
                              <Bell className="h-4 w-4" />
                              Payment History
                            </Link>
                            {user.role === 'admin' && (
                              <Link
                                href="/admin"
                                onClick={() => setUserMenuOpen(false)}
                                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
                              >
                                <Shield className="h-4 w-4" />
                                Admin Dashboard
                              </Link>
                            )}
                            <button
                              onClick={handleLogout}
                              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-400 hover:bg-red-950/40 transition-colors"
                            >
                              <LogOut className="h-4 w-4" />
                              Log out
                            </button>
                          </div>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login">
                  <Button variant="outline" size="sm" className="text-slate-300 hover:text-white border-slate-700">
                    <LogIn className="h-4 w-4 mr-1" />
                    <span className="hidden sm:inline">Log In</span>
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                    <UserPlus className="h-4 w-4 mr-1" />
                    <span className="hidden sm:inline">Sign Up</span>
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden border-t border-slate-800 overflow-hidden"
            >
              <div className="px-4 py-3 space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.path}
                      href={item.path}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                        isActive(item.path)
                          ? 'bg-blue-500/10 text-blue-400'
                          : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      {item.label}
                    </Link>
                  );
                })}
                {isAuthenticated && (
                  <>
                    <Link
                      href="/profile"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800/50"
                    >
                      <User className="h-5 w-5" />
                      Profile
                    </Link>
                    {user?.role === 'admin' && (
                      <Link
                        href="/admin"
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800/50"
                      >
                        <Shield className="h-5 w-5" />
                        Admin Dashboard
                      </Link>
                    )}
                  </>
                )}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8">{children}</main>

      {/* Footer */}
      <footer className="border-t border-slate-800 mt-16">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
                <Code2 className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm text-slate-400">Infinity Code &copy; {new Date().getFullYear()}</span>
            </div>
            <div className="flex gap-6 text-sm text-slate-400">
              <Link href="/lessons" className="hover:text-white transition-colors">Courses</Link>
              <Link href="/playground" className="hover:text-white transition-colors">Playground</Link>
              <Link href="/ai-tutor" className="hover:text-white transition-colors">AI Tutor</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}