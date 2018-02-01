'use strict';

const debug = require('debug')('boot:enterpriseRESTConnector');

const DiscoveryAgent = require('discovery-agent').DiscoveryAgent;
const circuitBreaker = require('../utils/circuitBreaker');
/**
 * @param server
 * @returns {Promise<void>}
 */
module.exports = async (server) => {
  const connector = server.dataSources.enterpriseDs.connector;

  connector.observe('before execute', (ctx, next) => {
    DiscoveryAgent.pool()
      .then(service => {
        ctx.req.uri = service.toURI('/api/TwitterUsers/getUserByScreenName');
        debug(`URI set to ${ctx.req.uri}`);
        next();
      })
      .catch(next);
  });

  // server.dataSources.enterpriseDs = circuitBreaker.wrapDsMethods(server.dataSources.enterpriseDs, ['getUserByScreenName']);
};
