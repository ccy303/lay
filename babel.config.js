module.exports = function (api) {
  api.cache(true);
  const presets = [
    "@babel/react",
    [
      "@babel/env",
      {
        modules: false,
        useBuiltIns: "usage",
        corejs: { version: 3, proposals: true },
      },
    ],
  ];
  const plugins = [
    ["@babel/plugin-proposal-decorators", { legacy: true }],
    "@babel/plugin-proposal-class-properties", // class的方法可以用箭头函数自动bind this
    "@babel/plugin-transform-runtime",
    "@babel/plugin-proposal-nullish-coalescing-operator",
    "@babel/plugin-proposal-optional-chaining",
    [
      "import",
      {
        libraryName: "antd",
        style: true,
      },
      "antd",
    ],
  ];
  const ignore = [(filename) => !/^(((?!node_modules).)*(js|jsx))|(.*(node_modules).*(aaa).*(\.js))$/.test(filename)];
  return {
    presets,
    plugins,
    ignore,
    sourceType: "unambiguous",
  };
};
