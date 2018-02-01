'use strict';

const TwitterService = require('../services/twitter');

/**
 *
 * @param {any} response
 * @returns {TwitterUser}
 * @private
 */
const _mapToTwitterResponse = (response) => {
  return {
    id: response.id_str,
    name: response.name,
    screenName: response.screen_name,
  };
};

/**
 * @param TwitterUser
 */
module.exports = (TwitterUser) => {
  /**
   * get
   * @param {string} userId
   * @param {Function(Error, object)} cb
   */
  TwitterUser.getUserById = (userId, cb) => {
    TwitterService.getUserById(userId)
      .then(response => {
        cb(null, _mapToTwitterResponse(response));
      })
      .catch((err) => cb(err));
  };

  /**
   * get
   * @param {string} screenName
   * @param {Function(Error, object)} cb
   */
  TwitterUser.getUserByScreenName = (screenName, cb) => {
    TwitterService.getUserByScreenName(screenName)
      .then(response => {
        cb(null, _mapToTwitterResponse(response));
      })
      .catch((err) => cb(err));
  };
};
