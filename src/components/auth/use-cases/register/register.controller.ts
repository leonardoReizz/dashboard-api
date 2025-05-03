import { NextFunction, Request, Response } from "express";
import { z } from "zod";

import { RegisterUseCase } from "./register.use-case";

export class RegisterController {
  constructor(private registerUseCase: RegisterUseCase) {}

  async handle(request: Request, response: Response, next: NextFunction) {
    const schema = z.object({
      firstName: z.string(),
      lastName: z.string(),
      email: z.string().email(),
      password: z.string(),
    });

    try {
      const data = schema.parse(request.body);
      await this.registerUseCase.execute(data);

      return response
        .status(201)
        .json({ message: "User created successfully" });
    } catch (error) {
      next(error);
    }
  }
}
