import { Module } from '@nestjs/common';
import { LeaderboardsService } from './leaderboards.service';
import { LeaderboardsController } from './leaderboards.controller';
import { ScoresModule } from 'src/scores/scores.module';

@Module({
  providers: [LeaderboardsService],
  controllers: [LeaderboardsController],
  imports: [ScoresModule]
})
export class LeaderboardsModule {}
