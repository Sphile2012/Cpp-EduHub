import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Gamepad2, Briefcase, GraduationCap, Cpu, Box, 
  Target, Clock, CheckCircle2, Loader2, Sparkles 
} from 'lucide-react';
import { motion } from 'framer-motion';

const goals = [
  { 
    id: 'game-dev', 
    name: 'Game Developer', 
    icon: Gamepad2,
    description: 'Build games with C++ and game engines',
    color: 'from-purple-500 to-pink-500'
  },
  { 
    id: 'interviews', 
    name: 'Technical Interviews', 
    icon: Briefcase,
    description: 'Master data structures & algorithms',
    color: 'from-blue-500 to-cyan-500'
  },
  { 
    id: 'university', 
    name: 'University Course', 
    icon: GraduationCap,
    description: 'Excel in your C++ coursework',
    color: 'from-green-500 to-emerald-500'
  },
  { 
    id: 'embedded', 
    name: 'Embedded Systems', 
    icon: Cpu,
    description: 'Program microcontrollers and IoT',
    color: 'from-orange-500 to-red-500'
  },
  { 
    id: 'unreal', 
    name: 'Unreal Engine', 
    icon: Box,
    description: 'Create games with Unreal Engine',
    color: 'from-indigo-500 to-purple-500'
  }
];

export default function AIStudyPlanner() {
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [roadmap, setRoadmap] = useState<any>(null);
  const [currentLevel, setCurrentLevel] = useState('beginner');

  const generateRoadmap = async (goalId: string) => {
    setLoading(true);
    setSelectedGoal(goalId);

    try {
      const goal = goals.find(g => g.id === goalId);
      const response = await fetch('http://localhost:3001/api/ai-tutor/study-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          goal: goal?.name,
          currentLevel
        })
      });

      if (!response.ok) throw new Error('Failed to generate roadmap');

      const data = await response.json();
      setRoadmap(data);
    } catch (error) {
      console.error('Error generating roadmap:', error);
      // Fallback roadmap
      setRoadmap({
        title: `${goals.find(g => g.id === goalId)?.name} Learning Path`,
        description: 'AI-generated personalized roadmap',
        estimatedWeeks: 12,
        milestones: [
          {
            title: 'C++ Fundamentals',
            description: 'Master the basics',
            topics: ['Variables', 'Data Types', 'Operators', 'Control Flow'],
            estimatedDays: 14,
            projects: ['Calculator', 'Grade Manager']
          },
          {
            title: 'Object-Oriented Programming',
            description: 'Learn OOP principles',
            topics: ['Classes', 'Objects', 'Inheritance', 'Polymorphism'],
            estimatedDays: 21,
            projects: ['Banking System', 'Library Manager']
          }
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-background">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary">
            <Sparkles className="w-5 h-5" />
            <span className="font-semibold">AI-Powered</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">Personalized Study Planner</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tell us your goal, and our AI will create a customized learning roadmap just for you
          </p>
        </motion.div>

        {/* Level Selection */}
        {!roadmap && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex justify-center gap-4"
          >
            <Button
              variant={currentLevel === 'beginner' ? 'default' : 'outline'}
              onClick={() => setCurrentLevel('beginner')}
            >
              Beginner
            </Button>
            <Button
              variant={currentLevel === 'intermediate' ? 'default' : 'outline'}
              onClick={() => setCurrentLevel('intermediate')}
            >
              Intermediate
            </Button>
            <Button
              variant={currentLevel === 'advanced' ? 'default' : 'outline'}
              onClick={() => setCurrentLevel('advanced')}
            >
              Advanced
            </Button>
          </motion.div>
        )}

        {/* Goals Grid */}
        {!roadmap && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {goals.map((goal, index) => (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <Card
                  className="cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1 h-full"
                  onClick={() => generateRoadmap(goal.id)}
                >
                  <CardContent className="p-6">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${goal.color} flex items-center justify-center mb-4`}>
                      <goal.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{goal.name}</h3>
                    <p className="text-sm text-muted-foreground">{goal.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Loading State */}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
            <h3 className="text-xl font-semibold mb-2">Creating Your Roadmap...</h3>
            <p className="text-muted-foreground">AI is analyzing the best path for you</p>
          </motion.div>
        )}

        {/* Roadmap Display */}
        {roadmap && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold">{roadmap.title}</h2>
                <p className="text-muted-foreground mt-1">{roadmap.description}</p>
              </div>
              <Button variant="outline" onClick={() => setRoadmap(null)}>
                Choose Different Goal
              </Button>
            </div>

            <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">{roadmap.estimatedWeeks}</div>
                    <p className="text-sm text-muted-foreground">Weeks</p>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-500 mb-2">{roadmap.milestones?.length || 0}</div>
                    <p className="text-sm text-muted-foreground">Milestones</p>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-amber-500 mb-2">0%</div>
                    <p className="text-sm text-muted-foreground">Complete</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Milestones */}
            <div className="space-y-4">
              {roadmap.milestones?.map((milestone: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <span className="font-bold text-primary">{index + 1}</span>
                            </div>
                            <div>
                              <CardTitle>{milestone.title}</CardTitle>
                              <CardDescription>{milestone.description}</CardDescription>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span>{milestone.estimatedDays} days</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Topics */}
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <Target className="w-4 h-4" />
                          Topics to Master
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {milestone.topics?.map((topic: string, i: number) => (
                            <Badge key={i} variant="secondary">{topic}</Badge>
                          ))}
                        </div>
                      </div>

                      {/* Projects */}
                      {milestone.projects && milestone.projects.length > 0 && (
                        <div>
                          <h4 className="font-semibold mb-2 flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4" />
                            Projects to Build
                          </h4>
                          <ul className="space-y-1">
                            {milestone.projects.map((project: string, i: number) => (
                              <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                                {project}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Progress */}
                      <div>
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-semibold">0%</span>
                        </div>
                        <Progress value={0} />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="flex justify-center">
              <Button size="lg" className="gap-2">
                <Sparkles className="w-5 h-5" />
                Start Learning
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
