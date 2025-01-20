import { Controller, Get, Param, ValidationPipe } from '@nestjs/common';
import { EvmService } from './evm.service';
import { get } from 'http';
import { GetTransactionDto } from './dto/get-transaction.dto';
import { GetBlockDto } from './dto/get-block.dto';

@Controller('evm')
export class EvmController {
    constructor(private readonly evmService: EvmService) {}

    @Get('/block/:height')
    async getBlock(@Param() getBlockDto: GetBlockDto) {
        return await this.evmService.getBlock(getBlockDto.height);
    }

    @Get('/transactions/:hash')
    async getTransactions(@Param() getTransactionDto: GetTransactionDto) {
        return await this.evmService.getTransactions(getTransactionDto.hash);
    }
}
