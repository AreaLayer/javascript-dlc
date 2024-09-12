import { CommonBase } from './CommonBase.mjs';
/** An implementation of FutureCallback */
export interface FutureCallbackInterface {
    /**The method which is called.
     */
    call(): void;
}
/**
 * A callback which is called when a [`Future`] completes.
 *
 * Note that this MUST NOT call back into LDK directly, it must instead schedule actions to be
 * taken later. Rust users should use the [`std::future::Future`] implementation for [`Future`]
 * instead.
 *
 * Note that the [`std::future::Future`] implementation may only work for runtimes which schedule
 * futures when they receive a wake, rather than immediately executing them.
 */
export declare class FutureCallback extends CommonBase {
    /** Creates a new instance of FutureCallback from a given implementation */
    static new_impl(arg: FutureCallbackInterface): FutureCallback;
    /**
     * The method which is called.
     */
    call(): void;
}
