import { Router, type IRouter } from "express";
import { GetGlossaryTermParams } from "@workspace/api-zod";
import { getGlossaryList, getGlossaryTerm } from "../data/glossary";

const router: IRouter = Router();

router.get("/glossary", async (_req, res): Promise<void> => {
  res.json(getGlossaryList());
});

router.get("/glossary/:term", async (req, res): Promise<void> => {
  const params = GetGlossaryTermParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const term = getGlossaryTerm(params.data.term);
  if (!term) {
    res.status(404).json({ error: "Term not found" });
    return;
  }

  res.json(term);
});

export default router;
