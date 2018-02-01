'use strict';

const debug = require('debug')('boot:twitter');

const twitterService = require('../services/twitter');

/**
 * @param server
 * @returns {Promise<void>}
 */
module.exports = async(server) => {
  try {
    await twitterService.bootstrap();
  } catch (ex) {
    debug(`Twitter boot failed: ${ex.toString()}`);
  }
};
