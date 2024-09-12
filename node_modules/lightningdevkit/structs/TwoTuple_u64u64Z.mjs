import { CommonBase } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs';
/**
 * A Tuple
 */
export class TwoTuple_u64u64Z extends CommonBase {
    /* @internal */
    constructor(_dummy, ptr) {
        super(ptr, bindings.C2Tuple_u64u64Z_free);
    }
    /**
     *
     */
    get_a() {
        const ret = bindings.C2Tuple_u64u64Z_get_a(this.ptr);
        return ret;
    }
    /**
     *
     */
    get_b() {
        const ret = bindings.C2Tuple_u64u64Z_get_b(this.ptr);
        return ret;
    }
    clone_ptr() {
        const ret = bindings.C2Tuple_u64u64Z_clone_ptr(this.ptr);
        return ret;
    }
    /**
     * Creates a new tuple which has the same data as `orig`
     * but with all dynamically-allocated buffers duplicated in new buffers.
     */
    clone() {
        const ret = bindings.C2Tuple_u64u64Z_clone(this.ptr);
        const ret_hu_conv = new TwoTuple_u64u64Z(null, ret);
        CommonBase.add_ref_from(ret_hu_conv, this);
        return ret_hu_conv;
    }
    /**
     * Creates a new C2Tuple_u64u64Z from the contained elements.
     */
    static constructor_new(a, b) {
        const ret = bindings.C2Tuple_u64u64Z_new(a, b);
        const ret_hu_conv = new TwoTuple_u64u64Z(null, ret);
        CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
        return ret_hu_conv;
    }
}
//# sourceMappingURL=TwoTuple_u64u64Z.mjs.map