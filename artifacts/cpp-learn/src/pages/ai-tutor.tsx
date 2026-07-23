import { useState } from 'react';
import { AIChat } from '@/components/ai-tutor/ai-chat';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Bot, Code, HelpCircle, Lightbulb, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AITutorPage() {
  const [codeInput, setCodeInput] = useState('');

  const features = [
    {
      icon: MessageSquare,
      title: 'Ask Questions',
      description: 'Get instant explanations for any C++ concept in simple terms'
    },
    {
      icon: Code,
      title: 'Code Review',
      description: 'Paste your code and get feedback on improvements and best practices'
    },
    {
      icon: HelpCircle,
      title: 'Debug Help',
      description: 'Stuck with an error? I\'ll help you understand and fix it'
    },
    {
      icon: Lightbulb,
      title: 'Smart Hints',
      description: 'Get hints that guide you without spoiling the solution'
    }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-3"
      >
        <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full text-primary font-semibold">
          <Bot className="w-5 h-5" />
          <span>AI Tutor - Your 24/7 C++ Assistant</span>
        </div>
        <h1 className="text-4xl font-bold">Learn Faster with AI Help</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Get personalized explanations, code reviews, and debugging help powered by AI. 
          No question is too simple or too complex.
        </p>
      </motion.div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((feature, idx) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card className="hover:border-primary/50 transition-all h-full">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Main Interface */}
      <Tabs defaultValue="chat" className="space-y-6">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
          <TabsTrigger value="chat">
            <MessageSquare className="w-4 h-4 mr-2" />
            Chat
          </TabsTrigger>
          <TabsTrigger value="code-review">
            <Code className="w-4 h-4 mr-2" />
            Code Review
          </TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="space-y-4">
          <AIChat />
        </TabsContent>

        <TabsContent value="code-review" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Code Input */}
            <Card>
              <CardHeader>
                <CardTitle>Your Code</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  value={codeInput}
                  onChange={(e) => setCodeInput(e.target.value)}
                  placeholder="Paste your C++ code here..."
                  className="font-mono min-h-[300px]"
                />
                <Button 
                  onClick={() => {}} 
                  className="w-full"
                  disabled={!codeInput.trim()}
                >
                  <Code className="w-4 h-4 mr-2" />
                  Review My Code
                </Button>
              </CardContent>
            </Card>

            {/* AI Response */}
            <AIChat 
              codeContext={codeInput} 
              lessonContext={{ 
                lessonId: 'code-review', 
                lessonTitle: 'Code Review Session' 
              }}
            />
          </div>
        </TabsContent>
      </Tabs>

      {/* Example Prompts */}
      <Card className="bg-muted/30">
        <CardHeader>
          <CardTitle className="text-lg">Try These Example Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              "Explain pointers in simple terms",
              "What's the difference between array and vector?",
              "How does inheritance work in C++?",
              "Why do I get segmentation fault?",
              "Show me an example of a class",
              "What are smart pointers?"
            ].map((prompt) => (
              <Button
                key={prompt}
                variant="outline"
                className="justify-start text-left h-auto py-3 px-4"
                onClick={() => {}}
              >
                <HelpCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                <span className="text-sm">{prompt}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
