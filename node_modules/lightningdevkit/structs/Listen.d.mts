import { TwoTuple_usizeTransactionZ } from '../structs/TwoTuple_usizeTransactionZ.mjs';
import { CommonBase } from './CommonBase.mjs';
/** An implementation of Listen */
export interface ListenInterface {
    /**Notifies the listener that a block was added at the given height, with the transaction data
     * possibly filtered.
     */
    filtered_block_connected(header: Uint8Array, txdata: TwoTuple_usizeTransactionZ[], height: number): void;
    /**Notifies the listener that a block was added at the given height.
     */
    block_connected(block: Uint8Array, height: number): void;
    /**Notifies the listener that a block was removed at the given height.
     */
    block_disconnected(header: Uint8Array, height: number): void;
}
/**
 * The `Listen` trait is used to notify when blocks have been connected or disconnected from the
 * chain.
 *
 * Useful when needing to replay chain data upon startup or as new chain events occur. Clients
 * sourcing chain data using a block-oriented API should prefer this interface over [`Confirm`].
 * Such clients fetch the entire header chain whereas clients using [`Confirm`] only fetch headers
 * when needed.
 *
 * By using [`Listen::filtered_block_connected`] this interface supports clients fetching the
 * entire header chain and only blocks with matching transaction data using BIP 157 filters or
 * other similar filtering.
 */
export declare class Listen extends CommonBase {
    /** Creates a new instance of Listen from a given implementation */
    static new_impl(arg: ListenInterface): Listen;
    /**
     * Notifies the listener that a block was added at the given height, with the transaction data
     * possibly filtered.
     */
    filtered_block_connected(header: Uint8Array, txdata: TwoTuple_usizeTransactionZ[], height: number): void;
    /**
     * Notifies the listener that a block was added at the given height.
     */
    block_connected(block: Uint8Array, height: number): void;
    /**
     * Notifies the listener that a block was removed at the given height.
     */
    block_disconnected(header: Uint8Array, height: number): void;
}
