const {
  withModuleFederationPlugin,
  shareAll,
} = require("@angular-architects/module-federation/webpack");

module.exports = withModuleFederationPlugin({
  name: "oauth2-angular-app",
  remotes: {
    reactRemote: "reactRemote@http://localhost:4201/remoteEntry.js",
    empRemote: "empRemote@http://localhost:4202/remoteEntry.js",
    "leave-management-system":
      "leave-management-system@http://localhost:4200/remoteEntry.js",
    "resource-requisition-form":
      "lresource-requisition-form@http://localhost:4203/remoteEntry.js",
  },
  shared: {
    ...shareAll({
      singleton: true,
      strictVersion: true,
      requiredVersion: "auto",
    }),
    "@clarium/ngce-components": { singleton: true, strictVersion: true },
    "@clarium/ngce-icon": { singleton: true, strictVersion: true },
    "@clarium/ngce-charts": { singleton: true, strictVersion: true },
    "@clarium/ezui-blocks": { singleton: true, strictVersion: true },

    react: {
      singleton: true,
      strictVersion: true,
      requiredVersion: "19.2.0",
    },
    "react-dom": {
      singleton: true,
      strictVersion: true,
      requiredVersion: "19.2.0",
    },
    "react-router-dom": {
      singleton: true,
      strictVersion: true,
    },
  },
});
