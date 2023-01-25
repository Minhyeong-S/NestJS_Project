import { Field, InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePodcastDto {
  @Field((type) => Number)
  readonly id: number;

  @Field((type) => String, { nullable: true })
  readonly title?: string;

  @Field((type) => String, { nullable: true })
  readonly category?: string;

  @Field((type) => Number, { nullable: true })
  readonly rating?: number;
}
