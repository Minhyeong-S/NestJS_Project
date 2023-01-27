import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateEpisodeDto, CreatePodcastDto } from './dtos/create.dto';
import { CoreOutput, EpisodesOutput, PodcastOutput } from './dtos/output.dto';
import {
  EpisodeSearchInput,
  EpisodesSearchInput,
  PodcastSearchInput,
} from './dtos/search.dto';
import { UpdateEpisodeInput, UpdatePodcastDto } from './dtos/update.dto';
import { Podcast } from './entities/podcast.entity';
import { PodcastsService } from './podcasts.service';

@Resolver()
export class PodcastsResolver {
  constructor(private readonly podcastsService: PodcastsService) {}

  // Podcast
  @Query((returns) => [Podcast])
  getAllPodcasts(): Promise<Podcast[]> {
    return this.podcastsService.getAllPodcasts();
  }

  @Mutation((returns) => CoreOutput)
  async createPodcast(
    @Args('input') createPodcastDto: CreatePodcastDto,
  ): Promise<CoreOutput> {
    return await this.podcastsService.createPodcast(createPodcastDto);
  }

  @Query((returns) => PodcastOutput)
  async getPodcast(
    @Args('input') podcastSearchInput: PodcastSearchInput,
  ): Promise<PodcastOutput> {
    return await this.podcastsService.getPodcast(podcastSearchInput);
  }

  @Mutation((returns) => CoreOutput)
  async deletePodcast(
    @Args('input') podcastSearchInput: PodcastSearchInput,
  ): Promise<CoreOutput> {
    return await this.podcastsService.deletePodcast(podcastSearchInput);
  }

  @Mutation((returns) => CoreOutput)
  async updatePodcast(
    @Args('input') updatePodcastDto: UpdatePodcastDto,
  ): Promise<CoreOutput> {
    return await this.podcastsService.updatePodcast(updatePodcastDto);
  }

  // Episode

  @Query((returns) => EpisodesOutput)
  async getAllEpisodes(
    @Args('input') episodesSearchInput: EpisodesSearchInput,
  ): Promise<EpisodesOutput> {
    return await this.podcastsService.getAllEpisodes(episodesSearchInput);
  }

  @Mutation((returns) => CoreOutput)
  async createEpisode(
    @Args('input') createEpisodeDto: CreateEpisodeDto,
  ): Promise<CoreOutput> {
    return await this.podcastsService.createEpisode(createEpisodeDto);
  }

  @Mutation((returns) => CoreOutput)
  async deleteEpisode(
    @Args('input') episodeSearchInput: EpisodeSearchInput,
  ): Promise<CoreOutput> {
    return await this.podcastsService.deleteEpisode(episodeSearchInput);
  }
  @Mutation((returns) => CoreOutput)
  async updateEpisode(
    @Args('input') updateEpisodeInput: UpdateEpisodeInput,
  ): Promise<CoreOutput> {
    return await this.podcastsService.updateEpisode(updateEpisodeInput);
  }
}
