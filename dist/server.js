"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
const dotenv_1 = __importDefault(require("dotenv"));
const zod_1 = require("zod");
const app_1 = __importDefault(require("./app"));
exports.app = app_1.default;
const env_1 = require("./env");
const bad_request_exception_1 = require("./erros/bad-request.exception");
const internal_server_error_exception_1 = require("./erros/internal-server-error.exception");
const not_found_exception_1 = require("./erros/not-found.exception");
const unauthorized_exception_1 = require("./erros/unauthorized.exception");
dotenv_1.default.config();
const errorHandler = (err, req, res, next) => {
    if (err instanceof zod_1.ZodError) {
        res.status(400).json({
            message: "Validation error.",
            issues: err.format(),
        });
        return;
    }
    if (err instanceof unauthorized_exception_1.UnauthorizedException) {
        res.status(401).json({
            message: err.message,
        });
        return;
    }
    if (err instanceof bad_request_exception_1.BadRequestException) {
        res.status(400).json({
            message: err.message,
        });
        return;
    }
    if (err instanceof not_found_exception_1.NotFoundException) {
        res.status(404).json({
            message: err.message,
        });
        return;
    }
    if (err instanceof internal_server_error_exception_1.InternalServerErrorException) {
        res.status(500).json({
            message: err.message,
        });
        return;
    }
    res.status(500).json({ message: err.message });
};
// app.use(errorHandler);
app_1.default.listen(env_1.env.PORT, () => {
    console.log(`[DEBUG] Express connected, port: ${env_1.env.PORT}`);
});
