export const environment = {
  production: true,
  apiBaseUrl: 'https://people-dev.clarium.tech/ssoapi',
  remotes: {
    lms: 'https://people-dev.clarium.tech/lmsui/remoteEntry.js',
    tms: 'https://people-dev.clarium.tech/tmsui/remoteEntry.js',
    ems: 'https://people-dev.clarium.tech/emsui/remoteEntry.js',
    rrf: 'https://people-dev.clarium.tech/rrfui/remoteEntry.js',
    pm: 'https://people-dev.clarium.tech/pmui/remoteEntry.js',
  },
};

// export const environment = {
//   production: false,
//   apiBaseUrl: 'http://localhost:8080/ssoapi',
//   remotes: {
//     lms: 'http://localhost:4200/remoteEntry.js',
//     tms: 'http://localhost:4201/remoteEntry.js',
//     ems: 'http://localhost:4202/remoteEntry.js',
//     rrf: 'http://localhost:4203/remoteEntry.js',
//     pm: 'http://localhost:4204/remoteEntry.js',
//   },
// };
