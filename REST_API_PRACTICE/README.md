## [NestJS] REST API 구현 연습

(DB는 array를 이용한 fake DB)

### 구현한 API

GET /podcasts <br>
POST /podcasts <br>
GET /podcasts/:id <br>
PATCH /podcasts/:id <br>
DELETE /podcasts/:id <br>
GET /podcasts/:id/episodes <br>
POST /podcasts/:id/episodes <br>
PATCH /podcasts/:id/episodes/:episodeId <br>
DELETE /podcasts/:id/episodes/:episodeId <br>

### 추가로 적용한 것! - Pipe, validation decorator

- entity에 `class-validator`를 적용, controller에 `ParseIntPipe`를 적용
- 파라미터로 넘어올 때 number로 입력되어도 string으로 넘어오는 값 자동으로 number로 변환
- 그런데 파라미터를 여러개 받아서 객체로 넘길 때는 적용이 안 된다.. 다른 방법을 또 찾아봐야겠다.

### 수정 (22/1/25)

- 파라미터 여러개는 각각 하나씩 받으면 되었다!!
- 파라미터에 pipe 적용, string으로 넘어오는 값을 number로 변환하여 service로 전달하도록 수정 <br>
  PATCH /podcasts/:id/episodes/:episodeId <br>
  DELETE /podcasts/:id/episodes/:episodeId <br>
