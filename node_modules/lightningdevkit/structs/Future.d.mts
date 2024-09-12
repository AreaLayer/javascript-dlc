import { FutureCallback } from '../structs/FutureCallback.mjs';
import { CommonBase } from './CommonBase.mjs';
/**
 * A simple future which can complete once, and calls some callback(s) when it does so.
 */
export declare class Future extends CommonBase {
    /**
     * Registers a callback to be called upon completion of this future. If the future has already
     * completed, the callback will be called immediately.
     */
    register_callback_fn(callback: FutureCallback): void;
}
