import { PaymentSendFailure } from '../structs/PaymentSendFailure.mjs';
import { CommonBase } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs';
export class Result_NonePaymentSendFailureZ extends CommonBase {
    constructor(_dummy, ptr) {
        super(ptr, bindings.CResult_NonePaymentSendFailureZ_free);
    }
    /* @internal */
    static constr_from_ptr(ptr) {
        if (bindings.CResult_NonePaymentSendFailureZ_is_ok(ptr)) {
            return new Result_NonePaymentSendFailureZ_OK(null, ptr);
        }
        else {
            return new Result_NonePaymentSendFailureZ_Err(null, ptr);
        }
    }
    /**
     * Creates a new CResult_NonePaymentSendFailureZ in the success state.
     */
    static constructor_ok() {
        const ret = bindings.CResult_NonePaymentSendFailureZ_ok();
        const ret_hu_conv = Result_NonePaymentSendFailureZ.constr_from_ptr(ret);
        return ret_hu_conv;
    }
    /**
     * Creates a new CResult_NonePaymentSendFailureZ in the error state.
     */
    static constructor_err(e) {
        const ret = bindings.CResult_NonePaymentSendFailureZ_err(CommonBase.get_ptr_of(e));
        const ret_hu_conv = Result_NonePaymentSendFailureZ.constr_from_ptr(ret);
        return ret_hu_conv;
    }
    /**
     * Checks if the given object is currently in the success state
     */
    is_ok() {
        const ret = bindings.CResult_NonePaymentSendFailureZ_is_ok(this.ptr);
        return ret;
    }
    clone_ptr() {
        const ret = bindings.CResult_NonePaymentSendFailureZ_clone_ptr(this.ptr);
        return ret;
    }
    /**
     * Creates a new CResult_NonePaymentSendFailureZ which has the same data as `orig`
     * but with all dynamically-allocated buffers duplicated in new buffers.
     */
    clone() {
        const ret = bindings.CResult_NonePaymentSendFailureZ_clone(this.ptr);
        const ret_hu_conv = Result_NonePaymentSendFailureZ.constr_from_ptr(ret);
        return ret_hu_conv;
    }
}
export class Result_NonePaymentSendFailureZ_OK extends Result_NonePaymentSendFailureZ {
    /* @internal */
    constructor(_dummy, ptr) {
        super(_dummy, ptr);
    }
}
export class Result_NonePaymentSendFailureZ_Err extends Result_NonePaymentSendFailureZ {
    /* @internal */
    constructor(_dummy, ptr) {
        super(_dummy, ptr);
        const err = bindings.CResult_NonePaymentSendFailureZ_get_err(ptr);
        const err_hu_conv = PaymentSendFailure.constr_from_ptr(err);
        CommonBase.add_ref_from(err_hu_conv, this);
        this.err = err_hu_conv;
    }
}
//# sourceMappingURL=Result_NonePaymentSendFailureZ.mjs.map