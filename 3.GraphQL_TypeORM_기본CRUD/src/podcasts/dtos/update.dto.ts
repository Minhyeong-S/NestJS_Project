import {
  Field,
  InputType,
  ObjectType,
  OmitType,
  PartialType,
} from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';
import { In } from 'typeorm';
import { Episode } from '../entities/episode.entity';
import { Podcast } from '../entities/podcast.entity';

@InputType()
export class UpdatePodcastDto extends PartialType(Podcast) {
  @Field((type) => Number)
  @IsNumber()
  id: number;
}

@InputType()
export class UpdateEpisodeInput extends PartialType(OmitType(Episode, ['id'])) {
  @Field((type) => Number)
  @IsNumber()
  podcastId: number;

  @Field((type) => Number)
  @IsNumber()
  episodeId: number;
}
