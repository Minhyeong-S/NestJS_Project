import { Field, ObjectType } from '@nestjs/graphql';
import { IsDate, IsNumber } from 'class-validator';
import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class CoreEntity {
  @PrimaryGeneratedColumn()
  @Field((type) => Number)
  @IsNumber()
  id: number;

  @CreateDateColumn()
  @Field((type) => Date)
  @IsDate()
  createdAt: Date;

  @UpdateDateColumn()
  @Field((type) => Date)
  @IsDate()
  updatedAt: Date;
}
