import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Min, Max } from 'class-validator';

export class CreateScoreDto {
  @ApiProperty({ example: 95.5, description: 'Score value (0-100)' })
  @IsNumber()
  @Min(0)
  @Max(100)
  value: number;

  @ApiProperty({ example: 'Test score', description: 'Score description', required: false })
  @IsString()
  @IsOptional()
  description?: string;
}
