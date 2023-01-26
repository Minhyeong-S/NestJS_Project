import { Field, ObjectType } from '@nestjs/graphql';
import { Episode } from '../entities/episode.entity';

@ObjectType()
export class ReturnAllEpisodesDto {
  @Field((type) => [Episode], { nullable: true })
  episodes: Episode[];

  @Field((type) => String, { nullable: true })
  err: string;
}

@ObjectType()
export class ReturnCreateEpisodeDto {
  @Field((type) => Number, { nullable: true })
  episodeId: number;

  @Field((type) => String, { nullable: true })
  err: string;
}
