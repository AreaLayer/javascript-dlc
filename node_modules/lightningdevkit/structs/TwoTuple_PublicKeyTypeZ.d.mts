import { Type } from '../structs/Type.mjs';
import { CommonBase } from './CommonBase.mjs';
/**
 * A Tuple
 */
export declare class TwoTuple_PublicKeyTypeZ extends CommonBase {
    /**
     *
     */
    get_a(): Uint8Array;
    /**
     *
     */
    get_b(): Type;
    clone_ptr(): bigint;
    /**
     * Creates a new tuple which has the same data as `orig`
     * but with all dynamically-allocated buffers duplicated in new buffers.
     */
    clone(): TwoTuple_PublicKeyTypeZ;
    /**
     * Creates a new C2Tuple_PublicKeyTypeZ from the contained elements.
     */
    static constructor_new(a: Uint8Array, b: Type): TwoTuple_PublicKeyTypeZ;
}
