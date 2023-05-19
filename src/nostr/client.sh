//Open channel with Nostr
nostr open --node-uri <node_uri> --funding-amount <funding_amount> --push-amount <push_amount>
//Example funding channel
nostr open --node-uri 03abcdef... --funding-amount 1000000 --push-amount 0
//Close channel with Nostr
nostr close --channel-id <channel_id>
//Example closing channel
nostr close --channel-id 0123456789abcdef
