// Test 는 자동 임포트가 되지 않아서 직접 입력해줌...
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from 'src/jwt/jwt.service';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

// UsersService 사용 중인 method(findOne, save, create) 에 대해 mock 함수 만들기
const mockRepository = () => ({
  findOne: jest.fn(),
  save: jest.fn(),
  create: jest.fn(),
});

// JwtService에서 사용 중인 method(sign, verify) 에 대해 mock 함수 만들기
const mockJwtService = {
  sing: jest.fn(),
  verify: jest.fn(),
};

// UsersRepository의 모든 key의 집합을 Record를 통해 하나의 타입으로 만든 후,
// Partial 옵션을 준 것. (각각의 요소의 타입은 jest.Mock)
type MockRepository<T = any> = Partial<
  Record<keyof Repository<User>, jest.Mock>
>;

// UsersService를 테스트하기 위해 이 파일에 UsersService를 만들어야 한다.
describe('usersService', () => {
  // 유저 서비스와 레포지토리를 해당 파일의 테스트에서 사용하기 위해 beforeAll 외부에 선언
  let service: UsersService;
  let usersRepository: MockRepository<User>;

  beforeAll(async () => {
    // 테스팅 모듈 만들기
    const modules = await Test.createTestingModule({
      // providers: TestingModule로 import 해야 할 것들
      providers: [
        UsersService,
        // UsersRepositoy Mocking
        {
          // TypeORM 에서 Repository를 가져오고, useValue에 Mocking한 값 지정
          provide: getRepositoryToken(User),
          useValue: mockRepository(),
        },
        // JwtService Mocking
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();
    service = modules.get<UsersService>(UsersService);
    usersRepository = modules.get(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createAccount', () => {
    const createAccountArgs = {
      email: '',
      password: '',
      role: 0,
    };

    it('should fail if user exists', async () => {
      usersRepository.findOne.mockResolvedValue({
        id: 1,
        email: 'aasadfasdfa',
      });
      const result = await service.createAccount(createAccountArgs);
      expect(result).toMatchObject({
        ok: false,
        error: 'There is a user with that email already',
      });
    });

    it("should create a new user if user doesn't exist", async () => {
      // findOne의 리턴값 "undefined"로 mocking
      usersRepository.findOne.mockResolvedValue(undefined);
      // create의 리턴값 mocking
      usersRepository.create.mockReturnValue(createAccountArgs);
      const result = await service.createAccount(createAccountArgs);
      expect(usersRepository.create).toBeCalledTimes(1);
      expect(usersRepository.create).toBeCalledWith(createAccountArgs);
      expect(usersRepository.save).toBeCalledTimes(1);
      expect(usersRepository.save).toBeCalledWith(createAccountArgs);
      expect(result).toMatchObject({ ok: true });
    });

    it('should fail if any exception occur', async () => {
      usersRepository.findOne.mockRejectedValue('findOne fail');
      usersRepository.create.mockRejectedValue('findOne fail');
      usersRepository.save.mockRejectedValue('findOne fail');
      const result = await service.createAccount(createAccountArgs);
      expect(result).toEqual({ ok: false, error: "couldn't create Account" });
    });
  });

  // 테스트할 method.
  it.todo('createAccount');
  it.todo('login');
  it.todo('findById');
  it.todo('editProfile');
});
