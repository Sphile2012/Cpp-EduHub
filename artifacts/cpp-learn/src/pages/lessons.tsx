import { useGetLessons } from "@/hooks/use-static-data";
import { useLocalProgress } from "@/hooks/use-local-progress";
import { Link } from "wouter";
import { BookOpen, CheckCircle2, Clock, Signal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { motion } from "framer-motion";

export default function LessonBrowser() {
  const { data: lessons, isLoading } = useGetLessons();
  const { completedLessonIds, getMergedProgress } = useLocalProgress();
  const progress = getMergedProgress();
  
  const [filter, setFilter] = useState<string>("all");

  const filteredLessons = lessons?.filter(
    (l) => filter === "all" || l.difficulty === filter
  ) || [];
  const hasLessons = lessons?.length > 0;

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b pb-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold font-handwriting text-primary flex items-center gap-3">
            <BookOpen className="w-8 h-8" />
            Curriculum
          </h1>
          <p className="text-muted-foreground text-lg">
            Master C++ from memory management to object-oriented design.
          </p>
        </div>
        
        <div className="bg-card border rounded-lg p-4 min-w-[250px] shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Overall Progress</span>
            <span className="text-sm font-bold font-mono">{Math.round((progress.completedLessons / progress.totalLessons) * 100)}%</span>
          </div>
          <Progress value={(progress.completedLessons / progress.totalLessons) * 100} className="h-2" indicatorColor="bg-primary" />
        </div>
      </div>

      <div className="flex gap-2 pb-2 overflow-x-auto">
        {['all', 'beginner', 'intermediate', 'advanced'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-colors ${
              filter === f 
                ? "bg-primary text-primary-foreground shadow-sm" 
                : "bg-card border text-muted-foreground hover:bg-accent/10"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid gap-4 relative before:absolute before:inset-y-0 before:left-[27px] before:w-[2px] before:bg-border before:-z-10">
        {isLoading ? (
          <div className="text-center py-12 text-muted-foreground animate-pulse">Loading syllabus...</div>
        ) : hasLessons ? (
          filteredLessons.map((lesson, i) => {
            const isCompleted = completedLessonIds.includes(lesson.id);
            const isNext = !isCompleted && (!lessons?.[i-1] || completedLessonIds.includes(lessons[i-1].id));
            
            return (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                key={lesson.id}
                className="relative flex items-center gap-6 group"
              >
                {/* Timeline node */}
                <div className={`w-14 h-14 rounded-full flex items-center justify-center border-4 bg-background z-10 flex-shrink-0 transition-colors duration-300 ${
                  isCompleted ? "border-primary text-primary" :
                  isNext ? "border-primary bg-primary/10 text-primary shadow-[0_0_15px_rgba(var(--primary),0.3)]" :
                  "border-muted text-muted-foreground"
                }`}>
                  {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : <span className="font-mono font-bold">{lesson.order}</span>}
                </div>

                {/* Lesson Card */}
                <Link href={`/lessons/${lesson.id}`} className="flex-1 block">
                  <div className={`p-6 rounded-xl border transition-all duration-300 ${
                    isNext ? "bg-card border-primary/50 shadow-md hover:-translate-y-1" :
                    isCompleted ? "bg-background border-border hover:bg-card opacity-80 hover:opacity-100" :
                    "bg-card/50 border-border hover:bg-card"
                  }`}>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                      <h3 className={`text-xl font-bold ${isCompleted ? 'text-muted-foreground' : 'text-foreground'}`}>
                        {lesson.title}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant={
                          lesson.difficulty === 'beginner' ? 'default' :
                          lesson.difficulty === 'intermediate' ? 'secondary' : 'destructive'
                        } className="capitalize gap-1">
                          <Signal className="w-3 h-3" />
                          {lesson.difficulty}
                        </Badge>
                        <Badge variant="outline" className="font-mono gap-1 text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {lesson.estimatedMinutes}m
                        </Badge>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-4">{lesson.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {lesson.topics.map(topic => (
                        <span key={topic} className="text-xs bg-muted/50 text-muted-foreground px-2 py-1 rounded-md border">
                          #{topic}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })
        ) : (
          <div className="text-center py-12 bg-card border rounded-xl">
            <p className="text-muted-foreground">Curriculum is currently empty. Add lessons or check your content source.</p>
          </div>
        )}
        
        {hasLessons && filteredLessons.length === 0 && !isLoading && (
          <div className="text-center py-12 bg-card border rounded-xl">
            <p className="text-muted-foreground">No lessons found for this difficulty.</p>
          </div>
        )}
      </div>
    </div>
  );
}
