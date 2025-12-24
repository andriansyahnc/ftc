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

  async create(createScoreDto: CreateScoreDto, userId: number): Promise<Score> {
    const score = this.scoreRepository.create({
      ...createScoreDto,
      userId,
    });

    return this.scoreRepository.save(score);
  }

  async getTopScores(limit: number = 10) {
    return this.scoreRepository.find({
      relations: ['user'],
      order: { value: 'DESC' },
      take: limit,
    });
  }
}
