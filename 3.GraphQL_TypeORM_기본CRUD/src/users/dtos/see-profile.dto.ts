import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { User } from '../entities/user.entity';

// @InputType('SeeProfile', { isAbstract: true })
// @ObjectType()
// export class SeeProfileUserDto extends OmitType(User, ['password']) {}

@ArgsType()
export class SeeProfileInput {
  @Field((type) => Number)
  userId: number;
}

@ObjectType()
export class SeeProfileOutput extends CoreOutput {
  @Field((type) => User, { nullable: true })
  user?: User;
}
