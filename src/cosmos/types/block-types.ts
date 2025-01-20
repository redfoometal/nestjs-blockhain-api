export interface ICosmosBlockId {
    hash: string;
}

export interface ICosmosBlockHeader {
    height: string;
    time: string;
    proposer_address: string;
}

export interface ICosmosGetBlockByHeightResponse {
    block_id: ICosmosBlockId;
    block: {
        header: ICosmosBlockHeader;
    };
}

export interface ICosmosGetBlockByHeight {
    height: number;
    time: string;
    hash: string;
    proposedAddress: string;
}
