import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosError, isAxiosError } from 'axios';
import { ICosmosGetTransactionByHash, ICosmosGetTransactionByHashResponse } from './types/transaction-types';
import { ICosmosGetBlockByHeight, ICosmosGetBlockByHeightResponse } from './types/block-types';
import { ConfigService } from '@nestjs/config';
import { ICosmosConfig, TCosmosEndpoints } from './types/cosmos.types';

@Injectable()
export class CosmosService {
    private readonly nodeUrl: string;
    private readonly endpoints: TCosmosEndpoints;
    constructor(
        private readonly configService: ConfigService<ICosmosConfig>,
        private readonly httpService: HttpService,
    ) {
        this.nodeUrl = this.configService.get<string>('cosmosNode');
        this.endpoints = this.configService.get<TCosmosEndpoints>('endpoints');
    }

    async getBlockByHeight(height: number): Promise<ICosmosGetBlockByHeight> {
        const url = `${this.nodeUrl}/${this.endpoints.GET_BLOCK_BY_HEIGHT}/${height}`;
        const response = await this.httpService.axiosRef
            .get<ICosmosGetBlockByHeightResponse>(url)
            .catch(this.handleError);
        const block = response.data.block;

        return {
            height: parseInt(block.header.height, 10),
            time: block.header.time,
            hash: response.data.block_id.hash,
            proposedAddress: block.header.proposer_address,
        };
    }

    async getTransactionsByHash(hash: string): Promise<ICosmosGetTransactionByHash> {
        const url = `${this.nodeUrl}/${this.endpoints.GET_TRANSACTION_BY_HASH}/${hash}`;
        const response = await this.httpService.axiosRef
            .get<ICosmosGetTransactionByHashResponse>(url)
            .catch(this.handleError);

        const transaction = response.data.tx_response;
        const sender = Array.from(
            new Set(
                transaction.events
                    .flatMap((event) => event.attributes)
                    .filter((attribute) => attribute.key === 'sender')
                    .map((attribute) => attribute.value),
            ),
        );

        return {
            hash: transaction.txhash,
            height: transaction.height,
            time: transaction.timestamp,
            gasUsed: transaction.gas_used,
            gasWanted: transaction.gas_wanted,
            fee: transaction.tx.auth_info.fee,
            sender,
        };
    }

    private handleError(error: Error | AxiosError): never {
        if (isAxiosError(error)) {
            const status = error.response?.status;
            const message = error.response?.data?.message;

            if (status === 400 && message.includes('requested block height is bigger then the chain length')) {
                throw new BadRequestException(
                    'The requested block is longer than the chain length. Please check the entered height.',
                );
            }

            if (status === 500 && message.includes('height')) {
                throw new BadRequestException(
                    'The requested block height is not available. Please request a block with an available height.',
                );
            }

            throw new HttpException(message || 'Error requesting block', status || 500);
        }

        throw error;
    }
}
