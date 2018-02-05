'use strict';

const os = require('os');
const pkg = require('../../package.json');

module.exports = function(server) {
  var router = server.loopback.Router();
  router.get('/ping', (req, res) => {
    res.json({
      host: os.hostname(),
      service: pkg.name
    });
  });
  server.use(router);
};
