import { CommonBase } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs';
export class BigEndianScalar extends CommonBase {
    /* @internal */
    constructor(_dummy, ptr) {
        super(ptr, bindings.BigEndianScalar_free);
        this.scalar_bytes = bindings.decodeUint8Array(bindings.BigEndianScalar_get_bytes(ptr));
    }
    static constructor_new(scalar_bytes) {
        return new BigEndianScalar(null, bindings.BigEndianScalar_new(bindings.encodeUint8Array(scalar_bytes)));
    }
}
//# sourceMappingURL=BigEndianScalar.mjs.map