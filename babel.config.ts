module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'], // or 'module:metro-react-native-babel-preset'
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            components: './src/components',
            screens: './src/screens',
            assets: './src/assets',
            theme: './src/theme',
          },
        },
        '@babel/plugin-proposal-export-namespace-from',
        'react-native-reanimated/plugin',
      ],
    ],
  };
};
