import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Repository } from 'typeorm';
import { CreateAccountInput } from './dtos/create-account.dto';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import { User } from './entities/user.entity';
import { JwtService } from 'src/jwt/jwt.service';
import { EditProfileInput } from './dtos/edit-profile.dto';
import { SeeProfileOutput } from './dtos/see-profile.dto';

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
      const user = await this.users.save(
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
    try {
      // 1. DB에서 해당 이메일을 가진 유저 존재 확인
      const user = await this.users.findOne({
        where: { email },
        select: ['id', 'password'],
      });
      if (!user) {
        return { ok: false, error: 'non-existent email' };
      }
      // 2. 패스워드 확인 - User Entity 의 checkPassword()
      const passwordCorrect = await user.checkPassword(password);
      if (!passwordCorrect) {
        return { ok: false, error: 'Wrong password' };
      }
      // 3. JWT token 전달
      const token = this.jwtService.sign(user.id);
      return { ok: true, token };
      //
    } catch (error) {
      console.log(error);
      return { ok: false, error: error.message };
    }
  }

  // 유저 정보 조회
  async findById(id: number): Promise<SeeProfileOutput> {
    try {
      const user = await this.users.findOne({ where: { id } });
      if (!user) throw new Error('User Not Found');
      return { ok: true, user };
    } catch (error) {
      console.log(error);
      return { ok: false, error: error.message };
    }
  }

  // 유저 정보 수정
  async editProfile(
    userId: number,
    { email, password }: EditProfileInput,
  ): Promise<CoreOutput> {
    // AuthGuards를 통과한 상태이므로 userId에 해당하는 user가 없는 경우 무시
    try {
      const user = await this.users.findOne({ where: { id: userId } });
      if (email) {
        user.email = email;
      }
      if (password) {
        user.password = password;
      }
      await this.users.save(user);
      return { ok: true };
    } catch (error) {
      console.log(error);
      return { ok: false, error: error.message };
    }
  }
}
