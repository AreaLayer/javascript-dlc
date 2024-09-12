import { MonitorEvent } from '../structs/MonitorEvent.mjs';
import { CommonBase } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs';
/**
 * An enum which can either contain a crate::lightning::chain::channelmonitor::MonitorEvent or not
 */
export class Option_MonitorEventZ extends CommonBase {
    constructor(_dummy, ptr) { super(ptr, bindings.COption_MonitorEventZ_free); }
    /* @internal */
    static constr_from_ptr(ptr) {
        const raw_ty = bindings.LDKCOption_MonitorEventZ_ty_from_ptr(ptr);
        switch (raw_ty) {
            case 0: return new Option_MonitorEventZ_Some(ptr);
            case 1: return new Option_MonitorEventZ_None(ptr);
            default:
                throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
        }
    }
    /**
     * Constructs a new COption_MonitorEventZ containing a crate::lightning::chain::channelmonitor::MonitorEvent
     */
    static constructor_some(o) {
        const ret = bindings.COption_MonitorEventZ_some(CommonBase.get_ptr_of(o));
        const ret_hu_conv = Option_MonitorEventZ.constr_from_ptr(ret);
        CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
        return ret_hu_conv;
    }
    /**
     * Constructs a new COption_MonitorEventZ containing nothing
     */
    static constructor_none() {
        const ret = bindings.COption_MonitorEventZ_none();
        const ret_hu_conv = Option_MonitorEventZ.constr_from_ptr(ret);
        CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
        return ret_hu_conv;
    }
    clone_ptr() {
        const ret = bindings.COption_MonitorEventZ_clone_ptr(this.ptr);
        return ret;
    }
    /**
     * Creates a new COption_MonitorEventZ which has the same data as `orig`
     * but with all dynamically-allocated buffers duplicated in new buffers.
     */
    clone() {
        const ret = bindings.COption_MonitorEventZ_clone(this.ptr);
        const ret_hu_conv = Option_MonitorEventZ.constr_from_ptr(ret);
        CommonBase.add_ref_from(ret_hu_conv, this);
        return ret_hu_conv;
    }
}
/** A Option_MonitorEventZ of type Some */
export class Option_MonitorEventZ_Some extends Option_MonitorEventZ {
    /* @internal */
    constructor(ptr) {
        super(null, ptr);
        const some = bindings.LDKCOption_MonitorEventZ_Some_get_some(ptr);
        const some_hu_conv = MonitorEvent.constr_from_ptr(some);
        CommonBase.add_ref_from(some_hu_conv, this);
        this.some = some_hu_conv;
    }
}
/** A Option_MonitorEventZ of type None */
export class Option_MonitorEventZ_None extends Option_MonitorEventZ {
    /* @internal */
    constructor(ptr) {
        super(null, ptr);
    }
}
//# sourceMappingURL=Option_MonitorEventZ.mjs.map