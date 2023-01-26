import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class DeleteEpisodeDto {
  @Field((type) => Number)
  podcastId: number;

  @Field((type) => Number)
  episodeId: number;
}
