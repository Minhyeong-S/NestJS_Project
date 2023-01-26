import { Injectable } from '@nestjs/common';
import { CreateEpisodeDto } from './dtos/create-episode.dto';
import { CreatePodcastDto } from './dtos/create-podcast.dto';
import { DeleteEpisodeDto } from './dtos/delete-episode.dto';
import { ReturnAllEpisodesDto } from './dtos/return-episode.dto';
import { UpdateEpisodeDto } from './dtos/update-episode.dto';
import { UpdatePodcastDto } from './dtos/update-podcast.dto';
import { Episode } from './entities/episode.entity';
import { Podcast } from './entities/podcast.entity';

@Injectable()
export class PodcastsService {
  private podcasts: Podcast[] = [];

  // 모든 Podcast 조회
  getAllPodcasts(): { podcasts: Podcast[]; err: string | null } {
    return { podcasts: this.podcasts, err: null };
  }

  // 특정 Podcast 조회
  getPodcast(id: number): { podcast: Podcast | null; err: string | null } {
    const foundPodcasts = this.podcasts.filter((podcast) => podcast.id === id);
    if (foundPodcasts.length === 0) {
      return { podcast: null, err: 'Podcast not found' };
    }
    if (foundPodcasts.length === 1) {
      return { podcast: foundPodcasts[0], err: null };
    }
    if (foundPodcasts.length > 2) {
      return { podcast: null, err: 'More than one items with same id.' };
    }
  }

  // Podcast 생성
  createPodcast({
    title,
    category,
  }: CreatePodcastDto): { id: number; err: string | null } {
    const id = Date.now();
    this.podcasts.push({ id, title, category, rating: 0, episodes: [] });
    return { id, err: null };
  }

  // Podcast 삭제
  deletePodcast(id: number): { err: string | null } {
    const { err: findErr } = this.getPodcast(id);
    if (findErr) {
      return { err: findErr };
    }
    this.podcasts = this.podcasts.filter((p) => p.id !== id);
    return { err: null };
  }

  // Podcast 수정
  updatePodcast(updatePodcastDto: UpdatePodcastDto): { err: string | null } {
    const { podcast, err: findErr } = this.getPodcast(updatePodcastDto.id);
    if (findErr) {
      return { err: findErr };
    }
    const { err: deleteErr } = this.deletePodcast(updatePodcastDto.id);
    if (deleteErr) {
      return { err: deleteErr };
    }
    this.podcasts.push({ ...podcast, ...updatePodcastDto });
    return { err: null };
  }

  // 모든 Episode 조회
  getAllEpisodes(podcastId: number): ReturnAllEpisodesDto {
    const { podcast, err } = this.getPodcast(podcastId);
    if (err) {
      return { episodes: null, err };
    }
    return { episodes: podcast.episodes, err: null };
  }

  // Episode 생성
  createEpisode({
    id,
    title,
    category,
  }: CreateEpisodeDto): { episodeId: number | null; err: string | null } {
    const { podcast, err: findErr } = this.getPodcast(id);
    if (findErr) {
      return { episodeId: null, err: findErr };
    }
    const episodeId = Date.now();
    podcast.episodes.push({ id: episodeId, title, category, rating: 0 });
    const { err } = this.updatePodcast({
      ...podcast,
    });
    if (err) {
      return { episodeId: null, err };
    }
    return { episodeId, err: null };
  }

  // Episode 삭제
  deleteEpisode({
    podcastId,
    episodeId,
  }: DeleteEpisodeDto): { err: string | null } {
    const { podcast, err: findErr } = this.getPodcast(podcastId);
    if (findErr) {
      return { err: findErr };
    }
    podcast.episodes = podcast.episodes.filter(
      (episode) => episode.id !== episodeId,
    );
    const { err } = this.deletePodcast(podcastId);
    if (err) {
      return { err };
    }
    this.podcasts.push(podcast);

    return { err: null };
  }

  // Episode 수정
  updateEpisode({
    podcastId,
    episodeId,
    ...data
  }: UpdateEpisodeDto): { err: string | null } {
    const { podcast, err: fundPodcastErr } = this.getPodcast(podcastId);
    if (fundPodcastErr) {
      return { err: fundPodcastErr };
    }

    const { episode, err: findEpisodeErr } = this.findEpisode(
      podcast,
      episodeId,
    );
    if (findEpisodeErr) {
      return { err: findEpisodeErr };
    }
    const { err: deleteErr } = this.deleteEpisode({ podcastId, episodeId });
    if (deleteErr) {
      return { err: deleteErr };
    }
    const newEpisode = { ...episode, ...data };
    podcast.episodes.push(newEpisode);
    return { err: null };
  }

  // 특정 Episode 조회
  findEpisode(
    podcast: Podcast,
    episodeId: number,
  ): { episode: Episode | null; err: string | null } {
    const episode = podcast.episodes.find(
      (episode) => episode.id === episodeId,
    );
    if (!episode) {
      return { episode: null, err: 'Episode not found' };
    }
    return { episode, err: null };
  }
}
