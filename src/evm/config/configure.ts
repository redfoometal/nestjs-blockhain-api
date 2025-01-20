import { IEvmConfig } from '../types/evm.types';

export const evmConfigure = (): IEvmConfig => ({
    haqqEvmNode: process.env.HAQQ_EVM_NODE || 'https://haqq-evm.publicnode.com',
});
