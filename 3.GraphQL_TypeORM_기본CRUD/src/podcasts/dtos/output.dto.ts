import { ObjectType, Field } from '@nestjs/graphql';
import { IsString, IsBoolean, IsOptional } from 'class-validator';
import { Episode } from '../entities/episode.entity';
import { Podcast } from '../entities/podcast.entity';

@ObjectType()
export class CoreOutput {
  @Field((type) => String, { nullable: true })
  @IsString()
  @IsOptional()
  error?: string;

  @Field((type) => Boolean)
  @IsBoolean()
  ok: boolean;
}

@ObjectType()
export class PodcastOutput extends CoreOutput {
  @Field((type) => Podcast, { nullable: true })
  podcast?: Podcast;
}

@ObjectType()
export class EpisodesOutput extends CoreOutput {
  @Field((type) => [Episode], { nullable: true })
  episodes?: Episode[];
}
