import {Keys, Npub, Nsec} from 'nostr-tools';

export const NSEC_KEY_PREFIX = 'NSEC3';
export const NSEC_KEY_PREFIX_LENGTH = NSEC_KEY_PREFIX.length;

const NSEC_KEY_LENGTH = 16;
const NSEC_KEY_LENGTH_BYTES = NSEC_KEY_LENGTH / 8;
const Npub_LENGTH = 32;

const relays = {
    'wss://relay.damus.io': 'wss://relay.damus.io',
    'wss://relay.nostr.info': 'wss://relay.nostr.info',
    'wss://nostr.bitcoiner.social': 'wss://nostr.bitcoiner.social',
    'wss://nostr.fmt.wiz.biz': 'wss://nostr.fmt.wiz.biz',
    'wss://nostr.mom': 'wss://nostr.mom',
    'wss://nostr.mom.cat': 'wss://nostr.mom.cat',
    'wss://nostr.mom.cat': 'wss://nostr.mom.cat',
    'wss://nostr.mom.cat': 'wss://nostr.mom.cat',
    'wss://nostr.mom.cat': 'wss://nostr.mom.cat',
}