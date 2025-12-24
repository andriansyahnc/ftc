import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, Min, Max, IsInt, IsPositive } from 'class-validator';

export class CreateScoreDto {
  @ApiProperty({ example: 95.5, description: 'Score value (0-100)' })
  @IsNumber()
  @Min(0)
  @Max(100)
  value: number;

  @ApiProperty({ 
    example: 1, 
    description: 'User ID (only for admins, regular users submit for themselves)', 
    required: false 
  })
  @IsInt()
  @IsPositive()
  @IsOptional()
  userId?: number;
}
