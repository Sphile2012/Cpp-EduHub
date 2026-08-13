const fs = require('fs');
const path = require('path');

const base = __dirname;
const ui = path.join(base, 'src', 'components', 'ui');
const pages = path.join(base, 'src', 'pages');
const layout = path.join(base, 'src', 'components', 'layout');

function w(f, c) { fs.writeFileSync(f, c); }

// label.tsx
w(path.join(ui, 'label.tsx'), `import * as React from 'react';
import { cn } from '@/lib/utils';

const Label = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={cn(
      'text-sm font-medium leading-none text-white peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
      className
    )}
    {...props}
  />
));
Label.displayName = 'Label';

export { Label };
`);

// card.tsx
w(path.join(ui, 'card.tsx'), `import * as React from 'react';
import { cn } from '@/lib/utils';

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('rounded-xl border border-slate-800 bg-slate-900/50 text-white shadow-sm', className)}
    {...props}
  />
));
Card.displayName = 'Card';

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
));
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3 ref={ref} className={cn('text-lg font-semibold leading-none tracking-tight', className)} {...props} />
));
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn('text-sm text-slate-400', className)} {...props} />
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
));
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('flex items-center p-6 pt-0', className)} {...props} />
));
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
`);

// badge.tsx
w(path.join(ui, 'badge.tsx'), `import * as React from 'react';
import { cn } from '@/lib/utils';

type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline' | 'success';

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-blue-600 text-white',
  secondary: 'bg-slate-800 text-slate-200',
  destructive: 'bg-red-600 text-white',
  outline: 'border border-slate-700 text-slate-200',
  success: 'bg-green-600 text-white',
};

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: BadgeVariant;
}

function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <div
      className={cn('inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium', variantClasses[variant], className)}
      {...props}
    />
  );
}

export { Badge };
`);

// progress.tsx
w(path.join(ui, 'progress.tsx'), `import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value = 0, max = 100, ...props }, ref) => {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100));
    return (
      <div
        ref={ref}
        className={cn('h-2 w-full overflow-hidden rounded-full bg-slate-800', className)}
        {...props}
      >
        <div
          className='h-full rounded-full bg-blue-600 transition-all'
          style={{ width: \`\${percentage}%\` }}
        />
      </div>
    );
  }
);
Progress.displayName = 'Progress';

export { Progress };
`);

// tabs.tsx
w(path.join(ui, 'tabs.tsx'), `import * as React from 'react';
import { cn } from '@/lib/utils';

interface TabsContextType {
  value: string;
  setValue: (v: string) => void;
}

const TabsContext = React.createContext<TabsContextType | null>(null);

export function Tabs({ children, defaultValue, className }: { children: React.ReactNode; defaultValue: string; className?: string }) {
  const [value, setValue] = React.useState(defaultValue);
  return (
    <TabsContext.Provider value={{ value, setValue }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('inline-flex h-10 items-center justify-center rounded-lg bg-slate-900 p-1 text-slate-400', className)}>
      {children}
    </div>
  );
}

export function TabsTrigger({ children, value, className }: { children: React.ReactNode; value: string; className?: string }) {
  const ctx = React.useContext(TabsContext);
  if (!ctx) throw new Error('TabsTrigger must be used within Tabs');
  return (
    <button
      onClick={() => ctx.setValue(value)}
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-all',
        ctx.value === value ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200',
        className
      )}
    >
      {children}
    </button>
  );
}

export function TabsContent({ children, value, className }: { children: React.ReactNode; value: string; className?: string }) {
  const ctx = React.useContext(TabsContext);
  if (!ctx) throw new Error('TabsContent must be used within Tabs');
  if (ctx.value !== value) return null;
  return <div className={cn('mt-2', className)}>{children}</div>;
}
`);

// select.tsx
w(path.join(ui, 'select.tsx'), `import * as React from 'react';
import { cn } from '@/lib/utils';

const Select = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(({ className, children, ...props }, ref) => (
  <select
    ref={ref}
    className={cn('h-10 w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50', className)}
    {...props}
  >
    {children}
  </select>
));
Select.displayName = 'Select';

export { Select };
`);

// toaster.tsx
w(path.join(ui, 'toaster.tsx'), `import { useToast } from '@/hooks/use-toast';

export function Toaster() {
  const { toasts, dismiss } = useToast();
  return (
    <div className='fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm'>
      {toasts.map((t) => (
        <div
          key={t.id}
          onClick={() => dismiss(t.id)}
          className={\`cursor-pointer rounded-lg border p-4 shadow-lg transition-all \${
            t.variant === 'destructive'
              ? 'border-red-800 bg-red-950/90 text-red-100'
              : 'border-slate-800 bg-slate-900/90 text-white'
          }\`}
        >
          {t.title && <div className='font-medium text-sm mb-1'>{t.title}</div>}
          {t.description && <div className='text-sm opacity-90'>{t.description}</div>}
        </div>
      ))}
    </div>
  );
}
`);

// tooltip.tsx
w(path.join(ui, 'tooltip.tsx'), `import * as React from 'react';

interface TooltipProviderProps {
  children: React.ReactNode;
}

export function TooltipProvider({ children }: TooltipProviderProps) {
  return <>{children}</>;
}

interface TooltipProps {
  children: React.ReactNode;
  content: string;
}

export function Tooltip({ children, content }: TooltipProps) {
  return (
    <span className='group relative inline-flex'>
      {children}
      <span className='pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-slate-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100'>
        {content}
      </span>
    </span>
  );
}
`);

// ============================================
// PAGES
// ============================================

// not-found.tsx
w(path.join(pages, 'not-found.tsx'), `import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
      <h1 className="text-6xl font-bold text-blue-500 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Page not found</h2>
      <p className="text-slate-400 mb-6">The page you are looking for does not exist.</p>
      <Link href="/"><Button>Back to Dashboard</Button></Link>
    </div>
  );
}
`);

// dashboard.tsx
w(path.join(pages, 'dashboard.tsx'), `import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { BookOpen, Code, Brain, Trophy, Flame, ArrowRight } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const featuredCourses = [
  { id: 1, title: 'C++ Fundamentals', level: 'Beginner', lessons: 24, icon: '📘', color: 'from-blue-500 to-blue-700' },
  { id: 2, title: 'Data Structures', level: 'Intermediate', lessons: 32, icon: '🗂️', color: 'from-purple-500 to-purple-700' },
  { id: 3, title: 'Web Development', level: 'Beginner', lessons: 18, icon: '🌐', color: 'from-green-500 to-green-700' },
  { id: 4, title: 'Python Basics', level: 'Beginner', lessons: 20, icon: '🐍', color: 'from-yellow-500 to-yellow-700' },
];

const stats = [
  { label: 'Lessons Completed', value: 0, icon: BookOpen, color: 'text-blue-400' },
  { label: 'Code Exercises', value: 0, icon: Code, color: 'text-green-400' },
  { label: 'Quizzes Passed', value: 0, icon: Brain, color: 'text-purple-400' },
  { label: 'Day Streak', value: 0, icon: Flame, color: 'text-orange-400' },
];

export default function Dashboard() {
  const { user, isAuthenticated } = useAuth();
  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">{isAuthenticated ? \`Welcome back, \${user?.name?.split(' ')[0] || 'Learner'}!\` : 'Welcome to Infinity Code'}</h1>
        <p className="text-blue-100 mb-6">{isAuthenticated ? 'Continue your learning journey.' : 'Your all-in-one platform to learn programming.'}</p>
        <div className="flex flex-wrap gap-3">
          <Link href="/lessons"><button className="rounded-lg bg-white text-blue-600 px-6 py-2.5 font-medium hover:bg-blue-50 transition-colors">Browse Courses</button></Link>
          <Link href="/playground"><button className="rounded-lg bg-blue-500/30 text-white border border-white/20 px-6 py-2.5 font-medium hover:bg-blue-500/40 transition-colors">Open Playground</button></Link>
        </div>
      </motion.div>
      {isAuthenticated && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Card><CardContent className="p-6">
                <div className="flex items-center justify-between mb-2"><stat.icon className={\`h-8 w-8 \${stat.color}\`} /><span className="text-2xl font-bold">{stat.value}</span></div>
                <p className="text-sm text-slate-400">{stat.label}</p>
              </CardContent></Card>
            </motion.div>
          ))}
        </div>
      )}
      <div>
        <div className="flex items-center justify-between mb-4"><h2 className="text-xl font-bold">Featured Courses</h2><Link href="/lessons" className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1">View all <ArrowRight className="h-4 w-4" /></Link></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredCourses.map((course, i) => (
            <motion.div key={course.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Link href={\`/lessons/\${course.id}\`}><Card className="overflow-hidden hover:border-blue-500/50 transition-colors cursor-pointer h-full">
                <div className={\`h-32 bg-gradient-to-br \${course.color} flex items-center justify-center text-5xl\`}>{course.icon}</div>
                <CardContent className="p-4"><div className="flex items-center justify-between mb-2"><Badge variant="secondary">{course.level}</Badge><span className="text-xs text-slate-400">{course.lessons} lessons</span></div><h3 className="font-semibold mb-1">{course.title}</h3></CardContent>
              </Card></Link>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/ai-tutor"><Card className="hover:border-blue-500/50 transition-colors cursor-pointer"><CardContent className="p-6 flex items-center gap-4"><div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/20"><Brain className="h-6 w-6 text-purple-400" /></div><div><h3 className="font-semibold">AI Assistant</h3><p className="text-sm text-slate-400">Get help with code</p></div></CardContent></Card></Link>
        <Link href="/playground"><Card className="hover:border-blue-500/50 transition-colors cursor-pointer"><CardContent className="p-6 flex items-center gap-4"><div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/20"><Code className="h-6 w-6 text-green-400" /></div><div><h3 className="font-semibold">Code Playground</h3><p className="text-sm text-slate-400">Practice coding</p></div></CardContent></Card></Link>
        <Link href="/achievements"><Card className="hover:border-blue-500/50 transition-colors cursor-pointer"><CardContent className="p-6 flex items-center gap-4"><div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/20"><Trophy className="h-6 w-6 text-orange-400" /></div><div><h3 className="font-semibold">Achievements</h3><p className="text-sm text-slate-400">Track your progress</p></div></CardContent></Card></Link>
      </div>
    </div>
  );
}
`);

console.log('UI components and pages created successfully');
