module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  env: {
    dev: {
      presets: ["@vue/app"],
      plugins: ["@babel/plugin-syntax-dynamic-import"]
    },
    test: {
      presets: [
        [
          "env",
          {
            targets: {
              node: "current"
            }
          }
        ]
      ]
    }
  }
};
