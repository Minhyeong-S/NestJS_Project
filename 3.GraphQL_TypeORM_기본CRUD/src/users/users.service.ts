import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Repository } from 'typeorm';
import { CreateAccountInput } from './dtos/create-account.dto';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import { User } from './entities/user.entity';
import { JwtService } from 'src/jwt/jwt.service';
import { EditProfileInput } from './dtos/edit-profile.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  // 회원가입
  async createAccount({
    email,
    password,
    role,
  }: CreateAccountInput): Promise<CoreOutput> {
    try {
      // 1. 이메일 중복 확인
      const exist = await this.users.findOne({ where: { email } });
      if (exist) {
        return { ok: false, error: 'There is a user with that email already' };
      }
      // 2. DB에 유저 정보 저장
      const user = this.users.save(
        this.users.create({ email, password, role }),
      );
      return { ok: true };
    } catch (error) {
      console.log(error);
      return { ok: false, error: error.message };
    }
  }

  // 로그인
  async login({ email, password }: LoginInput): Promise<LoginOutput> {
    // 1. DB에서 해당 이메일을 가진 유저 존재 확인
    const user = await this.users.findOne({
      where: { email },
      select: ['id', 'password'],
    });
    if (!user) {
      return {
        ok: false,
        error: 'non-existent email',
      };
    }
    // 2. 패스워드 확인 - User Entity 의 checkPassword()
    const passwordCorrect = await user.checkPassword(password);
    if (!passwordCorrect) {
      return {
        ok: false,
        error: 'Wrong password',
      };
    }
    // 3. JWT token 전달
    const token = this.jwtService.sign(user.id);
    return {
      ok: true,
      token,
    };
  }

  // 유저 정보 조회
  async findById(id: number): Promise<User> {
    return await this.users.findOne({
      where: { id },
      // select: ['id', 'email', 'password', 'role', 'createdAt', 'updatedAt'],
    });
  }

  // 유저 정보 수정
  async editProfile(
    userId: number,
    { email, password }: EditProfileInput,
  ): Promise<User> {
    // AuthGuards 를 통과한 상태이므로 userId에 해당하는 user는 무조건 있다고 판단
    const user = await this.findById(userId);
    if (email) {
      user.email = email;
    }
    if (password) {
      user.password = password;
    }
    return await this.users.save(user);
  }
}
