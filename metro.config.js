const blacklist = require('metro-config/src/defaults/exclusionList');

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
  resolver: {
    assetExts: ['bin', 'txt', 'jpg', 'ttf', 'png'],
    sourceExts: ['js', 'json', 'ts', 'tsx', 'jsx'],
    exclusionListRE: blacklist([/platform_node/])
  },
};