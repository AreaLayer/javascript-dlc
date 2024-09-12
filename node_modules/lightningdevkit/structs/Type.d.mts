import { CommonBase } from './CommonBase.mjs';
/** An implementation of Type */
export interface TypeInterface {
    /**Returns the type identifying the message payload.
     */
    type_id(): number;
    /**Return a human-readable "debug" string describing this object
     */
    debug_str(): string;
    /**Serialize the object into a byte array
     */
    write(): Uint8Array;
}
/**
 * Defines a type identifier for sending messages over the wire.
 *
 * Messages implementing this trait specify a type and must be [`Writeable`].
 */
export declare class Type extends CommonBase {
    /** Creates a new instance of Type from a given implementation */
    static new_impl(arg: TypeInterface): Type;
    /**
     * Returns the type identifying the message payload.
     */
    type_id(): number;
    /**
     * Return a human-readable "debug" string describing this object
     */
    debug_str(): string;
    /**
     * Serialize the object into a byte array
     */
    write(): Uint8Array;
    clone_ptr(): bigint;
    /**
     * Creates a copy of a Type
     */
    clone(): Type;
}
