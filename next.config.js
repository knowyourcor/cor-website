module.exports = {
  future: {
    webpack5: true,
  },
  webpack: (config) => {
    // load worker files as a urls with `file-loader`
    config.module.rules.unshift({
      test: /pdf\.worker\.(min\.)?js/,
      use: [
        {
          loader: "file-loader",
          options: {
            name: "[contenthash].[ext]",
            publicPath: "_next/static/worker",
            outputPath: "static/worker",
          },
        },
      ],
    });

    return config;
  },
  async redirects() {
    return [
      {
        source: "/homepage",
        destination: "/",
        permanent: false,
      },
      {
        source: "/shop",
        destination: "https://shop.thecor.com/products/cor-pioneer?_ga=2.118826441.1364353575.1649026903-1546752094.1648774141",
        permanent: false,
      },
      {
        source: "/invest",
        destination: "https://wefunder.com/cor",
        permanent: true,
      },
    ];
  },
};
