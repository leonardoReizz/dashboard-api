import { NextFunction, Request, Response } from "express";
import { z } from "zod";

import { FetchPCUsageUseCase } from "./fetch-pc-usage.use-case";

export class FetchPCUsageController {
  constructor(private fetchPCUsageUseCase: FetchPCUsageUseCase) {}

  async handle(request: Request, response: Response, next: NextFunction) {
    const schema = z.object({
      startDate: z.coerce.date(),
      endDate: z.coerce.date(),
    });

    try {
      const { startDate, endDate } = schema.parse(request.query);
      const pcUsage = await this.fetchPCUsageUseCase.execute({
        startDate,
        endDate,
      });

      return response.status(200).json(pcUsage);
    } catch (error) {
      next(error);
    }
  }
}
