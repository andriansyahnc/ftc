import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { LeaderboardsService } from './leaderboards.service';

@ApiTags('leaderboards')
@Controller('leaderboards')
export class LeaderboardsController {
    constructor(private readonly leaderboardsService: LeaderboardsService) {}

    @Get()
    @ApiOperation({ summary: 'Get top scores leaderboard (public endpoint)' })
    @ApiQuery({ 
        name: 'limit', 
        required: false, 
        type: Number, 
        description: 'Number of top scores to return',
        example: 10
    })
    @ApiResponse({ 
        status: 200, 
        description: 'Returns top scores sorted by value descending. No authentication required.',
        schema: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    name: { type: 'string', example: 'Player1' },
                    score: { type: 'number', example: 95.5 },
                },
            },
        },
    })
    getTopScores(@Query('limit') limit: number = 10) {
        return this.leaderboardsService.getTopScores(Number(limit));
    }
}
