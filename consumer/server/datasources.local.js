/* eslint-disable max-len */
'use strict';

const os = require('os');

module.exports = {
  register: {
    name: 'register',
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
        type: 'consumer',
        advertiseHost: process.env.SERVICE_DISCOVERY_ADVERTISE_HOST || os.hostname(),
        advertisePort: process.env.SERVICE_DISCOVERY_ADVERTISE_PORT || process.env.PORT || 5000,
        checks: [
          {
            name: 'alive',
            route: '/',
          },
        ],
      },
      pool: {
        type: 'consumer',
      },
    },
  },
  discoConsumed1: {
    name: 'discoConsumed1',
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
      pool: {
        type: 'consumed-1',
      },
    },
    operations: [
      {
        template: {
          method: 'GET',
          url: '/ping',
        },
        functions: {
          ping: [],
        },
      },
    ],
  },
  discoConsumed2: {
    name: 'discoConsumed2',
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
      pool: {
        type: 'consumed-2',
      },
    },
    operations: [
      {
        template: {
          method: 'GET',
          url: '/ping',
        },
        functions: {
          ping: [],
        },
      },
    ],
  },
};
