import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { PodcastsModule } from './podcast/podcasts.module';


@Module({
  imports: [PodcastsModule,     GraphQLModule.forRoot({
    
    autoSchemaFile: true,
    // jwt middleware에서 확인하고 req.user에 넣어준 user 정보를 resolver에서 사용할 수 있도록 해준다.
    // context: ({ req }) => ({ user: req['user'] }),
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
