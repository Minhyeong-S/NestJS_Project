import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEpisodeDto, CreatePodcastDto } from './dtos/create.dto';
import { CoreOutput, EpisodesOutput, PodcastOutput } from './dtos/output.dto';
import {
  EpisodeSearchInput,
  EpisodesSearchInput,
  PodcastSearchInput,
} from './dtos/search.dto';
import { UpdateEpisodeInput, UpdatePodcastDto } from './dtos/update.dto';
import { Episode } from './entities/episode.entity';
import { Podcast } from './entities/podcast.entity';

@Injectable()
export class PodcastsService {
  constructor(
    @InjectRepository(Podcast)
    private readonly podcastsRepository: Repository<Podcast>,
    @InjectRepository(Episode)
    private readonly episodesRepository: Repository<Episode>,
  ) {}

  // Podcast

  async getAllPodcasts(): Promise<Podcast[]> {
    return await this.podcastsRepository.find();
  }

  async createPodcast(createPodcastDto: CreatePodcastDto): Promise<CoreOutput> {
    const newPodcast = this.podcastsRepository.create(createPodcastDto);
    try {
      await this.podcastsRepository.save(newPodcast);
      return { ok: true };
    } catch (error) {
      console.log(error);
      return { ok: false, error: error.message };
    }
  }

  async getPodcast({ id }: PodcastSearchInput): Promise<PodcastOutput> {
    const podcast = await this.podcastsRepository.findOne({ where: { id } });
    if (!podcast) {
      return { ok: false, error: `Podcast Not found with id : ${id}` };
    }
    return {
      podcast,
      ok: true,
    };
  }

  async deletePodcast({ id }: PodcastSearchInput): Promise<CoreOutput> {
    const deleteResult = await this.podcastsRepository.delete(id);
    if (deleteResult.affected === 0) {
      return { ok: false, error: `Podcast Not found with id : ${id}` };
    }
    return { ok: true };
  }

  async updatePodcast({
    id,
    ...updateData
  }: UpdatePodcastDto): Promise<CoreOutput> {
    const updateResult = await this.podcastsRepository.update(id, updateData);
    if (updateResult.affected === 0) {
      return { ok: false, error: `Podcast Not found with id : ${id}` };
    }
    return { ok: true };
  }

  // Episode

  async getAllEpisodes({
    podcastId,
  }: EpisodesSearchInput): Promise<EpisodesOutput> {
    const { podcast, ok, error } = await this.getPodcast({ id: podcastId });
    if (error) {
      return { ok, error };
    }
    // 관계 설정을 해주긴 했는데... 그렇다고 episode를 podcast 테이블에서 조회하는게 맞을까? 음...
    return { ok: true, episodes: podcast.episodes };
  }

  async createEpisode({
    podcastId,
    ...data
  }: CreateEpisodeDto): Promise<CoreOutput> {
    const { ok, error } = await this.getPodcast({ id: podcastId });
    if (error) {
      return { ok, error };
    }
    const newEpisode = this.episodesRepository.create({
      podcastId,
      ...data,
    });
    try {
      await this.episodesRepository.save(newEpisode);
      return { ok: true };
    } catch (error) {
      console.log(error);
      return { ok: false, error: error.message };
    }
  }

  async deleteEpisode({
    podcastId,
    episodeId,
  }: EpisodeSearchInput): Promise<CoreOutput> {
    const { ok, error } = await this.getPodcast({ id: podcastId });
    if (error) {
      return { ok, error };
    }
    const deleteResult = await this.episodesRepository.delete(episodeId);
    if (deleteResult.affected === 0) {
      return { ok: false, error: `Episode Not found with id : ${episodeId}` };
    }
    return { ok: true };
  }

  async updateEpisode({
    podcastId,
    episodeId,
    ...updateData
  }: UpdateEpisodeInput): Promise<CoreOutput> {
    console.log(updateData);
    const { ok, error } = await this.getPodcast({ id: podcastId });
    if (error) {
      return { ok, error };
    }
    const updateResult = await this.episodesRepository.update(
      episodeId,
      updateData,
    );
    if (updateResult.affected == 0) {
      return { ok: false, error: `Episode Not found with id : ${episodeId}` };
    }
    return { ok: true };
  }
}
