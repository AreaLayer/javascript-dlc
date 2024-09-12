import { CommonBase } from './CommonBase.mjs';
export declare class BigEndianScalar extends CommonBase {
    /** The bytes of the scalar value, in big endian */
    scalar_bytes: Uint8Array;
    static constructor_new(scalar_bytes: Uint8Array): BigEndianScalar;
}
