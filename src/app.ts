import bodyParser from "body-parser";
import cors from "cors";
import express from "express";

import { env } from "./env";
import { router } from "./routes";

class App {
  public express: express.Application;

  constructor() {
    this.express = express();
    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    console.log("[DEBUG] initializing middlewares");
    this.express.use(
      cors({
        origin:
          env.NODE_ENV === "dev"
            ? ["http://localhost:3000"]
            : ["https://dashboard.leonardo-reis.com"],
      }),
    );
    this.express.use(express.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use(bodyParser.json());
  }

  private routes(): void {
    console.log("[DEBUG] initializing routes");
    this.express.use(router);
  }
}

export default new App().express;
