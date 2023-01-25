import { ParseIntPipe } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateEpisodeDto } from './dtos/create-episode.dto';
import { CreatePodcastDto } from './dtos/create-podcast.dto';
import { DeleteEpisodeDto } from './dtos/delete-episode.dto';
import {
  ReturnAllEpisodesDto,
  ReturnCreateEpisodeDto,
} from './dtos/return-episode.dto';
import {
  ReturnAllPodcastsDto,
  ReturnCreatePodcastDto,
  ReturnErrorDto,
  ReturnGetPodcastDto,
} from './dtos/return-podcast.dto';
import { UpdateEpisodeDto } from './dtos/update-episode.dto';
import { UpdatePodcastDto } from './dtos/update-podcast.dto';
import { PodcastsService } from './podcasts.service';

@Resolver()
export class PodcastsResolver {
  constructor(private readonly podcastsService: PodcastsService) {}

  // 모든 Podcast 조회
  @Query((returns) => ReturnAllPodcastsDto)
  getAllPodcasts(): ReturnAllPodcastsDto {
    return this.podcastsService.getAllPodcasts();
  }

  // 특정 Podcast 조회
  @Query((returns) => ReturnGetPodcastDto)
  getPodcast(@Args('id', ParseIntPipe) id: number): ReturnGetPodcastDto {
    return this.podcastsService.getPodcast(id);
  }

  // Podcast 생성
  @Mutation((returns) => ReturnCreatePodcastDto)
  createPodcast(@Args('input') createPodcastDto: CreatePodcastDto) {
    return this.podcastsService.createPodcast(createPodcastDto);
  }

  // Podcast 삭제
  @Mutation((returns) => ReturnErrorDto)
  deletePodcast(@Args('id', ParseIntPipe) id: number) {
    return this.podcastsService.deletePodcast(id);
  }

  // Podcast 수정
  @Mutation((returns) => ReturnErrorDto)
  updatePodcast(@Args('input') updatePodcastDto: UpdatePodcastDto) {
    return this.podcastsService.updatePodcast(updatePodcastDto);
  }

  // 모든 Episode 조회
  @Query((returns) => ReturnAllEpisodesDto)
  getAllEpisodes(
    @Args('id', ParseIntPipe) podcastId: number,
  ): ReturnAllEpisodesDto {
    return this.podcastsService.getAllEpisodes(podcastId);
  }

  // Episode 생성
  @Mutation((returns) => ReturnCreateEpisodeDto)
  createEpisode(@Args('input') createEpisodeDto: CreateEpisodeDto) {
    return this.podcastsService.createEpisode(createEpisodeDto);
  }

  // Episode 삭제
  @Mutation((returns) => ReturnErrorDto)
  deleteEpisode(@Args('input') deleteEpisodeDto: DeleteEpisodeDto) {
    return this.podcastsService.deleteEpisode(deleteEpisodeDto);
  }

  // Episode 수정
  @Mutation((returns) => ReturnErrorDto)
  updateEpisode(@Args('input') updateEpisodeDto: UpdateEpisodeDto) {
    return this.podcastsService.updateEpisode(updateEpisodeDto);
  }
}
