// craco.config.js
module.exports = {
    webpack: {
      configure: {
        output: {
          filename: 'static/js/main.js',
          chunkFilename: 'static/js/[name].chunk.js',
        },
      },
    },
    style: {
      postcss: {
        plugins: [
          require('postcss-nested'),
          require('postcss-custom-properties'),
          require('autoprefixer'),
        ],
      },
    },
    plugins: [
      {
        plugin: {
          overrideWebpackConfig: ({ webpackConfig }) => {
            // Configuración para el nombre fijo del archivo CSS
            webpackConfig.plugins.forEach((plugin) => {
              if (plugin.constructor.name === 'MiniCssExtractPlugin') {
                plugin.options.filename = 'static/css/main.css';
              }
            });
            return webpackConfig;
          },
        },
        options: {},
      },
    ],
  };
  