import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Bot, User, Loader2, Code, BookOpen, Lightbulb, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  type?: 'explanation' | 'code' | 'hint' | 'error';
}

interface AIChatProps {
  lessonContext?: {
    lessonId: string;
    lessonTitle: string;
    currentTopic?: string;
  };
  codeContext?: string;
  onInsertCode?: (code: string) => void;
}

export function AIChat({ lessonContext, codeContext, onInsertCode }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi! I'm your C++ AI tutor. I can help you:\n\n• Understand concepts with simple explanations\n• Debug your code and explain errors\n• Generate practice examples\n• Give hints without spoiling solutions\n• Review your code for improvements\n\nWhat would you like to learn about?",
      timestamp: new Date(),
      type: 'explanation'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // TODO: Replace with actual AI API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const response = generateMockResponse(input, lessonContext, codeContext);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.content,
        timestamp: new Date(),
        type: response.type
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('AI Error:', error);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I apologize, I'm having trouble processing that. Could you rephrase your question?",
        timestamp: new Date(),
        type: 'error'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickPrompts = [
    { text: "Explain pointers", icon: Lightbulb },
    { text: "Show me an example", icon: Code },
    { text: "What's the difference?", icon: BookOpen },
    { text: "Fix my code", icon: AlertCircle }
  ];

  return (
    <Card className="flex flex-col h-[600px]">
      {/* Header */}
      <div className="p-4 border-b bg-primary/5">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary rounded-lg">
            <Bot className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h3 className="font-semibold">AI Tutor</h3>
            {lessonContext && (
              <p className="text-xs text-muted-foreground">
                Helping with: {lessonContext.lessonTitle}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex gap-3",
                message.role === 'user' ? "justify-end" : "justify-start"
              )}
            >
              {message.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-primary" />
                </div>
              )}
              
              <div
                className={cn(
                  "max-w-[80%] rounded-lg p-3",
                  message.role === 'user'
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                )}
              >
                {message.type && message.role === 'assistant' && (
                  <div className="flex items-center gap-2 mb-2 text-xs text-muted-foreground">
                    {message.type === 'code' && <Code className="w-3 h-3" />}
                    {message.type === 'hint' && <Lightbulb className="w-3 h-3" />}
                    {message.type === 'error' && <AlertCircle className="w-3 h-3" />}
                    <span className="capitalize">{message.type}</span>
                  </div>
                )}
                <p className="whitespace-pre-wrap text-sm">{message.content}</p>
                
                {message.type === 'code' && onInsertCode && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-2"
                    onClick={() => {
                      const codeMatch = message.content.match(/```cpp\n([\s\S]*?)\n```/);
                      if (codeMatch) onInsertCode(codeMatch[1]);
                    }}
                  >
                    Insert into Editor
                  </Button>
                )}
              </div>

              {message.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}
          
          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Bot className="w-4 h-4 text-primary" />
              </div>
              <div className="bg-muted rounded-lg p-3">
                <Loader2 className="w-4 h-4 animate-spin" />
              </div>
            </div>
          )}
          
          <div ref={scrollRef} />
        </div>
      </ScrollArea>

      {/* Quick Prompts */}
      {messages.length === 1 && (
        <div className="px-4 pb-2">
          <div className="flex flex-wrap gap-2">
            {quickPrompts.map((prompt) => (
              <Button
                key={prompt.text}
                variant="outline"
                size="sm"
                onClick={() => setInput(prompt.text)}
                className="gap-1"
              >
                <prompt.icon className="w-3 h-3" />
                {prompt.text}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask me anything about C++..."
            disabled={isLoading}
          />
          <Button onClick={handleSend} disabled={isLoading || !input.trim()}>
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </Button>
        </div>
      </div>
    </Card>
  );
}

// Mock AI response generator (replace with real API)
function generateMockResponse(
  input: string, 
  lessonContext?: AIChatProps['lessonContext'],
  codeContext?: string
): { content: string; type: Message['type'] } {
  const lowerInput = input.toLowerCase();

  if (lowerInput.includes('pointer')) {
    return {
      content: `Great question about pointers! Let me explain simply:

**What is a pointer?**
A pointer is a variable that stores the memory address of another variable.

Think of it like this: Your house (the variable) has an address. A pointer is like writing down that address on a piece of paper.

**Syntax:**
\`\`\`cpp
int age = 25;
int* ptr = &age;  // ptr stores address of age
cout << *ptr;     // Access value: 25
*ptr = 30;        // Change age through pointer
\`\`\`

**Why use them?**
• Dynamic memory allocation
• Pass large data efficiently
• Create complex data structures
• Direct memory control

Would you like me to show more examples or explain any specific aspect?`,
      type: 'explanation'
    };
  }

  if (lowerInput.includes('example') || lowerInput.includes('show')) {
    return {
      content: `Here's a practical example based on ${lessonContext?.currentTopic || 'C++ basics'}:

\`\`\`cpp
#include <iostream>
using namespace std;

int main() {
    // Example demonstrating the concept
    int number = 42;
    cout << "The answer is: " << number << endl;
    return 0;
}
\`\`\`

Try running this and see what happens! Want me to explain any part?`,
      type: 'code'
    };
  }

  if (lowerInput.includes('error') || lowerInput.includes('fix') || codeContext) {
    return {
      content: `I can help debug that! Common issues I see:

✗ **Missing semicolon** - Every statement needs one
✗ **Forgot #include** - Need <iostream> for cout
✗ **Wrong type** - Check variable types match
✗ **Array out of bounds** - Index too high

Can you share the error message you're getting? Or paste your code and I'll review it!`,
      type: 'error'
    };
  }

  if (lowerInput.includes('hint')) {
    return {
      content: `Here's a hint without spoiling the solution:

💡 Think about breaking the problem into smaller steps
💡 What data structure would be most efficient here?
💡 Consider using a loop to avoid repetition

Want another hint, or ready for the full solution?`,
      type: 'hint'
    };
  }

  return {
    content: `I understand you're asking about "${input}". ${
      lessonContext 
        ? `Since you're learning ${lessonContext.lessonTitle}, let me explain in that context.`
        : 'Let me help you with that.'
    }

Could you tell me:
• What specifically would you like to know?
• Are you stuck on a concept or have code that's not working?
• Would you like an explanation, example, or hint?`,
    type: 'explanation'
  };
}
