const {
  withModuleFederationPlugin,
} = require("@angular-architects/module-federation/webpack");

module.exports = withModuleFederationPlugin({
  name: "oauth2-angular-app",
  exposes: { "./Routes": "./src/app/app.routes.ts" },
});
