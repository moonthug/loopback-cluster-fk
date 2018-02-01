'use strict';

const debug = require('debug')('utils:circuitBreaker');

const async = require('async');

module.exports.wrapDsMethods = (datasource, methods) => {
  methods.forEach(method => {
    const originalFn = datasource[method];
    debug(`Patching ${method}`);
    const monkeyPatch = function() {
      async.retry(
        {
          times: 5,
          interval: 1000,
        },
        originalFn.bind(this, arguments),
        (err, data) => {
          if (err) {
            console.log('ERRRRRROOOORRRRRRRR\n\n\n\n\n');
            console.error(err);
          }

          arguments[arguments.length - 1](err, data);
        }
      );
    };

    datasource[method] = monkeyPatch;
  });

  return datasource;
};
