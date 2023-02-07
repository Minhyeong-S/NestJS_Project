import { ArgsType, Field, ObjectType, OmitType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { User } from '../entities/user.entity';

@ObjectType()
export class SeeProfileUserDto extends OmitType(
  User,
  ['password'],
  ObjectType,
) {
  @Field((type) => Number)
  id: number;
}

@ArgsType()
export class SeeProfileInput {
  @Field((type) => Number)
  userId: number;
}

@ObjectType()
export class SeeProfileOutput extends CoreOutput {
  @Field((type) => SeeProfileUserDto, { nullable: true })
  user?: SeeProfileUserDto;
}
