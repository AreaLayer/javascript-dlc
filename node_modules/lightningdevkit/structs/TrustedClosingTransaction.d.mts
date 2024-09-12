import { CommonBase } from './CommonBase.mjs';
/**
 * A wrapper on ClosingTransaction indicating that the built bitcoin
 * transaction is trusted.
 *
 * See trust() and verify() functions on CommitmentTransaction.
 *
 * This structure implements Deref.
 */
export declare class TrustedClosingTransaction extends CommonBase {
    /**
     * The pre-built Bitcoin commitment transaction
     */
    built_transaction(): Uint8Array;
    /**
     * Get the SIGHASH_ALL sighash value of the transaction.
     *
     * This can be used to verify a signature.
     */
    get_sighash_all(funding_redeemscript: Uint8Array, channel_value_satoshis: bigint): Uint8Array;
    /**
     * Sign a transaction, either because we are counter-signing the counterparty's transaction or
     * because we are about to broadcast a holder transaction.
     */
    sign(funding_key: Uint8Array, funding_redeemscript: Uint8Array, channel_value_satoshis: bigint): Uint8Array;
}
