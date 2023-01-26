import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreatePodcastDto } from './dtos/create-podcast.dto';
import { CoreOutput } from './dtos/output.dto';
import { PodcastOutput, PodcastSearchInput } from './dtos/podcast.dto';
import { UpdatePodcastDto } from './dtos/update-podcast.dto';
import { Podcast } from './entities/podcast.entity';
import { PodcastsService } from './podcasts.service';

@Resolver()
export class PodcastsResolver {
  constructor(private readonly podcastsService: PodcastsService) {}

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
}
