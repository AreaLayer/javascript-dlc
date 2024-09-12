import { LockableScoreInterface } from '../structs/LockableScore.mjs';
import { CommonBase } from './CommonBase.mjs';
/** An implementation of WriteableScore */
export interface WriteableScoreInterface {
    /**Serialize the object into a byte array
     */
    write(): Uint8Array;
}
/**
 * Refers to a scorer that is accessible under lock and also writeable to disk
 *
 * We need this trait to be able to pass in a scorer to `lightning-background-processor` that will enable us to
 * use the Persister to persist it.
 */
export declare class WriteableScore extends CommonBase {
    /** Creates a new instance of WriteableScore from a given implementation */
    static new_impl(arg: WriteableScoreInterface, lockableScore_impl: LockableScoreInterface): WriteableScore;
    /**
     * Serialize the object into a byte array
     */
    write(): Uint8Array;
}
