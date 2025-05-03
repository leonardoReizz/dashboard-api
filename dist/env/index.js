"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
require("dotenv/config");
const zod_1 = require("zod");
const envScheme = zod_1.z.object({
    NODE_ENV: zod_1.z.string(),
    JWT_SECRET: zod_1.z.string(),
    DATABASE_URL: zod_1.z.string(),
    PORT: zod_1.z.coerce.number().default(5000).optional(),
});
const _env = envScheme.safeParse(process.env);
if (_env.success === false) {
    console.error("Invalid Enviroments Variables", _env.error.format());
    throw new Error("Invalid Enviroments Variables");
}
exports.env = _env.data;
