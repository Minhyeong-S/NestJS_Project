import {
  Field,
  InputType,
  OmitType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { IsNumber } from 'class-validator';
import { Episode } from '../entities/episode.entity';
import { Podcast } from '../entities/podcast.entity';

@InputType()
export class UpdatePodcastDto extends PartialType(
  PickType(Podcast, ['title', 'category', 'rating']),
) {
  @Field((type) => Number)
  @IsNumber()
  id: number;
}

@InputType()
export class UpdateEpisodeInput extends PartialType(
  PickType(Episode, ['title', 'category']),
) {
  @Field((type) => Number)
  @IsNumber()
  podcastId: number;

  @Field((type) => Number)
  @IsNumber()
  episodeId: number;
}
