import { Router, type IRouter } from "express";
import { RunCodeBody } from "@workspace/api-zod";
import { logger } from "../lib/logger";

const router: IRouter = Router();

// Piston API – free, no key required
const PISTON_URL = "https://emkc.org/api/v2/piston/execute";

router.post("/code/run", async (req, res): Promise<void> => {
  const parsed = RunCodeBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { code, stdin } = parsed.data;

  try {
    const pistonRes = await fetch(PISTON_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        language: "c++",
        version: "10.2.0",
        files: [{ name: "main.cpp", content: code }],
        stdin: stdin ?? "",
        compile_timeout: 10000,
        run_timeout: 5000,
      }),
    });

    if (!pistonRes.ok) {
      const errText = await pistonRes.text();
      req.log.warn({ status: pistonRes.status, body: errText }, "Piston API error");
      res.status(502).json({ error: "Code execution service unavailable" });
      return;
    }

    const data = (await pistonRes.json()) as {
      compile?: { stdout: string; stderr: string; code: number | null };
      run?: { stdout: string; stderr: string; code: number | null };
    };

    // Compilation error
    if (data.compile && data.compile.code !== 0) {
      res.json({
        stdout: "",
        stderr: data.compile.stderr || data.compile.stdout,
        exitCode: data.compile.code ?? 1,
        compilationError: data.compile.stderr || data.compile.stdout,
        executionTime: null,
      });
      return;
    }

    const run = data.run ?? { stdout: "", stderr: "", code: 0 };
    res.json({
      stdout: run.stdout ?? "",
      stderr: run.stderr ?? "",
      exitCode: run.code ?? 0,
      compilationError: null,
      executionTime: null,
    });
  } catch (err) {
    logger.error({ err }, "Code execution error");
    res.status(502).json({ error: "Code execution service unavailable" });
  }
});

export default router;
