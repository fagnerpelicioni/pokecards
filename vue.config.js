/* eslint-disable import/no-extraneous-dependencies */

// Webpack
const webpack = require('webpack');

// Git Version
const GitRevisionPlugin = require('git-revision-webpack-plugin');

const gitRevisionPlugin = new GitRevisionPlugin();

module.exports = {
  pwa: {
    themeColor: '#64c250',
    name: 'Pokecards',
    msTileColor: '#64c250',
    appleMobileWebAppCapable: 'true',
    workboxPluginMode: 'InjectManifest',
    manifestOptions: {
      name: 'Pokecards',
      short_name: 'Pokecards',
      start_url: '/',
      display: 'standalone',
      theme_color: '#64c250',
      background_color: '#ffffff',
      description: 'Choose your Pokemon Card!',
      orientation: 'portrait',
    },
    workboxOptions: {
      swSrc: 'public/service-worker.js',
    },
  },
  configureWebpack: {
    plugins: [
      GitRevisionPlugin,
      new webpack.DefinePlugin({
        APP_VERSION: JSON.stringify(gitRevisionPlugin.version()),
      }),
    ],
    optimization: {
      splitChunks: {
        chunks: 'all',
        minSize: 9000,
        maxSize: 140000,
      },
    },
  },
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "@/assets/base/_colors.scss";
        @import "@/assets/base/_variables.scss";
        @import "@/assets/base/_breakpoints.scss";
        @import "@/assets/base/_mixins.scss";
        `,
      },
    },
  },
};
