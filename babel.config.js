/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['.'],
          alias: {
            components: './src/components',
            data: './src/data',
            models: './src/models',
            screens: './src/screens',
            utils: './src/utils',
            styles: './src/styles',
            store: './src/store',
            assets: './src/assets',
            hooks: './src/hooks',
            '@env': './src/env.js',
          },
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};
