"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.default = void 0;
var _assetPathUtils = _interopRequireDefault(require("./assetPathUtils"));
var _path = _interopRequireDefault(require("path"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : { default: e };
}
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

function getAssetDestPathAndroid(asset, scale) {
  const androidFolder = _assetPathUtils.default.getAndroidResourceFolderName(
    asset,
    scale
  );
  const fileName = _assetPathUtils.default.getResourceIdentifier(asset);
  return _path.default.join(androidFolder, `${fileName}.${asset.type}`);
}
var _default = (exports.default = getAssetDestPathAndroid);
