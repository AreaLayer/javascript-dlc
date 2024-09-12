import { CommonBase } from './CommonBase.mjs';
/**
 * A Tuple
 */
export declare class TwoTuple_usizeTransactionZ extends CommonBase {
    /**
     *
     */
    get_a(): number;
    /**
     *
     */
    get_b(): Uint8Array;
    clone_ptr(): bigint;
    /**
     * Creates a new tuple which has the same data as `orig`
     * but with all dynamically-allocated buffers duplicated in new buffers.
     */
    clone(): TwoTuple_usizeTransactionZ;
    /**
     * Creates a new C2Tuple_usizeTransactionZ from the contained elements.
     */
    static constructor_new(a: number, b: Uint8Array): TwoTuple_usizeTransactionZ;
}
