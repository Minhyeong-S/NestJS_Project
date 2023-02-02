import { Field, InputType, PickType } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';
import { Episode } from '../entities/episode.entity';
import { Podcast } from '../entities/podcast.entity';

@InputType()
export class CreatePodcastDto extends PickType(Podcast, [
  'title',
  'category',
]) {}

@InputType()
export class CreateEpisodeDto extends PickType(Episode, ['title', 'category']) {
  @Field((type) => Number)
  @IsNumber()
  podcastId: number;
}
