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
  LogIn,
  UserPlus,
  LogOut,
  Languages,
  ChevronDown,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import { useLanguage } from "@/hooks/use-language";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LANGUAGES, LANGUAGE_ORDER } from "@/config/languages";

export function MobileHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [location, setLocation] = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const { currentLanguage, setLanguage } = useLanguage();

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
    setIsOpen(false);
    setLocation('/');
  };

  return (
    <>
      {/* Mobile Header */}
      <header className="md:hidden sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center justify-between px-4 h-14">
          <Link href="/" className="flex items-center gap-2 font-handwriting text-xl font-bold text-primary">
            <TerminalSquare className="w-6 h-6" />
            <span>cpp_learn</span>
          </Link>
          
          <div className="flex items-center gap-2">
            {/* User Avatar/Auth Buttons */}
            {isAuthenticated && user ? (
              <Link href="/profile">
                <Avatar className="w-8 h-8 cursor-pointer hover:ring-2 hover:ring-primary transition-all">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold text-xs">
                    {user.name?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Link>
            ) : (
              <Link href="/login">
                <Button variant="ghost" size="sm" className="text-xs px-2">
                  <LogIn className="w-4 h-4 mr-1" />
                  Login
                </Button>
              </Link>
            )}

            {/* Hamburger Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              className="ml-1"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 z-40 bg-background/80 backdrop-blur-sm" 
          onClick={() => setIsOpen(false)} 
        />
      )}

      {/* Mobile Menu Drawer */}
      <nav
        className={cn(
          "md:hidden fixed top-14 right-0 z-50 h-[calc(100vh-3.5rem)] w-72 bg-card border-l shadow-lg transition-transform duration-300 ease-in-out overflow-y-auto",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col p-4 space-y-1">
          {/* User Info Section */}
          {isAuthenticated && user ? (
            <div className="mb-4 p-4 bg-primary/5 rounded-lg border border-primary/10">
              <div className="flex items-center gap-3 mb-3">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="bg-primary/20 text-primary font-bold">
                    {user.name?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate">{user.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Link href="/profile" onClick={() => setIsOpen(false)} className="flex-1">
                  <Button variant="outline" size="sm" className="w-full gap-2">
                    <User className="w-4 h-4" />
                    Profile
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleLogout}
                  className="flex-1 gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              </div>
            </div>
          ) : (
            <div className="mb-4 p-4 bg-primary/5 rounded-lg border border-primary/10 space-y-2">
              <p className="text-sm text-muted-foreground mb-3">Sign in to save your progress</p>
              <Link href="/login" onClick={() => setIsOpen(false)}>
                <Button variant="default" size="sm" className="w-full gap-2">
                  <LogIn className="w-4 h-4" />
                  Login
                </Button>
              </Link>
              <Link href="/signup" onClick={() => setIsOpen(false)}>
                <Button variant="outline" size="sm" className="w-full gap-2">
                  <UserPlus className="w-4 h-4" />
                  Sign Up
                </Button>
              </Link>
            </div>
          )}

          <Separator className="my-2" />

          {/* Language Switcher */}
          <div className="mb-3">
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
              <DropdownMenuContent align="start" className="w-64">
                {LANGUAGE_ORDER.map((langId) => {
                  const lang = LANGUAGES[langId];
                  return (
                    <DropdownMenuItem
                      key={langId}
                      onClick={() => {
                        setLanguage(langId);
                        setIsOpen(false);
                      }}
                      className="cursor-pointer"
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{lang.icon}</span>
                          <div>
                            <div className="font-medium">{lang.displayName}</div>
                            <div className="text-xs text-muted-foreground">{lang.difficulty}</div>
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

          <Separator className="my-2" />

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
        </div>
      </nav>
    </>
  );
}
