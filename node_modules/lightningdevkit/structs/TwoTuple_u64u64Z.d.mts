import { CommonBase } from './CommonBase.mjs';
/**
 * A Tuple
 */
export declare class TwoTuple_u64u64Z extends CommonBase {
    /**
     *
     */
    get_a(): bigint;
    /**
     *
     */
    get_b(): bigint;
    clone_ptr(): bigint;
    /**
     * Creates a new tuple which has the same data as `orig`
     * but with all dynamically-allocated buffers duplicated in new buffers.
     */
    clone(): TwoTuple_u64u64Z;
    /**
     * Creates a new C2Tuple_u64u64Z from the contained elements.
     */
    static constructor_new(a: bigint, b: bigint): TwoTuple_u64u64Z;
}
