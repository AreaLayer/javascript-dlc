import { CommonBase } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs';
export class Result_NoneNoneZ extends CommonBase {
    constructor(_dummy, ptr) {
        super(ptr, bindings.CResult_NoneNoneZ_free);
    }
    /* @internal */
    static constr_from_ptr(ptr) {
        if (bindings.CResult_NoneNoneZ_is_ok(ptr)) {
            return new Result_NoneNoneZ_OK(null, ptr);
        }
        else {
            return new Result_NoneNoneZ_Err(null, ptr);
        }
    }
    /**
     * Creates a new CResult_NoneNoneZ in the success state.
     */
    static constructor_ok() {
        const ret = bindings.CResult_NoneNoneZ_ok();
        const ret_hu_conv = Result_NoneNoneZ.constr_from_ptr(ret);
        return ret_hu_conv;
    }
    /**
     * Creates a new CResult_NoneNoneZ in the error state.
     */
    static constructor_err() {
        const ret = bindings.CResult_NoneNoneZ_err();
        const ret_hu_conv = Result_NoneNoneZ.constr_from_ptr(ret);
        return ret_hu_conv;
    }
    /**
     * Checks if the given object is currently in the success state
     */
    is_ok() {
        const ret = bindings.CResult_NoneNoneZ_is_ok(this.ptr);
        return ret;
    }
    clone_ptr() {
        const ret = bindings.CResult_NoneNoneZ_clone_ptr(this.ptr);
        return ret;
    }
    /**
     * Creates a new CResult_NoneNoneZ which has the same data as `orig`
     * but with all dynamically-allocated buffers duplicated in new buffers.
     */
    clone() {
        const ret = bindings.CResult_NoneNoneZ_clone(this.ptr);
        const ret_hu_conv = Result_NoneNoneZ.constr_from_ptr(ret);
        return ret_hu_conv;
    }
}
export class Result_NoneNoneZ_OK extends Result_NoneNoneZ {
    /* @internal */
    constructor(_dummy, ptr) {
        super(_dummy, ptr);
    }
}
export class Result_NoneNoneZ_Err extends Result_NoneNoneZ {
    /* @internal */
    constructor(_dummy, ptr) {
        super(_dummy, ptr);
    }
}
//# sourceMappingURL=Result_NoneNoneZ.mjs.map