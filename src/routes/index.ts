import { Router } from "express";

import { authRouter } from "./auth.routes";
import { pcUsageRouter } from "./pc-usage.routes";

const router = Router();

router.use("/auth", authRouter);
router.use("/pc-usage", pcUsageRouter);

export { router };
