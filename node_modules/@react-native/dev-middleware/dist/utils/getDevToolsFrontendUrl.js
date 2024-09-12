"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.default = getDevToolsFrontendUrl;
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 * @format
 * @oncall react_native
 */

/**
 * Get the DevTools frontend URL to debug a given React Native CDP target.
 */
function getDevToolsFrontendUrl(
  experiments,
  webSocketDebuggerUrl,
  devServerUrl,
  options
) {
  const wsParam = getWsParam({
    webSocketDebuggerUrl,
    devServerUrl,
  });
  const appUrl =
    (options?.relative === true ? "" : devServerUrl) +
    "/debugger-frontend/" +
    (options?.useFuseboxEntryPoint === true
      ? "rn_fusebox.html"
      : "rn_inspector.html");
  const searchParams = new URLSearchParams([
    [wsParam.key, wsParam.value],
    ["sources.hide_add_folder", "true"],
  ]);
  if (experiments.enableNetworkInspector) {
    searchParams.append("unstable_enableNetworkPanel", "true");
  }
  if (
    options?.useFuseboxEntryPoint === true &&
    experiments.useFuseboxInternalBranding
  ) {
    searchParams.append("unstable_useInternalBranding", "true");
  }
  if (options?.launchId != null && options.launchId !== "") {
    searchParams.append("launchId", options.launchId);
  }
  return appUrl + "?" + searchParams.toString();
}
function getWsParam({ webSocketDebuggerUrl, devServerUrl }) {
  const wsUrl = new URL(webSocketDebuggerUrl);
  const serverHost = new URL(devServerUrl).host;
  let value;
  if (wsUrl.host === serverHost) {
    // Use a path-absolute (host-relative) URL
    // Depends on https://github.com/facebookexperimental/rn-chrome-devtools-frontend/pull/4
    value = wsUrl.pathname + wsUrl.search + wsUrl.hash;
  } else {
    // Standard URL format accepted by the DevTools frontend
    value = wsUrl.host + wsUrl.pathname + wsUrl.search + wsUrl.hash;
  }
  const key = wsUrl.protocol.slice(0, -1);
  return {
    key,
    value,
  };
}
