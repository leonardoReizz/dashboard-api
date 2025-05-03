"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedException = void 0;
class UnauthorizedException extends Error {
    constructor(message) {
        super(message || "Unauthorized");
    }
}
exports.UnauthorizedException = UnauthorizedException;
