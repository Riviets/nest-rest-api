import {
  BadRequestException,
  Injectable,
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

  async signIn(signInDTO: SignInDTO) {
    const user = await this.databaseService.user.findUnique({
      where: {
        email: signInDTO.email,
      },
    });

    if (!user || !(await bcrypt.compare(signInDTO.password, user?.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    //Add user to the session
    return user;
  }

  async me() {
    //Get the user object from session and return it
    return 'Me';
  }
}
