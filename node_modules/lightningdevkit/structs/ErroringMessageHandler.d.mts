import { MessageSendEventsProvider } from '../structs/MessageSendEventsProvider.mjs';
import { ChannelMessageHandler } from '../structs/ChannelMessageHandler.mjs';
import { CommonBase } from './CommonBase.mjs';
/**
 * A dummy struct which implements `ChannelMessageHandler` without having any channels.
 * You can provide one of these as the route_handler in a MessageHandler.
 */
export declare class ErroringMessageHandler extends CommonBase {
    /**
     * Constructs a new ErroringMessageHandler
     */
    static constructor_new(): ErroringMessageHandler;
    /**
     * Constructs a new MessageSendEventsProvider which calls the relevant methods on this_arg.
     * This copies the `inner` pointer in this_arg and thus the returned MessageSendEventsProvider must be freed before this_arg is
     */
    as_MessageSendEventsProvider(): MessageSendEventsProvider;
    /**
     * Constructs a new ChannelMessageHandler which calls the relevant methods on this_arg.
     * This copies the `inner` pointer in this_arg and thus the returned ChannelMessageHandler must be freed before this_arg is
     */
    as_ChannelMessageHandler(): ChannelMessageHandler;
}
