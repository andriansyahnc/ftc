import { Injectable } from '@nestjs/common';
import { ScoresService } from '../scores/scores.service';

@Injectable()
export class LeaderboardsService {
  constructor(private readonly scoresService: ScoresService) {}

  async getTopScores(limit: number = 10) {
    return (await this.scoresService.getTopScores(limit)).map(score => ({
      name: score.user.name,
      score: score.value,
    }));
  }
}
