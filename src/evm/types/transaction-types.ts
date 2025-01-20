import { IEvmError } from './block-types';

export interface IGetTransaction {
    hash: string;
    to: string;
    from: string;
    value: string;
    input: string;
    maxFeePerGas?: string;
    maxPriorityFeePerGas?: string;
    gasPrice: string;
}

export interface IGetTransactionByHashResponse {
    jsonrpc: string;
    id: number;
    result?: ITransactionResult;
    error?: IEvmError;
}

interface ITransactionResult {
    hash: string;
    to: string;
    from: string;
    value: string;
    input: string;
    maxFeePerGas?: string;
    maxPriorityFeePerGas?: string;
    gasPrice: string;
}
