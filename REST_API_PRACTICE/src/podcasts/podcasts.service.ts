import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEpisodeDto, UpdateEpisodeDto } from './dtos/create-episode.dto';
import { CreatePodcastDto, UpdatePodcastDto } from './dtos/create-podcast.dto';
import { Episode } from './entities/episode.entity';
import { Podcast } from './entities/podcast.entity';

@Injectable()
export class PodcastsService {
  private podcasts: Podcast[] = [];

  // 전체 Podcasts 조회
  getAllPodcasts(): Podcast[] {
    return this.podcasts;
  }

  // Potcast 생성
  createPodcast(createPodcastDto: CreatePodcastDto): Podcast {
    const newPodcast = {
      id: this.podcasts.length + 1,
      ...createPodcastDto,
      rating: +createPodcastDto.rating,
      episodes: [],
    };
    this.podcasts.push(newPodcast);
    return newPodcast;
  }

  // 특정 Podcast 조회
  getOnePodcast(id: number): Podcast {
    const podcast = this.podcasts.find((v) => v.id === +id);
    if (!podcast)
      throw new NotFoundException(`Podcast with ID ${id} not found.`);
    return podcast;
  }

  // Podcast 수정
  updatePodcast(id: number, updatePodcastDto: UpdatePodcastDto) {
    const podcast = this.getOnePodcast(id);
    this.deletePodcast(id);
    this.podcasts.push({
      ...podcast,
      ...updatePodcastDto,
    });
    return;
  }

  // Podcast 삭제
  deletePodcast(id: number) {
    this.getOnePodcast(id);
    this.podcasts = this.podcasts.filter((v) => v.id !== id);
  }

  // 모든 Episodes 조회
  getAllEpisodes(id: number) {
    const podcast = this.getOnePodcast(id);
    return podcast.episodes;
  }

  // Episode 생성
  createEpisode(id: number, createEpisodeDto: CreateEpisodeDto): Episode {
    const podcast = this.getOnePodcast(id);
    const newEpisode = {
      episodeId: podcast.episodes.length + 1,
      ...createEpisodeDto,
    };
    podcast.episodes.push(newEpisode);
    this.deletePodcast(id);
    this.podcasts.push({
      ...podcast,
    });
    return newEpisode;
  }

  // Episode 수정
  updateEpisode({ id, episodeId }, updateEpisodeDto: UpdateEpisodeDto) {
    const podcast = this.getOnePodcast(id);
    const episode = this.findOneEpisode(podcast, episodeId);
    podcast.episodes = podcast.episodes.filter(
      (v) => v.episodeId !== episodeId,
    );
    const newEpisode = {
      ...episode,
      ...updateEpisodeDto,
    };
    podcast.episodes.push(newEpisode);
    this.deletePodcast(id);
    this.podcasts.push({
      ...podcast,
    });
  }

  // Episode 삭제
  deleteEpisode({ id, episodeId }) {
    console.log('타입확인', typeof id, typeof episodeId);
    const podcast = this.getOnePodcast(id);
    const episode = this.findOneEpisode(podcast, episodeId);

    podcast.episodes = podcast.episodes.filter(
      (v) => v.episodeId !== episodeId,
    );
    this.deletePodcast(id);
    this.podcasts.push({
      ...podcast,
    });
  }

  // 특정 Episode 찾기
  findOneEpisode(podcast: Podcast, episodeId: number) {
    const episode = podcast.episodes.find((v) => v.episodeId === episodeId);
    if (!episode) {
      throw new NotFoundException(
        `There's no episode with episodeId: ${episodeId} in podcast ${podcast.id}`,
      );
    }
    return episode;
  }
}
