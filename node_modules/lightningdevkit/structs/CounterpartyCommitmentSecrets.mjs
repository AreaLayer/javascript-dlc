import { Result_NoneNoneZ } from '../structs/Result_NoneNoneZ.mjs';
import { Result_CounterpartyCommitmentSecretsDecodeErrorZ } from '../structs/Result_CounterpartyCommitmentSecretsDecodeErrorZ.mjs';
import { CommonBase } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs';
/**
 * Implements the per-commitment secret storage scheme from
 * [BOLT 3](https://github.com/lightning/bolts/blob/dcbf8583976df087c79c3ce0b535311212e6812d/03-transactions.md#efficient-per-commitment-secret-storage).
 *
 * Allows us to keep track of all of the revocation secrets of our counterparty in just 50*32 bytes
 * or so.
 */
export class CounterpartyCommitmentSecrets extends CommonBase {
    /* @internal */
    constructor(_dummy, ptr) {
        super(ptr, bindings.CounterpartyCommitmentSecrets_free);
    }
    clone_ptr() {
        const ret = bindings.CounterpartyCommitmentSecrets_clone_ptr(this.ptr);
        return ret;
    }
    /**
     * Creates a copy of the CounterpartyCommitmentSecrets
     */
    clone() {
        const ret = bindings.CounterpartyCommitmentSecrets_clone(this.ptr);
        const ret_hu_conv = new CounterpartyCommitmentSecrets(null, ret);
        CommonBase.add_ref_from(ret_hu_conv, this);
        return ret_hu_conv;
    }
    /**
     * Creates a new empty `CounterpartyCommitmentSecrets` structure.
     */
    static constructor_new() {
        const ret = bindings.CounterpartyCommitmentSecrets_new();
        const ret_hu_conv = new CounterpartyCommitmentSecrets(null, ret);
        CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
        return ret_hu_conv;
    }
    /**
     * Returns the minimum index of all stored secrets. Note that indexes start
     * at 1 << 48 and get decremented by one for each new secret.
     */
    get_min_seen_secret() {
        const ret = bindings.CounterpartyCommitmentSecrets_get_min_seen_secret(this.ptr);
        return ret;
    }
    /**
     * Inserts the `secret` at `idx`. Returns `Ok(())` if the secret
     * was generated in accordance with BOLT 3 and is consistent with previous secrets.
     */
    provide_secret(idx, secret) {
        const ret = bindings.CounterpartyCommitmentSecrets_provide_secret(this.ptr, idx, bindings.encodeUint8Array(bindings.check_arr_len(secret, 32)));
        const ret_hu_conv = Result_NoneNoneZ.constr_from_ptr(ret);
        return ret_hu_conv;
    }
    /**
     * Returns the secret at `idx`.
     * Returns `None` if `idx` is < [`CounterpartyCommitmentSecrets::get_min_seen_secret`].
     *
     * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
     */
    get_secret(idx) {
        const ret = bindings.CounterpartyCommitmentSecrets_get_secret(this.ptr, idx);
        const ret_conv = bindings.decodeUint8Array(ret);
        return ret_conv;
    }
    /**
     * Serialize the CounterpartyCommitmentSecrets object into a byte array which can be read by CounterpartyCommitmentSecrets_read
     */
    write() {
        const ret = bindings.CounterpartyCommitmentSecrets_write(this.ptr);
        const ret_conv = bindings.decodeUint8Array(ret);
        return ret_conv;
    }
    /**
     * Read a CounterpartyCommitmentSecrets from a byte array, created by CounterpartyCommitmentSecrets_write
     */
    static constructor_read(ser) {
        const ret = bindings.CounterpartyCommitmentSecrets_read(bindings.encodeUint8Array(ser));
        const ret_hu_conv = Result_CounterpartyCommitmentSecretsDecodeErrorZ.constr_from_ptr(ret);
        return ret_hu_conv;
    }
}
//# sourceMappingURL=CounterpartyCommitmentSecrets.mjs.map