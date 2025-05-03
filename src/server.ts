/* eslint-disable @typescript-eslint/no-unused-vars */
import dotenv from "dotenv";
import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";

import app from "./app";
import { env } from "./env";
import { BadRequestException } from "./erros/bad-request.exception";
import { InternalServerErrorException } from "./erros/internal-server-error.exception";
import { NotFoundException } from "./erros/not-found.exception";
import { UnauthorizedException } from "./erros/unauthorized.exception";

dotenv.config();

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof ZodError) {
    res.status(400).json({
      message: "Validation error.",
      issues: err.format(),
    });
    return;
  }

  if (err instanceof UnauthorizedException) {
    res.status(401).json({
      message: err.message,
    });
    return;
  }

  if (err instanceof BadRequestException) {
    res.status(400).json({
      message: err.message,
    });
    return;
  }

  if (err instanceof NotFoundException) {
    res.status(404).json({
      message: err.message,
    });
    return;
  }

  if (err instanceof InternalServerErrorException) {
    res.status(500).json({
      message: err.message,
    });
    return;
  }

  res.status(500).json({ message: err.message });
};

app.use(errorHandler);

app.listen(env.PORT, () => {
  console.log(`[DEBUG] Express connected, port: ${env.PORT}`);
});

export { app };
