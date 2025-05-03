import { NextFunction, Request, Response, Router } from "express";

import { loginController } from "../components/auth/use-cases/login";
import { registerController } from "../components/auth/use-cases/register";

const authRouter = Router();

authRouter.post(
  "/login",
  async (request: Request, response: Response, next: NextFunction) => {
    loginController.handle(request, response, next);
  },
);

authRouter.post(
  "/register",
  async (request: Request, response: Response, next: NextFunction) => {
    registerController.handle(request, response, next);
  },
);

export { authRouter };
