"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalServerErrorException = void 0;
class InternalServerErrorException extends Error {
    constructor(message) {
        super(message || "Internal Server Error");
    }
}
exports.InternalServerErrorException = InternalServerErrorException;
