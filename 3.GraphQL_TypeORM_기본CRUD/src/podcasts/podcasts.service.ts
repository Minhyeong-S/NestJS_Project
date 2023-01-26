import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePodcastDto } from './dtos/create-podcast.dto';
import { CoreOutput } from './dtos/output.dto';
import { PodcastOutput, PodcastSearchInput } from './dtos/podcast.dto';
import { UpdatePodcastDto } from './dtos/update-podcast.dto';
import { Podcast } from './entities/podcast.entity';

@Injectable()
export class PodcastsService {
  constructor(
    @InjectRepository(Podcast)
    private readonly podcastsRepository: Repository<Podcast>,
  ) {}

  async getAllPodcasts(): Promise<Podcast[]> {
    return await this.podcastsRepository.find();
  }

  async createPodcast(createPodcastDto: CreatePodcastDto): Promise<CoreOutput> {
    const newPodcast = this.podcastsRepository.create(createPodcastDto);
    try {
      await this.podcastsRepository.save(newPodcast);
      return { ok: true, error: null };
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
      error: null,
    };
  }

  async deletePodcast({ id }: PodcastSearchInput): Promise<CoreOutput> {
    const deleteResult = await this.podcastsRepository.delete(id);
    if (deleteResult.affected === 0) {
      return { ok: false, error: `Podcast Not found with id : ${id}` };
    }
    return {
      ok: true,
      error: null,
    };
  }

  async updatePodcast({
    id,
    ...updateData
  }: UpdatePodcastDto): Promise<CoreOutput> {
    const updateResult = await this.podcastsRepository.update(id, updateData);
    console.log(updateResult);
    return {
      ok: true,
      error: null,
    };
  }
}
