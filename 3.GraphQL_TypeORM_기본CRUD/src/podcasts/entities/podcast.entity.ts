import {
  ObjectType,
  Field,
  InputType,
  registerEnumType,
} from '@nestjs/graphql';
import { IsString, IsNumber } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Episode } from './episode.entity';

enum PodcastCategory {
  COMEDY = 'COMEDY',
  ENTERTAINMENT = 'ENTERTAINMENT',
  EDUCATION = 'EDUCATION',
  NEWS = 'NEWS',
  BUSINESS = 'BUSINESS',
  FITNESS = 'FITNESS',
}

registerEnumType(PodcastCategory, { name: 'PodcastCategory' });

@InputType('PodcastInput', { isAbstract: true })
@ObjectType()
@Entity()
export class Podcast extends CoreEntity {
  @Column()
  @Field((type) => String)
  @IsString()
  title: string;

  @Column()
  @Field((type) => PodcastCategory)
  @IsString()
  category: PodcastCategory;

  @Column({ default: 0 })
  @Field((type) => Number, { nullable: true })
  @IsNumber()
  rating: number;

  @Field((type) => [Episode], { nullable: true })
  @OneToMany((type) => Episode, (episode) => episode.podcast, {
    cascade: true, // cascade: true 일 경우 podcast에 연결된 episode는 save를 하지 않아도 db에 자동으로 저장된다.
  })
  episodes: Episode[];
}
