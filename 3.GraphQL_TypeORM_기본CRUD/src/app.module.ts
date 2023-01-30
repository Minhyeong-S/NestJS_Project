import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloDriver } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { PodcastsModule } from './podcasts/podcasts.module';
import { Podcast } from './podcasts/entities/podcast.entity';
import { Episode } from './podcasts/entities/episode.entity';
import { CommonModule } from './common/common.module';
import { CoreEntity } from './common/entities/core.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    GraphQLModule.forRoot({ autoSchemaFile: true, driver: ApolloDriver }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      logging: true,
      synchronize: true,
      entities: [Podcast, Episode],
    }),
    PodcastsModule,
    CommonModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
