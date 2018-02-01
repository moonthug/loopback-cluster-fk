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

  let services = null;

  if(discoveryAgentConfig.type === 'eureka') {
    const registrationDetails = await agent.register(
      'cs-twitter',
      discoveryAgentConfig.advertiseHost,
      discoveryAgentConfig.advertisePort
    );
    debug('%O', registrationDetails);
  }

  try {
    services = await agent.list('es-twitter');
  } catch (e) {
    throw e;
  }

  agent.createPool('es-twitter');
  debug('%O', services);
};
