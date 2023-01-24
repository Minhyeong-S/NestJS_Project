import { OmitType, PartialType } from '@nestjs/mapped-types';
import { Episode } from '../entities/episode.entity';

export class CreateEpisodeDto extends OmitType(Episode, ['episodeId']) {}

export class UpdateEpisodeDto extends PartialType(CreateEpisodeDto) {}
