import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Score } from './entities/score.entity';
import { CreateScoreDto } from './dto/create-score.dto';

@Injectable()
export class ScoresService {
  constructor(
    @InjectRepository(Score)
    private readonly scoreRepository: Repository<Score>,
  ) {}

  async create(createScoreDto: CreateScoreDto, userId: string): Promise<Score> {
    const score = this.scoreRepository.create({
      ...createScoreDto,
      userId,
    });

    return this.scoreRepository.save(score);
  }
}
