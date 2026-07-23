import { AchievementSystem, sampleAchievements } from '@/components/gamification/achievement-system';
import { Card } from '@/components/ui/card';
import { Trophy, TrendingUp, Flame, Star } from 'lucide-react';

export default function AchievementsPage() {
  // In a real app, this would come from user progress state/API
  const userStats = {
    totalXP: 1250,
    level: 5,
    xpToNextLevel: 750,
    currentStreak: 3,
    longestStreak: 7,
    totalLessons: 15,
    completedLessons: 8
  };

  return (
    <div className="min-h-screen p-8 bg-background">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold flex items-center justify-center gap-3">
            <Trophy className="w-10 h-10 text-primary" />
            Achievements & Progress
          </h1>
          <p className="text-muted-foreground">
            Track your learning journey and unlock badges
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4 bg-gradient-to-br from-primary/10 to-primary/5">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/20 rounded-lg">
                <Star className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{userStats.totalXP}</p>
                <p className="text-sm text-muted-foreground">Total XP</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-green-500/10 to-green-500/5">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-500/20 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">Level {userStats.level}</p>
                <p className="text-sm text-muted-foreground">Current Level</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-orange-500/10 to-orange-500/5">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-orange-500/20 rounded-lg">
                <Flame className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{userStats.currentStreak}</p>
                <p className="text-sm text-muted-foreground">Day Streak</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-blue-500/10 to-blue-500/5">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <Trophy className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {sampleAchievements.filter(a => a.unlocked).length}
                </p>
                <p className="text-sm text-muted-foreground">Unlocked</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Achievement System */}
        <AchievementSystem
          achievements={sampleAchievements}
          totalXP={userStats.totalXP}
          level={userStats.level}
          xpToNextLevel={userStats.xpToNextLevel}
        />
      </div>
    </div>
  );
}
