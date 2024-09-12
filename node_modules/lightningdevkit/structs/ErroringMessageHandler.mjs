import { MessageSendEventsProvider } from '../structs/MessageSendEventsProvider.mjs';
import { ChannelMessageHandler } from '../structs/ChannelMessageHandler.mjs';
import { CommonBase } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs';
/**
 * A dummy struct which implements `ChannelMessageHandler` without having any channels.
 * You can provide one of these as the route_handler in a MessageHandler.
 */
export class ErroringMessageHandler extends CommonBase {
    /* @internal */
    constructor(_dummy, ptr) {
        super(ptr, bindings.ErroringMessageHandler_free);
    }
    /**
     * Constructs a new ErroringMessageHandler
     */
    static constructor_new() {
        const ret = bindings.ErroringMessageHandler_new();
        const ret_hu_conv = new ErroringMessageHandler(null, ret);
        CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
        return ret_hu_conv;
    }
    /**
     * Constructs a new MessageSendEventsProvider which calls the relevant methods on this_arg.
     * This copies the `inner` pointer in this_arg and thus the returned MessageSendEventsProvider must be freed before this_arg is
     */
    as_MessageSendEventsProvider() {
        const ret = bindings.ErroringMessageHandler_as_MessageSendEventsProvider(this.ptr);
        const ret_hu_conv = new MessageSendEventsProvider(null, ret);
        CommonBase.add_ref_from(ret_hu_conv, this);
        return ret_hu_conv;
    }
    /**
     * Constructs a new ChannelMessageHandler which calls the relevant methods on this_arg.
     * This copies the `inner` pointer in this_arg and thus the returned ChannelMessageHandler must be freed before this_arg is
     */
    as_ChannelMessageHandler() {
        const ret = bindings.ErroringMessageHandler_as_ChannelMessageHandler(this.ptr);
        const ret_hu_conv = new ChannelMessageHandler(null, ret);
        CommonBase.add_ref_from(ret_hu_conv, this);
        return ret_hu_conv;
    }
}
//# sourceMappingURL=ErroringMessageHandler.mjs.map