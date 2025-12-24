import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Min, Max, IsUUID } from 'class-validator';

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

  @ApiProperty({ 
    example: '123e4567-e89b-12d3-a456-426614174000', 
    description: 'User ID (only for admins, regular users submit for themselves)', 
    required: false 
  })
  @IsUUID()
  @IsOptional()
  userId?: string;
}
