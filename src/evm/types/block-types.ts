export interface IGetBlock {
    height: string;
    hash: string;
    parentHash: string;
    gasLimit: string;
    gasUsed: string;
    size: string;
}

export interface IGetBlockByNumberResponse {
    jsonrpc: string;
    id: number;
    result?: IBlockResult;
    error?: IEvmError;
}

interface IBlockResult {
    hash: string;
    parentHash: string;
    gasLimit: string;
    gasUsed: string;
    size: string;
}

export interface IEvmError {
    code: number;
    message: string;
}
