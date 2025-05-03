"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUseCase = void 0;
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../../../../env");
const bad_request_exception_1 = require("../../../../erros/bad-request.exception");
class LoginUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    execute(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findByEmail(data.email);
            if (!user) {
                throw new bad_request_exception_1.BadRequestException("Invalid email or password");
            }
            const isPasswordValid = yield (0, bcrypt_1.compare)(data.password, user.hashedPassword);
            if (!isPasswordValid) {
                throw new bad_request_exception_1.BadRequestException("Invalid email or password");
            }
            const token = jsonwebtoken_1.default.sign({ userId: user.id }, env_1.env.JWT_SECRET);
            return token;
        });
    }
}
exports.LoginUseCase = LoginUseCase;
