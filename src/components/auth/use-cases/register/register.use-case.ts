import { hash } from "bcrypt";

import { RegisterDTO } from "./register.dto";
import { BadRequestException } from "../../../../erros/bad-request.exception";
import { UserRepository } from "../../../user/repositories/user.repository";

export class RegisterUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ password, ...data }: RegisterDTO): Promise<number> {
    const userAlreadyExists = await this.userRepository.findByEmail(data.email);

    if (userAlreadyExists) {
      throw new BadRequestException("User already exists");
    }

    const hashedPassword = await hash(password, 10);

    const userCreated = await this.userRepository.create({
      ...data,
      hashedPassword,
    });

    return userCreated.id;
  }
}
