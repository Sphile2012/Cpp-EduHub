import { Router, type IRouter } from "express";
import healthRouter from "./health";
import lessonsRouter from "./lessons";
import glossaryRouter from "./glossary";
import codeRouter from "./code";
import aiRouter from "./ai";
import progressRouter from "./progress";

const router: IRouter = Router();

router.use(healthRouter);
router.use(lessonsRouter);
router.use(glossaryRouter);
router.use(codeRouter);
router.use(aiRouter);
router.use(progressRouter);

export default router;
