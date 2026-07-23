import OpenAI from 'openai';

export interface AIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface LearningContext {
  topic?: string;
  userLevel?: 'beginner' | 'intermediate' | 'advanced';
  previousMistakes?: string[];
  learningStyle?: 'visual' | 'reading' | 'coding' | 'interactive';
}

export class AIService {
  private openai: OpenAI;

  constructor() {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.warn('⚠️ OPENAI_API_KEY not set. AI features will not work.');
    }
    this.openai = new OpenAI({ apiKey: apiKey || 'dummy-key' });
  }

  private buildSystemPrompt(context?: LearningContext): string {
    const basePrompt = `You are an expert C++ programming tutor named uPhumeh. You are patient, encouraging, and excellent at explaining complex concepts in simple terms.`;

    if (!context) return basePrompt;

    let contextPrompt = basePrompt;

    if (context.topic) {
      contextPrompt += `\n\nCurrent topic: ${context.topic}`;
    }

    if (context.userLevel) {
      contextPrompt += `\n\nStudent level: ${context.userLevel}`;
      if (context.userLevel === 'beginner') {
        contextPrompt += `\nUse simple language, avoid jargon, and provide lots of examples.`;
      } else if (context.userLevel === 'advanced') {
        contextPrompt += `\nYou can use technical terms and discuss advanced concepts.`;
      }
    }

    if (context.learningStyle) {
      if (context.learningStyle === 'visual') {
        contextPrompt += `\n\nThis student learns best with diagrams and visual explanations. Describe visual representations when explaining concepts.`;
      } else if (context.learningStyle === 'coding') {
        contextPrompt += `\n\nThis student learns best by coding. Provide lots of code examples and hands-on exercises.`;
      }
    }

    if (context.previousMistakes && context.previousMistakes.length > 0) {
      contextPrompt += `\n\nStudent's common mistakes: ${context.previousMistakes.join(', ')}. Be aware of these patterns.`;
    }

    return contextPrompt;
  }

  async chat(messages: AIMessage[], context?: LearningContext): Promise<string> {
    try {
      if (!process.env.OPENAI_API_KEY) {
        return 'AI features are not configured. Please add your OpenAI API key to enable AI tutoring.';
      }

      const systemPrompt: AIMessage = {
        role: 'system',
        content: this.buildSystemPrompt(context)
      };

      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4o-mini', // Faster and cheaper
        messages: [systemPrompt, ...messages],
        temperature: 0.7,
        max_tokens: 2000
      });

      return completion.choices[0]?.message?.content || 'Sorry, I could not generate a response.';
    } catch (error) {
      console.error('AI Service Error:', error);
      throw new Error('Failed to get AI response');
    }
  }

  async explainConcept(concept: string, level: 'simple' | 'detailed' = 'simple'): Promise<string> {
    const prompt = level === 'simple'
      ? `Explain the C++ concept "${concept}" in very simple terms, as if teaching a 10-year-old. Use analogies and examples from everyday life.`
      : `Provide a detailed technical explanation of "${concept}" in C++. Include how it works under the hood, common use cases, best practices, and potential pitfalls.`;

    return this.chat([{ role: 'user', content: prompt }]);
  }

  async generateCodeExample(concept: string, difficulty: 'easy' | 'medium' | 'hard' = 'easy'): Promise<string> {
    const prompt = `Generate a ${difficulty} C++ code example that demonstrates "${concept}". Include:
    1. Well-commented code
    2. Explanation of what the code does
    3. Expected output
    4. Key learning points`;

    return this.chat([{ role: 'user', content: prompt }]);
  }

  async reviewCode(code: string): Promise<{ feedback: string; suggestions: string[]; score: number }> {
    const prompt = `Review this C++ code and provide:
    1. Overall feedback (2-3 sentences)
    2. 3-5 specific suggestions for improvement
    3. A score from 0-100
    
    Code:
    \`\`\`cpp
    ${code}
    \`\`\`
    
    Format your response as JSON with keys: feedback, suggestions (array), score`;

    const response = await this.chat([{ role: 'user', content: prompt }]);

    try {
      // Try to parse JSON response
      const parsed = JSON.parse(response);
      return parsed;
    } catch {
      // Fallback if not valid JSON
      return {
        feedback: response,
        suggestions: ['Keep practicing!', 'Try breaking down complex problems', 'Read more C++ documentation'],
        score: 70
      };
    }
  }

  async generateStudyPlan(goal: string, currentLevel: string): Promise<any> {
    const prompt = `Create a personalized C++ learning roadmap for a ${currentLevel} student who wants to: ${goal}.

    Generate a JSON object with:
    - title: string
    - description: string
    - estimatedWeeks: number
    - milestones: array of { title, description, topics: string[], estimatedDays: number, projects: string[] }
    
    Include 8-12 milestones with practical projects.`;

    const response = await this.chat([{ role: 'user', content: prompt }]);

    try {
      return JSON.parse(response);
    } catch {
      return {
        title: `${goal} Learning Path`,
        description: 'Custom C++ learning roadmap',
        estimatedWeeks: 12,
        milestones: []
      };
    }
  }

  async generateExercise(topic: string, difficulty: string, type: string): Promise<any> {
    const prompt = `Generate a ${difficulty} C++ exercise on "${topic}". Type: ${type}.
    
    Return JSON with:
    - question: string
    - starterCode: string (if coding problem)
    - testCases: array (if coding problem)
    - options: array (if multiple choice)
    - correctAnswer: string
    - explanation: string
    - hints: array of strings`;

    const response = await this.chat([{ role: 'user', content: prompt }]);

    try {
      return JSON.parse(response);
    } catch {
      return {
        question: `Explain ${topic}`,
        explanation: response,
        hints: []
      };
    }
  }

  async debugCode(code: string, error: string): Promise<string> {
    const prompt = `A student is getting this error in their C++ code:

Error: ${error}

Code:
\`\`\`cpp
${code}
\`\`\`

Help them:
1. Understand what the error means
2. Find the cause in their code
3. Suggest how to fix it
4. Explain how to avoid this in the future

Be encouraging and educational.`;

    return this.chat([{ role: 'user', content: prompt }]);
  }
}

// Singleton instance
export const aiService = new AIService();
