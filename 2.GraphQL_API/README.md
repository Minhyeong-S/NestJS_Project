## [NestJS] REST API => GraphQL API 로 마이그레이션

(DB는 array를 이용한 fake DB)

### podcast/podcasts.resolver.ts

PodcastsController --> PodcastsResolver

### 변경한 API

GET /podcasts <br>
POST /podcasts <br>
GET /podcasts/:id <br>
PATCH /podcasts/:id <br>
DELETE /podcasts/:id <br>
GET /podcasts/:id/episodes <br>
POST /podcasts/:id/episodes <br>
PATCH /podcasts/:id/episodes/:episodeId <br>
DELETE /podcasts/:id/episodes/:episodeId <br>
