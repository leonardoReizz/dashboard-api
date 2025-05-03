"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const env_1 = require("./env");
const routes_1 = require("./routes");
class App {
    constructor() {
        this.express = (0, express_1.default)();
        this.middlewares();
        this.routes();
    }
    middlewares() {
        console.log("[DEBUG] initializing middlewares");
        this.express.use((0, cors_1.default)({
            origin: env_1.env.NODE_ENV === "dev"
                ? ["http://localhost:3000"]
                : ["https://dashboard.leonardo-reis.com"],
        }));
        this.express.use(express_1.default.json());
        this.express.use(body_parser_1.default.urlencoded({ extended: false }));
        this.express.use(body_parser_1.default.json());
    }
    routes() {
        console.log("[DEBUG] initializing routes");
        this.express.use(routes_1.router);
    }
}
exports.default = new App().express;
