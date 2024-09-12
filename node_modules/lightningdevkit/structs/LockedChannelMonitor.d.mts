import { CommonBase } from './CommonBase.mjs';
/**
 * This type represents a lock and MUST BE MANUALLY FREE'd!
 * A read-only reference to a current ChannelMonitor.
 *
 * Note that this holds a mutex in [`ChainMonitor`] and may block other events until it is
 * released.
 */
export declare class LockedChannelMonitor extends CommonBase {
    /** Releases this lock */
    free(): void;
}
