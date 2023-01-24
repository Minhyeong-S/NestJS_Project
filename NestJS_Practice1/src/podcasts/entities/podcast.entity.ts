import { IsNumber, IsString } from 'class-validator';
import { Episode } from './episode.entity';

export class Podcast {
  @IsNumber()
  id: number;

  @IsString()
  title: string;

  @IsString()
  category: string;

  @IsNumber()
  rating: number;

  episodes: Episode[];
}
