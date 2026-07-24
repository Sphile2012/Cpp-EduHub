import { useParams, Link, useLocation } from "wouter";
import { useGetLesson } from "@/hooks/use-static-data";
import { useLanguage } from "@/hooks/use-language";
import { PlaygroundPanel } from "@/components/playground/playground-panel";
import { SimpleSyntaxHighlighter } from "@/components/ui/syntax-highlighter";
import { Button } from "@/components/ui/button";
import { useLocalProgress } from "@/hooks/use-local-progress";
import { 
  BookOpen, ChevronLeft, ChevronRight, CheckCircle2, 
  Lightbulb, AlertTriangle, Info, PlaySquare,
  Terminal, Bot, PanelRightClose, PanelRightOpen
} from "lucide-react";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { linkifyContent } from "@/components/concept-explorer/concept-link";
import { LoopVisualizer } from "@/components/visualizer/loop-visualizer";
import { MemoryVisualizer } from "@/components/visualizer/memory-visualizer";
import { AIChat } from "@/components/ai-tutor/ai-chat";
import type { LessonSection } from "@/data/languages/types";

export default function LessonDetail() {
  const { id } = useParams<{ id: string }>();
  const [_, setLocation] = useLocation();
  const lessonId = id || "";
  const { data: lesson, isLoading } = useGetLesson(lessonId);
  const { markLessonComplete, completedLessonIds } = useLocalProgress();
  const { languageConfig } = useLanguage();
  
  const [playgroundCode, setPlaygroundCode] = useState<string>("");
  const [showAITutor, setShowAITutor] = useState(false);

  if (isLoading || !lesson) {
    return (
      <div className="h-screen flex">
        <div className="w-1/2 p-8 border-r"><Skeleton className="w-full h-full" /></div>
        <div className="w-1/2 p-8"><Skeleton className="w-full h-full" /></div>
      </div>
    );
  }

  const isCompleted = completedLessonIds.includes(lesson.id);

  const handleMarkComplete = () => {
    markLessonComplete(lesson.id);
  };

  const loadExampleIntoPlayground = (code: string) => {
    setPlaygroundCode(code);
  };

  const sections: LessonSection[] = Array.isArray(lesson.content)
    ? lesson.content
    : [{ type: 'text', body: String(lesson.content) }];

  return (
    <div className="h-screen flex flex-col md:flex-row overflow-hidden bg-background">
      {/* Left Panel: Content */}
      <div className={`w-full flex flex-col h-full border-r overflow-hidden bg-card/30 transition-all duration-300 ${
        showAITutor ? 'md:w-[40%]' : 'md:w-[55%]'
      }`}>
        {/* Sticky Header */}
        <div className="h-16 border-b bg-background flex items-center justify-between px-6 flex-shrink-0 z-10 sticky top-0">
          <div className="flex items-center gap-4">
            <Link href="/lessons" className="text-muted-foreground hover:text-foreground">
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm text-primary font-bold">L{lesson.order}</span>
              <h1 className="font-bold font-handwriting text-xl truncate max-w-[200px] sm:max-w-xs">{lesson.title}</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isCompleted && (
              <div className="flex items-center gap-1.5 text-green-500 text-sm font-medium">
                <CheckCircle2 className="w-4 h-4" /> <span className="hidden sm:inline">Completed</span>
              </div>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAITutor(!showAITutor)}
              className="gap-2"
            >
              <Bot className="w-4 h-4" />
              {showAITutor ? <PanelRightClose className="w-4 h-4" /> : <PanelRightOpen className="w-4 h-4" />}
              <span className="hidden lg:inline">{showAITutor ? 'Hide' : 'Ask'} AI Tutor</span>
            </Button>
          </div>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 pb-24 scroll-smooth">
          <div className="max-w-2xl mx-auto space-y-10">
            {/* Lesson Intro */}
            <div className="space-y-4">
              <p className="text-xl text-muted-foreground leading-relaxed">
                {lesson.description} <span className="text-sm text-primary">({languageConfig?.displayName || 'selected language'})</span>
              </p>
            </div>

            {/* Lesson Sections */}
            {sections.map((section, idx) => (
              <div key={idx} className="space-y-4">
                {section.heading && (
                  <h2 className="text-2xl font-bold font-handwriting text-primary border-b pb-2 mt-8">
                    {section.heading}
                  </h2>
                )}
                
                {section.type === 'text' && (
                  <div className="prose prose-invert max-w-none text-foreground leading-relaxed" 
                       dangerouslySetInnerHTML={{ __html: linkifyContent(section.body.replace(/\n/g, '<br/>')) }} />
                )}
                
                {section.type === 'code' && section.code && (
                  <div className="my-6">
                    <SimpleSyntaxHighlighter code={section.code} />
                    <p className="mt-2 text-sm text-muted-foreground italic">{section.body}</p>
                  </div>
                )}
                
                {(section.type === 'note' || section.type === 'tip' || section.type === 'warning') && (
                  <div className={`p-4 rounded-lg border my-6 flex gap-4 ${
                    section.type === 'warning' ? 'bg-destructive/10 border-destructive/30 text-destructive-foreground' :
                    section.type === 'tip' ? 'bg-green-500/10 border-green-500/30 text-green-100' :
                    'bg-accent/10 border-accent/30 text-accent-foreground'
                  }`}>
                    <div className="mt-0.5">
                      {section.type === 'warning' && <AlertTriangle className="w-5 h-5 text-destructive" />}
                      {section.type === 'tip' && <Lightbulb className="w-5 h-5 text-green-500" />}
                      {section.type === 'note' && <Info className="w-5 h-5 text-accent" />}
                    </div>
                    <p className="text-sm leading-relaxed">{section.body}</p>
                  </div>
                )}
              </div>
            ))}

            {/* Code Examples Library */}
            {lesson.codeExamples.length > 0 && (
              <div className="mt-12 pt-8 border-t space-y-6">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <PlaySquare className="w-5 h-5 text-primary" /> Interactive Examples
                </h3>
                <div className="grid gap-4">
                  {lesson.codeExamples.map((ex, i) => (
                    <div key={i} className="bg-background border rounded-lg overflow-hidden group">
                      <div className="px-4 py-3 border-b bg-card/50 flex justify-between items-center">
                        <h4 className="font-semibold">{ex.title}</h4>
                        {ex.runnable && (
                          <Button 
                            variant="secondary" 
                            size="sm" 
                            className="h-8 gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => loadExampleIntoPlayground(ex.code)}
                          >
                            <Terminal className="w-3 h-3" /> Load in Editor
                          </Button>
                        )}
                      </div>
                      <div className="p-4 text-sm text-muted-foreground border-b border-border/50">
                        {ex.explanation}
                      </div>
                      <div className="p-0 bg-black/60">
                        <SimpleSyntaxHighlighter code={ex.code} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Interactive Visualizers - Show for specific lessons */}
            {(lesson.id.includes('loop') || lesson.title.toLowerCase().includes('loop')) && (
              <div className="mt-12 pt-8 border-t space-y-6">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  🔄 Loop Visualizer
                </h3>
                <p className="text-muted-foreground">
                  Watch how loops execute step by step. Use the controls to play, pause, and step through the iterations.
                </p>
                <LoopVisualizer 
                  code="for(int i = 0; i < 5; i++) {
    cout << i << endl;
}"
                  title="For Loop Example"
                />
              </div>
            )}

            {(lesson.id.includes('pointer') || lesson.title.toLowerCase().includes('pointer') || 
              lesson.title.toLowerCase().includes('memory')) && (
              <div className="mt-12 pt-8 border-t space-y-6">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  💾 Memory Visualizer
                </h3>
                <p className="text-muted-foreground">
                  See how pointers work in memory. Watch how variables are stored and how pointers reference them.
                </p>
                <div className="space-y-6">
                  {/* Example 1: Basic Pointer */}
                  <div>
                    <h4 className="font-semibold mb-3">Example: Basic Pointer</h4>
                    <MemoryVisualizer
                      cells={[
                        { 
                          address: '0x1000', 
                          name: 'age', 
                          value: '25', 
                          type: 'variable' as const,
                          region: 'stack' as const
                        },
                        { 
                          address: '0x2000', 
                          name: 'ptr', 
                          value: '0x1000', 
                          type: 'pointer' as const,
                          pointsTo: '0x1000',
                          region: 'stack' as const
                        }
                      ]}
                      title="int* ptr = &age"
                    />
                  </div>

                  {/* Example 2: Multiple Pointers */}
                  <div>
                    <h4 className="font-semibold mb-3">Example: Pointer Chain</h4>
                    <MemoryVisualizer
                      cells={[
                        { 
                          address: '0x1000', 
                          name: 'value', 
                          value: '42', 
                          type: 'variable' as const,
                          region: 'stack' as const
                        },
                        { 
                          address: '0x2000', 
                          name: 'ptr1', 
                          value: '0x1000', 
                          type: 'pointer' as const,
                          pointsTo: '0x1000',
                          region: 'stack' as const
                        },
                        { 
                          address: '0x3000', 
                          name: 'ptr2', 
                          value: '0x2000', 
                          type: 'pointer' as const,
                          pointsTo: '0x2000',
                          region: 'stack' as const
                        }
                      ]}
                      title="int** ptr2 = &ptr1"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Key Points Summary */}
            {(lesson.keyPoints?.length ?? 0) > 0 && (
              <div className="mt-12 p-6 bg-card border rounded-xl">
                <h3 className="font-handwriting text-xl font-bold mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" /> Key Takeaways
                </h3>
                <ul className="space-y-2">
                  {lesson.keyPoints?.map((point, i) => (
                    <li key={i} className="flex gap-3 text-muted-foreground">
                      <span className="text-primary mt-1">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Footer Actions */}
            <div className="mt-16 pt-8 border-t flex flex-col sm:flex-row gap-4 items-center justify-between">
              {!isCompleted ? (
                <Button onClick={handleMarkComplete} size="lg" className="w-full sm:w-auto gap-2">
                  <CheckCircle2 className="w-5 h-5" /> Mark Lesson Complete
                </Button>
              ) : (
                <Button variant="outline" size="lg" disabled className="w-full sm:w-auto text-green-500 border-green-500/30">
                  <CheckCircle2 className="w-5 h-5" /> Completed
                </Button>
              )}
              
              <div className="flex gap-2 w-full sm:w-auto">
                <Button 
                  variant="default" 
                  size="lg" 
                  className="w-full sm:w-auto"
                  onClick={() => setLocation(`/quiz/${lesson.id}`)}
                >
                  Take Quiz
                </Button>
                
                {lesson.nextLessonId && (
                  <Button variant="outline" size="lg" asChild>
                    <Link href={`/lessons/${lesson.nextLessonId}`}>
                      Next <ChevronRight className="w-4 h-4 ml-1" />
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Panel: AI Tutor (Collapsible) */}
      {showAITutor && (
        <div className="hidden md:block md:w-[25%] h-full border-r bg-background/50 p-4">
          <AIChat
            lessonContext={{
              lessonId: lesson.id,
              lessonTitle: lesson.title,
              currentTopic: lesson.keyPoints?.[0] ?? lesson.title
            }}
            codeContext={playgroundCode}
            onInsertCode={(code) => setPlaygroundCode(code)}
          />
        </div>
      )}

      {/* Right Panel: Playground */}
      <div className={`hidden md:block h-full p-4 bg-[#111] transition-all duration-300 ${
        showAITutor ? 'md:w-[35%]' : 'md:w-[45%]'
      }`}>
        <PlaygroundPanel initialCode={playgroundCode || lesson.codeExamples?.[0]?.code || ""} />
      </div>
    </div>
  );
}
