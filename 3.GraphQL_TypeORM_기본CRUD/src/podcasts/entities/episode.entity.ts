import { InputType, ObjectType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@InputType('EpisodeInput', { isAbstract: true })
@ObjectType()
export class Episode {
  @PrimaryGeneratedColumn()
  @Field((_) => Number)
  id: number;

  @Column()
  @Field((_) => String)
  @IsString()
  title: string;

  @Column()
  @Field((_) => String)
  @IsString()
  category: string;
}
