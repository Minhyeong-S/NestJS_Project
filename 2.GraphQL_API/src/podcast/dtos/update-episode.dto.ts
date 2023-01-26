import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateEpisodeDto {
  @Field((type) => Number)
  podcastId: number;

  @Field((type) => Number)
  episodeId: number;

  @Field((type) => String)
  title?: string;

  @Field((type) => String)
  category?: string;

  @Field((type) => Number)
  rating?: number;
}
