import { LoginController } from "./login.controller";
import { LoginUseCase } from "./login.use-case";
import { UserRepository } from "../../../user/repositories/user.repository";

const userRepository = new UserRepository();
const loginUseCase = new LoginUseCase(userRepository);
const loginController = new LoginController(loginUseCase);

export { loginController };
