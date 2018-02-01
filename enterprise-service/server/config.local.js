/* eslint-disable max-len */

'use strict';

const os = require('os');

const ADAPTER_TYPES = require('discovery-agent').ADAPTER_TYPES;

module.exports = {
  port: process.env.PORT || 3000,

  serviceDiscovery: {
    type: process.env.SERVICE_DISCOVERY_ADAPTER || ADAPTER_TYPES.ETCD,
    host: process.env.SERVICE_DISCOVERY_HOST || '127.0.0.1',
    port: process.env.SERVICE_DISCOVERY_PORT || null, // default provided by adapter
    advertiseHost: process.env.SERVICE_DISCOVERY_ADVERTISE_HOST || os.hostname(),
    advertisePort: process.env.SERVICE_DISCOVERY_ADVERTISE_PORT || process.env.PORT || 3000,
  },
};
