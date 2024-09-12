import { CommonBase } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs';
export class TxOut extends CommonBase {
    /* @internal */
    constructor(_dummy, ptr) {
        super(ptr, bindings.TxOut_free);
        this.script_pubkey = bindings.decodeUint8Array(bindings.TxOut_get_script_pubkey(ptr));
        this.value = bindings.TxOut_get_value(ptr);
    }
    static constructor_new(value, script_pubkey) {
        return new TxOut(null, bindings.TxOut_new(bindings.encodeUint8Array(script_pubkey), value));
    }
}
//# sourceMappingURL=TxOut.mjs.map