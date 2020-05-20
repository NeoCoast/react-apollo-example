module.exports = () => ({
  module: {
    rules: [
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: ['@svgr/webpack', 'url-loader?limit=10000&mimetype=image/svg+xml'],
      },
    ],
  },
});
