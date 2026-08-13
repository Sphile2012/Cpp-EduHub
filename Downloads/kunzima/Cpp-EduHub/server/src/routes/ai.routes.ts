/**
 * Infinity Code - AI Assistant Routes
 * Handles AI-powered coding assistant, explanations, hints, and code review
 */

import { Router, Response, NextFunction } from 'express';
import { eq, desc } from 'drizzle-orm';
import { z } from 'zod';
import { db } from '../db/index.js';
import { aiConversations, aiMessages } from '../db/schema/index.js';
import { AppError } from '../middleware/errorHandler.js';
import { authenticate, AuthRequest } from '../middleware/auth.js';

const router = Router();

router.use(authenticate);

/**
 * GET /api/ai/conversations
 * List user's AI conversations
 */
router.get('/conversations', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    if (!userId) throw new AppError('Not authenticated', 401);

    const conversations = await db.query.aiConversations.findMany({
      where: eq(aiConversations.userId, userId),
      orderBy: [desc(aiConversations.updatedAt)],
    });

    res.json(conversations);
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/ai/conversations
 * Create a new AI conversation
 */
router.post('/conversations', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    if (!userId) throw new AppError('Not authenticated', 401);

    const { title, context } = z.object({
      title: z.string().optional(),
      context: z.any().optional(),
    }).parse(req.body);

    const [conversation] = await db.insert(aiConversations).values({
      userId,
      title: title || 'New Conversation',
      context,
    }).returning();

    res.status(201).json(conversation);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return next(new AppError(error.errors[0].message, 400));
    }
    next(error);
  }
});

/**
 * GET /api/ai/conversations/:id/messages
 * Get messages in a conversation
 */
router.get('/conversations/:id/messages', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;
    if (!userId) throw new AppError('Not authenticated', 401);

    // Verify conversation belongs to user
    const conversation = await db.query.aiConversations.findFirst({
      where: eq(aiConversations.id, id),
    });

    if (!conversation || conversation.userId !== userId) {
      throw new AppError('Conversation not found', 404);
    }

    const messages = await db.query.aiMessages.findMany({
      where: eq(aiMessages.conversationId, id),
      orderBy: [aiMessages.createdAt],
    });

    res.json(messages);
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/ai/chat
 * Send a message to the AI assistant and get a response
 */
router.post('/chat', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    if (!userId) throw new AppError('Not authenticated', 401);

    const { conversationId, message, context, mode = 'explain' } = z.object({
      conversationId: z.string().uuid().optional(),
      message: z.string().min(1),
      context: z.any().optional(),
      mode: z.enum(['explain', 'hint', 'review', 'debug', 'general']).default('explain'),
    }).parse(req.body);

    // Create conversation if not provided
    let convId = conversationId;
    if (!convId) {
      const [conv] = await db.insert(aiConversations).values({
        userId,
        title: message.slice(0, 50),
        context,
      }).returning();
      convId = conv.id;
    }

    // Save user message
    await db.insert(aiMessages).values({
      conversationId: convId,
      role: 'user',
      content: message,
    });

    // Generate AI response based on mode
    const aiResponse = generateAIResponse(message, mode, context);

    // Save AI message
    await db.insert(aiMessages).values({
      conversationId: convId,
      role: 'assistant',
      content: aiResponse,
      model: 'infinity-ai-v1',
    });

    // Update conversation timestamp
    await db.update(aiConversations)
      .set({ updatedAt: new Date() })
      .where(eq(aiConversations.id, convId));

    res.json({
      conversationId: convId,
      response: aiResponse,
      mode,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return next(new AppError(error.errors[0].message, 400));
    }
    next(error);
  }
});

/**
 * POST /api/ai/explain
 * Explain a code concept or snippet
 */
router.post('/explain', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    if (!userId) throw new AppError('Not authenticated', 401);

    const { code, concept, language } = z.object({
      code: z.string().optional(),
      concept: z.string().min(1),
      language: z.string().default('cpp'),
    }).parse(req.body);

    const explanation = generateExplanation(concept, code, language);

    res.json({ explanation, language });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return next(new AppError(error.errors[0].message, 400));
    }
    next(error);
  }
});

/**
 * POST /api/ai/review
 * Review user's code and provide feedback
 */
router.post('/review', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    if (!userId) throw new AppError('Not authenticated', 401);

    const { code, language } = z.object({
      code: z.string().min(1),
      language: z.string().default('cpp'),
    }).parse(req.body);

    const review = generateCodeReview(code, language);

    res.json({ review, language });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return next(new AppError(error.errors[0].message, 400));
    }
    next(error);
  }
});

// ============================================
// AI Response Helpers (placeholder implementations)
// In production, these would call an LLM API (OpenAI, Anthropic, etc.)
// ============================================

function generateAIResponse(message: string, mode: string, _context: any): string {
  const modePrompts: Record<string, string> = {
    explain: "I'll help you understand this concept. Let me break it down step by step.\n\n",
    hint: "Here's a hint to guide you in the right direction without giving away the answer:\n\n",
    review: "Let me review your code and provide feedback:\n\n",
    debug: "Let me help you identify and fix the error in your code:\n\n",
    general: '',
  };

  const prefix = modePrompts[mode] || '';

  // Simple keyword-based responses as a placeholder
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes('variable')) {
    return `${prefix}A **variable** is a named storage location in memory that holds a value. In C++, you declare a variable by specifying its type followed by a name:\n\n\`\`\`cpp\nint age = 25;  // integer variable\ndouble price = 19.99;  // floating-point variable\nstring name = "Alice";  // string variable\n\`\`\`\n\nVariables can be modified (unless declared as \`const\`), and their type determines what kind of data they can store.`;
  }

  if (lowerMessage.includes('loop') || lowerMessage.includes('for') || lowerMessage.includes('while')) {
    return `${prefix}**Loops** allow you to repeat a block of code multiple times. C++ has three main types:\n\n1. **for loop** - when you know how many times to repeat:\n\`\`\`cpp\nfor (int i = 0; i < 5; i++) {\n    cout << i;\n}\n\`\`\`\n\n2. **while loop** - repeats while a condition is true:\n\`\`\`cpp\nwhile (count < 10) {\n    count++;\n}\n\`\`\`\n\n3. **do-while loop** - runs at least once:\n\`\`\`cpp\ndo {\n    // code\n} while (condition);\n\`\`\``;
  }

  if (lowerMessage.includes('function')) {
    return `${prefix}A **function** is a reusable block of code that performs a specific task. In C++:\n\n\`\`\`cpp\n// Function declaration\nint add(int a, int b) {\n    return a + b;\n}\n\n// Calling the function\nint result = add(5, 3);  // result = 8\n\`\`\`\n\nFunctions help organize code, avoid repetition, and make programs easier to maintain.`;
  }

  if (lowerMessage.includes('pointer')) {
    return `${prefix}A **pointer** is a variable that stores the memory address of another variable. In C++:\n\n\`\`\`cpp\nint num = 42;\nint* ptr = &num;  // ptr stores the address of num\n\ncout << *ptr;  // Dereference: prints 42\ncout << ptr;   // Prints the memory address\n\`\`\`\n\nPointers are powerful but require careful management to avoid memory issues.`;
  }

  return `${prefix}I understand you're asking about: "${message}". Let me help you with that. Could you provide more context about what you're trying to achieve? I can explain concepts, review your code, provide hints for exercises, or help debug issues.`;
}

function generateExplanation(concept: string, code?: string, language: string = 'cpp'): string {
  let explanation = `## ${concept}\n\n`;

  if (code) {
    explanation += `Here's an explanation of the code you provided:\n\n`;
    explanation += '```' + language + '\n' + code + '\n```\n\n';
    explanation += 'This code demonstrates the concept of ' + concept + '. ';
    explanation += 'The key points to understand are how the different parts work together to achieve the desired result.\n\n';
  } else {
    explanation += `${concept} is an important concept in ${language} programming. `;
    explanation += 'Understanding this will help you write more effective and efficient code.\n\n';
  }

  explanation += '### Key Takeaways:\n';
  explanation += '1. Understand the syntax and structure\n';
  explanation += '2. Practice with simple examples\n';
  explanation += '3. Apply the concept in real scenarios\n';

  return explanation;
}

function generateCodeReview(code: string, _language: string): string {
  let review = '## Code Review\n\n';

  // Simple checks for common issues
  const issues: string[] = [];
  const positives: string[] = [];

  if (code.includes('using namespace std;')) {
    issues.push('⚠️ Avoid `using namespace std;` in header files or large projects - it can cause naming conflicts.');
  }

  if (!code.includes(';') && code.length > 10) {
    issues.push('⚠️ Missing semicolons detected - ensure each statement ends with a semicolon.');
  }

  if (code.includes('int main()')) {
    positives.push('✅ Properly defined main function.');
  }

  if (code.includes('return 0;')) {
    positives.push('✅ Good practice - returning 0 from main indicates successful execution.');
  }

  if (code.includes('//') || code.includes('/*')) {
    positives.push('✅ Code includes comments - great for readability!');
  } else {
    issues.push('💡 Consider adding comments to explain your logic.');
  }

  if (positives.length > 0) {
    review += '### Strengths:\n' + positives.join('\n') + '\n\n';
  }

  if (issues.length > 0) {
    review += '### Areas for Improvement:\n' + issues.join('\n') + '\n\n';
  } else {
    review += '### Areas for Improvement:\nNo major issues found. Your code looks clean!\n\n';
  }

  review += '### Overall:\nThe code is functional. Keep practicing and refining your style!';

  return review;
}

export default router;