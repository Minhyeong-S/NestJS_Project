import { Field, ObjectType } from '@nestjs/graphql';
import { Podcast } from '../entities/podcast.entity';

@ObjectType()
export class ReturnAllPodcastsDto {
  @Field((type) => [Podcast], { nullable: true })
  podcasts: Podcast[];

  @Field((type) => String, { nullable: true })
  err: string;
}

@ObjectType()
export class ReturnCreatePodcastDto {
  @Field((type) => Number)
  id: number;

  @Field((type) => String, { nullable: true })
  err: string;
}

@ObjectType()
export class ReturnGetPodcastDto {
  @Field((type) => Podcast)
  podcast: Podcast;

  @Field((type) => String, { nullable: true })
  err: string;
}

@ObjectType()
export class ReturnErrorDto {
  @Field((type) => String, { nullable: true })
  err: string;
}
