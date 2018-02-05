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
      adapter: process.env.SERVICE_DISCOVERY_ADAPTER || 'consul',
      providers: [
        {
          host: process.env.SERVICE_DISCOVERY_HOST,
          port: process.env.SERVICE_DISCOVERY_PORT,
        },
      ],
      registration: {
        type: 'consumed-1',
        advertiseHost: process.env.SERVICE_DISCOVERY_ADVERTISE_HOST || os.hostname(),
        advertisePort: process.env.SERVICE_DISCOVERY_ADVERTISE_PORT || process.env.PORT || 3000,
        checks: [
          {
            name: 'alive',
            route: '/',
          },
        ],
      },
    },
  },
}
