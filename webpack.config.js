const {
  withModuleFederationPlugin,
  shareAll,
} = require("@angular-architects/module-federation/webpack");

module.exports = withModuleFederationPlugin({
  name: "oauth2-angular-app",
  remotes: {
    reactRemote: `reactRemote@http://localhost:4201/remoteEntry.js`,
    empRemote: "empRemote@http://localhost:4202/remoteEntry.js",
    "leave-management-system":
      "leave-management-system@http://localhost:4200/remoteEntry.js",
    "resource-requisition-form":
      "resource-requisition-form@http://localhost:4203/remoteEntry.js",
  },
  shared: {
    ...shareAll({
      singleton: false,
      strictVersion: false,
      requiredVersion: false,
    }),
    "@clarium/ngce-components": {
      singleton: true,
      strictVersion: false,
      requiredVersion: false,
    },
    "@clarium/ngce-icon": {
      singleton: true,
      strictVersion: false,
      requiredVersion: false,
    },
    "@clarium/ngce-charts": {
      singleton: true,
      strictVersion: false,
      requiredVersion: false,
    },
    "@clarium/ezui-blocks": {
      singleton: true,
      strictVersion: false,
      requiredVersion: false,
    },

    react: {
      singleton: true,
      strictVersion: false,
      requiredVersion: false,
    },
    "react-dom": {
      singleton: true,
      strictVersion: false,
      requiredVersion: false,
    },
    "react-router-dom": {
      singleton: true,
      strictVersion: false,
      requiredVersion: false,
    },
  },
});
