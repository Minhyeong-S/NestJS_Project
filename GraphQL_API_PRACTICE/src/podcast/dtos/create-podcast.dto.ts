import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePodcastDto {
  @Field((type) => String)
  readonly title: string;

  @Field((type) => String)
  readonly category: string;
}
