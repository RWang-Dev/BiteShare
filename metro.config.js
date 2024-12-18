const { getDefaultConfig } = require("expo/metro-config");

const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.resolver.assetExts.push("svg");
defaultConfig.transformer.svgAssetPlugin = "@svgr/webpack";

module.exports = defaultConfig;
