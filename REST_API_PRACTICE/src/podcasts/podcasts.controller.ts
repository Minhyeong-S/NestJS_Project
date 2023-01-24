import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateEpisodeDto, UpdateEpisodeDto } from './dtos/create-episode.dto';
import { CreatePodcastDto, UpdatePodcastDto } from './dtos/create-podcast.dto';
import { Podcast } from './entities/podcast.entity';
import { PodcastsService } from './podcasts.service';

@Controller('podcasts')
export class PodcastsController {
  constructor(private readonly podcastsService: PodcastsService) {}

  // 전체 Podcasts 조회
  @Get()
  getAllPodcasts(): Podcast[] {
    return this.podcastsService.getAllPodcasts();
  }

  // Potcast 생성
  @Post()
  createPodcast(@Body() createPodcastDto: CreatePodcastDto): Podcast {
    return this.podcastsService.createPodcast(createPodcastDto);
  }

  // 특정 Podcast 조회
  @Get('/:id')
  getOnePodcast(@Param('id', ParseIntPipe) id: number) {
    return this.podcastsService.getOnePodcast(id);
  }

  // Podcast 수정
  @Patch('/:id')
  updatePodcast(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePodcastDto: UpdatePodcastDto,
  ) {
    return this.podcastsService.updatePodcast(id, updatePodcastDto);
  }

  // Podcast 삭제
  @Delete('/:id')
  deletePodcast(@Param('id', ParseIntPipe) id: number) {
    return this.podcastsService.deletePodcast(id);
  }

  // 모든 Episodes 조회
  @Get('/:id/episodes')
  getAllEpisodes(@Param('id', ParseIntPipe) id: number) {
    return this.podcastsService.getAllEpisodes(id);
  }

  // Episode 생성
  @Post('/:id/episodes')
  createEpisode(
    @Param('id', ParseIntPipe) id: number,
    @Body() createEpisodeDto: CreateEpisodeDto,
  ) {
    return this.podcastsService.createEpisode(id, createEpisodeDto);
  }

  // Episode 수정
  @Patch('/:id/episodes/:episodeId')
  updateEpisode(@Param() params, @Body() updateEpisodeDto: UpdateEpisodeDto) {
    const { id, episodeId } = params;
    return this.podcastsService.updateEpisode(
      { id: +id, episodeId: +episodeId },
      updateEpisodeDto,
    );
  }

  // Episode 삭제
  @Delete('/:id/episodes/:episodeId')
  deleteEpisode(@Param() params) {
    const { id, episodeId } = params;
    return this.podcastsService.deleteEpisode({
      id: +id,
      episodeId: +episodeId,
    });
  }
}
