/* eslint-disable max-len */
'use strict';

const os = require('os');

module.exports = {
  disco: {
    name: 'disco',
    debug: true,
    baseURL: 'http://127.0.0.1:3000',
    connector: 'loopback-connector-disco-rest',
    serviceDiscovery: {
      enabled: true,
      adapter: 'eureka',
      providers: [
        {
          host: process.env.SERVICE_DISCOVERY_HOST,
          port: process.env.SERVICE_DISCOVERY_PORT,
        },
      ],
      registration: {
        type: 'cs-twitter',
        advertiseHost: process.env.SERVICE_DISCOVERY_ADVERTISE_HOST || os.hostname(),
        advertisePort: process.env.SERVICE_DISCOVERY_ADVERTISE_PORT || process.env.PORT || 3000,
      },
      pool: {
        type: 'es-twitter',
      },
    },
    operations: [
      {
        template: {
          method: 'POST',
          url: '/api/TwitterUsers/getUserByScreenName',
          headers: {
            accept: 'application/json',
            'content-type': 'multipart/form-data',
          },
          form: {
            screenName: '{screenName}',
          },
        },
        functions: {
          getUserByScreenName: [
            'screenName',
          ],
        },
      },
    ],
  },
};
