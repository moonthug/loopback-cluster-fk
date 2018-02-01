'use strict';

/**
 *
 * @param {string} consumerKey
 * @param {string} consumerSecret
 * @returns {string}
 */
module.exports = (consumerKey, consumerSecret) => {
  return new Buffer(
    `${encodeURIComponent(consumerKey)}:${encodeURIComponent(consumerSecret)}`
  ).toString('base64');
};
