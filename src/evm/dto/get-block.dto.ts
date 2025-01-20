import { BadRequestException } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class GetBlockDto {
    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => {
        const decimalValue = parseInt(value, 10);
        if (isNaN(decimalValue)) {
            throw new BadRequestException('Height must be a valid number');
        }
        return '0x' + decimalValue.toString(16);
    })
    @Matches(/^0x(0|[1-9a-f][0-9a-f]*)$/, {
        message: 'Height must be a valid hex string starting with 0x or a positive number',
    })
    height: string;
}
