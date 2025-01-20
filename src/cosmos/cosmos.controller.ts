import { Controller, Get, Param } from '@nestjs/common';
import { CosmosService } from './cosmos.service';
import { GetBlockDto } from './dto/get-block.dto';
import { GetTransactionDto } from './dto/get-transaction.dto';

@Controller('cosmos')
export class CosmosController {
    constructor(private readonly cosmosService: CosmosService) {}

    @Get('/block/:height')
    async getBlockByHeight(@Param() getBlockDto: GetBlockDto) {
        return await this.cosmosService.getBlockByHeight(getBlockDto.height);
    }

    @Get('/transactions/:hash')
    async getTransactionsByHash(@Param() getTransactionDto: GetTransactionDto) {
      return await this.cosmosService.getTransactionsByHash(getTransactionDto.hash);
    }
}
