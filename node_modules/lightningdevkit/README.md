LDK Java, C#, and TypeScript Bindings
=====================================

This repo contains an autogeneration system to generate LDK bindings for garbage-collected languages, currently including Java, C#, and TypeScript. See below for the current status of the bindings.

The auto-generated code contains copies of the Rust documentation, which can also be viewed at
[docs.rs/lightning](https://docs.rs/lightning). High-level documentation of the API can be found at
[lightningdevkit.org](https://lightningdevkit.org).

API Mappings
============

As the bindings are auto-generated, they often read fairly verbose with lots of additional type
information compared to what might be expected with a native interface. A brief understanding of
some Rust nomenclature will help read bindings:

## `Result`

Rust APIs make heavy use of the `Result` enum. They can either be in an `Ok` state, with an
optional value or an `Err` state, with an optional error value. These often appear as
`Result_OKValueTypeErrValueTypeZ` in bindings. Subclasses are build for the `Ok` and `Err` states,
with the appropriate values available in the subclasses which all instances will be of.

## `Option`

Similar to `Result`, Rust APIs make heavy use of the `Option` enum. Like `Result`, they may contain
a value in the `Some` state, but may contain no value in the `None` state. They are mapped
similarly to `Result`s, usually as `Option_SomeValueTypeZ`.

## Tuples

Rust APIs occasionally use tuples, which are simply mapped as a tuple type like
`TwoTuple_FirstValueTypeSecondValueTypeZ`. Individual elements can be fetched or set with `get_a()`,
`get_b()`, `set_a(..)`, etc.

## Tuple Types

Rust APIs occasionally build structs which are simply a named tuple type. These appear in rust as,
eg, `struct PrintableString(String)`, and in the bindings as simply the class name (eg
`class PrintableString`). The value(s) in the tuple can be fetched or set with `get_a()`,
`get_b()`, `set_a(..)`, etc.

Building
========

The releases for Java, C#, and TypeScript are all deterministic. You should be able to reproduce
the release binaries identically by running the scripts run in CI, see
[.github/workflows/build.yml](.github/workflows/build.yml).

Releases for all platforma re built on Linux as that is the easiest way to get things
deterministic, however building on macOS should also work. Building on Windows is not currently
supported.

Status
======

## Java

The Java bindings are relatively mature, and should be considered safe for production use. Still,
as they have relatively few users, unexpected issues remain possible, and bug reports are welcome.

## TypeScript

The TypeScript bindings are functionally complete, but should be considered beta quality. As there
are relatively few users, unexpected issues remain likely, and bug reports are welcome.

The TypeScript bindings require modern web standards, including support for `FinalizationRegistry`
and `WeakRef` (Chrome 84, Firefox 79, Safari 14.1/iOS 14.5 and Node 14.6) and WASM BigInt support
(Chrome 85, Firefox 78, Safari 14.1/iOS 14.5, and Node 15.0).

For users of Node.JS environments you may wish to use the `lightningdevkit-node-net` package as
well to implement the required network handling to bridge the `lightningdevkit` package's
`SocketDescriptor` interface to Node.JS TCP Sockets. For those wishing to run a lightning node in
the browser you will need to provide your own bridge from `SocketDescriptor` to a WebSocket proxy.

# C#

The C# bindings are functionally complete, but should be considered beta quality. As they are
relatively new, unexpected issues remain possible, and bug reports are welcome.

## General

The only known issue resulting in a use-after-free bug requires custom a custom ChannelKeys instance
created as a part of a new channel. After the channel is created, the ChannelKeys object will not
be freed while the parent ChannelManager exists, however if the ChannelManager is garbage collected
while a ChannelMonitor object which is associated with the same channel exists, a use-after-free bug
may occur. This issue should be relatively rare as uses where a ChannelManager is removed while
associated ChannelMonitors exist is not anticipated.
