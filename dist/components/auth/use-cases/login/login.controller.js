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
exports.LoginController = void 0;
const zod_1 = require("zod");
const internal_server_error_exception_1 = require("../../../../erros/internal-server-error.exception");
class LoginController {
    constructor(loginUseCase) {
        this.loginUseCase = loginUseCase;
    }
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = zod_1.z.object({
                email: zod_1.z.string().email(),
                password: zod_1.z.string(),
            });
            try {
                const data = schema.parse(request.body);
                const token = yield this.loginUseCase.execute(data);
                return response.status(200).json({ token });
            }
            catch (error) {
                throw new internal_server_error_exception_1.InternalServerErrorException(error);
            }
        });
    }
}
exports.LoginController = LoginController;
