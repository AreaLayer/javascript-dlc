import { Result_NoneNoneZ } from '../structs/Result_NoneNoneZ.mjs';
import { Result_CounterpartyCommitmentSecretsDecodeErrorZ } from '../structs/Result_CounterpartyCommitmentSecretsDecodeErrorZ.mjs';
import { CommonBase } from './CommonBase.mjs';
/**
 * Implements the per-commitment secret storage scheme from
 * [BOLT 3](https://github.com/lightning/bolts/blob/dcbf8583976df087c79c3ce0b535311212e6812d/03-transactions.md#efficient-per-commitment-secret-storage).
 *
 * Allows us to keep track of all of the revocation secrets of our counterparty in just 50*32 bytes
 * or so.
 */
export declare class CounterpartyCommitmentSecrets extends CommonBase {
    clone_ptr(): bigint;
    /**
     * Creates a copy of the CounterpartyCommitmentSecrets
     */
    clone(): CounterpartyCommitmentSecrets;
    /**
     * Creates a new empty `CounterpartyCommitmentSecrets` structure.
     */
    static constructor_new(): CounterpartyCommitmentSecrets;
    /**
     * Returns the minimum index of all stored secrets. Note that indexes start
     * at 1 << 48 and get decremented by one for each new secret.
     */
    get_min_seen_secret(): bigint;
    /**
     * Inserts the `secret` at `idx`. Returns `Ok(())` if the secret
     * was generated in accordance with BOLT 3 and is consistent with previous secrets.
     */
    provide_secret(idx: bigint, secret: Uint8Array): Result_NoneNoneZ;
    /**
     * Returns the secret at `idx`.
     * Returns `None` if `idx` is < [`CounterpartyCommitmentSecrets::get_min_seen_secret`].
     *
     * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
     */
    get_secret(idx: bigint): Uint8Array;
    /**
     * Serialize the CounterpartyCommitmentSecrets object into a byte array which can be read by CounterpartyCommitmentSecrets_read
     */
    write(): Uint8Array;
    /**
     * Read a CounterpartyCommitmentSecrets from a byte array, created by CounterpartyCommitmentSecrets_write
     */
    static constructor_read(ser: Uint8Array): Result_CounterpartyCommitmentSecretsDecodeErrorZ;
}
