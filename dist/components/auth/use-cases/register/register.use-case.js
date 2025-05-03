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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterUseCase = void 0;
const bcrypt_1 = require("bcrypt");
const bad_request_exception_1 = require("../../../../erros/bad-request.exception");
class RegisterUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    execute(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const userAlreadyExists = yield this.userRepository.findByEmail(data.email);
            if (userAlreadyExists) {
                throw new bad_request_exception_1.BadRequestException("User already exists");
            }
            const hashedPassword = yield (0, bcrypt_1.hash)(data.password, 10);
            const userCreated = yield this.userRepository.create(Object.assign(Object.assign({}, data), { hashedPassword }));
            return userCreated.id;
        });
    }
}
exports.RegisterUseCase = RegisterUseCase;
