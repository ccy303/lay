module.exports = function (api) {
  api.cache(true);
  const presets = [
    "@babel/react",
    [
      "@babel/preset-env",
      {
        targets: {
          ie: 11,
        },
        useBuiltIns: "usage",
        modules: false,
        corejs: { version: 3.8, proposals: true },
      },
    ],
  ];
  const plugins = [
    // "@babel/plugin-transform-runtime",
    // ["@babel/plugin-proposal-decorators", { legacy: true }],
    // "@babel/plugin-proposal-class-properties", // class的方法可以用箭头函数自动bind this
    // "@babel/plugin-proposal-nullish-coalescing-operator",
    // "@babel/plugin-proposal-optional-chaining",
    [
      "import",
      {
        libraryName: "antd",
        style: true,
      },
      "antd",
    ],
  ];
  const ignore = [
    (filename) => {
      if (/^(((?!node_modules).)*(js|jsx|ts|tsx))|(.*(node_modules).*(react-router.*|react.*|mobx.*|webpack.*).*(\.js)$)/.test(filename)) {
        // console.log("babel:", filename);
      }
      return !/^(((?!node_modules).)*(js|jsx|ts|tsx))|(.*(node_modules).*(react-router.*|react.*|mobx.*|webpack.*).*(\.js)$)/.test(filename);
    },
  ];
  return {
    presets,
    plugins,
    ignore,
    sourceType: "unambiguous",
  };
};
