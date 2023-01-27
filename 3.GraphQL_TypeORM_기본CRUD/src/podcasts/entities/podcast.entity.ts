import { ObjectType, Field, InputType } from '@nestjs/graphql';
import { IsString, IsNumber } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Episode } from './episode.entity';

@InputType('PodcastInput', { isAbstract: true })
@ObjectType()
@Entity()
export class Podcast {
  @PrimaryGeneratedColumn()
  @Field((type) => Number)
  @IsNumber()
  id: number;

  @Column()
  @Field((type) => String)
  @IsString()
  title: string;

  @Column()
  @Field((type) => String)
  @IsString()
  category: string;

  @Column({ default: 0 })
  @Field((type) => Number, { nullable: true })
  @IsNumber()
  rating: number;

  @OneToMany((type) => Episode, (episode) => episode.podcast, { eager: true })
  @Field((type) => [Episode])
  episodes: Episode[];
}
