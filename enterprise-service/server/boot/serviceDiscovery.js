'use strict';

const debug = require('debug')('boot:service-discovery');

const DiscoveryAgent = require('discovery-agent').DiscoveryAgent;

/**
 * @param server
 * @returns {Promise<void>}
 */
module.exports = async (server) => {
  const discoveryAgentConfig = server.get('serviceDiscovery');
  const agent = new DiscoveryAgent(
    discoveryAgentConfig.type,
    discoveryAgentConfig
  );
  const registrationDetails = await agent.register(
    'es-twitter',
    discoveryAgentConfig.advertiseHost,
    discoveryAgentConfig.advertisePort
  );

  // @todo Rollout across all adapters
  if (discoveryAgentConfig.type === 'consul') {
    const checkDetails = await agent.createCheck('hello!?', '', 5000);
    debug('%O', checkDetails);
  }

  debug('%O', registrationDetails);
};
