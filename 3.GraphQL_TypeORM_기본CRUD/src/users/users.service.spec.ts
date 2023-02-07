// Test 는 자동 임포트가 되지 않아서 직접 입력해줌...
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from 'src/jwt/jwt.service';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

// UsersService 사용 중인 method(findOne, save, create) 에 대해 mock 함수 만들기
const mockRepository = {
  findOne: jest.fn(),
  save: jest.fn(),
  create: jest.fn(),
};

// JwtService에서 사용 중인 method(sign, verify) 에 대해 mock 함수 만들기
const mockJwtService = {
  sing: jest.fn(),
  verify: jest.fn(),
};

// UsersService를 테스트하기 위해 이 파일에 UsersService를 만들어야 한다.
describe('usersService', () => {
  // 유저 서비스를 해당 파일의 테스트에서 사용하기 위해 beforeAll 외부에 선언
  let service: UsersService;

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
          useValue: mockRepository,
        },
        // JwtService Mocking
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();
    service = modules.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // 테스트할 method.
  it.todo('createAccount');
  it.todo('login');
  it.todo('findById');
  it.todo('editProfile');
});
