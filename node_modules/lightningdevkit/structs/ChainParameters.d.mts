import { Network } from '../enums/Network.mjs';
import { BestBlock } from '../structs/BestBlock.mjs';
import { CommonBase } from './CommonBase.mjs';
/**
 * Chain-related parameters used to construct a new `ChannelManager`.
 *
 * Typically, the block-specific parameters are derived from the best block hash for the network,
 * as a newly constructed `ChannelManager` will not have created any channels yet. These parameters
 * are not needed when deserializing a previously constructed `ChannelManager`.
 */
export declare class ChainParameters extends CommonBase {
    /**
     * The network for determining the `chain_hash` in Lightning messages.
     */
    get_network(): Network;
    /**
     * The network for determining the `chain_hash` in Lightning messages.
     */
    set_network(val: Network): void;
    /**
     * The hash and height of the latest block successfully connected.
     *
     * Used to track on-chain channel funding outputs and send payments with reliable timelocks.
     */
    get_best_block(): BestBlock;
    /**
     * The hash and height of the latest block successfully connected.
     *
     * Used to track on-chain channel funding outputs and send payments with reliable timelocks.
     */
    set_best_block(val: BestBlock): void;
    /**
     * Constructs a new ChainParameters given each field
     */
    static constructor_new(network_arg: Network, best_block_arg: BestBlock): ChainParameters;
    clone_ptr(): bigint;
    /**
     * Creates a copy of the ChainParameters
     */
    clone(): ChainParameters;
}
