module.exports = {
  source: ["./app/tokens.json"],
  platforms: {
    css: {
      transformGroup: "css",
      buildPath: "app/styles/",
      files: [
        {
          destination: "variables.css",
          format: "css/variables",
        },
      ],
    },
  },
};
