import { Router, type IRouter } from "express";
import { AiChatBody } from "@workspace/api-zod";

const router: IRouter = Router();

router.post("/ai/chat", async (req, res): Promise<void> => {
  const parsed = AiChatBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { message, lessonContext } = parsed.data;

  // AI tutor is not configured — return a helpful message
  const contextNote = lessonContext
    ? `You're asking about: **${lessonContext}**\n\n`
    : "";

  const reply =
    `${contextNote}The AI tutor feature requires an OpenAI API key to be configured. ` +
    `To enable it, add your **OPENAI_API_KEY** as an environment secret in this project.\n\n` +
    `In the meantime, here are some resources to help with your question:\n` +
    `- Use the **Glossary** to explore C++ terms in depth\n` +
    `- Check the **lesson content** for detailed explanations\n` +
    `- Try the **code playground** to experiment with examples\n\n` +
    `Your question: *"${message}"*`;

  res.json({
    reply,
    suggestedFollowUps: [
      "What are the most common C++ mistakes?",
      "How do I fix a segmentation fault?",
      "When should I use pointers vs references?",
      "What is the difference between stack and heap?",
    ],
  });
});

export default router;
