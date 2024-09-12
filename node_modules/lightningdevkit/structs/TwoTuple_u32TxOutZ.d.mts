import { TxOut } from '../structs/TxOut.mjs';
import { CommonBase } from './CommonBase.mjs';
/**
 * A Tuple
 */
export declare class TwoTuple_u32TxOutZ extends CommonBase {
    /**
     *
     */
    get_a(): number;
    /**
     *
     */
    get_b(): TxOut;
    clone_ptr(): bigint;
    /**
     * Creates a new tuple which has the same data as `orig`
     * but with all dynamically-allocated buffers duplicated in new buffers.
     */
    clone(): TwoTuple_u32TxOutZ;
    /**
     * Creates a new C2Tuple_u32TxOutZ from the contained elements.
     */
    static constructor_new(a: number, b: TxOut): TwoTuple_u32TxOutZ;
}
