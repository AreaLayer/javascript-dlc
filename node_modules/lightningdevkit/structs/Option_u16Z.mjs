import { CommonBase } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs';
/**
 * An enum which can either contain a u16 or not
 */
export class Option_u16Z extends CommonBase {
    constructor(_dummy, ptr) { super(ptr, bindings.COption_u16Z_free); }
    /* @internal */
    static constr_from_ptr(ptr) {
        const raw_ty = bindings.LDKCOption_u16Z_ty_from_ptr(ptr);
        switch (raw_ty) {
            case 0: return new Option_u16Z_Some(ptr);
            case 1: return new Option_u16Z_None(ptr);
            default:
                throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
        }
    }
    /**
     * Constructs a new COption_u16Z containing a u16
     */
    static constructor_some(o) {
        const ret = bindings.COption_u16Z_some(o);
        const ret_hu_conv = Option_u16Z.constr_from_ptr(ret);
        CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
        return ret_hu_conv;
    }
    /**
     * Constructs a new COption_u16Z containing nothing
     */
    static constructor_none() {
        const ret = bindings.COption_u16Z_none();
        const ret_hu_conv = Option_u16Z.constr_from_ptr(ret);
        CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
        return ret_hu_conv;
    }
    clone_ptr() {
        const ret = bindings.COption_u16Z_clone_ptr(this.ptr);
        return ret;
    }
    /**
     * Creates a new COption_u16Z which has the same data as `orig`
     * but with all dynamically-allocated buffers duplicated in new buffers.
     */
    clone() {
        const ret = bindings.COption_u16Z_clone(this.ptr);
        const ret_hu_conv = Option_u16Z.constr_from_ptr(ret);
        CommonBase.add_ref_from(ret_hu_conv, this);
        return ret_hu_conv;
    }
}
/** A Option_u16Z of type Some */
export class Option_u16Z_Some extends Option_u16Z {
    /* @internal */
    constructor(ptr) {
        super(null, ptr);
        this.some = bindings.LDKCOption_u16Z_Some_get_some(ptr);
    }
}
/** A Option_u16Z of type None */
export class Option_u16Z_None extends Option_u16Z {
    /* @internal */
    constructor(ptr) {
        super(null, ptr);
    }
}
//# sourceMappingURL=Option_u16Z.mjs.map