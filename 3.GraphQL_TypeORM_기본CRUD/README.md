## [NestJS] GraphQL API 에 TypeORM 적용

(DB: PostgreSQL)

<br>
<br>

## Podcast와 Episode 관계 설정

- Podcast는 여러 개의 Episodes를 가질 수 있다.
- Episode는 무조건 하나의 Podcast 속한다.

<br>

## GraphQL API

https://www.notion.so/GraphQL-API-58b85e37b0b540128e402d90061f3bfb

### Podcast

- _모든 Podcasts 조회_
- _특정 Podcast 조회_
- _Podcast 생성_
- _Podcast 수정_
- _Podcast 삭제_

### Episode

- _모든 Episodes 조회_
- _Episode 생성_
- _Episode 수정_
- _Episode 삭제_

### User

- _회원 가입 : 비밀번호 hash화_
- _로그인 : JWT 토큰 발급 및 헤더의 토큰 통한 인증_
- _유저(본인) 프로필 조회: Guard 와 custom Decorator를 통해 token 정보로부터 유저 정보 가져오기_
- _프로필 수정 : JWT 토큰을 통해 인증된 유저만 수정 가능_

<br>

## 테스트 코드 작성

### UsersService

- users.service.spec.ts 파일 생성 및 테스트모듈 생성

- _**Unit Test**_
  - `createAccount()`
  - `login()`
  - `findById()`
  - `editProfile()`

### JwtService

- 외부 라이브러리 jsonwebtoken 에 대한 mocking

- _**Unit Test**_
  - `sign()`
  - `verify()`
