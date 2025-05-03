import { compare } from "bcrypt";
import jwt from "jsonwebtoken";

import { LoginDTO } from "./login.dto";
import { env } from "../../../../env";
import { BadRequestException } from "../../../../erros/bad-request.exception";
import { UserRepository } from "../../../user/repositories/user.repository";

export class LoginUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(data: LoginDTO): Promise<string> {
    const user = await this.userRepository.findByEmail(data.email);

    if (!user) {
      throw new BadRequestException("Invalid email or password");
    }

    const isPasswordValid = await compare(data.password, user.hashedPassword);

    if (!isPasswordValid) {
      throw new BadRequestException("Invalid email or password");
    }

    const token = jwt.sign({ userId: user.id }, env.JWT_SECRET);
    return token;
  }
}
