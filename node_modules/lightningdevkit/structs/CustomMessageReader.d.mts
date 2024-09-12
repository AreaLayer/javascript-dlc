import { Result_COption_TypeZDecodeErrorZ } from '../structs/Result_COption_TypeZDecodeErrorZ.mjs';
import { CommonBase } from './CommonBase.mjs';
/** An implementation of CustomMessageReader */
export interface CustomMessageReaderInterface {
    /**Decodes a custom message to `CustomMessageType`. If the given message type is known to the
     * implementation and the message could be decoded, must return `Ok(Some(message))`. If the
     * message type is unknown to the implementation, must return `Ok(None)`. If a decoding error
     * occur, must return `Err(DecodeError::X)` where `X` details the encountered error.
     */
    read(message_type: number, buffer: Uint8Array): Result_COption_TypeZDecodeErrorZ;
}
/**
 * Trait to be implemented by custom message (unrelated to the channel/gossip LN layers)
 * decoders.
 */
export declare class CustomMessageReader extends CommonBase {
    /** Creates a new instance of CustomMessageReader from a given implementation */
    static new_impl(arg: CustomMessageReaderInterface): CustomMessageReader;
    /**
     * Decodes a custom message to `CustomMessageType`. If the given message type is known to the
     * implementation and the message could be decoded, must return `Ok(Some(message))`. If the
     * message type is unknown to the implementation, must return `Ok(None)`. If a decoding error
     * occur, must return `Err(DecodeError::X)` where `X` details the encountered error.
     */
    read(message_type: number, buffer: Uint8Array): Result_COption_TypeZDecodeErrorZ;
}
