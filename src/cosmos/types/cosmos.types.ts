export interface ICosmosConfig {
    cosmosNode: string;
    endpoints: {
        GET_BLOCK_BY_HEIGHT: string;
        GET_TRANSACTION_BY_HASH: string;
    };
}

export type TCosmosEndpoints = ICosmosConfig['endpoints'];
