import { InputType, ObjectType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { Podcast } from './podcast.entity';

@InputType('EpisodeInput', { isAbstract: true })
@ObjectType()
@Entity()
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

  @Column()
  @Field((_) => Number)
  podcastId: number;

  @ManyToOne((type) => Podcast, (podcast) => podcast.episodes)
  @Field((type) => Podcast)
  podcast: Podcast;
}
