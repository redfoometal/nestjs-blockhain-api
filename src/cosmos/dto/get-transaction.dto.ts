import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class GetTransactionDto {
    @IsString()
    @IsNotEmpty()
    @Matches(/^[0-9a-f]{64}$/, { message: 'Hash must be a valid 32-byte hex value (64 characters)' })
    hash: string;
}
