import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CoreOutput } from 'src/common/dtos/output.dto';

import { Repository } from 'typeorm';
import { CreateEpisodeDto, CreatePodcastDto } from './dtos/create.dto';
import {
  EpisodesOutput,
  PodcastOutput,
  PodcastsOutput,
} from './dtos/output.dto';
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

  async getAllPodcasts(): Promise<PodcastsOutput> {
    try {
      const podcasts = await this.podcastsRepository.find({
        relations: ['episodes'],
        order: {
          id: 'ASC',
          episodes: { id: 'ASC' },
        },
      });
      return { ok: true, podcasts };
    } catch (error) {
      return {
        ok: false,
        error: error.message,
      };
    }
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
    try {
      const podcast = await this.podcastsRepository.findOne({
        where: { id },
        relations: ['episodes'],
      });
      if (!podcast) {
        return { ok: false, error: `Podcast Not found with id : ${id}` };
      }
      return {
        ok: true,
        podcast,
      };
    } catch (error) {
      console.log(error);
      return { ok: false, error: error.message };
    }
  }

  async deletePodcast({ id }: PodcastSearchInput): Promise<CoreOutput> {
    try {
      const deleteResult = await this.podcastsRepository.delete(id);
      if (deleteResult.affected === 0) {
        return { ok: false, error: `Podcast Not found with id : ${id}` };
      }
      return { ok: true };
    } catch (error) {
      console.log(error);
      return { ok: false, error: error.message };
    }
  }

  async updatePodcast({
    id,
    ...updateData
  }: UpdatePodcastDto): Promise<CoreOutput> {
    try {
      // 방법 2. save()
      const { ok, error, podcast } = await this.getPodcast({ id });
      if (error) {
        return { ok, error };
      }
      this.podcastsRepository.save({ ...podcast, ...updateData });
      return { ok: true };
      //
    } catch (error) {
      console.log(error);
      return { ok: false, error: error.message };
    }

    // 방법 1. update()
    /*
       const updateResult = await this.podcastsRepository.update(id, updateData);
      if (updateResult.affected === 0) {
        return { ok: false, error: `Podcast Not found with id : ${id}` };
      }
      return { ok: true };
      */
  }

  // Episode

  async getAllEpisodes({
    podcastId,
  }: EpisodesSearchInput): Promise<EpisodesOutput> {
    try {
      // 방법 2
      const { ok, error } = await this.getPodcast({ id: podcastId });
      if (error) {
        return { ok, error };
      }
      const episodes = await this.episodesRepository.find({
        where: { podcast: { id: podcastId } },
        order: { id: 'ASC' },
      });
      return { ok: true, episodes };
      //
    } catch (error) {
      return {
        ok: false,
        error: error.message,
      };
    }

    // 방법 1
    /*
      const { podcast, ok, error } = await this.getPodcast({ id: podcastId });
      if (error) {    
        return { ok, error };
      }
      // 관계 설정을 해주긴 했는데... 그렇다고 episode를 podcast 테이블에서 조회하는게 맞을까? 음...
      return { ok: true, episodes: podcast.episodes };
    
      */
  }

  async createEpisode({
    podcastId,
    ...data
  }: CreateEpisodeDto): Promise<CoreOutput> {
    try {
      const { podcast, ok, error } = await this.getPodcast({ id: podcastId });
      if (error) {
        return { ok, error };
      }
      const newEpisode = this.episodesRepository.create({
        ...data,
        podcast,
      });
      await this.episodesRepository.save(newEpisode);
      return { ok: true };
      //
    } catch (error) {
      console.log(error);
      return { ok: false, error: error.message };
    }
  }

  async deleteEpisode({
    podcastId,
    episodeId,
  }: EpisodeSearchInput): Promise<CoreOutput> {
    try {
      const { ok, error } = await this.getPodcast({ id: podcastId });
      if (error) {
        return { ok, error };
      }
      const deleteResult = await this.episodesRepository.delete(episodeId);
      if (deleteResult.affected === 0) {
        return { ok: false, error: `Episode Not found with id : ${episodeId}` };
      }
      return { ok: true };
      //
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        error: error.message,
      };
    }
  }

  async updateEpisode({
    podcastId,
    episodeId,
    ...updateData
  }: UpdateEpisodeInput): Promise<CoreOutput> {
    try {
      const { ok, error } = await this.getPodcast({ id: podcastId });
      if (error) {
        return { ok, error };
      }
      // 방법 2. save()
      const episode = await this.episodesRepository.findOne({
        where: { podcast: { id: podcastId }, id: episodeId },
      });
      if (!episode) {
        return {
          ok: false,
          error: `Episode not found with episodeId : ${episodeId}`,
        };
      }
      this.episodesRepository.save({ ...episode, ...updateData });
      return { ok: true };
      //
    } catch (error) {
      console.log(error);
      return { ok: false, error: error.message };
    }

    // 방법 1. update()
    /*
    const updateResult = await this.episodesRepository.update(
      episodeId,
      updateData,
    );
    if (updateResult.affected == 0) {
      return { ok: false, error: `Episode Not found with id : ${episodeId}` };
    }
    return { ok: true };
    */
  }
}
