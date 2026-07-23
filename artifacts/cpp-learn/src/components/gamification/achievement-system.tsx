import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Trophy, Star, Zap, Code, BookOpen, Target, 
  Flame, Award, CheckCircle2, Lock
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: 'trophy' | 'star' | 'zap' | 'code' | 'book' | 'target' | 'flame' | 'award';
  category: 'learning' | 'practice' | 'streak' | 'mastery' | 'special';
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  xpReward: number;
  requirement: number;
  progress: number;
  unlocked: boolean;
  unlockedDate?: Date;
}

interface AchievementSystemProps {
  achievements: Achievement[];
  totalXP: number;
  level: number;
  xpToNextLevel: number;
}

const iconMap = {
  trophy: Trophy,
  star: Star,
  zap: Zap,
  code: Code,
  book: BookOpen,
  target: Target,
  flame: Flame,
  award: Award
};

const tierColors = {
  bronze: 'from-amber-700 to-amber-900',
  silver: 'from-gray-400 to-gray-600',
  gold: 'from-yellow-400 to-yellow-600',
  platinum: 'from-cyan-400 to-blue-600'
};

const tierBorderColors = {
  bronze: 'border-amber-700',
  silver: 'border-gray-400',
  gold: 'border-yellow-400',
  platinum: 'border-cyan-400'
};

export function AchievementSystem({ achievements, totalXP, level, xpToNextLevel }: AchievementSystemProps) {
  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const progressPercentage = (unlockedCount / achievements.length) * 100;

  return (
    <div className="space-y-8">
      {/* Profile Card */}
      <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold">Level {level}</h2>
            <p className="text-muted-foreground">Total XP: {totalXP.toLocaleString()}</p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-2">
              <Trophy className="w-10 h-10 text-primary" />
            </div>
            <Badge variant="secondary">{unlockedCount}/{achievements.length}</Badge>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress to Level {level + 1}</span>
            <span>{xpToNextLevel.toLocaleString()} XP needed</span>
          </div>
          <Progress value={progressPercentage} className="h-3" />
        </div>
      </Card>

      {/* Categories */}
      {['learning', 'practice', 'streak', 'mastery', 'special'].map(category => {
        const categoryAchievements = achievements.filter(a => a.category === category);
        const categoryUnlocked = categoryAchievements.filter(a => a.unlocked).length;

        return (
          <div key={category} className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold capitalize">{category}</h3>
              <Badge variant="outline">
                {categoryUnlocked}/{categoryAchievements.length}
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categoryAchievements.map(achievement => (
                <AchievementCard key={achievement.id} achievement={achievement} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function AchievementCard({ achievement }: { achievement: Achievement }) {
  const Icon = iconMap[achievement.icon];
  const progressPercentage = Math.min((achievement.progress / achievement.requirement) * 100, 100);

  return (
    <Card
      className={cn(
        "p-4 transition-all hover:shadow-lg",
        achievement.unlocked ? "bg-card" : "bg-card/50 opacity-75",
        achievement.unlocked && `border-2 ${tierBorderColors[achievement.tier]}`
      )}
    >
      <div className="flex items-start gap-4">
        <div
          className={cn(
            "w-16 h-16 rounded-lg flex items-center justify-center flex-shrink-0",
            achievement.unlocked 
              ? `bg-gradient-to-br ${tierColors[achievement.tier]}` 
              : "bg-muted"
          )}
        >
          {achievement.unlocked ? (
            <Icon className="w-8 h-8 text-white" />
          ) : (
            <Lock className="w-8 h-8 text-muted-foreground" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h4 className="font-semibold truncate">{achievement.title}</h4>
            {achievement.unlocked && (
              <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
            )}
          </div>

          <p className="text-sm text-muted-foreground mb-3">
            {achievement.description}
          </p>

          {!achievement.unlocked && (
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{achievement.progress}/{achievement.requirement}</span>
                <span>{Math.round(progressPercentage)}%</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>
          )}

          <div className="flex items-center justify-between mt-3">
            <Badge variant="outline" className="text-xs capitalize">
              {achievement.tier}
            </Badge>
            <span className="text-xs font-semibold text-primary">
              +{achievement.xpReward} XP
            </span>
          </div>

          {achievement.unlocked && achievement.unlockedDate && (
            <p className="text-xs text-muted-foreground mt-2">
              Unlocked {achievement.unlockedDate.toLocaleDateString()}
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}

// Sample achievements data
export const sampleAchievements: Achievement[] = [
  {
    id: 'first-lesson',
    title: 'First Steps',
    description: 'Complete your first C++ lesson',
    icon: 'book',
    category: 'learning',
    tier: 'bronze',
    xpReward: 50,
    requirement: 1,
    progress: 1,
    unlocked: true,
    unlockedDate: new Date()
  },
  {
    id: 'five-lessons',
    title: 'Getting Started',
    description: 'Complete 5 lessons',
    icon: 'target',
    category: 'learning',
    tier: 'silver',
    xpReward: 150,
    requirement: 5,
    progress: 3,
    unlocked: false
  },
  {
    id: 'all-basics',
    title: 'Basics Master',
    description: 'Complete all basic lessons',
    icon: 'trophy',
    category: 'mastery',
    tier: 'gold',
    xpReward: 500,
    requirement: 10,
    progress: 3,
    unlocked: false
  },
  {
    id: 'first-quiz',
    title: 'Quiz Taker',
    description: 'Pass your first quiz',
    icon: 'star',
    category: 'practice',
    tier: 'bronze',
    xpReward: 75,
    requirement: 1,
    progress: 0,
    unlocked: false
  },
  {
    id: 'perfect-score',
    title: 'Perfect Score',
    description: 'Get 100% on a quiz',
    icon: 'award',
    category: 'practice',
    tier: 'gold',
    xpReward: 300,
    requirement: 1,
    progress: 0,
    unlocked: false
  },
  {
    id: 'code-runner',
    title: 'Code Runner',
    description: 'Run 10 programs in the playground',
    icon: 'code',
    category: 'practice',
    tier: 'bronze',
    xpReward: 100,
    requirement: 10,
    progress: 5,
    unlocked: false
  },
  {
    id: 'week-streak',
    title: '7 Day Streak',
    description: 'Study for 7 days in a row',
    icon: 'flame',
    category: 'streak',
    tier: 'silver',
    xpReward: 200,
    requirement: 7,
    progress: 2,
    unlocked: false
  },
  {
    id: 'month-streak',
    title: '30 Day Streak',
    description: 'Study for 30 days in a row',
    icon: 'flame',
    category: 'streak',
    tier: 'platinum',
    xpReward: 1000,
    requirement: 30,
    progress: 2,
    unlocked: false
  },
  {
    id: 'pointer-master',
    title: 'Pointer Master',
    description: 'Master all pointer lessons',
    icon: 'zap',
    category: 'mastery',
    tier: 'gold',
    xpReward: 400,
    requirement: 5,
    progress: 0,
    unlocked: false
  },
  {
    id: 'oop-expert',
    title: 'OOP Expert',
    description: 'Complete all OOP lessons',
    icon: 'trophy',
    category: 'mastery',
    tier: 'platinum',
    xpReward: 800,
    requirement: 8,
    progress: 0,
    unlocked: false
  },
  {
    id: 'early-bird',
    title: 'Early Bird',
    description: 'Study before 8 AM',
    icon: 'star',
    category: 'special',
    tier: 'silver',
    xpReward: 150,
    requirement: 1,
    progress: 0,
    unlocked: false
  },
  {
    id: 'night-owl',
    title: 'Night Owl',
    description: 'Study after 10 PM',
    icon: 'star',
    category: 'special',
    tier: 'silver',
    xpReward: 150,
    requirement: 1,
    progress: 0,
    unlocked: false
  }
];
