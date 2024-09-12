import { ErrorAction } from '../structs/ErrorAction.mjs';
import { CommonBase } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs';
/**
 * An Err type for failure to process messages.
 */
export class LightningError extends CommonBase {
    /* @internal */
    constructor(_dummy, ptr) {
        super(ptr, bindings.LightningError_free);
    }
    /**
     * A human-readable message describing the error
     */
    get_err() {
        const ret = bindings.LightningError_get_err(this.ptr);
        const ret_conv = bindings.decodeString(ret);
        return ret_conv;
    }
    /**
     * A human-readable message describing the error
     */
    set_err(val) {
        bindings.LightningError_set_err(this.ptr, bindings.encodeString(val));
    }
    /**
     * The action which should be taken against the offending peer.
     */
    get_action() {
        const ret = bindings.LightningError_get_action(this.ptr);
        const ret_hu_conv = ErrorAction.constr_from_ptr(ret);
        CommonBase.add_ref_from(ret_hu_conv, this);
        return ret_hu_conv;
    }
    /**
     * The action which should be taken against the offending peer.
     */
    set_action(val) {
        bindings.LightningError_set_action(this.ptr, CommonBase.get_ptr_of(val));
    }
    /**
     * Constructs a new LightningError given each field
     */
    static constructor_new(err_arg, action_arg) {
        const ret = bindings.LightningError_new(bindings.encodeString(err_arg), CommonBase.get_ptr_of(action_arg));
        const ret_hu_conv = new LightningError(null, ret);
        CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
        return ret_hu_conv;
    }
    clone_ptr() {
        const ret = bindings.LightningError_clone_ptr(this.ptr);
        return ret;
    }
    /**
     * Creates a copy of the LightningError
     */
    clone() {
        const ret = bindings.LightningError_clone(this.ptr);
        const ret_hu_conv = new LightningError(null, ret);
        CommonBase.add_ref_from(ret_hu_conv, this);
        return ret_hu_conv;
    }
}
//# sourceMappingURL=LightningError.mjs.map