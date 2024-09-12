import { CommonBase } from './CommonBase.mjs';
export declare class TxOut extends CommonBase {
    /** The script_pubkey in this output */
    script_pubkey: Uint8Array;
    /** The value, in satoshis, of this output */
    value: bigint;
    static constructor_new(value: bigint, script_pubkey: Uint8Array): TxOut;
}
