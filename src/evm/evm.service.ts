import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IGetBlock, IGetBlockByNumberResponse } from './types/block-types';
import { IGetTransaction, IGetTransactionByHashResponse } from './types/transaction-types';
import { IEvmConfig } from './types/evm.types';

@Injectable()
export class EvmService {
    private readonly nodeUrl: string;
    constructor(
        private readonly configService: ConfigService<IEvmConfig>,
        private readonly httpService: HttpService,
    ) {
        this.nodeUrl = this.configService.get<string>('haqqEvmNode');
    }

    async getBlock(height: string): Promise<IGetBlock> {
        const request = {
            id: 1,
            jsonrpc: '2.0',
            method: 'eth_getBlockByNumber',
            params: [height, false],
        };

        try {
            const { data } = await this.httpService.axiosRef.post<IGetBlockByNumberResponse>(this.nodeUrl, request);

            if (data.error) {
                throw new BadRequestException(`JSON-RPC Error: ${data.error.message}`);
            }

            if (!data.result) {
                throw new NotFoundException('Block not found');
            }

            const { hash, parentHash, gasLimit, gasUsed, size } = data.result;

            return {
                height,
                hash,
                parentHash,
                gasLimit,
                gasUsed,
                size,
            };
        } catch (error) {
            throw error;
        }
    }

    async getTransactions(hash: string): Promise<IGetTransaction> {
        const request = {
            id: 1,
            jsonrpc: '2.0',
            method: 'eth_getTransactionByHash',
            params: [hash],
        };
        try {
            const { data } = await this.httpService.axiosRef.post<IGetTransactionByHashResponse>(this.nodeUrl, request);

            if (data.error) {
                throw new BadRequestException(`JSON-RPC Error: ${data.error.message}`);
            }

            if (!data.result) {
                throw new NotFoundException('Transaction not found');
            }

            const { hash, to, from, value, input, maxFeePerGas, maxPriorityFeePerGas, gasPrice } = data.result;

            return {
                hash,
                to,
                from,
                value,
                input,
                maxFeePerGas,
                maxPriorityFeePerGas,
                gasPrice,
            };
        } catch (error) {
            throw error;
        }
    }
}
