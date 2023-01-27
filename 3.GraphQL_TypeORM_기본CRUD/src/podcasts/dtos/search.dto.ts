import { Field, InputType } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

@InputType()
export class PodcastSearchInput {
  @Field((type) => Number)
  @IsNumber()
  id: number;
}

@InputType()
export class EpisodesSearchInput {
  @Field((type) => Number)
  @IsNumber()
  podcastId: number;
}

@InputType()
export class EpisodeSearchInput extends EpisodesSearchInput {
  @Field((type) => Number)
  @IsNumber()
  episodeId: number;
}
