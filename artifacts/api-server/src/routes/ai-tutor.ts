import { Router } from 'express';
import { aiService } from '../services/ai-service.js';

const router = Router();

// Chat with AI tutor
router.post('/chat', async (req, res) => {
  try {
    const { messages, context } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    const response = await aiService.chat(messages, context);

    return res.json({
      response,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('AI Chat Error:', error);
    return res.status(500).json({
      error: 'Failed to get AI response',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Explain a concept
router.post('/explain', async (req, res) => {
  try {
    const { concept, level } = req.body;

    if (!concept) {
      return res.status(400).json({ error: 'Concept is required' });
    }

    const explanation = await aiService.explainConcept(concept, level || 'simple');

    return res.json({
      concept,
      explanation,
      level: level || 'simple'
    });
  } catch (error) {
    console.error('AI Explain Error:', error);
    return res.status(500).json({ error: 'Failed to explain concept' });
  }
});

// Generate code example
router.post('/code-example', async (req, res) => {
  try {
    const { concept, difficulty } = req.body;

    if (!concept) {
      return res.status(400).json({ error: 'Concept is required' });
    }

    const example = await aiService.generateCodeExample(concept, difficulty || 'easy');

    return res.json({
      concept,
      example,
      difficulty: difficulty || 'easy'
    });
  } catch (error) {
    console.error('AI Code Example Error:', error);
    return res.status(500).json({ error: 'Failed to generate code example' });
  }
});

// Review code
router.post('/review-code', async (req, res) => {
  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({ error: 'Code is required' });
    }

    const review = await aiService.reviewCode(code);

    return res.json(review);
  } catch (error) {
    console.error('AI Code Review Error:', error);
    return res.status(500).json({ error: 'Failed to review code' });
  }
});

// Generate study plan
router.post('/study-plan', async (req, res) => {
  try {
    const { goal, currentLevel } = req.body;

    if (!goal) {
      return res.status(400).json({ error: 'Goal is required' });
    }

    const plan = await aiService.generateStudyPlan(
      goal,
      currentLevel || 'beginner'
    );

    return res.json(plan);
  } catch (error) {
    console.error('AI Study Plan Error:', error);
    return res.status(500).json({ error: 'Failed to generate study plan' });
  }
});

// Generate exercise
router.post('/exercise', async (req, res) => {
  try {
    const { topic, difficulty, type } = req.body;

    if (!topic) {
      return res.status(400).json({ error: 'Topic is required' });
    }

    const exercise = await aiService.generateExercise(
      topic,
      difficulty || 'medium',
      type || 'coding'
    );

    return res.json(exercise);
  } catch (error) {
    console.error('AI Exercise Error:', error);
    return res.status(500).json({ error: 'Failed to generate exercise' });
  }
});

// Debug help
router.post('/debug', async (req, res) => {
  try {
    const { code, error } = req.body;

    if (!code || !error) {
      return res.status(400).json({ error: 'Code and error are required' });
    }

    const help = await aiService.debugCode(code, error);

    return res.json({
      help,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('AI Debug Error:', error);
    return res.status(500).json({ error: 'Failed to debug code' });
  }
});

export default router;
