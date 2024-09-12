import { ErrorAction } from '../structs/ErrorAction.mjs';
import { CommonBase } from './CommonBase.mjs';
/**
 * An Err type for failure to process messages.
 */
export declare class LightningError extends CommonBase {
    /**
     * A human-readable message describing the error
     */
    get_err(): string;
    /**
     * A human-readable message describing the error
     */
    set_err(val: string): void;
    /**
     * The action which should be taken against the offending peer.
     */
    get_action(): ErrorAction;
    /**
     * The action which should be taken against the offending peer.
     */
    set_action(val: ErrorAction): void;
    /**
     * Constructs a new LightningError given each field
     */
    static constructor_new(err_arg: string, action_arg: ErrorAction): LightningError;
    clone_ptr(): bigint;
    /**
     * Creates a copy of the LightningError
     */
    clone(): LightningError;
}
