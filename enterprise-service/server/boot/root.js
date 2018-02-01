'use strict';

const debug = require('debug')('boot:root');

/**
 * @param server
 * @returns {Promise<void>}
 */
module.exports = (server) => {
  let router = server.loopback.Router();
  router.get('/', server.loopback.status());
  server.use(router);
};
