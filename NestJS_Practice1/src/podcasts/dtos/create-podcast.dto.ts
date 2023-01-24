import { OmitType, PartialType } from '@nestjs/mapped-types';
import { Podcast } from '../entities/podcast.entity';

export class CreatePodcastDto extends OmitType(Podcast, ['id', 'episodes']) {}

export class UpdatePodcastDto extends PartialType(CreatePodcastDto) {}
