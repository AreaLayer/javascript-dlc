import { Result_CounterpartyForwardingInfoDecodeErrorZ } from '../structs/Result_CounterpartyForwardingInfoDecodeErrorZ.mjs';
import { CommonBase } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs';
/**
 * Information needed for constructing an invoice route hint for this channel.
 */
export class CounterpartyForwardingInfo extends CommonBase {
    /* @internal */
    constructor(_dummy, ptr) {
        super(ptr, bindings.CounterpartyForwardingInfo_free);
    }
    /**
     * Base routing fee in millisatoshis.
     */
    get_fee_base_msat() {
        const ret = bindings.CounterpartyForwardingInfo_get_fee_base_msat(this.ptr);
        return ret;
    }
    /**
     * Base routing fee in millisatoshis.
     */
    set_fee_base_msat(val) {
        bindings.CounterpartyForwardingInfo_set_fee_base_msat(this.ptr, val);
    }
    /**
     * Amount in millionths of a satoshi the channel will charge per transferred satoshi.
     */
    get_fee_proportional_millionths() {
        const ret = bindings.CounterpartyForwardingInfo_get_fee_proportional_millionths(this.ptr);
        return ret;
    }
    /**
     * Amount in millionths of a satoshi the channel will charge per transferred satoshi.
     */
    set_fee_proportional_millionths(val) {
        bindings.CounterpartyForwardingInfo_set_fee_proportional_millionths(this.ptr, val);
    }
    /**
     * The minimum difference in cltv_expiry between an ingoing HTLC and its outgoing counterpart,
     * such that the outgoing HTLC is forwardable to this counterparty. See `msgs::ChannelUpdate`'s
     * `cltv_expiry_delta` for more details.
     */
    get_cltv_expiry_delta() {
        const ret = bindings.CounterpartyForwardingInfo_get_cltv_expiry_delta(this.ptr);
        return ret;
    }
    /**
     * The minimum difference in cltv_expiry between an ingoing HTLC and its outgoing counterpart,
     * such that the outgoing HTLC is forwardable to this counterparty. See `msgs::ChannelUpdate`'s
     * `cltv_expiry_delta` for more details.
     */
    set_cltv_expiry_delta(val) {
        bindings.CounterpartyForwardingInfo_set_cltv_expiry_delta(this.ptr, val);
    }
    /**
     * Constructs a new CounterpartyForwardingInfo given each field
     */
    static constructor_new(fee_base_msat_arg, fee_proportional_millionths_arg, cltv_expiry_delta_arg) {
        const ret = bindings.CounterpartyForwardingInfo_new(fee_base_msat_arg, fee_proportional_millionths_arg, cltv_expiry_delta_arg);
        const ret_hu_conv = new CounterpartyForwardingInfo(null, ret);
        CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
        return ret_hu_conv;
    }
    clone_ptr() {
        const ret = bindings.CounterpartyForwardingInfo_clone_ptr(this.ptr);
        return ret;
    }
    /**
     * Creates a copy of the CounterpartyForwardingInfo
     */
    clone() {
        const ret = bindings.CounterpartyForwardingInfo_clone(this.ptr);
        const ret_hu_conv = new CounterpartyForwardingInfo(null, ret);
        CommonBase.add_ref_from(ret_hu_conv, this);
        return ret_hu_conv;
    }
    /**
     * Serialize the CounterpartyForwardingInfo object into a byte array which can be read by CounterpartyForwardingInfo_read
     */
    write() {
        const ret = bindings.CounterpartyForwardingInfo_write(this.ptr);
        const ret_conv = bindings.decodeUint8Array(ret);
        return ret_conv;
    }
    /**
     * Read a CounterpartyForwardingInfo from a byte array, created by CounterpartyForwardingInfo_write
     */
    static constructor_read(ser) {
        const ret = bindings.CounterpartyForwardingInfo_read(bindings.encodeUint8Array(ser));
        const ret_hu_conv = Result_CounterpartyForwardingInfoDecodeErrorZ.constr_from_ptr(ret);
        return ret_hu_conv;
    }
}
//# sourceMappingURL=CounterpartyForwardingInfo.mjs.map