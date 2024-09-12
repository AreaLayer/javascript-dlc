import { Result_CounterpartyForwardingInfoDecodeErrorZ } from '../structs/Result_CounterpartyForwardingInfoDecodeErrorZ.mjs';
import { CommonBase } from './CommonBase.mjs';
/**
 * Information needed for constructing an invoice route hint for this channel.
 */
export declare class CounterpartyForwardingInfo extends CommonBase {
    /**
     * Base routing fee in millisatoshis.
     */
    get_fee_base_msat(): number;
    /**
     * Base routing fee in millisatoshis.
     */
    set_fee_base_msat(val: number): void;
    /**
     * Amount in millionths of a satoshi the channel will charge per transferred satoshi.
     */
    get_fee_proportional_millionths(): number;
    /**
     * Amount in millionths of a satoshi the channel will charge per transferred satoshi.
     */
    set_fee_proportional_millionths(val: number): void;
    /**
     * The minimum difference in cltv_expiry between an ingoing HTLC and its outgoing counterpart,
     * such that the outgoing HTLC is forwardable to this counterparty. See `msgs::ChannelUpdate`'s
     * `cltv_expiry_delta` for more details.
     */
    get_cltv_expiry_delta(): number;
    /**
     * The minimum difference in cltv_expiry between an ingoing HTLC and its outgoing counterpart,
     * such that the outgoing HTLC is forwardable to this counterparty. See `msgs::ChannelUpdate`'s
     * `cltv_expiry_delta` for more details.
     */
    set_cltv_expiry_delta(val: number): void;
    /**
     * Constructs a new CounterpartyForwardingInfo given each field
     */
    static constructor_new(fee_base_msat_arg: number, fee_proportional_millionths_arg: number, cltv_expiry_delta_arg: number): CounterpartyForwardingInfo;
    clone_ptr(): bigint;
    /**
     * Creates a copy of the CounterpartyForwardingInfo
     */
    clone(): CounterpartyForwardingInfo;
    /**
     * Serialize the CounterpartyForwardingInfo object into a byte array which can be read by CounterpartyForwardingInfo_read
     */
    write(): Uint8Array;
    /**
     * Read a CounterpartyForwardingInfo from a byte array, created by CounterpartyForwardingInfo_write
     */
    static constructor_read(ser: Uint8Array): Result_CounterpartyForwardingInfoDecodeErrorZ;
}
