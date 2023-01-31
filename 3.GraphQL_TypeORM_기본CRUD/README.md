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
