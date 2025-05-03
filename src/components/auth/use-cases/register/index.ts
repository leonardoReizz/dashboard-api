import { RegisterController } from "./register.controller";
import { RegisterUseCase } from "./register.use-case";
import { UserRepository } from "../../../user/repositories/user.repository";

const userRepository = new UserRepository();
const registerUseCase = new RegisterUseCase(userRepository);
const registerController = new RegisterController(registerUseCase);

export { registerController };
