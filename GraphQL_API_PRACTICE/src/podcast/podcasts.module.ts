import { Module } from '@nestjs/common';
import { PodcastsResolver } from './podcasts.resolver';
import { PodcastsService } from './podcasts.service';

@Module({
  controllers: [],
  providers: [PodcastsService, PodcastsResolver],
})
export class PodcastsModule {}
