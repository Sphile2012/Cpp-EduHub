import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Play, Pause, RotateCcw, SkipForward } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoopStep {
  iteration: number;
  variable: string;
  value: number;
  condition: boolean;
  output?: string;
}

interface LoopVisualizerProps {
  code: string;
  title?: string;
}

export function LoopVisualizer({ code, title = "Loop Execution" }: LoopVisualizerProps) {
  const [steps, setSteps] = useState<LoopStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Parse the code and generate steps
    generateSteps(code);
  }, [code]);

  useEffect(() => {
    if (!isPlaying || currentStep >= steps.length - 1) {
      setIsPlaying(false);
      return;
    }

    const timer = setTimeout(() => {
      setCurrentStep(prev => prev + 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, steps.length]);

  const generateSteps = (code: string) => {
    // Example: for(int i=0; i<5; i++)
    const forLoopMatch = code.match(/for\s*\(\s*int\s+(\w+)\s*=\s*(\d+)\s*;\s*\1\s*<\s*(\d+)/);
    
    if (forLoopMatch) {
      const [, variable, start, end] = forLoopMatch;
      const startNum = parseInt(start);
      const endNum = parseInt(end);
      
      const newSteps: LoopStep[] = [];
      
      for (let i = startNum; i <= endNum; i++) {
        newSteps.push({
          iteration: i - startNum,
          variable,
          value: i,
          condition: i < endNum,
          output: i < endNum ? `${variable} = ${i}` : undefined
        });
      }
      
      setSteps(newSteps);
    }
  };

  const handlePlay = () => setIsPlaying(true);
  const handlePause = () => setIsPlaying(false);
  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const current = steps[currentStep];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{title}</span>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={handleReset}
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={isPlaying ? handlePause : handlePlay}
              disabled={currentStep >= steps.length - 1}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleNext}
              disabled={currentStep >= steps.length - 1}
            >
              <SkipForward className="w-4 h-4" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Code Display */}
        <div className="bg-muted p-4 rounded-md font-mono text-sm">
          <pre>{code}</pre>
        </div>

        {/* Visual Animation */}
        <div className="space-y-4">
          {/* Iteration Counter */}
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">Iteration:</span>
            <div className="flex gap-2">
              {steps.map((step, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center font-mono text-sm border-2 transition-all",
                    idx === currentStep
                      ? "bg-primary text-primary-foreground border-primary scale-110"
                      : idx < currentStep
                      ? "bg-primary/20 border-primary/50 text-primary"
                      : "border-muted-foreground/30 text-muted-foreground"
                  )}
                >
                  {idx}
                </div>
              ))}
            </div>
          </div>

          {/* Variable State */}
          {current && (
            <div className="bg-card border rounded-lg p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm text-muted-foreground">Variable:</span>
                  <div className="text-2xl font-bold font-mono">{current.variable} = {current.value}</div>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Condition:</span>
                  <div className={cn(
                    "text-xl font-bold",
                    current.condition ? "text-green-500" : "text-red-500"
                  )}>
                    {current.condition ? "true ✓" : "false ✗"}
                  </div>
                </div>
              </div>

              {/* Output */}
              {current.output && (
                <div className="border-t pt-4">
                  <span className="text-sm text-muted-foreground">Output:</span>
                  <div className="bg-muted p-3 rounded-md font-mono text-sm mt-2">
                    {current.output}
                  </div>
                </div>
              )}

              {/* Flow Explanation */}
              <div className="text-sm text-muted-foreground border-t pt-4">
                {current.condition ? (
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span>Condition is true → Execute loop body → Increment {current.variable}</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full" />
                    <span>Condition is false → Exit loop</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Progress</span>
            <span>{currentStep + 1} / {steps.length}</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
