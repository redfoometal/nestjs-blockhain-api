export interface Fee {
    amount: {
        denom: string;
        amount: string;
    }[];
    gas_limit: string;
    payer: string;
    granter: string;
}

export interface ICosmosGetTransactionByHash {
    hash: string;
    height: string;
    time: string;
    gasUsed: string;
    gasWanted: string;
    fee: Fee;
    sender: string[];
}

export interface ICosmosGetTransactionByHashResponse {
    tx_response: {
        height: string;
        txhash: string;
        gas_wanted: string;
        gas_used: string;
        tx: {
            auth_info: {
                fee: Fee;
            };
        };
        timestamp: string;
        events: Event[];
    };
}

export interface Event {
    type: string;
    attributes: EventAttribute[];
}

export interface EventAttribute {
    key: string;
    value: string;
    index: boolean;
}
