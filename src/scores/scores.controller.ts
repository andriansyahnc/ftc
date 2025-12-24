import { Controller, Post, Body, UseGuards, Request, ForbiddenException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { ScoresService } from './scores.service';
import { CreateScoreDto } from './dto/create-score.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserRole } from '../users/entities/user.entity';

@ApiTags('scores')
@Controller('scores')
export class ScoresController {
  constructor(private readonly scoresService: ScoresService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @Throttle({ default: { limit: 10, ttl: 60000 } }) // 10 requests per minute
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new score (requires authentication)' })
  @ApiResponse({ status: 201, description: 'Score successfully created' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Users can only submit scores for themselves' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 429, description: 'Too Many Requests - Rate limit exceeded' })
  create(@Body() createScoreDto: CreateScoreDto, @Request() req) {
    const requestingUserId = req.user.userId;
    const requestingUserRole = req.user.role;
    const targetUserId = createScoreDto.userId || requestingUserId;

    if (requestingUserRole !== UserRole.ADMIN && targetUserId !== requestingUserId) {
      throw new ForbiddenException('You can only submit scores for yourself');
    }

    return this.scoresService.create(createScoreDto, targetUserId);
  }
}
