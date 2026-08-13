import { useState } from 'react';
import { Link } from 'wouter';
import { Search, BookOpen, Clock, PlayCircle, FileText, Code, Brain, Trophy } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { courses, getProgrammingLanguages } from '@/config/courses';

const levelColors: Record<string, string> = {
  Beginner: 'from-green-500 to-emerald-600',
  Intermediate: 'from-blue-500 to-purple-600',
  Advanced: 'from-red-500 to-orange-600',
};

const lessonTypeIcons: Record<string, any> = {
  video: PlayCircle,
  text: FileText,
  exercise: Code,
  quiz: Brain,
  project: Trophy,
};

export default function LessonBrowser() {
  const [search, setSearch] = useState('');
  const [level, setLevel] = useState('all');
  const [language, setLanguage] = useState('all');
  const languages = getProgrammingLanguages();

  const filtered = courses.filter((c) => {
    return (
      c.title.toLowerCase().includes(search.toLowerCase()) &&
      (level === 'all' || c.level === level) &&
      (language === 'all' || c.language === language)
    );
  });

  const totalLessons = (course: typeof courses[0]) =>
    course.modules.reduce((sum, m) => sum + m.lessons.length, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2 text-white">Courses</h1>
        <p className="text-slate-400">Browse and enroll in programming courses across {languages.length} languages</p>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search courses..." className="pl-10" />
        </div>
        <Select value={language} onChange={(e) => setLanguage(e.target.value)} className="sm:w-40">
          <option value="all">All Languages</option>
          {languages.map((lang) => (
            <option key={lang} value={lang}>{lang}</option>
          ))}
        </Select>
        <Select value={level} onChange={(e) => setLevel(e.target.value)} className="sm:w-40">
          <option value="all">All Levels</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </Select>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((course) => {
          const lessonCount = totalLessons(course);
          return (
            <Link key={course.id} href={`/lessons/${course.id}`}>
              <Card className="overflow-hidden hover:border-blue-500/50 transition-colors cursor-pointer h-full border-slate-800">
                <div
                  className="h-32 flex items-center justify-center text-4xl font-bold text-white"
                  style={{ background: `linear-gradient(135deg, ${course.color}, ${course.color}dd)` }}
                >
                  {course.icon}
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">{course.level}</Badge>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <BookOpen className="h-3 w-3" /> {lessonCount} lessons
                    </span>
                  </div>
                  <h3 className="font-semibold mb-1 text-white">{course.title}</h3>
                  <p className="text-sm text-slate-400 mb-2">{course.description}</p>
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {course.modules.length} modules</span>
                    <span>{course.language}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-slate-600 mx-auto mb-4" />
          <p className="text-slate-400">No courses found matching your search.</p>
        </div>
      )}
    </div>
  );
}