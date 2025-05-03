import { Router } from "express";

import { fetchPCUsageController } from "../components/pc-usage/use-cases/fetch-pc-usage";

const pcUsageRouter = Router();

pcUsageRouter.get("/", async (request, response, next) => {
  fetchPCUsageController.handle(request, response, next);
});

export { pcUsageRouter };
