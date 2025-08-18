import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignUpDTO } from './dto/sign-up.dto';
import { SignInDTO } from './dto/sign-in.dto';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly databaseService: DatabaseService) {}

  async signUp(signUpDTO: SignUpDTO) {
    const { email, username, password } = signUpDTO;
    const existingUser = await this.databaseService.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      throw new BadRequestException(
        'User with this email is already signed up',
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.databaseService.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    return { username, email };
  }

  async signIn(signInDTO: SignInDTO, session: any) {
    const user = await this.databaseService.user.findUnique({
      where: {
        email: signInDTO.email,
      },
    });

    if (!user || !(await bcrypt.compare(signInDTO.password, user?.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    session.user = { id: user.id, email: user.email };
    return { username: user.username, email: user.email };
  }

  async me(session) {
    if (!session.user) {
      throw new UnauthorizedException();
    }

    const user = await this.databaseService.user.findUnique({
      where: {
        id: session.user.id,
      },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const { password, ...result } = user;
    return result;
  }

  async logout(session) {
    session.destroy((err) => {
      if (err) throw new InternalServerErrorException();
    });
    return 'Logged out succesfully';
  }
}
