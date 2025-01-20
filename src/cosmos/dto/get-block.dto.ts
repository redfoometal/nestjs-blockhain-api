import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class GetBlockDto {
    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    @Min(23252761, { message: 'Height must be at least 23252761' })
    height: number;
}
