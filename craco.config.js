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
  };
  