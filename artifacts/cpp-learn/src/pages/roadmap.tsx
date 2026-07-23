import { useGetLessons } from '@/hooks/use-static-data';
import { useLocalProgress } from '@/hooks/use-local-progress';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { CheckCircle2, Circle, Lock, Play, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export default function RoadmapPage() {
  const { data: lessons, isLoading } = useGetLessons();
  const { completedLessonIds } = useLocalProgress();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading roadmap...</p>
        </div>
      </div>
    );
  }

  const groupedLessons = lessons?.reduce((acc, lesson) => {
    const category = lesson.topics[0] || 'General';
    if (!acc[category]) acc[category] = [];
    acc[category].push(lesson);
    return acc;
  }, {} as Record<string, typeof lessons>);

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-3"
      >
        <h1 className="text-4xl font-bold">C++ Learning Roadmap</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Follow this structured path from beginner to advanced. 
          Each lesson builds on the previous ones.
        </p>
      </motion.div>

      {/* Progress Overview */}
      <Card className="bg-gradient-to-r from-primary/10 to-primary/5">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold">
                {completedLessonIds.length} / {lessons?.length || 0}
              </h3>
              <p className="text-sm text-muted-foreground">Lessons Completed</p>
            </div>
            <div className="text-right">
              <h3 className="text-2xl font-bold text-primary">
                {Math.round((completedLessonIds.length / (lessons?.length || 1)) * 100)}%
              </h3>
              <p className="text-sm text-muted-foreground">Overall Progress</p>
            </div>
          </div>
          <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-500"
              style={{ width: `${(completedLessonIds.length / (lessons?.length || 1)) * 100}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border" />

        <div className="space-y-8">
          {lessons?.map((lesson, idx) => {
            const isCompleted = completedLessonIds.includes(lesson.id);
            const isNext = !isCompleted && (idx === 0 || completedLessonIds.includes(lessons[idx - 1].id));
            const isLocked = idx > 0 && !completedLessonIds.includes(lessons[idx - 1].id);

            return (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="relative pl-20"
              >
                {/* Timeline Dot */}
                <div
                  className={cn(
                    "absolute left-5 w-6 h-6 rounded-full border-4 flex items-center justify-center",
                    isCompleted
                      ? "bg-primary border-primary text-primary-foreground"
                      : isNext
                      ? "bg-background border-primary animate-pulse"
                      : "bg-background border-muted"
                  )}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : isLocked ? (
                    <Lock className="w-3 h-3 text-muted-foreground" />
                  ) : (
                    <Circle className="w-2 h-2 fill-current" />
                  )}
                </div>

                <Card
                  className={cn(
                    "transition-all",
                    isCompleted && "opacity-70 hover:opacity-100",
                    isNext && "border-primary shadow-md",
                    isLocked && "opacity-50"
                  )}
                >
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="font-mono">
                              {lesson.order}
                            </Badge>
                            {isNext && (
                              <Badge className="bg-primary">
                                <Play className="w-3 h-3 mr-1" />
                                Next Up
                              </Badge>
                            )}
                            {isCompleted && (
                              <Badge variant="secondary" className="bg-green-500/10 text-green-600 dark:text-green-400">
                                ✓ Completed
                              </Badge>
                            )}
                          </div>
                          
                          <h3 className="text-xl font-bold">{lesson.title}</h3>
                          <p className="text-muted-foreground">{lesson.description}</p>

                          <div className="flex flex-wrap gap-2 pt-2">
                            {lesson.topics.slice(0, 3).map((topic) => (
                              <Badge key={topic} variant="secondary" className="text-xs">
                                {topic}
                              </Badge>
                            ))}
                            {lesson.topics.length > 3 && (
                              <Badge variant="secondary" className="text-xs">
                                +{lesson.topics.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>

                        <div className="text-right space-y-2">
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            <span>{lesson.estimatedMinutes}m</span>
                          </div>
                          <Badge
                            variant={
                              lesson.difficulty === 'beginner'
                                ? 'default'
                                : lesson.difficulty === 'intermediate'
                                ? 'secondary'
                                : 'destructive'
                            }
                            className="capitalize"
                          >
                            {lesson.difficulty}
                          </Badge>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Link href={`/lessons/${lesson.id}`}>
                          <Button
                            disabled={isLocked}
                            variant={isNext ? 'default' : 'outline'}
                          >
                            {isCompleted ? (
                              <>Review Lesson</>
                            ) : isNext ? (
                              <>
                                <Play className="w-4 h-4 mr-2" />
                                Start Lesson
                              </>
                            ) : isLocked ? (
                              <>
                                <Lock className="w-4 h-4 mr-2" />
                                Locked
                              </>
                            ) : (
                              <>Start Lesson</>
                            )}
                          </Button>
                        </Link>

                        {isCompleted && (
                          <Link href={`/quiz/${lesson.id}`}>
                            <Button variant="outline">
                              Take Quiz Again
                            </Button>
                          </Link>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Final Message */}
      {completedLessonIds.length === lessons?.length && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-8 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg border-2 border-primary"
        >
          <h2 className="text-3xl font-bold mb-2">🎉 Congratulations!</h2>
          <p className="text-lg text-muted-foreground">
            You've completed all lessons! Ready to build real projects?
          </p>
          <Button size="lg" className="mt-4">
            Explore Projects
          </Button>
        </motion.div>
      )}
    </div>
  );
}
