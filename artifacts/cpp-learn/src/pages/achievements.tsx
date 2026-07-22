import { useGetAchievements, useGetProgress } from "@workspace/api-client-react";
import { Trophy, Lock, Star, Zap, Code2, Brain } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useLocalProgress } from "@/hooks/use-local-progress";

export default function AchievementsPage() {
  const { data: achievements, isLoading } = useGetAchievements();
  const { data: apiProgress } = useGetProgress();
  const { getMergedProgress } = useLocalProgress();
  const progress = getMergedProgress(apiProgress);

  // Derive unlocked IDs from progress logic (client-side gamification)
  const unlockedIds = new Set<string>();
  if (progress.completedLessons >= 1) unlockedIds.add("first_blood");
  if (progress.streak >= 3) unlockedIds.add("streak_3");
  if (progress.passedQuizzes >= 5) unlockedIds.add("quiz_master");
  if (progress.level >= 5) unlockedIds.add("level_5");

  const IconMap: Record<string, any> = {
    Code2, Star, Zap, Brain, Trophy
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4 py-8 border-b">
        <div className="w-24 h-24 mx-auto bg-amber-500/10 rounded-full flex items-center justify-center border-4 border-amber-500/20 mb-6">
          <Trophy className="w-12 h-12 text-amber-500" />
        </div>
        <h1 className="text-4xl font-bold font-handwriting text-primary">Hall of Fame</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Your hard-earned badges of honor. C++ isn't easy, and every milestone is worth celebrating.
        </p>
        
        <div className="flex justify-center gap-8 pt-6">
          <div className="text-center">
            <p className="text-4xl font-bold font-mono">{progress.xp}</p>
            <p className="text-sm text-muted-foreground uppercase tracking-wider font-bold">Total XP</p>
          </div>
          <div className="w-px bg-border"></div>
          <div className="text-center">
            <p className="text-4xl font-bold font-mono">{progress.level}</p>
            <p className="text-sm text-muted-foreground uppercase tracking-wider font-bold">Level</p>
          </div>
          <div className="w-px bg-border"></div>
          <div className="text-center">
            <p className="text-4xl font-bold font-mono text-primary">{unlockedIds.size}</p>
            <p className="text-sm text-muted-foreground uppercase tracking-wider font-bold">Unlocked</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
        {isLoading ? (
          <div className="col-span-full text-center py-12 animate-pulse">Loading achievements...</div>
        ) : (
          achievements?.map(ach => {
            const isUnlocked = unlockedIds.has(ach.id);
            const Icon = IconMap[ach.icon] || Trophy;

            return (
              <Card key={ach.id} className={`relative overflow-hidden transition-all duration-300 ${
                isUnlocked 
                  ? 'border-primary/40 bg-card hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5' 
                  : 'opacity-60 grayscale hover:opacity-80'
              }`}>
                {!isUnlocked && (
                  <div className="absolute top-4 right-4">
                    <Lock className="w-5 h-5 text-muted-foreground" />
                  </div>
                )}
                
                <div className="p-6 space-y-4">
                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center border-2 ${
                    isUnlocked ? 'bg-primary/10 border-primary text-primary' : 'bg-muted border-muted-foreground text-muted-foreground'
                  }`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  
                  <div>
                    <h3 className={`font-bold text-xl mb-1 ${isUnlocked ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {ach.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{ach.description}</p>
                  </div>
                  
                  <div className="pt-4 border-t flex justify-between items-center text-sm font-mono">
                    <span className="text-muted-foreground">{ach.requirement}</span>
                    <span className={isUnlocked ? 'text-amber-500 font-bold' : 'text-muted-foreground'}>+{ach.xpReward} XP</span>
                  </div>
                </div>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
