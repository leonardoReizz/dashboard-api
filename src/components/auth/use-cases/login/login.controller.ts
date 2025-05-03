import { NextFunction, Request, Response } from "express";
import { z } from "zod";

import { LoginUseCase } from "./login.use-case";

export class LoginController {
  constructor(private loginUseCase: LoginUseCase) {}

  async handle(request: Request, response: Response, next: NextFunction) {
    const schema = z.object({
      email: z.string().email(),
      password: z.string(),
    });

    try {
      const data = schema.parse(request.body);
      const token = await this.loginUseCase.execute(data);

      return response.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  }
}
