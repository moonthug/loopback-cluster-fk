/* eslint-disable max-len */

'use strict';

const ADAPTER_TYPES = require('discovery-agent').ADAPTER_TYPES;

module.exports = {
  port: process.env.PORT || 4000,
  serviceDiscovery: {
    type: process.env.SERVICE_DISCOVERY_ADAPTER || ADAPTER_TYPES.ETCD,
    host: process.env.SERVICE_DISCOVERY_HOST || '127.0.0.1',
    port: process.env.SERVICE_DISCOVERY_PORT || null, // default provided by adapter
  },
};
