import { ICosmosConfig } from '../types/cosmos.types';

export const cosmosConfigure = (): ICosmosConfig => ({
    cosmosNode: process.env.COSMOS_NODE || 'https://cosmos-rest.publicnode.com',
    endpoints: {
        GET_BLOCK_BY_HEIGHT: '/cosmos/base/tendermint/v1beta1/blocks/',
        GET_TRANSACTION_BY_HASH: '/cosmos/tx/v1beta1/txs/',
    },
});
