import { Field, InputType } from '@nestjs/graphql';
import { CreatePodcastDto } from './create-podcast.dto';

@InputType()
export class CreateEpisodeDto extends CreatePodcastDto {
  @Field((type) => Number)
  id: number;
}
