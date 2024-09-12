import { CommonBase } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs';
/**
 * A wrapper on ClosingTransaction indicating that the built bitcoin
 * transaction is trusted.
 *
 * See trust() and verify() functions on CommitmentTransaction.
 *
 * This structure implements Deref.
 */
export class TrustedClosingTransaction extends CommonBase {
    /* @internal */
    constructor(_dummy, ptr) {
        super(ptr, bindings.TrustedClosingTransaction_free);
    }
    /**
     * The pre-built Bitcoin commitment transaction
     */
    built_transaction() {
        const ret = bindings.TrustedClosingTransaction_built_transaction(this.ptr);
        const ret_conv = bindings.decodeUint8Array(ret);
        return ret_conv;
    }
    /**
     * Get the SIGHASH_ALL sighash value of the transaction.
     *
     * This can be used to verify a signature.
     */
    get_sighash_all(funding_redeemscript, channel_value_satoshis) {
        const ret = bindings.TrustedClosingTransaction_get_sighash_all(this.ptr, bindings.encodeUint8Array(funding_redeemscript), channel_value_satoshis);
        const ret_conv = bindings.decodeUint8Array(ret);
        return ret_conv;
    }
    /**
     * Sign a transaction, either because we are counter-signing the counterparty's transaction or
     * because we are about to broadcast a holder transaction.
     */
    sign(funding_key, funding_redeemscript, channel_value_satoshis) {
        const ret = bindings.TrustedClosingTransaction_sign(this.ptr, bindings.encodeUint8Array(bindings.check_arr_len(funding_key, 32)), bindings.encodeUint8Array(funding_redeemscript), channel_value_satoshis);
        const ret_conv = bindings.decodeUint8Array(ret);
        return ret_conv;
    }
}
//# sourceMappingURL=TrustedClosingTransaction.mjs.map