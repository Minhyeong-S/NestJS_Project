import { Field, InputType } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';

@InputType()
export class CreatePodcastDto {
  @Field((type) => String)
  @IsString()
  readonly title: string;

  @Field((type) => String)
  @IsString()
  readonly category: string;
}

@InputType()
export class CreateEpisodeDto extends CreatePodcastDto {
  @Field((type) => Number)
  @IsNumber()
  podcastId: number;
}
