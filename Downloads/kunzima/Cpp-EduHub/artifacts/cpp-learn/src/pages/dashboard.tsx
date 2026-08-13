import { Link } from 'wouter';
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
        <h1 className="text-3xl font-bold mb-2">{isAuthenticated ? `Welcome back, ${user?.name?.split(' ')[0] || 'Learner'}!` : 'Welcome to Infinity Code'}</h1>
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
                <div className="flex items-center justify-between mb-2"><stat.icon className={`h-8 w-8 ${stat.color}`} /><span className="text-2xl font-bold">{stat.value}</span></div>
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
              <Link href={`/lessons/${course.id}`}><Card className="overflow-hidden hover:border-blue-500/50 transition-colors cursor-pointer h-full">
                <div className={`h-32 bg-gradient-to-br ${course.color} flex items-center justify-center text-5xl`}>{course.icon}</div>
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
