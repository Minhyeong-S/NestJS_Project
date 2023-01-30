import { Field, InputType, OmitType, PartialType } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';
import { Episode } from '../entities/episode.entity';
import { Podcast } from '../entities/podcast.entity';

@InputType()
export class UpdatePodcastDto extends PartialType(Podcast) {
  @Field((type) => Number)
  @IsNumber()
  id: number;
}

@InputType()
export class UpdateEpisodeInput extends PartialType(Episode) {
  @Field((type) => Number)
  @IsNumber()
  podcastId: number;

  @Field((type) => Number)
  @IsNumber()
  episodeId: number;
}
