import { Field, InputType, OmitType, PartialType } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';
import { Podcast } from '../entities/podcast.entity';

@InputType()
export class UpdatePodcastDto extends PartialType(Podcast) {
  @Field((type) => Number)
  @IsNumber()
  id: number;
}
